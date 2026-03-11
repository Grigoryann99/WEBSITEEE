const fs = require('fs');

const extraDests = {
  france: [
    { name: "Chamonix-Mont-Blanc", city: "Chamonix", country: "France", description: "World-renowned alpine resort area at the base of Mont Blanc.", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800" },
    { name: "Bordeaux Vineyards", city: "Bordeaux", country: "France", description: "The world's wine capital, featuring historic châteaux and vast vineyards.", image: "https://images.unsplash.com/photo-1510525009512-ad7fc13eefab?auto=format&fit=crop&q=80&w=800" },
    { name: "Loire Valley Châteaux", city: "Loire Valley", country: "France", description: "A picturesque region renowned for Renaissance castles and lush gardens.", image: "https://images.unsplash.com/photo-1622615456570-52ccb1a20721?auto=format&fit=crop&q=80&w=800" },
    { name: "Corsica", city: "Ajaccio", country: "France", description: "A mountainous Mediterranean island mixing coastal towns and dense forests.", image: "https://images.unsplash.com/photo-1560962327-0b135cd2fc32?auto=format&fit=crop&q=80&w=800" },
    { name: "Strasbourg", city: "Strasbourg", country: "France", description: "The capital of the Grand Est region, famous for its Gothic cathedral and canals.", image: "https://images.unsplash.com/photo-1549487561-eb8e10c5ab06?auto=format&fit=crop&q=80&w=800" }
  ],
  italy: [
    { name: "Pompeii", city: "Naples", country: "Italy", description: "Ancient Roman city preserved almost perfectly under Mount Vesuvius ash.", image: "https://images.unsplash.com/photo-1520623214829-9e1d13fbe4e3?auto=format&fit=crop&q=80&w=800" },
    { name: "Lake Como", city: "Lombardy", country: "Italy", description: "An upscale resort area known for its dramatic scenery set against the Alps.", image: "https://images.unsplash.com/photo-1550020752-666359eb8a1c?auto=format&fit=crop&q=80&w=800" },
    { name: "Leaning Tower of Pisa", city: "Pisa", country: "Italy", description: "The iconic freestanding bell tower known worldwide for its nearly four-degree lean.", image: "https://images.unsplash.com/photo-1596772745344-934d4cd4c2a4?auto=format&fit=crop&q=80&w=800" },
    { name: "Sardinia", city: "Cagliari", country: "Italy", description: "A large Italian island in the Mediterranean with nearly 2,000 km of coastline.", image: "https://images.unsplash.com/photo-1531631557088-7e3e911296fa?auto=format&fit=crop&q=80&w=800" },
    { name: "Dolomites", city: "Trentino", country: "Italy", description: "A mountain range in northeastern Italy featuring jagged peaks and clear lakes.", image: "https://images.unsplash.com/photo-1463693396721-8ca0cfa2b3b5?auto=format&fit=crop&q=80&w=800" }
  ],
  japan: [
    { name: "Fushimi Inari Taisha", city: "Kyoto", country: "Japan", description: "Famous Shinto shrine celebrated for its thousands of vermilion torii gates.", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800" },
    { name: "Hiroshima Peace Memorial", city: "Hiroshima", country: "Japan", description: "A poignant park and museum dedicated to the victims of the atomic bombing.", image: "https://images.unsplash.com/photo-1624467576856-4c40212f45cc?auto=format&fit=crop&q=80&w=800" },
    { name: "Shirakawa-go", city: "Gifu", country: "Japan", description: "A traditional Japanese village known for its historic gassho-zukuri farmhouses.", image: "https://images.unsplash.com/photo-1579486221580-c1e138ae3440?auto=format&fit=crop&q=80&w=800" },
    { name: "Okinawa", city: "Naha", country: "Japan", description: "Japan's southern islands, featuring tropical climates, coral reefs, and beaches.", image: "https://images.unsplash.com/photo-1582260654060-e8354c4f3469?auto=format&fit=crop&q=80&w=800" },
    { name: "Hakone Hot Springs", city: "Hakone", country: "Japan", description: "A mountainous town known for its hot springs resorts and views of Mount Fuji.", image: "https://images.unsplash.com/photo-1583095111756-74fc2ef96dfc?auto=format&fit=crop&q=80&w=800" }
  ],
  spain: [
    { name: "Sagrada Familia", city: "Barcelona", country: "Spain", description: "Gaudí's iconic unfinished masterpiece combining Gothic and Art Nouveau forms.", image: "https://images.unsplash.com/photo-1582962770519-2165278cc440?auto=format&fit=crop&q=80&w=800" },
    { name: "Alhambra", city: "Granada", country: "Spain", description: "A stunning palace and fortress complex displaying Moorish architecture.", image: "https://images.unsplash.com/photo-1536098059082-f87c9f563dcb?auto=format&fit=crop&q=80&w=800" },
    { name: "Ibiza", city: "Balearic Islands", country: "Spain", description: "An island in the Mediterranean Sea known for lively nightlife and quiet villages.", image: "https://images.unsplash.com/photo-1534005111307-e836171881a5?auto=format&fit=crop&q=80&w=800" },
    { name: "Plaza Mayor", city: "Madrid", country: "Spain", description: "The grand central square at the heart of Madrid surrounded by historical buildings.", image: "https://images.unsplash.com/photo-1539031587849-0d12e694fb59?auto=format&fit=crop&q=80&w=800" },
    { name: "Mount Teide", city: "Tenerife", country: "Spain", description: "A volcano on Tenerife in the Canary Islands, the highest peak in Spain.", image: "https://images.unsplash.com/photo-1490214352526-7013583f73eb?auto=format&fit=crop&q=80&w=800" }
  ],
  greece: [
    { name: "Parthenon", city: "Athens", country: "Greece", description: "A former temple on the Athenian Acropolis, dedicated to the goddess Athena.", image: "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&q=80&w=800" },
    { name: "Oia Sunsets", city: "Santorini", country: "Greece", description: "Famous for picturesque sunsets and whitewashed houses climbing the rugged cliffs.", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800" },
    { name: "Meteora", city: "Thessaly", country: "Greece", description: "A rock formation hosting one of the largest complexes of Eastern Orthodox monasteries.", image: "https://images.unsplash.com/photo-1516489370617-e2fe9abcb71b?auto=format&fit=crop&q=80&w=800" },
    { name: "Mykonos Town", city: "Mykonos", country: "Greece", description: "A vibrant island destination celebrated for its beautiful beaches and vibrant nightlife.", image: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&q=80&w=800" },
    { name: "Knossos Palace", city: "Crete", country: "Greece", description: "The largest Bronze Age archaeological site on Crete, ceremonial and political center.", image: "https://images.unsplash.com/photo-1562217144-8cb314f31835?auto=format&fit=crop&q=80&w=800" }
  ],
  thailand: [
    { name: "Grand Palace", city: "Bangkok", country: "Thailand", description: "A complex of buildings at the heart of Bangkok, the official residence of the Kings.", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=800" },
    { name: "Phi Phi Islands", city: "Krabi", country: "Thailand", description: "An island group in Thailand famous for sheer cliffs dropping into the sea.", image: "https://images.unsplash.com/photo-1533604101037-77fb261ea2a4?auto=format&fit=crop&q=80&w=800" },
    { name: "Ayutthaya", city: "Ayutthaya", country: "Thailand", description: "The historic city containing majestic ruins of the second capital of Siam.", image: "https://images.unsplash.com/photo-1590393275628-86866ec82431?auto=format&fit=crop&q=80&w=800" },
    { name: "Doi Inthanon", city: "Chiang Mai", country: "Thailand", description: "The highest mountain in Thailand locally known as 'The Roof of Thailand'.", image: "https://images.unsplash.com/photo-1510617830919-dd777174e12e?auto=format&fit=crop&q=80&w=800" },
    { name: "Railay Beach", city: "Krabi", country: "Thailand", description: "A small peninsula reachable only by boat featuring stunning limestone cliffs.", image: "https://images.unsplash.com/photo-1543632930-b1d56af08306?auto=format&fit=crop&q=80&w=800" }
  ],
  uk: [
    { name: "Tower of London", city: "London", country: "UK", description: "A historic castle on the north bank of the River Thames in central London.", image: "https://images.unsplash.com/photo-1513635269975-5969336ac1cb?auto=format&fit=crop&q=80&w=800" },
    { name: "Stonehenge", city: "Wiltshire", country: "UK", description: "A prehistoric monument consisting of an outer ring of standing stones.", image: "https://images.unsplash.com/photo-1500057140807-f65df9d2bb90?auto=format&fit=crop&q=80&w=800" },
    { name: "Edinburgh Castle", city: "Edinburgh", country: "UK", description: "A historic fortress dominating the skyline of the city of Edinburgh.", image: "https://images.unsplash.com/photo-1506056627581-678cefc7addf?auto=format&fit=crop&q=80&w=800" },
    { name: "Roman Baths", city: "Bath", country: "UK", description: "Well-preserved thermae in the city of Bath, historically used for public bathing.", image: "https://images.unsplash.com/photo-1534067980599-2a91295b9a89?auto=format&fit=crop&q=80&w=800" },
    { name: "Scottish Highlands", city: "Inverness", country: "UK", description: "A historic region of Scotland known for dramatic landscapes and deep lochs.", image: "https://images.unsplash.com/photo-1467352382608-f4b67964dfbc?auto=format&fit=crop&q=80&w=800" }
  ],
  usa: [
    { name: "Grand Canyon", city: "Arizona", country: "USA", description: "A steep-sided canyon carved by the Colorado River in Arizona.", image: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&q=80&w=800" },
    { name: "Statue of Liberty", city: "New York", country: "USA", description: "A colossal neoclassical sculpture on Liberty Island in New York Harbor.", image: "https://images.unsplash.com/photo-1500080209535-717dd4ebaa6b?auto=format&fit=crop&q=80&w=800" },
    { name: "Yellowstone", city: "Wyoming", country: "USA", description: "The first national park featuring diverse wildlife and dramatic geothermal features.", image: "https://images.unsplash.com/photo-1490264028682-1dd58866e4a0?auto=format&fit=crop&q=80&w=800" },
    { name: "Golden Gate Bridge", city: "San Francisco", country: "USA", description: "A one-mile-wide suspension bridge connecting San Francisco Bay and the Pacific.", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=800" },
    { name: "Waikiki Beach", city: "Honolulu", country: "USA", description: "A renowned beachfront neighborhood of Honolulu on the south shore of Oahu.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800" }
  ],
  switzerland: [
    { name: "Matterhorn", city: "Zermatt", country: "Switzerland", description: "The iconic pyramidal peak towering over the Swiss Alpine town of Zermatt.", image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800" },
    { name: "Jungfraujoch", city: "Interlaken", country: "Switzerland", description: "A saddle in the Bernese Alps, accessible by railway as 'The Top of Europe'.", image: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&q=80&w=800" },
    { name: "Lake Geneva", city: "Geneva", country: "Switzerland", description: "A crescent-shaped lake spanning the Swiss-French border featuring pristine shores.", image: "https://images.unsplash.com/photo-1506551109886-6101f48c1ab9?auto=format&fit=crop&q=80&w=800" },
    { name: "Château de Chillon", city: "Montreux", country: "Switzerland", description: "An island castle located on Lake Geneva, an iconic historic monument.", image: "https://images.unsplash.com/photo-1577789423605-e4cc2b67ed62?auto=format&fit=crop&q=80&w=800" },
    { name: "Rhine Falls", city: "Neuhausen", country: "Switzerland", description: "The most powerful waterfall in Europe situated on the High Rhine.", image: "https://images.unsplash.com/photo-1601006155551-2d7c0018a1a9?auto=format&fit=crop&q=80&w=800" }
  ],
  mexico: [
    { name: "Chichén Itzá", city: "Yucatán", country: "Mexico", description: "A complex of Mayan ruins centrally featuring the El Castillo step pyramid.", image: "https://images.unsplash.com/photo-1518182170546-076616fdfaaf?auto=format&fit=crop&q=80&w=800" },
    { name: "Tulum", city: "Quintana Roo", country: "Mexico", description: "A magnificent coastal town known for its beaches and well-preserved ruins of a Mayan port city.", image: "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?auto=format&fit=crop&q=80&w=800" },
    { name: "Teotihuacan", city: "Mexico City", country: "Mexico", description: "A vast Mexican archaeological complex distinguished by significant pyramids.", image: "https://images.unsplash.com/photo-1582269986561-bd804eed4b00?auto=format&fit=crop&q=80&w=800" },
    { name: "Cabo San Lucas", city: "Baja California Sur", country: "Mexico", description: "A resort city situated at the southern tip of the Baja California Peninsula.", image: "https://images.unsplash.com/photo-1559827650-70f2f3e82d8c?auto=format&fit=crop&q=80&w=800" },
    { name: "Copper Canyon", city: "Chihuahua", country: "Mexico", description: "A breathtaking group of six distinct canyons in the Sierra Madre Occidental.", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800" }
  ]
};

function generateGeneric(slug, count) {
  const cap = slug.charAt(0).toUpperCase() + slug.slice(1);
  const arr = [];
  for(let i=1; i<=count; i++) {
    arr.push({
      name: `Premium Destination ${i}`,
      city: cap + ` Resort`,
      country: cap,
      description: `Experience the finest views, luxury amenities, and memorable cultural landmarks that ${cap} has to offer.`,
      image: `https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800`
    });
  }
  return arr;
}

const filePaths = ['lib/countryData.ts'];
for (const p of filePaths) {
  let content = fs.readFileSync(p, 'utf8');
  let newContent = content.replace(/([a-zA-Z_]+):\s*\{\s*\n\s*name:\s*"([^"]+)"([\s\S]*?)destinations:\s*\[([\s\S]*?)\n\s*\]\n\s*\}/g, (match, slug, name, mid, destsRaw) => {
    let toInject = extraDests[slug];
    if (!toInject) {
      toInject = generateGeneric(slug, 5);
    }
    const injectStr = toInject.map(d => {
      return `\n            {\n                name: "${d.name}",\n                city: "${d.city}",\n                country: "${d.country}",\n                description: "${d.description.replace(/"/g, '\\"')}",\n                image: "${d.image}"\n            }`;
    }).join(',');
    
    return `${slug}: {\n        name: "${name}"${mid}destinations: [${destsRaw},${injectStr}\n        ]\n    }`;
  });
  
  fs.writeFileSync(p, newContent);
  console.log('Successfully injected destinations!');
}
