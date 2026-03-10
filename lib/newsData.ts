export interface EditorialNewsItem {
    id: string;
    title: string;
    description: string;
    editorialComment: string;
    link: string;
    date: string;
    image: string;
    source: string;
}

export const editorialNews: EditorialNewsItem[] = [
    {
        id: "news-1",
        title: "Japan Expands E-Visa Program to 15 New Countries",
        description: "The Japanese government has announced a significant expansion of its electronic visa system, aiming to streamline entry for tourists ahead of the upcoming spring travel season.",
        editorialComment: "This expansion is a massive win for international travelers seeking to experience Japan's famous cherry blossom season. By reducing bureaucratic friction at consulates, Japan is positioning itself to absorb the overflow of tourism shifting away from traditional European summer hotspots. Travelers should leverage this immediately before the inevitable spring price surges take hold.",
        link: "https://www.japan.travel/en/",
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
        source: "Global Travel News"
    },
    {
        id: "news-2",
        title: "Venice Reports Success with Daily Tourist Tax",
        description: "Officials in Venice state that the recently implemented €5 daily entry fee for day-trippers has successfully reduced peak-day overcrowding by an estimated 15% without hurting hotel revenues.",
        editorialComment: "Venice's success provides a definitive blueprint for other over-touristed cities like Barcelona and Amsterdam. For luxury travelers, this is an encouraging development: it signals a shift toward quality over quantity in European tourism. While a €5 fee is negligible for premium travelers, the resulting thinner crowds fundamentally elevate the experience of walking the city's historic canals.",
        link: "https://en.lesechos.fr/",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=800&auto=format&fit=crop",
        source: "European Tourism Board"
    },
    {
        id: "news-3",
        title: "Major Airlines Standardize Sustainable Aviation Fuel Targets",
        description: "A coalition of top-tier international airlines has signed a binding agreement to procure a minimum of 10% Sustainable Aviation Fuel (SAF) by the end of 2030.",
        editorialComment: "While 10% may sound modest, this unified pledge forces the supply chain to scale up production. For the eco-conscious luxury traveler, this means the guilt often associated with long-haul flying will slowly diminish. However, passengers should expect to see these R&D and premium fuel costs passed down into the base price of business and first-class fares over the next five years.",
        link: "https://www.iata.org/",
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop",
        source: "Aviation Daily"
    },
    {
        id: "news-4",
        title: "Maldives Opens Three New Ultra-Luxury Eco-Resorts",
        description: "The archipelago nation has welcomed three new properties in the remote northern atolls, all boasting 100% solar power and zero-waste operational models.",
        editorialComment: "The Maldives is aggressively redefining what luxury means in the 21st century by proving that five-star luxury and zero-emission operations are not mutually exclusive. For discerning travelers, these northern atolls represent the new frontier: pristine reefs untouched by the heavy boat traffic of the central islands, combined with an entirely guilt-free footprint.",
        link: "https://visitmaldives.com/",
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop",
        source: "Luxury Travel Insights"
    },
    {
        id: "news-5",
        title: "New Bullet Train Network Connects Spain and Portugal",
        description: "The long-awaited high-speed rail line connecting Madrid to Lisbon is partially opening ahead of schedule, cutting travel time between the Iberian capitals significantly.",
        editorialComment: "This rail connection is a game-changer for European itineraries. Previously, combining Spain and Portugal required either a stressful budget flight or a grueling drive. Now, travelers can seamlessly blend the culinary vibrancy of Madrid with the coastal elegance of Lisbon in a single, relaxed trip. We highly recommend prioritizing train travel here for the superior comfort and landscape views.",
        link: "https://www.renfe.com/",
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format&fit=crop",
        source: "EuroRail News"
    },
    {
        id: "news-6",
        title: "Bhutan Significantly Reduces Daily Sustainable Development Fee",
        description: "In a bid to attract more visitors after strict post-pandemic regulations, Bhutan has halved its mandatory daily tourist tariff from $200 to $100 per night.",
        editorialComment: "Bhutan’s temporary fee reduction represents a rare, fleeting opportunity to visit one of the world's most guarded and pristine cultures at a much more accessible price point. The country remains resolutely committed to 'High Value, Low Volume' tourism, meaning visitors will still experience uncrowded monasteries and untouched Himalayan trails. Book now before the fee inevitably rises again.",
        link: "https://bhutan.travel/",
        date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        image: "https://images.unsplash.com/photo-1570534212946-f94d262cedd8?q=80&w=800&auto=format&fit=crop",
        source: "Himalayan Times"
    },
    {
        id: "news-7",
        title: "Digital Nomad Visas Drive Surge in Long-Term Rentals in Bali",
        description: "Indonesia's new 5-year remote work visa has led to a 40% increase in year-long villa rentals in locations like Canggu and Ubud.",
        editorialComment: "The formalization of Bali's digital nomad visa is transforming the island from a transient tourist destination into a semi-permanent global hub. While great for remote workers, traditional vacationers should be aware that long-term stays are driving up premium villa prices. If you are planning a short luxury holiday in Bali, securing your accommodation 6–8 months in advance is now essential.",
        link: "https://indonesia.travel/",
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop",
        source: "Asia Pacific Travel"
    },
    {
        id: "news-8",
        title: "Paris Hotels Shift Focus to Wellness and Longevity Retreats",
        description: "Several historic palaces in the French capital are partnering with medical spas to offer intensive longevity and sleep-clinic retreats alongside traditional luxury stays.",
        editorialComment: "The integration of clinical wellness into classic grand hotels is the most significant shift in luxury hospitality this decade. Travelers no longer want to return from vacation exhausted; they want to return optimized. Paris, traditionally known for indulgence, is cleverly pivoting to offer a balanced approach, allowing guests to enjoy Michelin-starred dining by night and cellular regeneration therapies by morning.",
        link: "https://en.parisinfo.com/",
        date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop",
        source: "Hospitality Design"
    }
];

export function getEditorialNews() {
    return editorialNews;
}
