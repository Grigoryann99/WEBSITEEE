import fs from 'fs';
import path from 'path';
import https from 'https';

const attractions = [
  { title: "Easter Island", file: "chile-easter-island.jpg" },
  { title: "Valle de la Luna (Chile)", file: "chile-atacama-valle-de-la-luna.jpg" },
  { title: "Torres del Paine National Park", file: "chile-torres-del-paine.jpg" },
  { title: "Valparaíso", file: "chile-valparaiso.jpg" },
  { title: "Marble Caves, Chile", file: "chile-marble-caves.jpg" },
  { title: "Chiloé Island", file: "chile-chiloe.jpg" },
  { title: "El Tatio", file: "chile-el-tatio.jpg" },
  { title: "Lauca National Park", file: "chile-lauca-national-park.jpg" },
  { title: "Carretera Austral", file: "chile-carretera-austral.jpg" },
  { title: "Osorno (volcano)", file: "chile-osorno-volcano.jpg" },
  { title: "Casablanca, Chile", file: "chile-casablanca-valley.jpg" },
  { title: "Gran Torre Santiago", file: "chile-santiago-skyline.jpg" },
  { title: "Conguillío National Park", file: "chile-conguillio.jpg" },
  { title: "Villarrica (volcano)", file: "chile-pucon-villarrica.jpg" },
  { title: "Magdalena Island, Chile", file: "chile-magdalena-island.jpg" },
  { title: "Bahía Inglesa", file: "chile-bahia-inglesa.jpg" },
  { title: "Sewell", file: "chile-sewell.jpg" },
  { title: "Huilo-Huilo Biological Reserve", file: "chile-huilo-huilo.jpg" },
  { title: "Salar de Atacama", file: "chile-salar-de-atacama.jpg" },
  { title: "Futaleufú River", file: "chile-futaleufu-river.jpg" }
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
  console.log("Downloading 20 Wikipedia images for Chile...");
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
    await new Promise(r => setTimeout(r, 2000));
  }
  console.log("Done.");
}
main();
