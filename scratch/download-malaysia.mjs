import fs from 'fs';
import path from 'path';
import https from 'https';

const attractions = [
  { search: "Petronas Towers", file: "malaysia-petronas-towers.jpg" },
  { search: "Batu Caves", file: "malaysia-batu-caves.jpg" },
  { search: "George Town, Penang", file: "malaysia-george-town-penang.jpg" },
  { search: "Langkawi", file: "malaysia-langkawi.jpg" },
  { search: "Cameron Highlands", file: "malaysia-cameron-highlands.jpg" },
  { search: "Mount Kinabalu", file: "malaysia-mount-kinabalu.jpg" },
  { search: "Taman Negara", file: "malaysia-taman-negara.jpg" },
  { search: "Sepilok Orangutan Rehabilitation Centre", file: "malaysia-sepilok-orangutan.jpg" },
  { search: "Mulu Caves", file: "malaysia-mulu-caves.jpg" },
  { search: "Malacca", file: "malaysia-malacca.jpg" },
  { search: "Danum Valley", file: "malaysia-danum-valley.jpg" },
  { search: "Petaling Street", file: "malaysia-kuala-lumpur-chinatown.jpg" },
  { search: "Kinabatangan River", file: "malaysia-kinabatangan-river.jpg" },
  { search: "Perhentian Islands", file: "malaysia-perhentian-islands.jpg" },
  { search: "Ipoh", file: "malaysia-ipoh.jpg" },
  { search: "Menara Kuala Lumpur", file: "malaysia-kl-tower.jpg" },
  { search: "Kota Kinabalu", file: "malaysia-kota-kinabalu.jpg" },
  { search: "Kuching", file: "malaysia-kuching.jpg" },
  { search: "Tioman Island", file: "malaysia-tioman-island.jpg" },
  { search: "Penang Hill", file: "malaysia-penang-hill.jpg" }
];

const headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
  'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
  'Referer': 'https://en.wikipedia.org/'
};

function getWikiImageUrl(searchQuery) {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(searchQuery)}&gsrlimit=1&prop=pageimages&format=json&pithumbsize=960`;
    https.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pages[pageId] && pages[pageId].thumbnail) {
            resolve(pages[pageId].thumbnail.source);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(fs.statSync(dest).size));
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
  console.log("Downloading 20 Wikipedia images for Malaysia...");
  for (const item of attractions) {
    const dest = path.join(outDir, item.file);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 10000) {
      console.log(`⏩ Skip ${item.file}`);
      continue;
    }
    const imgUrl = await getWikiImageUrl(item.search);
    if (!imgUrl) {
      console.log(`❌ No image for "${item.search}"`);
      continue;
    }
    try {
      const size = await downloadImage(imgUrl, dest);
      console.log(`✅ ${item.file} (${Math.round(size/1024)} KB)`);
    } catch (e) {
      console.log(`❌ Failed ${item.file}: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 2500));
  }
  console.log("Done.");
}

main();
