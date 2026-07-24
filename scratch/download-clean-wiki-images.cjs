const fs = require('fs');
const path = require('path');
const axios = require('axios');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'attractions');

const specificWikiTitles = {
  // Greece
  "greece-acropolis-of-athens.jpg": "Acropolis of Athens",
  "greece-santorini.jpg": "Santorini",
  "greece-meteora-monasteries.jpg": "Meteora",
  "greece-mykonos-old-town.jpg": "Mykonos",
  "greece-delphi.jpg": "Delphi",
  "greece-rhodes-medieval-old-town.jpg": "Medieval City of Rhodes",
  "greece-knossos-palace.jpg": "Knossos",
  "greece-thessaloniki-waterfront.jpg": "White Tower of Thessaloniki",
  "greece-corfu-old-town.jpg": "Corfu (city)",
  "greece-ancient-olympia.jpg": "Archaeological Site of Olympia",
  "greece-navagio-beach-shipwreck-beach.jpg": "Navagio Beach",
  "greece-samaria-gorge.jpg": "Samariá Gorge",
  "greece-cape-sounion.jpg": "Cape Sounion",
  "greece-epidaurus-ancient-theatre.jpg": "Epidaurus",
  "greece-mount-athos-peninsula.jpg": "Mount Athos",
  "greece-nafplio-old-town.jpg": "Nafplio",
  "greece-patmos-island.jpg": "Patmos",
  "greece-delos-island.jpg": "Delos",
  "greece-vikos-gorge.jpg": "Vikos Gorge",
  "greece-monemvasia-byzantine-fortress.jpg": "Monemvasia",

  // Thailand
  "thailand-grand-palace.jpg": "Grand Palace, Bangkok",
  "thailand-wat-pho-reclining-buddha.jpg": "Wat Pho",
  "thailand-phi-phi-islands.jpg": "Ko Phi Phi",
  "thailand-wat-phra-that-doi-suthep.jpg": "Wat Phra That Doi Suthep",
  "thailand-ayutthaya-historical-park.jpg": "Ayutthaya Historical Park",
  "thailand-railay-beach.jpg": "Railay Beach",
  "thailand-khao-sok-national-park.jpg": "Khao Sok National Park",
  "thailand-wat-arun-temple-of-dawn.jpg": "Wat Arun",
  "thailand-james-bond-island.jpg": "Khao Phing Kan",
  "thailand-wat-rong-khun-white-temple.jpg": "Wat Rong Khun",
  "thailand-erawan-national-park.jpg": "Erawan National Park",
  "thailand-koh-samui-beaches.jpg": "Ko Samui",
  "thailand-pai-valley.jpg": "Pai, Mae Hong Son",
  "thailand-damnoen-saduak-floating-market.jpg": "Damnoen Saduak floating market",
  "thailand-bridge-on-the-river-kwai.jpg": "Death Railway",
  "thailand-chatuchak-weekend-market.jpg": "Chatuchak Market",
  "thailand-koh-lanta.jpg": "Ko Lanta",
  "thailand-doi-inthanon-national-park.jpg": "Doi Inthanon National Park",
  "thailand-sukhothai-historical-park.jpg": "Sukhothai Historical Park",
  "thailand-tiger-cave-temple.jpg": "Wat Tham Suea",

  // UAE
  "uae-burj-khalifa.jpg": "Burj Khalifa",
  "uae-sheikh-zayed-grand-mosque.jpg": "Sheikh Zayed Grand Mosque",
  "uae-palm-jumeirah.jpg": "Palm Jumeirah",
  "uae-burj-al-arab.jpg": "Burj Al Arab",
  "uae-dubai-mall-dubai-fountain.jpg": "Dubai Fountain",
  "uae-louvre-abu-dhabi.jpg": "Louvre Abu Dhabi",
  "uae-desert-safari-dubai.jpg": "Desert Safari",
  "uae-dubai-frame.jpg": "Dubai Frame",
  "uae-dubai-creek-gold-souk.jpg": "Dubai Creek",
  "uae-ferrari-world-abu-dhabi.jpg": "Ferrari World Abu Dhabi",
  "uae-yas-island.jpg": "Yas Island",
  "uae-al-fahidi-historic-district.jpg": "Al Fahidi Historical Neighbourhood",
  "uae-hatta-mountain-reserve.jpg": "Hatta, Dubai",
  "uae-museum-of-the-future.jpg": "Museum of the Future",
  "uae-jumeirah-beach.jpg": "Jumeirah Beach",
  "uae-abu-dhabi-corniche.jpg": "Corniche Road, Abu Dhabi",
  "uae-dubai-marina.jpg": "Dubai Marina",
  "uae-liwa-oasis.jpg": "Liwa Oasis",
  "uae-al-ain-oasis.jpg": "Al Ain Oasis",
  "uae-global-village-dubai.jpg": "Global Village, Dubai"
};

