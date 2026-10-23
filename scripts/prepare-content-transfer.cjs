// Offline preparation; this script never opens a database connection.
const fs = require('node:fs');
const crypto = require('node:crypto');
const { readSnapshot, seedSql } = require('./content-catalog.cjs');
const snapshot = readSnapshot();
const schema = fs.readFileSync('supabase/content/001_catalog.sql', 'utf8');
const unwrap = text => text.replace(/^begin;\s*$/mi, '').replace(/^commit;\s*$/mi, '');
fs.mkdirSync('scratch/content-transfer', { recursive: true });
const sql = `-- VeloraTravel content import. Apply only after reviewing preflight and backup.\n-- One transaction; existing schema causes an error and rollback, never DROP.\nbegin;\n${unwrap(schema)}\n${unwrap(seedSql(snapshot))}\ncommit;\n`;
fs.writeFileSync('scratch/content-transfer/02-import.sql', sql);
fs.copyFileSync('supabase/content/preflight.sql', 'scratch/content-transfer/01-preflight.sql');
fs.copyFileSync('supabase/content/verify.sql', 'scratch/content-transfer/03-verify.sql');
fs.writeFileSync('scratch/content-transfer/manifest.json', JSON.stringify({ preparedOn: new Date().toISOString(),
    destination: snapshot.destination.id, places: snapshot.entries.length,
    shops: snapshot.entries.filter(entry => entry.place.section === 'shop').length,
    sha256: crypto.createHash('sha256').update(sql).digest('hex'),
    status: 'Prepared locally; no hosted SQL executed. Includes content only, not a database backup or image upload.' }, null, 2) + '\n');
console.log(`Prepared content-transfer: ${snapshot.entries.length} places. No hosted database contacted.`);
