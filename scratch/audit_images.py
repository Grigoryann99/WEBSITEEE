"""
Script to audit all attraction images across all country data files.
Finds which attractions reference images that don't exist locally,
and identifies which countries are missing from the data entirely.
"""
import os
import re
import json

BASE = r"c:\Users\USER\OneDrive\Рабочий стол\TRAVEL WEBSITE"
DATA_DIR = os.path.join(BASE, "data")
ATTRACTIONS_DIR = os.path.join(BASE, "public", "images", "attractions")

# Get list of all existing attraction images
existing_images = set()
for f in os.listdir(ATTRACTIONS_DIR):
    existing_images.add(f)

# Parse all attraction files
attraction_files = [f for f in os.listdir(DATA_DIR) if f.endswith("Attractions.ts")]

results = {}
all_attractions = []
total_count = 0
missing_count = 0
small_file_count = 0

for af in sorted(attraction_files):
    filepath = os.path.join(DATA_DIR, af)
    with open(filepath, "r", encoding="utf-8") as fh:
        content = fh.read()
    
    # Extract country prefix from filename
    country = af.replace("Attractions.ts", "")
    
    # Find all image references
    image_refs = re.findall(r'image:\s*["\']([^"\']+)["\']', content)
    # Find all attraction names
    name_refs = re.findall(r'name:\s*["\']([^"\']+)["\']', content)
    
    missing = []
    small_files = []
    
    for i, img in enumerate(image_refs):
        total_count += 1
        name = name_refs[i] if i < len(name_refs) else f"Unknown #{i}"
        
        if img.startswith("/images/attractions/"):
            filename = img.split("/")[-1]
            full_path = os.path.join(ATTRACTIONS_DIR, filename)
            
            if filename not in existing_images:
                missing.append({"name": name, "image": img, "issue": "FILE_MISSING"})
                missing_count += 1
            elif os.path.getsize(full_path) < 5000:
                # Files under 5KB are likely broken/placeholder
                size = os.path.getsize(full_path)
                small_files.append({"name": name, "image": img, "size_bytes": size, "issue": "VERY_SMALL_FILE"})
                small_file_count += 1
        elif img.startswith("http"):
            # External URL - might need to be downloaded
            missing.append({"name": name, "image": img, "issue": "EXTERNAL_URL"})
            missing_count += 1
        
        all_attractions.append({
            "country": country,
            "name": name,
            "image": img
        })
    
    if missing or small_files:
        results[country] = {
            "total_attractions": len(image_refs),
            "missing": missing,
            "small_files": small_files
        }

# Countries in destinationsData.ts globalDestinations (50 countries listed)
listed_countries = [
    "Italy", "Spain", "France", "Greece", "Portugal", "Switzerland", "Austria",
    "Germany", "Netherlands", "Belgium", "United Kingdom", "Ireland", "Iceland",
    "Norway", "Sweden", "Finland", "Denmark", "Poland", "Czech Republic", "Hungary",
    "Turkey", "United Arab Emirates", "Qatar", "Jordan",
    "Thailand", "Japan", "South Korea", "Vietnam", "Indonesia", "Singapore",
    "Malaysia", "Philippines", "India", "Sri Lanka", "Maldives",
    "Australia", "New Zealand", "United States", "Canada", "Mexico",
    "Brazil", "Argentina", "Chile", "Peru", "Colombia", "Costa Rica", "Panama",
    "South Africa", "Morocco", "Egypt"
]

# Countries that have attraction data files
countries_with_data = [af.replace("Attractions.ts", "") for af in attraction_files]

# Countries that DON'T have attraction data files
listed_without_data = []
data_map = {
    "Italy": "italy", "Spain": "spain", "France": "france", "Greece": "greece",
    "Portugal": "portugal", "Switzerland": "switzerland", "Austria": "austria",
    "Germany": "germany", "Netherlands": "netherlands", "Belgium": "belgium",
    "United Kingdom": "uk", "Ireland": "ireland", "Iceland": "iceland",
    "Norway": "norway", "Sweden": "sweden", "Finland": "finland",
    "Denmark": "denmark", "Poland": "poland", "Czech Republic": "czech",
    "Hungary": "hungary", "Turkey": "turkey", "United Arab Emirates": "uae",
    "Qatar": "qatar", "Jordan": "jordan", "Thailand": "thailand",
    "Japan": "japan", "South Korea": "southKorea", "Vietnam": "vietnam",
    "Indonesia": "indonesia", "Singapore": "singapore", "Malaysia": "malaysia",
    "Philippines": "philippines", "India": "india", "Sri Lanka": "sriLanka",
    "Maldives": "maldives", "Australia": "australia", "New Zealand": "newZealand",
    "United States": "usa", "Canada": "canada", "Mexico": "mexico",
    "Brazil": "brazil", "Argentina": "argentina", "Chile": "chile",
    "Peru": "peru", "Colombia": "colombia", "Costa Rica": "costaRica",
    "Panama": "panama", "South Africa": "southAfrica", "Morocco": "morocco",
    "Egypt": "egypt", "Seychelles": "seychelles"
}

for country_name in listed_countries:
    slug = data_map.get(country_name, country_name.lower())
    if slug not in countries_with_data:
        listed_without_data.append(country_name)

print("=" * 80)
print(f"TRAVEL WEBSITE IMAGE AUDIT REPORT")
print("=" * 80)
print(f"\nTotal attraction entries across all files: {total_count}")
print(f"Total existing images in attractions folder: {len(existing_images)}")
print(f"Missing or external image references: {missing_count}")
print(f"Very small files (< 5KB, likely broken): {small_file_count}")
print(f"\nCountries with attraction data files: {len(attraction_files)}")
print(f"Countries listed in destinations without attraction data: {listed_without_data}")

print("\n" + "=" * 80)
print("COUNTRIES WITH IMAGE ISSUES:")
print("=" * 80)

for country, data in sorted(results.items()):
    print(f"\n--- {country.upper()} ({data['total_attractions']} attractions) ---")
    for m in data["missing"]:
        print(f"  [MISSING]: {m['name']} -> {m['image']}")
    for s in data["small_files"]:
        print(f"  [SMALL] ({s['size_bytes']}B): {s['name']} -> {s['image']}")

# Now let's count unique directions that need photos
print("\n" + "=" * 80)
print("SUMMARY OF ATTRACTIONS NEEDING PHOTOS:")
print("=" * 80)
directions_needing_photos = []
for country, data in sorted(results.items()):
    for m in data["missing"]:
        directions_needing_photos.append(f"{country}: {m['name']}")
    for s in data["small_files"]:
        directions_needing_photos.append(f"{country}: {s['name']}")

print(f"\nTotal directions needing suitable photos: {len(directions_needing_photos)}")
for i, d in enumerate(directions_needing_photos, 1):
    print(f"  {i}. {d}")
