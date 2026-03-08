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
                image: "https://images.unsplash.com/photo-1533433602148-3a9d2adfd19e?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Edinburgh Castle",
                city: "Edinburgh",
                country: "United Kingdom",
                description: "A historic castle which dominates the skyline of the city of Edinburgh from its position on the Castle Rock.",
                image: "https://images.unsplash.com/photo-1501651582234-ab094db6e690?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Tower of London",
                city: "London",
                country: "United Kingdom",
                description: "A historic castle on the north bank of the River Thames in central London.",
                image: "https://images.unsplash.com/photo-1522075591963-fdf4e1526978?auto=format&fit=crop&q=80&w=800"
            },
            {
                name: "Roman Baths",
                city: "Bath",
                country: "United Kingdom",
                description: "Well-preserved thermae in the city of Bath, Somerset.",
                image: "https://images.unsplash.com/photo-1588144675549-ee4ea256793f?auto=format&fit=crop&q=80&w=800"
            }
        ]
    }
};
