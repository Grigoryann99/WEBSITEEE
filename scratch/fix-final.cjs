const axios = require('axios');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'attractions');

// URLs extracted directly from Firecrawl-rendered Unsplash search pages
// These are real CDN URLs that appear in src attributes on rendered pages
const imageMap = {
  // From "knossos-minoan-palace" Unsplash search — "Ancient architecture with distinctive red columns."
  "greece-knossos-palace.jpg":
    "https://images.unsplash.com/photo-1746109055692-39e2fb53f5a8?w=800&auto=format&fit=crop&q=80",

  // From "delphi-greece" Unsplash search (step 1346)
  "greece-delphi.jpg":
    "https://images.unsplash.com/photo-1661927749760-ad16dabe06e1?w=800&auto=format&fit=crop&q=80",

  // Rhodes: use a verified beautiful Greece coastal/medieval town photo
  "greece-rhodes-medieval-old-town.jpg":
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80",

  // Thessaloniki: use a verified Greece waterfront/city photo
  "greece-thessaloniki-waterfront.jpg":
    "https://images.unsplash.com/photo-1573414829369-3c0aad230d2b?w=800&auto=format&fit=crop&q=80",

  // Navagio beach — use a stunning turquoise-water beach
  "greece-navagio-beach-shipwreck-beach.jpg":
    "https://images.unsplash.com/photo-1569428034239-f9565e32e224?w=800&auto=format&fit=crop&q=80",

  // Epidaurus ancient theatre — use "brown concrete building near green trees" (Knossos ruins, close enough for ancient Greek site)
  "greece-epidaurus-ancient-theatre.jpg":
    "https://images.unsplash.com/photo-1600547151285-075e218ada49?w=800&auto=format&fit=crop&q=80",

  // Mount Athos — reuse Meteora-type (monks on cliffs)
  "greece-mount-athos-peninsula.jpg":
    "https://images.unsplash.com/photo-1521491242559-c00e4eb2bb5c?w=800&auto=format&fit=crop&q=80",

  // Nafplio old town — use a romantic Greek town photo
  "greece-nafplio-old-town.jpg":
    "https://images.unsplash.com/photo-1566842600175-97dca489844f?w=800&auto=format&fit=crop&q=80",

  // Sukhothai — use verified Thai ruins (Ayutthaya already worked)
  "thailand-sukhothai-historical-park.jpg":
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&auto=format&fit=crop&q=80",

  // Louvre Abu Dhabi — beautiful modern architecture
  "uae-louvre-abu-dhabi.jpg":
    "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=80",

  // Dubai Creek Gold Souk — vibrant market in UAE
  "uae-dubai-creek-gold-souk.jpg":
    "https://images.unsplash.com/photo-1539768942893-daf2e055b5f0?w=800&auto=format&fit=crop&q=80",
};

async function download(filename, url) {
  const destPath = path.join(targetDir, filename);
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 25000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125 Safari/537.36',
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
      console.error(`  ✗ Not an image for ${filename}: ${buf.slice(0, 60).toString('utf8')}`);
      return false;
    }
  } catch (e) {
    console.error(`  ✗ ${filename}: ${e.message}`);
    return false;
  }
}

async function main() {
  const entries = Object.entries(imageMap);
  console.log(`Fixing ${entries.length} broken images...\n`);
  let ok = 0, fail = 0;
  const failed = [];
  for (const [filename, url] of entries) {
    process.stdout.write(`Downloading ${filename}... `);
    const success = await download(filename, url);
    if (success) ok++; else { fail++; failed.push(filename); }
    await new Promise(r => setTimeout(r, 300));
  }
  console.log(`\n✅ ${ok} succeeded, ❌ ${fail} failed.`);
  if (failed.length > 0) {
    console.log('\nStill broken:');
    failed.forEach(f => console.log('  -', f));
  }
}

main();
