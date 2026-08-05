const fs = require('fs');

const fileContent = fs.readFileSync('data/villasData.ts', 'utf-8');

// Strip "export const villasData = " and ";"
const jsonString = fileContent.replace('export const villasData = ', '').replace(/;\s*$/, '');

// Parse using eval (safe here because we generated it)
const villas = eval(jsonString);

const fallback_images = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Statue_of_Liberty%2C_NY.jpg/1200px-Statue_of_Liberty%2C_NY.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Eiffel_Tower_from_the_Tour_Montparnasse_3.jpg/1200px-Eiffel_Tower_from_the_Tour_Montparnasse_3.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_york_times_square-terabass.jpg/1200px-New_york_times_square-terabass.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Sydney_Opera_House_2010.jpg/1200px-Sydney_Opera_House_2010.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Taj_Mahal_in_March_2004.jpg/1200px-Taj_Mahal_in_March_2004.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg/1200px-Colosseum_in_Rome%2C_Italy_-_April_2007.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Machu_Picchu%2C_Peru.jpg/1200px-Machu_Picchu%2C_Peru.jpg"
];

async function getWikiImage(title) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=1200&redirects=1`;
    try {
        const res = await fetch(url, { headers: { 'User-Agent': 'TravelApp/1.0' } });
        const data = await res.json();
        const pages = data.query.pages;
        for (let page_id in pages) {
            if (pages[page_id].thumbnail) {
                return pages[page_id].thumbnail.source;
            }
        }
    } catch (e) {
    }
    return null;
}

async function run() {
    for (let v of villas) {
        if (v.id >= 10) {
            let img = await getWikiImage(v.name);
            if (!img) {
                img = await getWikiImage(v.location);
            }
            if (!img) {
                img = fallback_images[Math.floor(Math.random() * fallback_images.length)];
            }
            v.image = img;
            console.log(`Updated ${v.name} -> ${img.substring(0, 50)}...`);
            // Add a small delay
            await new Promise(r => setTimeout(r, 200));
        }
    }

    let ts_content = "export const villasData = [\n";
    for (let v of villas) {
        let desc = v.description.replace(/'/g, "\\'");
        let name = v.name.replace(/'/g, "\\'");
        let loc = v.location.replace(/'/g, "\\'");
        ts_content += "    {\n";
        ts_content += `        id: ${v.id},\n`;
        ts_content += `        name: '${name}',\n`;
        ts_content += `        price: '${v.price}',\n`;
        ts_content += `        description: '${desc}',\n`;
        ts_content += `        image: '${v.image}',\n`;
        ts_content += `        bedrooms: ${v.bedrooms},\n`;
        ts_content += `        guests: ${v.guests},\n`;
        ts_content += `        amenity: '${v.amenity}',\n`;
        ts_content += `        location: '${loc}'\n`;
        ts_content += "    },\n";
    }
    ts_content += "];\n";

    fs.writeFileSync('data/villasData.ts', ts_content);
    console.log("Successfully wrote all Wikimedia links!");
}

run();
