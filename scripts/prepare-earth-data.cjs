const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const cache = new Map();
function load(file) {
    const absolute = path.resolve(file);
    if (cache.has(absolute)) return cache.get(absolute).exports;
    const module = { exports: {} }; cache.set(absolute, module);
    const code = ts.transpileModule(fs.readFileSync(absolute, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
    const localRequire = name => {
        if (!name.startsWith('@/') && !name.startsWith('.')) return require(name);
        const base = name.startsWith('@/') ? path.join(process.cwd(), name.slice(2)) : path.resolve(path.dirname(absolute), name);
        return load(base.endsWith('.ts') ? base : `${base}.ts`);
    };
    new Function('exports', 'require', 'module', code)(module.exports, localRequire, module);
    return module.exports;
}
const { countries } = load('lib/countryData.ts');
const { destinationFlag } = load('lib/country-flags.ts');
const source = JSON.parse(fs.readFileSync('scripts/earth-source/countries-source.geojson', 'utf8'));
const extras = { mv: [3.2, 73.2], sc: [-4.68, 55.49], sg: [1.35, 103.82] };
const features = source.features.map(feature => ({
    iso2: (feature.properties.ISO_A2_EH || feature.properties.ISO_A2).toLowerCase(),
    name: feature.properties.ADMIN,
    center: [feature.properties.LABEL_Y, feature.properties.LABEL_X],
    geometry: JSON.parse(JSON.stringify(feature.geometry, (_, value) => typeof value === 'number' ? Math.round(value * 1000) / 1000 : value)),
}));
const directory = Object.entries(countries).map(([key, country]) => {
    const id = key.replace(/_/g, '-'), flag = destinationFlag(`/destinations/${id}`);
    const iso2 = flag.split('/').pop().replace('.svg', '');
    const center = features.find(feature => feature.iso2 === iso2)?.center || extras[iso2];
    if (!center) throw new Error(`Missing location for ${country.name}`);
    return { id, iso2, name: country.name, center, flag, image: country.destinations.find(place => place.image?.startsWith('/'))?.image || country.heroImage,
        description: country.description, cities: [...new Set(country.destinations.map(place => place.city.split(',')[0].trim()))].slice(0, 6),
        guideHref: `/destinations/${id}`, planningCity: id === 'italy' ? { name: 'Rome', id: 'italy/rome', href: '/destinations/italy/rome' } : null };
}).sort((a, b) => a.name.localeCompare(b.name));
fs.writeFileSync('public/earth/destinations.json', JSON.stringify({ countries: directory, features }));
console.log(`Prepared ${directory.length} destination countries, ${features.length} boundary geometries.`);
