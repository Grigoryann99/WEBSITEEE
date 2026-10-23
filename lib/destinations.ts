/** Stable destination identities. Guide coverage does not imply a planning catalog. */
export const ROME_DESTINATION = 'italy/rome';
export type DestinationOption = {
    id: string;
    name: string;
    country: string;
    kind: 'country' | 'city';
    guideHref: string;
    image: string;
    planning: boolean;
    searchTerms: string;
};

export type JourneyParams = Record<string, string | string[] | undefined>;
export function selectedDestination(params: JourneyParams): string | null {
    const value = params.destination ?? params.city;
    // Ambiguous and unknown selections must never fall back to Rome.
    if (typeof value !== 'string') return value ? '__invalid__' : null;
    return value === 'rome' ? ROME_DESTINATION : value;
}

const preferenceKeys = ['start', 'end', 'days', 'travelers', 'budgetEur', 'interests', 'price'] as const;
export function destinationHref(path: string, destination: string | null, preferences: JourneyParams = {}): string {
    const query = new URLSearchParams(destination ? { destination } : {});
    for (const key of preferenceKeys) {
        const value = preferences[key];
        if (typeof value === 'string') query.set(key, value);
    }
    // Place ids belong to a catalog; never carry them when switching destinations.
    return query.size ? `${path}?${query}` : path;
}
