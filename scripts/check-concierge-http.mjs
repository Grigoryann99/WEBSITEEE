import assert from 'node:assert/strict';

const target = new URL(process.argv[2] || 'http://localhost:3000');
const request = (path, options = {}) => fetch(new URL(path, target), { signal: AbortSignal.timeout(30000), ...options });
for (const [path, location] of [['/blog', '/guides'], ['/villas', '/stay'], ['/countries/italy', '/destinations/italy']]) {
    const response = await request(path, { redirect: 'manual' });
    assert.equal(response.status, 308, `${path}: permanent redirect`);
    assert.equal(new URL(response.headers.get('location'), target).pathname, location);
}
for (const path of ['/api/trips', '/api/concierge', '/api/custom-plan']) {
    const rejected = await request(path, { method: 'POST', headers: { Origin: 'https://untrusted.example', 'Content-Type': 'application/json' }, body: '{}' });
    assert.equal(rejected.status, 403, `${path}: reject foreign origin`);
    const body = path === '/api/concierge' ? JSON.stringify({ destinationId: 'italy/rome', message: 'A quiet day of art and food', days: 1, travelers: 2, budgetEur: 100 }) : '{}';
    const guest = await request(path, { method: 'POST', headers: { Origin: target.origin, 'Content-Type': 'application/json' }, body });
    assert.ok([401, 503].includes(guest.status), `${path}: guest must not save or invoke a provider`);
    assert.match(guest.headers.get('cache-control') || '', /no-store/, `${path}: private response must not be cached`);
}
for (const destinationId of ['france', 'japan/tokyo', undefined]) {
    const unsupported = await request('/api/concierge', { method: 'POST', headers: { Origin: target.origin, 'Content-Type': 'application/json' }, body: JSON.stringify({ destinationId, message: 'A quiet day of art and food', days: 1, travelers: 2, budgetEur: 100 }) });
    assert.equal(unsupported.status, 400, 'Reject unavailable or missing destinations before provider and quota calls');
}
const fx = await request('/api/fx');
assert.equal(fx.status, 200);
const rates = await fx.json();
assert.equal(rates.base, 'EUR');
for (const code of ['USD','EUR','AMD','RUB','GBP','CHF','AED','JPY','CNY','TRY']) assert.ok(Number.isFinite(rates.rates[code]) && rates.rates[code] > 0, `${code}: usable rate`);
assert.equal(typeof rates.stale, 'boolean');
console.log('HTTP checks passed: permanent redirects, request origins, guest access, private caching and 10 exchange rates.');
