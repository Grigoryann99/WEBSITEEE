"""Download reviewed public candidates and prepare smaller local copies, without publishing."""
from pathlib import Path
import hashlib
import json
import urllib.request
from PIL import Image, ImageOps, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
STAGING = ROOT / 'scratch/rome-photo-staging'
STAGING.mkdir(parents=True, exist_ok=True)
selected = json.loads((ROOT / 'scratch/rome-photo-selected.json').read_text(encoding='utf-8'))
previous = json.loads((STAGING / 'manifest.json').read_text(encoding='utf-8')) if (STAGING / 'manifest.json').exists() else {}
manifest = {}
for pid, photo in selected.items():
    try:
        suffix = hashlib.sha256(photo['originalUrl'].encode()).hexdigest()[:12]
        target = STAGING / f'{pid}-{suffix}.jpg'
        legacy = STAGING / f'{pid}.jpg'
        if not target.exists() and legacy.exists() and previous.get(pid, {}).get('originalUrl') == photo['originalUrl']:
            target.write_bytes(legacy.read_bytes())
        if not target.exists():
            request = urllib.request.Request(photo['downloadUrl'], headers={'User-Agent': 'VeloraTravelMediaReview/1.0'})
            with urllib.request.urlopen(request, timeout=30) as response:
                content = response.read(15_000_001)
            if len(content) > 15_000_000:
                raise ValueError('Photo exceeds staging size limit')
            target.write_bytes(content)
        with Image.open(target) as source:
            image = ImageOps.exif_transpose(source).convert('RGB')
            image.thumbnail((1440, 1440), Image.Resampling.LANCZOS)
            output = STAGING / f'{pid}.webp'
            image.save(output, 'WEBP', quality=86, method=6)
        manifest[pid] = {**photo, 'outputFile': output.name,
            'sha256': hashlib.sha256(output.read_bytes()).hexdigest(), 'bytes': output.stat().st_size}
        print(pid, output.stat().st_size, flush=True)
    except Exception as error:
        print(pid, type(error).__name__, str(error), flush=True)
(STAGING / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
cards = []
for pid in manifest:
    with Image.open(STAGING / f'{pid}.webp') as image:
        card = Image.new('RGB', (400, 300), 'white')
        card.paste(ImageOps.fit(image, (400, 260)), (0, 0))
        ImageDraw.Draw(card).text((10, 273), pid, fill='black')
        cards.append(card)
if cards:
    sheet = Image.new('RGB', (1200, ((len(cards)+2)//3)*300), '#eeeeee')
    for index, card in enumerate(cards):
        sheet.paste(card, ((index%3)*400, (index//3)*300))
    sheet.save(STAGING / 'contact-sheet.jpg')
