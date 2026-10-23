"""
=================================================================
AUTOMATED IMAGE REPLACEMENT FOR GOOGLE ADSENSE COMPLIANCE
=================================================================
Uses: Unsplash API (primary) + Wikimedia Commons (fallback, no rate limit)

Strategy:
  1. Try Wikimedia Commons first (no rate limit, good for famous landmarks)
  2. If Wikimedia fails, use Unsplash API (50 req/hr limit)
  3. Saves progress to JSON - can stop and resume anytime
  4. Automatically updates .ts data files with new image paths
"""

import os
import re
import json
import time
import sys
import requests
from pathlib import Path

# ======= CONFIGURATION =======
UNSPLASH_KEY = os.environ.get("UNSPLASH_ACCESS_KEY", "")

BASE_DIR = Path(__file__).parent.parent
DATA_DIR = BASE_DIR / "data"
IMAGES_DIR = BASE_DIR / "public" / "images" / "attractions"
PROGRESS_FILE = Path(__file__).parent / "download_progress.json"

UNSPLASH_BATCH = 44  # leave some buffer under 50
WAIT_SECONDS = 3660  # 61 minutes between batches


def slugify(text):
    """Convert text to a URL-friendly slug."""
    text = text.lower()
    replacements = {
        'á': 'a', 'à': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a',
        'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
        'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i',
        'ó': 'o', 'ò': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ø': 'o',
        'ú': 'u', 'ù': 'u', 'û': 'u', 'ü': 'u',
        'ñ': 'n', 'ç': 'c', 'ý': 'y', 'ÿ': 'y',
        'ð': 'd', 'þ': 'th',
        'ž': 'z', 'š': 's', 'ř': 'r', 'č': 'c', 'ě': 'e', 'ů': 'u',
        'ł': 'l', 'ś': 's', 'ź': 'z', 'ń': 'n', 'ć': 'c',
        'ş': 's', 'ğ': 'g', 'ı': 'i',
        'ā': 'a', 'ē': 'e', 'ī': 'i', 'ō': 'o', 'ū': 'u',
        "'": '', "'": '', "\u2019": '',
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    text = re.sub(r'[^a-z0-9]+', '-', text)
    text = text.strip('-')
    text = re.sub(r'-+', '-', text)
    return text


def get_country_slug(filename):
    """belgiumAttractions.ts -> belgium, southKoreaAttractions.ts -> south-korea"""
    name = filename.replace('Attractions.ts', '')
    slug = re.sub(r'([a-z])([A-Z])', r'\1-\2', name).lower()
    return slug


def scan_all_attractions():
    """Scan all data files and find attractions needing image replacement."""
    needs_replacement = []

    for ts_file in sorted(DATA_DIR.glob('*Attractions.ts')):
        country_slug = get_country_slug(ts_file.name)

        with open(ts_file, 'r', encoding='utf-8') as f:
            content = f.read()

        name_pattern = r'name:\s*["\']([^"\']+)["\']'
        location_pattern = r'location:\s*["\']([^"\']+)["\']'
        image_pattern = r'image:\s*["\']([^"\']+)["\']'

        names = re.findall(name_pattern, content)
        locations = re.findall(location_pattern, content)
        images = re.findall(image_pattern, content)

        for i in range(min(len(names), len(locations), len(images))):
            name = names[i]
            location = locations[i]
            image = images[i]

            is_placeholder = 'placeholder' in image.lower() or 'fallback' in image.lower()
            is_loremflickr = 'loremflickr.com' in image

            if is_placeholder or is_loremflickr:
                target_filename = f"{country_slug}-{slugify(name)}.jpg"
                target_path = f"/images/attractions/{target_filename}"

                needs_replacement.append({
                    'country': country_slug,
                    'name': name,
                    'location': location,
                    'current_image': image,
                    'target_filename': target_filename,
                    'target_path': target_path,
                    'source_file': str(ts_file),
                    'type': 'placeholder' if is_placeholder else 'loremflickr',
                })

    return needs_replacement


def search_wikimedia(query):
    """Search Wikimedia Commons for a high-quality landscape image."""
    try:
        r = requests.get(
            'https://commons.wikimedia.org/w/api.php',
            params={
                'action': 'query',
                'generator': 'search',
                'gsrsearch': query,
                'gsrnamespace': 6,
                'gsrlimit': 10,
                'prop': 'imageinfo',
                'iiprop': 'url|size|mime',
                'iiurlwidth': 1200,
                'format': 'json',
            },
            headers={
                'User-Agent': 'VeloraTravel/1.0 (image collection for travel website)'
            },
            timeout=15,
        )
        if r.status_code != 200:
            return None

        data = r.json()
        pages = data.get('query', {}).get('pages', {})

        for page_id, page in sorted(pages.items(), key=lambda x: x[1].get('index', 999)):
            ii = page.get('imageinfo', [{}])[0]
            mime = ii.get('mime', '')
            width = ii.get('width', 0)
            height = ii.get('height', 0)

            if mime in ('image/jpeg', 'image/png') and width >= 800 and width > height:
                thumb = ii.get('thumburl')
                if thumb:
                    return thumb

        return None
    except Exception as e:
        return None


def search_unsplash(query):
    """Search Unsplash for a landscape photo. Returns (url, remaining_requests)."""
    try:
        r = requests.get(
            'https://api.unsplash.com/search/photos',
            params={
                'query': query,
                'per_page': 3,
                'orientation': 'landscape',
            },
            headers={
                'Authorization': f'Client-ID {UNSPLASH_KEY}'
            },
            timeout=15,
        )
        remaining = int(r.headers.get('X-Ratelimit-Remaining', 50))

        if r.status_code in (403, 429):
            return None, 0

        if r.status_code != 200:
            return None, remaining

        data = r.json()
        results = data.get('results', [])

        if results:
            url = results[0]['urls']['regular']
            return url, remaining

        return None, remaining
    except Exception as e:
        return None, 50


def download_image(url, filepath):
    """Download an image and verify it's valid (JPEG/PNG, > 10KB)."""
    try:
        r = requests.get(url, timeout=30, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0'
        })
        if r.status_code != 200:
            return False

        data = r.content

        if data[:3] == b'\xff\xd8\xff' or data[:4] == b'\x89PNG':
            if len(data) > 10000:
                with open(filepath, 'wb') as f:
                    f.write(data)
                return True
        return False
    except Exception:
        return False


