import fs from 'fs';
import path from 'path';
import https from 'https';

const qatarAttractions = [
  { search: "Museum of Islamic Art, Doha", file: "qatar-museum-of-islamic-art.jpg" },
  { search: "Souq Waqif", file: "qatar-souq-waqif.jpg" },
  { search: "The Pearl-Qatar", file: "qatar-the-pearl.jpg" },
  { search: "Katara Cultural Village", file: "qatar-katara-cultural-village.jpg" },
  { search: "Khor Al Adaid", file: "qatar-inland-sea.jpg" },
  { search: "National Museum of Qatar", file: "qatar-national-museum.jpg" },
  { search: "Lusail", file: "qatar-lusail-city.jpg" },
  { search: "Al Wakrah", file: "qatar-al-wakrah-harbour.jpg" },
  { search: "Zubarah", file: "qatar-zubarah-fort.jpg" },
  { search: "Doha Corniche", file: "qatar-doha-corniche.jpg" },
  { search: "Al Shaqab", file: "qatar-al-shaqab.jpg" },
  { search: "Al Riwaq", file: "qatar-qm-gallery-al-riwaq.jpg" },
  { search: "Al Shahaniya", file: "qatar-camel-race-track.jpg" },
  { search: "Stadium 974", file: "qatar-974-stadium.jpg" },
  { search: "Al Zubarah", file: "qatar-al-zubarah-archaeological-site.jpg" },
  { search: "Aspire Park", file: "qatar-aspire-park.jpg" },
  { search: "3-2-1 Qatar Olympic and Sports Museum", file: "qatar-321-sports-museum.jpg" },
  { search: "Al Janoub Stadium", file: "qatar-al-janoub-stadium.jpg" },
  { search: "Msheireb Downtown Doha", file: "qatar-msheireb-downtown.jpg" },
  { search: "Al Thumama Stadium", file: "qatar-al-thumama-stadium.jpg" }
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
        file.close(() => {
          const size = fs.statSync(dest).size;
          resolve(size);
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
  console.log("Downloading 20 Wikipedia images for Qatar...");
  for (const item of qatarAttractions) {
    const dest = path.join(outDir, item.file);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 10000) {
      console.log(`⏩ Skipping ${item.file}`);
      continue;
    }
    const imgUrl = await getWikiImageUrl(item.search);
    if (!imgUrl) {
      console.log(`❌ Search failed for ${item.search}`);
      continue;
    }
    try {
      const size = await downloadImage(imgUrl, dest);
      console.log(`✅ Downloaded ${item.file} (${Math.round(size/1024)} KB)`);
    } catch (e) {
      console.log(`❌ Download failed for ${item.file}: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 2000));
  }
}

main();
