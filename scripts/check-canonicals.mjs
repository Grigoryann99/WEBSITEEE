import assert from 'node:assert/strict';

// Run against a running build: node scripts/check-canonicals.mjs http://localhost:3000
const target = new URL(process.argv[2] || 'http://localhost:3000');
const canonicalOrigin = 'https://veloratravel.org';

async function read(path) {
    const response = await fetch(new URL(path, target), { signal: AbortSignal.timeout(30000) });
    assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
    return response.text();
}

function canonicalLinks(html) {
    return (html.match(/<link\b[^>]*>/gi) || [])
        .filter(tag => /\brel="canonical"/i.test(tag))
        .map(tag => tag.match(/\bhref="([^"]+)"/i)?.[1]);
}

const xml = await read('/sitemap.xml');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]));
assert.ok(urls.length > 0, 'Sitemap must contain pages');

const cases = urls.map(url => [url.pathname, url.href]);
cases.push(
    ['/countries/south_africa', `${canonicalOrigin}/countries/south-africa`],
    ['/countries/SOUTH-AFRICA', `${canonicalOrigin}/countries/south-africa`],
    ['/countries/maldives?utm_source=canonical-check', `${canonicalOrigin}/countries/maldives`],
    ['/blog?utm_source=canonical-check', `${canonicalOrigin}/blog`],
);

for (let offset = 0; offset < cases.length; offset += 6) {
    await Promise.all(cases.slice(offset, offset + 6).map(async ([path, expected]) => {
        const html = await read(path);
        const actual = canonicalLinks(html);
        assert.equal(actual.length, 1, `${path}: expected exactly one canonical link`);
        assert.equal(new URL(actual[0]).href, expected, `${path}: incorrect canonical`);
    }));
}

for (const path of ['/countries/not-a-real-country', '/blog/not-a-real-article']) {
    const response = await fetch(new URL(path, target), { signal: AbortSignal.timeout(30000) });
    assert.equal(response.status, 404, `${path}: expected 404`);
    assert.equal(canonicalLinks(await response.text()).length, 0, `${path}: unknown page must not inherit a canonical`);
}

console.log(`Canonical checks passed: ${urls.length} sitemap pages, 4 URL variants, and 2 missing pages.`);
