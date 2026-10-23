const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
function load(file) {
    const module = { exports: {} };
    const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
    new Function('exports', 'require', 'module', code)(module.exports, require, module);
    return module.exports;
}
const { boundedJson, sameOrigin } = load('lib/request.ts');
const { jsonLd } = load('lib/json-ld.ts');
const { safeReturnPath } = load('lib/supabase/config.ts');
const { NextRequest } = require('next/server');
let passed = 0;
async function check(name, fn) { await fn(); passed++; console.log(`PASS ${name}`); }
async function run() {
    await check('mutations accept only an exact same-origin request', () => {
        for (const origin of ['https://example.test.evil.test', 'null', 'https://evil.test', null]) {
            const req = new NextRequest('https://example.test/api/trips', { headers: origin ? { Origin: origin } : {} });
            assert.equal(sameOrigin(req), false);
        }
        assert.equal(sameOrigin(new NextRequest('https://example.test/api/trips', { headers: { Origin: 'https://example.test' } })), true);
    });
    const request = (body, type = 'application/json') => new Request('https://example.test', { method: 'POST', headers: { 'Content-Type': type }, body });
    await check('bounded JSON accepts a valid UTF-8 JSON body', async () => {
        assert.deepEqual(await boundedJson(request('{"message":"Բարև"}', 'application/json; charset=utf-8')), { message: 'Բարև' });
    });
    await check('JSONP and non-JSON media types are rejected', async () => {
        for (const type of ['application/jsonp', 'text/plain', 'text/html']) await assert.rejects(boundedJson(request('{}', type)), /JSON required/);
    });
    await check('declared oversize body is rejected before parsing', async () => {
        const req = new Request('https://example.test', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': '1000000' }, body: '{}' });
        await assert.rejects(boundedJson(req, 20), /Request too large/);
    });
    await check('chunked payload is limited by bytes rather than characters', async () => {
        await assert.rejects(boundedJson(request('{"message":"Բարև"}'), 18), /Request too large/);
    });
    await check('malformed JSON does not reach the handler schema', async () => {
        await assert.rejects(boundedJson(request('{broken}')), SyntaxError);
    });
    await check('a stalled request body is cancelled on deadline', async () => {
        let cancelled = false;
        const body = new ReadableStream({ cancel() { cancelled = true; } });
        const req = new Request('https://example.test', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, duplex: 'half' });
        await assert.rejects(boundedJson(req, 100, 20), /timed out/);
        assert.equal(cancelled, true);
    });
    await check('structured data cannot close its script element', () => {
        const source = { name: '</script><img src=x onerror=alert(1)>\u2028\u2029' };
        const output = jsonLd(source);
        assert.ok(!output.includes('<')); assert.ok(!output.includes('\u2028')); assert.deepEqual(JSON.parse(output), source);
    });
    await check('OAuth redirects cannot leave the application', () => {
        for (const value of ['https://evil.test', '//evil.test', '/\\evil.test', '/auth/callback?code=bad', '/account\r\nLocation:evil']) assert.equal(safeReturnPath(value), '/account');
        assert.equal(safeReturnPath('/plan?destination=italy%2Frome'), '/plan?destination=italy%2Frome');
    });
    console.log(`${passed} request-security checks passed.`);
}
run().catch(error => { console.error(error); process.exitCode = 1; });
