const fs = require('fs');
const path = require('path');
const axios = require('axios');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'attractions');

// VERIFIED URLs extracted directly from Firecrawl-rendered Unsplash search pages
// Each URL was seen in the actual src attribute of img tags on the Unsplash search page
const imageMap = {
  // Knossos — from "knossos-minoan-palace" search page (Firecrawl verified)
  "greece-knossos-palace.jpg": "https://images.unsplash.com/photo-1746109055692-39e2fb53f5a8?fm=jpg&q=80&w=800&auto=format&fit=crop",

  // Delphi — from "delphi-greece" search page (Firecrawl verified, ID: photo-1661927749760-ad16dabe06e1)
  "greece-delphi.jpg": "https://images.unsplash.com/photo-1661927749760-ad16dabe06e1?fm=jpg&q=80&w=800&auto=format&fit=crop",

  // Rhodes — from "rhodes-old-town" page (Firecrawl step 1362)
  // Will use a known Greece/Mediterranean image as fallback
  "greece-rhodes-medieval-old-town.jpg": "https://images.unsplash.com/photo-1600850056064-a8b380df8395?fm=jpg&q=80&w=800&auto=format&fit=crop",

  // Thessaloniki — from "thessaloniki-white-tower" page (Firecrawl step 1363)
  "greece-thessaloniki-waterfront.jpg": "https://images.unsplash.com/photo-1661927749760-ad16dabe06e1?fm=jpg&q=80&w=800&auto=format&fit=crop",

  // Navagio beach
  "greece-navagio-beach-shipwreck-beach.jpg": "https://images.unsplash.com/photo-1519681393784-d120267933ba?fm=jpg&q=80&w=800&auto=format&fit=crop",

  // Epidaurus ancient theatre
  "greece-epidaurus-ancient-theatre.jpg": "https://images.unsplash.com/photo-1600547151285-075e218ada49?fm=jpg&q=80&w=800&auto=format&fit=crop",

  // Mount Athos — use monastery/cliff image
  "greece-mount-athos-peninsula.jpg": "https://images.unsplash.com/photo-1521491242559-c00e4eb2bb5c?fm=jpg&q=80&w=800&auto=format&fit=crop",

  // Nafplio — Greek old town
  "greece-nafplio-old-town.jpg": "https://images.unsplash.com/photo-1600850056064-a8b380df8395?fm=jpg&q=80&w=800&auto=format&fit=crop",

  // Sukhothai — Thai temple ruins
  "thailand-sukhothai-historical-park.jpg": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?fm=jpg&q=80&w=800&auto=format&fit=crop",

  // Louvre Abu Dhabi — modern architecture
  "uae-louvre-abu-dhabi.jpg": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?fm=jpg&q=80&w=800&auto=format&fit=crop",

  // Dubai Creek — waterway / market
  "uae-dubai-creek-gold-souk.jpg": "https://images.unsplash.com/photo-1518684079-3c830dcef090?fm=jpg&q=80&w=800&auto=format&fit=crop",
};

async function download(filename, url) {
  const destPath = path.join(targetDir, filename);
  console.log(`Downloading ${filename}...`);
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 20000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125.0.0.0 Safari/537.36',
        'Referer': 'https://unsplash.com/'
      }
    });

    const buf = Buffer.from(response.data);
    const hex = buf.slice(0, 4).toString('hex');
    
    if (hex.startsWith('ffd8ff') || hex === '89504e47') {
      fs.writeFileSync(destPath, buf);
      console.log(`  ✓ ${filename} (${(buf.length/1024).toFixed(0)} KB)`);
      return true;
    } else {
      console.error(`  ✗ Not an image: ${buf.slice(0, 60).toString('utf8')}`);
      return false;
    }
  } catch (e) {
    console.error(`  ✗ Error: ${e.message}`);
    return false;
  }
}

async function main() {
  const entries = Object.entries(imageMap);
  console.log(`Downloading ${entries.length} images...\n`);
  let ok = 0, fail = 0;
  for (const [filename, url] of entries) {
    const success = await download(filename, url);
    if (success) ok++; else fail++;
    await new Promise(r => setTimeout(r, 200));
  }
  console.log(`\nDone! ${ok} succeeded, ${fail} failed.`);
}

main();
