import { argentinaAttractions } from '../data/argentinaAttractions';
import { australiaAttractions } from '../data/australiaAttractions';
import { austriaAttractions } from '../data/austriaAttractions';
import { belgiumAttractions } from '../data/belgiumAttractions';
import { brazilAttractions } from '../data/brazilAttractions';
import { canadaAttractions } from '../data/canadaAttractions';
import { chileAttractions } from '../data/chileAttractions';
import { colombiaAttractions } from '../data/colombiaAttractions';
import { costaRicaAttractions } from '../data/costaRicaAttractions';
import { czechAttractions } from '../data/czechAttractions';
import { egyptAttractions } from '../data/egyptAttractions';
import { finlandAttractions } from '../data/finlandAttractions';
import { franceAttractions } from '../data/franceAttractions';
import { greeceAttractions } from '../data/greeceAttractions';
import { hungaryAttractions } from '../data/hungaryAttractions';
import { icelandAttractions } from '../data/icelandAttractions';
import { indiaAttractions } from '../data/indiaAttractions';
import { indonesiaAttractions } from '../data/indonesiaAttractions';
import { italyAttractions } from '../data/italyAttractions';
import { japanAttractions } from '../data/japanAttractions';
import { jordanAttractions } from '../data/jordanAttractions';
import { malaysiaAttractions } from '../data/malaysiaAttractions';
import { maldivesAttractions } from '../data/maldivesAttractions';
import { mexicoAttractions } from '../data/mexicoAttractions';
import { moroccoAttractions } from '../data/moroccoAttractions';
import { netherlandsAttractions } from '../data/netherlandsAttractions';
import { newZealandAttractions } from '../data/newZealandAttractions';
import { norwayAttractions } from '../data/norwayAttractions';
import { peruAttractions } from '../data/peruAttractions';
import { philippinesAttractions } from '../data/philippinesAttractions';
import { polandAttractions } from '../data/polandAttractions';
import { portugalAttractions } from '../data/portugalAttractions';
import { qatarAttractions } from '../data/qatarAttractions';
import { seychellesAttractions } from '../data/seychellesAttractions';
import { southAfricaAttractions } from '../data/southAfricaAttractions';
import { southKoreaAttractions } from '../data/southKoreaAttractions';
import { spainAttractions } from '../data/spainAttractions';
import { sriLankaAttractions } from '../data/sriLankaAttractions';
import { swedenAttractions } from '../data/swedenAttractions';
import { switzerlandAttractions } from '../data/switzerlandAttractions';
import { thailandAttractions } from '../data/thailandAttractions';
import { turkeyAttractions } from '../data/turkeyAttractions';
import { uaeAttractions } from '../data/uaeAttractions';
import { ukAttractions } from '../data/ukAttractions';
import { usaAttractions } from '../data/usaAttractions';
import { vietnamAttractions } from '../data/vietnamAttractions';
import { germanyAttractions } from '../data/germanyAttractions';
import { irelandAttractions } from '../data/irelandAttractions';
import { denmarkAttractions } from '../data/denmarkAttractions';
import { singaporeAttractions } from '../data/singaporeAttractions';
import { panamaAttractions } from '../data/panamaAttractions';

