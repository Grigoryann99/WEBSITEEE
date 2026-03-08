import fs from 'fs';
import path from 'path';

async function getWikiImage(search) {
    // Wikipedia API format to get main page image
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(search)}&prop=pageimages&format=json&pithumbsize=1000`;

    try {
        const res = await fetch(endpoint);
        const data = await res.json();
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];

        if (pageId !== '-1' && pages[pageId].thumbnail) {
            return pages[pageId].thumbnail.source;
        }
    } catch (e) {
        console.error("Error fetching for", search, e);
    }
    return null;
}

getWikiImage('Paris').then(url => console.log('Paris:', url));
getWikiImage('Eiffel Tower').then(url => console.log('Eiffel Tower:', url));
