const photoIds = [
  'photo-1515542690876-879f04b766f7',
  'photo-1618083707368-b3823daa2726',
  'photo-1584467541268-b029fb348239'
];

async function check(id) {
  const url = `https://images.unsplash.com/${id}?w=100`;
  try {
    const res = await fetch(url);
    console.log(`${id} -> ${res.status}`);
  } catch (e) {
    console.log(`${id} -> Error: ${e.message}`);
  }
}

(async () => {
  for (const id of photoIds) {
    await check(id);
    await new Promise(r => setTimeout(r, 400));
  }
})();
