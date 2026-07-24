import fs from 'fs';
import path from 'path';
import https from 'https';

const hungaryAttractions = [
  { search: "Hungarian Parliament Building", file: "hungary-parliament.jpg" },
  { search: "Buda Castle", file: "hungary-buda-castle.jpg" },
  { search: "Széchenyi medicinal bath", file: "hungary-szechenyi-baths.jpg" },
  { search: "Fisherman's Bastion", file: "hungary-fishermans-bastion.jpg" },
  { search: "Lake Balaton", file: "hungary-lake-balaton.jpg" },
  { search: "Castle of Eger", file: "hungary-eger-castle.jpg" },
  { search: "Pannonhalma Archabbey", file: "hungary-pannonhalma-archabbey.jpg" },
  { search: "Matthias Church", file: "hungary-matthias-church.jpg" },
  { search: "Hungarian State Opera House", file: "hungary-hungarian-state-opera.jpg" },
  { search: "Early Christian Necropolis of Pécs", file: "hungary-pecs-necropolis.jpg" },
  { search: "Hortobágy National Park", file: "hungary-hortobagy-national-park.jpg" },
  { search: "Baradla cave", file: "hungary-aggtelek-caves.jpg" },
  { search: "Tokaj wine region", file: "hungary-tokaj-wine-region.jpg" },
  { search: "Hollókő", file: "hungary-holloko-village.jpg" },
  { search: "Széchenyi Chain Bridge", file: "hungary-chain-bridge.jpg" },
  { search: "Royal Palace of Gödöllő", file: "hungary-godollo-royal-palace.jpg" },
  { search: "Lake Hévíz", file: "hungary-lake-heviz.jpg" },
  { search: "Cave Bath", file: "hungary-miskolc-tapolca-cave-bath.jpg" },
  { search: "Ruin bar", file: "hungary-budapest-ruin-bars.jpg" },
  { search: "Eszterháza", file: "hungary-esterhazy-palace.jpg" }
];

const headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
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
  console.log("Downloading 20 Wikipedia images for Hungary...");
  for (const item of hungaryAttractions) {
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
