import 'server-only';
import { countries } from '@/lib/countryData';
import { existsSync } from 'node:fs';
import path from 'node:path';

const availability = new Map<string, boolean>();
export function availablePhoto(src: string): string | null {
    if (!src.startsWith('/')) return src;
    if (!availability.has(src)) availability.set(src, existsSync(path.join(process.cwd(), 'public', src)));
    return availability.get(src) ? src : null;
}
const photos = new Map(Object.values(countries).flatMap(country => country.destinations.map(place => [place.name.trim().toLowerCase(), place.image] as const)));
export function getAttractionPhoto(query: string) {
    const candidate = photos.get(query.trim().toLowerCase());
    const url = candidate ? availablePhoto(candidate) : null;
    return url ? { url, photographer: null } : null;
}
