import fs from 'fs';
import path from 'path';
import https from 'https';

const finlandAttractions = [
  { search: "Helsinki Cathedral", file: "finland-helsinki-cathedral.jpg" },
  { search: "Santa Claus Village", file: "finland-santa-claus-village.jpg" },
  { search: "Suomenlinna", file: "finland-suomenlinna.jpg" },
  { search: "Nuuksio National Park", file: "finland-nuuksio-national-park.jpg" },
  { search: "Lake Saimaa", file: "finland-lake-saimaa.jpg" },
  { search: "Koli National Park", file: "finland-koli-national-park.jpg" },
  { search: "Turku Castle", file: "finland-turku-castle.jpg" },
  { search: "Olavinlinna", file: "finland-olavinlinna-castle.jpg" },
  { search: "Urho Kekkonen National Park", file: "finland-urho-kekkonen-national-park.jpg" },
  { search: "Kakslauttanen Arctic Resort", file: "finland-kakslauttanen-resort.jpg" },
  { search: "Oulanka National Park", file: "finland-oulanka-national-park.jpg" },
  { search: "Archipelago National Park", file: "finland-archipelago-national-park.jpg" },
  { search: "Pyynikki observation tower", file: "finland-pyynikki-observation-tower.jpg" },
  { search: "Seurasaari", file: "finland-seurasaari-open-air-museum.jpg" },
  { search: "Bengtskär Lighthouse", file: "finland-bengtskar-lighthouse.jpg" },
  { search: "Hossa National Park", file: "finland-hossa-national-park.jpg" },
  { search: "Riisitunturi National Park", file: "finland-riisitunturi-national-park.jpg" },
  { search: "Savonlinna Opera Festival", file: "finland-savonlinna-opera-festival.jpg" },
  { search: "Vapriikki Museum Centre", file: "finland-tampere-vapriikki.jpg" },
  { search: "Midnight sun", file: "finland-midnight-sun.jpg" }
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
  console.log("Downloading 20 Wikipedia images for Finland...");
  for (const item of finlandAttractions) {
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