def update_ts_file(ts_filepath, attraction_name, old_image, new_path):
    """
    Update the .ts data file — replace the image path for a specific attraction.
    Uses line-by-line scanning to handle multiple placeholder references correctly.
    """
    with open(ts_filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    current_name = None
    replaced = False

    for i, line in enumerate(lines):
        name_match = re.search(r'name:\s*["\']([^"\']+)["\']', line)
        if name_match:
            current_name = name_match.group(1)

        if current_name == attraction_name and not replaced:
            image_match = re.search(r'(image:\s*["\'])([^"\']+)(["\'])', line)
            if image_match:
                lines[i] = line.replace(image_match.group(2), new_path)
                replaced = True

    if replaced:
        with open(ts_filepath, 'w', encoding='utf-8') as f:
            f.writelines(lines)

    return replaced


def load_progress():
    if PROGRESS_FILE.exists():
        with open(PROGRESS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {'completed': [], 'failed': [], 'stats': {'wikimedia': 0, 'unsplash': 0}}


def save_progress(progress):
    with open(PROGRESS_FILE, 'w', encoding='utf-8') as f:
        json.dump(progress, f, indent=2, ensure_ascii=False)


def log(msg):
    ts = time.strftime('%H:%M:%S')
    line = f"[{ts}] {msg}"
    print(line, flush=True)


def main():
    log("=" * 65)
    log("  AUTOMATED IMAGE REPLACEMENT (Unsplash + Wikimedia)")
    log("=" * 65)

    # Ensure output dir exists
    IMAGES_DIR.mkdir(parents=True, exist_ok=True)

    # Step 1 — scan
    log("Scanning all data files...")
    all_items = scan_all_attractions()
    log(f"Total needing replacement: {len(all_items)}")

    # Step 2 — load progress
    progress = load_progress()
    completed_set = set(progress['completed'])
    pending = [it for it in all_items if it['target_filename'] not in completed_set]
    log(f"Already completed: {len(completed_set)}")
    log(f"Remaining: {len(pending)}")

    if not pending:
        log("ALL DONE! No images remaining.")
        return

    # Step 3 — process
    unsplash_used = 0
    batch_start = time.time()
    wiki_ok = 0
    unsplash_ok = 0
    failed = 0

    for idx, item in enumerate(pending):
        name = item['name']
        location = item['location']
        country = item['country'].replace('-', ' ').title()
        target_filename = item['target_filename']
        target_filepath = IMAGES_DIR / target_filename

        log(f"[{idx+1}/{len(pending)}] {country} > {name} ({location})")

        # Already exists on disk?
        if target_filepath.exists() and target_filepath.stat().st_size > 10000:
            log(f"  -> EXISTS on disk ({target_filepath.stat().st_size // 1024}KB), updating .ts")
            update_ts_file(item['source_file'], name, item['current_image'], item['target_path'])
            progress['completed'].append(target_filename)
            save_progress(progress)
            continue

        url = None
        source = None

        # --- Strategy: Unsplash first (better accuracy), Wikimedia fallback ---

        # Try Unsplash API first (best quality, most accurate)
        if unsplash_used >= UNSPLASH_BATCH:
            elapsed = time.time() - batch_start if 'batch_start' in dir() else 9999
            wait_needed = max(0, WAIT_SECONDS - elapsed)
            if wait_needed > 60:
                log(f"  Unsplash batch limit ({unsplash_used}). Waiting {int(wait_needed/60)} min...")
                log(f"  Resume at ~{time.strftime('%H:%M', time.localtime(time.time() + wait_needed))}")
                time.sleep(wait_needed)
            unsplash_used = 0
            batch_start = time.time()

        # Search Unsplash with targeted queries
        search_queries = [
            f"{name} {location} landmark",
            f"{name} {country}",
            name,
        ]
        for search_q in search_queries:
            url, remaining = search_unsplash(search_q)
            unsplash_used += 1

            if remaining <= 2:
                log(f"  Unsplash rate limit near ({remaining} left). Waiting...")
                time.sleep(WAIT_SECONDS)
                unsplash_used = 0
                batch_start = time.time()

            if url:
                source = "Unsplash"
                break

            time.sleep(0.3)

        # Fallback: Wikimedia Commons (no rate limit)
        if not url:
            for wiki_query in [
                f"{name} {location}",
                f"{name} {country}",
                f"{name} landmark tourism",
                name,
            ]:
                url = search_wikimedia(wiki_query)
                if url:
                    source = "Wiki"
                    break

        # --- Download ---
        if url:
            ok = download_image(url, str(target_filepath))
            if ok:
                size_kb = target_filepath.stat().st_size // 1024
                update_ts_file(item['source_file'], name, item['current_image'], item['target_path'])
                log(f"  OK [{source}] {size_kb}KB -> {target_filename}")
                progress['completed'].append(target_filename)
                if source == "Wiki":
                    wiki_ok += 1
                    progress['stats']['wikimedia'] = progress['stats'].get('wikimedia', 0) + 1
                else:
                    unsplash_ok += 1
                    progress['stats']['unsplash'] = progress['stats'].get('unsplash', 0) + 1
            else:
                log(f"  FAIL download from {source}")
                progress['failed'].append(target_filename)
                failed += 1
        else:
            log(f"  NOT FOUND in either source")
            progress['failed'].append(target_filename)
            failed += 1

        save_progress(progress)
        time.sleep(0.3)

    # Final summary
    log("")
    log("=" * 65)
    log("  FINISHED!")
    log(f"  Wikimedia:  {wiki_ok}")
    log(f"  Unsplash:   {unsplash_ok}")
    log(f"  Failed:     {failed}")
    log(f"  Total done: {len(progress['completed'])}")
    log("=" * 65)


if __name__ == '__main__':
    main()
