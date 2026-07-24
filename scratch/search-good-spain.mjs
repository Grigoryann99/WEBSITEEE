// Search Wikipedia/Wikimedia for beautiful photos of Valencia City of Arts and Sciences and Camino de Santiago, avoiding maps/logos
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const publicDir = path.join(projectRoot, 'public', 'images', 'attractions');

async function searchWikiImage(query) {
  // Search Commons/Wikipedia for images matching the query
  const url = `https://en.wikipedia.org/w/api.php?action=query&generator=images&titles=${encodeURIComponent(query)}&gimlimit=20&prop=imageinfo&iiprop=url|mime&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const data = await res.json();
  
  if (!data.query || !data.query.pages) {
    return null;
  }

  const pages = Object.values(data.query.pages);
  // Filter for good JPG files that don't contain bad keywords in filename
  const goodImages = pages
    .map(p => p.imageinfo?.[0]?.url)
    .filter(url => {
      if (!url) return false;
      const lower = url.toLowerCase();
      // Must be jpg/jpeg
      if (!lower.endsWith('.jpg') && !lower.endsWith('.jpeg')) return false;
      // Exclude maps, flags, logos, diagrams, interiors, plans
      const badKeywords = ['map', 'flag', 'logo', 'diagram', 'interior', 'plan', 'location', 'coat_of_arms', 'escudo', 'carte', 'karte', 'schema'];
      return !badKeywords.some(kw => lower.includes(kw));
    });

  return goodImages[0] || null;
}

async function download(url, dest) {
  console.log(`Downloading: ${url} to ${dest}`);
  const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(buffer));
  console.log(`  ✓ Saved (${Math.round(buffer.byteLength / 1024)} KB)`);
}

(async () => {
  const tasks = [
    {
      query: 'City of Arts and Sciences',
      file: 'spain-valencia-city-of-arts-sciences.jpg'
    },
    {
      query: 'Camino de Santiago',
      file: 'spain-camino-de-santiago.jpg'
    }
  ];

  for (const t of tasks) {
    console.log(`\nSearching image for: "${t.query}"`);
    try {
      const imgUrl = await searchWikiImage(t.query);
      if (imgUrl) {
        console.log(`  Found good image URL: ${imgUrl}`);
        const dest = path.join(publicDir, t.file);
        await download(imgUrl, dest);
      } else {
        console.log(`  ✗ No good image found for ${t.query}`);
      }
    } catch (e) {
      console.error(`  ✗ Error searching/downloading for ${t.query}: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 2000));
  }
})();
