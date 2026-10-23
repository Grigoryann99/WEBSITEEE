// Real PostgreSQL RLS/grant tests in an ephemeral WASM database; never uses hosted credentials.
import { PGlite } from '@electric-sql/pglite';
import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';

const db = new PGlite();
const userA = '11111111-1111-4111-8111-111111111111';
const userB = '22222222-2222-4222-8222-222222222222';
let passed = 0;
async function check(label, fn) { await fn(); passed++; console.log(`PASS ${label}`); }
async function identity(id, role = 'authenticated') {
    await db.exec(`reset role; set role ${role}`);
    await db.query("select set_config('request.jwt.claim.sub', $1, false)", [id || '']);
}
async function denied(sql, params = []) {
    await assert.rejects(db.query(sql, params), error => ['42501', 'P0001'].includes(error.code));
}
async function suite(label) {
    const trip = randomUUID(), item = randomUUID(), thread = randomUUID(), message = randomUUID(), request = randomUUID();
    const plan = { title: 'Fixture journey', destinationId: 'italy/rome', items: [{ id: item, placeId: 'pantheon', day: 1 }] };
    await identity(userA);
    await db.query('insert into public.profiles(id) values($1) on conflict do nothing', [userA]);
    const actualTrip = (await db.query('select public.save_trip($1,$2::jsonb)', [null, JSON.stringify(plan)])).rows[0].save_trip;
    await db.query('insert into public.saved_places(user_id,place_id) values($1,$2)', [userA, `fixture-${trip}`]);
    await db.query('insert into public.concierge_threads(id,user_id) values($1,$2)', [thread, userA]);
    await db.query("insert into public.concierge_messages(id,thread_id,role,content) values($1,$2,'user','private fixture')", [message, thread]);
    await db.query("insert into public.custom_plan_requests(id,user_id,city,brief) values($1,$2,'rome','A fixture planning request for our tests')", [request, userA]);

    const targets = [
        ['profiles', 'id', userA], ['trips', 'id', actualTrip], ['trip_items', 'id', item],
        ['saved_places', 'place_id', `fixture-${trip}`], ['concierge_threads', 'id', thread],
        ['concierge_messages', 'id', message], ['custom_plan_requests', 'id', request],
    ];
    await check(`${label}: owner reads all seven private records`, async () => {
        for (const [table, key, value] of targets) assert.equal((await db.query(`select * from public.${table} where ${key}=$1`, [value])).rows.length, 1, table);
    });
    await identity(userB);
    await check(`${label}: a second user cannot read any first-user records`, async () => {
        for (const [table, key, value] of targets) assert.equal((await db.query(`select * from public.${table} where ${key}=$1`, [value])).rows.length, 0, table);
    });
    await check(`${label}: a second user cannot update or delete first-user data`, async () => {
        for (const [table, key, value] of targets.filter(([table]) => table !== 'custom_plan_requests')) {
            assert.equal((await db.query(`update public.${table} set ${key}=${key} where ${key}=$1 returning ${key}`, [value])).rows.length, 0, table);
            assert.equal((await db.query(`delete from public.${table} where ${key}=$1 returning ${key}`, [value])).rows.length, 0, table);
        }
        await denied('delete from public.custom_plan_requests where id=$1', [request]);
        await denied("update public.custom_plan_requests set status='quoted' where id=$1", [request]);
    });
    await check(`${label}: forged ownership and foreign parent inserts are rejected`, async () => {
        await denied('insert into public.saved_places(user_id,place_id) values($1,$2)', [userA, randomUUID()]);
        await denied("insert into public.trips(user_id,title,plan) values($1,'forged',$2)", [userA, JSON.stringify(plan)]);
        await denied('insert into public.trip_items(id,trip_id,place_id,day,position) values($1,$2,\'pantheon\',1,0)', [randomUUID(), actualTrip]);
        await denied("insert into public.concierge_messages(thread_id,role,content) values($1,'user','forged')", [thread]);
        await denied('select public.save_trip($1,$2::jsonb)', [actualTrip, JSON.stringify(plan)]);
        await denied("insert into public.custom_plan_requests(user_id,city,brief) values($1,'rome','A forged fixture planning request')", [userA]);
    });
    await check(`${label}: authenticated users cannot edit quota counters or manage tables`, async () => {
        await denied('insert into public.concierge_usage(user_id,bucket,used) values($1,now(),0)', [userB]);
        for (const [table] of targets) {
            const row = (await db.query("select has_table_privilege('authenticated',$1,'TRUNCATE,REFERENCES,TRIGGER') as allowed", [`public.${table}`])).rows[0];
            assert.equal(row.allowed, false, table);
        }
    });
    await identity(null, 'anon');
    await check(`${label}: guests have no private-table or privileged-function access`, async () => {
        for (const [table] of targets) await denied(`select * from public.${table} limit 0`);
        await denied('select public.consume_concierge_quota()');
        await denied('select public.save_trip(null,$1::jsonb)', [JSON.stringify(plan)]);
    });
    await identity(userA);
    await check(`${label}: failed cross-user operations left owner data intact`, async () => {
        for (const [table, key, value] of targets) assert.equal((await db.query(`select * from public.${table} where ${key}=$1`, [value])).rows.length, 1, table);
    });
    await db.exec('reset role');
}
try {
    await db.exec(`create role anon nologin; create role authenticated nologin;
        create schema auth; create table auth.users(id uuid primary key);
        create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
        grant usage on schema auth,public to anon,authenticated;
        grant execute on function auth.uid() to anon,authenticated;
        insert into auth.users values('${userA}'),('${userB}');`);
    for (const file of ['0001_concierge.sql', '0002_custom_requests.sql', '0003_revoke_table_management.sql']) await db.exec(await readFile(`supabase/migrations/${file}`, 'utf8'));
    await suite('base schema');
    await db.exec(await readFile('supabase/migrations/0004_destination_context.sql', 'utf8'));
    await suite('destination-aware schema');
    await identity(userA);
    await check('atomic quota allows ten requests and rejects the eleventh', async () => {
        for (let count = 1; count <= 11; count++) assert.equal((await db.query('select public.consume_concierge_quota() as allowed')).rows[0].allowed, count <= 10);
    });
    await identity(userB);
    await check('quota is scoped to its user', async () => {
        assert.equal((await db.query('select * from public.concierge_usage')).rows.length, 0);
        assert.equal((await db.query('select public.consume_concierge_quota() as allowed')).rows[0].allowed, true);
    });
    console.log(`${passed} PostgreSQL ownership checks passed. Hosted project unchanged.`);
} finally { await db.close(); }
