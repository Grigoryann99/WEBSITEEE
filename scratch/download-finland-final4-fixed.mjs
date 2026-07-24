import fs from 'fs';
import path from 'path';
import https from 'https';

const list = [
  { file: "finland-hossa-national-park.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Julma-%C3%96lkky_gorge.jpg/960px-Julma-%C3%96lkky_gorge.jpg" },
  { file: "finland-riisitunturi-national-park.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Noukavaara_-_Riisitunturi_-_Posio_-_Finland.jpg/960px-Noukavaara_-_Riisitunturi_-_Posio_-_Finland.jpg" },
  { file: "finland-savonlinna-opera-festival.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Olofsborg_fr%C3%A5n_sj%C3%B6sidan.JPG/960px-Olofsborg_fr%C3%A5n_sj%C3%B6sidan.JPG" },
  { file: "finland-tampere-vapriikki.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Vapriikki.jpg/960px-Vapriikki.jpg" }
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
    await new Promise(r => setTimeout(r, 6000));
  }
}

main();
