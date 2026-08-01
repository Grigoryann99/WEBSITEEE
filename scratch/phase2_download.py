import os
import re
import time
import json
import urllib.request
import urllib.parse
import subprocess

BASE = r"c:\Users\USER\OneDrive\Рабочий стол\TRAVEL WEBSITE"
DATA_DIR = os.path.join(BASE, "data")
ATTRACTIONS_DIR = os.path.join(BASE, "public", "images", "attractions")

def slugify(text):
    return re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')

def is_banned_image(url):
    lower_url = url.lower()
    banned = ["flag", "map", "logo", "coat_of_arms", "emblem", "insignia", "symbol", "locator", "blank", ".svg"]
    for b in banned:
        if b in lower_url:
            return True
    return False

def search_wikipedia_image(query):
    # 1. Search for article
    search_url = f"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(query)}&utf8=&format=json"
    headers = {'User-Agent': 'TravelAppImageDownloader/1.0 (https://github.com/example/travel; support@example.com)'}
    
    time.sleep(2)
    req = urllib.request.Request(search_url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read())
            if not data.get('query') or not data['query'].get('search'):
                return None
            title = data['query']['search'][0]['title']
    except Exception as e:
        print(f"Error searching {query}: {e}")
        return None

    # 2. Get main image for article
    image_url = f"https://en.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=pageimages&format=json&pithumbsize=1200"
    
    time.sleep(2)
    req = urllib.request.Request(image_url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read())
            pages = data['query']['pages']
            page = list(pages.values())[0]
            if 'thumbnail' in page:
                url = page['thumbnail']['source']
                if not is_banned_image(url):
                    return url
            return None
    except Exception as e:
        print(f"Error getting image for {title}: {e}")
        return None

existing_images = set(os.listdir(ATTRACTIONS_DIR))
attraction_files = [f for f in os.listdir(DATA_DIR) if f.endswith("Attractions.ts")]

downloaded_count = 0
failed_count = 0
updated_files = 0

for af in sorted(attraction_files):
    filepath = os.path.join(DATA_DIR, af)
    with open(filepath, "r", encoding="utf-8") as fh:
        content = fh.read()
    
    country = af.replace("Attractions.ts", "")
    lines = content.split('\n')
    current_name = None
    modified = False
    
    for i, line in enumerate(lines):
        name_match = re.search(r'name:\s*["\']([^"\']+)["\']', line)
        if name_match:
            current_name = name_match.group(1)
            
        img_match = re.search(r'image:\s*(["\'])(/images/attractions/[^"\']+)\1', line)
        if img_match and current_name:
            img_path = img_match.group(2)
            filename = img_path.split('/')[-1]
            
            # If the file doesn't exist locally, we need to download it
            if filename not in existing_images:
                print(f"Missing {current_name} in {country}")
                
                # Try to find it on Wikipedia
                search_query = f"{current_name} {country}"
                wiki_url = search_wikipedia_image(search_query)
                
                if wiki_url:
                    print(f"  -> Found Wikipedia image: {wiki_url}")
                    
                    ext = ".jpg"
                    if ".png" in wiki_url.lower(): ext = ".png"
                    
                    slug = slugify(current_name)
                    new_filename = f"{country}-{slug}{ext}"
                    out_path = os.path.join(ATTRACTIONS_DIR, new_filename)
                    
                    # Download with curl
                    time.sleep(1)
                    cmd = ["curl", "-s", "-L", "-o", out_path, "-H", "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)", wiki_url]
                    result = subprocess.run(cmd, capture_output=True)
                    
                    if result.returncode == 0 and os.path.getsize(out_path) > 1000:
                        print(f"  -> Saved to {new_filename}")
                        downloaded_count += 1
                        existing_images.add(new_filename)
                        
                        # Update line if filename changed
                        if new_filename != filename:
                            new_image_path = f"/images/attractions/{new_filename}"
                            lines[i] = re.sub(r'image:\s*(["\']).*?\1', f'image: "{new_image_path}"', line)
                            modified = True
                    else:
                        print(f"  -> Failed to download from wiki")
                        failed_count += 1
                        if os.path.exists(out_path): os.remove(out_path)
                else:
                    print(f"  -> No suitable image found on Wikipedia")
                    failed_count += 1
                
    if modified:
        with open(filepath, "w", encoding="utf-8") as fh:
            fh.write('\n'.join(lines))
        updated_files += 1

print(f"Done! Downloaded {downloaded_count} images, Failed: {failed_count}. Updated {updated_files} files.")
