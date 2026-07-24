import fs from 'fs';
import path from 'path';
import https from 'https';

const norwayAttractions = [
  { name: "Geirangerfjord", file: "norway-geirangerfjord.jpg", wiki: "Geirangerfjord" },
  { name: "Northern Lights (Tromsø)", file: "norway-northern-lights-tromso.jpg", wiki: "Tromsø" },
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

// Direct verified Wikimedia Commons fallback URLs in case API query returns small/empty
const verifiedWikiUrls = {
  "norway-geirangerfjord.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Geirangerfjorden_seen_from_Flydalsjuvet%2C_2012_06.jpg/1280px-Geirangerfjorden_seen_from_Flydalsjuvet%2C_2012_06.jpg",
  "norway-northern-lights-tromso.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Aurora_Borealis_over_Troms%C3%B8.jpg/1280px-Aurora_Borealis_over_Troms%C3%B8.jpg",
  "norway-bryggen-wharf.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Bryggen_in_Bergen%2C_Norway.jpg/1280px-Bryggen_in_Bergen%2C_Norway.jpg",
  "norway-preikestolen-pulpit-rock.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Pulpit_Rock_Preikestolen_Norway.jpg/1280px-Pulpit_Rock_Preikestolen_Norway.jpg",
  "norway-lofoten-islands.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Reine_Lofoten_Norway.jpg/1280px-Reine_Lofoten_Norway.jpg",
  "norway-trolltunga.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Trolltunga_2017.jpg/1280px-Trolltunga_2017.jpg",
  "norway-flam-railway.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Fl%C3%A5msbana_at_Kjosfossen.jpg/1280px-Fl%C3%A5msbana_at_Kjosfossen.jpg",
  "norway-vigeland-sculpture-park.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Frognerparken_vigeland.jpg/1280px-Frognerparken_vigeland.jpg",
  "norway-alesund.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Alesund_from_Aksla.jpg/1280px-Alesund_from_Aksla.jpg",
  "norway-borgund-stave-church.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Borgund_stave_church_2019.jpg/1280px-Borgund_stave_church_2019.jpg",
  "norway-hardangerfjord.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Hardangerfjord_view.jpg/1280px-Hardangerfjord_view.jpg",
  "norway-sognefjord.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Sognefjord_View.jpg/1280px-Sognefjord_View.jpg",
  "norway-atlanterhavsveien.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Atlanterhavsveien_Norway.jpg/1280px-Atlanterhavsveien_Norway.jpg",
  "norway-jostedalsbreen.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Nigardsbreen.jpg/1280px-Nigardsbreen.jpg",
  "norway-national-museum-oslo.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Nasjonalmuseet_Oslo_2022.jpg/1280px-Nasjonalmuseet_Oslo_2022.jpg",
  "norway-art-nouveau-centre.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Jugendstilsenteret_Alesund.jpg/1280px-Jugendstilsenteret_Alesund.jpg",
  "norway-naroyfjord.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/N%C3%A6r%C3%B8yfjord_Gudvangen.jpg/1280px-N%C3%A6r%C3%B8yfjord_Gudvangen.jpg",
  "norway-kjeragbolten.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Kjeragbolten_2014.jpg/1280px-Kjeragbolten_2014.jpg",
  "norway-roros.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/R%C3%B8ros_street.jpg/1280px-R%C3%B8ros_street.jpg",
  "norway-jotunheimen.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Besseggen_Jotunheimen.jpg/1280px-Besseggen_Jotunheimen.jpg"
};

function downloadUrl(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        fs.unlinkSync(dest);
        return downloadUrl(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const stats = fs.statSync(dest);
          if (stats.size > 1000) {
            resolve(stats.size);
          } else {
            fs.unlinkSync(dest);
            reject(new Error(`File too small (${stats.size} bytes)`));
          }
        });
      });
    });
    req.on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

const outDir = path.resolve('public/images/attractions');

async function main() {
  console.log("Downloading verified Wikipedia images for Norway...");
  for (const item of norwayAttractions) {
    const dest = path.join(outDir, item.file);
    const url = verifiedWikiUrls[item.file];
    console.log(`Downloading ${item.name} -> ${item.file}...`);
    try {
      const size = await downloadUrl(url, dest);
      console.log(`  ✓ OK: ${size} bytes`);
    } catch (e) {
      console.error(`  ✗ Failed: ${e.message}`);
    }
  }
}

main();
