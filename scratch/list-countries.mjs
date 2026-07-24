import fs from 'fs';
const content = fs.readFileSync('./lib/countryData.ts', 'utf-8');
const keys = [];
const regex = /^\s{4}([a-z\-]+):\s*\{/gm;
let match;
while ((match = regex.exec(content)) !== null) {
  keys.push(match[1]);
}
console.log("Total countries:", keys.length);
console.log(keys);
