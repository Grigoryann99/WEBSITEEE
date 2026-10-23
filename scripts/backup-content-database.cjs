const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { query, runTool } = require('./lib/database-tools.cjs');
try {
    const result = query(`select json_build_object('version',current_setting('server_version'),
        'catalogExists',to_regnamespace('travel_content') is not null,
        'roles',(select json_agg(rolname) from pg_roles),
        'extensions',(select json_agg(extname) from pg_extension),
        'publicFunctions',(select json_agg(proname) from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='public'))`);
    const preflight = JSON.parse(result);
    const folder = path.join('scratch/database-backups', new Date().toISOString().replace(/[:.]/g,'-'));
    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(path.join(folder,'preflight.json'), JSON.stringify(preflight,null,2));
    const full = path.join(folder,'database.dump');
    runTool('pg_dump',['-w','--format=custom','--no-owner','--file',path.resolve(full)]);
    const toc = runTool('pg_restore',['--list',path.resolve(full)]);
    if (!toc.includes('TABLE DATA')) throw new Error('Backup archive contains no table data entries.');
    fs.writeFileSync(path.join(folder,'archive-list.txt'),toc);
    runTool('pg_dump',['-w','--schema=public','--no-owner','--file',path.resolve(folder,'public.sql')]);
    // Only user IDs needed to satisfy existing public-table references in an isolated
    // restore test; no authentication hashes or tokens are copied into that test.
    fs.writeFileSync(path.join(folder,'auth-ids.json'),query('select coalesce(json_agg(id),\'[]\'::json) from auth.users'));
    fs.writeFileSync(path.join(folder,'manifest.json'), JSON.stringify({ createdOn:new Date().toISOString(),
        archive:'database.dump', bytes:fs.statSync(full).size,
        sha256:crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex'),
        archiveReadable:true, restoreTested:false, preflight },null,2));
    fs.writeFileSync('scratch/database-backups/latest.json',JSON.stringify({folder},null,2));
    console.log(`PASS encrypted connection verified; database backup saved in ${folder}. Restore testing remains required.`);
} catch(error) { console.error(error.message); process.exitCode=1; }
