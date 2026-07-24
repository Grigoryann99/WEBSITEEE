import fs from 'fs';
import path from 'path';
import https from 'https';

const list = [
  { file: "czech-brno-cathedral.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Brno-Cathedral_of_St._Peter_and_Paul_2.jpg/960px-Brno-Cathedral_of_St._Peter_and_Paul_2.jpg" },
  { file: "czech-kromeriz-gardens.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Z%C3%A1mek_Krom%C4%9B%C5%99%C3%AD%C5%BE_2017.jpg/960px-Z%C3%A1mek_Krom%C4%9B%C5%99%C3%AD%C5%BE_2017.jpg" },
  { file: "czech-konopiste-castle.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Z%C3%A1mek_Konopi%C5%A1t%C4%9B_2019.jpg/960px-Z%C3%A1mek_Konopi%C5%A1t%C4%9B_2019.jpg" },
  { file: "czech-marianske-lazne.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kolon%C3%A1da_M.Gork%C3%A9ho.JPG/960px-Kolon%C3%A1da_M.Gork%C3%A9ho.JPG" },
  { file: "czech-trebon-fishponds.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/T%C5%99ebo%C5%88_-_historick%C3%A9_j%C3%A1dro_obr1.jpg/960px-T%C5%99ebo%C5%88_-_historick%C3%A9_j%C3%A1dro_obr1.jpg" },
  { file: "czech-slavonice.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Slavonice-n%C3%A1m%C4%9Bst%C3%AD_M%C3%ADru.jpg/960px-Slavonice-n%C3%A1m%C4%9Bst%C3%AD_M%C3%ADru.jpg" }
];

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
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
