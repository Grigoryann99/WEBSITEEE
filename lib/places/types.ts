import type { CurrencyCode } from '@/lib/currency/config';

export type Section = 'eat' | 'see' | 'shop' | 'stay' | 'move';

export const SECTION_META: Record<Section, { label: string; short: string; blurb: string }> = {
    eat: { label: 'Eat & Drink', short: 'Eat', blurb: 'Restaurants, cafés, bars and local cuisine' },
    see: { label: 'See & Do', short: 'See', blurb: 'Landmarks, museums, events and neighbourhoods' },
    shop: { label: 'Shopping & Gifts', short: 'Shop', blurb: 'Known stores, local markets, outlets and souvenirs' },
    stay: { label: 'Where to Stay', short: 'Stay', blurb: 'Hotels, guesthouses and apartments' },
    move: { label: 'Getting Around', short: 'Move', blurb: 'Airports, public transport and walking routes' },
};

export type VerificationStatus = 'verified' | 'approximate';

export type PlaceMedia = {
    type: 'image' | 'video';
    src: string;
    credit: string;
    creditUrl?: string;
    /** True when the photo shows the dish/type of place rather than this exact venue. */
    representative?: boolean;
    /** Distinguish the venue itself from contextual imagery. */
    context?: 'venue' | 'area' | 'illustrative';
    alt?: string;
    caption?: string;
    license?: string;
    licenseUrl?: string;
    changes?: string;
};

export type Place = {
    id: string;
    city: 'rome';
    section: Section;
    subcategory: string;
    name: string;
    district: string;
    address?: string;
    coords: [number, number];
    summary: string;
    whyVisit: string;
    goodFor: string[];
    price: {
        min?: number;
        max?: number;
        currency: CurrencyCode;
        unit: string;          // "per person", "per night", "ticket"…
        status: VerificationStatus;
        free?: boolean;
        includes?: string;
    };
    /** 1 = budget … 4 = luxury, used by the price filter */
    priceLevel: 1 | 2 | 3 | 4;
    hours?: {
        text: string;
        source: string;
        status: 'verified' | 'unverified';
        /** Machine-readable schedule, only filled when status is verified. */
        weekly?: Partial<Record<0 | 1 | 2 | 3 | 4 | 5 | 6, [string, string][]>>;
    };
    howToGet: string;
    tips: string[];
    interests: Interest[];
    tripTypes: TripType[];
    sources: { label: string; url: string }[];
    lastChecked: string;
    booking?: { label: string; url: string; partner: string; sponsored: boolean; affiliate: boolean };
    /** Typical visit length in minutes (used by planner). */
    duration?: number;
    giftTags?: GiftTag[];
};

export const INTERESTS = ['food', 'history', 'art', 'nightlife', 'shopping', 'views', 'relaxed', 'local', 'romance', 'family'] as const;
export type Interest = (typeof INTERESTS)[number];

export const TRIP_TYPES = ['solo', 'couple', 'family', 'friends'] as const;
export type TripType = (typeof TRIP_TYPES)[number];

export const GIFT_TAGS = ['food', 'wine', 'cosmetics', 'fashion', 'souvenir', 'kids', 'home'] as const;
export type GiftTag = (typeof GIFT_TAGS)[number];

export const PRICE_LEVEL_LABEL: Record<1 | 2 | 3 | 4, string> = { 1: '€', 2: '€€', 3: '€€€', 4: '€€€€' };
