const testTitles = [
  'Dalt Vila',
  'Es Vedrà',
  'Ibiza (town)',
  'City of Arts and Sciences',
  'L\'Hemisfèric',
  'L\'Oceanogràfic'
];

async function check(t) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(t)}&prop=pageimages&format=json&pithumbsize=1000`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Bot/1.0' } });
    const d = await res.json();
    const p = Object.values(d.query.pages)[0];
    const src = p?.thumbnail?.source || '';
    if (src) {
      console.log(`✓ "${t}" -> ${src}`);
    } else {
      console.log(`✗ "${t}" -> NO IMAGE`);
    }
  } catch (e) {
    console.log(`✗ "${t}" -> Error: ${e.message}`);
  }
}

(async () => {
  for (const t of testTitles) {
    await check(t);
    await new Promise(r => setTimeout(r, 1000));
  }
})();
