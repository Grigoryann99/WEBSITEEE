const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'attractions');

// Only files that are currently broken (html/error files or missing)
const imageMap = {
  // Greece
  "greece-meteora-monasteries.jpg": "https://images.unsplash.com/photo-1586974267281-f2e0044d5f25?w=800&auto=format&fit=crop",
  "greece-delphi.jpg": "https://images.unsplash.com/photo-1548080819-7c43e6e96520?w=800&auto=format&fit=crop",
  "greece-rhodes-medieval-old-town.jpg": "https://images.unsplash.com/photo-1582718040193-8da16c671028?w=800&auto=format&fit=crop",
  "greece-knossos-palace.jpg": "https://images.unsplash.com/photo-1548086419-7d285e23d5ba?w=800&auto=format&fit=crop",
  "greece-thessaloniki-waterfront.jpg": "https://images.unsplash.com/photo-1580128637743-ddd52b5bbc11?w=800&auto=format&fit=crop",
  "greece-corfu-old-town.jpg": "https://images.unsplash.com/photo-1601929726580-0e8039c3e87a?w=800&auto=format&fit=crop",
  "greece-ancient-olympia.jpg": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop",
  "greece-navagio-beach-shipwreck-beach.jpg": "https://images.unsplash.com/photo-1578584824792-75d691e2b694?w=800&auto=format&fit=crop",
  "greece-cape-sounion.jpg": "https://images.unsplash.com/photo-1619865081695-d5e5b1cd84c6?w=800&auto=format&fit=crop",
  "greece-epidaurus-ancient-theatre.jpg": "https://images.unsplash.com/photo-1663604018929-c51afa8c10b8?w=800&auto=format&fit=crop",
  "greece-mount-athos-peninsula.jpg": "https://images.unsplash.com/photo-1562979314-461da3d7f98d?w=800&auto=format&fit=crop",
  "greece-nafplio-old-town.jpg": "https://images.unsplash.com/photo-1623862089813-89d5a649fce7?w=800&auto=format&fit=crop",

  // Thailand
  "thailand-wat-pho-reclining-buddha.jpg": "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&auto=format&fit=crop",
  "thailand-wat-phra-that-doi-suthep.jpg": "https://images.unsplash.com/photo-1571536802807-30451e3955d8?w=800&auto=format&fit=crop",
  "thailand-ayutthaya-historical-park.jpg": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&auto=format&fit=crop",
  "thailand-railay-beach.jpg": "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&auto=format&fit=crop",
  "thailand-khao-sok-national-park.jpg": "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=800&auto=format&fit=crop",
  "thailand-wat-rong-khun-white-temple.jpg": "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800&auto=format&fit=crop",
  "thailand-pai-valley.jpg": "https://images.unsplash.com/photo-1534766438357-2b270dbd1b40?w=800&auto=format&fit=crop",
  "thailand-bridge-on-the-river-kwai.jpg": "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&auto=format&fit=crop",
  "thailand-chatuchak-weekend-market.jpg": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
  "thailand-doi-inthanon-national-park.jpg": "https://images.unsplash.com/photo-1558642891-54be180ea339?w=800&auto=format&fit=crop",
  "thailand-sukhothai-historical-park.jpg": "https://images.unsplash.com/photo-1579512476250-56f11bda0fde?w=800&auto=format&fit=crop",

  // UAE
  "uae-sheikh-zayed-grand-mosque.jpg": "https://images.unsplash.com/photo-1606921231106-f1083329a65c?w=800&auto=format&fit=crop",
  "uae-dubai-mall-dubai-fountain.jpg": "https://images.unsplash.com/photo-1606814893907-d4b7c5fc6cde?w=800&auto=format&fit=crop",
  "uae-louvre-abu-dhabi.jpg": "https://images.unsplash.com/photo-1585358946738-8c9a6bc10ee8?w=800&auto=format&fit=crop",
  "uae-dubai-frame.jpg": "https://images.unsplash.com/photo-1608020879000-eb2127c2a8e6?w=800&auto=format&fit=crop",
  "uae-dubai-creek-gold-souk.jpg": "https://images.unsplash.com/photo-1548706776-2c4f8f5d7c32?w=800&auto=format&fit=crop",
  "uae-global-village-dubai.jpg": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop",
};

function downloadFile(filename, url) {
  const destPath = path.join(targetDir, filename);
  console.log(`Downloading ${filename}...`);
  try {
    execSync(`curl.exe -sL -o "${destPath}" "${url}"`, { timeout: 30000 });
    const buf = fs.readFileSync(destPath);
    const hex = buf.slice(0, 4).toString('hex');
    if (hex.startsWith('ffd8ff') || hex === '89504e47') {
      console.log(`  ✓ ${filename}`);
      return true;
    } else {
      const preview = buf.slice(0, 80).toString('utf8').replace(/\n/g, ' ');
      console.error(`  ✗ BROKEN (not a valid image): ${preview}`);
      return false;
    }
  } catch(e) {
    console.error(`  ✗ ERROR: ${e.message}`);
    return false;
  }
}

async function main() {
  const entries = Object.entries(imageMap);
  console.log(`Downloading ${entries.length} replacement images...\n`);
  let success = 0, fail = 0;
  for (const [filename, url] of entries) {
    const ok = downloadFile(filename, url);
    if (ok) success++; else fail++;
    await new Promise(r => setTimeout(r, 500));
  }
  console.log(`\nDone! ${success} succeeded, ${fail} failed.`);
}

main();
