import fs from 'fs';
import path from 'path';
import https from 'https';

const jordanAttractions = [
  { search: "Petra", file: "jordan-petra.jpg" },
  { search: "Wadi Rum", file: "jordan-wadi-rum.jpg" },
  { search: "Dead Sea", file: "jordan-dead-sea.jpg" },
  { search: "Jerash", file: "jordan-jerash.jpg" },
  { search: "Aqaba", file: "jordan-aqaba.jpg" },
  { search: "Amman Citadel", file: "jordan-amman-citadel.jpg" },
  { search: "Roman Theatre (Amman)", file: "jordan-roman-amphitheatre.jpg" },
  { search: "Dana Biosphere Reserve", file: "jordan-dana-biosphere.jpg" },
  { search: "Wadi Mujib", file: "jordan-wadi-mujib.jpg" },
  { search: "Ajloun Castle", file: "jordan-ajloun-castle.jpg" },
  { search: "Madaba Map", file: "jordan-madaba-map.jpg" },
  { search: "Al-Maghtas", file: "jordan-baptism-site.jpg" },
  { search: "Kerak Castle", file: "jordan-kerak-castle.jpg" },
  { search: "Shobak (castle)", file: "jordan-shobak-castle.jpg" },
  { search: "Umm Qais", file: "jordan-umm-qais.jpg" },
  { search: "Wadi al-Hasa", file: "jordan-wadi-al-hasa.jpg" },
  { search: "Azraq Wetland Reserve", file: "jordan-azraq-wetland.jpg" },
  { search: "Qasr Amra", file: "jordan-qasr-amra.jpg" },
  { search: "Ma'in Hot Springs", file: "jordan-main-hot-springs.jpg" },
  { search: "Royal Automobile Museum", file: "jordan-royal-automobile-museum.jpg" }
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
  console.log("Downloading 20 Wikipedia images for Jordan...");
  for (const item of jordanAttractions) {
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
