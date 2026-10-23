// Small local loader for data-only TypeScript modules. Never loads environment files.
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
function createLoader() {
    const cache = new Map();
    function load(file) {
        const absolute = path.resolve(file);
        if (cache.has(absolute)) return cache.get(absolute).exports;
        const module = { exports: {} }; cache.set(absolute, module);
        const code = ts.transpileModule(fs.readFileSync(absolute, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText;
        const localRequire = name => {
            if (name.startsWith('@/') || name.startsWith('.')) {
                const base = name.startsWith('@/') ? path.join(process.cwd(), name.slice(2)) : path.resolve(path.dirname(absolute), name);
                if (base.endsWith('.json')) return JSON.parse(fs.readFileSync(base, 'utf8'));
                return load(base.endsWith('.ts') ? base : `${base}.ts`);
            }
            return require(name);
        };
        new Function('exports', 'require', 'module', code)(module.exports, localRequire, module);
        return module.exports;
    }
    return load;
}
module.exports = { createLoader };
