// Download authentic, confirmed Wikipedia URLs to prevent HTTP 400 and random photos
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const publicDir = path.join(projectRoot, 'public', 'images', 'attractions');

const targets = [
  {
    file: 'spain-valencia-city-of-arts-sciences.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/El_Palau_de_les_Arts_Reina_Sof%C3%ADa%2C_Valencia_-_Jan_2007.jpg/1280px-El_Palau_de_les_Arts_Reina_Sof%C3%ADa%2C_Valencia_-_Jan_2007.jpg'
  },
  {
    file: 'spain-camino-de-santiago.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Santiago_cathedral_2021.jpg/1280px-Santiago_cathedral_2021.jpg'
  }
];

async function download(url, dest) {
  console.log(`Downloading EXACT URL: ${url}`);
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Referer': 'https://en.wikipedia.org/'
    }
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(buffer));
  console.log(`  ✓ Saved ${path.basename(dest)} (${Math.round(buffer.byteLength / 1024)} KB)`);
}

(async () => {
  for (const t of targets) {
    const dest = path.join(publicDir, t.file);
    try {
      await download(t.url, dest);
    } catch (e) {
      console.error(`  ✗ Failed: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 1000));
  }
})();
