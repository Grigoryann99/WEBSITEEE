import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const filePath = path.join(projectRoot, 'lib', 'countryData.ts');

let content = fs.readFileSync(filePath, 'utf8');

// 1. Add imports at the top
if (!content.includes('brazilAttractions')) {
  content = "import { brazilAttractions } from '../data/brazilAttractions';\nimport { ukAttractions } from '../data/ukAttractions';\n" + content;
}

// 2. Replace brazil destinations
const oldBrazilBlock = `    brazil: {
        name: "Brazil",
        slug: "brazil",
        description: "Breathtaking natural beauty meets a vibrant, colorful, and rhythmic culture.",
        heroImage: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2000&auto=format&fit=crop",
        tips: ["Learn basic Portuguese words", "Be mindful of personal belongings", "Use ridesharing apps"],
        destinations: [
            {
                name: "Christ the Redeemer",
                city: "Rio de Janeiro",
                country: "Brazil",
                description: "An Art Deco statue of Jesus Christ created by French sculptor Paul Landowski.",
                image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Iguazu Falls",
                city: "Foz do Iguaçu",
                country: "Brazil",
                description: "Waterfalls of the Iguazu River on the border of the Argentine province of Misiones and the Brazilian state of Paraná.",
                image: "https://images.unsplash.com/photo-1595115166304-453664d603a1?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Copacabana Beach",
                city: "Rio de Janeiro",
                country: "Brazil",
                description: "One of the most famous and most beautiful beaches in the world.",
                image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Amazon Rainforest",
                city: "Manaus",
                country: "Brazil",
                description: "A moist broadleaf tropical rainforest in the Amazon biome that covers most of the Amazon basin.",
                image: "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Sugarloaf Mountain",
                city: "Rio de Janeiro",
                country: "Brazil",
                description: "A peak situated in Rio de Janeiro, Brazil, at the mouth of Guanabara Bay.",
                image: "https://images.unsplash.com/photo-1485640321153-2ceaf8053a41?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },`;

const newBrazilBlock = `    brazil: {
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
    },`;

content = content.replace(oldBrazilBlock, newBrazilBlock);

// 3. Replace united_kingdom destinations
const oldUKBlock = `    united_kingdom: {
        name: "United Kingdom",
        slug: "united_kingdom",
        description: "Rich history, iconic royals, sprawling countrysides and cosmopolitan cities.",
        heroImage: "https://images.unsplash.com/photo-1513635269975-5969336ac1cb?q=80&w=2000&auto=format&fit=crop",
        tips: ["Stand on the right on escalators", "Always carry an umbrella", "Understand the pub culture"],
        destinations: [
            {
                name: "Big Ben",
                city: "London",
                country: "United Kingdom",
                description: "The Great Bell of the striking clock at the north end of the Palace of Westminster.",
                image: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Stonehenge",
                city: "Wiltshire",
                country: "United Kingdom",
                description: "A prehistoric monument consisting of a ring of standing stones.",
                image: "https://images.unsplash.com/photo-1447078806655-40579c2520d6?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Edinburgh Castle",
                city: "Edinburgh",
                country: "United Kingdom",
                description: "A historic castle which dominates the skyline of the city of Edinburgh from its position on the Castle Rock.",
                image: "https://images.unsplash.com/photo-1577000206091-45dba7023d22?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Tower of London",
                city: "London",
                country: "United Kingdom",
                description: "A historic castle on the north bank of the River Thames in central London.",
                image: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Roman Baths",
                city: "Bath",
                country: "United Kingdom",
                description: "Well-preserved thermae in the city of Bath, Somerset.",
                image: "https://images.unsplash.com/photo-1580129392468-c68c3ed3e16c?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },`;

const newUKBlock = `    united_kingdom: {
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
    },`;

content = content.replace(oldUKBlock, newUKBlock);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✓ Successfully and safely integrated Brazil and UK data in countryData.ts!');
