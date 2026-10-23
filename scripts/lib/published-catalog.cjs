const { createLoader } = require('./load-typescript.cjs');
const { catalogSnapshotSchema } = createLoader()('lib/content/schema.ts');

function snapshotFromRows(rows, destinationId) {
    if (!Array.isArray(rows) || !rows.length) throw new Error('Published catalog is empty; local content was preserved.');
    const first = rows[0];
    for (const row of rows) {
        if (row.destination_id !== destinationId || row.place_id !== row.entry?.place?.id ||
            JSON.stringify(row.destination) !== JSON.stringify(first.destination) ||
            JSON.stringify(row.review_policy) !== JSON.stringify(first.review_policy)) {
            throw new Error('Published catalog identities or metadata are inconsistent.');
        }
    }
    return catalogSnapshotSchema.parse({ schemaVersion: 1, destination: first.destination,
        reviewPolicy: first.review_policy, entries: rows.map(row => row.entry) });
}

async function fetchPublishedCatalog(url, key, destinationId, request = fetch) {
    const origin = new URL(url);
    if (origin.protocol !== 'https:' || origin.username || origin.password || origin.search || origin.hash || origin.pathname !== '/')
        throw new Error('Configure an HTTPS Supabase project origin.');
    let publicKey = key?.startsWith('sb_publishable_');
    try { publicKey ||= JSON.parse(Buffer.from(key.split('.')[1], 'base64url').toString()).role === 'anon'; } catch { /* Not a legacy public key. */ }
    if (!publicKey) throw new Error('Use the publishable/anon key; administrative keys are not accepted.');
    const endpoint = new URL('/rest/v1/travel_catalog', origin);
    endpoint.search = new URLSearchParams({ select: 'destination_id,place_id,position,entry,destination,review_policy',
        destination_id: `eq.${destinationId}`, order: 'position.asc,place_id.asc', limit: '10000' });
    let response;
    try {
        response = await request(endpoint, { headers: { apikey: key, Prefer: 'count=exact', Range: '0-9999' },
            redirect: 'error', signal: AbortSignal.timeout(20000) });
    } catch { throw new Error('Supabase catalog could not be reached; local content was preserved.'); }
    if (!response.ok) throw new Error(`Published catalog is unavailable (HTTP ${response.status}); check that the catalog SQL has been applied.`);
    const rows = await response.json();
    const count = response.headers.get('content-range')?.match(/\/(\d+)$/)?.[1];
    if (count == null || !Array.isArray(rows) || rows.length !== Number(count))
        throw new Error('Incomplete catalog response; local content was preserved.');
    return snapshotFromRows(rows, destinationId);
}

module.exports = { snapshotFromRows, fetchPublishedCatalog };
