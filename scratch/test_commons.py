import urllib.request
import urllib.parse
import json

def test_commons(query):
    # Namespace 6 is 'File:'
    url = f"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(query)}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url&format=json"
    req = urllib.request.Request(url, headers={'User-Agent': 'TravelAppBot/1.0'})
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read())
            pages = data.get('query', {}).get('pages', {})
            for page_id, page_data in pages.items():
                title = page_data.get('title', '').lower()
                imageinfo = page_data.get('imageinfo', [{}])[0]
                img_url = imageinfo.get('url', '')
                
                # Check valid image extension
                if not (img_url.endswith('.jpg') or img_url.endswith('.png')):
                    continue
                
                # Check banned words
                if any(b in title for b in ['flag', 'map', 'logo', 'coat of arms', 'locator', 'blank']):
                    continue
                
                # Enforce relevance: The image title should contain at least one major word from the query
                # to prevent generic fallback images.
                query_words = set(query.lower().split())
                title_words = set(title.replace('file:', '').replace('.jpg', '').replace('.png', '').replace('-', ' ').replace('_', ' ').split())
                
                # Keep words > 3 letters
                query_words = {w for w in query_words if len(w) > 3}
                
                if query_words and not query_words.intersection(title_words):
                    print(f"[{query}] Skipped irrelevant title: {title}")
                    continue
                
                print(f"[{query}] Found: {title} -> {img_url}")
                return img_url
    except Exception as e:
        print(f"Error: {e}")
    print(f"[{query}] No image found.")
    return None

test_commons("Wachau Valley")
test_commons("Caño Cristales")
test_commons("Okinawa Beaches")
test_commons("Isle of Skye")
test_commons("Jaffna Peninsula")
test_commons("Wadi al-Hasa")
