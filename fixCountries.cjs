const fs = require('fs');

// Fix 1: Rename keys "usa" -> "united_states" and "uae" -> "united_arab_emirates"
let content = fs.readFileSync('lib/countryData.ts', 'utf8');

// Rename "usa" key to "united_states"
content = content.replace(/(\n    )usa: \{/g, '$1united_states: {');
content = content.replace(/slug: "usa"/g, 'slug: "united_states"');

// Rename "uae" key to "united_arab_emirates"
content = content.replace(/(\n    )uae: \{/g, '$1united_arab_emirates: {');
content = content.replace(/slug: "uae"/g, 'slug: "united_arab_emirates"');

// Fix 2: Also rename "united_kingdom" key - the name is "United Kingdom" so toLowerCase().replace(/ /g, '_') = "united_kingdom" — this is correct already

// Fix 3: Add all 21 missing countries
const missingCountries = `
    portugal: {
        name: "Portugal",
        slug: "portugal",
        description: "Dramatic coastlines, historic Lisbon streets, and the golden vineyards of the Douro Valley.",
        heroImage: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=2000&auto=format&fit=crop",
        tips: ["Try pastéis de nata in Lisbon", "Visit Sintra palaces early morning", "Explore the Algarve region"],
        destinations: [
            { name: "Tower of Belém", city: "Lisbon", country: "Portugal", description: "A 16th-century fortified tower marking Portugal's Age of Discovery on the Tagus riverbank.", image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=800" },
            { name: "Pena Palace", city: "Sintra", country: "Portugal", description: "A colorful Romanticist castle atop the Sintra hills, a UNESCO World Heritage Site.", image: "https://images.unsplash.com/photo-1609941698821-c9800769b614?auto=format&fit=crop&q=80&w=800" },
            { name: "Douro Valley", city: "Porto", country: "Portugal", description: "Portugal's premier wine region with terraced vineyards along the winding Douro River.", image: "https://images.unsplash.com/photo-1569959220744-ff553533f492?auto=format&fit=crop&q=80&w=800" },
            { name: "Algarve Coast", city: "Faro", country: "Portugal", description: "Stunning limestone cliffs, hidden sea caves, and Europe's most beautiful beaches.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" },
            { name: "Ribeira District", city: "Porto", country: "Portugal", description: "A medieval riverside neighborhood and UNESCO heritage site in the heart of Porto.", image: "https://images.unsplash.com/photo-1555881400-69ac4a48a09e?auto=format&fit=crop&q=80&w=800" }
        ]
    },
    austria: {
        name: "Austria",
        slug: "austria",
        description: "Imperial palaces, classical music heritage, and stunning Tyrolean landscapes.",
        heroImage: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=2000&auto=format&fit=crop",
        tips: ["Learn to greet with 'Grüß Gott'", "Book opera tickets in advance", "Try Wiener Schnitzel"],
        destinations: [
            { name: "Schönbrunn Palace", city: "Vienna", country: "Austria", description: "The former imperial summer residence and one of Europe's most impressive Baroque palaces.", image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&q=80&w=800" },
            { name: "Hallstatt", city: "Upper Austria", country: "Austria", description: "A fairy-tale lakeside village nestled between towering Alps and a serene lake.", image: "https://images.unsplash.com/photo-1617882825986-05f0f1c62aa2?auto=format&fit=crop&q=80&w=800" },
            { name: "Innsbruck", city: "Tyrol", country: "Austria", description: "A stunning Alpine city combining imperial architecture with world-class skiing.", image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?auto=format&fit=crop&q=80&w=800" },
            { name: "Salzburg Old Town", city: "Salzburg", country: "Austria", description: "The birthplace of Mozart, a beautifully preserved Baroque city and UNESCO heritage site.", image: "https://images.unsplash.com/photo-1609949279531-cf48d64bed89?auto=format&fit=crop&q=80&w=800" },
            { name: "Wachau Valley", city: "Lower Austria", country: "Austria", description: "A scenic stretch of the Danube Valley famous for wine terraces and medieval ruins.", image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=800" }
        ]
    },
    germany: {
        name: "Germany",
        slug: "germany",
        description: "Fairytale castles in Bavaria to the cutting-edge creative energy of modern Berlin.",
        heroImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2000&auto=format&fit=crop",
        tips: ["Most shops close on Sundays", "Many places are cash-only", "Try the local bakeries for bread"],
        destinations: [
            { name: "Brandenburg Gate", city: "Berlin", country: "Germany", description: "An iconic 18th-century neoclassical monument symbolizing Germany's reunification.", image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&q=80&w=800" },
            { name: "Neuschwanstein Castle", city: "Bavaria", country: "Germany", description: "A fairy-tale castle perched on a rugged hill above Hohenschwangau village.", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800" },
            { name: "Black Forest", city: "Baden-Württemberg", country: "Germany", description: "A densely wooded mountainous region famous for cuckoo clocks and cherry cake.", image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&q=80&w=800" },
            { name: "Cologne Cathedral", city: "Cologne", country: "Germany", description: "A monumental Gothic cathedral that took over 600 years to complete.", image: "https://images.unsplash.com/photo-1587989703498-8df7a1cf0f97?auto=format&fit=crop&q=80&w=800" },
            { name: "Rhine Valley", city: "Rhineland", country: "Germany", description: "A romantic stretch of the Rhine River dotted with medieval castles and vineyards.", image: "https://images.unsplash.com/photo-1556449895-a33c9dba9040?auto=format&fit=crop&q=80&w=800" }
        ]
    },
    netherlands: {
        name: "Netherlands",
        slug: "netherlands",
        description: "Iconic canals, fields of tulips, and a progressive, bicycle-driven culture.",
        heroImage: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=2000&auto=format&fit=crop",
        tips: ["Rent a bicycle in Amsterdam", "Visit Keukenhof in spring", "Try fresh stroopwafels"],
        destinations: [
            { name: "Canal Ring", city: "Amsterdam", country: "Netherlands", description: "A UNESCO-listed network of 17th-century canals at the heart of Amsterdam.", image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&q=80&w=800" },
            { name: "Keukenhof Gardens", city: "Lisse", country: "Netherlands", description: "The world's largest flower garden, bursting with millions of tulips every spring.", image: "https://images.unsplash.com/photo-1552301726-4c1c5e15a783?auto=format&fit=crop&q=80&w=800" },
            { name: "Rijksmuseum", city: "Amsterdam", country: "Netherlands", description: "The national museum of the Netherlands housing masterpieces by Rembrandt and Vermeer.", image: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&q=80&w=800" },
            { name: "Kinderdijk Windmills", city: "South Holland", country: "Netherlands", description: "A collection of 19 iconic Dutch windmills, a UNESCO World Heritage Site.", image: "https://images.unsplash.com/photo-1605101100278-5d1deb2b6498?auto=format&fit=crop&q=80&w=800" },
            { name: "The Hague", city: "South Holland", country: "Netherlands", description: "The seat of Dutch government with grand palaces and the famous Mauritshuis museum.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=800" }
        ]
    },
    belgium: {
        name: "Belgium",
        slug: "belgium",
        description: "Medieval towns, extraordinary chocolate, and the historic charm of Bruges and Brussels.",
        heroImage: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?q=80&w=2000&auto=format&fit=crop",
        tips: ["Try Belgian waffles and frites", "Visit chocolate shops in Brussels", "Explore Bruges by boat"],
        destinations: [
            { name: "Grand Place", city: "Brussels", country: "Belgium", description: "Brussels' central square surrounded by ornate 17th-century guildhalls.", image: "https://images.unsplash.com/photo-1559113202-c916b8e44373?auto=format&fit=crop&q=80&w=800" },
            { name: "Bruges Canals", city: "Bruges", country: "Belgium", description: "Picturesque medieval canals winding through the well-preserved old town.", image: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&q=80&w=800" },
            { name: "Ghent Old Town", city: "Ghent", country: "Belgium", description: "A vibrant medieval city with stunning architecture along the Graslei waterfront.", image: "https://images.unsplash.com/photo-1594827944447-bc0d5e94b40d?auto=format&fit=crop&q=80&w=800" },
            { name: "Atomium", city: "Brussels", country: "Belgium", description: "A unique building representing an iron crystal magnified 165 billion times.", image: "https://images.unsplash.com/photo-1551030006-3a9d1dbf6cd9?auto=format&fit=crop&q=80&w=800" },
            { name: "Antwerp Diamond District", city: "Antwerp", country: "Belgium", description: "The diamond capital of the world, home to some of the finest gem cutters.", image: "https://images.unsplash.com/photo-1595867818082-083862f3d630?auto=format&fit=crop&q=80&w=800" }
        ]
    },
    ireland: {
        name: "Ireland",
        slug: "ireland",
        description: "Rolling green hills, dramatic cliffs, and a uniquely welcoming Celtic culture.",
        heroImage: "https://images.unsplash.com/photo-1564959130747-897fb406b9af?q=80&w=2000&auto=format&fit=crop",
        tips: ["Drive on the left side", "Pack rain gear year-round", "Visit a traditional Irish pub"],
        destinations: [
            { name: "Cliffs of Moher", city: "County Clare", country: "Ireland", description: "Dramatic sea cliffs rising 214 meters above the Atlantic Ocean.", image: "https://images.unsplash.com/photo-1564959130747-897fb406b9af?auto=format&fit=crop&q=80&w=800" },
            { name: "Ring of Kerry", city: "County Kerry", country: "Ireland", description: "A scenic 179-km circular route through Ireland's most spectacular landscapes.", image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&q=80&w=800" },
            { name: "Temple Bar", city: "Dublin", country: "Ireland", description: "Dublin's most famous cultural quarter known for its lively pubs and music.", image: "https://images.unsplash.com/photo-1549918864-48ac978761a4?auto=format&fit=crop&q=80&w=800" },
            { name: "Giant's Causeway", city: "County Antrim", country: "Ireland", description: "An area of about 40,000 interlocking basalt columns formed by volcanic activity.", image: "https://images.unsplash.com/photo-1533154683220-86f13774eb98?auto=format&fit=crop&q=80&w=800" },
            { name: "Killarney National Park", city: "County Kerry", country: "Ireland", description: "Ireland's first national park with ancient oak woodlands and pristine lakes.", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800" }
        ]
    },
    iceland: {
        name: "Iceland",
        slug: "iceland",
        description: "A land of fire and ice featuring geysers, glaciers, and the elusive Northern Lights.",
        heroImage: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=2000&auto=format&fit=crop",
        tips: ["Book the Blue Lagoon in advance", "Rent a 4x4 for highlands", "Bring layers for all weather"],
        destinations: [
            { name: "Blue Lagoon", city: "Grindavík", country: "Iceland", description: "A world-famous geothermal spa with milky-blue mineral-rich water.", image: "https://images.unsplash.com/photo-1515861461613-1f3c1e5f5438?auto=format&fit=crop&q=80&w=800" },
            { name: "Golden Circle", city: "South Iceland", country: "Iceland", description: "A popular tourist route featuring Thingvellir, Geysir, and Gullfoss waterfall.", image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=800" },
            { name: "Jökulsárlón Glacier Lagoon", city: "Southeast Iceland", country: "Iceland", description: "A stunning glacial lake filled with floating icebergs near Vatnajökull glacier.", image: "https://images.unsplash.com/photo-1520769669658-f07657f5a307?auto=format&fit=crop&q=80&w=800" },
            { name: "Reynisfjara Black Beach", city: "Vík", country: "Iceland", description: "A dramatic black sand beach with towering basalt columns and crashing waves.", image: "https://images.unsplash.com/photo-1509005084666-3cbc75184cbb?auto=format&fit=crop&q=80&w=800" },
            { name: "Skógafoss", city: "South Iceland", country: "Iceland", description: "One of Iceland's largest waterfalls with a 60-meter drop and frequent rainbows.", image: "https://images.unsplash.com/photo-1490108653392-3290baf0e498?auto=format&fit=crop&q=80&w=800" }
        ]
    },
    denmark: {
        name: "Denmark",
        slug: "denmark",
        description: "Fairy-tale charm, modern gastronomy, and the quintessential concept of hygge.",
        heroImage: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=80&w=2000&auto=format&fit=crop",
        tips: ["Embrace hygge culture", "Rent a bike in Copenhagen", "Try smørrebrød open sandwiches"],
        destinations: [
            { name: "Nyhavn", city: "Copenhagen", country: "Denmark", description: "Copenhagen's iconic waterfront with colorful 17th-century townhouses and cafes.", image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&q=80&w=800" },
            { name: "Tivoli Gardens", city: "Copenhagen", country: "Denmark", description: "One of the world's oldest amusement parks with beautiful gardens and rides.", image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&q=80&w=800" },
            { name: "Kronborg Castle", city: "Helsingør", country: "Denmark", description: "The Renaissance castle that inspired Shakespeare's Hamlet.", image: "https://images.unsplash.com/photo-1564399263912-6cb4f6d4e98d?auto=format&fit=crop&q=80&w=800" },
            { name: "Skagen", city: "North Jutland", country: "Denmark", description: "Where the North Sea and Baltic Sea meet at Denmark's northernmost point.", image: "https://images.unsplash.com/photo-1610024063057-2bc107c99e29?auto=format&fit=crop&q=80&w=800" },
            { name: "The Little Mermaid", city: "Copenhagen", country: "Denmark", description: "The iconic bronze statue inspired by Hans Christian Andersen's fairy tale.", image: "https://images.unsplash.com/photo-1552560880-2482cef14240?auto=format&fit=crop&q=80&w=800" }
        ]
    },
    turkey: {
        name: "Turkey",
        slug: "turkey",
        description: "Where East meets West — breathtaking mosques, vibrant bazaars, and the balloons of Cappadocia.",
        heroImage: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2000&auto=format&fit=crop",
        tips: ["Bargain in bazaars", "Try Turkish breakfast", "Book balloon rides early in Cappadocia"],
        destinations: [
            { name: "Cappadocia", city: "Nevşehir", country: "Turkey", description: "Otherworldly fairy chimneys and famous hot air balloon flights at sunrise.", image: "https://images.unsplash.com/photo-1526856702-82a9b48a116f?auto=format&fit=crop&q=80&w=800" },
            { name: "Hagia Sophia", city: "Istanbul", country: "Turkey", description: "A monumental former cathedral and mosque, now a museum of Byzantine architecture.", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=800" },
            { name: "Pamukkale", city: "Denizli", country: "Turkey", description: "Terraces of white mineral-rich thermal waters cascading down a hillside.", image: "https://images.unsplash.com/photo-1600963451776-a67752858095?auto=format&fit=crop&q=80&w=800" },
            { name: "Ephesus", city: "Selçuk", country: "Turkey", description: "One of the best-preserved ancient Greek and Roman cities in the Mediterranean.", image: "https://images.unsplash.com/photo-1568885544-1cb4f900afab?auto=format&fit=crop&q=80&w=800" },
            { name: "Grand Bazaar", city: "Istanbul", country: "Turkey", description: "One of the largest and oldest covered markets in the world with over 4,000 shops.", image: "https://images.unsplash.com/photo-1558383331-f520f2888351?auto=format&fit=crop&q=80&w=800" }
        ]
    },
    south_korea: {
        name: "South Korea",
        slug: "south_korea",
        description: "Dynamic Seoul pop culture contrasting with tranquil mountains and historic palaces.",
        heroImage: "https://images.unsplash.com/photo-1601621915196-2621bfb0cd6e?q=80&w=2000&auto=format&fit=crop",
        tips: ["Try authentic Korean BBQ", "Use the metro T-money card", "Visit during cherry blossom season"],
        destinations: [
            { name: "Gyeongbokgung Palace", city: "Seoul", country: "South Korea", description: "The main royal palace of the Joseon dynasty, a masterpiece of Korean architecture.", image: "https://images.unsplash.com/photo-1601621915196-2621bfb0cd6e?auto=format&fit=crop&q=80&w=800" },
            { name: "Jeju Island", city: "Jeju", country: "South Korea", description: "A volcanic island with stunning lava tubes, waterfalls, and pristine beaches.", image: "https://images.unsplash.com/photo-1583167539236-49e18babc29c?auto=format&fit=crop&q=80&w=800" },
            { name: "Bukchon Hanok Village", city: "Seoul", country: "South Korea", description: "A traditional Korean village with hundreds of hanok houses from the Joseon dynasty.", image: "https://images.unsplash.com/photo-1570197785062-b810eb80d89d?auto=format&fit=crop&q=80&w=800" },
            { name: "Nami Island", city: "Chuncheon", country: "South Korea", description: "A half-moon shaped island famous for its lined tree paths and scenic beauty.", image: "https://images.unsplash.com/photo-1632412073072-8e02d20b4d48?auto=format&fit=crop&q=80&w=800" },
            { name: "DMZ", city: "Paju", country: "South Korea", description: "The demilitarized zone separating the two Koreas, a powerful historical landmark.", image: "https://images.unsplash.com/photo-1561414527-8d22be5d9703?auto=format&fit=crop&q=80&w=800" }
        ]
    },
    vietnam: {
        name: "Vietnam",
        slug: "vietnam",
        description: "Breathtaking karst landscapes, rich colonial history, and incredibly vibrant cuisine.",
        heroImage: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2000&auto=format&fit=crop",
        tips: ["Cross the street slowly and steadily", "Try pho for breakfast", "Haggle at local markets"],
        destinations: [
            { name: "Ha Long Bay", city: "Quảng Ninh", country: "Vietnam", description: "A UNESCO site with thousands of limestone karsts and islands rising from the sea.", image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800" },
            { name: "Hội An Ancient Town", city: "Hội An", country: "Vietnam", description: "A beautifully preserved ancient port city with lantern-lit streets and tailor shops.", image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=800" },
            { name: "Sapa Rice Terraces", city: "Lào Cai", country: "Vietnam", description: "Stunning carved rice paddies in the mountains near the Chinese border.", image: "https://images.unsplash.com/photo-1583925694399-e1cf09ad88e9?auto=format&fit=crop&q=80&w=800" },
            { name: "Cu Chi Tunnels", city: "Ho Chi Minh City", country: "Vietnam", description: "An immense network of underground tunnels used during the Vietnam War.", image: "https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&q=80&w=800" },
            { name: "Phong Nha Caves", city: "Quảng Bình", country: "Vietnam", description: "Home to the world's largest cave, Sơn Đoòng, and stunning underground rivers.", image: "https://images.unsplash.com/photo-1605275600451-97c7ab5cf3e9?auto=format&fit=crop&q=80&w=800" }
        ]
    },
    indonesia: {
        name: "Indonesia",
        slug: "indonesia",
        description: "Over 17,000 islands featuring the spiritual luxury of Bali and the wilderness of Komodo.",
        heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop",
        tips: ["Respect temple dress codes", "Try local warungs for authentic food", "Carry cash for small vendors"],
        destinations: [
            { name: "Ubud Rice Terraces", city: "Bali", country: "Indonesia", description: "Lush green terraced rice paddies in the cultural heart of Bali.", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800" },
            { name: "Komodo National Park", city: "East Nusa Tenggara", country: "Indonesia", description: "Home to the famous Komodo dragons and pristine diving sites.", image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=800" },
            { name: "Borobudur Temple", city: "Central Java", country: "Indonesia", description: "The world's largest Buddhist temple and a 9th-century Mahayana monument.", image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&q=80&w=800" },
            { name: "Raja Ampat", city: "West Papua", country: "Indonesia", description: "An archipelago with the richest marine biodiversity on Earth.", image: "https://images.unsplash.com/photo-1570789210756-720a25a997c1?auto=format&fit=crop&q=80&w=800" },
            { name: "Tanah Lot Temple", city: "Bali", country: "Indonesia", description: "An ancient Hindu shrine perched on top of an offshore rock formation.", image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=800" }
        ]
    },
    singapore: {
        name: "Singapore",
        slug: "singapore",
        description: "A futuristic garden city boasting incredible food, pristine streets, and luxury shopping.",
        heroImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2000&auto=format&fit=crop",
        tips: ["Chewing gum is banned", "Use the MRT for transport", "Visit hawker centres for amazing food"],
        destinations: [
            { name: "Marina Bay Sands", city: "Singapore", country: "Singapore", description: "An iconic integrated resort with a stunning rooftop infinity pool.", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800" },
            { name: "Gardens by the Bay", city: "Singapore", country: "Singapore", description: "A futuristic nature park with towering Supertree structures and cloud forests.", image: "https://images.unsplash.com/photo-1506351421178-63b52a2d2562?auto=format&fit=crop&q=80&w=800" },
            { name: "Sentosa Island", city: "Singapore", country: "Singapore", description: "A resort island with Universal Studios, pristine beaches, and luxury hotels.", image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&q=80&w=800" },
            { name: "Chinatown Heritage Centre", city: "Singapore", country: "Singapore", description: "A museum chronicling the lives of Chinatown's early Chinese immigrants.", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=800" },
            { name: "Orchard Road", city: "Singapore", country: "Singapore", description: "Singapore's premier shopping boulevard lined with luxury malls and boutiques.", image: "https://images.unsplash.com/photo-1576788903474-f21054dd8b05?auto=format&fit=crop&q=80&w=800" }
        ]
    },
    philippines: {
        name: "Philippines",
        slug: "philippines",
        description: "Crystal-clear waters, hidden lagoons, and some of the friendliest locals in the world.",
        heroImage: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=2000&auto=format&fit=crop",
        tips: ["Island hop between destinations", "Try lechon and adobo", "Learn basic Tagalog phrases"],
        destinations: [
            { name: "El Nido", city: "Palawan", country: "Philippines", description: "A paradise of limestone cliffs, crystal lagoons, and pristine coral reefs.", image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&q=80&w=800" },
            { name: "Chocolate Hills", city: "Bohol", country: "Philippines", description: "Over 1,200 perfectly cone-shaped hills that turn brown during the dry season.", image: "https://images.unsplash.com/photo-1555817128-342e1c8b3b24?auto=format&fit=crop&q=80&w=800" },
            { name: "Boracay White Beach", city: "Boracay", country: "Philippines", description: "A world-famous 4-km stretch of powdery white sand and crystal-clear waters.", image: "https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&q=80&w=800" },
            { name: "Banaue Rice Terraces", city: "Ifugao", country: "Philippines", description: "Ancient hand-carved rice terraces carved into the mountains 2,000 years ago.", image: "https://images.unsplash.com/photo-1583925694399-e1cf09ad88e9?auto=format&fit=crop&q=80&w=800" },
            { name: "Siargao Island", city: "Surigao del Norte", country: "Philippines", description: "The surfing capital of the Philippines with pristine mangroves and lagoons.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800" }
        ]
    },
    india: {
        name: "India",
        slug: "india",
        description: "A sensory explosion of colors, spices, palaces, and the majestic Taj Mahal.",
        heroImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2000&auto=format&fit=crop",
        tips: ["Dress modestly at temples", "Drink bottled water only", "Bargain at local markets"],
        destinations: [
            { name: "Taj Mahal", city: "Agra", country: "India", description: "An ivory-white marble mausoleum and one of the New Seven Wonders of the World.", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800" },
            { name: "Jaipur Pink City", city: "Rajasthan", country: "India", description: "A vibrant city known for its pink-hued buildings and majestic Hawa Mahal palace.", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=800" },
            { name: "Kerala Backwaters", city: "Kerala", country: "India", description: "A network of tranquil lagoons, canals, and lakes best explored by houseboat.", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800" },
            { name: "Varanasi Ghats", city: "Varanasi", country: "India", description: "The spiritual capital of India with ancient steps leading down to the sacred Ganges.", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=800" },
            { name: "Goa Beaches", city: "Goa", country: "India", description: "A former Portuguese colony famous for its golden beaches, nightlife, and architecture.", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800" }
        ]
    },
    maldives: {
        name: "Maldives",
        slug: "maldives",
        description: "The absolute pinnacle of overwater luxury resorts and exquisite turquoise lagoons.",
        heroImage: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2000&auto=format&fit=crop",
        tips: ["Book resorts well in advance", "Bring reef-safe sunscreen", "Respect Islamic culture on local islands"],
        destinations: [
            { name: "Malé Atoll", city: "Malé", country: "Maldives", description: "The capital atoll with colorful buildings, fish markets, and the Islamic Centre.", image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80&w=800" },
            { name: "Baa Atoll", city: "Baa", country: "Maldives", description: "A UNESCO Biosphere Reserve famous for manta ray gatherings in Hanifaru Bay.", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800" },
            { name: "Vaadhoo Bioluminescent Beach", city: "Raa Atoll", country: "Maldives", description: "A magical beach that glows blue at night due to bioluminescent phytoplankton.", image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=800" },
            { name: "Ari Atoll", city: "Ari", country: "Maldives", description: "One of the best diving destinations in the world with whale shark sightings.", image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&q=80&w=800" },
            { name: "Maafushi Island", city: "Kaafu", country: "Maldives", description: "A local island offering an authentic Maldivian experience at affordable prices.", image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=800" }
        ]
    },
    australia: {
        name: "Australia",
        slug: "australia",
        description: "The rugged Outback, the iconic Sydney Opera House, and the spectacular Great Barrier Reef.",
        heroImage: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=2000&auto=format&fit=crop",
        tips: ["Wear sunscreen at all times", "Watch out for wildlife", "Drive on the left side"],
        destinations: [
            { name: "Sydney Opera House", city: "Sydney", country: "Australia", description: "An architectural masterpiece and UNESCO World Heritage Site on Sydney Harbour.", image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800" },
            { name: "Great Barrier Reef", city: "Queensland", country: "Australia", description: "The world's largest coral reef system visible from outer space.", image: "https://images.unsplash.com/photo-1587139223877-04cb899fa3e8?auto=format&fit=crop&q=80&w=800" },
            { name: "Uluru", city: "Northern Territory", country: "Australia", description: "A massive sandstone monolith sacred to Indigenous Australians.", image: "https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?auto=format&fit=crop&q=80&w=800" },
            { name: "Great Ocean Road", city: "Victoria", country: "Australia", description: "A scenic coastal drive featuring the Twelve Apostles rock formations.", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=800" },
            { name: "Bondi Beach", city: "Sydney", country: "Australia", description: "Australia's most famous beach, a hub for surfing, swimming, and coastal walks.", image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&q=80&w=800" }
        ]
    },
    canada: {
        name: "Canada",
        slug: "canada",
        description: "Breathtaking Rocky Mountains, cosmopolitan cities, and vast untouched wilderness.",
        heroImage: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2000&auto=format&fit=crop",
        tips: ["Carry layers for mountain weather", "Be bear aware in national parks", "Try poutine in Quebec"],
        destinations: [
            { name: "Banff National Park", city: "Alberta", country: "Canada", description: "Canada's oldest national park with turquoise lakes and towering Rocky Mountain peaks.", image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80&w=800" },
            { name: "Niagara Falls", city: "Ontario", country: "Canada", description: "One of the most powerful waterfalls in the world straddling the US-Canada border.", image: "https://images.unsplash.com/photo-1489447068241-b3490214e879?auto=format&fit=crop&q=80&w=800" },
            { name: "Old Montreal", city: "Montreal", country: "Canada", description: "A historic neighborhood with cobblestone streets and stunning 17th-century architecture.", image: "https://images.unsplash.com/photo-1559582930-56da2c6110bb?auto=format&fit=crop&q=80&w=800" },
            { name: "Lake Louise", city: "Alberta", country: "Canada", description: "A glacier-fed lake known for its stunning turquoise color surrounded by peaks.", image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=800" },
            { name: "Vancouver", city: "British Columbia", country: "Canada", description: "A bustling west coast city surrounded by mountains, ocean, and temperate rainforest.", image: "https://images.unsplash.com/photo-1559511260-66a68e7e3764?auto=format&fit=crop&q=80&w=800" }
        ]
    },
    costa_rica: {
        name: "Costa Rica",
        slug: "costa_rica",
        description: "The ultimate eco-tourism destination with lush rainforests, volcanoes, and incredible wildlife.",
        heroImage: "https://images.unsplash.com/photo-1568402102990-bc541580b59f?q=80&w=2000&auto=format&fit=crop",
        tips: ["Learn 'Pura Vida'", "Book eco-lodges early", "Carry rain gear in green season"],
        destinations: [
            { name: "Arenal Volcano", city: "La Fortuna", country: "Costa Rica", description: "An active volcano surrounded by hot springs, waterfalls, and lush rainforest.", image: "https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&q=80&w=800" },
            { name: "Monteverde Cloud Forest", city: "Puntarenas", country: "Costa Rica", description: "A mystical cloud forest reserve home to an extraordinary variety of wildlife.", image: "https://images.unsplash.com/photo-1597999153498-8ce881e01f5d?auto=format&fit=crop&q=80&w=800" },
            { name: "Manuel Antonio", city: "Puntarenas", country: "Costa Rica", description: "A stunning national park combining pristine beaches with tropical wildlife.", image: "https://images.unsplash.com/photo-1518259102261-b40117eabbc5?auto=format&fit=crop&q=80&w=800" },
            { name: "Tortuguero", city: "Limón", country: "Costa Rica", description: "A remote national park accessible only by boat, famous for sea turtle nesting.", image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&q=80&w=800" },
            { name: "Nicoya Peninsula", city: "Guanacaste", country: "Costa Rica", description: "A Blue Zone peninsula known for beautiful beaches and the longevity of its residents.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800" }
        ]
    },
    egypt: {
        name: "Egypt",
        slug: "egypt",
        description: "The cradle of civilization, featuring the Pyramids of Giza and luxurious Nile river cruises.",
        heroImage: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=2000&auto=format&fit=crop",
        tips: ["Dress conservatively", "Stay hydrated in the desert heat", "Book a licensed Egyptologist guide"],
        destinations: [
            { name: "Pyramids of Giza", city: "Cairo", country: "Egypt", description: "The last surviving ancient wonder of the world and Egypt's most iconic landmark.", image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=800" },
            { name: "Valley of the Kings", city: "Luxor", country: "Egypt", description: "A valley containing the elaborate tombs of pharaohs including Tutankhamun.", image: "https://images.unsplash.com/photo-1568322445389-f64e1e0e59c7?auto=format&fit=crop&q=80&w=800" },
            { name: "Karnak Temple", city: "Luxor", country: "Egypt", description: "A vast ancient temple complex and the largest religious building ever constructed.", image: "https://images.unsplash.com/photo-1609609830354-8f615e20e564?auto=format&fit=crop&q=80&w=800" },
            { name: "Abu Simbel", city: "Aswan", country: "Egypt", description: "Two massive rock-cut temples built by Ramesses II near the Sudanese border.", image: "https://images.unsplash.com/photo-1565966424621-f98a4a23a70c?auto=format&fit=crop&q=80&w=800" },
            { name: "Nile River Cruise", city: "Aswan to Luxor", country: "Egypt", description: "A luxury cruise along the world's longest river passing ancient temples and villages.", image: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?auto=format&fit=crop&q=80&w=800" }
        ]
    },
    malaysia: {
        name: "Malaysia",
        slug: "malaysia",
        description: "A melting pot of cultures featuring the Petronas Towers and pristine Bornean rainforests.",
        heroImage: "https://images.unsplash.com/photo-1588931322123-9345cc9688bd?q=80&w=2000&auto=format&fit=crop",
        tips: ["Remove shoes before entering homes", "Try street food in Penang", "Respect mosque visiting hours"],
        destinations: [
            { name: "Petronas Twin Towers", city: "Kuala Lumpur", country: "Malaysia", description: "The world's tallest twin towers and Malaysia's most iconic landmark.", image: "https://images.unsplash.com/photo-1588931322123-9345cc9688bd?auto=format&fit=crop&q=80&w=800" },
            { name: "George Town", city: "Penang", country: "Malaysia", description: "A UNESCO World Heritage Site famous for street art and incredible food.", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80&w=800" },
            { name: "Langkawi", city: "Kedah", country: "Malaysia", description: "An archipelago of 99 islands known for beaches, mangroves, and duty-free shopping.", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=800" },
            { name: "Batu Caves", city: "Selangor", country: "Malaysia", description: "A limestone hill with a series of caves and Hindu temples near Kuala Lumpur.", image: "https://images.unsplash.com/photo-1600367163359-d51d40bcb5f5?auto=format&fit=crop&q=80&w=800" },
            { name: "Borneo Rainforest", city: "Sabah", country: "Malaysia", description: "One of the oldest rainforests in the world, home to orangutans and pygmy elephants.", image: "https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?auto=format&fit=crop&q=80&w=800" }
        ]
    }`;

// Read and inject
const closingBracket = content.lastIndexOf('};');
if (closingBracket !== -1) {
    const before = content.slice(0, closingBracket);
    const after = content.slice(closingBracket);
    
    // Check if we need a comma after the last entry
    const trimmedBefore = before.trimEnd();
    const needsComma = !trimmedBefore.endsWith(',');
    
    content = trimmedBefore + (needsComma ? ',' : '') + '\n' + missingCountries + '\n' + after;
}

fs.writeFileSync('lib/countryData.ts', content);
console.log('SUCCESS: Added 21 missing countries and fixed key mismatches!');
