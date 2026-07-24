import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const publicDir = path.join(projectRoot, 'public', 'images', 'attractions');

async function run() {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=Ferrari%20World&prop=pageimages&format=json&pithumbsize=1200`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Bot/1.0' } });
  const d = await res.json();
  const page = Object.values(d.query.pages)[0];
  const src = page?.thumbnail?.source;
  console.log('Found source:', src);
  if (src) {
    const destPath = path.join(publicDir, 'uae-ferrari-world-abu-dhabi.jpg');
    const response = await fetch(src, { headers: { 'User-Agent': 'Bot/1.0' } });
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(buffer));
    console.log('✓ Ferrari World Image Downloaded!');

    // Update TS file
    const tsPath = path.join(projectRoot, 'data', 'uaeAttractions.ts');
    let content = fs.readFileSync(tsPath, 'utf8');
    const regex = /(name:\s*"Ferrari World Abu Dhabi"[\s\S]*?image:\s*)"[^"]*"/g;
    const newContent = content.replace(regex, `$1"/images/attractions/uae-ferrari-world-abu-dhabi.jpg"`);
    fs.writeFileSync(tsPath, newContent, 'utf8');
    console.log('✓ TS updated');
  }
}

run();
