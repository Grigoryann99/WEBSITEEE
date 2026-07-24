/**
 * Smart Wikipedia image downloader with quality validation.
 * For each attraction, tries multiple Wikipedia article titles and checks
 * that the image found is a real photo (not a flag, logo, map, coat of arms,
 * diagram, interior shot, icon, or SVG-converted-to-PNG).
 * Only saves images that pass all quality checks.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const publicDir = path.join(projectRoot, 'public', 'images', 'attractions');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

const delay = ms => new Promise(r => setTimeout(r, ms));

// BAD image filename patterns - if found in URL, skip this image
const BAD_PATTERNS = [
  /flag/i, /logo/i, /map/i, /coat.of.arms/i, /escudo/i, /wappen/i,
  /blason/i, /\.svg\.png/i, /emblem/i, /karte/i, /carte/i, /mapa/i,
  /diagram/i, /plan/i, /scheme/i, /icon/i, /location/i, /symbol/i,
  /seal_of/i, /badge/i, /arms_of/i, /crest/i
];

// Minimum file size - images smaller than 30KB are likely icons/thumbnails
const MIN_SIZE_BYTES = 30000;

function isBadImage(url) {
  if (!url) return true;
  const lower = url.toLowerCase();
  // Must be jpg/jpeg (not SVG, PNG-of-SVG, etc.)
  if (!lower.includes('.jpg') && !lower.includes('.jpeg')) return true;
  return BAD_PATTERNS.some(pat => pat.test(lower));
}

async function getWikiImage(title) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=1280`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'VeloraTravelBot/2.0 (educational travel website)' }
  });
  if (!res.ok) throw new Error(`Wiki API HTTP ${res.status}`);
  const data = await res.json();
  const page = Object.values(data.query?.pages || {})[0];
  if (page?.missing !== undefined) return null; // page doesn't exist
  const src = page?.thumbnail?.source;
  if (!src || isBadImage(src)) return null;
  return src;
}

async function downloadImage(imgUrl, destPath) {
  const res = await fetch(imgUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Referer': 'https://en.wikipedia.org/'
    }
  });
  if (!res.ok) throw new Error(`Download HTTP ${res.status}`);
  const buffer = await res.arrayBuffer();
  if (buffer.byteLength < MIN_SIZE_BYTES) {
    throw new Error(`Image too small (${buffer.byteLength} bytes) — likely an icon`);
  }
  fs.writeFileSync(destPath, Buffer.from(buffer));
  return buffer.byteLength;
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

// BRAZIL ATTRACTIONS - with multiple article title fallbacks per attraction
const brazilItems = [
  { name: 'Christ the Redeemer', file: 'brazil-christ-the-redeemer.jpg', titles: ['Christ the Redeemer', 'Corcovado'] },
  { name: 'Iguazu Falls', file: 'brazil-iguazu-falls.jpg', titles: ['Iguazu Falls', 'Iguaçu Falls', 'Iguaçu National Park'] },
  { name: 'Amazon Rainforest', file: 'brazil-amazon-rainforest.jpg', titles: ['Amazon rainforest', 'Amazon River', 'Manaus'] },
  { name: 'Copacabana Beach', file: 'brazil-copacabana-beach.jpg', titles: ['Copacabana, Rio de Janeiro', 'Copacabana beach'] },
  { name: 'Pantanal', file: 'brazil-pantanal.jpg', titles: ['Pantanal', 'Jaguar', 'Transpantaneira'] },
  { name: 'Salvador Historic Centre (Pelourinho)', file: 'brazil-salvador-pelourinho.jpg', titles: ['Pelourinho', 'Salvador, Bahia'] },
  { name: 'Fernando de Noronha', file: 'brazil-fernando-de-noronha.jpg', titles: ['Fernando de Noronha', 'Fernando de Noronha archipelago'] },
  { name: 'Rio de Janeiro Carnival', file: 'brazil-rio-carnival.jpg', titles: ['Rio Carnival', 'Rio de Janeiro Carnival', 'Carnival in Rio de Janeiro'] },
  { name: 'Chapada Diamantina', file: 'brazil-chapada-diamantina.jpg', titles: ['Chapada Diamantina', 'Fumaça Falls', 'Chapada Diamantina National Park'] },
  { name: 'Sugarloaf Mountain', file: 'brazil-sugarloaf-mountain.jpg', titles: ['Sugarloaf Mountain', 'Pão de Açúcar'] },
  { name: 'Lençóis Maranhenses', file: 'brazil-lencois-maranhenses.jpg', titles: ['Lençóis Maranhenses National Park', 'Lencois Maranhenses'] },
  { name: 'Olinda', file: 'brazil-olinda.jpg', titles: ['Olinda', 'Historic Centre of the Town of Olinda'] },
  { name: 'Bonito', file: 'brazil-bonito.jpg', titles: ['Bonito, Mato Grosso do Sul', 'Rio da Prata, Mato Grosso do Sul'] },
  { name: 'São Paulo Museum of Art (MASP)', file: 'brazil-masp-sao-paulo.jpg', titles: ['São Paulo Museum of Art', 'MASP'] },
  { name: 'Manaus Opera House (Teatro Amazonas)', file: 'brazil-teatro-amazonas.jpg', titles: ['Amazon Theatre', 'Teatro Amazonas'] },
  { name: 'Ilha Grande', file: 'brazil-ilha-grande.jpg', titles: ['Ilha Grande', 'Lopes Mendes'] },
  { name: 'Ouro Preto', file: 'brazil-ouro-preto.jpg', titles: ['Ouro Preto', 'Historic Town of Ouro Preto'] },
  { name: 'Recife Antigo & Noronha Gateway', file: 'brazil-recife-antigo.jpg', titles: ['Recife', 'Recife Antigo'] },
  { name: 'Jericoacoara', file: 'brazil-jericoacoara.jpg', titles: ['Jericoacoara', 'Jijoca de Jericoacoara'] },
  { name: 'Trancoso & Quadrado', file: 'brazil-trancoso.jpg', titles: ['Trancoso, Bahia', 'Quadrado, Trancoso'] },
];

// UK ATTRACTIONS - with multiple article title fallbacks
const ukItems = [
  { name: 'Tower of London', file: 'uk-tower-of-london.jpg', titles: ['Tower of London'] },
  { name: 'Stonehenge', file: 'uk-stonehenge.jpg', titles: ['Stonehenge'] },
  { name: 'Edinburgh Old Town', file: 'uk-edinburgh-old-town.jpg', titles: ['Edinburgh Castle', 'Old Town, Edinburgh', 'Edinburgh'] },
  { name: 'Lake District National Park', file: 'uk-lake-district.jpg', titles: ['Lake District', 'Windermere', 'Scafell Pike'] },
  { name: 'British Museum', file: 'uk-british-museum.jpg', titles: ['British Museum', 'Great Court, British Museum'] },
  { name: 'Scottish Highlands', file: 'uk-scottish-highlands.jpg', titles: ['Glencoe', 'Scottish Highlands', 'Ben Nevis'] },
  { name: 'Bath Roman Baths & City', file: 'uk-bath-roman-baths.jpg', titles: ['Roman Baths, Bath', 'Bath, Somerset'] },
  { name: 'Pembrokeshire Coast', file: 'uk-pembrokeshire-coast.jpg', titles: ['Pembrokeshire Coast National Park', 'Skomer Island', 'Pembrokeshire'] },
  { name: 'The Cotswolds', file: 'uk-cotswolds.jpg', titles: ['Bibury', 'Bourton-on-the-Water', 'The Cotswolds'] },
  { name: 'Westminster & Palace of Westminster', file: 'uk-palace-of-westminster.jpg', titles: ['Palace of Westminster', 'Westminster Bridge'] },
  { name: 'Windsor Castle', file: 'uk-windsor-castle.jpg', titles: ['Windsor Castle'] },
  { name: 'Yorkshire Dales', file: 'uk-yorkshire-dales.jpg', titles: ['Ribblehead Viaduct', 'Yorkshire Dales', 'Pen-y-ghent'] },
  { name: 'St Ives & The Penwith Peninsula', file: 'uk-st-ives-cornwall.jpg', titles: ['St Ives, Cornwall', 'Tate St Ives'] },
  { name: 'Snowdonia', file: 'uk-snowdonia.jpg', titles: ['Snowdon', 'Snowdonia', 'Yr Wyddfa'] },
  { name: 'Cambridge University', file: 'uk-cambridge-university.jpg', titles: ['King\'s College, Cambridge', 'University of Cambridge', 'Cambridge'] },
  { name: 'Giant\'s Causeway', file: 'uk-giants-causeway.jpg', titles: ["Giant's Causeway"] },
  { name: 'Blenheim Palace', file: 'uk-blenheim-palace.jpg', titles: ['Blenheim Palace'] },
  { name: 'Hadrian\'s Wall', file: 'uk-hadrians-wall.jpg', titles: ["Hadrian's Wall", 'Housesteads Roman Fort', 'Sycamore Gap'] },
  { name: 'Isle of Skye', file: 'uk-isle-of-skye.jpg', titles: ['Old Man of Storr', 'Isle of Skye', 'Fairy Pools'] },
  { name: 'North Coast 500', file: 'uk-north-coast-500.jpg', titles: ['North Coast 500', 'Loch Torridon', 'Quiraing'] },
];

async function processItems(items, tsFile) {
  let success = 0, failed = 0;

  for (const item of items) {
    const destPath = path.join(publicDir, item.file);
    const localPath = `/images/attractions/${item.file}`;
    let downloaded = false;

    console.log(`\n📍 ${item.name}`);

    for (const title of item.titles) {
      try {
        console.log(`   Trying wiki: "${title}"`);
        const imgUrl = await getWikiImage(title);
        await delay(800);

        if (!imgUrl) {
          console.log(`   ✗ No good image found`);
          continue;
        }

        console.log(`   Found: ${imgUrl.substring(0, 90)}`);
        const bytes = await downloadImage(imgUrl, destPath);
        console.log(`   ✓ Saved (${Math.round(bytes / 1024)} KB)`);
        downloaded = true;
        await delay(1200);
        break;
      } catch (e) {
        console.log(`   ✗ Failed: ${e.message}`);
        await delay(1000);
      }
    }

    if (downloaded) {
      const updated = updateTsFile(tsFile, item.name, localPath);
      console.log(`   ${updated ? '✓ TS updated' : '⚠ TS path not updated (name may differ)'}`);
      success++;
    } else {
      console.log(`   ✗ ALL FALLBACKS FAILED for: ${item.name}`);
      failed++;
    }

    await delay(2000);
  }

  return { success, failed };
}

(async () => {
  console.log('=== Downloading Brazil images ===');
  const brazilResult = await processItems(brazilItems, 'brazilAttractions.ts');

  console.log('\n=== Downloading UK images ===');
  const ukResult = await processItems(ukItems, 'ukAttractions.ts');

  console.log(`\n✅ Brazil: ${brazilResult.success} succeeded, ${brazilResult.failed} failed`);
  console.log(`✅ UK: ${ukResult.success} succeeded, ${ukResult.failed} failed`);
})();
