import fs from 'fs';
import path from 'path';
import https from 'https';

const attractions = [
  { title: "Chichen Itza", file: "mexico-chichen-itza.jpg" },
  { title: "Cenote", file: "mexico-cenotes.jpg" },
  { title: "Teotihuacan", file: "mexico-teotihuacan.jpg" },
  { title: "Tulum", file: "mexico-tulum.jpg" },
  { title: "Zócalo", file: "mexico-city-zocalo.jpg" },
  { title: "Palenque", file: "mexico-palenque.jpg" },
  { title: "Guanajuato City", file: "mexico-guanajuato.jpg" },
  { title: "Oaxaca City", file: "mexico-oaxaca.jpg" },
  { title: "Copper Canyon", file: "mexico-copper-canyon.jpg" },
  { title: "Frida Kahlo Museum", file: "mexico-frida-kahlo-museum.jpg" },
  { title: "Monte Albán", file: "mexico-monte-alban.jpg" },
  { title: "Bacalar", file: "mexico-bacalar.jpg" },
  { title: "Sumidero Canyon", file: "mexico-sumidero-canyon.jpg" },
  { title: "San Cristóbal de las Casas", file: "mexico-san-cristobal.jpg" },
  { title: "Holbox", file: "mexico-holbox.jpg" },
  { title: "San Miguel de Allende", file: "mexico-san-miguel-allende.jpg" },
  { title: "El Arco de Cabo San Lucas", file: "mexico-los-cabos.jpg" },
  { title: "Monarch Butterfly Biosphere Reserve", file: "mexico-monarch-butterfly.jpg" },
  { title: "Uxmal", file: "mexico-uxmal.jpg" },
  { title: "Xochimilco", file: "mexico-xochimilco.jpg" }
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
  console.log("Downloading 20 Wikipedia images for Mexico...");
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
