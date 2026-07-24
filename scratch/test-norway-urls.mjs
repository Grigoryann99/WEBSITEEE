import https from 'https';

const urls = [
  "https://upload.wikimedia.org/wikipedia/commons/4/46/Geirangerfjord_.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a7/Aurora_Borealis_over_Troms%C3%B8.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/3b/Bryggen_in_Bergen%2C_Norway.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/c/c5/Pulpit_Rock_Preikestolen_Norway.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/c/c3/Reine_Lofoten_Norway.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/b/b6/Trolltunga_2017.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/0/0b/Fl%C3%A5msbana.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/6/6b/Frognerparken_vigeland.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/1/1a/Alesund_from_Aksla.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/8/87/Borgund_stave_church_2019.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/3d/Odda-Hardangerfjord.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/4/47/Sognefjord%2C_Norway.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/1/1a/Atlanterhavsveien_Norway.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a2/Nigardsbreen.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/d/d4/Nasjonalmuseet_Oslo_2022.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/4/4b/Jugendstilsenteret.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/7/71/Naer%C3%B8yfjorden.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/a/ad/Kjerakbolten_Freddy_Fish.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/36/R%C3%B8ros_street.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/8/8a/Besseggen_Jotunheimen.jpg"
];

function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.request(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      resolve({ url, status: res.statusCode });
    });
    req.on('error', () => resolve({ url, status: 'ERROR' }));
    req.end();
  });
}

async function testAll() {
  for (const u of urls) {
    const res = await checkUrl(u);
    console.log(`${res.status} : ${res.url}`);
    await new Promise(r => setTimeout(r, 200)); // 200ms delay to avoid rate limit
  }
}

testAll();
