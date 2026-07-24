import fs from 'fs';
import path from 'path';
import https from 'https';

const attractions = [
  { title: "Milford Sound", file: "new-zealand-milford-sound.jpg" },
  { title: "Hobbiton Movie Set", file: "new-zealand-hobbiton.jpg" },
  { title: "Waiotapu", file: "new-zealand-rotorua.jpg" },
  { title: "Tongariro Alpine Crossing", file: "new-zealand-tongariro.jpg" },
  { title: "Queenstown, New Zealand", file: "new-zealand-queenstown.jpg" },
  { title: "Aoraki / Mount Cook", file: "new-zealand-mount-cook.jpg" },
  { title: "Waitomo Caves", file: "new-zealand-waitomo.jpg" },
  { title: "Abel Tasman National Park", file: "new-zealand-abel-tasman.jpg" },
  { title: "Franz Josef Glacier", file: "new-zealand-franz-josef.jpg" },
  { title: "Bay of Islands", file: "new-zealand-bay-of-islands.jpg" },
  { title: "Wanaka", file: "new-zealand-wanaka.jpg" },
  { title: "Lake Tekapo", file: "new-zealand-lake-tekapo.jpg" },
  { title: "Marlborough wine region", file: "new-zealand-marlborough.jpg" },
  { title: "Cathedral Cove (Coromandel)", file: "new-zealand-coromandel.jpg" },
  { title: "Napier, New Zealand", file: "new-zealand-napier.jpg" },
  { title: "Museum of New Zealand Te Papa Tongarewa", file: "new-zealand-te-papa.jpg" },
  { title: "Milford Track", file: "new-zealand-milford-track.jpg" },
  { title: "Kaikōura", file: "new-zealand-kaikoura.jpg" },
  { title: "Pancake Rocks", file: "new-zealand-pancake-rocks.jpg" },
  { title: "Stewart Island / Rakiura", file: "new-zealand-stewart-island.jpg" }
];

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/121.0.0.0 Safari/537.36',
  'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
  'Referer': 'https://en.wikipedia.org/'
};

function getWikiImage(title) {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&pithumbsize=960&format=json`;
    https.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const p = Object.values(pages)[0];
          resolve(p && p.thumbnail ? p.thumbnail.source : null);
        } catch { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(fs.statSync(dest).size)));
    }).on('error', err => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

const outDir = path.resolve('public/images/attractions');

async function main() {
  console.log("Downloading 20 Wikipedia images for New Zealand...");
  for (const item of attractions) {
    const dest = path.join(outDir, item.file);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 10000) {
      console.log(`⏩ Skip ${item.file}`); continue;
    }
    const imgUrl = await getWikiImage(item.title);
    if (!imgUrl) { console.log(`❌ No image: "${item.title}"`); continue; }
    try {
      const sz = await download(imgUrl, dest);
      console.log(`✅ ${item.file} (${Math.round(sz/1024)} KB)`);
    } catch(e) { console.log(`❌ Failed ${item.file}: ${e.message}`); }
    await new Promise(r => setTimeout(r, 2500));
  }
  console.log("Done.");
}
main();
