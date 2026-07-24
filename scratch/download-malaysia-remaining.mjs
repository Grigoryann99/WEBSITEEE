import fs from 'fs';
import path from 'path';
import https from 'https';

const list = [
  { file: "malaysia-langkawi.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Eagle_square_at_Kuah_Langkawi.jpg/960px-Eagle_square_at_Kuah_Langkawi.jpg" },
  { file: "malaysia-cameron-highlands.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Tea_fields_%28Will_Ellis%29.jpg/960px-Tea_fields_%28Will_Ellis%29.jpg" },
  { file: "malaysia-malacca.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Melaka_View.jpg/960px-Melaka_View.jpg" },
  { file: "malaysia-danum-valley.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Morning_fog_over_Danum_Valley_%2827329938517%29.jpg/960px-Morning_fog_over_Danum_Valley_%2827329938517%29.jpg" },
  { file: "malaysia-kuala-lumpur-chinatown.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Kuala_Lumpur._Jalan_Petaling._2019-12-07_15-24-49.jpg/960px-Kuala_Lumpur._Jalan_Petaling._2019-12-07_15-24-49.jpg" },
  { file: "malaysia-kinabatangan-river.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Kinabatangan_River_%2814154417142%29.jpg/960px-Kinabatangan_River_%2814154417142%29.jpg" },
  { file: "malaysia-perhentian-islands.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Perhentian_islands.png" },
  { file: "malaysia-ipoh.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Ipoh_skyline_24-2.jpg/960px-Ipoh_skyline_24-2.jpg" },
  { file: "malaysia-kl-tower.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Kuala_Lumpur_Tower_20250822_%281%29.jpg/960px-Kuala_Lumpur_Tower_20250822_%281%29.jpg" },
  { file: "malaysia-kota-kinabalu.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Panoramic_view_of_Kota_Kinabalu_City.jpg/960px-Panoramic_view_of_Kota_Kinabalu_City.jpg" },
  { file: "malaysia-kuching.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Kuching_Skyline.jpg" },
  { file: "malaysia-tioman-island.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tioman_island_%283679435126%29.jpg/960px-Tioman_island_%283679435126%29.jpg" },
  { file: "malaysia-penang-hill.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Penang_Hil%2C_George_Town%2C_Penang_2023.jpg/960px-Penang_Hil%2C_George_Town%2C_Penang_2023.jpg" }
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
    if (fs.existsSync(dest) && fs.statSync(dest).size > 10000) {
      console.log(`⏩ Skip ${item.file}`);
      continue;
    }
    try {
      const size = await download(item.url, dest);
      console.log(`✅ ${item.file} -> ${Math.round(size/1024)} KB`);
    } catch (e) {
      console.log(`❌ ${item.file} failed: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 2500));
  }
  console.log("Done.");
}
main();
