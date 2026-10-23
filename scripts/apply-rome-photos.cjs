// Publish only manually selected, visually reviewed local images. No network or database access.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { createLoader } = require('./lib/load-typescript.cjs');
const { catalogSnapshotSchema } = createLoader()('lib/content/schema.ts');
const staging = 'scratch/rome-photo-staging';
const manifest = JSON.parse(fs.readFileSync(path.join(staging, 'manifest.json'), 'utf8'));
const plan = {
    'vatican-museums': ['venue', 'The historic entrance to the Vatican Museums.', 'The historic Vatican Museums entrance; visitor access arrangements may differ.'],
    'borghese-gallery': ['venue', 'The exterior facade of Galleria Borghese in Rome.', 'Galleria Borghese exterior, photographed in 2015.'],
    'da-enzo': ['venue', 'An antipasto dish photographed at Da Enzo al 29 in 2014.', 'A dish photographed at Da Enzo al 29 in 2014. Menu and presentation may change.'],
    'antico-forno-roscioli': ['venue', 'The sign outside Antico Forno Roscioli in Rome.', 'The bakery sign photographed in 2012.'],
    'hotel-de-russie': ['venue', 'The exterior of Hotel de Russie on Via del Babuino in Rome.', 'An exterior view of Hotel de Russie; interiors and room types are not shown.'],
    'rinascente-tritone': ['area', 'Via del Tritone streetscape in Rome, not the Rinascente store.', 'Via del Tritone streetscape, not a photograph of the Rinascente store.'],
    'castroni-cola': ['area', 'Flowering trees on Via Cola di Rienzo, not the Castroni shop.', 'Via Cola di Rienzo in spring; neighbourhood context, not Castroni’s storefront.'],
    'fabriano-babuino': ['area', 'The Babuino fountain on Via del Babuino, not Fabriano Boutique.', 'The Babuino fountain on Via del Babuino; neighbourhood context, not the shop.'],
    'momoni-babuino': ['area', 'Via del Babuino and All Saints Church in Rome, not the Momonì shop.', 'Via del Babuino near All Saints Church; neighbourhood context, not the boutique.'],
    'feltrinelli-argentina': ['area', 'The archaeological area at Largo di Torre Argentina, not the Feltrinelli bookshop.', 'Largo di Torre Argentina neighbourhood view; the bookshop is not shown.'],
    'hotel-santa-maria': ['area', 'A street in Trastevere, not Hotel Santa Maria or its courtyard.', 'A street in Trastevere; neighbourhood context, not the hotel, courtyard or rooms.'],
    'castel-romano-outlet': ['illustrative', 'Clothes on hangers as shopping inspiration, not Castel Romano outlet.', 'Shopping inspiration: a clothing display, not Castel Romano or its current stock.'],
};
const snapshotFile = 'data/catalog/rome.json';
const snapshot = JSON.parse(fs.readFileSync(snapshotFile, 'utf8'));
const before = snapshot.entries.map(entry => entry.place);
const checkedOn = '2026-10-21';
const changes = 'Resized and converted to WebP. Cards may display a crop.';
const output = 'public/images/places/rome';
const attribution = [];
for (const [id, [context, alt, caption]] of Object.entries(plan)) {
    const source = manifest[id];
    if (!source || !/^(CC BY(?:-SA)? [\d.]+|CC0|Public domain)$/.test(source.license)) throw new Error(`Unapproved licence or missing photo: ${id}`);
    const asset = fs.readFileSync(path.join(staging, source.outputFile));
    if (crypto.createHash('sha256').update(asset).digest('hex') !== source.sha256) throw new Error(`Staged photo changed: ${id}`);
    const entry = snapshot.entries.find(entry => entry.place.id === id);
    if (!entry) throw new Error(`Unknown place: ${id}`);
    const licenseUrl = (source.licenseUrl || 'https://creativecommons.org/publicdomain/mark/1.0/').replace(/^http:/, 'https:');
    entry.media = { type: 'image', src: `/images/places/rome/${id}.webp`,
        credit: `${source.artist} · ${source.license} · Wikimedia Commons`, creditUrl: source.sourceUrl,
        representative: context !== 'venue', context, alt, caption, license: source.license, licenseUrl, changes };
    entry.checks.media = { checkedOn, sourceUrl: source.sourceUrl };
    attribution.push({ placeId: id, asset: entry.media.src, title: source.title, creator: source.artist,
        license: source.license, licenseUrl, sourceUrl: source.sourceUrl, originalUrl: source.originalUrl,
        context, caption, changes, reviewedOn: checkedOn, sha256: source.sha256, bytes: source.bytes });
}
catalogSnapshotSchema.parse(snapshot);
if (JSON.stringify(before) !== JSON.stringify(snapshot.entries.map(entry => entry.place))) throw new Error('Place data unexpectedly changed');
const backup = 'scratch/rome-catalog-before-photos.json';
if (!fs.existsSync(backup)) fs.copyFileSync(snapshotFile, backup, fs.constants.COPYFILE_EXCL);
fs.mkdirSync(output, { recursive: true });
for (const id of Object.keys(plan)) fs.copyFileSync(path.join(staging, manifest[id].outputFile), path.join(output, `${id}.webp`));
fs.writeFileSync(path.join(output, 'attribution.json'), JSON.stringify({ reviewedOn: checkedOn, images: attribution }, null, 2) + '\n');
fs.writeFileSync(snapshotFile, JSON.stringify(snapshot, null, 2) + '\n');
console.log(JSON.stringify({ publishedLocalImages: attribution.length, bytes: attribution.reduce((sum, image) => sum + image.bytes, 0), exactSubjects: attribution.filter(image => image.context === 'venue').length,
    areaViews: attribution.filter(image => image.context === 'area').length, illustrative: attribution.filter(image => image.context === 'illustrative').length, hostedWrites: 0 }, null, 2));
