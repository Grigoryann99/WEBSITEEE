import fs from 'fs';
import path from 'path';
import https from 'https';

const list = [
  { file: "poland-masurian-lakes.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Jezioro_%C5%9Aniardwy.JPG/960px-Jezioro_%C5%9Aniardwy.JPG" },
  { file: "poland-krakow-main-market-square.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Sukiennice_and_Main_Market_Square_Krakow_Poland.JPG/960px-Sukiennice_and_Main_Market_Square_Krakow_Poland.JPG" },
  { file: "poland-lazienki-park.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Pa%C5%82ac_Na_Wyspie_w_Warszawie.jpg/960px-Pa%C5%82ac_Na_Wyspie_w_Warszawie.jpg" },
  { file: "poland-warsaw-royal-castle.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Royal_Castle_in_Warsaw%2C_Poland%2C_2022%2C_03.jpg/960px-Royal_Castle_in_Warsaw%2C_Poland%2C_2022%2C_03.jpg" },
  { file: "poland-bieszczady-mountains.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Bieszczady-2022-10-09_14.jpg/960px-Bieszczady-2022-10-09_14.jpg" },
  { file: "poland-crooked-forest.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Crooked_Forest.jpg/960px-Crooked_Forest.jpg" },
  { file: "poland-morskie-oko-lake.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/6/62/Morskie_Oko_08_VIII_2004-0015.jpg" },
  { file: "poland-kazimierz-krakow.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Krak%C3%B3w_Kazimierz_Ulica_Szeroka.jpg/960px-Krak%C3%B3w_Kazimierz_Ulica_Szeroka.jpg" },
  { file: "poland-poznan-town-hall.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Ayuntamiento%2C_Poznan%2C_Polonia%2C_2019-12-18%2C_DD_04-06_HDR.jpg/960px-Ayuntamiento%2C_Poznan%2C_Polonia%2C_2019-12-18%2C_DD_04-06_HDR.jpg" },
  { file: "poland-zamosc-old-town.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Zamojski_ratusz_2.jpg/960px-Zamojski_ratusz_2.jpg" }
];

const headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
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
