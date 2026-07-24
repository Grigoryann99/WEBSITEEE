const fs = require('fs');
const path = require('path');
const axios = require('axios');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'attractions');

const greeceImages = {
  "greece-acropolis-of-athens.jpg": "https://upload.wikimedia.org/wikipedia/commons/d/da/The_Parthenon_in_Athens.jpg",
  "greece-santorini.jpg": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Oia_Santorini_Thira_Greece_Cyclades.jpg",
  "greece-meteora-monasteries.jpg": "https://upload.wikimedia.org/wikipedia/commons/a/a8/Meteora_-_Monastery_of_Saint_Stephen.jpg",
  "greece-mykonos-old-town.jpg": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Mykonos_island%2C_Greece.jpg",
  "greece-delphi.jpg": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Delphi_-_Sanctuary_of_Athena_Pronoia.jpg",
  "greece-rhodes-medieval-old-town.jpg": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Rhodes_Old_Town.jpg",
  "greece-knossos-palace.jpg": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Knossos_-_Throne_Room_north_detail.jpg",
  "greece-thessaloniki-waterfront.jpg": "https://upload.wikimedia.org/wikipedia/commons/3/3b/Thessaloniki_White_Tower.jpg",
  "greece-corfu-old-town.jpg": "https://upload.wikimedia.org/wikipedia/commons/c/cd/Corfu_Old_Town.jpg",
  "greece-ancient-olympia.jpg": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Ancient_Olympia_-_Temple_of_Hera.jpg",
  "greece-navagio-beach-shipwreck-beach.jpg": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Navagio_bay_with_shipwreck_on_Zakynthos_Island%2C_Greece.jpg",
  "greece-samaria-gorge.jpg": "https://upload.wikimedia.org/wikipedia/commons/c/c7/Samaria_Gorge_National_Park_Crete.jpg",
  "greece-epidaurus-ancient-theatre.jpg": "https://upload.wikimedia.org/wikipedia/commons/8/8d/GR-epidauros-theater.jpg",
  "greece-mount-athos-peninsula.jpg": "https://upload.wikimedia.org/wikipedia/commons/4/46/Great_Lavra_Mount_Athos.jpg",
  "greece-nafplio-old-town.jpg": "https://upload.wikimedia.org/wikipedia/commons/8/8a/Nafplio_-_panoramio_%283%29.jpg",
  "greece-patmos-island.jpg": "https://upload.wikimedia.org/wikipedia/commons/9/95/Patmos_-_Monastery_of_St_John_the_Theologian.jpg",
  "greece-delos-island.jpg": "https://upload.wikimedia.org/wikipedia/commons/4/46/Delos_ruins.jpg",
  "greece-vikos-gorge.jpg": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Vikos_gorge.jpg",
  "greece-monemvasia-byzantine-fortress.jpg": "https://upload.wikimedia.org/wikipedia/commons/b/b2/Monemvasia-rock.jpg"
};

const thailandImages = {
  "thailand-wat-pho-reclining-buddha.jpg": "https://upload.wikimedia.org/wikipedia/commons/f/fc/Wat_Pho_Reclining_Buddha.jpg",
  "thailand-wat-phra-that-doi-suthep.jpg": "https://upload.wikimedia.org/wikipedia/commons/a/a7/Wat_Phrathat_Doi_Suthep.jpg",
  "thailand-railay-beach.jpg": "https://upload.wikimedia.org/wikipedia/commons/5/50/Railay_Beach%2C_Krabi%2C_Thailand.jpg",
  "thailand-khao-sok-national-park.jpg": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Khao_Sok_National_Park.jpg",
  "thailand-wat-arun-temple-of-dawn.jpg": "https://upload.wikimedia.org/wikipedia/commons/1/1b/Wat_Arun_2006.jpg",
  "thailand-james-bond-island.jpg": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Ko_Tapu%2C_Phang_Nga_Bay%2C_Thailand.jpg",
  "thailand-wat-rong-khun-white-temple.jpg": "https://upload.wikimedia.org/wikipedia/commons/4/43/Wat_Rong_Khun.jpg",
  "thailand-erawan-national-park.jpg": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Erawan_Falls%2C_Thailand.jpg",
  "thailand-koh-samui-beaches.jpg": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Koh_Samui_Chaweng_beach.jpg",
  "thailand-doi-inthanon-national-park.jpg": "https://upload.wikimedia.org/wikipedia/commons/7/7d/Doi_Inthanon_national_park.jpg",
  "thailand-sukhothai-historical-park.jpg": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Sukhothai_historical_park.jpg"
};

