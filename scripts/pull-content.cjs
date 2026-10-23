// Read published public content only. Never writes to the hosted database.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { loadEnvConfig } = require('@next/env');
const { fetchPublishedCatalog } = require('./lib/published-catalog.cjs');
const { readSnapshot } = require('./content-catalog.cjs');
loadEnvConfig(process.cwd(), process.env.NODE_ENV !== 'production');

async function pullContent({ apply = false } = {}) {
    const current = readSnapshot();
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error('Supabase project URL and publishable key are required.');
    const snapshot = await fetchPublishedCatalog(url, key, current.destination.id);
    const ids = new Set(snapshot.entries.map(entry => entry.place.id));
    if (current.entries.some(entry => !ids.has(entry.place.id)))
        throw new Error('Published catalog omits existing place IDs; review removals before replacing the local snapshot.');
    for (const entry of snapshot.entries) {
        if (entry.media?.src.startsWith('/') && !fs.existsSync(path.join('public', entry.media.src)))
            throw new Error('A published local image is missing from this checkout; snapshot was preserved.');
    }
    const text = JSON.stringify(snapshot, null, 2) + '\n';
    fs.mkdirSync('scratch', { recursive: true });
    fs.writeFileSync('scratch/content-published-candidate.json', text);
    if (apply) {
        const target = 'data/catalog/rome.json';
        const original = fs.readFileSync(target);
        const hash = crypto.createHash('sha256').update(original).digest('hex');
        fs.mkdirSync('scratch/content-sync-backups', { recursive: true });
        const backup = `scratch/content-sync-backups/${hash}.json`;
        if (!fs.existsSync(backup)) fs.writeFileSync(backup, original, { flag: 'wx' });
        const temporary = `${target}.${crypto.randomUUID()}.tmp`;
        try { fs.writeFileSync(temporary, text, { flag: 'wx' }); fs.renameSync(temporary, target); }
        finally { if (fs.existsSync(temporary)) fs.unlinkSync(temporary); }
    }
    console.log(`${apply ? 'Applied' : 'Prepared candidate for'} ${snapshot.destination.id}: ${snapshot.entries.length} published places. No hosted data changed.`);
}
module.exports = { pullContent };
if (require.main === module) pullContent({ apply: process.argv.includes('--apply') }).catch(() => {
    console.error('Catalog pull failed. Check project access, applied catalog SQL, complete published data and local image files. Local snapshot was preserved.');
    process.exitCode = 1;
});
