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

def search_commons_strict(query):
    # Namespace 6 is 'File:'
    url = f"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(query)}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url&format=json"
    headers = {'User-Agent': 'TravelAppBot/1.0 (https://github.com/example/travel; support@example.com)'}
    
    time.sleep(1) # delay to avoid rate limit
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read())
            pages = data.get('query', {}).get('pages', {})
            for page_id, page_data in pages.items():
                title = page_data.get('title', '').lower()
                imageinfo = page_data.get('imageinfo', [{}])[0]
                img_url = imageinfo.get('url', '')
                
                # Check valid image extension
                if not (img_url.endswith('.jpg') or img_url.endswith('.jpeg') or img_url.endswith('.png')):
                    continue
                
                # Check banned words
                if any(b in title for b in ['flag', 'map', 'logo', 'coat of arms', 'locator', 'blank', 'symbol', 'icon']):
                    continue
                
                # Relevance check
                query_words = set(query.lower().split())
                title_words = set(title.replace('file:', '').replace('.jpg', '').replace('.jpeg', '').replace('.png', '').replace('-', ' ').replace('_', ' ').split())
                
                # Keep words > 3 letters for strict matching
                query_words = {w for w in query_words if len(w) > 3}
                
                if query_words and not query_words.intersection(title_words):
                    continue
                
                return img_url
    except Exception as e:
        print(f"Error searching {query}: {e}")
    return None

def download_image(url, filepath):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as response:
            data = response.read()
            if b"Wikimedia Error" in data[:500]:
                return False
            with open(filepath, 'wb') as f:
                f.write(data)
            return True
    except Exception as e:
        print(f"Download error: {e}")
        return False

# First delete any files under 5KB since they are HTML errors
for f in os.listdir(ATTRACTIONS_DIR):
    p = os.path.join(ATTRACTIONS_DIR, f)
    if os.path.getsize(p) < 5000:
        os.remove(p)

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
                
                # First try strict search with just the name
                wiki_url = search_commons_strict(current_name)
                
                # If not found, try name + country
                if not wiki_url:
                    wiki_url = search_commons_strict(f"{current_name} {country}")
                
                if wiki_url:
                    print(f"  -> Found strict Commons image: {wiki_url}")
                    
                    ext = ".jpg"
                    if ".png" in wiki_url.lower(): ext = ".png"
                    
                    slug = slugify(current_name)
                    new_filename = f"{country}-{slug}{ext}"
                    out_path = os.path.join(ATTRACTIONS_DIR, new_filename)
                    
                    time.sleep(2)
                    success = download_image(wiki_url, out_path)
                    
                    if success and os.path.getsize(out_path) > 5000:
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
                    print(f"  -> No suitable image found on Commons")
                    failed_count += 1
                
    if modified:
        with open(filepath, "w", encoding="utf-8") as fh:
            fh.write('\n'.join(lines))
        updated_files += 1

print(f"Done! Downloaded {downloaded_count} strict images, Failed/Not Found: {failed_count}. Updated {updated_files} files.")
