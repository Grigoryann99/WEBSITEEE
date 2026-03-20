export interface DestinationItem {
    id: string;
    name: string;
    country?: string; // e.g. "Italy" if name is a city
    description: string;
    image: string;
    category: string;
}

export interface CategoryItem {
    id: string;
    title: string;
    description: string;
    icon: string; // Emoji or specific string identifier
}

export interface InspirationItem {
    id: string;
    title: string;
    image: string;
    tag: string;
    href: string;
}

export interface TravelTip {
    id: string;
    title: string;
    content: string;
}

export interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

export const destinationCategories: CategoryItem[] = [
    { id: 'beach', title: 'Beach Destinations', description: 'Pristine sands and turquoise waters for ultimate relaxation.', icon: '🏖️' },
    { id: 'luxury', title: 'Luxury Travel', description: 'Exclusive resorts, private villas, and exceptional service.', icon: '✨' },
    { id: 'island', title: 'Island Escapes', description: 'Remote atolls and vibrant island cultures waiting to be explored.', icon: '🌴' },
    { id: 'cultural', title: 'Cultural Cities', description: 'Historic architecture, world-class museums, and culinary arts.', icon: '🏛️' },
    { id: 'nature', title: 'Nature & Mountains', description: 'Dramatic landscapes, alpine luxury, and serene forest retreats.', icon: '🏔️' },
    { id: 'adventure', title: 'Adventure Destinations', description: 'Thrilling expeditions, safaris, and adrenaline-fueled journeys.', icon: '🧭' },
];

