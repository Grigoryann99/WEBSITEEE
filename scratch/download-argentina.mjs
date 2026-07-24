import fs from 'fs';
import path from 'path';
import https from 'https';

const attractions = [
  { title: "Perito Moreno Glacier", file: "argentina-perito-moreno.jpg" },
  { title: "Iguazu Falls", file: "argentina-iguazu-falls.jpg" },
  { title: "Caminito", file: "argentina-la-boca.jpg" },
  { title: "Mendoza, Argentina", file: "argentina-mendoza.jpg" },
  { title: "Bariloche", file: "argentina-bariloche.jpg" },
  { title: "Quebrada de Humahuaca", file: "argentina-quebrada-humahuaca.jpg" },
  { title: "Ushuaia", file: "argentina-ushuaia.jpg" },
  { title: "La Recoleta Cemetery", file: "argentina-recoleta.jpg" },
  { title: "Aconcagua", file: "argentina-aconcagua.jpg" },
  { title: "Valdes Peninsula", file: "argentina-valdes-peninsula.jpg" },
  { title: "Ischigualasto Provincial Park", file: "argentina-ischigualasto.jpg" },
  { title: "Cafayate", file: "argentina-cafayate.jpg" },
  { title: "Punta Tombo", file: "argentina-punta-tombo.jpg" },
  { title: "El Chaltén", file: "argentina-el-chalten.jpg" },
  { title: "San Telmo, Buenos Aires", file: "argentina-san-telmo.jpg" },
  { title: "Iberá Wetlands", file: "argentina-ibera-wetlands.jpg" },
  { title: "Jesuit Block and Estancias of Córdoba", file: "argentina-cordoba.jpg" },
  { title: "Cueva de las Manos", file: "argentina-cueva-de-las-manos.jpg" },
  { title: "Teatro Colón", file: "argentina-teatro-colon.jpg" },
  { title: "Tigre, Buenos Aires", file: "argentina-tigre-delta.jpg" }
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
  console.log("Downloading 20 Wikipedia images for Argentina...");
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
