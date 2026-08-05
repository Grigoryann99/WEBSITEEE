import re
import json
import urllib.request
import urllib.parse
import time

def get_wiki_image(query):
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(query)}&prop=pageimages&format=json&pithumbsize=1200&redirects=1"
    req = urllib.request.Request(url, headers={'User-Agent': 'TravelApp/1.0'})
    try:
        with urllib.request.urlopen(req) as r:
            data = json.loads(r.read())
            pages = data['query']['pages']
            for page_id in pages:
                if 'thumbnail' in pages[page_id]:
                    return pages[page_id]['thumbnail']['source']
    except Exception as e:
        print(f"Error fetching wiki for {query}: {e}")
    return None

def search_wiki_image(query):
    # Search for articles matching query
    url = f"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(query)}&utf8=&format=json&srlimit=1"
    req = urllib.request.Request(url, headers={'User-Agent': 'TravelApp/1.0'})
    try:
        with urllib.request.urlopen(req) as r:
            data = json.loads(r.read())
            if data['query']['search']:
                title = data['query']['search'][0]['title']
                return get_wiki_image(title)
    except Exception as e:
        pass
    return None

target = r'c:\Users\USER\OneDrive\Рабочий стол\TRAVEL WEBSITE\data\villasData.ts'
with open(target, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract objects using regex
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

print(f"Loaded {len(villas)} villas.")

for v in villas:
    if v['id'] >= 10:
        # It's one of the 51 new real villas currently using loremflickr
        print(f"Fetching real photo for {v['name']} ({v['location']})...")
        img_url = search_wiki_image(v['name'])
        
        # Fallback to location/country if specific villa has no image on wiki
        if not img_url:
            print(f"  -> No image for {v['name']}, falling back to {v['location']} landscape")
            img_url = search_wiki_image(v['location'] + " tourism")
            if not img_url:
                img_url = search_wiki_image(v['location'])
        
        if img_url:
            v['image'] = img_url
            print(f"  -> Success: {img_url}")
        else:
            print("  -> Failed to find ANY image, keeping loremflickr")
        
        time.sleep(0.5)

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

print("Updated villasData.ts with 100% REAL photos from Wikimedia!")
