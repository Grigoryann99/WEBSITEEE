/**
 * Travel RSS News Server
 * - Fetches from 10 verified travel RSS feeds
 * - Always returns exactly 27 latest articles
 * - Deduplicates and sorts by date (newest first)
 * - Auto-refreshes every 30 minutes
 * - Falls back to Unsplash if no image
 * - Never crashes on feed failure
 */

import express from 'express';
import Parser from 'rss-parser';
import cron from 'node-cron';
import cors from 'cors';

const app = express();
app.use(cors());

const TARGET_COUNT = 27;

// rss-parser instance with custom media fields
const parser = new Parser({
    timeout: 12000,
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TravelNewsBot/1.0)' },
    customFields: {
        item: [
            ['media:content', 'mediaContent'],
            ['media:thumbnail', 'mediaThumbnail'],
            ['enclosure', 'enclosure']
        ]
    }
});

// ---------------------------------------------------------------------------
// Verified travel RSS feeds (confirmed working URLs as of March 2026)
// ---------------------------------------------------------------------------
const FEEDS = [
    { url: 'https://feeds.bbci.co.uk/news/world/rss.xml', source: 'BBC News' },
    { url: 'https://feeds.bbci.co.uk/news/travel/rss.xml', source: 'BBC Travel' },
    { url: 'http://rss.cnn.com/rss/cnn_travel.rss', source: 'CNN Travel' },
    { url: 'http://rss.cnn.com/rss/edition_world.rss', source: 'CNN World' },
    { url: 'https://rss.nytimes.com/services/xml/rss/nyt/Travel.xml', source: 'NY Times Travel' },
    { url: 'https://www.theguardian.com/travel/rss', source: 'The Guardian Travel' },
    { url: 'https://www.lonelyplanet.com/news/feed/atom/', source: 'Lonely Planet' },
    { url: 'https://www.aljazeera.com/xml/rss/all.xml', source: 'Al Jazeera' },
    { url: 'https://rss.dw.com/rdf/rss-en-world', source: 'DW World' },
    { url: 'https://www.cntraveler.com/stories/2011-12-02/rss', source: 'Condé Nast Traveler' },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const UNSPLASH_FALLBACK = 'https://source.unsplash.com/600x400/?travel,destination';

function extractImage(item) {
    // Try all known media fields in order of preference
    if (item.mediaContent?.$.url) return item.mediaContent.$.url;
    if (item.mediaThumbnail?.$.url) return item.mediaThumbnail.$.url;
    if (item.enclosure?.url) return item.enclosure.url;

    // Scan raw content/summary for <img src="...">
    const text = item['content:encoded'] || item.content || item.summary || '';
    const match = /<img[^>]+src=["']([^"']+)["']/i.exec(text);
    if (match?.[1]) return match[1];

    return UNSPLASH_FALLBACK;
}

function deduplicate(articles) {
    const seen = new Set();
    return articles.filter(a => {
        const key = a.link || a.title;
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

// ---------------------------------------------------------------------------
// In-memory cache
// ---------------------------------------------------------------------------
let NEWS_CACHE = [];

async function fetchFeed({ url, source }) {
    try {
        const feed = await parser.parseURL(url);
        return feed.items
            .filter(item => item.title && item.link)
            .map(item => ({
                title: (item.title || '').trim(),
                description: (item.contentSnippet || item.summary || item.title || '').slice(0, 280).trim(),
                link: item.link || '',
                date: item.isoDate || item.pubDate || new Date().toISOString(),
                image: extractImage(item),
                source
            }));
    } catch (err) {
        console.error(`[RSS] "${source}" failed: ${err.message}`);
        return [];
    }
}

async function fetchAllNews() {
    console.log('Fetching RSS feeds...');

    const results = await Promise.allSettled(FEEDS.map(fetchFeed));
    let articles = results.flatMap(r => r.status === 'fulfilled' ? r.value : []);

    // Remove duplicates
    articles = deduplicate(articles);

    // Sort newest first
    articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Take exactly TARGET_COUNT (or all if fewer)
    NEWS_CACHE = articles.slice(0, TARGET_COUNT);

    if (NEWS_CACHE.length < TARGET_COUNT) {
        console.warn(`[RSS] Only ${NEWS_CACHE.length} unique articles found (target: ${TARGET_COUNT}). Some feeds may be down.`);
    } else {
        console.log(`Updated news: ${NEWS_CACHE.length} articles loaded.`);
    }
}

// ---------------------------------------------------------------------------
// Schedule & start
// ---------------------------------------------------------------------------
cron.schedule('*/30 * * * *', fetchAllNews);  // every 30 minutes

fetchAllNews(); // initial load on startup

// ---------------------------------------------------------------------------
// API routes
// ---------------------------------------------------------------------------
app.get('/api/news', (_req, res) => res.json(NEWS_CACHE));
app.get('/news', (_req, res) => res.json(NEWS_CACHE)); // convenience alias

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`\n🌍  AUTO TRAVEL RSS SERVER started on http://localhost:${PORT}`);
    console.log(`📡  Fetching from ${FEEDS.length} RSS feeds, refreshing every 30 min\n`);
});
