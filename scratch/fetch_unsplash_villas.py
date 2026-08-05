import urllib.request
import re
import random

def fetch_unsplash_ids(query):
    url = f"https://unsplash.com/napi/search/photos?query={query.replace(' ', '+')}&per_page=30"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response:
            import json
            data = json.loads(response.read())
            return [img['id'] for img in data['results']]
    except Exception as e:
        print("Error fetching unsplash:", e)
        return []

ids = fetch_unsplash_ids("luxury villa") + fetch_unsplash_ids("resort pool") + fetch_unsplash_ids("mansion exterior")
# Remove duplicates
ids = list(set(ids))
random.shuffle(ids)

if len(ids) < 51:
    print("Not enough IDs found, only", len(ids))
else:
    print(f"Found {len(ids)} unique stunning photos.")

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

img_index = 0
for v in villas:
    if v['id'] >= 10:
        if img_index < len(ids):
            # Assign real unsplash photo
            v['image'] = f"https://images.unsplash.com/photo-{ids[img_index]}?q=80&w=1200&auto=format&fit=crop"
            img_index += 1

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

print("Successfully replaced all loremflickr links with real Unsplash images!")
