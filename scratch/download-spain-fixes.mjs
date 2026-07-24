// Download proper photos for Spain attractions to fix flags and logos
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const publicDir = path.join(projectRoot, 'public', 'images', 'attractions');

const targets = [
  {
    file: 'spain-ibiza-old-town-dalt-vila.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Ibiza_City_from_Mirador_asv2023-04_img5.jpg/1280px-Ibiza_City_from_Mirador_asv2023-04_img5.jpg'
  },
  {
    file: 'spain-ibiza.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Ibiza_Es_Vedr%C3%A0_from_east_asv2023-04_img1.jpg/1280px-Ibiza_Es_Vedr%C3%A0_from_east_asv2023-04_img1.jpg'
  },
  {
    file: 'spain-valencia-city-of-arts-sciences.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/El_Palau_de_les_Arts_Reina_Sof%C3%ADa%2C_Valencia_-_Jan_2007.jpg/1280px-El_Palau_de_les_Arts_Reina_Sof%C3%ADa%2C_Valencia_-_Jan_2007.jpg'
  }
];

async function download(url, dest) {
  console.log(`Downloading ${url} to ${dest}`);
  const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(buffer));
  console.log(`  ✓ Saved (${Math.round(buffer.byteLength / 1024)} KB)`);
}

(async () => {
  for (const t of targets) {
    const dest = path.join(publicDir, t.file);
    try {
      await download(t.url, dest);
    } catch (e) {
      console.error(`  ✗ Failed: ${e.message}`);
    }
  }
  console.log('Finished downloading Spain fixes!');
})();
