export interface VillaGuide {
    id: string;
    name: string;
    location: string;
    setting: string;
    description: string;
    goodFor: string;
    checkBeforeBooking: string;
    officialUrl: string;
    sourceName: string;
    destinationHref: string;
}
export const checkedOn = '2026-10-11';
// Facts are sourced from operator pages. Suitability notes are editorial guidance.
export const villasData: VillaGuide[] = [
    {
        id: 'soneva-fushi', name: 'Soneva Fushi', location: 'Baa Atoll, Maldives', setting: 'Island villas',
        description: 'Soneva Fushi lists beach villas among island greenery and overwater accommodation above the sea, giving travelers distinct settings to compare.',
        goodFor: 'Travelers comparing a beach setting with an overwater stay, including families considering larger villa layouts.',
        checkBeforeBooking: 'Compare the exact floor plan, sleeping arrangements for children, and the total cost of island transfers before choosing a category.',
        officialUrl: 'https://soneva.com/resorts/soneva-fushi/villas/',
        sourceName: 'Soneva Fushi accommodation', destinationHref: '/countries/maldives',
    },
    {
        id: 'zil-pasyon', name: 'Six Senses Zil Pasyon', location: 'Félicité Island, Seychelles', setting: 'Pool villas & residences',
        description: 'The operator lists one- and two-bedroom pool villas as well as three- and four-bedroom residences. Categories offer different outlooks and layouts on Félicité Island.',
        goodFor: 'Couples comparing smaller pool villas or groups considering a residence with more bedrooms.',
        checkBeforeBooking: 'Ask about the transfer route, steps and walking distances around your accommodation, and which meals and activities your rate includes.',
        officialUrl: 'https://www.sixsenses.com/en/hotels-resorts/middle-east-africa/seychelles/zil-pasyon/accommodation/',
        sourceName: 'Six Senses Zil Pasyon accommodation', destinationHref: '/countries/seychelles',
    },
    {
        id: 'the-lodge', name: 'The Lodge, Verbier', location: 'Verbier, Switzerland', setting: 'Alpine chalet',
        description: 'This mountain chalet is operated by Virgin Limited Edition in Verbier. Its official site describes catered stays and facilities including an indoor pool, spa, and hot tub.',
        goodFor: 'Travelers who prefer a mountain setting and want to compare an exclusive group stay with individual room options.',
        checkBeforeBooking: 'Check whether room bookings or exclusive use are offered on your dates. Confirm seasonal activities, lift access, and cancellation terms in your quotation.',
        officialUrl: 'https://www.virginlimitededition.com/the-lodge/the-lodge/',
        sourceName: 'Virgin Limited Edition — The Lodge', destinationHref: '/countries/switzerland',
    },
];
