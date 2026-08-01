import os, re

d = r"c:\Users\USER\OneDrive\Рабочий стол\TRAVEL WEBSITE\public\images\attractions"
DATA_DIR = r"c:\Users\USER\OneDrive\Рабочий стол\TRAVEL WEBSITE\data"

# Find all image paths actually referenced in data files
referenced = set()
for af in os.listdir(DATA_DIR):
    if not af.endswith("Attractions.ts"):
        continue
    with open(os.path.join(DATA_DIR, af), "r", encoding="utf-8") as f:
        content = f.read()
    for m in re.findall(r'/images/attractions/([^"]+)', content):
        referenced.add(m)

all_files = set(os.listdir(d))
unreferenced = all_files - referenced

deleted = 0
for f in sorted(unreferenced):
    p = os.path.join(d, f)
    sz = os.path.getsize(p)
    os.remove(p)
    print(f"Deleted: {f} ({sz} bytes)")
    deleted += 1

remaining = len(os.listdir(d))
print(f"\nDeleted {deleted} orphan files. Remaining: {remaining} files.")
