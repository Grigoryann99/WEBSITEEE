// One live, non-personal smoke request through the configured provider. Never print credentials.
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const cache = new Map();
function load(file) {
    const absolute = path.resolve(file);
    if (cache.has(absolute)) return cache.get(absolute).exports;
    const module = { exports: {} }; cache.set(absolute, module);
    const code = ts.transpileModule(fs.readFileSync(absolute, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
    const localRequire = name => {
        if (!name.startsWith('@/') && !name.startsWith('.')) return require(name);
        const base = name.startsWith('@/') ? path.join(process.cwd(), name.slice(2)) : path.resolve(path.dirname(absolute), name);
        return base.endsWith('.json') ? JSON.parse(fs.readFileSync(base, 'utf8')) : load(base.endsWith('.ts') ? base : `${base}.ts`);
    };
    new Function('exports', 'require', 'module', code)(module.exports, localRequire, module);
    return module.exports;
}
require('dotenv').config({ path: '.env.local', quiet: true });
const { guideContext, GUIDE_SYSTEM_PROMPT, validateGuideReply } = load('lib/concierge-guide.ts');
const OpenAI = require('openai').default;
const { groqModelOptions } = load('lib/ai-config.ts');
(async () => {
    if (!process.env.GROQ_API_KEY) throw new Error('Not configured');
    const context = guideContext('france');
    const provider = new OpenAI({ apiKey: process.env.GROQ_API_KEY, baseURL: 'https://api.groq.com/openai/v1', timeout: 30000, maxRetries: 0 });
    if (process.argv.includes('--models')) {
        const models = await provider.models.list();
        console.log(JSON.stringify({ models: models.data.map(model => model.id) })); return;
    }
    const response = await provider.chat.completions.create({ ...groqModelOptions(), temperature: 0.2, max_completion_tokens: 2400, response_format: { type: 'json_object' }, messages: [
        { role: 'system', content: `${GUIDE_SYSTEM_PROMPT}\nDestination guide: ${JSON.stringify(context)}` },
        { role: 'user', content: 'Which two places in France would suit someone interested in art? Please answer briefly.' },
    ] });
    const result = validateGuideReply(JSON.parse(response.choices[0]?.message.content || '{}'), context.places);
    console.log(JSON.stringify({ providerResponded: true, validated: true, answer: result.answer, places: result.places.map(place => place.name) }));
})().catch(error => { console.error(JSON.stringify({ providerResponded: false, status: error.status || null, code: error.cause?.code || error.code || error.name })); process.exitCode = 1; });
