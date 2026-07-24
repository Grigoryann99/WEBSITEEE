import fs from 'fs';
import path from 'path';
import https from 'https';

const czechAttractions = [
  { search: "Prague Castle", file: "czech-prague-castle.jpg" },
  { search: "Charles Bridge", file: "czech-charles-bridge.jpg" },
  { search: "Old Town Square (Prague)", file: "czech-old-town-square.jpg" },
  { search: "Český Krumlov Castle", file: "czech-cesky-krumlov.jpg" },
  { search: "Karlovy Vary", file: "czech-karlovy-vary.jpg" },
  { search: "Sedlec Ossuary", file: "czech-kutna-hora-ossuary.jpg" },
  { search: "Adršpach-Teplice Rocks", file: "czech-adrspach-rocks.jpg" },
  { search: "Lednice–Valtice Cultural Landscape", file: "czech-lednice-valtice.jpg" },
  { search: "Telč", file: "czech-telc.jpg" },
  { search: "Prachov Rocks", file: "czech-prachovske-skaly.jpg" },
  { search: "Bohemian Forest National Park", file: "czech-sumava-national-park.jpg" },
  { search: "Cathedral of St. Peter and Paul, Brno", file: "czech-brno-cathedral.jpg" },
  { search: "Kroměříž Palace", file: "czech-kromeriz-gardens.jpg" },
  { search: "Holy Trinity Column, Olomouc", file: "czech-olomouc-holy-trinity.jpg" },
  { search: "Znojmo", file: "czech-znojmo-underground.jpg" },
  { search: "Litomyšl Castle", file: "czech-litomysl-castle.jpg" },
  { search: "Konopiště", file: "czech-konopiste-castle.jpg" },
  { search: "Mariánské Lázně", file: "czech-marianske-lazne.jpg" },
  { search: "Třeboň", file: "czech-trebon-fishponds.jpg" },
  { search: "Slavonice", file: "czech-slavonice.jpg" }
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
  console.log("Downloading 20 Wikipedia images for Czech Republic...");
  for (const item of czechAttractions) {
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
