import fs from 'fs';
import path from 'path';
import https from 'https';

const list = [
  { file: "jordan-madaba-map.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Palmer_%26_Guthe_image_of_the_Medaba_map.jpg/960px-Palmer_%26_Guthe_image_of_the_Medaba_map.jpg" },
  { file: "jordan-baptism-site.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Bethany_%285%29.JPG/960px-Bethany_%285%29.JPG" },
  { file: "jordan-kerak-castle.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Kerak_BW_1.JPG/960px-Kerak_BW_1.JPG" },
  { file: "jordan-shobak-castle.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Shobak_Castle_in_Jordan.jpg/960px-Shobak_Castle_in_Jordan.jpg" },
  { file: "jordan-umm-qais.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Modern_Umm_Qais%2C_Jordan.jpg/960px-Modern_Umm_Qais%2C_Jordan.jpg" },
  { file: "jordan-wadi-al-hasa.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Wadi_Hasa_Jordan.jpg/960px-Wadi_Hasa_Jordan.jpg" },
  { file: "jordan-azraq-wetland.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Azraq_view.jpg/960px-Azraq_view.jpg" },
  { file: "jordan-qasr-amra.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Qasr_Amra_Jordan.jpg/960px-Qasr_Amra_Jordan.jpg" },
  { file: "jordan-main-hot-springs.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Ma%27in_Hot_Springs2.JPG/960px-Ma%27in_Hot_Springs2.JPG" },
  { file: "jordan-royal-automobile-museum.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Jordan_Royal_Automobile_Museum_3.JPG/960px-Jordan_Royal_Automobile_Museum_3.JPG" }
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
