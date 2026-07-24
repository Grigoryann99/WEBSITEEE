import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const projectRoot = path.join(__dirname, '..');
const publicDir = path.join(projectRoot, 'public', 'images', 'attractions');
const spainFile = path.join(projectRoot, 'data', 'spainAttractions.ts');
const franceFile = path.join(projectRoot, 'data', 'franceAttractions.ts');
const italyFile = path.join(projectRoot, 'data', 'italyAttractions.ts');
const japanFile = path.join(projectRoot, 'data', 'japanAttractions.ts');
const usaFile = path.join(projectRoot, 'data', 'usaAttractions.ts');
const greeceFile = path.join(projectRoot, 'data', 'greeceAttractions.ts');
const thailandFile = path.join(projectRoot, 'data', 'thailandAttractions.ts');
const uaeFile = path.join(projectRoot, 'data', 'uaeAttractions.ts');

if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Map custom names to exact Wikipedia page titles with good pageimages
const wikiTitleMap = {
    // USA
    "Statue of Liberty": "Statue of Liberty",
    "Grand Canyon": "Grand Canyon",
    "Yellowstone": "Yellowstone National Park",
    "Golden Gate Bridge": "Golden Gate Bridge",
    "Yosemite Valley": "Yosemite Valley",
    "Times Square": "Times Square",
    "Las Vegas Strip": "Las Vegas Strip",
    "Antelope Canyon": "Antelope Canyon",
    "Monument Valley": "Monument Valley",
    "Central Park": "Central Park",
    "Key West": "Key West",
    "Niagara Falls": "Niagara Falls",
    "french quarter": "French Quarter",
    "Yosemite Falls": "Yosemite Falls",
    "Hana Highway": null,
    "Death Valley": "Death Valley",
    "Waikiki Beach": null,
    "Mount Rushmore": "Mount Rushmore",
    "Mall of America": "Mall of America",
    "Independence Hall": "Independence Hall",

    // Japan
    "Fushimi Inari Taisha": "Fushimi Inari-taisha",
    "Mount Fuji": "Mount Fuji",
    "Kinkaku-ji": "Kinkaku-ji",
    "Senso-ji": "Sensō-ji",
    "Shibuya Crossing": "Shibuya Crossing",
    "Himeji Castle": "Himeji Castle",
    "Itsukushima Shrine": "Itsukushima Shrine",
    "Nara Park": "Nara Park",
    "Arashiyama Bamboo Grove": "Arashiyama",
    "Todai-ji": "Tōdai-ji",
    "Gion District": "Gion",
    "Jigokudani Monkey Park": "Jigokudani Monkey Park",
    "Shirakawa-go Village": "Gokayama",
    "Hakone Onsen": "Hakone",
    "Nikko Toshogu Shrine": "Nikkō Tōshōgū",
    "Hiroshima Peace Memorial Park": "Hiroshima Peace Memorial Park",
    "Mount Koya": "Mount Kōya",
    "Naoshima Island": "Naoshima",
    "Okinawa Beaches": "Okinawa Island",
    "Sapporo Snow Festival": "Sapporo Snow Festival",

    // Italy
    "Colosseum": "Colosseum",
    "Grand Canal": "Grand Canal (Venice)",
    "Duomo di Firenze": "Florence Cathedral",
    "Cinque Terre": "Cinque Terre",
    "Amalfi Coast": "Amalfi Coast",
    "Vatican Museums & Sistine Chapel": "Vatican Museums",
    "Pompeii": "Pompeii",
    "Lake Como": "Lake Como",
    "Tuscany Wine Country": "Val d'Orcia",
    "Positano": "Positano",
    "Dolomites": "Dolomites",
    "Sicilian Coast": "Taormina",
    "Borghese Gallery": "Galleria Borghese",
    "Piazza San Marco": "Piazza San Marco",
    "Matera Cave City": "Sassi di Matera",
    "Ortigia Island": "Ortygia",
    "Valle d'Aosta": "Aosta Valley",
    "Lecce Baroque Old Town": "Lecce",
    "Assisi & Umbrian Countryside": "Assisi",
    "Costa Smeralda": "Costa Smeralda",

    // Spain
    "Sagrada Familia": "Sagrada Família",
    "Prado Museum": "Museo del Prado",
    "Toledo Old City": "Toledo Cathedral",
    "Seville Cathedral & Giralda": "Seville Cathedral",
    "Ronda": "Puente Nuevo",
    "Córdoba Mezquita": "Mosque–Cathedral of Córdoba",
    "Camino de Santiago": "Santiago de Compostela Cathedral",
    "Ibiza Old Town Dalt Vila": "Ibiza",
    "Montserrat Mountain": "Santa Maria de Montserrat Abbey",
    "Valencia City of Arts & Sciences": "Ciudad de las Artes y las Ciencias",
    "Bilbao Guggenheim Museum": "Guggenheim Museum Bilbao",
    "Costa Brava": "Tossa de Mar",
    "Mallorca": "Cathedral of Santa Maria of Palma",
    "Teide National Park": "Mount Teide",
    
    // France
    "Eiffel Tower": "Eiffel Tower",
    "Louvre Museum": "Louvre",
    "Mont Saint-Michel": "Mont-Saint-Michel",
    "Château de Chambord": "Château de Chambord",
    "Promenade des Anglais": "Promenade des Anglais",
    "Verdon Gorge": "Verdon Gorge",
    "Aiguille du Midi": "Aiguille du Midi",
    "Sainte-Chapelle": "Sainte-Chapelle",
    "Calanques National Park": "Calanque de Port-Miou",
    "Dune of Pilat": "Dune of Pilat",
    "Carcassonne Medieval City": "Cité de Carcassonne",
    "Eze Village": "Èze",
    "Valensole Lavender Fields": "Valensole",
    "Strasbourg Grande Île": "Strasbourg Cathedral",
    "Palace of the Popes": "Palais des Papes",
    "Champagne Cellars of Reims": "Reims Cathedral",
    "Saint-Émilion Vineyards": "Saint-Émilion",
    "Étretat Cliffs": "Étretat",
    "Corsica (Calanches de Piana)": "Calanques de Piana",

    // Greece
    "Acropolis of Athens": "Acropolis of Athens",
    "Santorini": "Santorini",
    "Meteora Monasteries": "Meteora",
    "Mykonos Old Town": "Mykonos",
    "Delphi": "Delphi",
    "Rhodes Medieval Old Town": "Rhodes",
    "Knossos Palace": "Knossos",
    "Thessaloniki Waterfront": "Thessaloniki",
    "Corfu Old Town": "Corfu",
    "Ancient Olympia": "Olympia, Greece",
    "Navagio Beach (Shipwreck Beach)": "Navagio Beach",
    "Samaria Gorge": "Samaria Gorge",
    "Cape Sounion": "Cape Sounion",
    "Epidaurus Ancient Theatre": "Epidaurus",
    "Mount Athos Peninsula": "Mount Athos",
    "Nafplio Old Town": "Nafplio",
    "Patmos Island": "Patmos",
    "Delos Island": "Delos",
    "Vikos Gorge": "Vikos Gorge",
    "Monemvasia Byzantine Fortress": "Monemvasia",

    // Thailand
    "Grand Palace": "Grand Palace, Bangkok",
    "Wat Pho (Reclining Buddha)": "Wat Pho",
    "Phi Phi Islands": "Ko Phi Phi",
    "Wat Phra That Doi Suthep": "Wat Phra That Doi Suthep",
    "Ayutthaya Historical Park": "Ayutthaya",
    "Railay Beach": "Railay Beach",
    "Khao Sok National Park": "Khao Sok National Park",
    "Wat Arun (Temple of Dawn)": "Wat Arun",
    "James Bond Island": "Khao Phing Kan",
    "Wat Rong Khun (White Temple)": "Wat Rong Khun",
    "Erawan National Park": "Erawan National Park",
    "Koh Samui Beaches": "Ko Samui",
    "Pai Valley": "Pai, Mae Hong Son",
    "Damnoen Saduak Floating Market": "Damnoen Saduak floating market",
    "Bridge on the River Kwai": "Death Railway",
    "Chatuchak Weekend Market": "Chatuchak Market",
    "Koh Lanta": "Ko Lanta",
    "Doi Inthanon National Park": "Doi Inthanon",
    "Sukhothai Historical Park": "Sukhothai Historical Park",
    "Tiger Cave Temple": "Wat Tham Suea",

    // UAE
    "Burj Khalifa": "Burj Khalifa",
    "Sheikh Zayed Grand Mosque": "Sheikh Zayed Grand Mosque",
    "Palm Jumeirah": "Palm Jumeirah",
    "Burj Al Arab": "Burj Al Arab",
    "Dubai Mall & Dubai Fountain": "Dubai Fountain",
    "Louvre Abu Dhabi": "Louvre Abu Dhabi",
    "Desert Safari Dubai": "Rub' al Khali",
    "Dubai Frame": "Dubai Frame",
    "Dubai Creek & Gold Souk": "Dubai Creek",
    "Ferrari World Abu Dhabi": "Ferrari World Abu Dhabi",
    "Yas Island": "Yas Island",
    "Al Fahidi Historic District": "Al Fahidi Historical Neighbourhood",
    "Hatta Mountain Reserve": "Hatta, Dubai",
    "Museum of the Future": "Museum of the Future",
    "Jumeirah Beach": "Jumeirah Beach",
    "Abu Dhabi Corniche": "Corniche Road, Abu Dhabi",
    "Dubai Marina": "Dubai Marina",
    "Liwa Oasis": "Liwa Oasis",
    "Al Ain Oasis": "Al Ain Oasis",
    "Global Village Dubai": "Global Village, Dubai"
};

