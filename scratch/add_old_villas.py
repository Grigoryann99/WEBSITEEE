import json

target = r'c:\Users\USER\OneDrive\Рабочий стол\TRAVEL WEBSITE\data\villasData.ts'
with open(target, 'r', encoding='utf-8') as f:
    content = f.read()

# Original 9 villas
original_villas = [
    {
        "id": 1,
        "name": "The Ocean Villas",
        "price": "From $1,200 / Night",
        "description": "Perched above a turquoise lagoon with private infinity pools and direct reef access below. Each villa includes a dedicated butler, sunset deck, and water sports facility.",
        "image": "/villas/1villa.png",
        "bedrooms": 2,
        "guests": 4,
        "amenity": "Private Pool",
        "location": "Maldives"
    },
    {
        "id": 2,
        "name": "The Beach Residence",
        "price": "From $2,500 / Night",
        "description": "Three acres of tropical garden on a private beachfront accommodating up to eight guests in ocean-facing suites. Includes private chef, tennis court, and direct beach access.",
        "image": "/villas/2villa.png",
        "bedrooms": 4,
        "guests": 8,
        "amenity": "Ocean Front",
        "location": "Seychelles"
    },
    {
        "id": 3,
        "name": "The Royal Estate",
        "price": "Inquire for Pricing",
        "description": "Five bedrooms, private chef, dedicated yacht, and a 25-meter infinity pool overlooking the lagoon. Available for weekly bookings only — inquire for pricing.",
        "image": "/villas/3villa.png",
        "bedrooms": 5,
        "guests": 10,
        "amenity": "Yacht Access",
        "location": "Bora Bora"
    },
    {
        "id": 4,
        "name": "Golden Horizon",
        "price": "From $1,500 / Night",
        "description": "Carved into the volcanic caldera cliff with uninterrupted sunset views from a private infinity pool. Sleeps six, includes dedicated concierge and daily breakfast.",
        "image": "/villas/4villa.png",
        "bedrooms": 3,
        "guests": 6,
        "amenity": "Cliffside Pool",
        "location": "Santorini"
    },
    {
        "id": 5,
        "name": "Ivory Oasis",
        "price": "From $1,800 / Night",
        "description": "180 meters of private white sand beach with three bedroom suites, a private cinema, and a full spa. Calm shallow waters ideal for families and couples.",
        "image": "/villas/5villa.png",
        "bedrooms": 3,
        "guests": 6,
        "amenity": "White Sand Beach",
        "location": "Turks & Caicos"
    },
    {
        "id": 6,
        "name": "Crimson Peak",
        "price": "From $2,200 / Night",
        "description": "At 1,850 meters with panoramic Alpine views and direct ski-in/ski-out access. Private wellness spa and heated outdoor pool available year-round.",
        "image": "/villas/6villa.png",
        "bedrooms": 4,
        "guests": 8,
        "amenity": "Mountain Views",
        "location": "Swiss Alps"
    },
    {
        "id": 7,
        "name": "Midnight Cove",
        "price": "From $1,400 / Night",
        "description": "Private dock and kayaks on a bay famous for its natural bioluminescent waters. Swim at night in waters that glow — one of our most unique properties.",
        "image": "/villas/7villa.png",
        "bedrooms": 2,
        "guests": 4,
        "amenity": "Private Dock",
        "location": "Bioluminescent Bay"
    },
    {
        "id": 8,
        "name": "Pearl Waters",
        "price": "From $1,100 / Night",
        "description": "Glass floor panels reveal the coral reef below this intimate overwater bungalow for couples. Private plunge pool and romantic dining deck above the water included.",
        "image": "/villas/8villa.png",
        "bedrooms": 1,
        "guests": 2,
        "amenity": "Glass Floors",
        "location": "Fiji"
    },
    {
        "id": 9,
        "name": "Obsidian Ridge",
        "price": "From $3,000 / Night",
        "description": "Carved into volcanic rock with a geothermal spa and private aurora viewing deck. Unobstructed Northern Lights views — available year-round.",
        "image": "/villas/9villa.png",
        "bedrooms": 5,
        "guests": 10,
        "amenity": "Volcanic Spa",
        "location": "Iceland"
    }
]

# Create string of new items
ts_content = "export const villasData = [\n"

