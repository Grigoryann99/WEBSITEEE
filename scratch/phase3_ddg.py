import os
import re
import time
import urllib.request
from duckduckgo_search import DDGS
import subprocess

BASE = r"c:\Users\USER\OneDrive\Рабочий стол\TRAVEL WEBSITE"
DATA_DIR = os.path.join(BASE, "data")
ATTRACTIONS_DIR = os.path.join(BASE, "public", "images", "attractions")

def slugify(text):
    return re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')

def download_image(url, filepath):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            with open(filepath, 'wb') as f:
                f.write(response.read())
            return True
    except Exception as e:
        return False

def search_and_download(query, out_path):
    search_query = f"{query} travel photography high resolution"
    print(f"  Searching DDG for: {search_query}")
    try:
        results = DDGS().images(search_query, max_results=10)
        for r in results:
            url = r['image']
            title = r.get('title', '').lower()
            
            # Avoid generic/banned things
            if any(b in title for b in ['flag', 'map', 'logo', 'icon', 'vector', 'illustration']):
                continue
            if not (url.lower().endswith('.jpg') or url.lower().endswith('.jpeg') or url.lower().endswith('.png')):
                continue
                
            print(f"  -> Found DDG image: {url}")
            success = download_image(url, out_path)
            if success and os.path.getsize(out_path) > 20000: # at least 20kb for a good photo
                return True
            else:
                if os.path.exists(out_path): os.remove(out_path)
                print("  -> Download failed or file too small, trying next...")
                
    except Exception as e:
        print(f"  DDG Error: {e}")
    return False

existing_images = set(os.listdir(ATTRACTIONS_DIR))
attraction_files = [f for f in os.listdir(DATA_DIR) if f.endswith("Attractions.ts")]

downloaded_count = 0
failed_count = 0
updated_files = 0

ddgs = DDGS()

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
            
            if filename not in existing_images:
                print(f"Missing {current_name} in {country}")
                
                slug = slugify(current_name)
                ext = ".jpg"
                new_filename = f"{country}-{slug}{ext}"
                out_path = os.path.join(ATTRACTIONS_DIR, new_filename)
                
                success = search_and_download(f"{current_name} {country}", out_path)
                
                if success:
                    print(f"  -> Successfully saved {new_filename}")
                    downloaded_count += 1
                    existing_images.add(new_filename)
                    
                    if new_filename != filename:
                        new_image_path = f"/images/attractions/{new_filename}"
                        lines[i] = re.sub(r'image:\s*(["\']).*?\1', f'image: "{new_image_path}"', line)
                        modified = True
                else:
                    print(f"  -> Failed to find suitable image")
                    failed_count += 1
                
                time.sleep(1) # Be nice to DDG
                
    if modified:
        with open(filepath, "w", encoding="utf-8") as fh:
            fh.write('\n'.join(lines))
        updated_files += 1

print(f"Done! Downloaded {downloaded_count} via DDG, Failed: {failed_count}. Updated {updated_files} files.")
