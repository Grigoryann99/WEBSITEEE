"""
Google AdSense Image Audit Script
==================================
Checks all 51 country pages (20 attractions each = ~1020 images) for:
1. Missing image files (404s)
2. Placeholder/stub images (заглушки)
3. Duplicate images (same file used multiple times)
4. Suspiciously small images (< 5KB — likely broken/placeholder)
5. Very small images (< 20KB — potentially low quality)
"""

import os
import re
import hashlib
import json
from collections import defaultdict

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
PUBLIC_DIR = os.path.join(BASE_DIR, "public")

def get_file_hash(filepath):
    """Calculate MD5 hash of a file to detect duplicates."""
    hasher = hashlib.md5()
    try:
        with open(filepath, 'rb') as f:
            for chunk in iter(lambda: f.read(8192), b''):
                hasher.update(chunk)
        return hasher.hexdigest()
    except:
        return None

def extract_images_from_ts(filepath):
    """Extract all image paths from a TypeScript attractions file."""
    images = []
    country_name = os.path.basename(filepath).replace("Attractions.ts", "")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all image: "/path/to/image" entries
    pattern = r'image:\s*["\']([^"\']+)["\']'
    matches = re.findall(pattern, content)
    
    # Also find attraction names to map them
    name_pattern = r'name:\s*["\']([^"\']+)["\']'
    names = re.findall(name_pattern, content)
    
    for i, img_path in enumerate(matches):
        attraction_name = names[i] if i < len(names) else f"Attraction #{i+1}"
        images.append({
            'country': country_name,
            'attraction': attraction_name,
            'image_path': img_path,
            'source_file': filepath
        })
    
    return images

def check_country_page_image(filepath):
    """Extract hero/banner images from country page components."""
    images = []
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find image references in components
    img_patterns = [
        r'src=["\']([^"\']*\.(jpg|jpeg|png|webp|svg))["\']',
        r'image:\s*["\']([^"\']+)["\']',
        r'backgroundImage.*?url\(["\']?([^"\')\s]+)["\']?\)',
    ]
    
    for pattern in img_patterns:
        matches = re.findall(pattern, content)
        for match in matches:
            img = match[0] if isinstance(match, tuple) else match
            images.append(img)
    
    return images

