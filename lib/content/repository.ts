import rome from '@/data/catalog/rome.json';
import type { CatalogEntry, CatalogSnapshot } from './schema';
import type { Place } from '@/lib/places/types';

// Versioned public snapshot: no database credentials or editorial drafts enter browser bundles.
// CONTENT_SOURCE=supabase refreshes this validated snapshot before a production build.
// Hosted publishing becomes visible after that build is deployed; drafts are never fetched.
export const romeCatalog = rome as unknown as CatalogSnapshot;
export const romeCatalogPlaces = romeCatalog.entries.map(entry => entry.place as Place);
const byId = new Map(romeCatalog.entries.map(entry => [entry.place.id, entry]));
export function contentForPlace(id: string, destinationId = 'italy/rome'): CatalogEntry | null {
    return destinationId === romeCatalog.destination.id ? byId.get(id) || null : null;
}
