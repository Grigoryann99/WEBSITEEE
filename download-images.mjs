import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

const queries = {
    'paris.jpg': 'Paris',
    'rome.jpg': 'Rome',
    'tokyo.jpg': 'Tokyo',
    'usa.jpg': 'New York City',
    'spain.jpg': 'Barcelona',
    'greece.jpg': 'Athens',
    'uae.jpg': 'Dubai',
    'brazil.jpg': 'Rio de Janeiro',
    'thailand.jpg': 'Bangkok',
    'uk.jpg': 'London',
    'eiffel-tower.jpg': 'Eiffel Tower',
    'louvre.jpg': 'Louvre museum',
    'colosseum.jpg': 'Colosseum',
    'mount-fuji.jpg': 'Mount Fuji',
    'placeholder.jpg': 'Nature pattern'
};

async function getWikiImage(search) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(search)}&prop=pageimages&format=json&pithumbsize=1000`;
    try {
        const cmd = `curl -s -A "TravelAppBot/1.0" "${endpoint}"`;
        const res = execSync(cmd).toString();
        const data = JSON.parse(res);
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        if (pageId !== '-1' && pages[pageId].thumbnail) {
            return pages[pageId].thumbnail.source;
        }
    } catch (e) {
        console.error("Error searching wiki for", search, e);
    }
    return null;
}

async function downloadImage(url, destPath) {
    try {
        const cmd = `curl -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36" -o "${destPath}" "${url}"`;
        execSync(cmd);
    } catch (e) {
        console.error("Download Error:", e.message);
    }
}

async function main() {
    console.log("Starting image downloads with curl...");
    for (const [filename, query] of Object.entries(queries)) {
        const filePath = path.join(imagesDir, filename);

        console.log(`[SEARCH] ${query}...`);
        const url = await getWikiImage(query);
        if (url) {
            console.log(`[DOWNLOAD] -> ${filename} from ${url}`);
            await downloadImage(url, filePath);
        } else {
            console.log(`[FAIL] Could not find an image for ${query}`);
            const fallbackUrl = "https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=800&auto=format&fit=crop";
            await downloadImage(fallbackUrl, filePath);
        }
    }
    console.log("Done downloading all images!");
}

main();
