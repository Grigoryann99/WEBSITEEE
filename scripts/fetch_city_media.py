"""Resolve real, attributable photos for the Rome pilot places.

- Landmarks/markets/hotels with a Wikipedia article -> Wikimedia Commons lead image
  (credit + license pulled from Commons extmetadata).
- Venues without a free photo -> Unsplash search for the dish/type, flagged representative.

Output: scratch/rome-media-candidates.json. Review identity, licence and credits
before copying a candidate into data/catalog/rome.json. Never publishes automatically.
"""
import json, os, re, sys, urllib.parse, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "scratch" / "rome-media-candidates.json"
UA = {"User-Agent": "VeloraTravel/1.0 (support@veloratravel.org)"}

WIKI = {
    "colosseum": "Colosseum",
    "roman-forum": "Roman_Forum",
    "pantheon": "Pantheon,_Rome",
    "vatican-museums": "Vatican_Museums",
    "st-peters-basilica": "St._Peter's_Basilica",
    "trevi-fountain": "Trevi_Fountain",
    "borghese-gallery": "Galleria_Borghese",
    "spanish-steps": "Spanish_Steps",
    "castel-sant-angelo": "Castel_Sant'Angelo",
    "trastevere-walk": "Trastevere",
    "capitoline-museums": "Capitoline_Museums",
    "baths-of-caracalla": "Baths_of_Caracalla",
    "campo-de-fiori-market": "Campo_de'_Fiori",
    "testaccio-market": "Testaccio",
    "porta-portese": "Porta_Portese",
    "via-condotti": "Via_dei_Condotti",
    "hotel-de-russie": "Hotel_de_Russie",
    "leonardo-express": "Leonardo_Express",
    "ciampino-transfer": "Ciampino–G._B._Pastine_International_Airport",
    "rome-metro": "Rome_Metro",
    "historic-centre-walk": "Piazza_Navona",
    "fco-taxi": "Leonardo_da_Vinci–Fiumicino_Airport",
    "sant-eustachio": "Sant'Eustachio_il_Caffè",
    "giolitti": "Giolitti",
    "castel-romano-outlet": "Castel_Romano",
}

UNSPLASH = {
    "roscioli-salumeria": "carbonara pasta",
    "da-enzo": "roman trattoria pasta",
    "armando-al-pantheon": "italian restaurant table",
    "pizzarium": "pizza al taglio",
    "antico-forno-roscioli": "pizza bianca bakery",
    "trapizzino": "italian street food",
    "freni-e-frizioni": "aperitivo spritz",
    "drink-kong": "cocktail bar neon",
    "bar-del-fico": "piazza bar evening rome",
    "volpetti": "italian deli cheese",
    "antica-caciara": "pecorino cheese wheel",
    "ai-monasteri": "herbal liqueur bottles",
    "hotel-artemide": "classic hotel room",
    "the-beehive": "boutique hostel room",
    "hotel-santa-maria": "courtyard hotel italy",
    "hotel-raphael": "ivy covered building rome",
    "generator-rome": "hostel lounge",
    "sant-eustachio": "espresso cup",
    "giolitti": "gelato",
}


def get(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.loads(r.read().decode("utf-8"))


def strip_html(s):
    return re.sub(r"<[^>]+>", "", s or "").strip()


def commons_for(title):
    q = urllib.parse.urlencode({
        "action": "query", "format": "json", "prop": "pageimages",
        "piprop": "name", "titles": title, "redirects": 1,
    })
    data = get(f"https://en.wikipedia.org/w/api.php?{q}")
    page = next(iter(data["query"]["pages"].values()))
    name = page.get("pageimage")
    if not name:
        return None
    q = urllib.parse.urlencode({
        "action": "query", "format": "json", "prop": "imageinfo",
        "iiprop": "url|extmetadata", "iiurlwidth": 1400, "titles": f"File:{name}",
    })
    data = get(f"https://commons.wikimedia.org/w/api.php?{q}")
    page = next(iter(data["query"]["pages"].values()))
    info = (page.get("imageinfo") or [None])[0]
    if not info:
        return None
    meta = info.get("extmetadata", {})
    artist = strip_html(meta.get("Artist", {}).get("value")) or "Wikimedia Commons"
    lic = strip_html(meta.get("LicenseShortName", {}).get("value"))
    return {
        "src": info.get("thumburl") or info["url"],
        "credit": f"{artist[:80]} · {lic} · Wikimedia Commons".strip(" ·"),
        "creditUrl": info.get("descriptionurl"),
        "representative": False,
    }


def unsplash_for(query, key):
    q = urllib.parse.urlencode({"query": query, "per_page": 1, "orientation": "landscape", "content_filter": "high"})
    req = urllib.request.Request(f"https://api.unsplash.com/search/photos?{q}", headers={**UA, "Authorization": f"Client-ID {key}"})
    with urllib.request.urlopen(req, timeout=20) as r:
        data = json.loads(r.read().decode("utf-8"))
    if not data.get("results"):
        return None
    p = data["results"][0]
    return {
        "src": p["urls"]["raw"] + "&w=1400&q=80&auto=format&fit=crop",
        "credit": f"{p['user']['name']} · Unsplash",
        "creditUrl": p["links"]["html"] + "?utm_source=veloratravel&utm_medium=referral",
        "representative": True,
    }


def main():
    env = (ROOT / ".env.local").read_text(encoding="utf-8") if (ROOT / ".env.local").exists() else ""
    m = re.search(r"UNSPLASH_ACCESS_KEY=(\S+)", env)
    key = os.environ.get("UNSPLASH_ACCESS_KEY") or (m.group(1) if m else None)

    out = json.loads(OUT.read_text(encoding="utf-8")) if OUT.exists() else {}
    for pid, title in WIKI.items():
        if pid in out:
            continue
        try:
            r = commons_for(title)
            if r:
                out[pid] = r
                print("wiki ok", pid)
            else:
                print("wiki none", pid)
        except Exception as e:
            print("wiki fail", pid, e, file=sys.stderr)

    if key:
        for pid, query in UNSPLASH.items():
            if pid in out:
                continue
            try:
                r = unsplash_for(query, key)
                if r:
                    out[pid] = r
                    print("unsplash ok", pid)
            except Exception as e:
                print("unsplash fail", pid, e, file=sys.stderr)
    else:
        print("No UNSPLASH_ACCESS_KEY — skipping representative photos", file=sys.stderr)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(out, indent=2, ensure_ascii=False), encoding="utf-8")
    print("wrote", len(out), "entries")


if __name__ == "__main__":
    main()
