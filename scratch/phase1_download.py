import os
import re
import requests
import time

BASE = r"c:\Users\USER\OneDrive\Рабочий стол\TRAVEL WEBSITE"
DATA_DIR = os.path.join(BASE, "data")
ATTRACTIONS_DIR = os.path.join(BASE, "public", "images", "attractions")

def slugify(text):
    return re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')

attraction_files = [f for f in os.listdir(DATA_DIR) if f.endswith("Attractions.ts")]

downloaded_count = 0
updated_files = 0
failed_count = 0

headers = {
    'User-Agent': 'TravelAppBot/1.0 (https://github.com/example/travel; support@example.com) requests/2.33.1',
}

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
            
        img_match = re.search(r'image:\s*(["\'])(https?://[^"\']+)\1', line)
        if img_match and current_name:
            url = img_match.group(2)
            print(f"Found external URL for {current_name} in {country}: {url}")
            
            ext = ".jpg"
            if ".png" in url.lower(): ext = ".png"
            elif ".jpeg" in url.lower(): ext = ".jpeg"
            
            slug = slugify(current_name)
            filename = f"{country}-{slug}{ext}"
            out_path = os.path.join(ATTRACTIONS_DIR, filename)
            
            # Download image
            try:
                # Be gentle to wikimedia
                time.sleep(1)
                
                # Use curl
                import subprocess
                cmd = [
                    "curl", 
                    "-s", 
                    "-L", 
                    "-o", out_path, 
                    "-H", "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                    url
                ]
                result = subprocess.run(cmd, capture_output=True)
                
                if result.returncode == 0 and os.path.getsize(out_path) > 1000:
                    print(f"  -> Saved to {filename}")
                    downloaded_count += 1
                    
                    # Update line
                    new_image_path = f"/images/attractions/{filename}"
                    lines[i] = re.sub(r'image:\s*(["\']).*?\1', f'image: "{new_image_path}"', line)
                    modified = True
                else:
                    print(f"  -> Failed to download {url} (curl exit {result.returncode}, size: {os.path.getsize(out_path) if os.path.exists(out_path) else 0})")
                    failed_count += 1
                    if os.path.exists(out_path): os.remove(out_path)
                
            except Exception as e:
                print(f"  -> Exception downloading {url}: {e}")
                failed_count += 1
                
    if modified:
        with open(filepath, "w", encoding="utf-8") as fh:
            fh.write('\n'.join(lines))
        updated_files += 1

print(f"Done! Downloaded {downloaded_count} images, Failed: {failed_count}. Updated {updated_files} files.")
