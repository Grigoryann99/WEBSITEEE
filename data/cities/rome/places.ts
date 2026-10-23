// Compatibility export. Edit the unified catalog, not this file.
import { romeCatalogPlaces } from '@/lib/content/repository';
export const romePlaces = romeCatalogPlaces;
export const romeDistricts = Array.from(new Set(romePlaces.map(place => place.district))).sort();
