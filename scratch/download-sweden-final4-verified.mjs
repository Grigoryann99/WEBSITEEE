import fs from 'fs';
import path from 'path';
import https from 'https';

const list = [
  { file: "sweden-kungsleden-trail.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Kungsleden_trail.JPG/960px-Kungsleden_trail.JPG" },
  { file: "sweden-hoga-kusten.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/H%C3%B6gakustenbron_from_Sveriges_h%C3%B6gsta_byggnader.jpg/960px-H%C3%B6gakustenbron_from_Sveriges_h%C3%B6gsta_byggnader.jpg" },
  { file: "sweden-nobel-prize-museum.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/B%C3%B6rshuset%2C_Stockholm%2C_2019_%2801%29.jpg/960px-B%C3%B6rshuset%2C_Stockholm%2C_2019_%2801%29.jpg" },
  { file: "sweden-ales-stenar.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Ales_Stenar_from_pole_camera.jpg/960px-Ales_Stenar_from_pole_camera.jpg" }
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
    await new Promise(r => setTimeout(r, 2000));
  }
}

main();
