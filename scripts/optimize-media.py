"""Create smaller display copies; retain all original photos unchanged."""
from pathlib import Path
from PIL import Image, ImageOps
import json

root = Path(__file__).resolve().parents[1]
sources = [*list((root / 'app').rglob('*.tsx')), *list((root / 'components').rglob('*.tsx')),
           *list((root / 'lib').rglob('*.ts')), *list((root / 'data').rglob('*.ts')),
           root / 'public/earth/destinations.json']
content = {p: p.read_text(encoding='utf-8') for p in sources if p.exists()}
changes = []
for folder in ['images', 'villas']:
    for photo in (root / 'public' / folder).rglob('*'):
        if not photo.is_file() or photo.suffix.lower() not in ['.jpg', '.jpeg', '.png'] or photo.stat().st_size < 500_000:
            continue
        old_url = '/' + photo.relative_to(root / 'public').as_posix()
        if not any(old_url in text for text in content.values()):
            continue
        output = photo.with_name(photo.stem + '.optimized.webp')
        with Image.open(photo) as source:
            image = ImageOps.exif_transpose(source).convert('RGB')
            image.thumbnail((1920, 1920), Image.Resampling.LANCZOS)
            image.save(output, 'WEBP', quality=90 if '/about/' in old_url else 84, method=6)
        new_url = '/' + output.relative_to(root / 'public').as_posix()
        if output.stat().st_size >= photo.stat().st_size:
            continue
        for file, text in content.items():
            content[file] = text.replace(old_url, new_url)
        changes.append({'source': old_url, 'display': new_url, 'before': photo.stat().st_size, 'after': output.stat().st_size})
for file, text in content.items():
    if file.read_text(encoding='utf-8') != text:
        file.write_text(text, encoding='utf-8')
(root / 'scratch/media-optimization.json').write_text(json.dumps(changes, indent=2), encoding='utf-8')
print(json.dumps({'photos': len(changes), 'before': sum(c['before'] for c in changes), 'after': sum(c['after'] for c in changes)}))
