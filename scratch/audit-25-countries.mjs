import fs from 'fs';
import path from 'path';

// Load countryData or import data files directly
import { greeceAttractions } from './data/greeceAttractions.js';
import { thailandAttractions } from './data/thailandAttractions.js';
import { uaeAttractions } from './data/uaeAttractions.js';
import { franceAttractions } from './data/franceAttractions.js';
import { italyAttractions } from './data/italyAttractions.js';
import { spainAttractions } from './data/spainAttractions.js';
import { japanAttractions } from './data/japanAttractions.js';
import { ukAttractions } from './data/ukAttractions.js';
import { usaAttractions } from './data/usaAttractions.js';
import { brazilAttractions } from './data/brazilAttractions.js';
import { norwayAttractions } from './data/norwayAttractions.js';
import { swedenAttractions } from './data/swedenAttractions.js';
import { finlandAttractions } from './data/finlandAttractions.js';
import { polandAttractions } from './data/polandAttractions.js';
import { czechAttractions } from './data/czechAttractions.js';
import { hungaryAttractions } from './data/hungaryAttractions.js';
import { qatarAttractions } from './data/qatarAttractions.js';
import { jordanAttractions } from './data/jordanAttractions.js';
import { malaysiaAttractions } from './data/malaysiaAttractions.js';
import { sriLankaAttractions } from './data/sriLankaAttractions.js';
import { newZealandAttractions } from './data/newZealandAttractions.js';
import { mexicoAttractions } from './data/mexicoAttractions.js';
import { argentinaAttractions } from './data/argentinaAttractions.js';
import { chileAttractions } from './data/chileAttractions.js';
import { peruAttractions } from './data/peruAttractions.js';

const countries = {
  greece: greeceAttractions,
  thailand: thailandAttractions,
  uae: uaeAttractions,
  france: franceAttractions,
  italy: italyAttractions,
  spain: spainAttractions,
  japan: japanAttractions,
  uk: ukAttractions,
  usa: usaAttractions,
  brazil: brazilAttractions,
  norway: norwayAttractions,
  sweden: swedenAttractions,
  finland: finlandAttractions,
  poland: polandAttractions,
  czech: czechAttractions,
  hungary: hungaryAttractions,
  qatar: qatarAttractions,
  jordan: jordanAttractions,
  malaysia: malaysiaAttractions,
  sriLanka: sriLankaAttractions,
  newZealand: newZealandAttractions,
  mexico: mexicoAttractions,
  argentina: argentinaAttractions,
  chile: chileAttractions,
  peru: peruAttractions,
};

let totalOK = 0;
let totalMissing = 0;
let totalCount = 0;

console.log("=== AUDIT OF 25 COUNTRIES (20 ATTRACTIONS EACH) ===");

for (const [countryKey, list] of Object.entries(countries)) {
  console.log(`\n📌 Country: ${countryKey.toUpperCase()} (Total: ${list.length})`);
  if (list.length !== 20) {
    console.log(`  ⚠️ Warning: count is ${list.length}, expected 20!`);
  }

  let cOK = 0;
  let cFail = 0;

  list.forEach((item, idx) => {
    totalCount++;
    const img = item.image;
    if (!img || img.trim() === "") {
      console.log(`  ❌ [#${idx + 1}] "${item.name}" has EMPTY image field!`);
      cFail++;
      totalMissing++;
      return;
    }

    if (img.startsWith("/images/")) {
      const localPath = path.join(process.cwd(), "public", img);
      if (fs.existsSync(localPath)) {
        const size = fs.statSync(localPath).size;
        if (size > 5000) {
          cOK++;
          totalOK++;
        } else {
          console.log(`  ❌ [#${idx + 1}] "${item.name}" local file too small (${size} bytes): ${img}`);
          cFail++;
          totalMissing++;
        }
      } else {
        console.log(`  ❌ [#${idx + 1}] "${item.name}" local file missing: ${img}`);
        cFail++;
        totalMissing++;
      }
    } else if (img.startsWith("http://") || img.startsWith("https://")) {
      // Direct Wikipedia / Wikimedia URL
      if (img.includes("wikimedia.org") || img.includes("wikipedia.org") || img.includes("unsplash.com")) {
        cOK++;
        totalOK++;
      } else {
        console.log(`  ⚠️ [#${idx + 1}] "${item.name}" non-standard URL: ${img}`);
        cOK++;
        totalOK++;
      }
    } else {
      console.log(`  ❌ [#${idx + 1}] "${item.name}" invalid image string: ${img}`);
      cFail++;
      totalMissing++;
    }
  });

  console.log(`  Summary for ${countryKey}: ${cOK}/20 OK, ${cFail} failed.`);
}

console.log("\n==========================================");
console.log(`TOTAL AUDIT RESULT: ${totalOK}/${totalCount} OK, ${totalMissing} MISSING/INVALID.`);
console.log("==========================================");
