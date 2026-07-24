import fs from 'fs';
import path from 'path';
import https from 'https';

const items = [
  { search: "Trolltunga", file: "norway-trolltunga.jpg" },
  { search: "Flåm Line railway", file: "norway-flam-railway.jpg" },
  { search: "Hardangerfjord", file: "norway-hardangerfjord.jpg" },
  { search: "Sognefjord", file: "norway-sognefjord.jpg" },
  { search: "Atlantic Ocean Road", file: "norway-atlanterhavsveien.jpg" },
  { search: "Jostedalsbreen", file: "norway-jostedalsbreen.jpg" },
  { search: "National Museum Oslo", file: "norway-national-museum-oslo.jpg" },
  { search: "Jugendstilsenteret Alesund", file: "norway-art-nouveau-centre.jpg" },
  { search: "Nærøyfjord", file: "norway-naroyfjord.jpg" },
  { search: "Kjeragbolten", file: "norway-kjeragbolten.jpg" },
  { search: "Røros town", file: "norway-roros.jpg" },
  { search: "Jotunheimen", file: "norway-jotunheimen.jpg" }
];

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
  'Referer': 'https://en.wikipedia.org/'
};

function searchWikiImage(query) {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=1&prop=pageimages&format=json&pithumbsize=960`;
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
  console.log("Searching and downloading remaining Norway images...");
  for (const item of items) {
    const dest = path.join(outDir, item.file);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 10000) {
      console.log(`⏩ Skipping ${item.file}`);
      continue;
    }
    const imgUrl = await searchWikiImage(item.search);
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
    await new Promise(r => setTimeout(r, 1200));
  }
}

main();
