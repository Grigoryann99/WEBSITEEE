// Try broader Hawaii titles for Hana Highway image
const titles = ['Hawaii (island)', 'Maui', 'Wailua Falls', 'Rainbow Falls (Hawaii)', 'Akaka Falls'];
async function check(t) {
  const res = await fetch('https://en.wikipedia.org/w/api.php?action=query&titles=' + encodeURIComponent(t) + '&prop=pageimages&format=json&pithumbsize=1200', { headers: { 'User-Agent': 'Bot/1.0' } });
  const d = await res.json();
  const p = Object.values(d.query.pages)[0];
  const src = p?.thumbnail?.source || '';
  const bad = !src || src.includes('.svg') || src.includes('Flag_') || src.includes('Landsat') || src.includes('.PNG') || src.includes('Coat_');
  console.log(bad ? '✗' : '✓', t, '->', src ? src.substring(0, 110) : 'NO IMAGE');
  await new Promise(r => setTimeout(r, 800));
}
(async () => { for (const t of titles) await check(t); })();
