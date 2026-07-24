import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

// 20 Norway attractions with Wikipedia page titles to query
const norwayItems = [
  { name: "Geirangerfjord", file: "norway-geirangerfjord.jpg", wiki: "Geirangerfjord" },
  { name: "Northern Lights (Tromsø)", file: "norway-northern-lights-tromso.jpg", wiki: "Northern_lights" },
  { name: "Bryggen Wharf", file: "norway-bryggen-wharf.jpg", wiki: "Bryggen" },
  { name: "Preikestolen (Pulpit Rock)", file: "norway-preikestolen-pulpit-rock.jpg", wiki: "Preikestolen" },
  { name: "Lofoten Islands", file: "norway-lofoten-islands.jpg", wiki: "Lofoten" },
  { name: "Trolltunga", file: "norway-trolltunga.jpg", wiki: "Trolltunga" },
  { name: "Flåm Railway (Flåmsbana)", file: "norway-flam-railway.jpg", wiki: "Flåm_Line" },
  { name: "Vigeland Sculpture Park", file: "norway-vigeland-sculpture-park.jpg", wiki: "Frogner_Park" },
  { name: "Alesund", file: "norway-alesund.jpg", wiki: "Ålesund" },
  { name: "Borgund Stave Church", file: "norway-borgund-stave-church.jpg", wiki: "Borgund_Stave_Church" },
  { name: "Hardangerfjord", file: "norway-hardangerfjord.jpg", wiki: "Hardangerfjord" },
  { name: "Sognefjord", file: "norway-sognefjord.jpg", wiki: "Sognefjord" },
  { name: "Atlantic Ocean Road", file: "norway-atlanterhavsveien.jpg", wiki: "Atlantic_Ocean_Road" },
  { name: "Jostedalsbreen Glacier", file: "norway-jostedalsbreen.jpg", wiki: "Jostedalsbreen" },
  { name: "National Museum Oslo", file: "norway-national-museum-oslo.jpg", wiki: "National_Museum_of_Art,_Architecture_and_Design" },
  { name: "Ålesund Art Nouveau Centre", file: "norway-art-nouveau-centre.jpg", wiki: "Jugendstilsenteret" },
  { name: "Nærøyfjord", file: "norway-naroyfjord.jpg", wiki: "Nærøyfjord" },
  { name: "Kjeragbolten", file: "norway-kjeragbolten.jpg", wiki: "Kjeragbolten" },
  { name: "Røros", file: "norway-roros.jpg", wiki: "Røros" },
  { name: "Jotunheimen National Park", file: "norway-jotunheimen.jpg", wiki: "Jotunheimen" }
];

async function fetchWikiImage(wikiTitle) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(wikiTitle)}&prop=pageimages&format=json&pithumbsize=1000`;
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'TravelWebsiteWikiFetcher/1.0 (contact@example.com)' } }, (res) => {
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
    }).on('error', reject);
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Status ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(destPath));
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

const outDir = path.resolve('public/images/attractions');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  console.log("Starting downloads for Norway attractions...");
  for (const item of norwayItems) {
    const filePath = path.join(outDir, item.file);
    console.log(`Processing: ${item.name} (${item.wiki})...`);
    let imgUrl = await fetchWikiImage(item.wiki);
    if (!imgUrl) {
      console.log(`  -> Warning: No thumbnail for ${item.wiki}, trying fallback Wikipedia search...`);
    } else {
      console.log(`  -> Found image: ${imgUrl}`);
      try {
        await downloadFile(imgUrl, filePath);
        const stats = fs.statSync(filePath);
        console.log(`  -> Downloaded ${stats.size} bytes to ${item.file}`);
      } catch (err) {
        console.error(`  -> Failed to download ${imgUrl}: ${err.message}`);
      }
    }
  }
}

run();
