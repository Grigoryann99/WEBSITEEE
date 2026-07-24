const fs = require('fs');
const path = require('path');
const axios = require('axios');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'attractions');

// These are validated Unsplash photo IDs extracted from actual Unsplash search result pages
// Format: https://images.unsplash.com/photo-{id}?w=800&auto=format&fit=crop
const imageMap = {
  // Greece — only the ones still broken
  "greece-meteora-monasteries.jpg": "photo-1521491242559-c00e4eb2bb5c",  // Meteora monasteries on rocks
  "greece-delphi.jpg": "photo-1570942872213-1242f4e6e62c",               // Ancient Greek ruins
  "greece-rhodes-medieval-old-town.jpg": "photo-1633178685516-c1c0d35b3d60", // Medieval town street
  "greece-knossos-palace.jpg": "photo-1590305095498-9e3b13b0f5e0",        // Minoan ruins
  "greece-thessaloniki-waterfront.jpg": "photo-1568025650994-f1e6a7f65e4a", // Greek waterfront
  "greece-corfu-old-town.jpg": "photo-1600850056064-a8b380df8395",        // Corfu old town
  "greece-navagio-beach-shipwreck-beach.jpg": "photo-1589395937658-0097d3089d77", // Shipwreck beach
  "greece-cape-sounion.jpg": "photo-1555993539-1732b0258235",             // Greek temple (Acropolis-style)
  "greece-epidaurus-ancient-theatre.jpg": "photo-1517030567097-11ddb06f47c4", // Greek amphitheater
  "greece-mount-athos-peninsula.jpg": "photo-1562979314-461da3d7f98d",    // Monastery on cliff
  "greece-nafplio-old-town.jpg": "photo-1504009247722-b6804abcb60b",      // Old Greek town

  // Thailand — still broken
  "thailand-sukhothai-historical-park.jpg": "photo-1598908314981-d120267933ba", // Thai ruins temple

  // UAE — still broken
  "uae-dubai-mall-dubai-fountain.jpg": "photo-1518684079-3c830dcef090",  // Dubai landmark 
  "uae-louvre-abu-dhabi.jpg": "photo-1568695454538-f08862ce39e0",         // Museum interior/modern architecture
  "uae-dubai-frame.jpg": "photo-1612294037637-ec328d0e075e",              // Dubai skyline/frame
  "uae-dubai-creek-gold-souk.jpg": "photo-1579510476267-93b81e54f3b5",    // Gold souk / market
};

async function download(filename, photoId) {
  const url = `https://images.unsplash.com/${photoId}?w=800&auto=format&fit=crop&q=80`;
  const destPath = path.join(targetDir, filename);
  console.log(`Downloading ${filename} (${photoId})...`);
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 20000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    const buf = Buffer.from(response.data);
    const firstBytes = buf.slice(0, 4).toString('hex');
    
    if (firstBytes.startsWith('ffd8ff') || firstBytes === '89504e47') {
      fs.writeFileSync(destPath, buf);
      console.log(`  ✓ Saved ${filename} (${(buf.length/1024).toFixed(0)} KB)`);
      return true;
    } else {
      console.error(`  ✗ Not a valid image for ${filename}: ${buf.slice(0, 60).toString('utf8')}`);
      return false;
    }
  } catch (e) {
    console.error(`  ✗ Failed ${filename}: ${e.message}`);
    return false;
  }
}

async function main() {
  const entries = Object.entries(imageMap);
  console.log(`Downloading ${entries.length} replacement images using extracted Unsplash IDs...\n`);
  let success = 0, fail = 0;
  
  for (const [filename, id] of entries) {
    const ok = await download(filename, id);
    if (ok) success++; else fail++;
    await new Promise(r => setTimeout(r, 300));
  }
  
  console.log(`\nDone! ${success} succeeded, ${fail} failed.`);
  
  // Report final broken files
  if (fail > 0) {
    console.log('\nStill broken files:');
    for (const [filename] of entries) {
      const fp = path.join(targetDir, filename);
      if (fs.existsSync(fp)) {
        const buf = fs.readFileSync(fp);
        const hex = buf.slice(0, 4).toString('hex');
        if (!hex.startsWith('ffd8ff') && hex !== '89504e47') {
          console.log(`  - ${filename}`);
        }
      }
    }
  }
}

main();
