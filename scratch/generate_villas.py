import json

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
id_counter = 1

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

ts_content = "export const villasData = [\n"
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

with open(r"c:\Users\USER\OneDrive\Рабочий стол\TRAVEL WEBSITE\data\villasData.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Successfully wrote {len(villas)} villas to data/villasData.ts")
