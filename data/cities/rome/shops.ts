// Compatibility export for the five stores introduced in October 2026.
import { romeCatalogPlaces } from '@/lib/content/repository';
const ids = new Set(['rinascente-tritone','feltrinelli-argentina','castroni-cola','fabriano-babuino','momoni-babuino']);
export const additionalRomeShops = romeCatalogPlaces.filter(place => ids.has(place.id));
