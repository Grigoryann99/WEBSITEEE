const fs = require('fs');

async function getWikiImages(title) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=images&format=json&imlimit=50`;
    try {
        const res = await fetch(url, { headers: { 'User-Agent': 'TravelApp/1.0' } });
        const data = await res.json();
        const pages = data.query.pages;
        let imgNames = [];
        for (let page_id in pages) {
            if (pages[page_id].images) {
                imgNames = pages[page_id].images.map(i => i.title);
            }
        }
        
        // Get URLs for these images
        let urls = [];
        for (let i = 0; i < imgNames.length; i += 10) {
            const chunk = imgNames.slice(i, i+10).join('|');
            const picUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(chunk)}&prop=imageinfo&iiprop=url&format=json`;
            const picRes = await fetch(picUrl, { headers: { 'User-Agent': 'TravelApp/1.0' } });
            const picData = await picRes.json();
            const picPages = picData.query.pages;
            for (let pid in picPages) {
                if (picPages[pid].imageinfo && picPages[pid].imageinfo[0]) {
                    const u = picPages[pid].imageinfo[0].url;
                    if (u.match(/\.(jpg|jpeg|png)$/i) && !u.includes('Icon') && !u.includes('Logo') && !u.includes('Flag') && !u.includes('Map')) {
                        urls.push(u);
                    }
                }
            }
        }
        return urls;
    } catch (e) {
        return [];
    }
}

async function run() {
    console.log("Fetching fallback images from Wiki...");
    let fallback = [];
    fallback.push(...await getWikiImages("Mansion"));
    fallback.push(...await getWikiImages("Villa"));
    fallback.push(...await getWikiImages("Resort"));
    fallback.push(...await getWikiImages("Luxury_hotel"));
    
    // Remove duplicates
    fallback = [...new Set(fallback)];
    console.log(`Found ${fallback.length} fallback images.`);

    const fileContent = fs.readFileSync('data/villasData.ts', 'utf-8');
    const jsonString = fileContent.replace('export const villasData = ', '').replace(/;\s*$/, '');
    const villas = eval(jsonString);

    async function getWikiImageSingle(title) {
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
        } catch (e) {}
        return null;
    }

    for (let v of villas) {
        if (v.id >= 10) {
            let img = await getWikiImageSingle(v.name);
            
            // IF it fails, do NOT use country flag, use a random beautiful wiki architecture image
            if (!img || img.includes("Flag") || img.includes("Map") || img.includes("icon")) {
                img = fallback[Math.floor(Math.random() * fallback.length)];
            }
            v.image = img;
            console.log(`Updated ${v.name} -> ${img.substring(0, 50)}...`);
            await new Promise(r => setTimeout(r, 100));
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
    console.log("Successfully wrote all Wiki links!");
}

run();
