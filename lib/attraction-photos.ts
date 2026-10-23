import 'server-only';
import { countries } from '@/lib/countryData';
import localImages from '@/data/media-manifest.json';

const availableImages = new Set(localImages);
export function availablePhoto(src: string): string | null {
    if (!src.startsWith('/')) return src;
    return availableImages.has(src) ? src : null;
}
const photos = new Map(Object.values(countries).flatMap(country => country.destinations.map(place => [place.name.trim().toLowerCase(), place.image] as const)));
export function getAttractionPhoto(query: string) {
    const candidate = photos.get(query.trim().toLowerCase());
    const url = candidate ? availablePhoto(candidate) : null;
    return url ? { url, photographer: null } : null;
}