const uaeImages = {
  "uae-burj-khalifa.jpg": "https://upload.wikimedia.org/wikipedia/commons/9/93/Burj_Khalifa.jpg",
  "uae-sheikh-zayed-grand-mosque.jpg": "https://upload.wikimedia.org/wikipedia/commons/6/67/Sheikh_Zayed_Grand_Mosque%2C_Abu_Dhabi%2C_UAE.jpg",
  "uae-palm-jumeirah.jpg": "https://upload.wikimedia.org/wikipedia/commons/b/b8/Palm_Island_Jumeirah.jpg",
  "uae-burj-al-arab.jpg": "https://upload.wikimedia.org/wikipedia/commons/e/e6/Burj_Al_Arab%2C_Dubai%2C_by_Joi_Ito_Dec2007.jpg",
  "uae-dubai-mall-dubai-fountain.jpg": "https://upload.wikimedia.org/wikipedia/commons/6/65/Dubai_Fountain%2C_Burj_Khalifa_Lake%2C_Dubai.jpg",
  "uae-louvre-abu-dhabi.jpg": "https://upload.wikimedia.org/wikipedia/commons/0/0e/Louvre_Abu_Dhabi_-_Dome_interior.jpg",
  "uae-desert-safari-dubai.jpg": "https://upload.wikimedia.org/wikipedia/commons/d/d3/Desert_Safari_Dubai.jpg",
  "uae-dubai-frame.jpg": "https://upload.wikimedia.org/wikipedia/commons/7/70/Dubai_Frame.jpg",
  "uae-dubai-creek-gold-souk.jpg": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Dubai_Creek_-_panoramio.jpg",
  "uae-museum-of-the-future.jpg": "https://upload.wikimedia.org/wikipedia/commons/8/83/Museum_of_the_Future%2C_Dubai.jpg",
  "uae-jumeirah-beach.jpg": "https://upload.wikimedia.org/wikipedia/commons/e/e2/Jumeirah_Beach_Hotel_and_Burj_Al_Arab_2_Dec_2009.jpg",
  "uae-al-ain-oasis.jpg": "https://upload.wikimedia.org/wikipedia/commons/2/23/Al_Ain_Oasis.jpg"
};

const allImages = {
  ...greeceImages,
  ...thailandImages,
  ...uaeImages
};

async function download(filename, url) {
  const destPath = path.join(targetDir, filename);
  console.log(`Downloading ${filename} from ${url}...`);
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'VeloraTravelBot/1.0 (support@veloratravel.org; client-id=gemini-assistant)'
      }
    });

    const buf = Buffer.from(response.data);
    const firstBytes = buf.slice(0, 4).toString('hex');
    
    // Check if it is a valid JPEG (ffd8ff) or PNG (89504e47)
    if (firstBytes.startsWith('ffd8ff') || firstBytes === '89504e47') {
      fs.writeFileSync(destPath, buf);
      console.log(`  ✓ Successfully saved ${filename}`);
      return true;
    } else {
      console.error(`  ✗ Error: Downloaded file for ${filename} is not a valid image (starts with: ${firstBytes})`);
      if (buf.slice(0, 15).toString('utf8').includes('<!DOCTYPE')) {
        console.error(`  ✗ Content is HTML page. Probably rate-limited (429).`);
      }
      return false;
    }
  } catch (e) {
    console.error(`  ✗ Failed to download ${filename}:`, e.message);
    return false;
  }
}

async function main() {
  const entries = Object.entries(allImages);
  console.log(`Starting secure download of ${entries.length} images with rate-limiting prevention...`);
  
  for (let i = 0; i < entries.length; i++) {
    const [filename, url] = entries[i];
    
    // Retry up to 3 times on failure
    let success = false;
    for (let attempt = 1; attempt <= 3 && !success; attempt++) {
      if (attempt > 1) {
        console.log(`  Attempt ${attempt} for ${filename}...`);
        await new Promise(resolve => setTimeout(resolve, 5000)); // wait 5s before retry
      }
      success = await download(filename, url);
    }
    
    // Wait 3.5 seconds between different images to completely avoid Wikimedia 429
    if (i < entries.length - 1) {
      console.log(`Waiting 3.5 seconds to respect rate limits...`);
      await new Promise(resolve => setTimeout(resolve, 3500));
    }
  }
  console.log("Finished all secure downloads!");
}

main();
