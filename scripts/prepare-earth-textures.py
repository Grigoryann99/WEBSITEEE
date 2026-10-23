"""Prepare texture channels for the WebGL Earth. Requires Pillow."""
from pathlib import Path
from PIL import Image, ImageOps

source = Path('scripts/earth-source/packed.jpg')
target = Path('public/earth')
red, green, blue = Image.open(source).convert('RGB').split()
for channel, name in [(red, 'bump'), (ImageOps.invert(green), 'specular'), (blue, 'clouds')]:
    for width, suffix in [(2048, ''), (1024, '-mobile')]:
        image = channel.copy()
        image.thumbnail((width, width // 2))
        image.save(target / f'{name}{suffix}.webp', quality=86, method=6)
for name in ['day', 'night']:
    image = Image.open(target / f'{name}.jpg')
    image.thumbnail((2048, 1024))
    image.save(target / f'{name}-mobile.webp', quality=88, method=6)
print('Prepared 4K color/night imagery, 2K detail/clouds and reduced mobile maps.')
