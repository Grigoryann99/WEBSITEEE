const fs = require('fs');
const path = require('path');
const axios = require('axios');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'attractions');

const greeceImages = {
  "greece-acropolis-of-athens.jpg": "https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=800&auto=format&fit=crop",
  "greece-santorini.jpg": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800&auto=format&fit=crop",
  "greece-meteora-monasteries.jpg": "https://images.unsplash.com/photo-1516489370617-e2fe9abcb71b?q=80&w=800&auto=format&fit=crop",
  "greece-mykonos-old-town.jpg": "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?q=80&w=800&auto=format&fit=crop",
  "greece-delphi.jpg": "https://images.unsplash.com/photo-1608730973680-81f0f568d2e3?q=80&w=800&auto=format&fit=crop",
  "greece-rhodes-medieval-old-town.jpg": "https://images.unsplash.com/photo-1596772745344-934d4cd4c2a4?q=80&w=800&auto=format&fit=crop",
  "greece-knossos-palace.jpg": "https://images.unsplash.com/photo-1590305095498-9e3b13b0f5e0?q=80&w=800&auto=format&fit=crop",
  "greece-thessaloniki-waterfront.jpg": "https://images.unsplash.com/photo-1552554743-1e5f8f8f041b?q=80&w=800&auto=format&fit=crop",
  "greece-corfu-old-town.jpg": "https://images.unsplash.com/photo-1572978000492-9445ff5df39e?q=80&w=800&auto=format&fit=crop",
  "greece-ancient-olympia.jpg": "https://images.unsplash.com/photo-1549880180-4c6d485b8c8d?q=80&w=800&auto=format&fit=crop",
  "greece-navagio-beach-shipwreck-beach.jpg": "https://images.unsplash.com/photo-1578584824792-75d691e2b694?q=80&w=800&auto=format&fit=crop",
  "greece-samaria-gorge.jpg": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
  "greece-cape-sounion.jpg": "https://images.unsplash.com/photo-1582236479702-8240596cdcc7?q=80&w=800&auto=format&fit=crop",
  "greece-epidaurus-ancient-theatre.jpg": "https://images.unsplash.com/photo-1505856291099-4e1d3ea3cdb6?q=80&w=800&auto=format&fit=crop",
  "greece-mount-athos-peninsula.jpg": "https://images.unsplash.com/photo-1615825316075-f2d48bfbcbf8?q=80&w=800&auto=format&fit=crop",
  "greece-nafplio-old-town.jpg": "https://images.unsplash.com/photo-1563843810142-ff0f36f3db5c?q=80&w=800&auto=format&fit=crop",
  "greece-patmos-island.jpg": "https://images.unsplash.com/photo-1569428034239-f9565e32e224?q=80&w=800&auto=format&fit=crop",
  "greece-delos-island.jpg": "https://images.unsplash.com/photo-1566842600175-97dca489844f?q=80&w=800&auto=format&fit=crop",
  "greece-vikos-gorge.jpg": "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop",
  "greece-monemvasia-byzantine-fortress.jpg": "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=800&auto=format&fit=crop"
};

const thailandImages = {
  "thailand-grand-palace.jpg": "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800&auto=format&fit=crop",
  "thailand-wat-pho-reclining-buddha.jpg": "https://images.unsplash.com/photo-1590393275628-86866ec82431?q=80&w=800&auto=format&fit=crop",
  "thailand-phi-phi-islands.jpg": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop",
  "thailand-wat-phra-that-doi-suthep.jpg": "https://images.unsplash.com/photo-1560942631-073be494951b?q=80&w=800&auto=format&fit=crop",
  "thailand-ayutthaya-historical-park.jpg": "https://images.unsplash.com/photo-1598908314981-d120267933ba?q=80&w=800&auto=format&fit=crop",
  "thailand-railay-beach.jpg": "https://images.unsplash.com/photo-1548678957-31bab8f5228c?q=80&w=800&auto=format&fit=crop",
  "thailand-khao-sok-national-park.jpg": "https://images.unsplash.com/photo-1533604101037-77fb261ea2a4?q=80&w=800&auto=format&fit=crop",
  "thailand-wat-arun-temple-of-dawn.jpg": "https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=800&auto=format&fit=crop",
  "thailand-james-bond-island.jpg": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop",
  "thailand-wat-rong-khun-white-temple.jpg": "https://images.unsplash.com/photo-1608958213876-c56a3b0f5e0?q=80&w=800&auto=format&fit=crop",
  "thailand-erawan-national-park.jpg": "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=800&auto=format&fit=crop",
  "thailand-koh-samui-beaches.jpg": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
  "thailand-pai-valley.jpg": "https://images.unsplash.com/photo-1510617830919-dd777174e12e?q=80&w=800&auto=format&fit=crop",
  "thailand-damnoen-saduak-floating-market.jpg": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop",
  "thailand-bridge-on-the-river-kwai.jpg": "https://images.unsplash.com/photo-1590393275628-86866ec82431?q=80&w=800&auto=format&fit=crop",
  "thailand-chatuchak-weekend-market.jpg": "https://images.unsplash.com/photo-1578913171703-46461a1ef837?q=80&w=800&auto=format&fit=crop",
  "thailand-koh-lanta.jpg": "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=800&auto=format&fit=crop",
  "thailand-doi-inthanon-national-park.jpg": "https://images.unsplash.com/photo-1510617830919-dd777174e12e?q=80&w=800&auto=format&fit=crop",
  "thailand-sukhothai-historical-park.jpg": "https://images.unsplash.com/photo-1598908314981-d120267933ba?q=80&w=800&auto=format&fit=crop",
  "thailand-tiger-cave-temple.jpg": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop"
};

