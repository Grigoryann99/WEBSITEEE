const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const {query,runTool,connection}=require('./lib/database-tools.cjs');
const {fingerprint}=require('./verify-content-restore.cjs');
const {snapshotFromRows}=require('./lib/published-catalog.cjs');
const {readSnapshot}=require('./content-catalog.cjs');
try {
    if(!process.argv.includes('--apply')) throw new Error('Hosted writes require the explicit --apply flag.');
    const {folder}=JSON.parse(fs.readFileSync('scratch/database-backups/latest.json','utf8'));
    const manifest=JSON.parse(fs.readFileSync(path.join(folder,'manifest.json'),'utf8'));
    const hash=data=>crypto.createHash('sha256').update(data).digest('hex');
    if(!manifest.restoreTested || manifest.stagedCatalog?.places!==47 || manifest.stagedCatalog?.shops!==13)
        throw new Error('A successful isolated restore and import test is required.');
    if(hash(fs.readFileSync(path.join(folder,'database.dump')))!==manifest.sha256)
        throw new Error('Backup checksum does not match.');
    const original=fs.readFileSync('scratch/content-transfer/02-import.sql','utf8');
    if(hash(original)!==manifest.importSha256) throw new Error('Import changed since the staged verification.');
    const env={...connection(),PGTZ:'UTC'};
    if(query("select to_regnamespace('travel_content') is not null",env)!=='f') throw new Error('Content schema exists; do not reapply initial import.');
    if(JSON.stringify(fingerprint(env))!==JSON.stringify(manifest.applicationFingerprint))
        throw new Error('Application data changed after backup; take a fresh backup before import.');
    const tables=Object.keys(manifest.applicationFingerprint);
    const literal=text=>`'${text.replaceAll("'","''")}'`;
    const fingerprintSql=`select jsonb_build_object(${tables.map(table=>`${literal(table)},(select jsonb_build_object('count',count(*),'hash',md5(coalesce(string_agg(to_jsonb(t)::text,E'\\n' order by to_jsonb(t)::text),''))) from public.${table} t)`).join(',')})`;
    const assertion=`do $guard$ begin if (${fingerprintSql}) is distinct from ${literal(JSON.stringify(manifest.applicationFingerprint))}::jsonb then raise exception 'Existing application data changed'; end if; end $guard$;`;
    const body=original.replace(/^begin;\s*$/mi,'').replace(/^commit;\s*$/mi,'');
    const guarded=`begin; set local lock_timeout='10s'; set local statement_timeout='120s';
        lock table ${tables.map(table=>`public.${table}`).join(',')} in share mode;
        ${assertion}\n${body}\n${assertion}\nnotify pgrst,'reload schema'; commit;`;
    const filename=path.resolve(folder,'applied-content-import.sql');
    fs.writeFileSync(filename,guarded);
    runTool('psql',['-X','-w','-v','ON_ERROR_STOP=1','-f',filename],env);
    const rows=JSON.parse(query("select json_agg(t order by position,place_id) from public.travel_catalog t where destination_id='italy/rome'",env));
    const snapshot=snapshotFromRows(rows,'italy/rome');
    if(JSON.stringify(snapshot)!==JSON.stringify(readSnapshot())) throw new Error('Hosted published data differs from the local snapshot; investigate before deployment.');
    if(JSON.stringify(fingerprint(env))!==JSON.stringify(manifest.applicationFingerprint)) throw new Error('Post-import application data changed; inspect concurrent user writes.');
    const permissions=JSON.parse(query("select json_build_object('publicRead',has_table_privilege('anon','public.travel_catalog','select'),'privateAccess',has_schema_privilege('anon','travel_content','usage'),'userCanAssignEditor',has_table_privilege('authenticated','travel_content.editors','insert'))",env));
    if(!permissions.publicRead||permissions.privateAccess||permissions.userCanAssignEditor) throw new Error('Hosted catalog permissions need review.');
    fs.writeFileSync('scratch/content-transfer/hosted-import-result.json',JSON.stringify({appliedOn:new Date().toISOString(),places:snapshot.entries.length,shops:snapshot.entries.filter(entry=>entry.place.section==='shop').length,applicationDataPreserved:true,permissions,backupFolder:folder},null,2));
    console.log('PASS hosted catalog imported: 47 places / 13 shops; published snapshot matches; existing application data unchanged; public/private permissions verified.');
} catch(error) {console.error(error.message);process.exitCode=1;}
