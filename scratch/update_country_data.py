import os

target = r"c:\Users\USER\OneDrive\Рабочий стол\TRAVEL WEBSITE\lib\countryData.ts"
with open(target, "r", encoding="utf-8") as f:
    content = f.read()

imports_to_add = """import { germanyAttractions } from '../data/germanyAttractions';
import { irelandAttractions } from '../data/irelandAttractions';
import { denmarkAttractions } from '../data/denmarkAttractions';
import { singaporeAttractions } from '../data/singaporeAttractions';
import { panamaAttractions } from '../data/panamaAttractions';
import { seychellesAttractions } from '../data/seychellesAttractions';
"""

if "import { seychellesAttractions }" not in content:
    content = imports_to_add + content

block = """
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
};"""

if "seychelles:" not in content:
    content = content.replace("};\n", block + "\n")
    with open(target, "w", encoding="utf-8") as f:
        f.write(content)
    print("Updated successfully")
else:
    print("Already updated")
