import fs from 'fs';
import path from 'path';
import https from 'https';

const list = [
  // Temple of the Tooth - found from query
  { file: "sri-lanka-temple-of-tooth.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/SL_Kandy_asv2020-01_img33_Sacred_Tooth_Temple.jpg/960px-SL_Kandy_asv2020-01_img33_Sacred_Tooth_Temple.jpg" },
  // Nine Arches Bridge - found from query
  { file: "sri-lanka-nine-arches-bridge.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/The_Nine_Arches_Bridge.jpg/960px-The_Nine_Arches_Bridge.jpg" },
  // Adam's Peak - use known Wikimedia file
  { file: "sri-lanka-adams-peak.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Adams_peak_sunset.jpg/960px-Adams_peak_sunset.jpg" },
  // Polonnaruwa - Gal Vihara
  { file: "sri-lanka-polonnaruwa.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Gal_Vihara_02.jpg/960px-Gal_Vihara_02.jpg" },
  // Colombo - found
  { file: "sri-lanka-colombo.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Colombo_city_skyline_at_night.png/960px-Colombo_city_skyline_at_night.png" },
  // Minneriya - found from query
  { file: "sri-lanka-minneriya.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Birds_at_the_Minneriya-Giritale_National_Park.jpg/960px-Birds_at_the_Minneriya-Giritale_National_Park.jpg" },
  // Knuckles - use known Wikimedia file
  { file: "sri-lanka-knuckles-range.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Knuckles_Mountain_Range_Sri_Lanka.jpg/960px-Knuckles_Mountain_Range_Sri_Lanka.jpg" },
  // Jaffna - found from query
  { file: "sri-lanka-jaffna.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Jaffna_montage.jpg/960px-Jaffna_montage.jpg" },
  // Pigeon Island - use known Wikimedia file
  { file: "sri-lanka-pigeon-island.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Pigeon_Island_Sri_Lanka.jpg/960px-Pigeon_Island_Sri_Lanka.jpg" },
  // Pinnawala - found from query
  { file: "sri-lanka-pinnawala.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Pinnawala_01.jpg/960px-Pinnawala_01.jpg" }
];

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/121.0.0.0 Safari/537.36',
  'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
  'Referer': 'https://en.wikipedia.org/'
};

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
  for (const item of list) {
    const dest = path.join(outDir, item.file);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 10000) {
      console.log(`⏩ Skip ${item.file}`); continue;
    }
    try {
      const sz = await download(item.url, dest);
      console.log(`✅ ${item.file} -> ${Math.round(sz/1024)} KB`);
    } catch(e) { console.log(`❌ ${item.file} failed: ${e.message}`); }
    await new Promise(r => setTimeout(r, 2500));
  }
  console.log("Done.");
}
main();
