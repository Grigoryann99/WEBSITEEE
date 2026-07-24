const axios = require('axios');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'attractions');

// Exact matching Unsplash photo IDs resolved from specific search pages
const imageMap = {
  // Greece
  "greece-corfu-old-town.jpg": "photo-1682197289142-424218d0cd7c", // Corfu Old Town streets/architecture
  "greece-ancient-olympia.jpg": "photo-1507475380673-1246fa72eeea", // Ancient Greek columns at Olympia
  "greece-navagio-beach-shipwreck-beach.jpg": "photo-1762950720102-ea375b113650", // Actual Navagio beach & shipwreck
  "greece-nafplio-old-town.jpg": "photo-1602348709085-bc5720f99fd5", // Beautiful Nafplio street view
  "greece-patmos-island.jpg": "photo-1730562934913-17f443692079", // Greek monastery on Patmos
  "greece-delos-island.jpg": "photo-1683463170508-5693d45ba151", // Delos ancient ruins
  "greece-monemvasia-byzantine-fortress.jpg": "photo-1621710490963-31130dba2419", // Monemvasia rock fortress
  "greece-rhodes-medieval-old-town.jpg": "photo-1551189654-7a5ac7381f8b", // Medieval architecture of Rhodes Old Town
  "greece-vikos-gorge.jpg": "photo-1578311638077-307d8a5ef6c4", // Massive mountainous Vikos Gorge
  "greece-mount-athos-peninsula.jpg": "photo-1583418853741-6eb32f86309a" // Holy Mount Athos monastery complex
};

async function download(filename, id) {
  const url = `https://images.unsplash.com/${id}?w=1200&auto=format&fit=crop&q=85`;
  const destPath = path.join(targetDir, filename);
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 25000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125 Safari/537.36'
      }
    });
    const buf = Buffer.from(response.data);
    const hex = buf.slice(0, 4).toString('hex');
    if (hex.startsWith('ffd8ff') || hex === '89504e47') {
      fs.writeFileSync(destPath, buf);
      console.log(`  ✓ Updated ${filename}`);
      return true;
    } else {
      console.error(`  ✗ Invalid format for ${filename}`);
      return false;
    }
  } catch (e) {
    console.error(`  ✗ Error downloading ${filename}: ${e.message}`);
    return false;
  }
}

async function main() {
  console.log("Downloading verified correct images...");
  for (const [filename, id] of Object.entries(imageMap)) {
    await download(filename, id);
    await new Promise(r => setTimeout(r, 200));
  }
  console.log("Done updating!");
}

main();
