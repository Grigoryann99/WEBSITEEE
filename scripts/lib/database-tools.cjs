// Administrative database tools: credentials stay in child-process environment,
// never command-line arguments or console output.
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
require('dotenv').config({ path: '.env.local', quiet: true });
function connection() {
    const raw = process.env.SUPABASE_DB_URL;
    if (!raw) throw new Error('SUPABASE_DB_URL is missing from .env.local.');
    const url = new URL(raw);
    const reference = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname.split('.')[0];
    if (!['postgres:','postgresql:'].includes(url.protocol) || !url.hostname.endsWith('.pooler.supabase.com') ||
        url.username !== `postgres.${reference}` || url.port !== '5432' || url.pathname !== '/postgres' || !url.password)
        throw new Error('Database connection must match the configured project and session pooler.');
    return { ...process.env, PGHOST: url.hostname, PGPORT: url.port, PGUSER: url.username,
        PGDATABASE: 'postgres', PGPASSWORD: decodeURIComponent(url.password),
        PGSSLMODE: 'verify-full', PGSSLROOTCERT: path.resolve('scratch/postgres-tools/supabase-ca.crt'), PGCONNECT_TIMEOUT: '20', PGCLIENTENCODING: 'UTF8' };
}
function runTool(name, args, env = connection()) {
    const executable = path.join(env.TRAVEL_POSTGRES_TOOLS || path.resolve('scratch/postgres-tools/pgsql/bin'), `${name}.exe`);
    if (!fs.existsSync(executable)) throw new Error('Official PostgreSQL tools are not installed locally.');
    const result = spawnSync(executable, args, { env, encoding: 'utf8', windowsHide: true,
        // On Windows the detached server inherits pg_ctl's pipe handles. Avoid
        // waiting for those handles after pg_ctl has already exited successfully.
        ...(name === 'pg_ctl' ? { stdio: 'ignore' } : {}),
        timeout: 240000, maxBuffer: 64 * 1024 * 1024 });
    if (result.error || result.status !== 0) {
        // Preserve useful connection diagnostics without printing connection strings,
        // user data, SQL statement contents or passwords.
        const output = result.stderr || '';
        if(name==='psql') {
            fs.mkdirSync('scratch/database-backups',{recursive:true});
            fs.writeFileSync('scratch/database-backups/last-psql-error.txt',output.replaceAll(env.PGPASSWORD || '__no_password__','[redacted]'));
        }
        const reason = /password authentication failed|Wrong password/i.test(output) ? 'Database password was rejected.' :
            /certificate|SSL root/i.test(output) ? 'TLS certificate verification failed.' :
            /could not translate host|could not connect|connection.*failed|timed out/i.test(output) ? 'Database connection failed.' :
            `PostgreSQL ${name} failed (exit ${result.status ?? 'unavailable'}).`;
        const detail = ['initdb','pg_ctl'].includes(name) ? ` ${output.replaceAll(env.PGPASSWORD || '__no_password__','[redacted]').slice(0,1200)}` : '';
        throw new Error(reason + detail);
    }
    return result.stdout || '';
}
function query(sql, env) { return runTool('psql', ['-X','-w','-A','-t','-v','ON_ERROR_STOP=1','-c',sql], env).trim(); }
module.exports = { connection, runTool, query };
