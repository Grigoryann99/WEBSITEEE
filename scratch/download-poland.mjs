import fs from 'fs';
import path from 'path';
import https from 'https';

const polandAttractions = [
  { search: "Wawel Castle", file: "poland-wawel-castle.jpg" },
  { search: "Auschwitz concentration camp", file: "poland-auschwitz-birkenau.jpg" },
  { search: "Warsaw Old Town", file: "poland-warsaw-old-town.jpg" },
  { search: "Wieliczka Salt Mine", file: "poland-wieliczka-salt-mine.jpg" },
  { search: "Białowieża Forest", file: "poland-bialowieza-forest.jpg" },
  { search: "Tatra Mountains", file: "poland-tatra-mountains.jpg" },
  { search: "Malbork Castle", file: "poland-malbork-castle.jpg" },
  { search: "Wrocław Market Square", file: "poland-wroclaw-market-square.jpg" },
  { search: "Gdańsk Main Town", file: "poland-gdansk-old-town.jpg" },
  { search: "Toruń", file: "poland-torun-medieval-town.jpg" },
  { search: "Masurian Lake District", file: "poland-masurian-lakes.jpg" },
  { search: "Main Square, Kraków", file: "poland-krakow-main-market-square.jpg" },
  { search: "Łazienki Park", file: "poland-lazienki-park.jpg" },
  { search: "Royal Castle, Warsaw", file: "poland-warsaw-royal-castle.jpg" },
  { search: "Bieszczady Mountains", file: "poland-bieszczady-mountains.jpg" },
  { search: "Crooked Forest", file: "poland-crooked-forest.jpg" },
  { search: "Morskie Oko", file: "poland-morskie-oko-lake.jpg" },
  { search: "Kazimierz", file: "poland-kazimierz-krakow.jpg" },
  { search: "Poznań Town Hall", file: "poland-poznan-town-hall.jpg" },
  { search: "Zamość", file: "poland-zamosc-old-town.jpg" }
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
  console.log("Downloading 20 Wikipedia images for Poland...");
  for (const item of polandAttractions) {
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
    await new Promise(r => setTimeout(r, 2000));
  }
}

main();
