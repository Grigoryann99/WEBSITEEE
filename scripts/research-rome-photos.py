"""Find public Commons candidates for editorial review; never changes the catalog."""
import concurrent.futures
import html
import json
import re
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
QUERIES = {
    'vatican-museums': 'Vatican Museums entrance',
    'borghese-gallery': 'Galleria Borghese exterior',
    'da-enzo': '"Da Enzo" Rome',
    'antico-forno-roscioli': 'Roscioli Rome',
    'castel-romano-outlet': '"Castel Romano" outlet',
    'rinascente-tritone': 'Rinascente Tritone',
    'feltrinelli-argentina': 'Feltrinelli Argentina Rome',
    'castroni-cola': 'Castroni Rome',
    'fabriano-babuino': 'Fabriano Babuino',
    'momoni-babuino': 'Momoni Rome',
    'hotel-de-russie': '"Hotel de Russie" Rome',
    'hotel-santa-maria': '"Hotel Santa Maria" Rome',
}

def plain(value):
    return html.unescape(re.sub('<[^>]+>', '', value or '')).strip()

def search(item):
    pid, query = item
    params = urllib.parse.urlencode({'action': 'query', 'format': 'json', 'generator': 'search',
        'gsrnamespace': 6, 'gsrsearch': query, 'gsrlimit': 6, 'prop': 'imageinfo',
        'iiprop': 'url|extmetadata|size|mime', 'iiurlwidth': 1200})
    request = urllib.request.Request('https://commons.wikimedia.org/w/api.php?' + params,
        headers={'User-Agent': 'VeloraTravelMediaReview/1.0 (public photo attribution audit)'})
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            data = json.load(response)
        candidates = []
        for page in data.get('query', {}).get('pages', {}).values():
            info = (page.get('imageinfo') or [{}])[0]
            meta = info.get('extmetadata', {})
            candidates.append({'title': page['title'], 'sourceUrl': info.get('descriptionurl'),
                'downloadUrl': info.get('thumburl') or info.get('url'), 'originalUrl': info.get('url'),
                'mime': info.get('mime'), 'width': info.get('width'), 'height': info.get('height'),
                'description': plain(meta.get('ImageDescription', {}).get('value')),
                'artist': plain(meta.get('Artist', {}).get('value')),
                'license': plain(meta.get('LicenseShortName', {}).get('value')),
                'licenseUrl': meta.get('LicenseUrl', {}).get('value'),
                'restrictions': plain(meta.get('Restrictions', {}).get('value')),
                'attribution': plain(meta.get('Attribution', {}).get('value'))})
        return pid, {'query': query, 'candidates': candidates}
    except Exception as error:
        return pid, {'query': query, 'error': str(error), 'candidates': []}

if __name__ == '__main__':
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        result = dict(pool.map(search, QUERIES.items()))
    output = ROOT / 'scratch/rome-photo-research.json'
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
    for pid, entry in result.items():
        print(pid, json.dumps([(c['title'], c['license']) for c in entry['candidates']], ensure_ascii=True), entry.get('error', ''))
