import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const publicDir = path.join(projectRoot, 'public', 'images', 'attractions');

async function getImageUrl(wikiTitle) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(wikiTitle)}&prop=pageimages&format=json&pithumbsize=1200`;
  const res = await fetch(url, { headers: { 'User-Agent': 'VeloraTravelBot/1.0' } });
  const data = await res.json();
  const page = Object.values(data.query.pages)[0];
  const src = page?.thumbnail?.source;
  if (src && !src.includes('.svg') && !src.includes('Landsat')) return src;
  return null;
}

async function downloadImage(imgUrl, destPath) {
  const response = await fetch(imgUrl, { headers: { 'User-Agent': 'VeloraTravelBot/1.0' }, redirect: 'follow' });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(buffer));
  return buffer.byteLength;
}

(async () => {
  const destPath = path.join(publicDir, 'usa-hana-highway.jpg');
  console.log('Fetching Rainbow Falls (Hawaii) image...');
  const imgUrl = await getImageUrl('Rainbow Falls (Hawaii)');
  if (!imgUrl) { console.log('No image found'); return; }
  console.log('URL:', imgUrl.substring(0, 100));
  const bytes = await downloadImage(imgUrl, destPath);
  console.log(`✓ Saved usa-hana-highway.jpg (${Math.round(bytes / 1024)} KB)`);
})();
