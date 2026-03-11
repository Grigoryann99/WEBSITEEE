const fs = require('fs');
const path = require('path');

// Load all image maps
const mapEurope = require('./imageMap_europe.cjs');
const mapAsiaME = require('./imageMap_asia_me.cjs');
const mapAmericas = require('./imageMap_americas.cjs');
const mapAfricaOceania = require('./imageMap_africa_oceania.cjs');

// Combine all maps
const fullImageMap = {
    ...mapEurope,
    ...mapAsiaME,
    ...mapAmericas,
    ...mapAfricaOceania
};

const filePath = path.join(__dirname, 'lib', 'countryData.ts');
let content = fs.readFileSync(filePath, 'utf8');

// The destination structure in countryData.ts
// {
//     name: "Eiffel Tower",
//     city: "Paris",
//     country: "France",
//     description: "...",
//     image: "..."
// }

// We need to match the 'name' and update the 'image' field for each destination block.
// Since the structure is nested, a global regex might be tricky if names repeat, 
// but destination names are mostly unique per country or globally well-known.

let updatedCount = 0;

// Regex to find destination objects and capture parts
const destBlockRegex = /\{\s*name:\s*"([^"]+)",\s*city:\s*"([^"]+)",\s*country:\s*"([^"]+)",\s*description:\s*"([^"]+)",\s*image:\s*"([^"]+)"\s*\}/g;

content = content.replace(destBlockRegex, (match, name, city, country, description, oldImage) => {
    if (fullImageMap[name]) {
        updatedCount++;
        return `{
                name: "${name}",
                city: "${city}",
                country: "${country}",
                description: "${description}",
                image: "${fullImageMap[name]}"
            }`;
    }
    return match;
});

fs.writeFileSync(filePath, content);
console.log(`Successfully updated ${updatedCount} destination images!`);
