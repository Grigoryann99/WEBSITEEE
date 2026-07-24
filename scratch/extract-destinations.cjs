import fs from 'fs';
import path from 'path';

const projectRoot = 'C:/Users/USER/OneDrive/Рабочий стол/TRAVEL WEBSITE';
const filePath = path.join(projectRoot, 'lib', 'countryData.ts');

const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');
let currentCountry = '';
let dests = [];
let inDest = false;
let currentDest = null;
let countriesDests = {};

lines.forEach(l => {
  const m = l.match(/^\s{4}([a-z_]+):\s*\{/);
  if (m) {
    if (currentCountry && dests.length > 0) {
      countriesDests[currentCountry] = dests;
    }
    currentCountry = m[1];
    dests = [];
    inDest = false;
  }
  
  if (l.includes('destinations: [')) {
    inDest = true;
  }
  
  if (inDest) {
    if (l.trim() === '{') {
      currentDest = {};
    }
    const nameMatch = l.match(/name:\s*"([^"]+)"/);
    if (nameMatch) currentDest.name = nameMatch[1];
    
    const cityMatch = l.match(/city:\s*"([^"]+)"/);
    if (cityMatch) currentDest.city = cityMatch[1];
    
    const descMatch = l.match(/description:\s*"([^"]+)"/);
    if (descMatch) currentDest.description = descMatch[1];
    
    const imageMatch = l.match(/image:\s*"([^"]+)"/);
    if (imageMatch) currentDest.image = imageMatch[1];

    if (l.trim().startsWith('}') || l.trim().startsWith('},')) {
      if (currentDest && currentDest.name) {
        dests.push(currentDest);
      }
      currentDest = null;
    }
    
    if (l.includes(']')) {
      inDest = false;
    }
  }
});

if (currentCountry && dests.length > 0) {
  countriesDests[currentCountry] = dests;
}

fs.writeFileSync(path.join(projectRoot, 'scratch', 'extracted_dests.json'), JSON.stringify(countriesDests, null, 2), 'utf8');
console.log('Successfully extracted ' + Object.keys(countriesDests).length + ' countries!');
