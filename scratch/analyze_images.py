import os, re, hashlib
from collections import defaultdict

d = r"c:\Users\USER\OneDrive\Рабочий стол\TRAVEL WEBSITE\public\images\attractions"
DATA_DIR = r"c:\Users\USER\OneDrive\Рабочий стол\TRAVEL WEBSITE\data"

# 1. Find all image paths actually referenced in data files
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

print(f"Total files in folder: {len(all_files)}")
print(f"Referenced in data files: {len(referenced)}")
print(f"Unreferenced (orphan) files: {len(unreferenced)}")

# 2. Check for duplicate hashes
hashes = defaultdict(list)
for f in all_files:
    p = os.path.join(d, f)
    with open(p, "rb") as fh:
        h = hashlib.md5(fh.read()).hexdigest()
    hashes[h].append(f)

dupes = {k: v for k, v in hashes.items() if len(v) > 1}
dupe_count = sum(len(v) - 1 for v in dupes.values())
print(f"Duplicate files (by content): {dupe_count}")
for h, files in list(dupes.items())[:10]:
    print(f"  Hash {h[:12]}...: {files}")

print()
print("=== SAMPLE ORPHAN FILES ===")
for f in sorted(unreferenced)[:30]:
    sz = os.path.getsize(os.path.join(d, f))
    print(f"  {f} ({sz} bytes)")
