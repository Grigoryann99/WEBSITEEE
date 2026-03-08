import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const TARGET_COUNT = 60;

// A highly curated array of luxury travel fallback images from Unsplash to ensure visual diversity
const LUXURY_FALLBACKS = [
    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop', // Paris sunset
    'https://images.unsplash.com/photo-1512453979436-5a50c6e18f8e?q=80&w=800&auto=format&fit=crop', // Monaco/luxury port
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop', // Lake boat
    'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=800&auto=format&fit=crop', // Desert dunes
    'https://images.unsplash.com/photo-1502602898657-3e9076bafad8?q=80&w=800&auto=format&fit=crop', // Paris rooftop
    'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=800&auto=format&fit=crop', // Tropical hotel pool
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop', // Santorini
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop', // Airplane wing
    'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=800&auto=format&fit=crop', // Beach footprint luxury
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop', // Bali temple
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop', // Maldives overwater
    'https://images.unsplash.com/photo-1549144511-f099e773c147?q=80&w=800&auto=format&fit=crop', // Paris street cafe
];

function getFallbackImage(title: string): string {
    // Generate a simple hash based on the title to consistently choose a fallback
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
        hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % LUXURY_FALLBACKS.length;
    return LUXURY_FALLBACKS[index];
}

const parser = new Parser<CustomFeed, CustomItem>({
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

interface RssItem {
    title?: string;
    link?: string;
    pubDate?: string;
    isoDate?: string;
    content?: string;
    contentSnippet?: string;
    summary?: string;
    'content:encoded'?: string;
    mediaContent?: { $: { url: string } };
    mediaThumbnail?: { $: { url: string } };
    enclosure?: { url: string };
}

interface CustomFeed {
    [key: string]: unknown;
}

interface CustomItem extends RssItem {
    [key: string]: unknown;
}

interface ProcessedArticle {
    title: string;
    description: string;
    link: string;
    date: string;
    image: string;
    source: string;
}

function extractImage(item: RssItem): string | null {
    if (item?.mediaContent?.$?.url) return item.mediaContent.$.url;
    if (item?.mediaThumbnail?.$?.url) return item.mediaThumbnail.$.url;
    if (item?.enclosure?.url) return item.enclosure.url;

    const text = String(item?.['content:encoded'] || item?.content || item?.summary || '');
    const match = /<img[^>]+src=["']([^"']+)["']/i.exec(text);
    if (match?.[1]) return match[1];

    return null;
}

async function fetchOgImage(url: string): Promise<string | null> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000); // 4 second timeout for initial HTML fetch

        const response = await fetch(url, {
            signal: controller.signal,
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
        });
        clearTimeout(timeoutId);

        if (!response.ok) return null;

        const html = await response.text();
        const match = /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i.exec(html) ||
            /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i.exec(html) ||
            /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i.exec(html);

        return match ? match[1] : null;
    } catch (error: unknown) {
        return null; // Ignore fetch errors, we'll use fallback
    }
}

async function processItem(item: RssItem, source: string): Promise<ProcessedArticle | null> {
    const title = (item.title || '').trim();
    if (!title || !item.link) return null;

    let image = extractImage(item);

    // If no native image, scrape link for og:image
    if (!image) {
        image = await fetchOgImage(item.link);
    }

    // If still no image, use diverse fallback
    if (!image) {
        image = getFallbackImage(title);
    }

    return {
        title,
        description: (item.contentSnippet || item.summary || item.title || '').slice(0, 280).trim(),
        link: item.link || '',
        date: item.isoDate || item.pubDate || new Date().toISOString(),
        image,
        source
    };
}

async function fetchFeed({ url, source }: { url: string; source: string }) {
    try {
        const feed = await parser.parseURL(url);
        const processedItems = await Promise.all(
            feed.items.slice(0, 10).map(item => processItem(item, source)) // Limit to 10 per feed to ensure enough items for 60 total
        );
        return processedItems.filter((item): item is ProcessedArticle => item !== null);
    } catch (err: unknown) {
        console.error(`[RSS] "${source}" failed: ${err instanceof Error ? err.message : String(err)}`);
        return [];
    }
}

function deduplicate<T extends { link: string; title: string }>(articles: T[]): T[] {
    const seen = new Set<string>();
    return articles.filter(a => {
        const key = a.link || a.title;
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

export async function GET() {
    try {
        const results = await Promise.allSettled(FEEDS.map(fetchFeed));
        let articles = results.flatMap(r => r.status === 'fulfilled' ? r.value : []);

        articles = deduplicate(articles);
        articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        articles = articles.slice(0, TARGET_COUNT);

        return NextResponse.json(articles, {
            headers: {
                'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=60'
            }
        });
    } catch (err: unknown) {
        console.error('[NewsAPI] Unexpected error:', err);
        return NextResponse.json([], { status: 500 });
    }
}

export const revalidate = 1800;
