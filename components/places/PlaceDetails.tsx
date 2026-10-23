'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ExternalLink, MapPin, Clock3 } from 'lucide-react';
import type { Place } from '@/lib/places/types';
import Dialog from '@/components/ui/Dialog';
import PriceTag from '@/components/currency/PriceTag';
import PlacePhoto from './PlacePhoto';
import SavePlaceButton from './SavePlaceButton';
import ContentFreshness from './ContentFreshness';
import { photoFor } from '@/lib/places/catalog';
import { track } from '@/lib/track';
export default function PlaceDetails({ place, onClose }: { place: Place; onClose: () => void }) {
    const photo = photoFor(place.id);
    const params = useSearchParams();
    const planQuery = new URLSearchParams(params.toString()); planQuery.set('place', place.id); planQuery.set('destination', `italy/${place.city}`);
    useEffect(() => { track('place_view', { place_id: place.id, city: 'rome' }); }, [place.id]);
    const mapUrl = `https://www.openstreetmap.org/?mlat=${place.coords[0]}&mlon=${place.coords[1]}#map=17/${place.coords[0]}/${place.coords[1]}`;
    return <Dialog title={place.name} onClose={onClose} wide>
        <div className="h-56 sm:h-72"><PlacePhoto id={place.id} name={place.name} credit /></div>
        {photo?.caption && <p className="mt-3 text-xs leading-relaxed text-ink-500">{photo.caption}</p>}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-sky-700"><span>{place.subcategory}</span><span>· {place.district}</span></div>
        <p className="mt-4 text-lg leading-relaxed">{place.whyVisit}</p>
        <div className="my-6 grid gap-4 sm:grid-cols-2"><div className="rounded-card bg-white p-5"><h3 className="mb-2 text-sm font-semibold">Plan your spend</h3><PriceTag {...place.price} approximate={place.price.status !== 'verified'} className="text-xl" /><p className="mt-1 text-xs text-ink-500">{place.price.unit} · {place.price.status === 'verified' ? 'Source checked' : 'Estimate — confirm before booking'}</p>{place.price.includes && <p className="mt-3 text-sm text-ink-500">{place.price.includes}</p>}</div>
        <div className="rounded-card bg-sky-50 p-5"><h3 className="mb-2 flex items-center gap-2 text-sm font-semibold"><Clock3 size={16} />When to go</h3><p className="text-sm">{place.hours?.text || 'Check current opening times with the venue.'}</p><p className="mt-3 text-xs text-ink-500">{place.hours?.status === 'verified' ? 'Hours source checked; holiday exceptions may apply.' : 'Hours not independently verified.'}</p></div></div>
        <h3 className="font-serif text-2xl">Getting there</h3><p className="mt-3 text-sm leading-relaxed text-ink-500">{place.howToGet}</p>
        <p className="mt-2 text-sm text-ink-500">{place.address}</p>
        <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm text-sky-700 underline"><MapPin size={16} />Open location</a>
        <h3 className="mt-7 font-serif text-2xl">A few useful details</h3><ul className="mt-3 space-y-3">{place.tips.map(tip => <li key={tip} className="rounded-chip bg-white px-4 py-3 text-sm text-ink-500">{tip}</li>)}</ul>
        <div className="mt-7 flex flex-wrap gap-3"><SavePlaceButton placeId={place.id} /><Link href={`/plan?${planQuery}`} className="concierge-button concierge-button-primary">Add to a plan</Link>{place.booking && <a className="concierge-button" href={place.booking.url} target="_blank" onClick={() => track('partner_click', { place_id: place.id, partner: place.booking!.partner })} rel={place.booking.affiliate || place.booking.sponsored ? 'sponsored noopener noreferrer' : 'noopener noreferrer'}>{place.booking.label}<ExternalLink size={15} /></a>}</div>
        {place.booking?.affiliate && <p className="mt-3 text-xs text-ink-500">We may earn a commission from qualifying bookings through this link.</p>}
        <div className="mt-8 border-t border-sky-200 pt-4 text-xs leading-relaxed text-ink-500"><ContentFreshness placeId={place.id} /><div className="mt-2 flex flex-wrap gap-3">{place.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="underline">{source.label}</a>)}<Link className="underline" href={`/support?place=${place.id}#support-form`}>Report an update</Link></div></div>
    </Dialog>;
}
