import { countries } from '@/lib/countryData';
import { ROME_DESTINATION, type DestinationOption } from '@/lib/destinations';

// Keep the large country guide data on the server, passing only directory summaries to the client.
export function destinationOptions(): DestinationOption[] {
    const guides: DestinationOption[] = Object.entries(countries).map(([key, country]) => ({
        id: key.replace(/_/g, '-'), name: country.name, country: country.name, kind: 'country',
        guideHref: `/destinations/${key.replace(/_/g, '-')}`, image: country.heroImage, planning: false,
        searchTerms: country.destinations.map(place => `${place.city} ${place.name}`).join(' '),
    }));
    return [{ id: ROME_DESTINATION, name: 'Rome', country: 'Italy', kind: 'city', guideHref: '/destinations/italy/rome', image: '/images/countries/rome.jpg', planning: true, searchTerms: 'Roma Italy' }, ...guides.sort((a, b) => a.name.localeCompare(b.name))];
}
