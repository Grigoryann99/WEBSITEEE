const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const net = require('node:net');
const { connection, runTool, query } = require('./lib/database-tools.cjs');
const tables = ['profiles','trips','trip_items','saved_places','concierge_threads','concierge_messages','concierge_usage','custom_plan_requests'];
const literal = text => `'${text.replaceAll("'","''")}'`;
function fingerprint(env) {
    return JSON.parse(query(`select jsonb_build_object(${tables.map(table => `${literal(table)},(select jsonb_build_object('count',count(*),'hash',md5(coalesce(string_agg(to_jsonb(t)::text,E'\\n' order by to_jsonb(t)::text),''))) from public.${table} t)`).join(',')})`, env));
}
async function verify() {
    const {folder} = JSON.parse(fs.readFileSync('scratch/database-backups/latest.json','utf8'));
    const manifestFile = path.join(folder,'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestFile,'utf8'));
    const preflight = manifest.preflight;
    if(preflight.catalogExists) throw new Error('Hosted catalog already exists; review before staging.');
    const port = await new Promise(resolve => { const server=net.createServer(); server.listen(0,'127.0.0.1',()=>{
        const port=server.address().port; server.close(()=>resolve(port));
    }); });
    const localPassword=crypto.randomBytes(32).toString('hex');
    // Native initdb's Windows bootstrap corrupts Cyrillic installation/data paths.
    // Use the task's permitted ASCII artifact directory for this isolated server.
    const nativeRoot=path.join(process.env.USERPROFILE,'.codex/visualizations/2026/10/11/01a12a8e-3251-76e0-93a8-cbcf537c9676/travel-postgres-restore');
    fs.mkdirSync(nativeRoot,{recursive:true});
    const tools=path.join(nativeRoot,'pgsql');
    if(!fs.existsSync(path.join(tools,'bin/initdb.exe'))) fs.cpSync('scratch/postgres-tools/pgsql',tools,{recursive:true});
    const runRoot=path.join(nativeRoot,crypto.randomUUID());
    fs.mkdirSync(runRoot);
    const passwordFile=path.join(runRoot,'restore-password.txt');
    fs.writeFileSync(passwordFile,localPassword,{flag:'wx'});
    const data=path.join(runRoot,'restore-cluster');
    const local={...process.env,PGHOST:'127.0.0.1',PGPORT:String(port),PGUSER:'postgres',PGPASSWORD:localPassword,
        PGDATABASE:'postgres',PGSSLMODE:'disable',PGTZ:'UTC',PGCLIENTENCODING:'UTF8',TRAVEL_POSTGRES_TOOLS:path.join(tools,'bin')};
    // A new disposable cluster on loopback, with SCRAM authentication. This does
    // not alter TLS or authentication on the hosted database.
    let started=false;
    try {
        runTool('initdb',['-D',data,'-U','postgres','-A','scram-sha-256','--pwfile',passwordFile,'--encoding=UTF8','--locale=C'],local);
        runTool('pg_ctl',['-D',data,'-l',path.join(runRoot,'restore-server.log'),'-o',`-h 127.0.0.1 -p ${port}`,'-w','start'],local);
        started=true;
        const roles=preflight.roles.filter(role=>role!=='postgres'&&!role.startsWith('pg_'));
        const authIds=JSON.parse(fs.readFileSync(path.join(folder,'auth-ids.json'),'utf8'));
        const setup=`drop schema public; create schema auth; create table auth.users(id uuid primary key);
            ${roles.map(role=>`create role "${role.replaceAll('"','""')}" nologin;`).join('\n')}
            create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
            create function auth.role() returns text language sql stable as $$select nullif(current_setting('request.jwt.claim.role',true),'')$$;
            create function auth.jwt() returns jsonb language sql stable as $$select coalesce(nullif(current_setting('request.jwt.claims',true),''),'{}')::jsonb$$;
            grant usage on schema auth to anon,authenticated,service_role;
            ${authIds.map(id=>`insert into auth.users values(${literal(id)});`).join('\n')}`;
        query(setup,local);
        console.log('PASS isolated restore server and authentication support prepared.');
        runTool('psql',['-X','-w','-v','ON_ERROR_STOP=1','-f',path.resolve(folder,'public.sql')],local);
        console.log('PASS application schema/data archive restored.');
        const remoteEnv={...connection(),PGTZ:'UTC'};
        const remoteBefore=fingerprint(remoteEnv);
        const restored=fingerprint(local);
        if(JSON.stringify(restored)!==JSON.stringify(remoteBefore)) throw new Error('Restored application data does not match the live database.');
        runTool('psql',['-X','-w','-v','ON_ERROR_STOP=1','-f',path.resolve('scratch/content-transfer/02-import.sql')],local);
        if(JSON.stringify(fingerprint(local))!==JSON.stringify(restored)) throw new Error('Content import changed existing application data.');
        const catalog=JSON.parse(query(`select jsonb_build_object('places',count(*),'shops',count(*) filter(where entry->'place'->>'section'='shop')) from public.travel_catalog where destination_id='italy/rome'`,local));
        if(catalog.places!==47||catalog.shops!==13) throw new Error('Staged catalog counts do not match.');
        const guestCount=Number(query('set role anon; select count(*) from public.travel_catalog;',local).split('\n').find(line=>/^\d+$/.test(line)));
        const guest=JSON.parse(query(`select jsonb_build_object('places',${guestCount},'privateSchema',has_schema_privilege('anon','travel_content','usage'),'write',has_table_privilege('anon','travel_content.places','update'),'assignEditor',has_table_privilege('authenticated','travel_content.editors','insert'))`,local));
        if(guest.places!==47||guest.privateSchema||guest.write||guest.assignEditor) throw new Error('Staged permissions failed.');
        manifest.restoreTested=true;
        manifest.restoreScope='All eight public application tables restored and fingerprints compared. Auth support uses IDs and helper stubs; full managed Supabase auth/storage restoration is not claimed.';
        manifest.stagedCatalog=catalog;
        manifest.applicationFingerprint=remoteBefore;
        manifest.stagedPermissions=guest;
        manifest.publicSqlSha256=crypto.createHash('sha256').update(fs.readFileSync(path.join(folder,'public.sql'))).digest('hex');
        manifest.importSha256=crypto.createHash('sha256').update(fs.readFileSync('scratch/content-transfer/02-import.sql')).digest('hex');
        fs.writeFileSync(manifestFile,JSON.stringify(manifest,null,2));
        console.log('PASS eight application tables restored exactly; staged import preserves existing data; 47 places / 13 shops; guest and editor access checks passed. Hosted database unchanged.');
    } finally {
        if(started) runTool('pg_ctl',['-D',data,'-m','fast','-w','stop'],local);
        if(fs.existsSync(passwordFile)) fs.unlinkSync(passwordFile);
    }
}
module.exports={fingerprint};
if(require.main===module) verify().catch(error=>{console.error(error.message);process.exitCode=1;});
