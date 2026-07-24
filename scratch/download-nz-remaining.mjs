import fs from 'fs';
import path from 'path';
import https from 'https';

const list = [
  { file: "new-zealand-tongariro.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Emerald_Lakes%2C_Tongariro.jpg/960px-Emerald_Lakes%2C_Tongariro.jpg" },
  { file: "new-zealand-waitomo.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Waitomo_Glowworm_Caves_boat.jpg/960px-Waitomo_Glowworm_Caves_boat.jpg" },
  { file: "new-zealand-franz-josef.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Franz_Josef_Glacier_3.jpg/960px-Franz_Josef_Glacier_3.jpg" },
  { file: "new-zealand-bay-of-islands.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Bay_of_Islands_NZ.jpg/960px-Bay_of_Islands_NZ.jpg" },
  { file: "new-zealand-wanaka.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/That_Wanaka_Tree_2019.jpg/960px-That_Wanaka_Tree_2019.jpg" },
  { file: "new-zealand-lake-tekapo.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Lake_Tekapo_Church_of_the_Good_Shepherd.jpg/960px-Lake_Tekapo_Church_of_the_Good_Shepherd.jpg" },
  { file: "new-zealand-marlborough.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Marlborough_Vineyard.jpg/960px-Marlborough_Vineyard.jpg" },
  { file: "new-zealand-coromandel.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Cathedral_Cove_Coromandel.jpg/960px-Cathedral_Cove_Coromandel.jpg" },
  { file: "new-zealand-napier.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Napier_Art_Deco.jpg/960px-Napier_Art_Deco.jpg" },
  { file: "new-zealand-te-papa.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Te_Papa_Tongarewa.jpg/960px-Te_Papa_Tongarewa.jpg" },
  { file: "new-zealand-milford-track.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Milford_Track_Mackinnon_Pass.jpg/960px-Milford_Track_Mackinnon_Pass.jpg" },
  { file: "new-zealand-kaikoura.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Kaikoura_Seal_Colony.jpg/960px-Kaikoura_Seal_Colony.jpg" },
  { file: "new-zealand-pancake-rocks.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Pancake_Rocks_Punakaiki.jpg/960px-Pancake_Rocks_Punakaiki.jpg" },
  { file: "new-zealand-stewart-island.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Oban_Stewart_Island.jpg/960px-Oban_Stewart_Island.jpg" }
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
    await new Promise(r => setTimeout(r, 1500));
  }
  console.log("Done.");
}
main();
