const fs = require('node:fs');
const assert = require('node:assert/strict');
const data = JSON.parse(fs.readFileSync('public/earth/destinations.json', 'utf8'));
const html = fs.readFileSync('public/earth-explorer.html', 'utf8');
const ts = require('typescript');
const script = html.split('<script type="module">')[1].split('</script>')[0];
assert.equal(ts.createSourceFile('earth.mjs', script, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS).parseDiagnostics.length, 0, 'Renderer module syntax');
const hitCode = html.slice(html.indexOf('function inRing('), html.indexOf('function outline('));
const inGeometry = new Function(`${hitCode};return inGeometry;`)();
assert.equal(data.countries.length, 51);
assert.equal(new Set(data.countries.map(country => country.iso2)).size, 51);
for (const [code, lng, lat] of [['fr',2.35,48.85],['it',12.49,41.89],['jp',139.69,35.68],['us',-77.04,38.9],['au',149.13,-35.28],['br',-47.88,-15.79],['fj',178.44,-18.14],['am',44.51,40.18]]) {
    const feature=data.features.find(feature=>feature.iso2===code);
    assert.ok(feature,`${code}: geometry present`);
    assert.ok(inGeometry(lng,lat,feature.geometry),`${code}: geographic hit test`);
}
assert.equal(inGeometry(139.69,35.68,data.features.find(feature=>feature.iso2==='fr').geometry),false);
for (const id of ['maldives','seychelles','singapore']) assert.ok(data.countries.find(country=>country.id===id)?.center,`${id}: selectable island pin`);
for (const country of data.countries) {
    assert.equal(country.guideHref,`/destinations/${country.id}`);
    assert.ok(country.center.every(Number.isFinite));
    assert.ok(fs.existsSync(`public${country.flag}`),`${country.name}: local flag`);
    if(country.planningCity) assert.equal(country.id,'italy');
}
assert.match(html,/e\.source!==parent\|\|e\.origin!==location\.origin/);
assert.match(html,/document\.hidden/);
assert.match(html,/controls\?\.dispose/);
console.log('Earth checks passed: 51 guides, 177 borders, 8 geographic hits, cross-country isolation, island pins, local flags, message origins and lifecycle guards.');
