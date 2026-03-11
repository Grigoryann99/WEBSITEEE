const fs = require('fs');
const path = require('path');

// ABSOLUTE PATH TO THE PROJECT ROOT
const projectRoot = 'c:/Users/USER/OneDrive/Рабочий стол/TRAVEL WEBSITE';
const blogDataPath = path.join(projectRoot, 'lib', 'blogData.ts');

console.log('--- BLOG INJECTION START ---');
console.log('Target path:', blogDataPath);

if (!fs.existsSync(blogDataPath)) {
    console.error('ERROR: Target file does not exist at:', blogDataPath);
    process.exit(1);
}

let content = fs.readFileSync(blogDataPath, 'utf8');
console.log('Successfully read blogData.ts. Content length:', content.length);

const newPosts = [
    {
        slug: '14-day-japan-itinerary-first-timers',
        title: 'The Ultimate 14-Day Japan Itinerary for First-Timers',
        description: 'A comprehensive day-by-day guide to experiencing the best of Japan — from the neon lights of Tokyo to the ancient temples of Kyoto and the peaks of Hakone.',
        category: 'Itineraries',
        date: '2025-01-10',
        readTime: '15 min read',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop',
        content: `
Japan is a country that rewards careful planning. For a first-time visitor, 14 days is the perfect duration to experience the "Golden Route" — the classic path connecting the nation's most iconic landscapes and cities.

## Days 1-4: The Kinetic Energy of Tokyo

**Day 1: Arrival and Shinjuku.** Arrive at Narita or Haneda and head to Shinjuku. Start with the panoramic view from the Metropolitan Government Building, then explore the neon-lit alleys of Omoide Yokocho.

**Day 2: Tradition and Pop Culture.** Visit Senso-ji, Tokyo's oldest temple, in the morning. Afternoon in Harajuku's Takeshita Street and the serene Meiji Jingu shrine. End the day at the world's busiest intersection in Shibuya.

**Day 3: Digital Art and Toyosu.** Spend the morning at teamLab Borderless or Planets for an immersive digital art experience. Visit the Toyosu Fish Market for the freshest sushi lunch imaginable.

**Day 4: Day Trip to Nikko.** A two-hour train ride north leads to Nikko, home to the opulent Toshogu Shrine and the stunning Kegon Falls.

## Days 5-7: Mount Fuji and Hakone

**Day 5: The Romancecar to Hakone.** Take the Odakyu Romancecar from Shinjuku. Spend the day on the Hakone Circular Route: the cable car over the volcanic Owakudani valley, a pirate ship cruise across Lake Ashi, and views of Mt. Fuji.

**Day 6: Onsen and Art.** Visit the Hakone Open-Air Museum and spend the night in a traditional Ryokan with a private hot spring (onsen).

## Days 8-11: The Soul of Japan — Kyoto

**Day 8: Arashiyama and the Bamboo Grove.** Walk through the towering bamboo forest and visit the Tenryu-ji temple. In the afternoon, watch the sunset from the Kinkaku-ji (Golden Pavilion).

**Day 9: The Temples of Higashiyama.** Follow the stone-paved streets of Sannenzaka and Ninenzaka to Kiyomizu-dera. Spend the evening looking for Geisha in the Gion district.

**Day 10: Fushimi Inari and Nara.** Wake up early for the thousands of red torii gates at Fushimi Inari. In the afternoon, take a 45-minute train to Nara for the giant Buddha at Todai-ji and the famous roaming deer.

## Days 12-13: The Food Capital — Osaka

**Day 12: Dotonbori and Street Food.** Osaka is Japan's kitchen. Spend the evening in Dotonbori, eating takoyaki (octopus balls) and okonomiyaki (savory pancakes) under the giant neon signs.

**Day 13: Osaka Castle and Shinsekai.** Visit the historic Osaka Castle in the morning and explore the retro futuristic vibes of Shinsekai in the afternoon.

## Day 14: Final Souvenirs and Departure

Head back to Tokyo by Shinkansen for last-minute shopping at Ginza or Akihabara before departing from the airport.

---
**Pro Tip:** Get the JR Pass only if you plan to do significant long-distance travel beyond this route. For this specific 14-day trip, individual tickets or a regional pass might be more cost-effective in 2025.
`
    },
    {
        slug: 'bali-budget-vs-luxury',
        title: 'Bali on a Budget vs. Luxury: What Does It Really Cost?',
        description: 'Whether you are a digital nomad on a shoestring or a luxury traveler seeking private villas, we break down the real costs of a trip to Bali in 2025.',
        category: 'Practical Guides',
        date: '2025-01-12',
        readTime: '12 min read',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop',
        content: `
Bali is one of the few places in the world where a $20-a-day budget and $2,000-a-day lifestyle can exist on the same street. Understanding where to spend and where to save is key to a perfect Balinese escape.

## Accommodation: Simple Guesthouses vs. Private Villas

**Budget ($15–$30/night):** Look for 'Homestays'. These are often beautiful family compounds with private rooms, AC, and breakfast included. Canggu and Ubud have thousands of these.
**Luxury ($250–$2,000/night):** This gets you a private 2 or 3-bedroom villa with an infinity pool overlooking the rice terraces or the Indian Ocean. Resorts like the Four Seasons or Alila offer world-class service.

## Dining: Warungs vs. Fine Dining

**Budget ($2–$5/meal):** Eat at local 'Warungs'. A plate of Nasi Campur (mixed rice) is healthy, delicious, and incredibly cheap.
**Luxury ($50–$150/meal):** Seminyak and Canggu host world-class "Beach Clubs" (Potato Head, Finns) and fine dining spots like Mason or Merah Putih where international chefs reinvent Indonesian flavors.

## Transportation: Scooters vs. Private Drivers

**Budget ($5/day):** Renting a scooter is the most common way to get around, but it requires an International Driving Permit and confidence in chaotic traffic.
**Luxury ($40–$60/day):** Hiring a private car and driver for 10 hours is the ultimate luxury. It's safe, air-conditioned, and your driver often acts as an informal guide.

---
**Verdict:** Bali remains incredibly accessible. Even at the budget level, the quality of life is high. But if you have the means, the luxury experience in Bali is among the best in the world for value.
`
    }
    // (Truncated for safety in script generation, will re-add all in blocks if this works)
];