// Words that indicate map/satellite/chart/non-photo files
const blacklistedWords = ['map', 'location', 'locator', 'plan', 'satellite', 'flag', 'orthographic', 'schematic', 'chart', 'diagram', 'route', 'logo'];

async function getWikiImage(title) {
  try {
    // Step 1: Get list of images in the article
    const imagesEndpoint = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=images&format=json`;
    const imagesRes = await axios.get(imagesEndpoint, {
      headers: { 'User-Agent': 'VeloraTravelBot/1.0 (support@veloratravel.org)' }
    });
    
    const pages = imagesRes.data.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId === '-1' || !pages[pageId].images) {
      console.log(`  No images list found for: ${title}`);
      return null;
    }

    const imagesList = pages[pageId].images;
    
    // Step 2: Filter for valid JPG files and exclude blacklisted terms
    const filteredImages = imagesList.filter(img => {
      const lowerTitle = img.title.toLowerCase();
      const isJpg = lowerTitle.endsWith('.jpg') || lowerTitle.endsWith('.jpeg');
      const containsBlacklisted = blacklistedWords.some(word => lowerTitle.includes(word));
      return isJpg && !containsBlacklisted;
    });

    if (filteredImages.length === 0) {
      console.log(`  No valid JPG images found for: ${title}`);
      return null;
    }

    // Sort to prioritize specific files if needed, otherwise take the first one
    const chosenImage = filteredImages[0].title;
    console.log(`  Chosen image file: ${chosenImage}`);

    // Step 3: Resolve the image direct URL
    const urlEndpoint = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(chosenImage)}&prop=imageinfo&iiprop=url&format=json`;
    const urlRes = await axios.get(urlEndpoint, {
      headers: { 'User-Agent': 'VeloraTravelBot/1.0 (support@veloratravel.org)' }
    });

    const urlPages = urlRes.data.query.pages;
    const urlPageId = Object.keys(urlPages)[0];
    if (urlPageId !== '-1' && urlPages[urlPageId].imageinfo && urlPages[urlPageId].imageinfo[0]) {
      return urlPages[urlPageId].imageinfo[0].url;
    }
  } catch (e) {
    console.error(`  Error resolving image for ${title}:`, e.message);
  }
  return null;
}

async function download(filename, url) {
  const destPath = path.join(targetDir, filename);
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    const buf = Buffer.from(response.data);
    const firstBytes = buf.slice(0, 4).toString('hex');
    
    if (firstBytes.startsWith('ffd8ff') || firstBytes === '89504e47') {
      fs.writeFileSync(destPath, buf);
      console.log(`  ✓ Successfully saved ${filename}`);
      return true;
    } else {
      console.error(`  ✗ Error: File is not a valid image (starts with: ${firstBytes})`);
      return false;
    }
  } catch (e) {
    console.error(`  ✗ Failed to download ${filename}:`, e.message);
    return false;
  }
}

async function main() {
  const entries = Object.entries(specificWikiTitles);
  console.log(`Starting image resolver and downloader for ${entries.length} attractions...`);
  
  for (let i = 0; i < entries.length; i++) {
    const [filename, title] = entries[i];
    console.log(`\n[${i + 1}/${entries.length}] Resolving ${filename} (page: "${title}")...`);
    
    const url = await getWikiImage(title);
    if (url) {
      console.log(`  Resolved URL: ${url}`);
      await download(filename, url);
    } else {
      console.error(`  ✗ No image URL resolved for: ${title}`);
    }
    
    // Sleep to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  console.log("\nFinished downloading all images successfully!");
}

main();
