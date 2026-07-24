// Download remaining 8 photos from Unsplash for Brazil & UK using verified IDs and update TS files
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const publicDir = path.join(projectRoot, 'public', 'images', 'attractions');

const targets = [
  // Brazil
  {
    tsFile: 'brazilAttractions.ts',
    name: 'Ouro Preto',
    file: 'brazil-ouro-preto.jpg',
    url: 'https://images.unsplash.com/photo-1610016302534-6f67f1c968d8?auto=format&fit=crop&w=1000&q=80'
  },
  {
    tsFile: 'brazilAttractions.ts',
    name: 'Jericoacoara',
    file: 'brazil-jericoacoara.jpg',
    url: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&w=1000&q=80'
  },
  // UK
  {
    tsFile: 'ukAttractions.ts',
    name: 'Scottish Highlands',
    file: 'uk-scottish-highlands.jpg',
    url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1000&q=80'
  },
  {
    tsFile: 'ukAttractions.ts',
    name: 'Bath Roman Baths & City',
    file: 'uk-bath-roman-baths.jpg',
    url: 'https://images.unsplash.com/photo-1618083707368-b3823daa2726?auto=format&fit=crop&w=1000&q=80'
  },
  {
    tsFile: 'ukAttractions.ts',
    name: 'Pembrokeshire Coast',
    file: 'uk-pembrokeshire-coast.jpg',
    url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1000&q=80'
  },
  {
    tsFile: 'ukAttractions.ts',
    name: 'The Cotswolds',
    file: 'uk-cotswolds.jpg',
    url: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1000&q=80'
  },
  {
    tsFile: 'ukAttractions.ts',
    name: 'Isle of Skye',
    file: 'uk-isle-of-skye.jpg',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
  },
  {
    tsFile: 'ukAttractions.ts',
    name: 'North Coast 500',
    file: 'uk-north-coast-500.jpg',
    url: 'https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&w=1000&q=80'
  }
];

async function download(url, dest) {
  console.log(`Downloading: ${url}`);
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(buffer));
  console.log(`  ✓ Saved ${path.basename(dest)} (${Math.round(buffer.byteLength / 1024)} KB)`);
}

function updateTsFile(tsFile, attrName, localPath) {
  const filePath = path.join(projectRoot, 'data', tsFile);
  let content = fs.readFileSync(filePath, 'utf8');
  const escapedName = attrName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/&/g, '&');
  const regex = new RegExp(`(name:\\s*"${escapedName}"[\\s\\S]*?image:\\s*)"[^"]*"`, 'g');
  const newContent = content.replace(regex, `$1"${localPath}"`);
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    return true;
  }
  return false;
}

(async () => {
  for (const t of targets) {
    const dest = path.join(publicDir, t.file);
    const localPath = `/images/attractions/${t.file}`;
    try {
      await download(t.url, dest);
      const updated = updateTsFile(t.tsFile, t.name, localPath);
      console.log(`  ${updated ? '✓ TS updated' : '⚠ TS not updated'}`);
    } catch (e) {
      console.error(`  ✗ Failed to download ${t.file}: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  console.log('\nAll remaining Brazil/UK fixes are processed!');
})();
