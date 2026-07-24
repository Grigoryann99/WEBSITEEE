import fs from 'fs';
import path from 'path';
import https from 'https';

const swedenAttractions = [
  { search: "Gamla stan", file: "sweden-gamla-stan.jpg" },
  { search: "ABBA The Museum", file: "sweden-abba-museum.jpg" },
  { search: "Vasa Museum", file: "sweden-vasa-museum.jpg" },
  { search: "Icehotel Jukkasjärvi", file: "sweden-ice-hotel.jpg" },
  { search: "Gothenburg archipelago", file: "sweden-gothenburg-archipelago.jpg" },
  { search: "Abisko National Park", file: "sweden-abisko-national-park.jpg" },
  { search: "Drottningholm Palace", file: "sweden-drottningholm-palace.jpg" },
  { search: "Stockholm archipelago", file: "sweden-stockholm-archipelago.jpg" },
  { search: "Visby", file: "sweden-visby-medieval-city.jpg" },
  { search: "Gamla Uppsala", file: "sweden-gamla-uppsala.jpg" },
  { search: "Kungsleden", file: "sweden-kungsleden-trail.jpg" },
  { search: "Avicii Arena", file: "sweden-avicii-arena.jpg" },
  { search: "Kebnekaise", file: "sweden-kebnekaise.jpg" },
  { search: "Kalmar Castle", file: "sweden-kalmar-castle.jpg" },
  { search: "Universeum", file: "sweden-universeum.jpg" },
  { search: "Skansen", file: "sweden-skansen.jpg" },
  { search: "Liseberg", file: "sweden-liseberg.jpg" },
  { search: "High Coast Sweden", file: "sweden-hoga-kusten.jpg" },
  { search: "Nobel Prize Museum", file: "sweden-nobel-prize-museum.jpg" },
  { search: "Ale's Stones", file: "sweden-ales-stenar.jpg" }
];

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
  'Referer': 'https://en.wikipedia.org/'
};

function getWikiImageUrl(searchQuery) {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(searchQuery)}&gsrlimit=1&prop=pageimages&format=json&pithumbsize=960`;
    https.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pages[pageId] && pages[pageId].thumbnail) {
            resolve(pages[pageId].thumbnail.source);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const size = fs.statSync(dest).size;
          resolve(size);
        });
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

const outDir = path.resolve('public/images/attractions');

async function main() {
  console.log("Resuming 20 Wikipedia images for Sweden...");
  for (const item of swedenAttractions) {
    const dest = path.join(outDir, item.file);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 10000) {
      console.log(`⏩ Skipping ${item.file}`);
      continue;
    }
    const imgUrl = await getWikiImageUrl(item.search);
    if (!imgUrl) {
      console.log(`❌ Search failed for ${item.search}`);
      continue;
    }
    try {
      const size = await downloadImage(imgUrl, dest);
      console.log(`✅ Downloaded ${item.file} (${Math.round(size/1024)} KB)`);
    } catch (e) {
      console.log(`❌ Download failed for ${item.file}: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 2500));
  }
}

main();
