import fs from 'fs';
import path from 'path';
import https from 'https';

const list = [
  { file: "czech-lednice-valtice.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Lednice%E2%80%93Valtice_Cultural_Landscape_Montage_II.jpg/960px-Lednice%E2%80%93Valtice_Cultural_Landscape_Montage_II.jpg" },
  { file: "czech-prachovske-skaly.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Prachauer_felsen_03.jpg/960px-Prachauer_felsen_03.jpg" },
  { file: "czech-brno-cathedral.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Brno-Cathedral_of_St._Peter_and_Paul_2.jpg/960px-Brno-Cathedral_of_St._Peter_and_Paul_2.jpg" },
  { file: "czech-kromeriz-gardens.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Chateau_Kromeriz.jpg/960px-Chateau_Kromeriz.jpg" },
  { file: "czech-olomouc-holy-trinity.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Sloup_Nejsv%C4%9Bt%C4%9Bj%C5%A1%C3%AD_Trojice%2C_Olomouc.jpg/960px-Sloup_Nejsv%C4%9Bt%C4%9Bj%C5%A1%C3%AD_Trojice%2C_Olomouc.jpg" },
  { file: "czech-znojmo-underground.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Znojmo_-_panorama_od_jihu_obr1.jpg/960px-Znojmo_-_panorama_od_jihu_obr1.jpg" },
  { file: "czech-litomysl-castle.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Litomy%C5%A1l_%28Leitomischl%29_chateau_-_by_Pudelek.jpg/960px-Litomy%C5%A1l_%28Leitomischl%29_chateau_-_by_Pudelek.jpg" },
  { file: "czech-konopiste-castle.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Schloss_Konopischt.jpg/960px-Schloss_Konopischt.jpg" },
  { file: "czech-marianske-lazne.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kolon%C3%A1da_M.Gork%C3%A9ho.JPG/960px-Kolon%C3%A1da_M.Gork%C3%A9ho.JPG" },
  { file: "czech-trebon-fishponds.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/T%C5%99ebo%C5%88_-_historick%C3%A9_j%C3%A1dro_obr1.jpg/960px-T%C5%99ebo%C5%88_-_historick%C3%A9_j%C3%A1dro_obr1.jpg" },
  { file: "czech-slavonice.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Slavonice-n%C3%A1m%C4%9Bst%C3%AD_M%C3%ADru.jpg/960px-Slavonice-n%C3%A1m%C4%9Bst%C3%AD_M%C3%ADru.jpg" }
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
