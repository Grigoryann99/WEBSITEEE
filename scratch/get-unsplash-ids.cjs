const https = require('https');
const fs = require('fs');
const path = require('path');

// Scrape Unsplash search pages and extract the first real photo ID
const searches = [
  'knossos-crete',
  'rhodes-old-town-medieval',
  'thessaloniki-white-tower',
  'navagio-shipwreck-beach-zakynthos',
  'epidaurus-ancient-theatre-greece',
  'mount-athos-monastery',
  'nafplio-greece',
  'sukhothai-historical-park',
  'louvre-abu-dhabi-museum',
  'dubai-creek-gold-souk',
];

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

function extractPhotoIds(html) {
  const pattern = /photo-[a-zA-Z0-9_-]{10,25}/g;
  const matches = [...html.matchAll(pattern)].map(m => m[0]);
  return [...new Set(matches)];
}

async function main() {
  for (const query of searches) {
    try {
      const url = `https://unsplash.com/s/photos/${query}`;
      const html = await fetchPage(url);
      const ids = extractPhotoIds(html);
      console.log(`${query}:`);
      ids.slice(0, 5).forEach(id => console.log(`  ${id}`));
    } catch (e) {
      console.log(`${query}: ERROR - ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 1500));
  }
}

main();
