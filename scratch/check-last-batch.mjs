const titles = [
  'Amphawa Floating Market',
  'Damnoen Saduak District'
];

async function check(t) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(t)}&prop=pageimages&format=json&pithumbsize=1000`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Bot/1.0' } });
    const d = await res.json();
    const p = Object.values(d.query.pages)[0];
    const src = p?.thumbnail?.source || '';
    if (src) {
      console.log(`✓ "${t}" -> ${src.substring(0, 80)}`);
    } else {
      console.log(`✗ "${t}" -> NO IMAGE`);
    }
  } catch (e) {
    console.log(`✗ "${t}" -> Error: ${e.message}`);
  }
}

(async () => {
  for (const t of titles) {
    await check(t);
    await new Promise(r => setTimeout(r, 1000));
  }
})();
