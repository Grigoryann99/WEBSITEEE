const assert = require('node:assert/strict');
const fs = require('node:fs');
const { snapshotFromRows, fetchPublishedCatalog } = require('./lib/published-catalog.cjs');
const { readSnapshot } = require('./content-catalog.cjs');
const snapshot = readSnapshot();
const destination = snapshot.destination.id;
const rows = snapshot.entries.map((entry, position) => ({ destination_id: destination, place_id: entry.place.id,
    position, entry, destination: snapshot.destination, review_policy: snapshot.reviewPolicy }));
async function main() {
    assert.deepEqual(snapshotFromRows(rows, destination), snapshot);
    assert.throws(() => snapshotFromRows([], destination));
    assert.throws(() => snapshotFromRows([...rows, rows[0]], destination));
    const wrongCity = structuredClone(rows); wrongCity[0].destination_id = 'france/paris';
    assert.throws(() => snapshotFromRows(wrongCity, destination));
    const invalid = structuredClone(rows); invalid[0].entry.place.price.min = -1;
    assert.throws(() => snapshotFromRows(invalid, destination));
    let calls = 0;
    const request = async (url, options) => {
        calls++;
        assert.equal(options.redirect, 'error');
        assert.equal(url.pathname, '/rest/v1/travel_catalog');
        assert.equal(url.searchParams.get('destination_id'), `eq.${destination}`);
        assert.ok(!url.searchParams.get('select').includes('draft'));
        return new Response(JSON.stringify(rows), { headers: { 'content-range': `0-${rows.length - 1}/${rows.length}` } });
    };
    assert.deepEqual(await fetchPublishedCatalog('https://example.supabase.co','sb_publishable_test',destination,request), snapshot);
    await assert.rejects(fetchPublishedCatalog('https://example.supabase.co','sb_secret_test',destination,request));
    await assert.rejects(fetchPublishedCatalog('http://example.supabase.co','sb_publishable_test',destination,request));
    assert.equal(calls,1);
    await assert.rejects(fetchPublishedCatalog('https://example.supabase.co','sb_publishable_test',destination,
        async () => new Response(JSON.stringify(rows.slice(0,1)), { headers: { 'content-range': `0-0/${rows.length}` } })));
    await assert.rejects(fetchPublishedCatalog('https://example.supabase.co','sb_publishable_test',destination,
        async () => new Response('{}', { status: 404 })));
    const bundle = fs.readFileSync('scratch/content-transfer/02-import.sql','utf8');
    assert.equal((bundle.match(/^begin;$/gmi) || []).length,1);
    assert.equal((bundle.match(/^commit;$/gmi) || []).length,1);
    console.log('PASS published catalog round-trip, empty/duplicate/wrong-city/invalid data rejection, public-key-only requests, truncated/failed responses and single-transaction import.');
}
main().catch(error => { console.error(error); process.exitCode=1; });
