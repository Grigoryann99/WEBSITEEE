import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const filePath = path.join(projectRoot, 'lib', 'countryData.ts');

let content = fs.readFileSync(filePath, 'utf8');

// 1. Add imports at the very top if not present
const importBrazil = "import { brazilAttractions } from '../data/brazilAttractions';";
const importUK = "import { ukAttractions } from '../data/ukAttractions';";

if (!content.includes('brazilAttractions')) {
  content = `${importBrazil}\n${importUK}\n` + content;
}

// 2. Replace the entire 'brazil' object cleanly
// We will look for brazil: { ... } until the end of its destinations array
const brazilRegex = /brazil:\s*\{[\s\S]*?destinations:\s*\[[\s\S]*?\]\s*\n\s*\}/;
const newBrazilBlock = `brazil: {
        name: "Brazil",
        slug: "brazil",
        description: "Breathtaking natural beauty meets a vibrant, colorful, and rhythmic culture.",
        heroImage: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2000&auto=format&fit=crop",
        tips: ["Learn basic Portuguese words", "Be mindful of personal belongings", "Use ridesharing apps"],
        destinations: brazilAttractions.map(attr => ({
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
        }))
    }`;

if (brazilRegex.test(content)) {
  content = content.replace(brazilRegex, newBrazilBlock);
  console.log('✓ Brazil block replaced successfully');
} else {
  console.log('✗ Could not match Brazil block with regex');
}

// 3. Replace the entire 'united_kingdom' object cleanly
const ukRegex = /united_kingdom:\s*\{[\s\S]*?destinations:\s*\[[\s\S]*?\]\s*\n\s*\}/;
const newUKBlock = `united_kingdom: {
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
    }`;

if (ukRegex.test(content)) {
  content = content.replace(ukRegex, newUKBlock);
  console.log('✓ UK block replaced successfully');
} else {
  console.log('✗ Could not match UK block with regex');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done!');
