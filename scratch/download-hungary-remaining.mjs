import fs from 'fs';
import path from 'path';
import https from 'https';

const list = [
  { file: "hungary-hungarian-state-opera.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Opera_blue.jpg/960px-Opera_blue.jpg" },
  { file: "hungary-hortobagy-national-park.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Hortobagy-ziehbrunnen.jpg" },
  { file: "hungary-aggtelek-caves.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Baradla-Barlang.jpg/960px-Baradla-Barlang.jpg" },
  { file: "hungary-tokaj-wine-region.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Tokaj_-_Hegyalja-06.jpg" },
  { file: "hungary-holloko-village.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Holloko_Village_Center.jpg/960px-Holloko_Village_Center.jpg" },
  { file: "hungary-chain-bridge.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Sz%C3%A9chenyi_Chain_Bridge_in_Budapest_at_night.jpg/960px-Sz%C3%A9chenyi_Chain_Bridge_in_Budapest_at_night.jpg" },
  { file: "hungary-godollo-royal-palace.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/G%C3%B6d%C3%B6ll%C5%91_Royal_Palace.jpg/960px-G%C3%B6d%C3%B6ll%C5%91_Royal_Palace.jpg" },
  { file: "hungary-lake-heviz.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/2/2b/H%C3%A9v%C3%ADz.jpg" },
  { file: "hungary-miskolc-tapolca-cave-bath.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Entrance_to_Miskolctapolca_baths.jpg/960px-Entrance_to_Miskolctapolca_baths.jpg" },
  { file: "hungary-budapest-ruin-bars.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Szimpla_Kert.jpg/960px-Szimpla_Kert.jpg" },
  { file: "hungary-esterhazy-palace.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/6/62/Fertod07jul0004.jpg" }
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
