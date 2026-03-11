const fs = require('fs');
const content = fs.readFileSync('lib/countryData.ts', 'utf8');

// Extract all destinations with their images
const destRegex = /\{\s*name:\s*"([^"]+)",\s*city:\s*"([^"]+)",\s*country:\s*"([^"]+)",\s*description:\s*"([^"]+)",\s*image:\s*"([^"]+)"\s*\}/g;

const destinations = [];
let match;
while ((match = destRegex.exec(content)) !== null) {
    destinations.push({
        name: match[1],
        city: match[2],
        country: match[3],
        image: match[5]
    });
}

console.log(`Total destinations: ${destinations.length}\n`);

// Find duplicates
const imageCount = {};
destinations.forEach(d => {
    const img = d.image;
    if (!imageCount[img]) imageCount[img] = [];
    imageCount[img].push(`${d.name} (${d.country})`);
});

console.log('=== DUPLICATE IMAGES (same photo used for different places) ===');
Object.entries(imageCount)
    .filter(([_, places]) => places.length > 1)
    .forEach(([img, places]) => {
        console.log(`\nImage: ...${img.slice(-40)}`);
        places.forEach(p => console.log(`  - ${p}`));
    });

// Check for generic/placeholder images
console.log('\n=== GENERIC/PLACEHOLDER IMAGES ===');
destinations.forEach(d => {
    if (d.image.includes('picsum.photos') || d.image.includes('placeholder')) {
        console.log(`${d.name} (${d.country}): PLACEHOLDER IMAGE`);
    }
});

// List all destinations by country
console.log('\n=== ALL DESTINATIONS BY COUNTRY ===');
const byCountry = {};
destinations.forEach(d => {
    if (!byCountry[d.country]) byCountry[d.country] = [];
    byCountry[d.country].push({ name: d.name, image: d.image });
});

Object.entries(byCountry).forEach(([country, dests]) => {
    console.log(`\n${country} (${dests.length} destinations):`);
    dests.forEach(d => {
        const photoId = d.image.match(/photo-([a-zA-Z0-9-]+)/);
        console.log(`  ${d.name} -> ${photoId ? photoId[1] : 'unknown'}`);
    });
});
