// Final fix script for remaining failed images with corrected Wikipedia titles
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const publicDir = path.join(projectRoot, 'public', 'images', 'attractions');

const toFix = [
  // Thailand
  { file: 'thailand-grand-palace.jpg',            wikiTitle: 'Wat Phra Kaew',                  tsFile: 'thailandAttractions.ts',  tsName: 'Grand Palace' },
  { file: 'thailand-pai-valley.jpg',              wikiTitle: 'Pai, Thailand',                  tsFile: 'thailandAttractions.ts',  tsName: 'Pai Valley' },
  { file: 'thailand-damnoen-saduak-floating-market.jpg', wikiTitle: 'Amphawa Floating Market',  tsFile: 'thailandAttractions.ts',  tsName: 'Damnoen Saduak Floating Market' },
  { file: 'thailand-bridge-on-the-river-kwai.jpg', wikiTitle: 'Khwae Yai River',               tsFile: 'thailandAttractions.ts',  tsName: 'Bridge on the River Kwai' },
  { file: 'thailand-chatuchak-weekend-market.jpg', wikiTitle: 'Chatuchak Weekend Market',      tsFile: 'thailandAttractions.ts',  tsName: 'Chatuchak Weekend Market' },
  { file: 'thailand-koh-lanta.jpg',               wikiTitle: 'Ko Lanta Yai',                   tsFile: 'thailandAttractions.ts',  tsName: 'Koh Lanta' },
  // UAE
  { file: 'uae-ferrari-world-abu-dhabi.jpg',      wikiTitle: 'Ferrari World',                  tsFile: 'uaeAttractions.ts',       tsName: 'Ferrari World Abu Dhabi' },
  { file: 'uae-al-fahidi-historic-district.jpg',  wikiTitle: 'Dubai Museum',                   tsFile: 'uaeAttractions.ts',       tsName: 'Al Fahidi Historic District' },
  { file: 'uae-liwa-oasis.jpg',                   wikiTitle: 'Liwa Oasis',                     tsFile: 'uaeAttractions.ts',       tsName: 'Liwa Oasis' }
];

const delay = ms => new Promise(r => setTimeout(r, ms));

async function getImageUrl(wikiTitle) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(wikiTitle)}&prop=pageimages&format=json&pithumbsize=1200`;
  const res = await fetch(url, { headers: { 'User-Agent': 'VeloraTravelBot/1.0 (admin@velora.travel)' } });
  const data = await res.json();
  const page = Object.values(data.query.pages)[0];
  const src = page?.thumbnail?.source;
  if (src && !src.includes('.svg') && !src.includes('Landsat') && !src.includes('Flag_') && !src.includes('Coat_')) {
    return src;
  }
  return null;
}

async function downloadImage(imgUrl, destPath) {
  const response = await fetch(imgUrl, {
    headers: { 'User-Agent': 'VeloraTravelBot/1.0 (admin@velora.travel)' },
    redirect: 'follow'
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(buffer));
  return buffer.byteLength;
}

function updateTsFile(tsFile, attrName, localPath) {
  const filePath = path.join(projectRoot, 'data', tsFile);
  let content = fs.readFileSync(filePath, 'utf8');
  // Find the attraction block and update its image
  const escapedName = attrName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(name:\\s*"${escapedName}"[\\s\\S]*?image:\\s*)"[^"]*"`, 'g');
  const newContent = content.replace(regex, `$1"${localPath}"`);
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    return true;
  }
  return false;
}

(async () => {
  let successCount = 0;
  let failCount = 0;

  for (const item of toFix) {
    const destPath = path.join(publicDir, item.file);

    console.log(`\nProcessing: ${item.tsName} (wiki: "${item.wikiTitle}")`);
    try {
      const imgUrl = await getImageUrl(item.wikiTitle);
      await delay(1200);

      if (!imgUrl) {
        console.log(`  ✗ No image found`);
        failCount++;
        continue;
      }

      console.log(`  Found: ${imgUrl.substring(0, 90)}`);
      const bytes = await downloadImage(imgUrl, destPath);
      console.log(`  ✓ Saved (${Math.round(bytes / 1024)} KB)`);

      const localPath = `/images/attractions/${item.file}`;
      const updated = updateTsFile(item.tsFile, item.tsName, localPath);
      console.log(`  ${updated ? '✓ TS updated' : '⚠ TS not updated (check name)'}`);
      successCount++;
    } catch (e) {
      console.error(`  ✗ Error: ${e.message}`);
      failCount++;
    }

    await delay(2500);
  }

  console.log(`\n✅ Done! ${successCount} succeeded, ${failCount} failed.`);
})();