def main():
    print("=" * 80)
    print("🔍 GOOGLE ADSENSE IMAGE AUDIT REPORT")
    print("=" * 80)
    print()

    # Collect all images from data files
    all_images = []
    ts_files = sorted([f for f in os.listdir(DATA_DIR) if f.endswith("Attractions.ts")])
    
    print(f"📁 Found {len(ts_files)} country data files")
    print()

    for ts_file in ts_files:
        filepath = os.path.join(DATA_DIR, ts_file)
        images = extract_images_from_ts(filepath)
        all_images.extend(images)

    print(f"📸 Total image references found: {len(all_images)}")
    print()

    # === CHECK 1: MISSING FILES ===
    print("=" * 80)
    print("❌ CHECK 1: MISSING IMAGE FILES (файлы не существуют)")
    print("=" * 80)
    missing = []
    for img in all_images:
        # Convert web path to filesystem path
        rel_path = img['image_path'].lstrip('/')
        full_path = os.path.join(PUBLIC_DIR, rel_path)
        if not os.path.exists(full_path):
            missing.append(img)
    
    if missing:
        print(f"\n⚠️  НАЙДЕНО {len(missing)} ОТСУТСТВУЮЩИХ ФАЙЛОВ:")
        for m in missing:
            print(f"  [{m['country']}] {m['attraction']}: {m['image_path']}")
    else:
        print("\n✅ Все файлы изображений существуют")
    print()

    # === CHECK 2: PLACEHOLDER REFERENCES ===
    print("=" * 80)
    print("🚫 CHECK 2: ЗАГЛУШКИ (placeholder references)")
    print("=" * 80)
    placeholders = []
    placeholder_keywords = ['placeholder', 'fallback', 'default', 'dummy', 'sample', 'test', 'blank', 'no-image', 'noimage']
    
    for img in all_images:
        path_lower = img['image_path'].lower()
        for keyword in placeholder_keywords:
            if keyword in path_lower:
                placeholders.append((img, keyword))
                break
    
    if placeholders:
        print(f"\n⚠️  НАЙДЕНО {len(placeholders)} ССЫЛОК НА ЗАГЛУШКИ:")
        for p, kw in placeholders:
            print(f"  [{p['country']}] {p['attraction']}: {p['image_path']} (keyword: '{kw}')")
    else:
        print("\n✅ Прямых ссылок на заглушки не найдено")
    
    # Also check if placeholder.jpg exists and what uses it
    placeholder_files = []
    for root, dirs, files in os.walk(PUBLIC_DIR):
        for f in files:
            if 'placeholder' in f.lower() or 'fallback' in f.lower():
                placeholder_files.append(os.path.join(root, f))
    
    if placeholder_files:
        print(f"\n  📎 Файлы-заглушки в public/:")
        for pf in placeholder_files:
            rel = os.path.relpath(pf, PUBLIC_DIR)
            size = os.path.getsize(pf)
            print(f"    /{rel} ({size:,} bytes)")
    print()

    # === CHECK 3: DUPLICATE IMAGES (same hash) ===
    print("=" * 80)
    print("🔄 CHECK 3: ДУБЛИРУЮЩИЕСЯ ИЗОБРАЖЕНИЯ (одинаковые файлы)")
    print("=" * 80)
    hash_to_images = defaultdict(list)
    
    for img in all_images:
        rel_path = img['image_path'].lstrip('/')
        full_path = os.path.join(PUBLIC_DIR, rel_path)
        if os.path.exists(full_path):
            file_hash = get_file_hash(full_path)
            if file_hash:
                hash_to_images[file_hash].append(img)
    
    duplicates = {h: imgs for h, imgs in hash_to_images.items() if len(imgs) > 1}
    
    if duplicates:
        print(f"\n⚠️  НАЙДЕНО {len(duplicates)} ГРУПП ДУБЛИКАТОВ:")
        for hash_val, imgs in duplicates.items():
            print(f"\n  Hash: {hash_val[:12]}... ({len(imgs)} использований):")
            for img in imgs:
                print(f"    [{img['country']}] {img['attraction']}: {img['image_path']}")
    else:
        print("\n✅ Дублирующихся изображений не найдено")
    print()

    # === CHECK 4: SAME IMAGE PATH USED MULTIPLE TIMES ===
    print("=" * 80)
    print("📋 CHECK 4: ПОВТОРЯЮЩИЕСЯ ПУТИ (один путь на разных страницах)")
    print("=" * 80)
    path_to_usages = defaultdict(list)
    for img in all_images:
        path_to_usages[img['image_path']].append(img)
    
    repeated_paths = {p: usages for p, usages in path_to_usages.items() if len(usages) > 1}
    
    if repeated_paths:
        print(f"\n⚠️  НАЙДЕНО {len(repeated_paths)} ПОВТОРЯЮЩИХСЯ ПУТЕЙ:")
        for path, usages in repeated_paths.items():
            print(f"\n  {path} (используется {len(usages)} раз):")
            for u in usages:
                print(f"    [{u['country']}] {u['attraction']}")
    else:
        print("\n✅ Каждое изображение используется только один раз")
    print()

    # === CHECK 5: SUSPICIOUSLY SMALL FILES ===
    print("=" * 80)
    print("📏 CHECK 5: ПОДОЗРИТЕЛЬНО МАЛЕНЬКИЕ ФАЙЛЫ (возможные заглушки)")
    print("=" * 80)
    tiny_files = []  # < 5KB
    small_files = []  # < 20KB
    
    for img in all_images:
        rel_path = img['image_path'].lstrip('/')
        full_path = os.path.join(PUBLIC_DIR, rel_path)
        if os.path.exists(full_path):
            size = os.path.getsize(full_path)
            img['file_size'] = size
            if size < 5000:
                tiny_files.append(img)
            elif size < 20000:
                small_files.append(img)
    
    if tiny_files:
        print(f"\n🔴 КРИТИЧНО — {len(tiny_files)} файлов < 5KB (вероятно заглушки/broken):")
        for t in sorted(tiny_files, key=lambda x: x['file_size']):
            print(f"  {t['file_size']:>6,} bytes | [{t['country']}] {t['attraction']}: {t['image_path']}")
    
    if small_files:
        print(f"\n🟡 ВНИМАНИЕ — {len(small_files)} файлов < 20KB (возможно низкое качество):")
        for s in sorted(small_files, key=lambda x: x['file_size']):
            print(f"  {s['file_size']:>6,} bytes | [{s['country']}] {s['attraction']}: {s['image_path']}")
    
    if not tiny_files and not small_files:
        print("\n✅ Все файлы имеют нормальный размер")
    print()

    # === CHECK 6: SAME SIZE FILES (potential identical content) ===
    print("=" * 80)
    print("📐 CHECK 6: ФАЙЛЫ ОДИНАКОВОГО РАЗМЕРА (потенциальные клоны)")
    print("=" * 80)
    size_to_images = defaultdict(list)
    for img in all_images:
        rel_path = img['image_path'].lstrip('/')
        full_path = os.path.join(PUBLIC_DIR, rel_path)
        if os.path.exists(full_path):
            size = os.path.getsize(full_path)
            size_to_images[size].append(img)
    
    same_size = {s: imgs for s, imgs in size_to_images.items() if len(imgs) > 1}
    
    if same_size:
        print(f"\n⚠️  НАЙДЕНО {len(same_size)} ГРУПП С ОДИНАКОВЫМ РАЗМЕРОМ:")
        for size, imgs in sorted(same_size.items()):
            # Double-check with hash
            paths_and_hashes = []
            for img in imgs:
                rel_path = img['image_path'].lstrip('/')
                full_path = os.path.join(PUBLIC_DIR, rel_path)
                h = get_file_hash(full_path)
                paths_and_hashes.append((img, h))
            
            # Check if hashes are actually the same
            unique_hashes = set(h for _, h in paths_and_hashes)
            if len(unique_hashes) == 1:
                label = "🔴 ОДИНАКОВЫЕ ФАЙЛЫ"
            else:
                label = "🟡 Совпадение размера (разное содержимое)"
            
            print(f"\n  {label} — {size:,} bytes ({len(imgs)} файлов):")
            for img, h in paths_and_hashes:
                print(f"    [{img['country']}] {img['attraction']}: {img['image_path']} (hash: {h[:8]})")
    else:
        print("\n✅ Нет файлов с одинаковым размером")
    print()

    # === CHECK 7: COUNTRY BREAKDOWN ===
    print("=" * 80)
    print("📊 CHECK 7: СВОДКА ПО СТРАНАМ")
    print("=" * 80)
    country_stats = defaultdict(lambda: {'total': 0, 'missing': 0, 'tiny': 0})
    
    for img in all_images:
        rel_path = img['image_path'].lstrip('/')
        full_path = os.path.join(PUBLIC_DIR, rel_path)
        country_stats[img['country']]['total'] += 1
        if not os.path.exists(full_path):
            country_stats[img['country']]['missing'] += 1
        elif os.path.getsize(full_path) < 5000:
            country_stats[img['country']]['tiny'] += 1
    
    print(f"\n{'Страна':<25} {'Всего':>6} {'Отсутств.':>10} {'< 5KB':>8} {'Статус':>10}")
    print("-" * 65)
    for country in sorted(country_stats.keys()):
        stats = country_stats[country]
        status = "✅ OK" if stats['missing'] == 0 and stats['tiny'] == 0 else "⚠️ ISSUES"
        print(f"  {country:<23} {stats['total']:>6} {stats['missing']:>10} {stats['tiny']:>8} {status:>10}")
    print()

    # === FINAL SUMMARY ===
    print("=" * 80)
    print("📋 ИТОГОВЫЙ ОТЧЁТ ДЛЯ GOOGLE ADSENSE")
    print("=" * 80)
    total_issues = len(missing) + len(placeholders) + len(tiny_files) + sum(len(imgs) for imgs in duplicates.values())
    
    print(f"""
  📸 Всего изображений:           {len(all_images)}
  📁 Стран/направлений:           {len(ts_files)}
  
  ❌ Отсутствующих файлов:        {len(missing)}
  🚫 Ссылок на заглушки:          {len(placeholders)}
  🔄 Групп дубликатов:            {len(duplicates)} ({sum(len(imgs) for imgs in duplicates.values())} файлов)
  📋 Повторяющихся путей:         {len(repeated_paths)}
  🔴 Файлов < 5KB (заглушки):     {len(tiny_files)}
  🟡 Файлов < 20KB (низкое кач.): {len(small_files)}
  
  {'🔴 САЙТ НЕ ГОТОВ К ADSENSE — ЕСТЬ ПРОБЛЕМЫ!' if total_issues > 0 else '✅ САЙТ ГОТОВ К ADSENSE — ПРОБЛЕМ НЕ НАЙДЕНО'}
""")

    # Return data for further processing
    return {
        'total_images': len(all_images),
        'missing': missing,
        'placeholders': placeholders,
        'duplicates': duplicates,
        'repeated_paths': repeated_paths,
        'tiny_files': tiny_files,
        'small_files': small_files
    }

if __name__ == '__main__':
    main()
