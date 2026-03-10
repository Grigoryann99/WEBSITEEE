export interface DestinationItem {
    id: string;
    name: string;
    country?: string; // e.g. "Italy" if name is a city
    description: string;
    image: string;
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
    { id: 'it', name: 'Italy', description: 'From the ruins of Rome to the sun-drenched Amalfi Coast, a masterpiece of culture and cuisine.', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800' },
    { id: 'es', name: 'Spain', description: 'Vibrant cities, stunning beaches, and a passion for life wrapped in striking architecture.', image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&q=80&w=800' },
    { id: 'fr', name: 'France', description: 'The epitome of romance, offering world-class art in Paris and luxurious retreats in the Riviera.', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800' },
    { id: 'gr', name: 'Greece', description: 'Ancient history meeting the deepest blue seas among thousands of idyllic islands.', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800' },
    { id: 'pt', name: 'Portugal', description: 'Dramatic coastlines, historic Lisbon streets, and the golden vineyards of the Douro Valley.', image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=800' },
    { id: 'ch', name: 'Switzerland', description: 'Pristine alpine lakes, dramatic peaks, and unparalleled luxury mountain resorts.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800' },
    { id: 'at', name: 'Austria', description: 'Imperial palaces, classical music heritage, and stunning Tyrolean landscapes.', image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&q=80&w=800' },
    { id: 'de', name: 'Germany', description: 'Fairytale castles in Bavaria to the cutting-edge creative energy of modern Berlin.', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800' },
    { id: 'nl', name: 'Netherlands', description: 'Iconic canals, fields of tulips, and a progressive, bicycle-driven culture in Amsterdam.', image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&q=80&w=800' },
    { id: 'be', name: 'Belgium', description: 'Medieval towns, extraordinary chocolate, and the historic charm of Bruges and Brussels.', image: 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&q=80&w=800' },
    { id: 'gb', name: 'United Kingdom', description: 'Royal heritage, historic London landmarks, and the rugged beauty of the Scottish Highlands.', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800' },
    { id: 'ie', name: 'Ireland', description: 'Rolling green hills, dramatic cliffs, and a uniquely welcoming Celtic culture.', image: 'https://images.unsplash.com/photo-1564959130747-897fb406b9af?auto=format&fit=crop&q=80&w=800' },
    { id: 'is', name: 'Iceland', description: 'A land of fire and ice featuring geysers, glaciers, and the elusive Northern Lights.', image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=800' },
    { id: 'no', name: 'Norway', description: 'Majestic fjords, jagged mountains, and an unparalleled connection to raw nature.', image: 'https://images.unsplash.com/photo-1623886566276-8f2c696e838e?auto=format&fit=crop&q=80&w=800' },
    { id: 'se', name: 'Sweden', description: 'Archipelagos of thousands of islands and the sophisticated design culture of Stockholm.', image: 'https://images.unsplash.com/photo-1509356843151-3e7d96a77d11?auto=format&fit=crop&q=80&w=800' },
    { id: 'fi', name: 'Finland', description: 'Lakeside saunas, pristine forests, and magical winter experiences in Lapland.', image: 'https://images.unsplash.com/photo-1589201990425-9c849c3b8398?auto=format&fit=crop&q=80&w=800' },
    { id: 'dk', name: 'Denmark', description: 'Fairy-tale charm, modern gastronomy, and the quintessential concept of hygge.', image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&q=80&w=800' },
    { id: 'pl', name: 'Poland', description: 'Rich medieval history, resilient cities like Krakow, and deep cultural traditions.', image: 'https://images.unsplash.com/photo-1563191911-e65a18a506c5?auto=format&fit=crop&q=80&w=800' },
    { id: 'cz', name: 'Czech Republic', description: 'The gothic splendor of Prague, featuring spectacular bridges and astronomical clocks.', image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&q=80&w=800' },
    { id: 'hu', name: 'Hungary', description: 'Thermal baths, grand architecture along the Danube, and vibrant ruin bars in Budapest.', image: 'https://images.unsplash.com/photo-1551867633-194f125bddfa?auto=format&fit=crop&q=80&w=800' },

    // Middle East & Asia
    { id: 'tr', name: 'Turkey', description: 'Where East meets West—breathtaking mosques, vibrant bazaars, and the balloons of Cappadocia.', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=800' },
    { id: 'ae', name: 'United Arab Emirates', description: 'Unprecedented modern luxury, towering skyscrapers, and opulent desert retreats.', image: 'https://images.unsplash.com/photo-1512453979436-5a50c6e18f8e?auto=format&fit=crop&q=80&w=800' },
    { id: 'qa', name: 'Qatar', description: 'Futuristic skylines blending flawlessly with deep-rooted Arabian heritage and art.', image: 'https://images.unsplash.com/photo-1516108317508-6788f6a160e6?auto=format&fit=crop&q=80&w=800' },
    { id: 'jo', name: 'Jordan', description: 'The incredible rose-red city of Petra and the stark, beautiful landscapes of Wadi Rum.', image: 'https://images.unsplash.com/photo-1570737117716-1259ae99c318?auto=format&fit=crop&q=80&w=800' },
    { id: 'th', name: 'Thailand', description: 'Gilded temples, bustling street food markets, and idyllic tropical islands.', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=800' },
    { id: 'jp', name: 'Japan', description: 'A seamless blend of ancient traditions, serene zen gardens, and hyper-modern cities.', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800' },
    { id: 'kr', name: 'South Korea', description: 'Dynamic Seoul pop culture contrasting with tranquil mountains and historic palaces.', image: 'https://images.unsplash.com/photo-1601621915196-2621bfb0cd6e?auto=format&fit=crop&q=80&w=800' },
    { id: 'vn', name: 'Vietnam', description: 'Breathtaking karst landscapes, rich colonial history, and incredibly vibrant cuisine.', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800' },
    { id: 'id', name: 'Indonesia', description: 'Over 17,000 islands featuring the spiritual luxury of Bali and the wilderness of Komodo.', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800' },
    { id: 'sg', name: 'Singapore', description: 'A futuristic garden city boasting incredible food, pristine streets, and luxury shopping.', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800' },
    { id: 'my', name: 'Malaysia', description: 'A melting pot of cultures featuring the Petronas Towers and pristine Bornean rainforests.', image: 'https://images.unsplash.com/photo-1596422846543-7ec4037ceeb6?auto=format&fit=crop&q=80&w=800' },
    { id: 'ph', name: 'Philippines', description: 'Crystal-clear waters, hidden lagoons, and some of the friendliest locals in the world.', image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&q=80&w=800' },
    { id: 'in', name: 'India', description: 'A sensory explosion of colors, spices, palaces, and the majestic Taj Mahal.', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800' },
    { id: 'lk', name: 'Sri Lanka', description: 'Lush tea plantations, ancient Buddhist ruins, and pristine Indian Ocean beaches.', image: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?auto=format&fit=crop&q=80&w=800' },
    { id: 'mv', name: 'Maldives', description: 'The absolute pinnacle of overwater luxury resorts and exquisite turquoise lagoons.', image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80&w=800' },

    // Oceania & North America
    { id: 'au', name: 'Australia', description: 'The rugged Outback, the iconic Sydney Opera House, and the spectacular Great Barrier Reef.', image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800' },
    { id: 'nz', name: 'New Zealand', description: 'Unmatched adventure landscapes, soaring fjords, and welcoming native Maori culture.', image: 'https://images.unsplash.com/photo-1469521669194-babbdf9aa981?auto=format&fit=crop&q=80&w=800' },
    { id: 'us', name: 'United States', description: 'Vast national parks, iconic cities like New York, and diverse landscapes coast to coast.', image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80&w=800' },
    { id: 'ca', name: 'Canada', description: 'Breathtaking Rocky Mountains, cosmopolitan cities, and vast untouched wilderness.', image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80&w=800' },
    { id: 'mx', name: 'Mexico', description: 'Ancient Mayan ruins, vibrant culinary scenes, and stunning resorts in the Riviera Maya.', image: 'https://images.unsplash.com/photo-1518105779084-257a402377b2?auto=format&fit=crop&q=80&w=800' },

    // South America & Africa
    { id: 'br', name: 'Brazil', description: 'The vibrant energy of Rio de Janeiro, the Amazon rainforest, and spectacular beaches.', image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=800' },
    { id: 'ar', name: 'Argentina', description: 'The tango culture of Buenos Aires, premium wine regions, and the dramatic peaks of Patagonia.', image: 'https://images.unsplash.com/photo-1549646401-49666c5d1796?auto=format&fit=crop&q=80&w=800' },
    { id: 'cl', name: 'Chile', description: 'From the stark beauty of the Atacama Desert to the frozen fjords of the south.', image: 'https://images.unsplash.com/photo-1520645609462-fc8e7e170068?auto=format&fit=crop&q=80&w=800' },
    { id: 'pe', name: 'Peru', description: 'The mystical ruins of Machu Picchu, the Sacred Valley, and world-renowned gastronomy.', image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&q=80&w=800' },
    { id: 'co', name: 'Colombia', description: 'Colorful colonial cities like Cartagena, rich coffee regions, and revitalized urban centers.', image: 'https://images.unsplash.com/photo-1501472040950-0bcf40a07b4b?auto=format&fit=crop&q=80&w=800' },
    { id: 'cr', name: 'Costa Rica', description: 'The ultimate eco-tourism destination with lush rainforests, volcanoes, and incredible wildlife.', image: 'https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&q=80&w=800' },
    { id: 'pa', name: 'Panama', description: 'A thriving modern capital, the famous canal, and pristine, undeveloped tropical islands.', image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&q=80&w=800' },
    { id: 'za', name: 'South Africa', description: 'Unforgettable Big Five safaris, spectacular coastal drives, and the beauty of Cape Town.', image: 'https://images.unsplash.com/photo-1580060839134-758129a4f661?auto=format&fit=crop&q=80&w=800' },
    { id: 'ma', name: 'Morocco', description: 'A sensory journey through colorful souks, the Sahara desert, and intricate riad architecture.', image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&q=80&w=800' },
    { id: 'eg', name: 'Egypt', description: 'The cradle of civilization, featuring the Pyramids of Giza and luxurious Nile river cruises.', image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=800' },
];

export const featuredDestination = {
    name: 'Kyoto, Japan',
    headline: 'The Timeless Heart of Japan',
    description: 'Immerse yourself in a city where centuries-old temples, meticulously manicured zen gardens, and the elusive geisha culture seamlessly coexist with modern luxury. From the breathtaking bamboo groves of Arashiyama to the thousands of vermilion torii gates at Fushimi Inari, Kyoto offers an unparalleled journey into the soul of traditional Japan.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1600&auto=format&fit=crop',
    highlights: ['1,000+ Buddhist Temples', 'Traditional Ryokan Stays', 'Michelin-starred Kaiseki Dining', 'Gion Geisha District']
};

export const inspirationCards: InspirationItem[] = [
    { id: 'insp1', title: 'Best Beaches in Thailand', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=600' },
    { id: 'insp2', title: 'Hidden Islands of Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600' },
    { id: 'insp3', title: 'Romantic Destinations in Italy', image: 'https://images.unsplash.com/photo-1516483638261-f40af5ba3081?auto=format&fit=crop&q=80&w=600' },
    { id: 'insp4', title: 'Adventure Travel in Iceland', image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=600' },
    { id: 'insp5', title: 'Cultural Cities of Spain', image: 'https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?auto=format&fit=crop&q=80&w=600' },
    { id: 'insp6', title: 'Luxury Escapes in the Maldives', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=600' },
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
