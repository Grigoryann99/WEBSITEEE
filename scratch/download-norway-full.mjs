import fs from 'fs';
import path from 'path';
import https from 'https';

const items = [
  { wiki: "Geirangerfjord", file: "norway-geirangerfjord.jpg" },
  { wiki: "Aurora", file: "norway-northern-lights-tromso.jpg" },
  { wiki: "Bryggen", file: "norway-bryggen-wharf.jpg" },
  { wiki: "Preikestolen", file: "norway-preikestolen-pulpit-rock.jpg" },
  { wiki: "Lofoten", file: "norway-lofoten-islands.jpg" },
  { wiki: "Trolltunga", file: "norway-trolltunga.jpg" },
  { wiki: "Flåm_Line", file: "norway-flam-railway.jpg" },
  { wiki: "Frogner_Park", file: "norway-vigeland-sculpture-park.jpg" },
  { wiki: "Ålesund", file: "norway-alesund.jpg" },
  { wiki: "Borgund_Stave_Church", file: "norway-borgund-stave-church.jpg" },
  { wiki: "Hardangerfjord", file: "norway-hardangerfjord.jpg" },
  { wiki: "Sognefjord", file: "norway-sognefjord.jpg" },
  { wiki: "Atlantic_Ocean_Road", file: "norway-atlanterhavsveien.jpg" },
  { wiki: "Jostedalsbreen", file: "norway-jostedalsbreen.jpg" },
  { wiki: "Nasjonalmuseet", file: "norway-national-museum-oslo.jpg" },
  { wiki: "Jugendstilsenteret", file: "norway-art-nouveau-centre.jpg" },
  { wiki: "Nærøyfjord", file: "norway-naroyfjord.jpg" },
  { wiki: "Kjeragbolten", file: "norway-kjeragbolten.jpg" },
  { wiki: "Røros", file: "norway-roros.jpg" },
  { wiki: "Jotunheimen", file: "norway-jotunheimen.jpg" }
];

function getWikiImageUrl(wikiTitle) {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(wikiTitle)}&prop=pageimages&format=json&pithumbsize=960`;
    https.get(url, { headers: { 'User-Agent': 'TravelAppWiki/1.0 (contact@example.com)' } }, (res) => {
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
    https.get(url, { headers: { 'User-Agent': 'TravelAppWiki/1.0 (contact@example.com)' } }, (res) => {
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
  console.log("Downloading images for Norway...");
  for (const item of items) {
    const dest = path.join(outDir, item.file);
    const imgUrl = await getWikiImageUrl(item.wiki);
    if (!imgUrl) {
      console.log(`❌ No wiki image for ${item.wiki}`);
      continue;
    }
    try {
      const size = await downloadImage(imgUrl, dest);
      console.log(`✅ Downloaded ${item.file} (${Math.round(size/1024)} KB)`);
    } catch (e) {
      console.log(`❌ Failed ${item.file}: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 400));
  }
}

main();
