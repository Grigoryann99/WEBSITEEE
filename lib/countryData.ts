export interface Destination {
    name: string;
    city: string;
    country: string;
    description: string;
    image: string;
}

export interface CountryData {
    name: string;
    slug: string;
    description: string;
    heroImage: string;
    tips: string[];
    destinations: Destination[];
}

export const countries: Record<string, CountryData> = {
    france: {
        name: "France",
        slug: "france",
        description: "Experience the romance, culture, and unmatched culinary excellence of France.",
        heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2000&auto=format&fit=crop",
        tips: ["Learn basic French phrases", "Book Louvre tickets in advance", "Try local boulangeries"],
        destinations: [
            {
                name: "Eiffel Tower",
                city: "Paris",
                country: "France",
                description: "The iconic iron lattice tower on the Champ de Mars, a global symbol of France.",
                image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Louvre Museum",
                city: "Paris",
                country: "France",
                description: "The world's largest art museum and a historic monument in Paris.",
                image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Mont Saint-Michel",
                city: "Normandy",
                country: "France",
                description: "A tidal island and mainland commune topped by a gravity-defying medieval monastery.",
                image: "https://images.unsplash.com/photo-1506103135970-e69c73e3bd61?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Château de Versailles",
                city: "Versailles",
                country: "France",
                description: "The principal royal residence of France and a marvel of French Baroque architecture.",
                image: "https://images.unsplash.com/photo-1563264627-aba9ff98a39e?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "French Riviera",
                city: "Nice",
                country: "France",
                description: "The Mediterranean coastline of the southeast corner of France, known for luxury.",
                image: "https://images.unsplash.com/photo-1533575770077-0520b7ba401db?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    italy: {
        name: "Italy",
        slug: "italy",
        description: "Discover ancient ruins, masterpiece art, and world-renowned gastronomy.",
        heroImage: "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=2000&auto=format&fit=crop",
        tips: ["Carry cash for small cafes", "Validate your train tickets", "Dinner is usually late"],
        destinations: [
            {
                name: "Colosseum",
                city: "Rome",
                country: "Italy",
                description: "An oval amphitheater in the center of Rome, the largest ancient amphitheater ever built.",
                image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Grand Canal",
                city: "Venice",
                country: "Italy",
                description: "The main waterway of Venice, lined with Renaissance and Gothic palaces.",
                image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Duomo di Firenze",
                city: "Florence",
                country: "Italy",
                description: "Florence's cathedral, known for its red-tiled dome engineered by Brunelleschi.",
                image: "https://images.unsplash.com/photo-1543429776-3507119fdbfa?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Cinque Terre",
                city: "Liguria",
                country: "Italy",
                description: "A string of centuries-old seaside villages on the rugged Italian Riviera coastline.",
                image: "https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Amalfi Coast",
                city: "Campania",
                country: "Italy",
                description: "A 50-kilometer stretch of coastline featuring sheer cliffs and pastel-colored villages.",
                image: "https://images.unsplash.com/photo-1533676802871-ca3d41029c46?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    japan: {
        name: "Japan",
        slug: "japan",
        description: "A unique blend of ancient traditions and futuristic innovation.",
        heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000&auto=format&fit=crop",
        tips: ["Buy a JR Pass before arriving", "Have Google Translate ready", "Respect local etiquette on trains"],
        destinations: [
            {
                name: "Mount Fuji",
                city: "Honshu",
                country: "Japan",
                description: "An active volcano and Japan's tallest peak, known for its scenic beauty.",
                image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Fushimi Inari Taisha",
                city: "Kyoto",
                country: "Japan",
                description: "An important Shinto shrine famous for its thousands of vermilion torii gates.",
                image: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Shibuya Crossing",
                city: "Tokyo",
                country: "Japan",
                description: "The world's busiest pedestrian crossing, surrounded by neon signs.",
                image: "https://images.unsplash.com/photo-1542051812871-34f40f0c0b7d?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Kinkaku-ji",
                city: "Kyoto",
                country: "Japan",
                description: "A Zen Buddhist temple whose top two floors are completely covered in gold leaf.",
                image: "https://images.unsplash.com/photo-1563821016-86c8f6ea49a3?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Hiroshima Peace Memorial",
                city: "Hiroshima",
                country: "Japan",
                description: "A stark reminder of the devastating effects of war and a symbol of peace.",
                image: "https://images.unsplash.com/photo-1626084666014-ba3676c12ba3?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    usa: {
        name: "USA",
        slug: "usa",
        description: "Explore diverse landscapes from soaring mountains to iconic mega-cities.",
        heroImage: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2000&auto=format&fit=crop",
        tips: ["Remember to tip 15-20%", "Distances are huge, plan travel accordingly", "Prices shown often exclude tax"],
        destinations: [
            {
                name: "Grand Canyon",
                city: "Arizona",
                country: "USA",
                description: "A steep-sided canyon carved by the Colorado River, a natural wonder of the world.",
                image: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Statue of Liberty",
                city: "New York",
                country: "USA",
                description: "A colossal copper statue given as a gift from France to the United States.",
                image: "https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Yellowstone",
                city: "Wyoming",
                country: "USA",
                description: "A sprawling national park known for wildlife and geothermal features like Old Faithful.",
                image: "https://images.unsplash.com/photo-1510410427958-452109bc4aa8?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Golden Gate Bridge",
                city: "San Francisco",
                country: "USA",
                description: "A world-famous suspension bridge spanning the Golden Gate strait.",
                image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Las Vegas Strip",
                city: "Las Vegas",
                country: "USA",
                description: "A stretch of South Las Vegas Boulevard known for its concentration of resort hotels and casinos.",
                image: "https://images.unsplash.com/photo-1605805561570-8b1c1cde8a8c?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    spain: {
        name: "Spain",
        slug: "spain",
        description: "Vibrant culture, beautiful beaches, and profound architectural wonders.",
        heroImage: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=2000&auto=format&fit=crop",
        tips: ["Embrace the siesta time", "Tapas are mostly eaten standing up", "Dinner starts very late"],
        destinations: [
            {
                name: "Sagrada Familia",
                city: "Barcelona",
                country: "Spain",
                description: "A large unfinished Roman Catholic minor basilica architected by Antoni Gaudí.",
                image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Alhambra",
                city: "Granada",
                country: "Spain",
                description: "A palace and fortress complex that showcases breathtaking Moorish architecture.",
                image: "https://images.unsplash.com/photo-1563220412-fc90fd0bd4eb?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Park Güell",
                city: "Barcelona",
                country: "Spain",
                description: "A public park system composed of gardens and architectonic elements located on Carmel Hill.",
                image: "https://images.unsplash.com/photo-1564619445103-ba9c0e5a643c?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Prado Museum",
                city: "Madrid",
                country: "Spain",
                description: "The main Spanish national art museum, widely considered to have one of the world's finest collections.",
                image: "https://images.unsplash.com/photo-1549487779-79a61e38d7c4?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Ibiza",
                city: "Balearic Islands",
                country: "Spain",
                description: "An island in the Mediterranean Sea well known for its lively nightlife and stunning coves.",
                image: "https://images.unsplash.com/photo-1564507592228-5645b206aa7c?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    greece: {
        name: "Greece",
        slug: "greece",
        description: "The cradle of Western civilization with idyllic islands and ancient mythology.",
        heroImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2000&auto=format&fit=crop",
        tips: ["Island hopping requires planning", "Try the street food (Souvlaki)", "Sun protection is essential"],
        destinations: [
            {
                name: "Acropolis of Athens",
                city: "Athens",
                country: "Greece",
                description: "An ancient citadel located on a rocky outcrop containing the remains of several historically significant buildings.",
                image: "https://images.unsplash.com/photo-1555993539-1732fc44e3f3?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Santorini",
                city: "Cyclades",
                country: "Greece",
                description: "Famous for its dramatic views, stunning sunsets from Oia town, and active volcano.",
                image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5f6?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Mykonos",
                city: "Cyclades",
                country: "Greece",
                description: "An island known for its cosmopolitan summer party atmosphere.",
                image: "https://images.unsplash.com/photo-1601581874834-3b6065645e07?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Meteora",
                city: "Kalabaka",
                country: "Greece",
                description: "Monasteries built on immense natural pillars and hill-like rounded boulders.",
                image: "https://images.unsplash.com/photo-1604085429815-bfa76ba292b3?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Delphi",
                city: "Phocis",
                country: "Greece",
                description: "An ancient sanctuary that grew rich as the seat of the oracle that was consulted on important decisions.",
                image: "https://images.unsplash.com/photo-1627931320392-7f83ad7f0cd6?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    uae: {
        name: "UAE",
        slug: "uae",
        description: "A luxury oasis combining ultramodern aesthetics with deep Bedouin roots.",
        heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop",
        tips: ["Dress modestly in public areas", "Weekends are Friday-Saturday", "Use the efficient Dubai Metro"],
        destinations: [
            {
                name: "Burj Khalifa",
                city: "Dubai",
                country: "UAE",
                description: "The tallest structure and building in the world since its topping out in 2009.",
                image: "https://images.unsplash.com/photo-1546412414-8035e1776c9a?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Sheikh Zayed Mosque",
                city: "Abu Dhabi",
                country: "UAE",
                description: "The largest mosque in the country and a key place of worship for Friday gathering.",
                image: "https://images.unsplash.com/photo-1588693899144-8d9e29ccae6b?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Palm Jumeirah",
                city: "Dubai",
                country: "UAE",
                description: "An artificial archipelago resembling a palm tree covered in luxury resorts.",
                image: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Louvre Abu Dhabi",
                city: "Abu Dhabi",
                country: "UAE",
                description: "An art and civilization museum establishing a dialogue between different cultures.",
                image: "https://images.unsplash.com/photo-1644930678602-53ecbdd2fe84?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Burj Al Arab",
                city: "Dubai",
                country: "UAE",
                description: "A luxury hotel celebrated as one of the most iconic symbols of Dubai.",
                image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    brazil: {
        name: "Brazil",
        slug: "brazil",
        description: "Breathtaking natural beauty meets a vibrant, colorful, and rhythmic culture.",
        heroImage: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2000&auto=format&fit=crop",
        tips: ["Learn basic Portuguese words", "Be mindful of personal belongings", "Use ridesharing apps"],
        destinations: [
            {
                name: "Christ the Redeemer",
                city: "Rio de Janeiro",
                country: "Brazil",
                description: "An Art Deco statue of Jesus Christ created by French sculptor Paul Landowski.",
                image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Iguazu Falls",
                city: "Foz do Iguaçu",
                country: "Brazil",
                description: "Waterfalls of the Iguazu River on the border of the Argentine province of Misiones and the Brazilian state of Paraná.",
                image: "https://images.unsplash.com/photo-1522854961914-dfba769ea8d8?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Copacabana Beach",
                city: "Rio de Janeiro",
                country: "Brazil",
                description: "One of the most famous and most beautiful beaches in the world.",
                image: "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Amazon Rainforest",
                city: "Manaus",
                country: "Brazil",
                description: "A moist broadleaf tropical rainforest in the Amazon biome that covers most of the Amazon basin.",
                image: "https://images.unsplash.com/photo-1518182170546-076616fd46fa?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Sugarloaf Mountain",
                city: "Rio de Janeiro",
                country: "Brazil",
                description: "A peak situated in Rio de Janeiro, Brazil, at the mouth of Guanabara Bay.",
                image: "https://images.unsplash.com/photo-1485640321153-2ceaf8053a41?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    thailand: {
        name: "Thailand",
        slug: "thailand",
        description: "The land of smiles offering golden temples, pristine beaches, and unforgettable cuisine.",
        heroImage: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2000&auto=format&fit=crop",
        tips: ["Respect the monarchy and temples", "Negotiate before getting in a Tuk Tuk", "Street food is highly recommended"],
        destinations: [
            {
                name: "Grand Palace",
                city: "Bangkok",
                country: "Thailand",
                description: "A complex of buildings at the heart of Bangkok, the official residence of the Kings of Siam.",
                image: "https://images.unsplash.com/photo-1580228122315-8167f08c3384?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Phi Phi Islands",
                city: "Krabi",
                country: "Thailand",
                description: "An island group largely featured in movies, known for pristine waters and limestone cliffs.",
                image: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Wat Phra That Doi Suthep",
                city: "Chiang Mai",
                country: "Thailand",
                description: "A revered Theravada Buddhist temple overlooking the city of Chiang Mai.",
                image: "https://images.unsplash.com/photo-1550953830-ec02b2de0a96?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Ayutthaya",
                city: "Ayutthaya",
                country: "Thailand",
                description: "The historic city of Ayutthaya was the second capital of the Siamese Kingdom.",
                image: "https://images.unsplash.com/photo-1542152643-d34eab8b5e94?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Railay Beach",
                city: "Krabi",
                country: "Thailand",
                description: "A small peninsula reachable only by boat due to high limestone cliffs cutting off mainland access.",
                image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    united_kingdom: {
        name: "United Kingdom",
        slug: "united_kingdom",
        description: "Rich history, iconic royals, sprawling countrysides and cosmopolitan cities.",
        heroImage: "https://images.unsplash.com/photo-1513635269975-5969336ac1cb?q=80&w=2000&auto=format&fit=crop",
        tips: ["Stand on the right on escalators", "Always carry an umbrella", "Understand the pub culture"],
        destinations: [
            {
                name: "Big Ben",
                city: "London",
                country: "United Kingdom",
                description: "The Great Bell of the striking clock at the north end of the Palace of Westminster.",
                image: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Stonehenge",
                city: "Wiltshire",
                country: "United Kingdom",
                description: "A prehistoric monument consisting of a ring of standing stones.",
                image: "https://images.unsplash.com/photo-1599833975787-5c143f373c30?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Edinburgh Castle",
                city: "Edinburgh",
                country: "United Kingdom",
                description: "A historic castle which dominates the skyline of the city of Edinburgh from its position on the Castle Rock.",
                image: "https://images.unsplash.com/photo-1558551649-e44c8f992010?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Tower of London",
                city: "London",
                country: "United Kingdom",
                description: "A historic castle on the north bank of the River Thames in central London.",
                image: "https://images.unsplash.com/photo-1526132596055-eee49e7099c5?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Roman Baths",
                city: "Bath",
                country: "United Kingdom",
                description: "Well-preserved thermae in the city of Bath, Somerset.",
                image: "https://images.unsplash.com/photo-1702823196219-b1cbf5f14fde?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    norway: {
        name: "Norway",
        slug: "norway",
        description: "Dramatic fjords, the Northern Lights, and pristine Arctic landscapes await.",
        heroImage: "https://images.unsplash.com/photo-1504233529578-6d46baba6d34?q=80&w=2000&auto=format&fit=crop",
        tips: ["Embrace the 'friluftsliv' outdoor lifestyle", "Book fjord cruises in advance", "Pack layers for unpredictable weather"],
        destinations: [
            {
                name: "Geirangerfjord",
                city: "Geiranger",
                country: "Norway",
                description: "A UNESCO-listed fjord famous for its stunning natural beauty and cascading waterfalls.",
                image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Northern Lights",
                city: "Tromsø",
                country: "Norway",
                description: "The aurora borealis dancing across the Arctic sky in one of the world's best viewing spots.",
                image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Bryggen Wharf",
                city: "Bergen",
                country: "Norway",
                description: "A UNESCO World Heritage Site featuring colourful wooden houses along the old wharf.",
                image: "https://images.unsplash.com/photo-1555993539-1732fc44e3f3?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Preikestolen",
                city: "Stavanger",
                country: "Norway",
                description: "A massive cliff rising 604 metres above the Lysefjord, offering breathtaking views.",
                image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d2?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Lofoten Islands",
                city: "Lofoten",
                country: "Norway",
                description: "An archipelago with dramatic peaks, calm fjords, and traditional red fishing cabins.",
                image: "https://images.unsplash.com/photo-1520769945061-0a448c463865?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    sweden: {
        name: "Sweden",
        slug: "sweden",
        description: "Scandinavian design, enchanted forests, and a thriving cultural scene.",
        heroImage: "https://images.unsplash.com/photo-1509356843151-3e7d96a77d11?q=80&w=2000&auto=format&fit=crop",
        tips: ["Embrace 'fika' (coffee & cake breaks)", "Public transport is excellent", "Tap water is safe and delicious"],
        destinations: [
            {
                name: "Gamla Stan",
                city: "Stockholm",
                country: "Sweden",
                description: "Stockholm's old town with cobblestone streets, medieval buildings, and royal palace.",
                image: "https://images.unsplash.com/photo-1509356843151-3e7d96a77d11?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "ABBA Museum",
                city: "Stockholm",
                country: "Sweden",
                description: "An interactive museum dedicated to the legendary pop group ABBA on Djurgården island.",
                image: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Vasa Museum",
                city: "Stockholm",
                country: "Sweden",
                description: "Home to the only preserved 17th-century warship in the world, the Vasa.",
                image: "https://images.unsplash.com/photo-1531219432768-9f540ce91ef3?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Gothenburg Archipelago",
                city: "Gothenburg",
                country: "Sweden",
                description: "Thousands of islands perfect for kayaking, cycling, and enjoying Swedish seafood.",
                image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d2?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Ice Hotel",
                city: "Jukkasjärvi",
                country: "Sweden",
                description: "The world's first ice hotel, rebuilt each winter with unique art suites and ice sculptures.",
                image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    finland: {
        name: "Finland",
        slug: "finland",
        description: "Land of a thousand lakes, saunas, and the magical Arctic wilderness.",
        heroImage: "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?q=80&w=2000&auto=format&fit=crop",
        tips: ["Sauna etiquette is important – clothing optional", "Silence is a sign of respect", "Try salmiakki (salty liquorice)"],
        destinations: [
            {
                name: "Helsinki Cathedral",
                city: "Helsinki",
                country: "Finland",
                description: "A striking neoclassical cathedral dominating the Senate Square in the capital.",
                image: "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Santa Claus Village",
                city: "Rovaniemi",
                country: "Finland",
                description: "The official hometown of Santa Claus on the Arctic Circle, open year-round.",
                image: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Lakeland",
                city: "Savonlinna",
                country: "Finland",
                description: "One of Europe's largest lake districts with over 180,000 lakes surrounded by forests.",
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Nuuksio National Park",
                city: "Espoo",
                country: "Finland",
                description: "A pristine wilderness close to Helsinki, perfect for hiking and wildlife watching.",
                image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Suomenlinna Sea Fortress",
                city: "Helsinki",
                country: "Finland",
                description: "A UNESCO-listed sea fortress built on an archipelago, now a vibrant island community.",
                image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    poland: {
        name: "Poland",
        slug: "poland",
        description: "A land of medieval castles, stunning old towns, and rich cultural heritage.",
        heroImage: "https://images.unsplash.com/photo-1540835237482-cb9ca281c01f?q=80&w=2000&auto=format&fit=crop",
        tips: ["Polish zloty is the currency, not Euro", "Try pierogi and bigos", "Tipping ~10% is appreciated"],
        destinations: [
            {
                name: "Wawel Castle",
                city: "Kraków",
                country: "Poland",
                description: "A fortified architectural complex in Kraków that served as the residence of Polish kings.",
                image: "https://images.unsplash.com/photo-1540835237482-cb9ca281c01f?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Auschwitz-Birkenau",
                city: "Oświęcim",
                country: "Poland",
                description: "A sobering UNESCO World Heritage Site and reminder of the Holocaust's atrocities.",
                image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Warsaw Old Town",
                city: "Warsaw",
                country: "Poland",
                description: "The historic center of Warsaw, meticulously rebuilt after WWII destruction, now a UNESCO site.",
                image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Wieliczka Salt Mine",
                city: "Wieliczka",
                country: "Poland",
                description: "A UNESCO-listed mine with stunning underground chapels, lakes, and sculptures carved from salt.",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Białowieża Forest",
                city: "Białowieża",
                country: "Poland",
                description: "Europe's last primeval forest, home to the continent's largest population of European bison.",
                image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    czech_republic: {
        name: "Czech Republic",
        slug: "czech_republic",
        description: "Fairy-tale castles, bohemian culture, and the golden city of Prague.",
        heroImage: "https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=2000&auto=format&fit=crop",
        tips: ["Carry small change for tipping", "Prague is very walkable", "Try trdelník and svíčková"],
        destinations: [
            {
                name: "Prague Castle",
                city: "Prague",
                country: "Czech Republic",
                description: "The largest ancient castle in the world, dominating the city's skyline.",
                image: "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Charles Bridge",
                city: "Prague",
                country: "Czech Republic",
                description: "A historic 14th-century bridge adorned with Baroque statues spanning the Vltava River.",
                image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Old Town Square",
                city: "Prague",
                country: "Czech Republic",
                description: "A vibrant square with the famous Astronomical Clock and Gothic Týn Church.",
                image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Český Krumlov Castle",
                city: "Český Krumlov",
                country: "Czech Republic",
                description: "A UNESCO-listed castle complex in a stunning medieval town surrounded by the Vltava River.",
                image: "https://images.unsplash.com/photo-1558618047-f4e90b4ee24a?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Karlovy Vary",
                city: "Karlovy Vary",
                country: "Czech Republic",
                description: "A famous spa town known for its hot springs, colonnades, and film festival.",
                image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    hungary: {
        name: "Hungary",
        slug: "hungary",
        description: "Budapest's thermal baths, grand architecture, and rich Hungarian culture.",
        heroImage: "https://images.unsplash.com/photo-1551867633-194f125bddfa?q=80&w=2000&auto=format&fit=crop",
        tips: ["Try the thermal baths (Széchenyi is the most famous)", "Forint is the currency", "Tokaji wine is a must-try"],
        destinations: [
            {
                name: "Hungarian Parliament",
                city: "Budapest",
                country: "Hungary",
                description: "One of Europe's oldest legislative buildings, a Neo-Gothic masterpiece on the Danube.",
                image: "https://images.unsplash.com/photo-1551867633-194f125bddfa?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Buda Castle",
                city: "Budapest",
                country: "Hungary",
                description: "A UNESCO-listed royal palace complex above the Danube with panoramic views over Pest.",
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Széchenyi Thermal Bath",
                city: "Budapest",
                country: "Hungary",
                description: "The largest medicinal bath in Europe, a stunning Neo-Baroque complex with outdoor pools.",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Fisherman's Bastion",
                city: "Budapest",
                country: "Hungary",
                description: "A Neo-Romanesque terrace on the Buda side offering the best views of the city.",
                image: "https://images.unsplash.com/photo-1559588501-f9adbdc4f8c0?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Lake Balaton",
                city: "Siófok",
                country: "Hungary",
                description: "Central Europe's largest lake, known as the Hungarian Sea, perfect for summer holidays.",
                image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    qatar: {
        name: "Qatar",
        slug: "qatar",
        description: "A futuristic Gulf state blending ultramodern skylines with ancient desert traditions.",
        heroImage: "https://images.unsplash.com/photo-1572705655951-9c9e2f8f1b4c?q=80&w=2000&auto=format&fit=crop",
        tips: ["Dress modestly in public", "Alcohol is available in licensed venues", "Visit the souqs for authentic culture"],
        destinations: [
            {
                name: "Museum of Islamic Art",
                city: "Doha",
                country: "Qatar",
                description: "A stunning I. M. Pei-designed museum showcasing 1,400 years of Islamic art.",
                image: "https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Souq Waqif",
                city: "Doha",
                country: "Qatar",
                description: "A traditional market offering spices, handicrafts, and authentic Qatari culture.",
                image: "https://images.unsplash.com/photo-1539437829697-1b4ed5aebd86?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "The Pearl-Qatar",
                city: "Doha",
                country: "Qatar",
                description: "An artificial island with luxury residences, yacht marinas, and world-class dining.",
                image: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Katara Cultural Village",
                city: "Doha",
                country: "Qatar",
                description: "A cultural complex featuring theaters, galleries, and traditional Qatari architecture.",
                image: "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Inland Sea (Khor Al Adaid)",
                city: "Al Wakrah",
                country: "Qatar",
                description: "A UNESCO-recognized natural reserve where the sea meets the desert in spectacular fashion.",
                image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    jordan: {
        name: "Jordan",
        slug: "jordan",
        description: "An ancient land of rose-red cities, desert wonders, and extraordinary hospitality.",
        heroImage: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2000&auto=format&fit=crop",
        tips: ["Jordan Pass saves on visa and entrance fees", "Wadi Rum is best at sunrise or sunset", "Bargaining is expected in markets"],
        destinations: [
            {
                name: "Petra",
                city: "Ma'an Governorate",
                country: "Jordan",
                description: "The iconic rose-red city carved into sandstone cliffs, a UNESCO Wonder of the World.",
                image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Wadi Rum",
                city: "Aqaba",
                country: "Jordan",
                description: "A protected desert wilderness with dramatic red sand dunes and ancient rock inscriptions.",
                image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Dead Sea",
                city: "Madaba",
                country: "Jordan",
                description: "The lowest point on Earth, where the extreme salt concentration allows effortless floating.",
                image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Jerash Ruins",
                city: "Jerash",
                country: "Jordan",
                description: "One of the best-preserved Roman provincial cities in the world, with colonnaded streets.",
                image: "https://images.unsplash.com/photo-1555993539-1732fc44e3f3?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Aqaba",
                city: "Aqaba",
                country: "Jordan",
                description: "Jordan's only coastal city on the Red Sea, a paradise for divers with vibrant coral reefs.",
                image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    malaysia: {
        name: "Malaysia",
        slug: "malaysia",
        description: "Tropical rainforests, diverse cultures, and iconic skyscrapers define this vibrant nation.",
        heroImage: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2000&auto=format&fit=crop",
        tips: ["Bring mosquito repellent for jungle trips", "Remove shoes when entering temples/homes", "Ringgit is the currency"],
        destinations: [
            {
                name: "Petronas Twin Towers",
                city: "Kuala Lumpur",
                country: "Malaysia",
                description: "The world's tallest twin towers, an iconic symbol of Malaysia's modern ambition.",
                image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Batu Caves",
                city: "Gombak",
                country: "Malaysia",
                description: "A series of limestone caves housing colourful Hindu temples and a golden Lord Murugan statue.",
                image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d2?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Langkawi",
                city: "Langkawi",
                country: "Malaysia",
                description: "An archipelago of 99 islands with stunning beaches, mangroves, and duty-free shopping.",
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Borneo Rainforest",
                city: "Kota Kinabalu",
                country: "Malaysia",
                description: "One of the world's oldest rainforests, home to orangutans, pygmy elephants, and proboscis monkeys.",
                image: "https://images.unsplash.com/photo-1518182170546-076616fd46fa?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "George Town",
                city: "Penang",
                country: "Malaysia",
                description: "A UNESCO-listed city famous for its street art, heritage architecture, and incredible food scene.",
                image: "https://images.unsplash.com/photo-1513635269975-5969336ac1cb?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    sri_lanka: {
        name: "Sri Lanka",
        slug: "sri_lanka",
        description: "The Pearl of the Indian Ocean, blessed with temples, tea, and pristine beaches.",
        heroImage: "https://images.unsplash.com/photo-1505856291099-4e1d3ea3cdb6?q=80&w=2000&auto=format&fit=crop",
        tips: ["Hire a tuk-tuk for short trips", "Respect temple dress codes", "Try Ceylon tea at its source"],
        destinations: [
            {
                name: "Sigiriya Rock Fortress",
                city: "Sigiriya",
                country: "Sri Lanka",
                description: "A 5th-century rock fortress rising 200m above the surrounding jungle, a UNESCO site.",
                image: "https://images.unsplash.com/photo-1505856291099-4e1d3ea3cdb6?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Temple of the Tooth",
                city: "Kandy",
                country: "Sri Lanka",
                description: "Sri Lanka's most sacred Buddhist temple housing the relic of the Buddha's tooth.",
                image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Ella",
                city: "Ella",
                country: "Sri Lanka",
                description: "A hill country gem with stunning viewpoints, tea plantations, and the famous Nine Arch Bridge.",
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Unawatuna Beach",
                city: "Galle",
                country: "Sri Lanka",
                description: "One of the world's best beaches, with a crescent bay, coral reefs, and beach restaurants.",
                image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Yala National Park",
                city: "Yala",
                country: "Sri Lanka",
                description: "Sri Lanka's most visited park with the world's highest density of leopards and diverse wildlife.",
                image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    new_zealand: {
        name: "New Zealand",
        slug: "new_zealand",
        description: "Middle Earth awaits with majestic fjords, Māori culture, and adventure sports.",
        heroImage: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=2000&auto=format&fit=crop",
        tips: ["Drive on the left side of the road", "Book huts on popular Tramping trails early", "Respect Māori customs and marae"],
        destinations: [
            {
                name: "Milford Sound",
                city: "Fiordland",
                country: "New Zealand",
                description: "Often called the Eighth Wonder of the World, this fjord features towering peaks and cascading waterfalls.",
                image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Queenstown",
                city: "Queenstown",
                country: "New Zealand",
                description: "The adventure capital of the world, set against the Remarkables mountain range.",
                image: "https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Tongariro Alpine Crossing",
                city: "Tongariro",
                country: "New Zealand",
                description: "One of the world's great day walks through volcanic landscapes past emerald lakes.",
                image: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Bay of Islands",
                city: "Paihia",
                country: "New Zealand",
                description: "A subtropical paradise with 144 islands, great for sailing, dolphin encounters, and diving.",
                image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Rotorua",
                city: "Rotorua",
                country: "New Zealand",
                description: "A geothermal wonderland with bubbling mud pools, geysers, and rich Māori culture.",
                image: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    mexico: {
        name: "Mexico",
        slug: "mexico",
        description: "Ancient Mayan ruins, vibrant beaches, and a rich tapestry of culture and cuisine.",
        heroImage: "https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=2000&auto=format&fit=crop",
        tips: ["Don't drink tap water", "Try authentic tacos from street stalls", "Bargain at local markets"],
        destinations: [
            {
                name: "Chichen Itza",
                city: "Yucatán",
                country: "Mexico",
                description: "A UNESCO Wonder of the World – the pre-Columbian Mayan city dominated by the El Castillo pyramid.",
                image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Cenotes of Yucatán",
                city: "Yucatán",
                country: "Mexico",
                description: "Natural sinkholes filled with crystal-clear waters, sacred to the ancient Maya people.",
                image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Mexico City Historic Centre",
                city: "Mexico City",
                country: "Mexico",
                description: "A UNESCO-listed historic center with Aztec ruins, colonial architecture, and vibrant street life.",
                image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Palenque",
                city: "Chiapas",
                country: "Mexico",
                description: "One of the finest examples of Maya art and architecture, set in a lush tropical jungle.",
                image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Tulum",
                city: "Quintana Roo",
                country: "Mexico",
                description: "Clifftop Mayan ruins overlooking turquoise Caribbean waters and white sandy beaches.",
                image: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    argentina: {
        name: "Argentina",
        slug: "argentina",
        description: "From Patagonian glaciers to the sultry streets of Buenos Aires, a land of passion.",
        heroImage: "https://images.unsplash.com/photo-1545386575-78c5a0a50553?q=80&w=2000&auto=format&fit=crop",
        tips: ["Learn some tango steps before visiting", "Dinner is served after 9 PM", "Steak is a must – try an asado"],
        destinations: [
            {
                name: "Perito Moreno Glacier",
                city: "El Calafate",
                country: "Argentina",
                description: "One of the world's few advancing glaciers, a UNESCO site in Los Glaciares National Park.",
                image: "https://images.unsplash.com/photo-1545386575-78c5a0a50553?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Iguazu Falls",
                city: "Puerto Iguazú",
                country: "Argentina",
                description: "Wider than Niagara and more powerful than Victoria, these waterfalls are truly awe-inspiring.",
                image: "https://images.unsplash.com/photo-1522854961914-dfba769ea8d8?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Buenos Aires",
                city: "Buenos Aires",
                country: "Argentina",
                description: "The 'Paris of South America', famed for tango, steak, and rich European-influenced architecture.",
                image: "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Torres del Paine",
                city: "Magallanes",
                country: "Argentina",
                description: "A national park featuring the dramatic Paine Massif and stunning Patagonian wilderness.",
                image: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Mendoza Wine Region",
                city: "Mendoza",
                country: "Argentina",
                description: "The heart of Argentina's wine country set against the backdrop of the Andes Mountains.",
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    chile: {
        name: "Chile",
        slug: "chile",
        description: "A sliver of land stretching from the driest desert to the end of the world.",
        heroImage: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000&auto=format&fit=crop",
        tips: ["Chile is very long – domestic flights save time", "Try empanadas and pisco sours", "The currency is Chilean peso"],
        destinations: [
            {
                name: "Easter Island",
                city: "Hanga Roa",
                country: "Chile",
                description: "Home to the mysterious moai statues, colossal figures carved by the Rapa Nui people.",
                image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Atacama Desert",
                city: "San Pedro de Atacama",
                country: "Chile",
                description: "The driest non-polar desert on Earth, with otherworldly landscapes like Moon Valley.",
                image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Torres del Paine",
                city: "Magallanes",
                country: "Chile",
                description: "Iconic granite towers piercing the Patagonian sky above ancient glaciers and turquoise lakes.",
                image: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Valparaíso",
                city: "Valparaíso",
                country: "Chile",
                description: "A bohemian port city with colourful hillside homes, street art, and a vibrant cultural scene.",
                image: "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Chiloé Archipelago",
                city: "Castro",
                country: "Chile",
                description: "A mystical island group with palafito stilt houses, UNESCO-listed wooden churches, and penguins.",
                image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    peru: {
        name: "Peru",
        slug: "peru",
        description: "Land of the Incas, from the highlands of Machu Picchu to the depths of the Amazon.",
        heroImage: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2000&auto=format&fit=crop",
        tips: ["Acclimatise to altitude in Cusco before Machu Picchu", "Try ceviche and lomo saltado", "Boots are essential for Inca Trail"],
        destinations: [
            {
                name: "Machu Picchu",
                city: "Cusco",
                country: "Peru",
                description: "The legendary Inca citadel set high in the Andes Mountains, a Wonder of the World.",
                image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Cusco",
                city: "Cusco",
                country: "Peru",
                description: "The historic capital of the Inca Empire, featuring dazzling colonial architecture over Inca foundations.",
                image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Lake Titicaca",
                city: "Puno",
                country: "Peru",
                description: "The world's highest navigable lake, home to the floating Uros reed islands.",
                image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Nazca Lines",
                city: "Nazca",
                country: "Peru",
                description: "Giant ancient geoglyphs etched into the desert, best seen from a small aircraft.",
                image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Amazon Rainforest",
                city: "Iquitos",
                country: "Peru",
                description: "A remote Amazon city accessible only by air or river, gateway to pristine jungle adventures.",
                image: "https://images.unsplash.com/photo-1518182170546-076616fd46fa?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    colombia: {
        name: "Colombia",
        slug: "colombia",
        description: "A vibrant nation of flowers, salsa dancing, emeralds, and Caribbean coastlines.",
        heroImage: "https://images.unsplash.com/photo-1558618047-f4e90b4ee24a?q=80&w=2000&auto=format&fit=crop",
        tips: ["Use Uber in major cities for safety", "Coffee tours in the Coffee Region are unmissable", "Learn a few salsa moves"],
        destinations: [
            {
                name: "Cartagena Old City",
                city: "Cartagena",
                country: "Colombia",
                description: "A UNESCO-listed walled city with colourful colonial buildings, cobblestone streets, and bougainvillea.",
                image: "https://images.unsplash.com/photo-1558618047-f4e90b4ee24a?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Medellín",
                city: "Medellín",
                country: "Colombia",
                description: "A city of innovation and culture, transformed into a global model of urban renewal.",
                image: "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Coffee Region (Eje Cafetero)",
                city: "Salento",
                country: "Colombia",
                description: "Rolling green hills covered in coffee farms, UNESCO-listed and culturally unique.",
                image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Tayrona National Park",
                city: "Santa Marta",
                country: "Colombia",
                description: "A stunning park where the Sierra Nevada mountains meet the Caribbean coast.",
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Bogotá",
                city: "Bogotá",
                country: "Colombia",
                description: "The vibrant capital with world-class museums, street art, and the historic La Candelaria district.",
                image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    panama: {
        name: "Panama",
        slug: "panama",
        description: "Where the Americas meet – a crossroads of cultures, oceans, and incredible biodiversity.",
        heroImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop",
        tips: ["The US dollar is used alongside the balboa", "The Panama Canal is a must-see", "Pack light clothes for the tropical heat"],
        destinations: [
            {
                name: "Panama Canal",
                city: "Colón",
                country: "Panama",
                description: "One of the world's greatest engineering feats, connecting the Atlantic and Pacific oceans.",
                image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Casco Viejo",
                city: "Panama City",
                country: "Panama",
                description: "A UNESCO-listed historic district with colonial buildings and a lively café and restaurant scene.",
                image: "https://images.unsplash.com/photo-1558618047-f4e90b4ee24a?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Bocas del Toro",
                city: "Bocas del Toro",
                country: "Panama",
                description: "An island archipelago with crystal-clear waters, dolphin watching, and world-class surfing.",
                image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Barro Colorado Island",
                city: "Gatún Lake",
                country: "Panama",
                description: "A biological reserve in the Panama Canal Zone, one of the most studied tropical forests on Earth.",
                image: "https://images.unsplash.com/photo-1518182170546-076616fd46fa?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Pearl Islands",
                city: "Archipelago de las Perlas",
                country: "Panama",
                description: "A stunning archipelago of over 200 islands with pristine beaches and abundant marine life.",
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    south_africa: {
        name: "South Africa",
        slug: "south_africa",
        description: "The Rainbow Nation, offering safari adventures, stunning coastlines, and vibrant cities.",
        heroImage: "https://images.unsplash.com/photo-1516026672322-bc52d61a9c8c?q=80&w=2000&auto=format&fit=crop",
        tips: ["Rent a car for the Garden Route", "Book safari lodges far in advance", "Be vigilant about personal belongings in cities"],
        destinations: [
            {
                name: "Table Mountain",
                city: "Cape Town",
                country: "South Africa",
                description: "A flat-topped mountain overlooking Cape Town, one of South Africa's most iconic landmarks.",
                image: "https://images.unsplash.com/photo-1516026672322-bc52d61a9c8c?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Kruger National Park",
                city: "Mpumalanga",
                country: "South Africa",
                description: "One of Africa's greatest wildlife reserves, home to the Big Five and extraordinary biodiversity.",
                image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Cape Peninsula",
                city: "Cape Town",
                country: "South Africa",
                description: "A dramatic peninsula with the Cape of Good Hope, penguin colonies at Boulders Beach.",
                image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Garden Route",
                city: "George",
                country: "South Africa",
                description: "A scenic stretch of South Africa's southeastern coast with forests, lagoons, and beaches.",
                image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Robben Island",
                city: "Cape Town",
                country: "South Africa",
                description: "A UNESCO site and former prison island where Nelson Mandela was held for 18 years.",
                image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    morocco: {
        name: "Morocco",
        slug: "morocco",
        description: "A magical gateway to Africa, blending Berber culture, ancient medinas, and Saharan dunes.",
        heroImage: "https://images.unsplash.com/photo-1539020140153-e479b8e0c1c4?q=80&w=2000&auto=format&fit=crop",
        tips: ["Dress modestly, especially in medinas", "Bargaining is expected in souqs", "Try mint tea and tagine"],
        destinations: [
            {
                name: "Marrakech Medina",
                city: "Marrakech",
                country: "Morocco",
                description: "A UNESCO-listed maze of souqs, riads, and vibrant Jemaa el-Fna square of snake charmers.",
                image: "https://images.unsplash.com/photo-1539020140153-e479b8e0c1c4?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Sahara Desert (Erg Chebbi)",
                city: "Merzouga",
                country: "Morocco",
                description: "Magnificent orange sand dunes reaching 150 metres, best experienced on a camel at sunset.",
                image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Chefchaouen",
                city: "Chefchaouen",
                country: "Morocco",
                description: "The enchanting Blue City, with its powder-blue-washed medina nestled in the Rif Mountains.",
                image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Fes el-Bali",
                city: "Fes",
                country: "Morocco",
                description: "The world's largest car-free urban area and one of the best-preserved medieval cities.",
                image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Aït Benhaddou",
                city: "Ouarzazate",
                country: "Morocco",
                description: "A UNESCO-listed earthen clay ksar and striking film location for Game of Thrones and Gladiator.",
                image: "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?auto=format&fit=crop&q=80&w=800"
            }
        ]
    }
};
