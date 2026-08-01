import urllib.request
import urllib.parse
import json

def test_thumbnail_commons():
    url = "https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=filetype:bitmap%20Paris&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url&iiurlwidth=1024&format=json"
    headers = {'User-Agent': 'TravelAppBot/1.0 (https://github.com/example/travel; support@example.com)'}
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read())
        pages = data['query']['pages']
        for p in pages.values():
            thumburl = p['imageinfo'][0].get('thumburl')
            print(f"Thumb URL: {thumburl}")
            
            # Try to download the thumburl
            req2 = urllib.request.Request(thumburl, headers=headers)
            with urllib.request.urlopen(req2) as r2:
                print(f"Downloaded {len(r2.read())} bytes")

test_thumbnail_commons()
