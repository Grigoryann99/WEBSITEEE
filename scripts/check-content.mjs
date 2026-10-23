// Ephemeral PostgreSQL only. No environment files, network or hosted writes.
import { PGlite } from '@electric-sql/pglite';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
const require = createRequire(import.meta.url);
const { readSnapshot, seedSql, reviewReport } = require('./content-catalog.cjs');
const { createLoader } = require('./lib/load-typescript.cjs');
const load = createLoader();
const { catalogSnapshotSchema } = load('lib/content/schema.ts');
const { nextReviewDate, reviewQueue } = load('lib/content/freshness.ts');
const snapshot = readSnapshot();
let passed = 0;
async function check(label, run) { await run(); passed++; console.log(`PASS ${label}`); }
await check('canonical entries have unique stable identities and all legacy exports share them', () => {
    const catalog = load('lib/places/catalog.ts');
    const legacy = load('data/cities/rome/places.ts');
    assert.deepEqual(catalog.romePlaces, snapshot.entries.map(entry => entry.place));
    assert.equal(catalog.romePlaces, legacy.romePlaces);
    assert.equal(catalog.catalogForDestination('france').length, 0);
});
await check('invalid identities, prices, coordinates, sources and verification claims are rejected', () => {
    const mutations = [s => s.entries.push(s.entries[0]), s => s.entries[0].place.city='paris',
        s => s.entries[0].place.price.min=-1, s => s.entries[0].place.coords[0]=100,
        s => s.entries[0].place.sources[0].url='javascript:alert(1)', s => s.entries[0].place.price.status='verified',
        s => s.entries[0].checks.price={checkedOn:'2026-02-30',sourceUrl:'https://example.com/'},
        s => s.entries[0].checks.price={checkedOn:'2999-01-01',sourceUrl:'https://example.com/'},
        s => s.entries[0].media.licenseUrl='javascript:bad',
        s => { s.entries[0].media.context='area'; s.entries[0].media.representative=false; }];
    for (const mutate of mutations) { const value=structuredClone(snapshot); mutate(value); assert.equal(catalogSnapshotSchema.safeParse(value).success,false); }
});
await check('review deadlines handle month boundaries; compiled research is never a checked source', () => {
    assert.equal(nextReviewDate('2026-12-29',7),'2027-01-05');
    assert.equal(nextReviewDate('2028-02-27',2),'2028-02-29');
    assert.equal(nextReviewDate(null,7),null);
    const queue=reviewQueue(snapshot,'2026-10-28');
    assert.ok(queue.some(task=>task.placeId==='colosseum' && task.field==='price' && task.status==='unverified'));
    assert.ok(queue.some(task=>task.placeId==='feltrinelli-argentina' && task.field==='hours' && task.status==='due'));
    const missingPhoto=structuredClone(snapshot); missingPhoto.entries[0].media=null;
    assert.ok(reviewReport(missingPhoto).media.some(image=>image.status==='missing'));
});
const db = new PGlite();
const editor='11111111-1111-4111-8111-111111111111';
const visitor='22222222-2222-4222-8222-222222222222';
async function identity(id,role='authenticated') {
    await db.exec(`reset role; set role ${role}`);
    await db.query("select set_config('request.jwt.claim.sub',$1,false)",[id||'']);
}
async function denied(sql,params=[]) { await assert.rejects(db.query(sql,params),error=>error.code==='42501'); }
const first=snapshot.entries[0];
const changed=structuredClone(first); changed.place.summary='An editorial draft awaiting publication.';
const draftArgs=[snapshot.destination.id,first.place.id,JSON.stringify(changed),1];
try {
    await db.exec(`create role anon nologin; create role authenticated nologin;
        create schema auth; create table auth.users(id uuid primary key);
        create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
        grant usage on schema auth,public to anon,authenticated;
        grant execute on function auth.uid() to anon,authenticated;
        insert into auth.users values('${editor}'),('${visitor}');`);
    for (const migration of ['0001_concierge.sql','0002_custom_requests.sql','0003_revoke_table_management.sql','0004_destination_context.sql']) {
        await db.exec(await readFile(`supabase/migrations/${migration}`,'utf8'));
    }
    await db.query('insert into public.saved_places(user_id,place_id) values($1,$2)',[visitor,first.place.id]);
    await db.exec(await readFile('supabase/content/001_catalog.sql','utf8'));
    await check('all 47 records import transactionally without changing saved-place identities', async()=>{
        await db.exec(seedSql(snapshot)); await db.exec(seedSql(snapshot));
        const rows=(await db.query('select entry from public.travel_catalog order by position')).rows;
        assert.deepEqual(rows.map(row=>row.entry),snapshot.entries);
        assert.equal((await db.query('select count(*)::int as n from public.saved_places')).rows[0].n,1);
    });
    await identity('', 'anon');
    await check('guests read published content but cannot inspect drafts, history or editor membership',async()=>{
        assert.equal((await db.query('select count(*)::int as n from public.travel_catalog')).rows[0].n,snapshot.entries.length);
        for(const table of ['places','editors','history','destinations']) await denied(`select * from travel_content.${table}`);
        await denied('select public.catalog_workspace()');
        await denied('select public.save_catalog_draft($1,$2,$3::jsonb,$4)',draftArgs);
    });
    await identity(visitor);
    await check('ordinary signed-in users cannot promote themselves, edit content or publish',async()=>{
        await denied('insert into travel_content.editors values($1)',[visitor]);
        await denied('select public.catalog_workspace()');
        await denied('select public.save_catalog_draft($1,$2,$3::jsonb,$4)',draftArgs);
        await denied('select public.publish_catalog_place($1,$2,$3)',[snapshot.destination.id,first.place.id,1]);
    });
    await db.exec('reset role'); await db.query('insert into travel_content.editors values($1)',[editor]);
    await identity(editor);
    await check('an authorized editor saves a draft; public content remains unchanged',async()=>{
        assert.equal((await db.query('select public.save_catalog_draft($1,$2,$3::jsonb,$4) as revision',draftArgs)).rows[0].revision,2);
        const workspace=(await db.query('select public.catalog_workspace() as workspace')).rows[0].workspace;
        assert.ok(workspace.find(row=>row.placeId===first.place.id).hasDraft);
        assert.deepEqual((await db.query('select entry from public.travel_catalog where place_id=$1',[first.place.id])).rows[0].entry,first);
    });
    await check('stale editor revisions cannot overwrite another edit',async()=>{
        await assert.rejects(db.query('select public.save_catalog_draft($1,$2,$3::jsonb,$4)',draftArgs),error=>error.code==='40001');
    });
    await check('database write boundary rejects invalid sources and false verification',async()=>{
        for(const mutate of [e=>e.place.sources[0].url='javascript:bad',e=>e.place.price.status='verified',e=>e.place.coords=[200,0],e=>e.media={type:'image',src:'//evil.test/image.jpg',credit:'Unknown'},e=>e.media.licenseUrl='javascript:bad',e=>{e.media.context='area';e.media.representative=false;}]){
            const bad=structuredClone(first); mutate(bad);
            await assert.rejects(db.query('select public.save_catalog_draft($1,$2,$3::jsonb,$4)',[snapshot.destination.id,first.place.id,JSON.stringify(bad),2]));
        }
    });
    await check('publication is atomic, revisioned and records a recoverable previous version',async()=>{
        assert.equal((await db.query('select public.publish_catalog_place($1,$2,$3) as revision',[snapshot.destination.id,first.place.id,2])).rows[0].revision,3);
        assert.deepEqual((await db.query('select entry from public.travel_catalog where place_id=$1',[first.place.id])).rows[0].entry,changed);
        await db.exec('reset role');
        const history=(await db.query("select * from travel_content.history where action='publish'")).rows;
        assert.equal(history.length,1); assert.deepEqual(history[0].previous,first); assert.equal(history[0].actor,editor);
    });
    await check('re-running the seed cannot erase published edits; public export validates and round-trips',async()=>{
        await db.exec(seedSql(snapshot));
        const rows=(await db.query('select entry from public.travel_catalog order by position')).rows;
        const exported={...snapshot,entries:rows.map(row=>row.entry)};
        assert.equal(exported.entries[0].place.summary,changed.place.summary);
        assert.ok(catalogSnapshotSchema.safeParse(exported).success);
        assert.equal((await db.query('select revision from travel_content.places where place_id=$1',[first.place.id])).rows[0].revision,3);
    });
    await check('previous content can be restored through a new audited publication',async()=>{
        await identity(editor);
        await db.query('select public.save_catalog_draft($1,$2,$3::jsonb,$4)',[snapshot.destination.id,first.place.id,JSON.stringify(first),3]);
        await db.query('select public.publish_catalog_place($1,$2,$3)',[snapshot.destination.id,first.place.id,4]);
        assert.deepEqual((await db.query('select entry from public.travel_catalog where place_id=$1',[first.place.id])).rows[0].entry,first);
    });
    await check('a newly created draft is absent from every public catalog row',async()=>{
        const unpublished=structuredClone(first); unpublished.place.id='fixture-unpublished';
        await db.query('select public.save_catalog_draft($1,$2,$3::jsonb,$4)',[snapshot.destination.id,unpublished.place.id,JSON.stringify(unpublished),0]);
        await identity('', 'anon');
        assert.equal((await db.query('select count(*)::int as n from public.travel_catalog')).rows[0].n,snapshot.entries.length);
        assert.equal((await db.query('select entry from public.travel_catalog where place_id=$1',[unpublished.place.id])).rows.length,0);
    });
    await check('revoking editor membership immediately removes edit and draft-reading access',async()=>{
        await db.exec('reset role');
        await db.query('delete from travel_content.editors where user_id=$1',[editor]);
        await identity(editor);
        await denied('select public.catalog_workspace()');
        await denied('select public.save_catalog_draft($1,$2,$3::jsonb,$4)',[snapshot.destination.id,first.place.id,JSON.stringify(first),5]);
    });
    console.log(`${passed} content checks passed. Ephemeral PostgreSQL closed; hosted data unchanged.`);
} finally { await db.close(); }
