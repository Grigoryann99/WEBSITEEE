// Fix countryData.ts: replace old hardcoded Brazil and UK destinations with map() calls
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const filePath = path.join(projectRoot, 'lib', 'countryData.ts');

let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove the PLACEHOLDER line we accidentally added
content = content.replace(
  /\s*united_kingdom_PLACEHOLDER:\s*\{[^}]+\},\n/g,
  '\n'
);

// 2. Replace the old Brazil destinations block (everything from 'destinations: [' to the closing ']')
// Find brazil block and replace destinations
const brazilNewDestinations = `        destinations: brazilAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: 'Brazil',
            description: attr.description,
            image: attr.image || '',
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost,
        }))`;

// Replace old brazil destinations array (the old hardcoded one that starts after our map() replacement)
// Look for the pattern: hardcoded destinations starting with { name: "Christ the Redeemer"...
const brazilOldPattern = /(\s*\},\n\s*united_kingdom_PLACEHOLDER[^,]+,\s*\n)\s*\{\r?\n\s*name: "Christ the Redeemer"[\s\S]*?(?=\n\s*\},\n\s*united_kingdom)/;
content = content.replace(brazilOldPattern, ',\n');

// 3. Find and replace the united_kingdom block
const ukOldBlockStart = content.indexOf('    united_kingdom: {');
const ukOldBlockEnd = content.indexOf('    norway: {');

if (ukOldBlockStart !== -1 && ukOldBlockEnd !== -1) {
  const ukNewBlock = `    united_kingdom: {
        name: "United Kingdom",
        slug: "united_kingdom",
        description: "Rich history, iconic royals, sprawling countrysides and cosmopolitan cities.",
        heroImage: "https://images.unsplash.com/photo-1513635269975-5969336ac1cb?q=80&w=2000&auto=format&fit=crop",
        tips: ["Stand on the right on escalators", "Always carry an umbrella", "Understand the pub culture"],
        destinations: ukAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: 'United Kingdom',
            description: attr.description,
            image: attr.image || '',
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost,
        }))
    },\n    `;

  content = content.substring(0, ukOldBlockStart) + ukNewBlock + content.substring(ukOldBlockEnd);
  console.log('✓ UK block replaced');
} else {
  console.log('✗ Could not find UK block boundaries');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('✓ countryData.ts updated successfully');