export const globalDestinations: DestinationItem[] = [
    // Europe
    { id: 'it', name: 'Italy', category: 'cultural', description: 'From the ruins of Rome to the sun-drenched Amalfi Coast, a masterpiece of culture and cuisine.', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800' },
    { id: 'es', name: 'Spain', category: 'cultural', description: 'Vibrant cities, stunning beaches, and a passion for life wrapped in striking architecture.', image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&q=80&w=800' },
    { id: 'fr', name: 'France', category: 'luxury', description: 'The epitome of romance, offering world-class art in Paris and luxurious retreats in the Riviera.', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800' },
    { id: 'gr', name: 'Greece', category: 'island', description: 'Ancient history meeting the deepest blue seas among thousands of idyllic islands.', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800' },
    { id: 'pt', name: 'Portugal', category: 'cultural', description: 'Dramatic coastlines, historic Lisbon streets, and the golden vineyards of the Douro Valley.', image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=800' },
    { id: 'ch', name: 'Switzerland', category: 'nature', description: 'Pristine alpine lakes, dramatic peaks, and unparalleled luxury mountain resorts.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800' },
    { id: 'at', name: 'Austria', category: 'nature', description: 'Imperial palaces, classical music heritage, and stunning Tyrolean landscapes.', image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&q=80&w=800' },
    { id: 'de', name: 'Germany', category: 'cultural', description: 'Fairytale castles in Bavaria to the cutting-edge creative energy of modern Berlin.', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800' },
    { id: 'nl', name: 'Netherlands', category: 'cultural', description: 'Iconic canals, fields of tulips, and a progressive, bicycle-driven culture in Amsterdam.', image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&q=80&w=800' },
    { id: 'be', name: 'Belgium', category: 'cultural', description: 'Medieval towns, extraordinary chocolate, and the historic charm of Bruges and Brussels.', image: 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&q=80&w=800' },
    { id: 'gb', name: 'United Kingdom', category: 'cultural', description: 'Royal heritage, historic London landmarks, and the rugged beauty of the Scottish Highlands.', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800' },
    { id: 'ie', name: 'Ireland', category: 'nature', description: 'Rolling green hills, dramatic cliffs, and a uniquely welcoming Celtic culture.', image: 'https://images.unsplash.com/photo-1564959130747-897fb406b9af?auto=format&fit=crop&q=80&w=800' },
    { id: 'is', name: 'Iceland', category: 'adventure', description: 'A land of fire and ice featuring geysers, glaciers, and the elusive Northern Lights.', image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=800' },
    { id: 'no', name: 'Norway', category: 'nature', description: 'Majestic fjords, jagged mountains, and an unparalleled connection to raw nature.', image: 'https://images.unsplash.com/photo-1505312917212-9db5bde78aff?auto=format&fit=crop&q=80&w=800' },
    { id: 'se', name: 'Sweden', category: 'nature', description: 'Archipelagos of thousands of islands and the sophisticated design culture of Stockholm.', image: 'https://images.unsplash.com/photo-1752003119242-4ab0b493afed?auto=format&fit=crop&q=80&w=800' },
    { id: 'fi', name: 'Finland', category: 'nature', description: 'Lakeside saunas, pristine forests, and magical winter experiences in Lapland.', image: 'https://images.unsplash.com/photo-1712407886114-adddf9568a5a?auto=format&fit=crop&q=80&w=800' },
    { id: 'dk', name: 'Denmark', category: 'cultural', description: 'Fairy-tale charm, modern gastronomy, and the quintessential concept of hygge.', image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&q=80&w=800' },
    { id: 'pl', name: 'Poland', category: 'cultural', description: 'Rich medieval history, resilient cities like Krakow, and deep cultural traditions.', image: 'https://images.unsplash.com/photo-1636903364559-0dfc358abd94?auto=format&fit=crop&q=80&w=800' },
    { id: 'cz', name: 'Czech Republic', category: 'cultural', description: 'The gothic splendor of Prague, featuring spectacular bridges and astronomical clocks.', image: 'https://images.unsplash.com/photo-1735241586057-dcd5d000df97?auto=format&fit=crop&q=80&w=800' },
    { id: 'hu', name: 'Hungary', category: 'cultural', description: 'Thermal baths, grand architecture along the Danube, and vibrant ruin bars in Budapest.', image: 'https://images.unsplash.com/photo-1638131984912-96ae3d289f16?auto=format&fit=crop&q=80&w=800' },

    // Middle East & Asia
    { id: 'tr', name: 'Turkey', category: 'cultural', description: 'Where East meets West—breathtaking mosques, vibrant bazaars, and the balloons of Cappadocia.', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=800' },
    { id: 'ae', name: 'United Arab Emirates', category: 'luxury', description: 'Unprecedented modern luxury, towering skyscrapers, and opulent desert retreats.', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800' },
    { id: 'qa', name: 'Qatar', category: 'luxury', description: 'Futuristic skylines blending flawlessly with deep-rooted Arabian heritage and art.', image: 'https://images.unsplash.com/photo-1647252262017-582a7dbb73d0?auto=format&fit=crop&q=80&w=800' },
    { id: 'jo', name: 'Jordan', category: 'adventure', description: 'The incredible rose-red city of Petra and the stark, beautiful landscapes of Wadi Rum.', image: 'https://images.unsplash.com/photo-1712323028707-6e59c3d2271a?auto=format&fit=crop&q=80&w=800' },
    { id: 'th', name: 'Thailand', category: 'beach', description: 'Gilded temples, bustling street food markets, and idyllic tropical islands.', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=800' },
    { id: 'jp', name: 'Japan', category: 'cultural', description: 'A seamless blend of ancient traditions, serene zen gardens, and hyper-modern cities.', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800' },
    { id: 'kr', name: 'South Korea', category: 'cultural', description: 'Dynamic Seoul pop culture contrasting with tranquil mountains and historic palaces.', image: 'https://images.unsplash.com/photo-1601621915196-2621bfb0cd6e?auto=format&fit=crop&q=80&w=800' },
    { id: 'vn', name: 'Vietnam', category: 'cultural', description: 'Breathtaking karst landscapes, rich colonial history, and incredibly vibrant cuisine.', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800' },
    { id: 'id', name: 'Indonesia', category: 'island', description: 'Over 17,000 islands featuring the spiritual luxury of Bali and the wilderness of Komodo.', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800' },
    { id: 'sg', name: 'Singapore', category: 'luxury', description: 'A futuristic garden city boasting incredible food, pristine streets, and luxury shopping.', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800' },
    { id: 'my', name: 'Malaysia', category: 'cultural', description: 'A melting pot of cultures featuring the Petronas Towers and pristine Bornean rainforests.', image: 'https://images.unsplash.com/photo-1588931322123-9345cc9688bd?auto=format&fit=crop&q=80&w=800' },
    { id: 'ph', name: 'Philippines', category: 'beach', description: 'Crystal-clear waters, hidden lagoons, and some of the friendliest locals in the world.', image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&q=80&w=800' },
    { id: 'in', name: 'India', category: 'cultural', description: 'A sensory explosion of colors, spices, palaces, and the majestic Taj Mahal.', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800' },
    { id: 'lk', name: 'Sri Lanka', category: 'nature', description: 'Lush tea plantations, ancient Buddhist ruins, and pristine Indian Ocean beaches.', image: 'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&q=80&w=800' },
    { id: 'mv', name: 'Maldives', category: 'luxury', description: 'The absolute pinnacle of overwater luxury resorts and exquisite turquoise lagoons.', image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80&w=800' },

    // Oceania & North America
    { id: 'au', name: 'Australia', category: 'adventure', description: 'The rugged Outback, the iconic Sydney Opera House, and the spectacular Great Barrier Reef.', image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800' },
    { id: 'nz', name: 'New Zealand', category: 'adventure', description: 'Unmatched adventure landscapes, soaring fjords, and welcoming native Maori culture.', image: 'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?auto=format&fit=crop&q=80&w=800' },
    { id: 'us', name: 'United States', category: 'cultural', description: 'Vast national parks, iconic cities like New York, and diverse landscapes coast to coast.', image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80&w=800' },
    { id: 'ca', name: 'Canada', category: 'nature', description: 'Breathtaking Rocky Mountains, cosmopolitan cities, and vast untouched wilderness.', image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80&w=800' },
    { id: 'mx', name: 'Mexico', category: 'beach', description: 'Ancient Mayan ruins, vibrant culinary scenes, and stunning resorts in the Riviera Maya.', image: 'https://images.unsplash.com/photo-1589882868702-f0c72816f98b?auto=format&fit=crop&q=80&w=800' },

    // South America & Africa
    { id: 'br', name: 'Brazil', category: 'beach', description: 'The vibrant energy of Rio de Janeiro, the Amazon rainforest, and spectacular beaches.', image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=800' },
    { id: 'ar', name: 'Argentina', category: 'cultural', description: 'The tango culture of Buenos Aires, premium wine regions, and the dramatic peaks of Patagonia.', image: 'https://images.unsplash.com/photo-1662217688785-b5c4424a320a?auto=format&fit=crop&q=80&w=800' },
    { id: 'cl', name: 'Chile', category: 'nature', description: 'From the stark beauty of the Atacama Desert to the frozen fjords of the south.', image: 'https://images.unsplash.com/photo-1718587549592-a7b86daa418c?auto=format&fit=crop&q=80&w=800' },
    { id: 'pe', name: 'Peru', category: 'cultural', description: 'The mystical ruins of Machu Picchu, the Sacred Valley, and world-renowned gastronomy.', image: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&q=80&w=800' },
    { id: 'co', name: 'Colombia', category: 'cultural', description: 'Colorful colonial cities like Cartagena, rich coffee regions, and revitalized urban centers.', image: 'https://images.unsplash.com/photo-1714686495394-73e2bb1bbd39?auto=format&fit=crop&q=80&w=800' },
    { id: 'cr', name: 'Costa Rica', category: 'nature', description: 'The ultimate eco-tourism destination with lush rainforests, volcanoes, and incredible wildlife.', image: 'https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&q=80&w=800' },
    { id: 'pa', name: 'Panama', category: 'island', description: 'A thriving modern capital, the famous canal, and pristine, undeveloped tropical islands.', image: 'https://images.unsplash.com/photo-1650900426337-0f7c0e0f86ea?auto=format&fit=crop&q=80&w=800' },
    { id: 'za', name: 'South Africa', category: 'adventure', description: 'Unforgettable Big Five safaris, spectacular coastal drives, and the beauty of Cape Town.', image: 'https://images.unsplash.com/photo-1592910725283-4a7752699e67?auto=format&fit=crop&q=80&w=800' },
    { id: 'ma', name: 'Morocco', category: 'cultural', description: 'A sensory journey through colorful souks, the Sahara desert, and intricate riad architecture.', image: 'https://images.unsplash.com/photo-1673709985879-ba098b960f27?auto=format&fit=crop&q=80&w=800' },
    { id: 'eg', name: 'Egypt', category: 'cultural', description: 'The cradle of civilization, featuring the Pyramids of Giza and luxurious Nile river cruises.', image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=800' },
];

// Multi-category tags: a country can belong to several filter categories
export const categoryTags: Record<string, string[]> = {
    // Beach Destinations
    mv: ['beach', 'luxury', 'island'],
    th: ['beach'],
    id: ['beach', 'island'],
    ph: ['beach', 'island'],
    lk: ['beach', 'island'],
    br: ['beach'],
    mx: ['beach'],
    au: ['beach', 'adventure'],
    // Luxury Travel
    ae: ['luxury'],
    qa: ['luxury'],
    ch: ['luxury', 'nature'],
    fr: ['luxury', 'cultural'],
    jp: ['luxury', 'cultural'],
    sg: ['luxury'],
    it: ['luxury', 'cultural'],
    // Island Escapes (extra from above)
    gr: ['cultural', 'island'],
    // Fiji is not in globalDestinations so omitted
    nz: ['adventure', 'island', 'nature'],
    // Cultural Cities
    tr: ['cultural'],
    in: ['cultural'],
    pe: ['cultural', 'adventure'],
    ma: ['cultural'],
    eg: ['cultural'],
    // Nature & Mountains
    is: ['adventure', 'nature'],
    no: ['adventure', 'nature'],
    at: ['nature'],
    cl: ['nature'],
    cr: ['nature', 'adventure'],
    ca: ['nature'],
    // Adventure Destinations
    za: ['adventure'],
    jo: ['adventure'],
};

export const featuredDestination = {
    name: 'Kyoto, Japan',
    headline: 'The Timeless Heart of Japan',
    description: 'Immerse yourself in a city where centuries-old temples, meticulously manicured zen gardens, and the elusive geisha culture seamlessly coexist with modern luxury. From the breathtaking bamboo groves of Arashiyama to the thousands of vermilion torii gates at Fushimi Inari, Kyoto offers an unparalleled journey into the soul of traditional Japan.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1600&auto=format&fit=crop',
    highlights: ['1,000+ Buddhist Temples', 'Traditional Ryokan Stays', 'Michelin-starred Kaiseki Dining', 'Gion Geisha District']
};

export const inspirationCards: InspirationItem[] = [
    { id: 'insp1', title: 'Best Beaches in Thailand', tag: 'Beach', href: '/blog/best-beaches-thailand', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=800' },
    { id: 'insp2', title: 'Hidden Islands of Indonesia', tag: 'Island', href: '/blog/hidden-islands-indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800' },
    { id: 'insp3', title: 'Romantic Destinations in Italy', tag: 'Romance', href: '/blog/romantic-destinations-italy', image: 'https://images.unsplash.com/photo-1516483638261-f40af5ba3081?auto=format&fit=crop&q=80&w=800' },
    { id: 'insp4', title: 'Adventure Travel in Iceland', tag: 'Adventure', href: '/blog/adventure-iceland', image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=800' },
    { id: 'insp5', title: 'Cultural Cities of Spain', tag: 'Culture', href: '/blog/cultural-cities-spain', image: 'https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?auto=format&fit=crop&q=80&w=800' },
    { id: 'insp6', title: 'Luxury Escapes in the Maldives', tag: 'Luxury', href: '/blog/luxury-maldives', image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80&w=800' },
    { id: 'insp7', title: 'Sacred Temples of Japan', tag: 'Culture', href: '/blog/sacred-temples-japan', image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&q=80&w=800' },
    { id: 'insp8', title: 'Safari Experiences in Kenya', tag: 'Adventure', href: '/blog/safari-kenya', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800' },
    { id: 'insp9', title: 'Wine Country of Tuscany', tag: 'Luxury', href: '/blog/wine-tuscany', image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&q=80&w=800' },
];

export const travelTips: TravelTip[] = [
    { id: 'tip1', title: 'Best Time to Travel', content: 'Timing is everything. Research shoulder seasons for your destination — the period right before or after peak season. You will enjoy better weather than the off-season, but drastically fewer crowds and lower luxury accommodation rates than peak summer or winter holidays.' },
    { id: 'tip2', title: 'Planning International Trips', content: 'Always check visa requirements and passport validity at least 6 months prior to departure. Use a master checklist for flights, transfers, accommodation, and travel insurance. Booking premium restaurants well in advance is highly recommended.' },
    { id: 'tip3', title: 'Travel Safety & Health', content: 'Share your itinerary with a trusted contact. Keep digital copies of your passport and necessary medical prescriptions on a secure cloud. When traveling to remote or exotic locations, consult a travel clinic for recommended vaccinations 8 weeks prior.' },
    { id: 'tip4', title: 'Budget vs. Luxury Travel', content: 'Luxury travel is not just about spending more; it is about maximizing the value of your time. Invest in direct flights, private airport transfers, and boutique hotels with dedicated concierges. Save money on superficial upgrades to spend generously on unique, unforgettable experiences.' },
];

export const frequentlyAskedQuestions: FAQItem[] = [
    { id: 'faq1', question: 'How far in advance should I book a luxury trip?', answer: 'For peak seasons in highly sought-after destinations (like summer in the Amalfi Coast or winter in the Maldives), we recommend booking 6 to 9 months in advance. For shoulder seasons, 3 to 4 months is generally sufficient.' },
    { id: 'faq2', question: 'Do I need a visa for my destination?', answer: 'Visa requirements depend entirely on your passport nationality and the destination country. Always consult the official government or embassy website of the country you intend to visit well before your trip.' },
    { id: 'faq3', question: 'Is travel insurance really necessary?', answer: 'Absolutely. High-end travel involves significant non-refundable deposits for flights, villas, and exclusive tours. Comprehensive travel insurance protects your investment against unforeseen medical emergencies, cancellations, or severe delays.' },
    { id: 'faq4', question: 'What is a "shoulder season"?', answer: 'Shoulder season refers to the travel period between the peak (high) season and the off (low) season. Weather is usually still pleasant, but crowds are thinner and premium properties are often more accessible and reasonably priced.' },
    { id: 'faq5', question: 'How can I ensure my travel is sustainable?', answer: 'Choose eco-certified lodges, support local artisans rather than purchasing mass-produced souvenirs, and opt for operators who employ local guides. Avoiding destinations during extreme peak periods also helps prevent over-tourism.' },
    { id: 'faq6', question: 'What is the best way to handle currency abroad?', answer: 'Carrying a small amount of local cash is useful for tipping and small purchases. However, a premium travel credit card with no foreign transaction fees is the safest and most efficient way to pay for hotels, dining, and shopping globally.' },
];
