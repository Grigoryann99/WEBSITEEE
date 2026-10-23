import { z } from 'zod';
import { CURRENCIES } from '@/lib/currency/config';
import { GIFT_TAGS, INTERESTS, TRIP_TYPES } from '@/lib/places/types';

const text = z.string().trim().min(1);
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
export const calendarDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(value => {
    const date = new Date(`${value}T00:00:00Z`);
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}, 'Invalid calendar date');
const sourceUrl = z.string().url().refine(value => new URL(value).protocol === 'https:', 'Use an HTTPS source');
const mediaUrl = z.string().refine(value => {
    if (value.startsWith('/')) return !value.startsWith('//') && !value.includes('..') && !/[\\\s<>]/.test(value);
    try { return new URL(value).protocol === 'https:'; } catch { return false; }
}, 'Use a local asset path or HTTPS image');
const checkSchema = z.object({ checkedOn: calendarDate.nullable(), sourceUrl: sourceUrl.nullable() }).strict()
    .refine(value => Boolean(value.checkedOn) === Boolean(value.sourceUrl), 'A check needs both a date and source');
const time = z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/);
export const placeSchema = z.object({
    id: slug, city: slug, section: z.enum(['eat', 'see', 'shop', 'stay', 'move']),
    subcategory: text, name: text, district: text, address: text.optional(),
    coords: z.tuple([z.number().min(-90).max(90), z.number().min(-180).max(180)]),
    summary: text, whyVisit: text, goodFor: z.array(text),
    price: z.object({ min: z.number().nonnegative().optional(), max: z.number().nonnegative().optional(),
        currency: z.enum(CURRENCIES), unit: text, status: z.enum(['verified', 'approximate']),
        free: z.boolean().optional(), includes: text.optional() }).strict().refine(price => price.min == null || price.max == null || price.min <= price.max, 'Price range is reversed'),
    priceLevel: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
    hours: z.object({ text, source: text, status: z.enum(['verified', 'unverified']),
        weekly: z.record(z.string().regex(/^[0-6]$/), z.array(z.tuple([time, time]))).optional() }).strict().optional(),
    howToGet: text, tips: z.array(text), interests: z.array(z.enum(INTERESTS)), tripTypes: z.array(z.enum(TRIP_TYPES)),
    sources: z.array(z.object({ label: text, url: sourceUrl }).strict()).min(1),
    lastChecked: calendarDate, duration: z.number().int().positive().optional(),
    booking: z.object({ label: text, url: sourceUrl, partner: text, sponsored: z.boolean(), affiliate: z.boolean() }).strict().optional(),
    giftTags: z.array(z.enum(GIFT_TAGS)).optional(),
}).strict();
export const catalogEntrySchema = z.object({
    place: placeSchema,
    media: z.object({ type: z.enum(['image', 'video']), src: mediaUrl, credit: text,
        creditUrl: sourceUrl.optional(), representative: z.boolean().optional(),
        context: z.enum(['venue', 'area', 'illustrative']).optional(), alt: text.optional(), caption: text.optional(),
        license: text.optional(), licenseUrl: sourceUrl.optional(), changes: text.optional() }).strict().nullable(),
    checks: z.object({ details: checkSchema, price: checkSchema, hours: checkSchema, media: checkSchema }).strict(),
}).strict().superRefine((entry, context) => {
    if (entry.media?.context && entry.media.context !== 'venue' && (!entry.media.representative || !entry.media.caption))
        context.addIssue({ code: 'custom', message: 'Contextual photos need an explicit label and caption', path: ['media'] });
    if (entry.media?.context === 'venue' && entry.media.representative)
        context.addIssue({ code: 'custom', message: 'A venue photo cannot be labelled representative', path: ['media'] });
    if (entry.media?.license && (!entry.media.licenseUrl || !entry.media.creditUrl))
        context.addIssue({ code: 'custom', message: 'Licensed photos need source and licence links', path: ['media'] });
    if (entry.place.price.status === 'verified' && !entry.checks.price.checkedOn)
        context.addIssue({ code: 'custom', message: 'Verified prices need a dated source check', path: ['checks', 'price'] });
    if (entry.place.hours?.status === 'verified' && !entry.checks.hours.checkedOn)
        context.addIssue({ code: 'custom', message: 'Verified hours need a dated source check', path: ['checks', 'hours'] });
    for (const [field, check] of Object.entries(entry.checks)) {
        if (check.checkedOn && check.checkedOn > new Date().toISOString().slice(0, 10))
            context.addIssue({ code: 'custom', message: 'A check cannot be in the future', path: ['checks', field, 'checkedOn'] });
    }
});
export const catalogSnapshotSchema = z.object({
    schemaVersion: z.literal(1),
    destination: z.object({ id: z.string().regex(/^[a-z0-9-]+\/[a-z0-9-]+$/), name: text, country: text,
        countrySlug: slug, citySlug: slug, currency: z.enum(CURRENCIES) }).strict(),
    reviewPolicy: z.object({ details: z.number().int().min(1).max(365), price: z.number().int().min(1).max(365),
        hours: z.number().int().min(1).max(365), media: z.number().int().min(1).max(365) }).strict(),
    entries: z.array(catalogEntrySchema).min(1),
}).strict().superRefine((snapshot, context) => {
    const ids = new Set<string>();
    if (snapshot.destination.id !== `${snapshot.destination.countrySlug}/${snapshot.destination.citySlug}`)
        context.addIssue({ code: 'custom', message: 'Destination identity does not match its slugs', path: ['destination'] });
    snapshot.entries.forEach((entry, index) => {
        if (ids.has(entry.place.id) || entry.place.city !== snapshot.destination.citySlug)
            context.addIssue({ code: 'custom', message: 'Duplicate place or incorrect city', path: ['entries', index, 'place', 'id'] });
        ids.add(entry.place.id);
    });
});
export type CatalogEntry = z.infer<typeof catalogEntrySchema>;
export type CatalogSnapshot = z.infer<typeof catalogSnapshotSchema>;
export type ReviewField = keyof CatalogEntry['checks'];
