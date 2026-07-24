const axios = require('axios');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'attractions');

const correctMap = {
  "uae-dubai-marina.jpg": "photo-1546412414-e1885259563a", // Dubai marina skyscrapers
  "uae-jumeirah-beach.jpg": "photo-1507525428034-b723cf961d3e", // Sunny beach
  "uae-abu-dhabi-corniche.jpg": "photo-1580674285054-bed31e145f59", // Abu dhabi city sea
  "uae-al-ain-oasis.jpg": "photo-1542273917363-3b1817f69a2d", // Lush green palms forest
  "uae-liwa-oasis.jpg": "photo-1684968798993-9c8cb080b06b", // Real deep sand dunes
  "uae-al-fahidi-historic-district.jpg": "photo-1600850056064-a8b380df8395" // Historic street
};

async function download(filename, id) {
  const url = `https://images.unsplash.com/${id}?w=1000&auto=format&fit=crop&q=80`;
  const destPath = path.join(targetDir, filename);
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 20000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125 Safari/537.36'
      }
    });
    const buf = Buffer.from(response.data);
    const hex = buf.slice(0, 4).toString('hex');
    if (hex.startsWith('ffd8ff') || hex === '89504e47') {
      fs.writeFileSync(destPath, buf);
      console.log(`  ✓ Successfully updated ${filename} to unique photo`);
      return true;
    } else {
      console.error(`  ✗ Error format for ${filename}`);
      return false;
    }
  } catch (e) {
    console.error(`  ✗ Failed ${filename}: ${e.message}`);
    return false;
  }
}

async function main() {
  console.log("Replacing remaining wrong/duplicate images with correct photos...");
  for (const [filename, id] of Object.entries(correctMap)) {
    await download(filename, id);
    await new Promise(r => setTimeout(r, 200));
  }
  console.log("Done correcting!");
}

main();
