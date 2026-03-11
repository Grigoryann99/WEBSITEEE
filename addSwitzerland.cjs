const fs = require('fs');
let content = fs.readFileSync('lib/countryData.ts', 'utf8');

const switzerlandEntry = `    switzerland: {
        name: "Switzerland",
        slug: "switzerland",
        description: "Pristine alpine lakes, dramatic peaks, and unparalleled luxury mountain resorts.",
        heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop",
        tips: ["Buy a Swiss Travel Pass", "Try fondue and raclette", "Carry Swiss Francs for small purchases"],
        destinations: [
            { name: "Matterhorn", city: "Zermatt", country: "Switzerland", description: "The iconic pyramidal peak towering over the Swiss Alpine town of Zermatt.", image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800" },
            { name: "Jungfraujoch", city: "Interlaken", country: "Switzerland", description: "A saddle in the Bernese Alps, accessible by railway as the Top of Europe.", image: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&q=80&w=800" },
            { name: "Lake Geneva", city: "Geneva", country: "Switzerland", description: "A crescent-shaped lake spanning the Swiss-French border with pristine shores.", image: "https://images.unsplash.com/photo-1506551109886-6101f48c1ab9?auto=format&fit=crop&q=80&w=800" },
            { name: "Lucerne Old Town", city: "Lucerne", country: "Switzerland", description: "A charming medieval city with a covered wooden bridge and lakeside promenade.", image: "https://images.unsplash.com/photo-1527095655346-b39a9a61d71c?auto=format&fit=crop&q=80&w=800" },
            { name: "Rhine Falls", city: "Neuhausen", country: "Switzerland", description: "The most powerful waterfall in Europe situated on the High Rhine.", image: "https://images.unsplash.com/photo-1601006155551-2d7c0018a1a9?auto=format&fit=crop&q=80&w=800" }
        ]
    },`;

const closingBracket = content.lastIndexOf('};');
content = content.slice(0, closingBracket) + switzerlandEntry + '\n' + content.slice(closingBracket);
fs.writeFileSync('lib/countryData.ts', content);
console.log('Added Switzerland! Total fix complete.');
