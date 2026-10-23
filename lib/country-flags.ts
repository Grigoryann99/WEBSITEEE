const countryFlags: Record<string, string> = {
    france: 'fr', italy: 'it', japan: 'jp', 'united-states': 'us', spain: 'es',
    greece: 'gr', 'united-arab-emirates': 'ae', brazil: 'br', thailand: 'th',
    'united-kingdom': 'gb', norway: 'no', sweden: 'se', finland: 'fi', poland: 'pl',
    'czech-republic': 'cz', hungary: 'hu', qatar: 'qa', jordan: 'jo', malaysia: 'my',
    'sri-lanka': 'lk', 'new-zealand': 'nz', mexico: 'mx', argentina: 'ar', chile: 'cl',
    peru: 'pe', colombia: 'co', 'south-africa': 'za', morocco: 'ma', portugal: 'pt',
    austria: 'at', netherlands: 'nl', belgium: 'be', iceland: 'is', turkey: 'tr',
    'south-korea': 'kr', vietnam: 'vn', indonesia: 'id', philippines: 'ph', india: 'in',
    maldives: 'mv', australia: 'au', canada: 'ca', 'costa-rica': 'cr', egypt: 'eg',
    switzerland: 'ch', seychelles: 'sc', germany: 'de', ireland: 'ie', denmark: 'dk',
    singapore: 'sg', panama: 'pa',
};

export function destinationFlag(route: string): string {
    return `/images/flags/${countryFlags[route.split('/')[2]] || 'it'}.svg`;
}
