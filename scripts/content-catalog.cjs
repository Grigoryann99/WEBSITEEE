// Offline preparation only. No network, hosted credentials, SQL execution or secret reads.
const fs = require('node:fs');
const path = require('node:path');
const { createLoader } = require('./lib/load-typescript.cjs');
const load = createLoader();
const { catalogSnapshotSchema } = load('lib/content/schema.ts');
const { reviewQueue } = load('lib/content/freshness.ts');
function readSnapshot(file = 'data/catalog/rome.json') {
    const snapshot = catalogSnapshotSchema.parse(JSON.parse(fs.readFileSync(file, 'utf8')));
    for (const { media } of snapshot.entries) {
        if (media?.src.startsWith('/') && !fs.existsSync(path.join('public', media.src)))
            throw new Error(`Missing catalog image: ${media.src}`);
    }
    return snapshot;
}
function sqlText(value) { return `'${String(value).replaceAll("'", "''")}'`; }
function seedSql(snapshot) {
    snapshot = catalogSnapshotSchema.parse(snapshot);
    const json = value => `${sqlText(JSON.stringify(value))}::jsonb`;
    const statements = ['-- Local/staging seed. Existing content is never overwritten.', 'begin;', "set local standard_conforming_strings = on;",
        `insert into travel_content.destinations(id,metadata,review_policy) values(${sqlText(snapshot.destination.id)},${json(snapshot.destination)},${json(snapshot.reviewPolicy)}) on conflict(id) do nothing;`];
    snapshot.entries.forEach((entry, position) => {
        statements.push(`select travel_content.validate_entry(${sqlText(snapshot.destination.id)},${sqlText(entry.place.id)},${json(entry)});`);
        statements.push(`insert into travel_content.places(destination_id,place_id,position,published) values(${sqlText(snapshot.destination.id)},${sqlText(entry.place.id)},${position},${json(entry)}) on conflict(destination_id,place_id) do nothing;`);
    });
    statements.push('commit;', '');
    return statements.join('\n');
}
function reviewReport(snapshot, today = new Date().toISOString().slice(0, 10)) {
    const media = snapshot.entries.map(entry => ({ id: entry.place.id, name: entry.place.name,
        status: !entry.media ? 'missing' : /coat.of.arms|logo_|\.svg/i.test(entry.media.src) ? 'unsuitable' : entry.media.context === 'area' ? 'area-view' : entry.media.representative ? 'illustrative' : entry.media.src.startsWith('/') ? fs.existsSync(path.join('public',entry.media.src)) ? 'local' : 'missing-file' : 'external-not-rechecked',
        src: entry.media?.src || null, credit: entry.media?.credit || null, context: entry.media?.context || null,
        caption: entry.media?.caption || null, license: entry.media?.license || null, licenseUrl: entry.media?.licenseUrl || null }));
    return { asOf: today, destination: snapshot.destination, places: snapshot.entries.length,
        reviewQueue: reviewQueue(snapshot, today), media,
        limits: ['Research dates are not verification dates.', 'External image availability and licences were not rechecked by this offline report.',
            'No automatic source polling or hosted publication is enabled.'] };
}
module.exports = { readSnapshot, seedSql, reviewReport };
if (require.main === module) {
    try {
        const snapshot = readSnapshot();
        const report = reviewReport(snapshot);
        if (process.argv.includes('--prepare')) {
            fs.mkdirSync('scratch', { recursive: true });
            fs.writeFileSync('scratch/content-seed.sql', seedSql(snapshot));
            fs.writeFileSync('scratch/content-review.json', JSON.stringify(report, null, 2) + '\n');
            console.log('Prepared scratch/content-seed.sql and scratch/content-review.json. No database contacted.');
        }
        console.log(JSON.stringify({ destination: snapshot.destination.id, places: report.places,
            dueOrUnverifiedFields: report.reviewQueue.length,
            photosNeedingReplacement: report.media.filter(image => ['missing','missing-file','unsuitable'].includes(image.status)).length,
            contextualPhotosNotShowingVenue: report.media.filter(image => ['illustrative','area-view'].includes(image.status)).length }, null, 2));
    } catch (error) { console.error(error.message); process.exitCode = 1; }
}