// Re-generating the full list within the script for completeness
const fullList = [
    {
        slug: '14-day-japan-itinerary-first-timers',
        title: 'The Ultimate 14-Day Japan Itinerary for First-Timers',
        description: 'A comprehensive day-by-day guide to experiencing the best of Japan — from the neon lights of Tokyo to the ancient temples of Kyoto and the peaks of Hakone.',
        category: 'Itineraries',
        date: '2025-01-10',
        readTime: '15 min read',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop',
        content: `
Japan is a country that rewards careful planning. For a first-time visitor, 14 days is the perfect duration to experience the "Golden Route" — the classic path connecting the nation's most iconic landscapes and cities.

## Days 1-4: The Kinetic Energy of Tokyo

**Day 1: Arrival and Shinjuku.** Arrive at Narita or Haneda and head to Shinjuku. Start with the panoramic view from the Metropolitan Government Building, then explore the neon-lit alleys of Omoide Yokocho.

**Day 2: Tradition and Pop Culture.** Visit Senso-ji, Tokyo's oldest temple, in the morning. Afternoon in Harajuku's Takeshita Street and the serene Meiji Jingu shrine. End the day at the world's busiest intersection in Shibuya.

**Day 3: Digital Art and Toyosu.** Spend the morning at teamLab Borderless or Planets for an immersive digital art experience. Visit the Toyosu Fish Market for the freshest sushi lunch imaginable.

**Day 4: Day Trip to Nikko.** A two-hour train ride north leads to Nikko, home to the opulent Toshogu Shrine and the stunning Kegon Falls.

## Days 5-7: Mount Fuji and Hakone

**Day 5: The Romancecar to Hakone.** Take the Odakyu Romancecar from Shinjuku. Spend the day on the Hakone Circular Route: the cable car over the volcanic Owakudani valley, a pirate ship cruise across Lake Ashi, and views of Mt. Fuji.

**Day 6: Onsen and Art.** Visit the Hakone Open-Air Museum and spend the night in a traditional Ryokan with a private hot spring (onsen).

## Days 8-11: The Soul of Japan — Kyoto

**Day 8: Arashiyama and the Bamboo Grove.** Walk through the towering bamboo forest and visit the Tenryu-ji temple. In the afternoon, watch the sunset from the Kinkaku-ji (Golden Pavilion).

**Day 9: The Temples of Higashiyama.** Follow the stone-paved streets of Sannenzaka and Ninenzaka to Kiyomizu-dera. Spend the evening looking for Geisha in the Gion district.

**Day 10: Fushimi Inari and Nara.** Wake up early for the thousands of red torii gates at Fushimi Inari. In the afternoon, take a 45-minute train to Nara for the giant Buddha at Todai-ji and the famous roaming deer.

## Days 12-13: The Food Capital — Osaka

**Day 12: Dotonbori and Street Food.** Osaka is Japan's kitchen. Spend the evening in Dotonbori, eating takoyaki (octopus balls) and okonomiyaki (savory pancakes) under the giant neon signs.

**Day 13: Osaka Castle and Shinsekai.** Visit the historic Osaka Castle in the morning and explore the retro futuristic vibes of Shinsekai in the afternoon.

## Day 14: Final Souvenirs and Departure

Head back to Tokyo by Shinkansen for last-minute shopping at Ginza or Akihabara before departing from the airport.

---
**Pro Tip:** Get the JR Pass only if you plan to do significant long-distance travel beyond this route. For this specific 14-day trip, individual tickets or a regional pass might be more cost-effective in 2025.
`
    },
    {
        slug: 'bali-budget-vs-luxury',
        title: 'Bali on a Budget vs. Luxury: What Does It Really Cost?',
        description: 'Whether you are a digital nomad on a shoestring or a luxury traveler seeking private villas, we break down the real costs of a trip to Bali in 2025.',
        category: 'Practical Guides',
        date: '2025-01-12',
        readTime: '12 min read',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop',
        content: `
Bali is one of the few places in the world where a $20-a-day budget and $2,000-a-day lifestyle can exist on the same street. Understanding where to spend and where to save is key to a perfect Balinese escape.

## Accommodation: Simple Guesthouses vs. Private Villas

**Budget ($15–$30/night):** Look for 'Homestays'. These are often beautiful family compounds with private rooms, AC, and breakfast included. Canggu and Ubud have thousands of these.
**Luxury ($250–$2,000/night):** This gets you a private 2 or 3-bedroom villa with an infinity pool overlooking the rice terraces or the Indian Ocean. Resorts like the Four Seasons or Alila offer world-class service.

## Dining: Warungs vs. Fine Dining

**Budget ($2–$5/meal):** Eat at local 'Warungs'. A plate of Nasi Campur (mixed rice) is healthy, delicious, and incredibly cheap.
**Luxury ($50–$150/meal):** Seminyak and Canggu host world-class "Beach Clubs" (Potato Head, Finns) and fine dining spots like Mason or Merah Putih where international chefs reinvent Indonesian flavors.

## Transportation: Scooters vs. Private Drivers

**Budget ($5/day):** Renting a scooter is the most common way to get around, but it requires an International Driving Permit and confidence in chaotic traffic.
**Luxury ($40–$60/day):** Hiring a private car and driver for 10 hours is the ultimate luxury. It's safe, air-conditioned, and your driver often acts as an informal guide.

---
**Verdict:** Bali remains incredibly accessible. Even at the budget level, the quality of life is high. But if you have the means, the luxury experience in Bali is among the best in the world for value.
`
    },
    {
        slug: 'safest-european-cities-solo-female-travelers',
        title: '10 Safest European Cities for Solo Female Travelers in 2025',
        description: 'Planning a solo trip? These European cities offer the perfect mix of safety, walkability, culture, and social atmosphere for women traveling alone.',
        category: 'Top Lists',
        date: '2025-01-15',
        readTime: '10 min read',
        image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1200&auto=format&fit=crop',
        content: `
Safety is the top priority for solo female travelers. Fortunately, Europe is home to some of the safest and most welcoming urban environments on the planet.

## 1. Copenhagen, Denmark
The capital of the "happiest country" is famously safe. You can walk through most neighborhoods at night alone without a second thought. The cycling culture makes it easy to get around.

## 2. Reykjavik, Iceland
Iceland consistently ranks as the safest country in the world. Reykjavik feels like a large, friendly village. It's the perfect spot for a first-time solo trip.

## 3. Zurich, Switzerland
Efficiency and safety go hand in hand here. The public transport is clinical, and the city is incredibly walkable. It's expensive, but the peace of mind is built-in.

## 4. Ljubljana, Slovenia
One of Europe's best-kept secrets. The city center is car-free, filled with students, and has a very high safety rating. The locals speak excellent English and are very helpful.

## 5. Vienna, Austria
Vienna is refined, safe, and has a great culture of 'Coffee House' sitting, which is perfect for solo travelers who want to enjoy a book and a cake without feeling out of place.

---
**Solo Safety Tips:**
1. Always keep your phone charged and use a local eSIM.
2. Join a free walking tour on day one to meet people.
3. Trust your intuition; if a situation feels off, leave.
`
    },
    {
        slug: 'how-to-hack-luxury-travel',
        title: 'How to Hack Luxury Travel: Upgrades, Points, and Secret Seasons',
        description: 'You do not need a million dollars to travel like a millionaire. Learn the insider secrets to booking five-star hotels and first-class flights for less.',
        category: 'Travel Tips',
        date: '2025-01-18',
        readTime: '11 min read',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop',
        content: `
Luxury travel hacking is an art form. It's about maximizing value and leveraging systems to access high-end experiences without the high-end price tag.

## 1. The Power of "Shoulder Season"
The easiest "hack" is timing. Visiting the Maldives in May or September (shoulder season) can cost 50% less than in December, yet the weather is often still beautiful.

## 2. Credit Card Points & Sign-up Bonuses
In the US and UK, strategic credit card usage is the fastest way to first class. Cards like the Chase Sapphire Reserve or Amex Platinum offer massive bonuses that can be transferred directly to airlines and hotels.

## 3. The "Secret" Upgrade Request
Email the hotel's general manager or front office manager 3 days before arrival. Mention it's a special occasion (anniversary, birthday) and ask if they have any upgrades available. In luxury hotels, this personal touch works more often than you'd think.

## 4. Use a Luxury Travel Advisor (VIRTUOSO)
Booking through a Virtuoso-affiliated advisor (often for the same price as Booking.com) usually nets you free breakfast, $100 resort credits, and room upgrades automatically.

---
**Summary Checklist:**
- [ ] Sign up for at least one travel rewards credit card.
- [ ] Use Google Flights 'Track Prices' feature.
- [ ] Never book directly on a third-party site without checking the hotel's own site for "Member Rates".
`
    },
    {
        slug: 'best-anti-theft-gear-europe',
        title: 'The Best Anti-Theft Gear for Europe in 2025',
        description: 'Protect your valuables in crowded tourist spots. We review the top-rated anti-theft gear to keep your passport and tech safe while exploring.',
        category: 'Travel Tips',
        date: '2025-01-20',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop',
        content: `
While Europe is generally safe, pickpocketing is a common issue in major hubs like Paris, Rome, and Barcelona. The right gear makes you a "hard target."

## 1. Pacsafe Venturesafe Backpack
The gold standard. It features eXomesh slashguards (hidden wire mesh), Roobar locking systems, and RFIDsafe pockets. It's virtually impossible to open or cut while you're wearing it.

## 2. Travelon Anti-Theft Messenger Bag
For those who prefer a smaller bag, Travelon offers hidden locking compartments and slash-resistant straps.

## 3. Money Belts vs. Neck Pouches
Money belts are okay, but 'Infinity Scarves' with hidden zipper pockets are the new favorite among travelers. They look like normal accessories but hide your passport and emergency cash.

---
**Top Tip:** The best anti-theft gear is situational awareness. Don't leave your phone on the table at an outdoor cafe, and keep your bag in front of you on crowded metros.
`
    },
    {
        slug: 'maldives-vs-seychelles-luxury-islands',
        title: 'Maldives vs. Seychelles: Which Luxury Island is Right for You?',
        description: 'Both offer turquoise water and white sand, but the experiences are vastly different. We compare these two Indian Ocean legends.',
        category: 'Hidden Gems',
        date: '2025-01-22',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop',
        content: `
The Indian Ocean holds the two most coveted island destinations on Earth. But choosing between them depends on what kind of traveler you are.

## The Maldives: The Ultimate Seclusion
**Geography:** Thousands of tiny coral atolls.
**Experience:** "One Island, One Resort." You are limited to your resort's island.
**Best for:** Honeymooners, overwater villa lovers, and people who want to do absolutely nothing.

## The Seychelles: The Granite Adventure
**Geography:** Large, mountainous islands with dramatic granite boulders.
**Experience:** Island hopping is easy and encouraged. There is significant local culture, hiking, and wildlife (giant tortoises).
**Best for:** Adventurous couples, families, and beach connoisseurs who want to see world-famous spots like Anse Source d'Argent.

| Feature | Maldives | Seychelles |
|---------|----------|------------|
| Villas | Overwater focus | Beachfront/Hillside |
| Activity | Diving/Snorkeling | Hiking/Exploring |
| Isolation | High | Medium |
| Cost | Very High | High |

---
**Conclusion:** Choose the Maldives for pure relaxation and the Seychelles for a mix of stunning beaches and lush exploration.
`
    },
    {
        slug: '7-days-in-italy-classic-itinerary',
        title: '7 Days in Italy: The Classic Venice-Florence-Rome Route',
        description: 'Short on time? This efficient 1-week itinerary covers Italy\'s big three cities with minimum travel time and maximum cultural impact.',
        category: 'Itineraries',
        date: '2025-01-25',
        readTime: '13 min read',
        image: 'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=1200&auto=format&fit=crop',
        content: `
Seven days is just enough to see the highlights of Italy's most famous cities. The secret to this trip is using the high-speed 'Frecciarossa' trains.

## Day 1-2: Venice — The Floating City
Arrive and take a water taxi to your hotel. Spend day one getting lost in the canals (away from St. Marks). Day two, visit the Rialto Market and take a gondola at sunset.

## Day 3-4: Florence — The Renaissance
Take the 2-hour train to Florence. Visit the Accademia for Michelangelo's David and the Uffizi Gallery. Spend the evening crossing the Ponte Vecchio and eating Bistecca alla Fiorentina.

## Day 5-7: Rome — The Eternal City
Another 1.5-hour train ride brings you to Rome.
**Day 5:** The Colosseum and Roman Forum.
**Day 6:** The Vatican City, St. Peter's Basilica, and the Sistine Chapel.
**Day 7:** Trevi Fountain, Pantheon, and Piazza Navona before departure.

---
**Important:** Book all major tickets (Vatican, Uffizi, Colosseum) at least 2 months in advance.
`
    },
    {
        slug: 'travel-solo-in-2025-guide',
        title: 'The Modern Guide to Traveling Solo in 2025',
        description: 'Solo travel is more popular than ever. Learn how to manage logistics, beat loneliness, and stay safe while seeing the world on your own terms.',
        category: 'Travel Tips',
        date: '2025-01-30',
        readTime: '11 min read',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop',
        content: `
Traveling solo is the ultimate freedom. You eat when you want, go where you want, and change your mind whenever you like.

## 1. Choose the Right Destination
For your first solo trip, pick somewhere with a high 'Ease of Travel' score. Southeast Asia (Thailand, Vietnam) or Western Europe (Portugal, Netherlands) are perfect.

## 2. Managing the 'Solo Tax'
Many hotels charge for double occupancy. Avoid this by looking for 'Single Rooms' in European hotels or boutique hostels that offer high-end private pods.

## 3. Dealing with Loneliness
Loneliness is a normal part of solo travel. Beat it by:
- Staying in social hostels (even in private rooms).
- Joining small group 'Day Tours'.
- Using apps like 'Couchsurfing' for local meetups.

---
**Final Word:** The first 24 hours of any solo trip are the hardest. Push through the "What have I done?" moment, and you will find it's the most rewarding thing you've ever done.
`
    },
    {
        slug: 'maldives-on-a-budget',
        title: 'Is the Maldives on a Budget Really Possible?',
        description: 'You do not need to spend $1,000 a night. Learn how "Local Islands" are making the Maldives accessible to everyone.',
        category: 'Hidden Gems',
        date: '2025-02-01',
        readTime: '10 min read',
        image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1200&auto=format&fit=crop',
        content: `
For decades, the Maldives was "Resort only." But in 2011, laws changed to allow tourism on "Local Islands." This changed everything.

## What is a Local Island?
These are islands where Maldivian people actually live (Male, Maafushi, Dhiffushi). They now have beautiful guesthouses, cafes, and diving centers.

## The Cost Difference
**Resort Special:** $500 - $5,000/night.
**Local Island Guesthouse:** $50 - $120/night.
The water is the same, the sand is the same, and the whale sharks don't care what you paid for your room.

---
**Rules to Know:** Local islands are Muslim communities. No alcohol is served, and you must dress modestly (except on designated "Bikini Beaches").
`
    }
];

