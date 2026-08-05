import re
import json
import urllib.request
import urllib.parse
import time

def get_wiki_image(title):
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=pageimages&format=json&pithumbsize=1200&redirects=1"
    req = urllib.request.Request(url, headers={'User-Agent': 'TravelApp/1.0'})
    try:
        with urllib.request.urlopen(req, timeout=5) as r:
            data = json.loads(r.read())
            pages = data['query']['pages']
            for page_id in pages:
                if 'thumbnail' in pages[page_id]:
                    return pages[page_id]['thumbnail']['source']
    except Exception:
        pass
    return None

target = r'c:\Users\USER\OneDrive\Рабочий стол\TRAVEL WEBSITE\data\villasData.ts'
with open(target, 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r'\{\s*id:\s*(\d+),\s*name:\s*\'(.*?)\',\s*price:\s*\'(.*?)\',\s*description:\s*\'(.*?)\',\s*image:\s*\'(.*?)\',\s*bedrooms:\s*(\d+),\s*guests:\s*(\d+),\s*amenity:\s*\'(.*?)\',\s*location:\s*\'(.*?)\'\s*\}'

matches = re.finditer(pattern, content)
villas = []
for m in matches:
    villas.append({
        'id': int(m.group(1)),
        'name': m.group(2),
        'price': m.group(3),
        'description': m.group(4),
        'image': m.group(5),
        'bedrooms': int(m.group(6)),
        'guests': int(m.group(7)),
        'amenity': m.group(8),
        'location': m.group(9)
    })

fallback_images = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Statue_of_Liberty%2C_NY.jpg/1200px-Statue_of_Liberty%2C_NY.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Eiffel_Tower_from_the_Tour_Montparnasse_3.jpg/1200px-Eiffel_Tower_from_the_Tour_Montparnasse_3.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_york_times_square-terabass.jpg/1200px-New_york_times_square-terabass.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Sydney_Opera_House_2010.jpg/1200px-Sydney_Opera_House_2010.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Taj_Mahal_in_March_2004.jpg/1200px-Taj_Mahal_in_March_2004.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg/1200px-Colosseum_in_Rome%2C_Italy_-_April_2007.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Machu_Picchu%2C_Peru.jpg/1200px-Machu_Picchu%2C_Peru.jpg"
]

import random
for v in villas:
    if v['id'] >= 10:
        # Try direct wiki image for the villa name
        img = get_wiki_image(v['name'])
        if not img:
            # Fallback to the country's main wikipedia page image (usually a beautiful landscape or landmark)
            img = get_wiki_image(v['location'])
        if not img:
            # Absolute fallback
            img = random.choice(fallback_images)
        
        v['image'] = img

ts_content = "export const villasData = [\n"
for v in villas:
    desc = v['description'].replace("'", "\\'")
    name = v['name'].replace("'", "\\'")
    location = v['location'].replace("'", "\\'")
    ts_content += "    {\n"
    ts_content += f"        id: {v['id']},\n"
    ts_content += f"        name: '{name}',\n"
    ts_content += f"        price: '{v['price']}',\n"
    ts_content += f"        description: '{desc}',\n"
    ts_content += f"        image: '{v['image']}',\n"
    ts_content += f"        bedrooms: {v['bedrooms']},\n"
    ts_content += f"        guests: {v['guests']},\n"
    ts_content += f"        amenity: '{v['amenity']}',\n"
    ts_content += f"        location: '{location}'\n"
    ts_content += "    },\n"
ts_content += "];\n"

with open(target, 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("Updated with REAL Wikimedia images!")
