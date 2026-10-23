// Offline functional checks. Does not contact accounts, databases or AI providers.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const cache = new Map();
function load(file) {
    const absolute = path.resolve(file);
    if (cache.has(absolute)) return cache.get(absolute).exports;
    const module = { exports: {} }; cache.set(absolute, module);
    const code = ts.transpileModule(fs.readFileSync(absolute, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText;
    const localRequire = name => {
        if (name.startsWith('@/') || name.startsWith('.')) {
            const base = name.startsWith('@/') ? path.join(process.cwd(), name.slice(2)) : path.resolve(path.dirname(absolute), name);
            return base.endsWith('.json') ? JSON.parse(fs.readFileSync(base, 'utf8')) : load(base.endsWith('.ts') ? base : `${base}.ts`);
        }
        return require(name);
    };
    new Function('exports', 'require', 'module', code)(module.exports, localRequire, module);
    return module.exports;
}
const { clientJson } = load('lib/client-json.ts');
const planner = load('lib/planner.ts');
const dates = load('lib/travel-dates.ts');
const fx = load('lib/currency/config.ts');
const directory = load('lib/destination-options.ts');
const destinations = load('lib/destinations.ts');
let passed = 0;
async function check(name, fn) { await fn(); passed++; console.log(`PASS ${name}`); }
const originalFetch = global.fetch;
async function run() {
    await check('JSON result and status are available to callers', async () => {
        global.fetch = async () => Response.json({ id: 'saved-trip' });
        const result = await clientJson('/example', { method: 'POST' });
        assert.equal(result.response.status, 200); assert.equal(result.data.id, 'saved-trip');
        global.fetch = async () => Response.json({ error: 'Try again' }, { status: 503 });
        const failed = await clientJson('/example', {});
        assert.equal(failed.response.status, 503); assert.equal(failed.data.error, 'Try again');
    });
    await check('HTML instead of JSON produces a readable retry message', async () => {
        global.fetch = async () => new Response('<html>Unavailable</html>', { status: 502 });
        await assert.rejects(clientJson('/example', {}), /unexpected response/);
    });
    await check('network failure settles instead of leaving a pending request', async () => {
        global.fetch = async () => { throw new TypeError('Network unavailable'); };
        await assert.rejects(clientJson('/example', {}), /Network unavailable/);
    });
    const waitForAbort = signal => new Promise((resolve, reject) => {
        if (signal.aborted) { reject(new DOMException('Aborted', 'AbortError')); return; }
        signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')), { once: true });
    });
    await check('a stalled connection reaches a timeout', async () => {
        global.fetch = (_url, init) => waitForAbort(init.signal);
        await assert.rejects(clientJson('/example', {}, { timeoutMs: 15 }), /connection timed out/);
    });
    await check('timeout also covers a stalled response body', async () => {
        global.fetch = async (_url, init) => ({ json: () => waitForAbort(init.signal) });
        await assert.rejects(clientJson('/example', {}, { timeoutMs: 15 }), /connection timed out/);
    });
    await check('switching destinations can cancel an old request', async () => {
        global.fetch = (_url, init) => waitForAbort(init.signal);
        const controller = new AbortController();
        const pending = clientJson('/example', {}, { signal: controller.signal });
        controller.abort();
        await assert.rejects(pending, error => error.name === 'AbortError');
    });
    await check('day and traveler changes preserve correct combined ticket totals', () => {
        const colosseum = planner.makePlanItem('colosseum'), forum = planner.makePlanItem('roman-forum');
        const plan = { ...planner.emptyPlan, travelers: 2, items: [colosseum, forum] };
        assert.equal(planner.calculatePlan(plan).min, 36);
        assert.equal(planner.calculatePlan(plan).details[1].included, true);
        forum.day = 2; assert.equal(planner.calculatePlan(plan).min, 72);
        plan.travelers = 3; assert.equal(planner.calculatePlan(plan).min, 108);
    });
    await check('quotes, purchases and group costs update the budget estimate', () => {
        const taxi = planner.makePlanItem('fco-taxi');
        const plan = { ...planner.emptyPlan, travelers: 4, budget: 60, items: [taxi] };
        assert.equal(planner.calculatePlan(plan).min, 55);
        taxi.quote = 35; taxi.quantity = 2;
        assert.equal(planner.calculatePlan(plan).max, 70);
        assert.equal(planner.calculatePlan(plan).overBudget, true);
        plan.items = []; assert.equal(planner.calculatePlan(plan).min, 0);
    });
    await check('hotel stays need a quote before entering the estimate', () => {
        const hotel = planner.makePlanItem('hotel-artemide');
        const plan = { ...planner.emptyPlan, items: [hotel] };
        assert.equal(planner.calculatePlan(plan).missing, 1);
        hotel.billing = 'room-night'; hotel.quote = 100; hotel.quantity = 3;
        assert.equal(planner.calculatePlan(plan).min, 300);
        assert.equal(planner.planSchema.safeParse(plan).success, true);
    });
    await check('dates stay consistent across month and leap-year boundaries', () => {
        assert.equal(dates.endForDays('2026-10-30', 5), '2026-11-03');
        assert.equal(dates.travelDays('2028-02-28', '2028-03-01'), 3);
        assert.equal(dates.travelDays('2026-10-20', '2026-10-20'), 1);
    });
    await check('destination changes retain preferences without carrying Rome places', () => {
        const options = directory.destinationOptions();
        assert.ok(options.length > 50);
        assert.equal(options.find(option => option.id === 'france').planning, false);
        assert.equal(options.find(option => option.id === 'italy/rome').planning, true);
        const href = destinations.destinationHref('/concierge', 'france', { days: '5', travelers: '3', place: 'colosseum' });
        assert.equal(href, '/concierge?destination=france&days=5&travelers=3');
    });
    await check('display currencies round-trip without changing stored budget', () => {
        const rates = JSON.parse(fs.readFileSync('data/fx-fallback.json', 'utf8')).rates;
        for (const currency of fx.CURRENCIES) assert.ok(Math.abs(fx.convert(fx.convert(123.45, 'EUR', currency, rates), currency, 'EUR', rates) - 123.45) < 0.00001);
    });
    console.log(`${passed} functional checks passed. No live account or provider operations performed.`);
}
run().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => { global.fetch = originalFetch; });
