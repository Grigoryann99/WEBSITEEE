import fs from 'fs';
import path from 'path';
import https from 'https';

const attractions = [
  { title: "Sigiriya", file: "sri-lanka-sigiriya.jpg" },
  { title: "Temple of the Tooth Relic", file: "sri-lanka-temple-of-tooth.jpg" },
  { title: "Nine Arches Bridge, Sri Lanka", file: "sri-lanka-nine-arches-bridge.jpg" },
  { title: "Yala National Park", file: "sri-lanka-yala-national-park.jpg" },
  { title: "Galle Fort", file: "sri-lanka-galle-fort.jpg" },
  { title: "Adam's Peak", file: "sri-lanka-adams-peak.jpg" },
  { title: "Anuradhapura", file: "sri-lanka-anuradhapura.jpg" },
  { title: "Polonnaruwa", file: "sri-lanka-polonnaruwa.jpg" },
  { title: "Blue whale", file: "sri-lanka-mirissa-whale-watching.jpg" },
  { title: "Nuwara Eliya", file: "sri-lanka-nuwara-eliya.jpg" },
  { title: "Dambulla cave temple", file: "sri-lanka-dambulla-cave.jpg" },
  { title: "Udawalawe National Park", file: "sri-lanka-udawalawe.jpg" },
  { title: "Colombo Fort", file: "sri-lanka-colombo.jpg" },
  { title: "Arugam Bay", file: "sri-lanka-arugam-bay.jpg" },
  { title: "Minneriya National Park", file: "sri-lanka-minneriya.jpg" },
  { title: "Knuckles Range", file: "sri-lanka-knuckles-range.jpg" },
  { title: "Horton Plains National Park", file: "sri-lanka-horton-plains.jpg" },
  { title: "Jaffna", file: "sri-lanka-jaffna.jpg" },
  { title: "Pigeon Island National Park", file: "sri-lanka-pigeon-island.jpg" },
  { title: "Pinnawala Elephant Orphanage", file: "sri-lanka-pinnawala.jpg" }
];

const headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
  'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
  'Referer': 'https://en.wikipedia.org/'
};

function getWikiImage(title) {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&pithumbsize=960&format=json`;
    https.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const p = Object.values(pages)[0];
          resolve(p && p.thumbnail ? p.thumbnail.source : null);
        } catch { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

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
  console.log("Downloading 20 Wikipedia images for Sri Lanka...");
  for (const item of attractions) {
    const dest = path.join(outDir, item.file);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 10000) {
      console.log(`⏩ Skip ${item.file}`); continue;
    }
    const imgUrl = await getWikiImage(item.title);
    if (!imgUrl) { console.log(`❌ No image: "${item.title}"`); continue; }
    try {
      const sz = await download(imgUrl, dest);
      console.log(`✅ ${item.file} (${Math.round(sz/1024)} KB)`);
    } catch(e) { console.log(`❌ Failed ${item.file}: ${e.message}`); }
    await new Promise(r => setTimeout(r, 2500));
  }
  console.log("Done.");
}
main();