export interface Destination {
    name: string;
    city: string;
    country: string;
    description: string;
    image?: string;
    category?: string;
    whyVisit?: string;
    bestTime?: string;
    insiderTip?: string;
    howToGetThere?: string;
    cost?: string;
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
        destinations: franceAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "France",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    italy: {
        name: "Italy",
        slug: "italy",
        description: "Discover ancient ruins, masterpiece art, and world-renowned gastronomy.",
        heroImage: "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=2000&auto=format&fit=crop",
        tips: ["Carry cash for small cafes", "Validate your train tickets", "Dinner is usually late"],
        destinations: italyAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Italy",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    japan: {
        name: "Japan",
        slug: "japan",
        description: "A unique blend of ancient traditions and futuristic innovation.",
        heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000&auto=format&fit=crop",
        tips: ["Buy a JR Pass before arriving", "Have Google Translate ready", "Respect local etiquette on trains"],
        destinations: japanAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Japan",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    united_states: {
        name: "USA",
        slug: "united_states",
        description: "Explore diverse landscapes from soaring mountains to iconic mega-cities.",
        heroImage: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2000&auto=format&fit=crop",
        tips: ["Remember to tip 15-20%", "Distances are huge, plan travel accordingly", "Prices shown often exclude tax"],
        destinations: usaAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "USA",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    spain: {
        name: "Spain",
        slug: "spain",
        description: "Vibrant culture, beautiful beaches, and profound architectural wonders.",
        heroImage: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=2000&auto=format&fit=crop",
        tips: ["Embrace the siesta time", "Tapas are mostly eaten standing up", "Dinner starts very late"],
        destinations: spainAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Spain",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    greece: {
        name: "Greece",
        slug: "greece",
        description: "The cradle of Western civilization with idyllic islands and ancient mythology.",
        heroImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2000&auto=format&fit=crop",
        tips: ["Island hopping requires planning", "Try the street food (Souvlaki)", "Sun protection is essential"],
        destinations: greeceAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Greece",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    united_arab_emirates: {
        name: "UAE",
        slug: "united_arab_emirates",
        description: "A luxury oasis combining ultramodern aesthetics with deep Bedouin roots.",
        heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop",
        tips: ["Dress modestly in public areas", "Weekends are Friday-Saturday", "Use the efficient Dubai Metro"],
        destinations: uaeAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "UAE",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    brazil: {
        name: "Brazil",
        slug: "brazil",
        description: "Breathtaking natural beauty meets a vibrant, colorful, and rhythmic culture.",
        heroImage: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2000&auto=format&fit=crop",
        tips: ["Learn basic Portuguese words", "Be mindful of personal belongings", "Use ridesharing apps"],
        destinations: brazilAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Brazil",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    thailand: {
        name: "Thailand",
        slug: "thailand",
        description: "The land of smiles offering golden temples, pristine beaches, and unforgettable cuisine.",
        heroImage: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2000&auto=format&fit=crop",
        tips: ["Respect the monarchy and temples", "Negotiate before getting in a Tuk Tuk", "Street food is highly recommended"],
        destinations: thailandAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Thailand",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    united_kingdom: {
        name: "United Kingdom",
        slug: "united_kingdom",
        description: "Rich history, iconic royals, sprawling countrysides and cosmopolitan cities.",
        heroImage: "https://images.unsplash.com/photo-1513635269975-5969336ac1cb?q=80&w=2000&auto=format&fit=crop",
        tips: ["Stand on the right on escalators", "Always carry an umbrella", "Understand the pub culture"],
        destinations: ukAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "United Kingdom",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    norway: {
        name: "Norway",
        slug: "norway",
        description: "Dramatic fjords, the Northern Lights, and pristine Arctic landscapes await.",
        heroImage: "https://images.unsplash.com/photo-1504233529578-6d46baba6d34?q=80&w=2000&auto=format&fit=crop",
        tips: ["Embrace the 'friluftsliv' outdoor lifestyle", "Book fjord cruises in advance", "Pack layers for unpredictable weather"],
        destinations: norwayAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Norway",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    sweden: {
        name: "Sweden",
        slug: "sweden",
        description: "Scandinavian design, enchanted forests, and a thriving cultural scene.",
        heroImage: "https://images.unsplash.com/photo-1509356843151-3e7d96a77d11?q=80&w=2000&auto=format&fit=crop",
        tips: ["Embrace 'fika' (coffee & cake breaks)", "Public transport is excellent", "Tap water is safe and delicious"],
        destinations: swedenAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Sweden",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    finland: {
        name: "Finland",
        slug: "finland",
        description: "Land of a thousand lakes, saunas, and the magical Arctic wilderness.",
        heroImage: "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?q=80&w=2000&auto=format&fit=crop",
        tips: ["Sauna etiquette is important – clothing optional", "Silence is a sign of respect", "Try salmiakki (salty liquorice)"],
        destinations: finlandAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Finland",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    poland: {
        name: "Poland",
        slug: "poland",
        description: "A land of medieval castles, stunning old towns, and rich cultural heritage.",
        heroImage: "https://images.unsplash.com/photo-1540835237482-cb9ca281c01f?q=80&w=2000&auto=format&fit=crop",
        tips: ["Polish zloty is the currency, not Euro", "Try pierogi and bigos", "Tipping ~10% is appreciated"],
        destinations: polandAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Poland",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    czech_republic: {
        name: "Czech Republic",
        slug: "czech_republic",
        description: "Fairy-tale castles, bohemian culture, and the golden city of Prague.",
        heroImage: "https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=2000&auto=format&fit=crop",
        tips: ["Carry small change for tipping", "Prague is very walkable", "Try trdelník and svíčková"],
        destinations: czechAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Czech Republic",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    hungary: {
        name: "Hungary",
        slug: "hungary",
        description: "Budapest's thermal baths, grand architecture, and rich Hungarian culture.",
        heroImage: "https://images.unsplash.com/photo-1551867633-194f125bddfa?q=80&w=2000&auto=format&fit=crop",
        tips: ["Try the thermal baths (Széchenyi is the most famous)", "Forint is the currency", "Tokaji wine is a must-try"],
        destinations: hungaryAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Hungary",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    qatar: {
        name: "Qatar",
        slug: "qatar",
        description: "A futuristic Gulf state blending ultramodern skylines with ancient desert traditions.",
        heroImage: "https://images.unsplash.com/photo-1572705655951-9c9e2f8f1b4c?q=80&w=2000&auto=format&fit=crop",
        tips: ["Dress modestly in public", "Alcohol is available in licensed venues", "Visit the souqs for authentic culture"],
        destinations: qatarAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Qatar",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    jordan: {
        name: "Jordan",
        slug: "jordan",
        description: "An ancient land of rose-red cities, desert wonders, and extraordinary hospitality.",
        heroImage: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2000&auto=format&fit=crop",
        tips: ["Jordan Pass saves on visa and entrance fees", "Wadi Rum is best at sunrise or sunset", "Bargaining is expected in markets"],
        destinations: jordanAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Jordan",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    malaysia: {
        name: "Malaysia",
        slug: "malaysia",
        description: "Tropical rainforests, diverse cultures, and iconic skyscrapers define this vibrant nation.",
        heroImage: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2000&auto=format&fit=crop",
        tips: ["Bring mosquito repellent for jungle trips", "Remove shoes when entering temples/homes", "Ringgit is the currency"],
        destinations: malaysiaAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Malaysia",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    sri_lanka: {
        name: "Sri Lanka",
        slug: "sri_lanka",
        description: "The Pearl of the Indian Ocean, blessed with temples, tea, and pristine beaches.",
        heroImage: "https://images.unsplash.com/photo-1505856291099-4e1d3ea3cdb6?q=80&w=2000&auto=format&fit=crop",
        tips: ["Hire a tuk-tuk for short trips", "Respect temple dress codes", "Try Ceylon tea at its source"],
        destinations: sriLankaAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Sri Lanka",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    new_zealand: {
        name: "New Zealand",
        slug: "new_zealand",
        description: "Middle Earth awaits with majestic fjords, Māori culture, and adventure sports.",
        heroImage: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=2000&auto=format&fit=crop",
        tips: ["Drive on the left side of the road", "Book huts on popular Tramping trails early", "Respect Māori customs and marae"],
        destinations: newZealandAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "New Zealand",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    mexico: {
        name: "Mexico",
        slug: "mexico",
        description: "Ancient Mayan ruins, vibrant beaches, and a rich tapestry of culture and cuisine.",
        heroImage: "https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=2000&auto=format&fit=crop",
        tips: ["Don't drink tap water", "Try authentic tacos from street stalls", "Bargain at local markets"],
        destinations: mexicoAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Mexico",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    argentina: {
        name: "Argentina",
        slug: "argentina",
        description: "From Patagonian glaciers to the sultry streets of Buenos Aires, a land of passion.",
        heroImage: "https://images.unsplash.com/photo-1545386575-78c5a0a50553?q=80&w=2000&auto=format&fit=crop",
        tips: ["Learn some tango steps before visiting", "Dinner is served after 9 PM", "Steak is a must – try an asado"],
        destinations: argentinaAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Argentina",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    chile: {
        name: "Chile",
        slug: "chile",
        description: "A sliver of land stretching from the driest desert to the end of the world.",
        heroImage: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000&auto=format&fit=crop",
        tips: ["Chile is very long – domestic flights save time", "Try empanadas and pisco sours", "The currency is Chilean peso"],
        destinations: chileAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Chile",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    peru: {
        name: "Peru",
        slug: "peru",
        description: "Land of the Incas, from the highlands of Machu Picchu to the depths of the Amazon.",
        heroImage: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2000&auto=format&fit=crop",
        tips: ["Acclimatise to altitude in Cusco before Machu Picchu", "Try ceviche and lomo saltado", "Boots are essential for Inca Trail"],
        destinations: peruAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Peru",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    colombia: {
        name: "Colombia",
        slug: "colombia",
        description: "A vibrant nation of flowers, salsa dancing, emeralds, and Caribbean coastlines.",
        heroImage: "https://images.unsplash.com/photo-1558618047-f4e90b4ee24a?q=80&w=2000&auto=format&fit=crop",
        tips: ["Use Uber in major cities for safety", "Coffee tours in the Coffee Region are unmissable", "Learn a few salsa moves"],
        destinations: colombiaAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Colombia",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    south_africa: {
        name: "South Africa",
        slug: "south_africa",
        description: "The Rainbow Nation, offering safari adventures, stunning coastlines, and vibrant cities.",
        heroImage: "https://images.unsplash.com/photo-1516026672322-bc52d61a9c8c?q=80&w=2000&auto=format&fit=crop",
        tips: ["Rent a car for the Garden Route", "Book safari lodges far in advance", "Be vigilant about personal belongings in cities"],
        destinations: southAfricaAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "South Africa",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    morocco: {
        name: "Morocco",
        slug: "morocco",
        description: "A magical gateway to Africa, blending Berber culture, ancient medinas, and Saharan dunes.",
        heroImage: "https://images.unsplash.com/photo-1539020140153-e479b8e0c1c4?q=80&w=2000&auto=format&fit=crop",
        tips: ["Dress modestly, especially in medinas", "Bargaining is expected in souqs", "Try mint tea and tagine"],
        destinations: moroccoAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Morocco",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    portugal: {
        name: "Portugal",
        slug: "portugal",
        description: "Dramatic coastlines, historic Lisbon streets, and the golden vineyards of the Douro Valley.",
        heroImage: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=2000&auto=format&fit=crop",
        tips: ["Try pastéis de nata in Lisbon", "Visit Sintra palaces early morning", "Explore the Algarve region"],
        destinations: portugalAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Portugal",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    austria: {
        name: "Austria",
        slug: "austria",
        description: "Imperial palaces, classical music heritage, and stunning Tyrolean landscapes.",
        heroImage: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=2000&auto=format&fit=crop",
        tips: ["Learn to greet with 'Grüß Gott'", "Book opera tickets in advance", "Try Wiener Schnitzel"],
        destinations: austriaAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Austria",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    netherlands: {
        name: "Netherlands",
        slug: "netherlands",
        description: "Iconic canals, fields of tulips, and a progressive, bicycle-driven culture.",
        heroImage: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=2000&auto=format&fit=crop",
        tips: ["Rent a bicycle in Amsterdam", "Visit Keukenhof in spring", "Try fresh stroopwafels"],
        destinations: netherlandsAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Netherlands",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    belgium: {
        name: "Belgium",
        slug: "belgium",
        description: "Medieval towns, extraordinary chocolate, and the historic charm of Bruges and Brussels.",
        heroImage: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?q=80&w=2000&auto=format&fit=crop",
        tips: ["Try Belgian waffles and frites", "Visit chocolate shops in Brussels", "Explore Bruges by boat"],
        destinations: belgiumAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Belgium",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    iceland: {
        name: "Iceland",
        slug: "iceland",
        description: "A land of fire and ice featuring geysers, glaciers, and the elusive Northern Lights.",
        heroImage: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=2000&auto=format&fit=crop",
        tips: ["Book the Blue Lagoon in advance", "Rent a 4x4 for highlands", "Bring layers for all weather"],
        destinations: icelandAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Iceland",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    turkey: {
        name: "Turkey",
        slug: "turkey",
        description: "Where East meets West — breathtaking mosques, vibrant bazaars, and the balloons of Cappadocia.",
        heroImage: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2000&auto=format&fit=crop",
        tips: ["Bargain in bazaars", "Try Turkish breakfast", "Book balloon rides early in Cappadocia"],
        destinations: turkeyAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Turkey",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    south_korea: {
        name: "South Korea",
        slug: "south_korea",
        description: "Dynamic Seoul pop culture contrasting with tranquil mountains and historic palaces.",
        heroImage: "https://images.unsplash.com/photo-1601621915196-2621bfb0cd6e?q=80&w=2000&auto=format&fit=crop",
        tips: ["Try authentic Korean BBQ", "Use the metro T-money card", "Visit during cherry blossom season"],
        destinations: southKoreaAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "South Korea",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    vietnam: {
        name: "Vietnam",
        slug: "vietnam",
        description: "Breathtaking karst landscapes, rich colonial history, and incredibly vibrant cuisine.",
        heroImage: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2000&auto=format&fit=crop",
        tips: ["Cross the street slowly and steadily", "Try pho for breakfast", "Haggle at local markets"],
        destinations: vietnamAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Vietnam",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    indonesia: {
        name: "Indonesia",
        slug: "indonesia",
        description: "Over 17,000 islands featuring the spiritual luxury of Bali and the wilderness of Komodo.",
        heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop",
        tips: ["Respect temple dress codes", "Try local warungs for authentic food", "Carry cash for small vendors"],
        destinations: indonesiaAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Indonesia",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    philippines: {
        name: "Philippines",
        slug: "philippines",
        description: "Crystal-clear waters, hidden lagoons, and some of the friendliest locals in the world.",
        heroImage: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=2000&auto=format&fit=crop",
        tips: ["Island hop between destinations", "Try lechon and adobo", "Learn basic Tagalog phrases"],
        destinations: philippinesAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Philippines",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    india: {
        name: "India",
        slug: "india",
        description: "A sensory explosion of colors, spices, palaces, and the majestic Taj Mahal.",
        heroImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2000&auto=format&fit=crop",
        tips: ["Dress modestly at temples", "Drink bottled water only", "Bargain at local markets"],
        destinations: indiaAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "India",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    maldives: {
        name: "Maldives",
        slug: "maldives",
        description: "The absolute pinnacle of overwater luxury resorts and exquisite turquoise lagoons.",
        heroImage: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2000&auto=format&fit=crop",
        tips: ["Book resorts well in advance", "Bring reef-safe sunscreen", "Respect Islamic culture on local islands"],
        destinations: maldivesAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Maldives",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    australia: {
        name: "Australia",
        slug: "australia",
        description: "The rugged Outback, the iconic Sydney Opera House, and the spectacular Great Barrier Reef.",
        heroImage: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=2000&auto=format&fit=crop",
        tips: ["Wear sunscreen at all times", "Watch out for wildlife", "Drive on the left side"],
        destinations: australiaAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Australia",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    canada: {
        name: "Canada",
        slug: "canada",
        description: "Breathtaking Rocky Mountains, cosmopolitan cities, and vast untouched wilderness.",
        heroImage: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2000&auto=format&fit=crop",
        tips: ["Carry layers for mountain weather", "Be bear aware in national parks", "Try poutine in Quebec"],
        destinations: canadaAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Canada",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    costa_rica: {
        name: "Costa Rica",
        slug: "costa_rica",
        description: "The ultimate eco-tourism destination with lush rainforests, volcanoes, and incredible wildlife.",
        heroImage: "https://images.unsplash.com/photo-1568402102990-bc541580b59f?q=80&w=2000&auto=format&fit=crop",
        tips: ["Learn 'Pura Vida'", "Book eco-lodges early", "Carry rain gear in green season"],
        destinations: costaRicaAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Costa Rica",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    egypt: {
        name: "Egypt",
        slug: "egypt",
        description: "The cradle of civilization, featuring the Pyramids of Giza and luxurious Nile river cruises.",
        heroImage: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=2000&auto=format&fit=crop",
        tips: ["Dress conservatively", "Stay hydrated in the desert heat", "Book a licensed Egyptologist guide"],
        destinations: egyptAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Egypt",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    switzerland: {
        name: "Switzerland",
        slug: "switzerland",
        description: "Pristine alpine lakes, dramatic peaks, and unparalleled luxury mountain resorts.",
        heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop",
        tips: ["Buy a Swiss Travel Pass", "Try fondue and raclette", "Carry Swiss Francs for small purchases"],
        destinations: switzerlandAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Switzerland",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },

    seychelles: {
        name: "Seychelles",
        slug: "seychelles",
        description: "An archipelago of 115 islands in the Indian Ocean, known for its pristine beaches, coral reefs and nature reserves.",
        heroImage: "https://images.unsplash.com/photo-1577977465922-132b4b4ff346?q=80&w=2000&auto=format&fit=crop",
        tips: ["Island hopping is a must", "Protect the giant tortoises", "Pack plenty of reef-safe sunscreen"],
        destinations: seychellesAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Seychelles",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    germany: {
        name: "Germany",
        slug: "germany",
        description: "From medieval castles and romantic rivers to vibrant modern cities and the Bavarian Alps.",
        heroImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2000&auto=format&fit=crop",
        tips: ["Cash is still king in many places", "Always validate your train ticket", "Respect the quiet hours on Sunday"],
        destinations: germanyAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Germany",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    ireland: {
        name: "Ireland",
        slug: "ireland",
        description: "The Emerald Isle offers dramatic coastal cliffs, ancient castles, and unmatched pub culture.",
        heroImage: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=2000&auto=format&fit=crop",
        tips: ["Rent a car for the countryside", "Prepare for changing weather", "Enjoy the traditional music sessions"],
        destinations: irelandAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Ireland",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    denmark: {
        name: "Denmark",
        slug: "denmark",
        description: "Experience the epitome of Scandinavian design, culinary excellence, and the cozy concept of hygge.",
        heroImage: "https://images.unsplash.com/photo-1513622470522-26c31154c1fc?q=80&w=2000&auto=format&fit=crop",
        tips: ["Rent a bike in Copenhagen", "Try smørrebrød for lunch", "Trains are the best way to travel"],
        destinations: denmarkAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Denmark",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    singapore: {
        name: "Singapore",
        slug: "singapore",
        description: "A futuristic garden city where diverse cultures, cutting-edge architecture, and world-class street food collide.",
        heroImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2000&auto=format&fit=crop",
        tips: ["Eat at hawker centers", "Use the incredibly efficient MRT", "Chewing gum is banned"],
        destinations: singaporeAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Singapore",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    },
    panama: {
        name: "Panama",
        slug: "panama",
        description: "The crossroads of the Americas, offering the engineering marvel of the canal, vibrant jungles, and two oceans.",
        heroImage: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2000&auto=format&fit=crop",
        tips: ["Use Uber in the city", "The currency is pegged to the US Dollar", "Visit both coasts"],
        destinations: panamaAttractions.map(attr => ({
            name: attr.name,
            city: attr.location,
            country: "Panama",
            description: attr.description,
            image: attr.image,
            category: attr.category,
            whyVisit: attr.whyVisit,
            bestTime: attr.bestTime,
            insiderTip: attr.insiderTip,
            howToGetThere: attr.howToGetThere,
            cost: attr.cost
        }))
    }
};
