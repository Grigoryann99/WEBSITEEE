const fs = require('fs');
const path = require('path');

const countryFiles = [
  { key: 'greece', file: 'greeceAttractions.ts' },
  { key: 'thailand', file: 'thailandAttractions.ts' },
  { key: 'uae', file: 'uaeAttractions.ts' },
  { key: 'france', file: 'franceAttractions.ts' },
  { key: 'italy', file: 'italyAttractions.ts' },
  { key: 'spain', file: 'spainAttractions.ts' },
  { key: 'japan', file: 'japanAttractions.ts' },
  { key: 'uk', file: 'ukAttractions.ts' },
  { key: 'usa', file: 'usaAttractions.ts' },
  { key: 'brazil', file: 'brazilAttractions.ts' },
  { key: 'norway', file: 'norwayAttractions.ts' },
  { key: 'sweden', file: 'swedenAttractions.ts' },
  { key: 'finland', file: 'finlandAttractions.ts' },
  { key: 'poland', file: 'polandAttractions.ts' },
  { key: 'czech', file: 'czechAttractions.ts' },
  { key: 'hungary', file: 'hungaryAttractions.ts' },
  { key: 'qatar', file: 'qatarAttractions.ts' },
  { key: 'jordan', file: 'jordanAttractions.ts' },
  { key: 'malaysia', file: 'malaysiaAttractions.ts' },
  { key: 'sriLanka', file: 'sriLankaAttractions.ts' },
  { key: 'newZealand', file: 'newZealandAttractions.ts' },
  { key: 'mexico', file: 'mexicoAttractions.ts' },
  { key: 'argentina', file: 'argentinaAttractions.ts' },
  { key: 'chile', file: 'chileAttractions.ts' },
  { key: 'peru', file: 'peruAttractions.ts' },
];

let totalOK = 0;
let totalMissing = 0;
let totalCount = 0;

console.log("=== COMPREHENSIVE AUDIT OF 25 COMPLETED COUNTRIES (20 DESTINATIONS EACH) ===\n");

countryFiles.forEach((item, index) => {
  const filePath = path.join(__dirname, '../data', item.file);
  if (!fs.existsSync(filePath)) {
    console.log(`❌ ERROR: File ${item.file} DOES NOT EXIST!`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract all attraction names and images
  const nameRegex = /name:\s*["']([^"']+)["']/g;
  const imageRegex = /image:\s*["']([^"']*)["']/g;

  const names = [...content.matchAll(nameRegex)].map(m => m[1]);
  const images = [...content.matchAll(imageRegex)].map(m => m[1]);

  console.log(`📌 Country #${index + 1}: ${item.key.toUpperCase()} (${item.file}) -> Found ${names.length} attractions`);

  if (names.length !== 20) {
    console.log(`  ⚠️ WARNING: Found ${names.length} attraction names (Expected 20)`);
  }

  let cOK = 0;
  let cFail = 0;

  for (let i = 0; i < names.length; i++) {
    totalCount++;
    const name = names[i];
    const img = images[i];

    if (!img || img.trim() === "") {
      console.log(`  ❌ [#${i + 1}] "${name}": EMPTY image!`);
      cFail++;
      totalMissing++;
      continue;
    }

    if (img.startsWith("/images/")) {
      const localFile = path.join(__dirname, '../public', img);
      if (fs.existsSync(localFile)) {
        const sz = fs.statSync(localFile).size;
        if (sz > 5000) {
          cOK++;
          totalOK++;
        } else {
          console.log(`  ❌ [#${i + 1}] "${name}": Local image file too small (${sz} bytes) -> ${img}`);
          cFail++;
          totalMissing++;
        }
      } else {
        console.log(`  ❌ [#${i + 1}] "${name}": Local image file MISSING -> ${img}`);
        cFail++;
        totalMissing++;
      }
    } else if (img.startsWith("http://") || img.startsWith("https://")) {
      if (img.includes("wikimedia.org") || img.includes("wikipedia.org") || img.includes("unsplash.com")) {
        cOK++;
        totalOK++;
      } else {
        console.log(`  ⚠️ [#${i + 1}] "${name}": Remote URL -> ${img}`);
        cOK++;
        totalOK++;
      }
    } else {
      console.log(`  ❌ [#${i + 1}] "${name}": Invalid image path -> ${img}`);
      cFail++;
      totalMissing++;
    }
  }

  console.log(`  Status for ${item.key.toUpperCase()}: ${cOK}/20 valid images.\n`);
});

console.log("==========================================");
console.log(`SUMMARY: ${totalOK}/${totalCount} Attractions OK! Total missing/broken: ${totalMissing}`);
console.log("==========================================");
