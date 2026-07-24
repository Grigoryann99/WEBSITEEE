import fs from 'fs';
import path from 'path';
import https from 'https';

const list = [
  { file: "qatar-the-pearl.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/The_Pearl_Qatar.jpg/960px-The_Pearl_Qatar.jpg" },
  { file: "qatar-inland-sea.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/2/21/Dunes_at_Khawr_al_Udayd_in_2004.jpg" },
  { file: "qatar-lusail-city.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Lusail_City.jpg/960px-Lusail_City.jpg" },
  { file: "qatar-zubarah-fort.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Zubarah_Fort.jpg/960px-Zubarah_Fort.jpg" },
  { file: "qatar-al-shaqab.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Al_Shaqab_indoor_arena.jpg/960px-Al_Shaqab_indoor_arena.jpg" },
  { file: "qatar-qm-gallery-al-riwaq.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/MIA_Park_Doha.jpg/960px-MIA_Park_Doha.jpg" },
  { file: "qatar-camel-race-track.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Camel_racing_in_Qatar.jpg/960px-Camel_racing_in_Qatar.jpg" },
  { file: "qatar-974-stadium.jpg", url: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a8/Stadium_974_exterior.jpg/960px-Stadium_974_exterior.jpg" },
  { file: "qatar-al-zubarah-archaeological-site.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Zubarah_archaeological_site.jpg/960px-Zubarah_archaeological_site.jpg" },
  { file: "qatar-aspire-park.jpg", url: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Aspire_Park%2C_Doha_-_panoramio_%281%29.jpg/960px-Aspire_Park%2C_Doha_-_panoramio_%281%29.jpg" },
  { file: "qatar-321-sports-museum.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Khalifa_International_Stadium.jpg/960px-Khalifa_International_Stadium.jpg" },
  { file: "qatar-al-janoub-stadium.jpg", url: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Panoramic_view_of_Al_Janoub_Stadium_in_Al_Wakrah.png/960px-Panoramic_view_of_Al_Janoub_Stadium_in_Al_Wakrah.png" },
  { file: "qatar-msheireb-downtown.jpg", url: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/Msheireb_Doha.jpg/960px-Msheireb_Doha.jpg" },
  { file: "qatar-al-thumama-stadium.jpg", url: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/Al_Thumama_Stadium_%282%29.jpg/960px-Al_Thumama_Stadium_%282%29.jpg" }
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