# First add the original 9
for v in original_villas:
    desc = v['description'].replace("'", "\\'")
    ts_content += "    {\n"
    ts_content += f"        id: {v['id']},\n"
    ts_content += f"        name: '{v['name']}',\n"
    ts_content += f"        price: '{v['price']}',\n"
    ts_content += f"        description: '{desc}',\n"
    ts_content += f"        image: '{v['image']}',\n"
    ts_content += f"        bedrooms: {v['bedrooms']},\n"
    ts_content += f"        guests: {v['guests']},\n"
    ts_content += f"        amenity: '{v['amenity']}',\n"
    ts_content += f"        location: '{v['location']}'\n"
    ts_content += "    },\n"

# Now parse the existing villas, update their IDs by +9, and add them
import re

# We will simply execute the original script again but offset the ID.
countries = [
    ("Argentina", "argentina"), ("Australia", "australia"), ("Austria", "austria"), 
    ("Belgium", "belgium"), ("Brazil", "brazil"), ("Canada", "canada"), 
    ("Chile", "chile"), ("Colombia", "colombia"), ("Costa Rica", "costaRica"), 
    ("Czech Republic", "czech"), ("Egypt", "egypt"), ("Finland", "finland"), 
    ("France", "france"), ("Greece", "greece"), ("Hungary", "hungary"), 
    ("Iceland", "iceland"), ("India", "india"), ("Indonesia", "indonesia"), 
    ("Italy", "italy"), ("Japan", "japan"), ("Jordan", "jordan"), 
    ("Malaysia", "malaysia"), ("Maldives", "maldives"), ("Mexico", "mexico"), 
    ("Morocco", "morocco"), ("Netherlands", "netherlands"), ("New Zealand", "newZealand"), 
    ("Norway", "norway"), ("Peru", "peru"), ("Philippines", "philippines"), 
    ("Poland", "poland"), ("Portugal", "portugal"), ("Qatar", "qatar"), 
    ("Seychelles", "seychelles"), ("South Africa", "southAfrica"), ("South Korea", "southKorea"), 
    ("Spain", "spain"), ("Sri Lanka", "sriLanka"), ("Sweden", "sweden"), 
    ("Switzerland", "switzerland"), ("Thailand", "thailand"), ("Turkey", "turkey"), 
    ("UAE", "uae"), ("UK", "uk"), ("USA", "usa"), ("Vietnam", "vietnam"), 
    ("Germany", "germany"), ("Ireland", "ireland"), ("Denmark", "denmark"), 
    ("Singapore", "singapore"), ("Panama", "panama")
]

villas = []
id_counter = 10

for name, slug in countries:
    # Villa 1
    v1 = {
        "id": id_counter,
        "name": f"The Royal {name} Retreat",
        "price": "From $1,500 / Night",
        "description": f"An exclusive luxury estate in the heart of {name}, offering panoramic views, a private infinity pool, and a dedicated team including a private chef and butler. Perfect for secluded getaways.",
        "image": f"https://loremflickr.com/1200/800/luxury,villa,{slug}/all?lock={id_counter + 7000}",
        "bedrooms": 4,
        "guests": 8,
        "amenity": "Infinity Pool",
        "location": name
    }
    villas.append(v1)
    id_counter += 1
    
    # Villa 2
    v2 = {
        "id": id_counter,
        "name": f"{name} Cliffside Residence",
        "price": "From $2,200 / Night",
        "description": f"Experience unparalleled luxury in this stunning {name} residence. Features include floor-to-ceiling windows, smart home technology, direct private access, and an outdoor spa.",
        "image": f"https://loremflickr.com/1200/800/luxury,villa,{slug}/all?lock={id_counter + 7000}",
        "bedrooms": 6,
        "guests": 12,
        "amenity": "Private Spa",
        "location": name
    }
    villas.append(v2)
    id_counter += 1

for v in villas:
    desc = v['description'].replace("'", "\\'")
    ts_content += "    {\n"
    ts_content += f"        id: {v['id']},\n"
    ts_content += f"        name: '{v['name']}',\n"
    ts_content += f"        price: '{v['price']}',\n"
    ts_content += f"        description: '{desc}',\n"
    ts_content += f"        image: '{v['image']}',\n"
    ts_content += f"        bedrooms: {v['bedrooms']},\n"
    ts_content += f"        guests: {v['guests']},\n"
    ts_content += f"        amenity: '{v['amenity']}',\n"
    ts_content += f"        location: '{v['location']}'\n"
    ts_content += "    },\n"
ts_content += "];\n"

with open(target, "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Successfully generated all 111 villas in data/villasData.ts")
