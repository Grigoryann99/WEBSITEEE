const fs = require('fs');
const path = require('path');

const greeceMap = {
  "Acropolis of Athens": "/images/attractions/greece-acropolis-of-athens.jpg",
  "Santorini": "/images/attractions/greece-santorini.jpg",
  "Meteora Monasteries": "/images/attractions/greece-meteora-monasteries.jpg",
  "Mykonos Old Town": "/images/attractions/greece-mykonos-old-town.jpg",
  "Delphi": "/images/attractions/greece-delphi.jpg",
  "Rhodes Medieval Old Town": "/images/attractions/greece-rhodes-medieval-old-town.jpg",
  "Knossos Palace": "/images/attractions/greece-knossos-palace.jpg",
  "Thessaloniki Waterfront": "/images/attractions/greece-thessaloniki-waterfront.jpg",
  "Corfu Old Town": "/images/attractions/greece-corfu-old-town.jpg",
  "Ancient Olympia": "/images/attractions/greece-ancient-olympia.jpg",
  "Navagio Beach (Shipwreck Beach)": "/images/attractions/greece-navagio-beach-shipwreck-beach.jpg",
  "Samaria Gorge": "/images/attractions/greece-samaria-gorge.jpg",
  "Cape Sounion": "/images/attractions/greece-cape-sounion.jpg",
  "Epidaurus Ancient Theatre": "/images/attractions/greece-epidaurus-ancient-theatre.jpg",
  "Mount Athos Peninsula": "/images/attractions/greece-mount-athos-peninsula.jpg",
  "Nafplio Old Town": "/images/attractions/greece-nafplio-old-town.jpg",
  "Patmos Island": "/images/attractions/greece-patmos-island.jpg",
  "Delos Island": "/images/attractions/greece-delos-island.jpg",
  "Vikos Gorge": "/images/attractions/greece-vikos-gorge.jpg",
  "Monemvasia Byzantine Fortress": "/images/attractions/greece-monemvasia-byzantine-fortress.jpg"
};

const thailandMap = {
  "Grand Palace": "/images/attractions/thailand-grand-palace.jpg",
  "Wat Pho (Reclining Buddha)": "/images/attractions/thailand-wat-pho-reclining-buddha.jpg",
  "Phi Phi Islands": "/images/attractions/thailand-phi-phi-islands.jpg",
  "Wat Phra That Doi Suthep": "/images/attractions/thailand-wat-phra-that-doi-suthep.jpg",
  "Ayutthaya Historical Park": "/images/attractions/thailand-ayutthaya-historical-park.jpg",
  "Railay Beach": "/images/attractions/thailand-railay-beach.jpg",
  "Khao Sok National Park": "/images/attractions/thailand-khao-sok-national-park.jpg",
  "Wat Arun (Temple of Dawn)": "/images/attractions/thailand-wat-arun-temple-of-dawn.jpg",
  "James Bond Island": "/images/attractions/thailand-james-bond-island.jpg",
  "Wat Rong Khun (White Temple)": "/images/attractions/thailand-wat-rong-khun-white-temple.jpg",
  "Erawan National Park": "/images/attractions/thailand-erawan-national-park.jpg",
  "Koh Samui Beaches": "/images/attractions/thailand-koh-samui-beaches.jpg",
  "Pai Valley": "/images/attractions/thailand-pai-valley.jpg",
  "Damnoen Saduak Floating Market": "/images/attractions/thailand-damnoen-saduak-floating-market.jpg",
  "Bridge on the River Kwai": "/images/attractions/thailand-bridge-on-the-river-kwai.jpg",
  "Chatuchak Weekend Market": "/images/attractions/thailand-chatuchak-weekend-market.jpg",
  "Koh Lanta": "/images/attractions/thailand-koh-lanta.jpg",
  "Doi Inthanon National Park": "/images/attractions/thailand-doi-inthanon-national-park.jpg",
  "Sukhothai Historical Park": "/images/attractions/thailand-sukhothai-historical-park.jpg",
  "Tiger Cave Temple": "/images/attractions/thailand-tiger-cave-temple.jpg"
};

const uaeMap = {
  "Burj Khalifa": "/images/attractions/uae-burj-khalifa.jpg",
  "Sheikh Zayed Grand Mosque": "/images/attractions/uae-sheikh-zayed-grand-mosque.jpg",
  "Palm Jumeirah": "/images/attractions/uae-palm-jumeirah.jpg",
  "Burj Al Arab": "/images/attractions/uae-burj-al-arab.jpg",
  "Dubai Mall & Dubai Fountain": "/images/attractions/uae-dubai-mall-dubai-fountain.jpg",
  "Louvre Abu Dhabi": "/images/attractions/uae-louvre-abu-dhabi.jpg",
  "Desert Safari Dubai": "/images/attractions/uae-desert-safari-dubai.jpg",
  "Dubai Frame": "/images/attractions/uae-dubai-frame.jpg",
  "Dubai Creek & Gold Souk": "/images/attractions/uae-dubai-creek-gold-souk.jpg",
  "Ferrari World Abu Dhabi": "/images/attractions/uae-ferrari-world-abu-dhabi.jpg",
  "Yas Island": "/images/attractions/uae-yas-island.jpg",
  "Al Fahidi Historic District": "/images/attractions/uae-al-fahidi-historic-district.jpg",
  "Hatta Mountain Reserve": "/images/attractions/uae-hatta-mountain-reserve.jpg",
  "Museum of the Future": "/images/attractions/uae-museum-of-the-future.jpg",
  "Jumeirah Beach": "/images/attractions/uae-jumeirah-beach.jpg",
  "Abu Dhabi Corniche": "/images/attractions/uae-abu-dhabi-corniche.jpg",
  "Dubai Marina": "/images/attractions/uae-dubai-marina.jpg",
  "Liwa Oasis": "/images/attractions/uae-liwa-oasis.jpg",
  "Al Ain Oasis": "/images/attractions/uae-al-ain-oasis.jpg",
  "Global Village Dubai": "/images/attractions/uae-global-village-dubai.jpg"
};

function updateFile(filePath, mapping) {
  let content = fs.readFileSync(filePath, 'utf8');
  let count = 0;
  for (const [name, localPath] of Object.entries(mapping)) {
    // Escape special characters in name
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(name:\\s*"${escapedName}",?[\\s\\S]*?image:\\s*")[^"]*(")`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, `$1${localPath}$2`);
      count++;
    } else {
      console.log(`Failed to match name: ${name} in ${filePath}`);
    }
  }
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${count} images in ${filePath}`);
}

updateFile(path.join(__dirname, '..', 'data', 'greeceAttractions.ts'), greeceMap);
updateFile(path.join(__dirname, '..', 'data', 'thailandAttractions.ts'), thailandMap);
updateFile(path.join(__dirname, '..', 'data', 'uaeAttractions.ts'), uaeMap);
