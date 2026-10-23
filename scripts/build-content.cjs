const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd(), false);
const { pullContent } = require('./pull-content.cjs');
const { readSnapshot } = require('./content-catalog.cjs');
const { buildMediaManifest } = require('./build-media.cjs');
async function prepareBuild() {
    const source = process.env.CONTENT_SOURCE || 'local';
    if (!['local', 'supabase'].includes(source)) throw new Error('CONTENT_SOURCE must be local or supabase.');
    if (source === 'supabase') await pullContent({ apply: true });
    readSnapshot();
    buildMediaManifest();
    console.log(`PASS catalog build source: ${source}`);
}
prepareBuild().catch(() => { console.error('Catalog preparation failed; build stopped to preserve the last published site.'); process.exitCode = 1; });
