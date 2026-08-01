import os
import hashlib
from collections import defaultdict

DIR = r"c:\Users\USER\OneDrive\Рабочий стол\TRAVEL WEBSITE\public\images\attractions"

hashes = defaultdict(list)

for f in os.listdir(DIR):
    if not f.endswith(".jpg") and not f.endswith(".png"): continue
    p = os.path.join(DIR, f)
    with open(p, "rb") as fh:
        h = hashlib.md5(fh.read()).hexdigest()
    hashes[h].append(f)

duplicates = {k: v for k, v in hashes.items() if len(v) > 1}

deleted_count = 0
for h, files in duplicates.items():
    print(f"Removing {len(files)} duplicate files for hash {h}:")
    for f in files:
        p = os.path.join(DIR, f)
        os.remove(p)
        print(f"  - Deleted {f}")
        deleted_count += 1

print(f"Total deleted: {deleted_count}")
