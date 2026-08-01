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

if not duplicates:
    print("No duplicates found by MD5.")
else:
    for h, files in duplicates.items():
        print(f"Hash {h} has {len(files)} identical files:")
        for f in files:
            print(f"  - {f}")