// Helper for delay to avoid HTTP 429
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function getWikiImage(name) {
    const searchTitle = wikiTitleMap[name];
    // null means we explicitly know there's no Wikipedia pageimage for this
    if (searchTitle === null) return null;
    const titleToSearch = searchTitle || name;
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(titleToSearch)}&prop=pageimages&format=json&pithumbsize=1000`;
    try {
        const res = await fetch(endpoint, {
            headers: {
                'User-Agent': 'VeloraTravelBot/1.0 (support@veloratravel.org; client-id=gemini-assistant)'
            }
        });
        const data = await res.json();
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        if (pageId !== '-1' && pages[pageId].thumbnail) {
            return pages[pageId].thumbnail.source;
        }
    } catch (e) {
        console.error("Error searching wiki for", name, e);
    }
    return null;
}

async function downloadImage(url, destPath) {
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const buffer = await response.arrayBuffer();
        fs.writeFileSync(destPath, Buffer.from(buffer));
        return true;
    } catch (e) {
        console.error("Download Error:", e.message);
        return false;
    }
}

function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
}

async function processFile(filePath, countryName) {
    console.log(`\n--- Processing ${countryName} attractions ---`);
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const attractionBlockRegex = /\{\s*name:\s*"([^"]+)"[\s\S]*?image:\s*"([^"]*)"/g;
    let match;
    let newContent = content;

    const matches = [];
    while ((match = attractionBlockRegex.exec(content)) !== null) {
        matches.push({
            block: match[0],
            name: match[1],
            image: match[2]
        });
    }

    for (const item of matches) {
        // Skip already downloaded local images
        if (item.image.startsWith('/images/attractions/')) {
            console.log(`Skipping (already localized): ${item.name}`);
            continue;
        }


        console.log(`Processing: ${item.name}`);
        const wikiUrl = await getWikiImage(item.name);
        
        // Wait 2.5 seconds after API call to avoid 429
        await delay(2500);

        if (wikiUrl) {
            const fileSlug = `${slugify(countryName)}-${slugify(item.name)}.jpg`;
            const destPath = path.join(publicDir, fileSlug);
            console.log(`  Downloading image from Wikipedia...`);
            const success = await downloadImage(wikiUrl, destPath);
            
            // Wait another 2.5 seconds after image download to avoid 429
            await delay(2500);

            if (success) {
                const localPath = `/images/attractions/${fileSlug}`;
                console.log(`  Saved to ${localPath}`);
                
                // Replace the image property in this specific block
                const blockRegex = new RegExp(`name:\\s*"${escapeRegExp(item.name)}"[\\s\\S]*?image:\\s*"[^"]+"`, 'g');
                newContent = newContent.replace(blockRegex, (foundBlock) => {
                    return foundBlock.replace(/image:\s*"[^"]+"/, `image: "${localPath}"`);
                });
            }
        } else {
            console.log(`  [FAIL] No Wikipedia image found for: ${item.name}`);
        }
    }

    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${filePath}`);
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function start() {
    await processFile(usaFile, 'USA');
    await processFile(japanFile, 'Japan');
    await processFile(italyFile, 'Italy');
    await processFile(spainFile, 'Spain');
    await processFile(franceFile, 'France');
    await processFile(greeceFile, 'Greece');
    await processFile(thailandFile, 'Thailand');
    await processFile(uaeFile, 'UAE');
    console.log("\nFinished processing Wikipedia images!");
}

start();
