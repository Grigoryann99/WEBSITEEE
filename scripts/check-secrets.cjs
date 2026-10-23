const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
require('dotenv').config({ path: ['.env.local', '.env'], quiet: true });
let failed = false;
const fail = message => { failed = true; console.error(message); };
for (const [name, value] of Object.entries(process.env)) {
    if (!name.startsWith('NEXT_PUBLIC_') || !value) continue;
    if (/SECRET|PASSWORD|PRIVATE|SERVICE_ROLE|GROQ|OPENAI_API_KEY|UNSPLASH_ACCESS_KEY|(?:DATABASE|DB)_URL/i.test(name) || /^(gsk_|sk-(?:proj-|svcacct-)?|sb_secret_|postgres(?:ql)?:\/\/)/.test(value)) fail(`Secret-like browser variable rejected: ${name} (value omitted)`);
    if (/SUPABASE_.*KEY$/.test(name)) {
        let safe = value.startsWith('sb_publishable_');
        try { safe ||= JSON.parse(Buffer.from(value.split('.')[1], 'base64url').toString()).role === 'anon'; } catch { /* not a legacy public JWT */ }
        if (!safe) fail(`Supabase browser key must be publishable/anon: ${name} (value omitted)`);
    }
}
const tracked = execFileSync('git', ['-c', 'core.fsmonitor=false', 'ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
for (const file of tracked) if (/(^|\/)\.env(?:\.|$)/.test(file) && !file.endsWith('.example')) fail(`Tracked environment file: ${file}`);
const secrets = Object.entries(process.env).filter(([name, value]) => !name.startsWith('NEXT_PUBLIC_') && /SECRET|PASSWORD|PRIVATE|TOKEN|API_KEY|ACCESS_KEY|(?:DATABASE|DB)_URL/.test(name) && value && value.length >= 12);
const roots = process.argv.includes('--bundle') ? [process.env.NEXT_BUILD_DIR || '.next-production', 'public'] : [];
function scan(folder) {
    if (!fs.existsSync(folder)) return;
    for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
        const file = path.join(folder, entry.name);
        if (entry.isDirectory()) scan(file);
        else if (/\.(js|html|json|map)$/.test(file)) {
            const bytes = fs.readFileSync(file);
            for (const [name, secret] of secrets) if (bytes.includes(Buffer.from(secret))) fail(`Server secret ${name} found in browser asset ${file} (value omitted)`);
        }
    }
}
// Only browser chunks are relevant, not server-only environment access.
if (roots.length) { scan(path.join(roots[0], 'static')); scan(roots[1]); }
if (failed) process.exitCode = 1;
else console.log('PASS environment files are untracked; browser key types are public' + (roots.length ? '; no configured server secrets found in browser assets.' : '.'));
