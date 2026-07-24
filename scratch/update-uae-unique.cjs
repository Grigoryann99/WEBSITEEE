const axios = require('axios');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'attractions');

// Mapping all 20 UAE destinations to unique, verified Unsplash photo IDs
const uaeImageMap = {
  "uae-burj-khalifa.jpg": "photo-1512453979798-5ea266f8880c", // Burj Khalifa tower
  "uae-sheikh-zayed-grand-mosque.jpg": "photo-1590273089302-ebbc53986b6e", // White Mosque
  "uae-palm-jumeirah.jpg": "photo-1682410601904-24ec1d9858e6", // Palm Jumeirah aerial
  "uae-burj-al-arab.jpg": "photo-1546412414-e1885259563a", // Burj Al Arab hotel
  "uae-dubai-mall-dubai-fountain.jpg": "photo-1592501714307-48e8988c9778", // Fountain show
  "uae-louvre-abu-dhabi.jpg": "photo-1627637561854-beb156e0d8a7", // Louvre Abu Dhabi dome
  "uae-desert-safari-dubai.jpg": "photo-1509233725247-49e657c54213", // Dunes / Safari
  "uae-dubai-frame.jpg": "photo-1612294037637-ec328d0e075e", // Dubai Frame
  "uae-dubai-creek-gold-souk.jpg": "photo-1565677916056-dfb75e7aa408", // Boats at Dubai Creek
  "uae-ferrari-world-abu-dhabi.jpg": "photo-1760184762745-c04986a86c54", // Ferrari coaster / logo
  "uae-yas-island.jpg": "photo-1736691338529-3bf72a9ccbae", // Yas Marina Circuit
  "uae-al-fahidi-historic-district.jpg": "photo-1548706776-2c4f8f5d7c32", // Old wind towers
  "uae-hatta-mountain-reserve.jpg": "photo-1605810230434-7631ac76ec81", // Kayaks in mountain lake
  "uae-museum-of-the-future.jpg": "photo-1634007626524-f47fa37810a7", // Calligraphy oval building
  "uae-jumeirah-beach.jpg": "photo-1522869635100-9f4c5e86aa37", // Beach
  "uae-abu-dhabi-corniche.jpg": "photo-1618220179428-22790b461013", // Skyline waterfront
  "uae-dubai-marina.jpg": "photo-1582672060674-bc2bd808a8b5", // Marina skyscrapers
  "uae-liwa-oasis.jpg": "photo-1539768942893-daf2e055b5f0", // Sand sea dunes
  "uae-al-ain-oasis.jpg": "photo-1513694203232-719a280e022f", // Palm trees garden
  "uae-global-village-dubai.jpg": "photo-1605007493699-af65834f8a00" // Festival park lights
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
      console.log(`  ✓ Updated ${filename}`);
      return true;
    } else {
      console.error(`  ✗ Invalid image data for ${filename}`);
      return false;
    }
  } catch (e) {
    console.error(`  ✗ Failed downloading ${filename}: ${e.message}`);
    return false;
  }
}

async function main() {
  console.log("Updating UAE attractions to completely unique and accurate photos...");
  for (const [filename, id] of Object.entries(uaeImageMap)) {
    await download(filename, id);
    await new Promise(r => setTimeout(r, 200));
  }
  console.log("UAE images update finished!");
}

main();