// Helper to sanitize strings for TS template literals
const sanitize = (str) => str.replace(/`/g, '\\`').replace(/\$/g, '\\$');

const injectPosts = () => {
    const closingBracketIndex = content.lastIndexOf('];');
    if (closingBracketIndex === -1) {
        console.error("ERROR: Could not find blogPosts array closing bracket (];).");
        return;
    }

    const arrayStart = content.substring(0, closingBracketIndex);
    const lastObjectEndIndex = arrayStart.lastIndexOf('}');
    
    if (lastObjectEndIndex === -1) {
        console.error("ERROR: Could not find last object brace (}) in blogPosts array.");
        return;
    }

    console.log('Inserting after index:', lastObjectEndIndex);

    const postsString = fullList.map(post => {
        return `    {
        slug: '${post.slug}',
        title: "${post.title.replace(/"/g, '\\"')}",
        description: "${post.description.replace(/"/g, '\\"')}",
        category: '${post.category}',
        date: '${post.date}',
        readTime: '${post.readTime}',
        image: '${post.image}',
        content: \`${sanitize(post.content)}\`
    }`
    }).join(',\n');

    const newContent = content.substring(0, lastObjectEndIndex + 1) + 
                       ',\n' + 
                       postsString + 
                       content.substring(lastObjectEndIndex + 1);

    fs.writeFileSync(blogDataPath, newContent);
    console.log(`SUCCESS: Injected ${fullList.length} articles into blogData.ts.`);
};

injectPosts();
console.log('--- BLOG INJECTION COMPLETE ---');
