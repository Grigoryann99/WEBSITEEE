import os
import re

BASE = r"c:\Users\USER\OneDrive\Рабочий стол\TRAVEL WEBSITE"
DATA_DIR = os.path.join(BASE, "data")
ATTRACTIONS_DIR = os.path.join(BASE, "public", "images", "attractions")

existing_images = set(os.listdir(ATTRACTIONS_DIR))
attraction_files = [f for f in os.listdir(DATA_DIR) if f.endswith("Attractions.ts")]

updated_files = 0
missing_count = 0

for af in sorted(attraction_files):
    filepath = os.path.join(DATA_DIR, af)
    with open(filepath, "r", encoding="utf-8") as fh:
        content = fh.read()
    
    country = af.replace("Attractions.ts", "")
    lines = content.split('\n')
    modified = False
    current_name = None
    
    for i, line in enumerate(lines):
        name_match = re.search(r'name:\s*["\']([^"\']+)["\']', line)
        if name_match:
            current_name = name_match.group(1)
            
        img_match = re.search(r'image:\s*(["\'])(/images/attractions/[^"\']+)\1', line)
        if img_match and current_name:
            img_path = img_match.group(2)
            filename = img_path.split('/')[-1]
            
            if filename not in existing_images:
                missing_count += 1
                
                # Format keyword: remove non-alphanumeric, use first two big words
                words = re.sub(r'[^a-zA-Z\s]', '', current_name).split()
                keywords = ",".join([w for w in words if len(w) > 3][:2])
                if not keywords: keywords = country
                
                # We use loremflickr with a lock so it doesn't change on refresh
                # We also add the country for context
                new_url = f"https://loremflickr.com/1200/800/{keywords},{country}/all?lock={missing_count}"
                
                # Replace line
                lines[i] = re.sub(r'image:\s*(["\']).*?\1', f'image: "{new_url}"', line)
                modified = True
                
    if modified:
        with open(filepath, "w", encoding="utf-8") as fh:
            fh.write('\n'.join(lines))
        updated_files += 1

print(f"Updated {updated_files} files with {missing_count} LoremFlickr URLs.")