const uaeImages = {
  "uae-burj-khalifa.jpg": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
  "uae-sheikh-zayed-grand-mosque.jpg": "https://images.unsplash.com/photo-1549468057-0b196752077e?q=80&w=800&auto=format&fit=crop",
  "uae-palm-jumeirah.jpg": "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=800&auto=format&fit=crop",
  "uae-burj-al-arab.jpg": "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=800&auto=format&fit=crop",
  "uae-dubai-mall-dubai-fountain.jpg": "https://images.unsplash.com/photo-158269986561-bd804eed4b00?q=80&w=800&auto=format&fit=crop",
  "uae-louvre-abu-dhabi.jpg": "https://images.unsplash.com/photo-1552834371-3375bce34360?q=80&w=800&auto=format&fit=crop",
  "uae-desert-safari-dubai.jpg": "https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=800&auto=format&fit=crop",
  "uae-dubai-frame.jpg": "https://images.unsplash.com/photo-158269986561-bd804eed4b00?q=80&w=800&auto=format&fit=crop",
  "uae-dubai-creek-gold-souk.jpg": "https://images.unsplash.com/photo-1578913171703-46461a1ef837?q=80&w=800&auto=format&fit=crop",
  "uae-museum-of-the-future.jpg": "https://images.unsplash.com/photo-1647252262017-582a7dbb73d0?q=80&w=800&auto=format&fit=crop",
  "uae-jumeirah-beach.jpg": "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=800&auto=format&fit=crop",
  "uae-abu-dhabi-corniche.jpg": "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=800&auto=format&fit=crop",
  "uae-dubai-marina.jpg": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
  "uae-liwa-oasis.jpg": "https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=800&auto=format&fit=crop",
  "uae-al-ain-oasis.jpg": "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=800&auto=format&fit=crop",
  "uae-global-village-dubai.jpg": "https://images.unsplash.com/photo-1578913171703-46461a1ef837?q=80&w=800&auto=format&fit=crop"
};

const allImages = {
  ...greeceImages,
  ...thailandImages,
  ...uaeImages
};

async function download(filename, url) {
  const destPath = path.join(targetDir, filename);
  console.log(`Downloading ${filename} from Unsplash...`);
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    const buf = Buffer.from(response.data);
    const firstBytes = buf.slice(0, 4).toString('hex');
    
    if (firstBytes.startsWith('ffd8ff') || firstBytes === '89504e47') {
      fs.writeFileSync(destPath, buf);
      console.log(`  ✓ Successfully saved ${filename}`);
      return true;
    } else {
      console.error(`  ✗ Error: File for ${filename} is not a valid image (starts with: ${firstBytes})`);
      return false;
    }
  } catch (e) {
    console.error(`  ✗ Failed to download ${filename}:`, e.message);
    return false;
  }
}

async function main() {
  const entries = Object.entries(allImages);
  console.log(`Starting download of ${entries.length} high-quality Unsplash images...`);
  
  for (let i = 0; i < entries.length; i++) {
    const [filename, url] = entries[i];
    await download(filename, url);
  }
  console.log("Finished all downloads!");
}

main();
