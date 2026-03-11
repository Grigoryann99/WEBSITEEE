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
                image: "https://images.unsplash.com/photo-1596394723269-e1e8c8383a8e?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Château de Versailles",
                city: "Versailles",
                country: "France",
                description: "The principal royal residence of France and a marvel of French Baroque architecture.",
                image: "https://images.unsplash.com/photo-1551410224-699683e15636?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "French Riviera",
                city: "Nice",
                country: "France",
                description: "The Mediterranean coastline of the southeast corner of France, known for luxury.",
                image: "https://images.unsplash.com/photo-1533575770077-052fa2c609fc?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Duomo di Firenze",
                city: "Florence",
                country: "Italy",
                description: "Florence's cathedral, known for its red-tiled dome engineered by Brunelleschi.",
                image: "https://images.unsplash.com/photo-1541370976299-4d24ebbc9077?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Cinque Terre",
                city: "Liguria",
                country: "Italy",
                description: "A string of centuries-old seaside villages on the rugged Italian Riviera coastline.",
                image: "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Amalfi Coast",
                city: "Campania",
                country: "Italy",
                description: "A 50-kilometer stretch of coastline featuring sheer cliffs and pastel-colored villages.",
                image: "https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1571842013180-205167660233?auto=format&fit=crop&q=80&w=800"
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
    united_states: {
        name: "USA",
        slug: "united_states",
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
                image: "https://images.unsplash.com/photo-1591206369811-4eeb2f03bc95?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Park Güell",
                city: "Barcelona",
                country: "Spain",
                description: "A public park system composed of gardens and architectonic elements located on Carmel Hill.",
                image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1534005111307-e836171881a5?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Mykonos",
                city: "Cyclades",
                country: "Greece",
                description: "An island known for its cosmopolitan summer party atmosphere.",
                image: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Meteora",
                city: "Kalabaka",
                country: "Greece",
                description: "Monasteries built on immense natural pillars and hill-like rounded boulders.",
                image: "https://images.unsplash.com/photo-1516489370617-e2fe9abcb71b?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Delphi",
                city: "Phocis",
                country: "Greece",
                description: "An ancient sanctuary that grew rich as the seat of the oracle that was consulted on important decisions.",
                image: "https://images.unsplash.com/photo-1608730973680-81f0f568d2e3?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    united_arab_emirates: {
        name: "UAE",
        slug: "united_arab_emirates",
        description: "A luxury oasis combining ultramodern aesthetics with deep Bedouin roots.",
        heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop",
        tips: ["Dress modestly in public areas", "Weekends are Friday-Saturday", "Use the efficient Dubai Metro"],
        destinations: [
            {
                name: "Burj Khalifa",
                city: "Dubai",
                country: "UAE",
                description: "The tallest structure and building in the world since its topping out in 2009.",
                image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Louvre Abu Dhabi",
                city: "Abu Dhabi",
                country: "UAE",
                description: "An art and civilization museum establishing a dialogue between different cultures.",
                image: "https://images.unsplash.com/photo-1552834371-3375bce34360?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1595115166304-453664d603a1?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Copacabana Beach",
                city: "Rio de Janeiro",
                country: "Brazil",
                description: "One of the most famous and most beautiful beaches in the world.",
                image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Amazon Rainforest",
                city: "Manaus",
                country: "Brazil",
                description: "A moist broadleaf tropical rainforest in the Amazon biome that covers most of the Amazon basin.",
                image: "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Phi Phi Islands",
                city: "Krabi",
                country: "Thailand",
                description: "An island group largely featured in movies, known for pristine waters and limestone cliffs.",
                image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1548678957-31bab8f5228c?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1485689532776-7d0e tried3bd7?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Edinburgh Castle",
                city: "Edinburgh",
                country: "United Kingdom",
                description: "A historic castle which dominates the skyline of the city of Edinburgh from its position on the Castle Rock.",
                image: "https://images.unsplash.com/photo-1577000206091-45dba7023d22?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Tower of London",
                city: "London",
                country: "United Kingdom",
                description: "A historic castle on the north bank of the River Thames in central London.",
                image: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Roman Baths",
                city: "Bath",
                country: "United Kingdom",
                description: "Well-preserved thermae in the city of Bath, Somerset.",
                image: "https://images.unsplash.com/photo-1580129392468-c68c3ed3e16c?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1562177257-dbb47ddd9d92?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Lofoten Islands",
                city: "Lofoten",
                country: "Norway",
                description: "An archipelago with dramatic peaks, calm fjords, and traditional red fishing cabins.",
                image: "https://images.unsplash.com/photo-1520180072364-5b2e28650722?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1572698495515-de5c6025b2a4?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1536721107434-6b1a85a20ab1?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1607427293702-036933bbf746?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Wieliczka Salt Mine",
                city: "Wieliczka",
                country: "Poland",
                description: "A UNESCO-listed mine with stunning underground chapels, lakes, and sculptures carved from salt.",
                image: "https://images.unsplash.com/photo-1569431511475-e52013a69d4e?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1541343672885-9be56236302a?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Buda Castle",
                city: "Budapest",
                country: "Hungary",
                description: "A UNESCO-listed royal palace complex above the Danube with panoramic views over Pest.",
                image: "https://images.unsplash.com/photo-1549218299-ab82a7efd81c?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Széchenyi Thermal Bath",
                city: "Budapest",
                country: "Hungary",
                description: "The largest medicinal bath in Europe, a stunning Neo-Baroque complex with outdoor pools.",
                image: "https://images.unsplash.com/photo-1551867633-194f1f517682?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Fisherman's Bastion",
                city: "Budapest",
                country: "Hungary",
                description: "A Neo-Romanesque terrace on the Buda side offering the best views of the city.",
                image: "https://images.unsplash.com/photo-1565426873118-a17ed65d74b9?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1578330101861-197c31d9999c?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Souq Waqif",
                city: "Doha",
                country: "Qatar",
                description: "A traditional market offering spices, handicrafts, and authentic Qatari culture.",
                image: "https://images.unsplash.com/photo-1578913171703-46461a1ef837?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "The Pearl-Qatar",
                city: "Doha",
                country: "Qatar",
                description: "An artificial island with luxury residences, yacht marinas, and world-class dining.",
                image: "https://images.unsplash.com/photo-1647252262017-582a7dbb73d0?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Katara Cultural Village",
                city: "Doha",
                country: "Qatar",
                description: "A cultural complex featuring theaters, galleries, and traditional Qatari architecture.",
                image: "https://images.unsplash.com/photo-1634547474026-8051642fb376?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1501233345909-17369106823c?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Wadi Rum",
                city: "Aqaba",
                country: "Jordan",
                description: "A protected desert wilderness with dramatic red sand dunes and ancient rock inscriptions.",
                image: "https://images.unsplash.com/photo-1582236479702-8240596cdcc7?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Dead Sea",
                city: "Madaba",
                country: "Jordan",
                description: "The lowest point on Earth, where the extreme salt concentration allows effortless floating.",
                image: "https://images.unsplash.com/photo-1544971587-b842c27f8e14?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Jerash Ruins",
                city: "Jerash",
                country: "Jordan",
                description: "One of the best-preserved Roman provincial cities in the world, with colonnaded streets.",
                image: "https://images.unsplash.com/photo-1551821437-0570b5a93901?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1551524164-687a55ea1110?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Batu Caves",
                city: "Gombak",
                country: "Malaysia",
                description: "A series of limestone caves housing colourful Hindu temples and a golden Lord Murugan statue.",
                image: "https://images.unsplash.com/photo-1600367163359-d51d40bcb5f5?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Langkawi",
                city: "Langkawi",
                country: "Malaysia",
                description: "An archipelago of 99 islands with stunning beaches, mangroves, and duty-free shopping.",
                image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Borneo Rainforest",
                city: "Kota Kinabalu",
                country: "Malaysia",
                description: "One of the world's oldest rainforests, home to orangutans, pygmy elephants, and proboscis monkeys.",
                image: "https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "George Town",
                city: "Penang",
                country: "Malaysia",
                description: "A UNESCO-listed city famous for its street art, heritage architecture, and incredible food scene.",
                image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1581023067645-03704381e469?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1581023067645-03704381e469?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1614749292331-9252796695b2?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Iguazu Falls",
                city: "Puerto Iguazú",
                country: "Argentina",
                description: "Wider than Niagara and more powerful than Victoria, these waterfalls are truly awe-inspiring.",
                image: "https://images.unsplash.com/photo-1595115166304-453664d603a1?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1517400508447-f8dd518b86db?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Atacama Desert",
                city: "San Pedro de Atacama",
                country: "Chile",
                description: "The driest non-polar desert on Earth, with otherworldly landscapes like Moon Valley.",
                image: "https://images.unsplash.com/photo-1510253687831-0f982d7862fc?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Torres del Paine",
                city: "Magallanes",
                country: "Chile",
                description: "Iconic granite towers piercing the Patagonian sky above ancient glaciers and turquoise lakes.",
                image: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Nazca Lines",
                city: "Nazca",
                country: "Peru",
                description: "Giant ancient geoglyphs etched into the desert, best seen from a small aircraft.",
                image: "https://images.unsplash.com/photo-1555529323-c6ec6ec6ec6e?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Amazon Rainforest",
                city: "Iquitos",
                country: "Peru",
                description: "A remote Amazon city accessible only by air or river, gateway to pristine jungle adventures.",
                image: "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1650900426337-0f7c0e0f86ea?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1650900426337-0f7c0e0f86ea?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1582236479702-8240596cdcc7?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1505312917212-9db5bde78aff?auto=format&fit=crop&q=80&w=800"
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
                image: "https://images.unsplash.com/photo-1548171120-f5a60a7ad9a6?auto=format&fit=crop&q=80&w=800"
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
    },

    portugal: {
        name: "Portugal",
        slug: "portugal",
        description: "Dramatic coastlines, historic Lisbon streets, and the golden vineyards of the Douro Valley.",
        heroImage: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=2000&auto=format&fit=crop",
        tips: ["Try pastéis de nata in Lisbon", "Visit Sintra palaces early morning", "Explore the Algarve region"],
        destinations: [
            {
                name: "Tower of Belém",
                city: "Lisbon",
                country: "Portugal",
                description: "A 16th-century fortified tower marking Portugal's Age of Discovery on the Tagus riverbank.",
                image: "https://images.unsplash.com/photo-1548707309-dcebeab426c8?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Pena Palace",
                city: "Sintra",
                country: "Portugal",
                description: "A colorful Romanticist castle atop the Sintra hills, a UNESCO World Heritage Site.",
                image: "https://images.unsplash.com/photo-1609941698821-c9800769b614?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Douro Valley",
                city: "Porto",
                country: "Portugal",
                description: "Portugal's premier wine region with terraced vineyards along the winding Douro River.",
                image: "https://images.unsplash.com/photo-1569959220744-ff553533f492?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Algarve Coast",
                city: "Faro",
                country: "Portugal",
                description: "Stunning limestone cliffs, hidden sea caves, and Europe's most beautiful beaches.",
                image: "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Ribeira District",
                city: "Porto",
                country: "Portugal",
                description: "A medieval riverside neighborhood and UNESCO heritage site in the heart of Porto.",
                image: "https://images.unsplash.com/photo-1549648830-6c0ef5a520e8?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    austria: {
        name: "Austria",
        slug: "austria",
        description: "Imperial palaces, classical music heritage, and stunning Tyrolean landscapes.",
        heroImage: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=2000&auto=format&fit=crop",
        tips: ["Learn to greet with 'Grüß Gott'", "Book opera tickets in advance", "Try Wiener Schnitzel"],
        destinations: [
            {
                name: "Schönbrunn Palace",
                city: "Vienna",
                country: "Austria",
                description: "The former imperial summer residence and one of Europe's most impressive Baroque palaces.",
                image: "https://images.unsplash.com/photo-1609856878074-cf31e21ccb6b?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Hallstatt",
                city: "Upper Austria",
                country: "Austria",
                description: "A fairy-tale lakeside village nestled between towering Alps and a serene lake.",
                image: "https://images.unsplash.com/photo-1617882825986-05f0f1c62aa2?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Innsbruck",
                city: "Tyrol",
                country: "Austria",
                description: "A stunning Alpine city combining imperial architecture with world-class skiing.",
                image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Salzburg Old Town",
                city: "Salzburg",
                country: "Austria",
                description: "The birthplace of Mozart, a beautifully preserved Baroque city and UNESCO heritage site.",
                image: "https://images.unsplash.com/photo-1609949279531-cf48d64bed89?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Wachau Valley",
                city: "Lower Austria",
                country: "Austria",
                description: "A scenic stretch of the Danube Valley famous for wine terraces and medieval ruins.",
                image: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    germany: {
        name: "Germany",
        slug: "germany",
        description: "Fairytale castles in Bavaria to the cutting-edge creative energy of modern Berlin.",
        heroImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2000&auto=format&fit=crop",
        tips: ["Most shops close on Sundays", "Many places are cash-only", "Try the local bakeries for bread"],
        destinations: [
            {
                name: "Brandenburg Gate",
                city: "Berlin",
                country: "Germany",
                description: "An iconic 18th-century neoclassical monument symbolizing Germany's reunification.",
                image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Neuschwanstein Castle",
                city: "Bavaria",
                country: "Germany",
                description: "A fairy-tale castle perched on a rugged hill above Hohenschwangau village.",
                image: "https://images.unsplash.com/photo-1534313314376-a72289b6181e?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Black Forest",
                city: "Baden-Württemberg",
                country: "Germany",
                description: "A densely wooded mountainous region famous for cuckoo clocks and cherry cake.",
                image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Cologne Cathedral",
                city: "Cologne",
                country: "Germany",
                description: "A monumental Gothic cathedral that took over 600 years to complete.",
                image: "https://images.unsplash.com/photo-1587989703498-8df7a1cf0f97?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Rhine Valley",
                city: "Rhineland",
                country: "Germany",
                description: "A romantic stretch of the Rhine River dotted with medieval castles and vineyards.",
                image: "https://images.unsplash.com/photo-1556449895-a33c9dba9040?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    netherlands: {
        name: "Netherlands",
        slug: "netherlands",
        description: "Iconic canals, fields of tulips, and a progressive, bicycle-driven culture.",
        heroImage: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=2000&auto=format&fit=crop",
        tips: ["Rent a bicycle in Amsterdam", "Visit Keukenhof in spring", "Try fresh stroopwafels"],
        destinations: [
            {
                name: "Canal Ring",
                city: "Amsterdam",
                country: "Netherlands",
                description: "A UNESCO-listed network of 17th-century canals at the heart of Amsterdam.",
                image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5f76?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Keukenhof Gardens",
                city: "Lisse",
                country: "Netherlands",
                description: "The world's largest flower garden, bursting with millions of tulips every spring.",
                image: "https://images.unsplash.com/photo-1589994160839-163cd867cfe8?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Rijksmuseum",
                city: "Amsterdam",
                country: "Netherlands",
                description: "The national museum of the Netherlands housing masterpieces by Rembrandt and Vermeer.",
                image: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Kinderdijk Windmills",
                city: "South Holland",
                country: "Netherlands",
                description: "A collection of 19 iconic Dutch windmills, a UNESCO World Heritage Site.",
                image: "https://images.unsplash.com/photo-1605101100278-5d1deb2b6498?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "The Hague",
                city: "South Holland",
                country: "Netherlands",
                description: "The seat of Dutch government with grand palaces and the famous Mauritshuis museum.",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    belgium: {
        name: "Belgium",
        slug: "belgium",
        description: "Medieval towns, extraordinary chocolate, and the historic charm of Bruges and Brussels.",
        heroImage: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?q=80&w=2000&auto=format&fit=crop",
        tips: ["Try Belgian waffles and frites", "Visit chocolate shops in Brussels", "Explore Bruges by boat"],
        destinations: [
            {
                name: "Grand Place",
                city: "Brussels",
                country: "Belgium",
                description: "Brussels' central square surrounded by ornate 17th-century guildhalls.",
                image: "https://images.unsplash.com/photo-1559113202-c916b8e44373?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Bruges Canals",
                city: "Bruges",
                country: "Belgium",
                description: "Picturesque medieval canals winding through the well-preserved old town.",
                image: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Ghent Old Town",
                city: "Ghent",
                country: "Belgium",
                description: "A vibrant medieval city with stunning architecture along the Graslei waterfront.",
                image: "https://images.unsplash.com/photo-1594827944447-bc0d5e94b40d?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Atomium",
                city: "Brussels",
                country: "Belgium",
                description: "A unique building representing an iron crystal magnified 165 billion times.",
                image: "https://images.unsplash.com/photo-1559113202-c916b8e44373?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Antwerp Diamond District",
                city: "Antwerp",
                country: "Belgium",
                description: "The diamond capital of the world, home to some of the finest gem cutters.",
                image: "https://images.unsplash.com/photo-1595867818082-083862f3d630?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    ireland: {
        name: "Ireland",
        slug: "ireland",
        description: "Rolling green hills, dramatic cliffs, and a uniquely welcoming Celtic culture.",
        heroImage: "https://images.unsplash.com/photo-1564959130747-897fb406b9af?q=80&w=2000&auto=format&fit=crop",
        tips: ["Drive on the left side", "Pack rain gear year-round", "Visit a traditional Irish pub"],
        destinations: [
            {
                name: "Cliffs of Moher",
                city: "County Clare",
                country: "Ireland",
                description: "Dramatic sea cliffs rising 214 meters above the Atlantic Ocean.",
                image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Ring of Kerry",
                city: "County Kerry",
                country: "Ireland",
                description: "A scenic 179-km circular route through Ireland's most spectacular landscapes.",
                image: "https://images.unsplash.com/photo-1564959130747-897fb406b9af?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Temple Bar",
                city: "Dublin",
                country: "Ireland",
                description: "Dublin's most famous cultural quarter known for its lively pubs and music.",
                image: "https://images.unsplash.com/photo-1549918864-48ac978761a4?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Giant's Causeway",
                city: "County Antrim",
                country: "Ireland",
                description: "An area of about 40,000 interlocking basalt columns formed by volcanic activity.",
                image: "https://images.unsplash.com/photo-1533154683220-86f13774eb98?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Killarney National Park",
                city: "County Kerry",
                country: "Ireland",
                description: "Ireland's first national park with ancient oak woodlands and pristine lakes.",
                image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    iceland: {
        name: "Iceland",
        slug: "iceland",
        description: "A land of fire and ice featuring geysers, glaciers, and the elusive Northern Lights.",
        heroImage: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=2000&auto=format&fit=crop",
        tips: ["Book the Blue Lagoon in advance", "Rent a 4x4 for highlands", "Bring layers for all weather"],
        destinations: [
            {
                name: "Blue Lagoon",
                city: "Grindavík",
                country: "Iceland",
                description: "A world-famous geothermal spa with milky-blue mineral-rich water.",
                image: "https://images.unsplash.com/photo-1515861461613-1f3c1e5f5438?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Golden Circle",
                city: "South Iceland",
                country: "Iceland",
                description: "A popular tourist route featuring Thingvellir, Geysir, and Gullfoss waterfall.",
                image: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Jökulsárlón Glacier Lagoon",
                city: "Southeast Iceland",
                country: "Iceland",
                description: "A stunning glacial lake filled with floating icebergs near Vatnajökull glacier.",
                image: "https://images.unsplash.com/photo-1520769669658-f07657f5a307?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Reynisfjara Black Beach",
                city: "Vík",
                country: "Iceland",
                description: "A dramatic black sand beach with towering basalt columns and crashing waves.",
                image: "https://images.unsplash.com/photo-1509005084666-3cbc75184cbb?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Skógafoss",
                city: "South Iceland",
                country: "Iceland",
                description: "One of Iceland's largest waterfalls with a 60-meter drop and frequent rainbows.",
                image: "https://images.unsplash.com/photo-1490108651768-c09c5bbc0cee?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    denmark: {
        name: "Denmark",
        slug: "denmark",
        description: "Fairy-tale charm, modern gastronomy, and the quintessential concept of hygge.",
        heroImage: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=80&w=2000&auto=format&fit=crop",
        tips: ["Embrace hygge culture", "Rent a bike in Copenhagen", "Try smørrebrød open sandwiches"],
        destinations: [
            {
                name: "Nyhavn",
                city: "Copenhagen",
                country: "Denmark",
                description: "Copenhagen's iconic waterfront with colorful 17th-century townhouses and cafes.",
                image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Tivoli Gardens",
                city: "Copenhagen",
                country: "Denmark",
                description: "One of the world's oldest amusement parks with beautiful gardens and rides.",
                image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Kronborg Castle",
                city: "Helsingør",
                country: "Denmark",
                description: "The Renaissance castle that inspired Shakespeare's Hamlet.",
                image: "https://images.unsplash.com/photo-1564399263912-6cb4f6d4e98d?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Skagen",
                city: "North Jutland",
                country: "Denmark",
                description: "Where the North Sea and Baltic Sea meet at Denmark's northernmost point.",
                image: "https://images.unsplash.com/photo-1610024063057-2bc107c99e29?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "The Little Mermaid",
                city: "Copenhagen",
                country: "Denmark",
                description: "The iconic bronze statue inspired by Hans Christian Andersen's fairy tale.",
                image: "https://images.unsplash.com/photo-1552560880-2482cef14240?auto=format&fit=crop&q=80&w=800"
            }
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
            {
                name: "Gyeongbokgung Palace",
                city: "Seoul",
                country: "South Korea",
                description: "The main royal palace of the Joseon dynasty, a masterpiece of Korean architecture.",
                image: "https://images.unsplash.com/photo-1538669715516-b238117f1d2c?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Jeju Island",
                city: "Jeju",
                country: "South Korea",
                description: "A volcanic island with stunning lava tubes, waterfalls, and pristine beaches.",
                image: "https://images.unsplash.com/photo-1583167539236-49e18babc29c?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Bukchon Hanok Village",
                city: "Seoul",
                country: "South Korea",
                description: "A traditional Korean village with hundreds of hanok houses from the Joseon dynasty.",
                image: "https://images.unsplash.com/photo-1570197785062-b810eb80d89d?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Nami Island",
                city: "Chuncheon",
                country: "South Korea",
                description: "A half-moon shaped island famous for its lined tree paths and scenic beauty.",
                image: "https://images.unsplash.com/photo-1632412073072-8e02d20b4d48?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "DMZ",
                city: "Paju",
                country: "South Korea",
                description: "The demilitarized zone separating the two Koreas, a powerful historical landmark.",
                image: "https://images.unsplash.com/photo-1548171120-f5a60a7ad9a6?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    vietnam: {
        name: "Vietnam",
        slug: "vietnam",
        description: "Breathtaking karst landscapes, rich colonial history, and incredibly vibrant cuisine.",
        heroImage: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2000&auto=format&fit=crop",
        tips: ["Cross the street slowly and steadily", "Try pho for breakfast", "Haggle at local markets"],
        destinations: [
            {
                name: "Ha Long Bay",
                city: "Quảng Ninh",
                country: "Vietnam",
                description: "A UNESCO site with thousands of limestone karsts and islands rising from the sea.",
                image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Hội An Ancient Town",
                city: "Hội An",
                country: "Vietnam",
                description: "A beautifully preserved ancient port city with lantern-lit streets and tailor shops.",
                image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Sapa Rice Terraces",
                city: "Lào Cai",
                country: "Vietnam",
                description: "Stunning carved rice paddies in the mountains near the Chinese border.",
                image: "https://images.unsplash.com/photo-1583925694399-e1cf09ad88e9?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Cu Chi Tunnels",
                city: "Ho Chi Minh City",
                country: "Vietnam",
                description: "An immense network of underground tunnels used during the Vietnam War.",
                image: "https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Phong Nha Caves",
                city: "Quảng Bình",
                country: "Vietnam",
                description: "Home to the world's largest cave, Sơn Đoòng, and stunning underground rivers.",
                image: "https://images.unsplash.com/photo-1605275600451-97c7ab5cf3e9?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    indonesia: {
        name: "Indonesia",
        slug: "indonesia",
        description: "Over 17,000 islands featuring the spiritual luxury of Bali and the wilderness of Komodo.",
        heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop",
        tips: ["Respect temple dress codes", "Try local warungs for authentic food", "Carry cash for small vendors"],
        destinations: [
            {
                name: "Ubud Rice Terraces",
                city: "Bali",
                country: "Indonesia",
                description: "Lush green terraced rice paddies in the cultural heart of Bali.",
                image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Komodo National Park",
                city: "East Nusa Tenggara",
                country: "Indonesia",
                description: "Home to the famous Komodo dragons and pristine diving sites.",
                image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Borobudur Temple",
                city: "Central Java",
                country: "Indonesia",
                description: "The world's largest Buddhist temple and a 9th-century Mahayana monument.",
                image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Raja Ampat",
                city: "West Papua",
                country: "Indonesia",
                description: "An archipelago with the richest marine biodiversity on Earth.",
                image: "https://images.unsplash.com/photo-1570789210756-720a25a997c1?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Tanah Lot Temple",
                city: "Bali",
                country: "Indonesia",
                description: "An ancient Hindu shrine perched on top of an offshore rock formation.",
                image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    singapore: {
        name: "Singapore",
        slug: "singapore",
        description: "A futuristic garden city boasting incredible food, pristine streets, and luxury shopping.",
        heroImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2000&auto=format&fit=crop",
        tips: ["Chewing gum is banned", "Use the MRT for transport", "Visit hawker centres for amazing food"],
        destinations: [
            {
                name: "Marina Bay Sands",
                city: "Singapore",
                country: "Singapore",
                description: "An iconic integrated resort with a stunning rooftop infinity pool.",
                image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Gardens by the Bay",
                city: "Singapore",
                country: "Singapore",
                description: "A futuristic nature park with towering Supertree structures and cloud forests.",
                image: "https://images.unsplash.com/photo-1506351421178-63b52a2d2562?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Sentosa Island",
                city: "Singapore",
                country: "Singapore",
                description: "A resort island with Universal Studios, pristine beaches, and luxury hotels.",
                image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Chinatown Heritage Centre",
                city: "Singapore",
                country: "Singapore",
                description: "A museum chronicling the lives of Chinatown's early Chinese immigrants.",
                image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Orchard Road",
                city: "Singapore",
                country: "Singapore",
                description: "Singapore's premier shopping boulevard lined with luxury malls and boutiques.",
                image: "https://images.unsplash.com/photo-1576788903474-f21054dd8b05?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    philippines: {
        name: "Philippines",
        slug: "philippines",
        description: "Crystal-clear waters, hidden lagoons, and some of the friendliest locals in the world.",
        heroImage: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=2000&auto=format&fit=crop",
        tips: ["Island hop between destinations", "Try lechon and adobo", "Learn basic Tagalog phrases"],
        destinations: [
            {
                name: "El Nido",
                city: "Palawan",
                country: "Philippines",
                description: "A paradise of limestone cliffs, crystal lagoons, and pristine coral reefs.",
                image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Chocolate Hills",
                city: "Bohol",
                country: "Philippines",
                description: "Over 1,200 perfectly cone-shaped hills that turn brown during the dry season.",
                image: "https://images.unsplash.com/photo-1555817128-342e1c8b3b24?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Boracay White Beach",
                city: "Boracay",
                country: "Philippines",
                description: "A world-famous 4-km stretch of powdery white sand and crystal-clear waters.",
                image: "https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Banaue Rice Terraces",
                city: "Ifugao",
                country: "Philippines",
                description: "Ancient hand-carved rice terraces carved into the mountains 2,000 years ago.",
                image: "https://images.unsplash.com/photo-1583925694399-e1cf09ad88e9?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Siargao Island",
                city: "Surigao del Norte",
                country: "Philippines",
                description: "The surfing capital of the Philippines with pristine mangroves and lagoons.",
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    india: {
        name: "India",
        slug: "india",
        description: "A sensory explosion of colors, spices, palaces, and the majestic Taj Mahal.",
        heroImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2000&auto=format&fit=crop",
        tips: ["Dress modestly at temples", "Drink bottled water only", "Bargain at local markets"],
        destinations: [
            {
                name: "Taj Mahal",
                city: "Agra",
                country: "India",
                description: "An ivory-white marble mausoleum and one of the New Seven Wonders of the World.",
                image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Jaipur Pink City",
                city: "Rajasthan",
                country: "India",
                description: "A vibrant city known for its pink-hued buildings and majestic Hawa Mahal palace.",
                image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Kerala Backwaters",
                city: "Kerala",
                country: "India",
                description: "A network of tranquil lagoons, canals, and lakes best explored by houseboat.",
                image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Varanasi Ghats",
                city: "Varanasi",
                country: "India",
                description: "The spiritual capital of India with ancient steps leading down to the sacred Ganges.",
                image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Goa Beaches",
                city: "Goa",
                country: "India",
                description: "A former Portuguese colony famous for its golden beaches, nightlife, and architecture.",
                image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    maldives: {
        name: "Maldives",
        slug: "maldives",
        description: "The absolute pinnacle of overwater luxury resorts and exquisite turquoise lagoons.",
        heroImage: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2000&auto=format&fit=crop",
        tips: ["Book resorts well in advance", "Bring reef-safe sunscreen", "Respect Islamic culture on local islands"],
        destinations: [
            {
                name: "Malé Atoll",
                city: "Malé",
                country: "Maldives",
                description: "The capital atoll with colorful buildings, fish markets, and the Islamic Centre.",
                image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Baa Atoll",
                city: "Baa",
                country: "Maldives",
                description: "A UNESCO Biosphere Reserve famous for manta ray gatherings in Hanifaru Bay.",
                image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Vaadhoo Bioluminescent Beach",
                city: "Raa Atoll",
                country: "Maldives",
                description: "A magical beach that glows blue at night due to bioluminescent phytoplankton.",
                image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Ari Atoll",
                city: "Ari",
                country: "Maldives",
                description: "One of the best diving destinations in the world with whale shark sightings.",
                image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Maafushi Island",
                city: "Kaafu",
                country: "Maldives",
                description: "A local island offering an authentic Maldivian experience at affordable prices.",
                image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    australia: {
        name: "Australia",
        slug: "australia",
        description: "The rugged Outback, the iconic Sydney Opera House, and the spectacular Great Barrier Reef.",
        heroImage: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=2000&auto=format&fit=crop",
        tips: ["Wear sunscreen at all times", "Watch out for wildlife", "Drive on the left side"],
        destinations: [
            {
                name: "Sydney Opera House",
                city: "Sydney",
                country: "Australia",
                description: "An architectural masterpiece and UNESCO World Heritage Site on Sydney Harbour.",
                image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Great Barrier Reef",
                city: "Queensland",
                country: "Australia",
                description: "The world's largest coral reef system visible from outer space.",
                image: "https://images.unsplash.com/photo-1587139223877-04cb899fa3e8?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Uluru",
                city: "Northern Territory",
                country: "Australia",
                description: "A massive sandstone monolith sacred to Indigenous Australians.",
                image: "https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Great Ocean Road",
                city: "Victoria",
                country: "Australia",
                description: "A scenic coastal drive featuring the Twelve Apostles rock formations.",
                image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Bondi Beach",
                city: "Sydney",
                country: "Australia",
                description: "Australia's most famous beach, a hub for surfing, swimming, and coastal walks.",
                image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&q=80&w=800"
            }
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
            {
                name: "Arenal Volcano",
                city: "La Fortuna",
                country: "Costa Rica",
                description: "An active volcano surrounded by hot springs, waterfalls, and lush rainforest.",
                image: "https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Monteverde Cloud Forest",
                city: "Puntarenas",
                country: "Costa Rica",
                description: "A mystical cloud forest reserve home to an extraordinary variety of wildlife.",
                image: "https://images.unsplash.com/photo-1597999153498-8ce881e01f5d?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Manuel Antonio",
                city: "Puntarenas",
                country: "Costa Rica",
                description: "A stunning national park combining pristine beaches with tropical wildlife.",
                image: "https://images.unsplash.com/photo-1518259102261-b40117eabbc5?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Tortuguero",
                city: "Limón",
                country: "Costa Rica",
                description: "A remote national park accessible only by boat, famous for sea turtle nesting.",
                image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Nicoya Peninsula",
                city: "Guanacaste",
                country: "Costa Rica",
                description: "A Blue Zone peninsula known for beautiful beaches and the longevity of its residents.",
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    egypt: {
        name: "Egypt",
        slug: "egypt",
        description: "The cradle of civilization, featuring the Pyramids of Giza and luxurious Nile river cruises.",
        heroImage: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=2000&auto=format&fit=crop",
        tips: ["Dress conservatively", "Stay hydrated in the desert heat", "Book a licensed Egyptologist guide"],
        destinations: [
            {
                name: "Pyramids of Giza",
                city: "Cairo",
                country: "Egypt",
                description: "The last surviving ancient wonder of the world and Egypt's most iconic landmark.",
                image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Valley of the Kings",
                city: "Luxor",
                country: "Egypt",
                description: "A valley containing the elaborate tombs of pharaohs including Tutankhamun.",
                image: "https://images.unsplash.com/photo-1568322445389-f64e1e0e59c7?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Karnak Temple",
                city: "Luxor",
                country: "Egypt",
                description: "A vast ancient temple complex and the largest religious building ever constructed.",
                image: "https://images.unsplash.com/photo-1609609830354-8f615e20e564?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Abu Simbel",
                city: "Aswan",
                country: "Egypt",
                description: "Two massive rock-cut temples built by Ramesses II near the Sudanese border.",
                image: "https://images.unsplash.com/photo-1565966424621-f98a4a23a70c?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Nile River Cruise",
                city: "Aswan to Luxor",
                country: "Egypt",
                description: "A luxury cruise along the world's longest river passing ancient temples and villages.",
                image: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },

    switzerland: {
        name: "Switzerland",
        slug: "switzerland",
        description: "Pristine alpine lakes, dramatic peaks, and unparalleled luxury mountain resorts.",
        heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop",
        tips: ["Buy a Swiss Travel Pass", "Try fondue and raclette", "Carry Swiss Francs for small purchases"],
        destinations: [
            {
                name: "Matterhorn",
                city: "Zermatt",
                country: "Switzerland",
                description: "The iconic pyramidal peak towering over the Swiss Alpine town of Zermatt.",
                image: "https://images.unsplash.com/photo-1531210483974-4f8205f6ea20?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Jungfraujoch",
                city: "Interlaken",
                country: "Switzerland",
                description: "A saddle in the Bernese Alps, accessible by railway as the Top of Europe.",
                image: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Lake Geneva",
                city: "Geneva",
                country: "Switzerland",
                description: "A crescent-shaped lake spanning the Swiss-French border with pristine shores.",
                image: "https://images.unsplash.com/photo-1504711945710-47ac7a24c800?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Lucerne Old Town",
                city: "Lucerne",
                country: "Switzerland",
                description: "A charming medieval city with a covered wooden bridge and lakeside promenade.",
                image: "https://images.unsplash.com/photo-1527095655346-b39a9a61d71c?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Rhine Falls",
                city: "Neuhausen",
                country: "Switzerland",
                description: "The most powerful waterfall in Europe situated on the High Rhine.",
                image: "https://images.unsplash.com/photo-1583243567239-3727551e0c59?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
};
