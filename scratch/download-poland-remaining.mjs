import fs from 'fs';
import path from 'path';
import https from 'https';

const list = [
  { file: "poland-masurian-lakes.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Sniardwy_lake.jpg/960px-Sniardwy_lake.jpg" },
  { file: "poland-krakow-main-market-square.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Krak%C3%B3w_-_Rynek_G%C5%82%C3%B3wny_01.jpg/960px-Krak%C3%B3w_-_Rynek_G%C5%82%C3%B3wny_01.jpg" },
  { file: "poland-lazienki-park.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Warszawa_Palac_na_Wodzie.jpg/960px-Warszawa_Palac_na_Wodzie.jpg" },
  { file: "poland-warsaw-royal-castle.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Zamek_Krolewski_w_Warszawie_2019.jpg/960px-Zamek_Krolewski_w_Warszawie_2019.jpg" },
  { file: "poland-bieszczady-mountains.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Bieszczady_Mount_Po%C5%82onina_Cary%C5%84ska.jpg/960px-Bieszczady_Mount_Po%C5%82onina_Cary%C5%84ska.jpg" },
  { file: "poland-crooked-forest.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Krzywy_Las.jpg/960px-Krzywy_Las.jpg" },
  { file: "poland-morskie-oko-lake.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Morskie_Oko_Poland.jpg/960px-Morskie_Oko_Poland.jpg" },
  { file: "poland-kazimierz-krakow.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Krak%C3%B3w_Kazimierz_Ulica_Szeroka.jpg/960px-Krak%C3%B3w_Kazimierz_Ulica_Szeroka.jpg" },
  { file: "poland-poznan-town-hall.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Ratusz_w_Poznaniu.jpg/960px-Ratusz_w_Poznaniu.jpg" },
  { file: "poland-zamosc-old-town.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Ratusz_w_Zamo%C5%9Bciu.jpg/960px-Ratusz_w_Zamo%C5%9Bciu.jpg" }
];

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
  'Referer': 'https://en.wikipedia.org/'
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          resolve(fs.statSync(dest).size);
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
  for (const item of list) {
    const dest = path.join(outDir, item.file);
    try {
      const size = await download(item.url, dest);
      console.log(`✅ ${item.file} -> ${Math.round(size/1024)} KB`);
    } catch (e) {
      console.log(`❌ ${item.file} failed: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 2500));
  }
}

main();
