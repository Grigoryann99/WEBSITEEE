// Keep image existence checks out of server functions: public assets are served by the CDN.
const fs = require('node:fs');
const path = require('node:path');

function buildMediaManifest() {
    const root = path.resolve('public');
    const images = [];
    function visit(directory) {
        for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
            const file = path.join(directory, entry.name);
            if (entry.isDirectory()) visit(file);
            else if (entry.isFile() && /\.(avif|gif|ico|jpe?g|png|svg|webp)$/i.test(entry.name))
                images.push('/' + path.relative(root, file).split(path.sep).join('/'));
        }
    }
    visit(root);
    images.sort();
    const target = 'data/media-manifest.json';
    const text = JSON.stringify(images, null, 2) + '\n';
    if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== text) fs.writeFileSync(target, text);
    console.log(`PASS image manifest: ${images.length} local image paths; no image bytes needed by server functions.`);
}

module.exports = { buildMediaManifest };
if (require.main === module) buildMediaManifest();
