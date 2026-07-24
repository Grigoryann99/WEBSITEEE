const axios = require('axios');

async function testSearch(query) {
    try {
        const url = `https://unsplash.com/s/photos/${encodeURIComponent(query)}`;
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        const html = response.data;
        // Search for images with format: https://images.unsplash.com/photo-something?ixlib=...
        const regex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+/g;
        const matches = html.match(regex);
        if (matches && matches.length > 0) {
            // Get unique matches
            const unique = [...new Set(matches)];
            console.log(`Query: ${query} -> Found ${unique.length} matches. First one: ${unique[0]}`);
            return unique[0];
        } else {
            console.log(`Query: ${query} -> No matches found`);
        }
    } catch (e) {
        console.error("Error searching for", query, e.message);
    }
    return null;
}

testSearch('rhodes-old-town');
testSearch('knossos-palace');
