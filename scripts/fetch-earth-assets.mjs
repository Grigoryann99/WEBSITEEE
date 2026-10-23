import { mkdir, writeFile } from 'node:fs/promises';
const assets = [
    ['https://unpkg.com/three@0.180.0/build/three.module.js', 'public/vendor/three/three.module.js'],
    ['https://unpkg.com/three@0.180.0/build/three.core.js', 'public/vendor/three/three.core.js'],
    ['https://unpkg.com/three@0.180.0/examples/jsm/controls/OrbitControls.js', 'public/vendor/three/OrbitControls.js'],
    ['https://unpkg.com/three@0.180.0/LICENSE', 'public/vendor/three/LICENSE'],
    ['https://threejs.org/examples/textures/planets/earth_day_4096.jpg', 'public/earth/day.jpg'],
    ['https://threejs.org/examples/textures/planets/earth_night_4096.jpg', 'public/earth/night.jpg'],
    ['https://threejs.org/examples/textures/planets/earth_bump_roughness_clouds_4096.jpg', 'scripts/earth-source/packed.jpg'],
    ['https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson', 'scripts/earth-source/countries-source.geojson'],
];
await mkdir('scripts/earth-source', { recursive: true });
await mkdir('public/earth', { recursive: true });
await mkdir('public/vendor/three', { recursive: true });
await Promise.all(assets.map(async ([url, path]) => {
    try {
        const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const bytes = new Uint8Array(await response.arrayBuffer());
        await writeFile(path, bytes);
        console.log(`${path}: ${bytes.length}`);
    } catch (error) { console.error(`${path}: ${error.message}`); process.exitCode = 1; }
}));
