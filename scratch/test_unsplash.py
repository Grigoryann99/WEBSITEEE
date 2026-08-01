import urllib.request
import urllib.parse
import json
import re

def search_unsplash(query):
    url = f"https://unsplash.com/napi/search/photos?query={urllib.parse.quote(query)}&per_page=1"
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read())
            results = data.get('results', [])
            if results:
                img_url = results[0]['urls']['regular']
                print(f"[{query}] Found Unsplash: {img_url}")
                return img_url
    except Exception as e:
        print(f"Unsplash API error for {query}: {e}")
        
    # Fallback to HTML scraping
    html_url = f"https://unsplash.com/s/photos/{urllib.parse.quote(query)}"
    req = urllib.request.Request(html_url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            html = response.read().decode('utf-8', errors='ignore')
            # Look for "small_s3":"url" or something in the next.js state, or just a direct image tag
            matches = re.findall(r'https://images\.unsplash\.com/photo-[a-zA-Z0-9\-]+', html)
            if matches:
                # Get the first unique photo
                for m in matches:
                    if 'profile' not in m:
                        img_url = m + "?q=80&w=1200&auto=format&fit=crop"
                        print(f"[{query}] Scraped Unsplash: {img_url}")
                        return img_url
    except Exception as e:
        print(f"Unsplash HTML error for {query}: {e}")
        
    return None

search_unsplash("Wachau Valley")
search_unsplash("Caño Cristales Colombia")
