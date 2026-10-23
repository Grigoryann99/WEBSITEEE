'use client';
import { Reorder, useDragControls } from 'framer-motion';
import { ArrowDown, ArrowUp, ChevronDown, Clock3, GripVertical, Trash2 } from 'lucide-react';
import type { PlanItem } from '@/lib/planner';
import { placeById } from '@/lib/places/catalog';
import PriceTag from '@/components/currency/PriceTag';
import PlannerPhoto from './PlannerPhoto';

export default function PlannerStop({ item, number, travelers, selected, first, last, included, missing, patch, move, remove, locate }: {
    item: PlanItem; number: number; travelers: number; selected: boolean; first: boolean; last: boolean; included: boolean; missing: boolean;
    patch: (value: Partial<PlanItem>) => void; move: (direction: number) => void; remove: () => void; locate: () => void;
}) {
    const controls = useDragControls(), place = placeById.get(item.placeId)!;
    return <Reorder.Item value={item} dragListener={false} dragControls={controls} data-place-id={place.id} data-selected={selected} className={`relative rounded-[26px] border bg-[#FFFDFA] p-3 shadow-[0_5px_20px_rgba(30,53,70,0.035)] transition-colors sm:p-4 ${selected ? 'border-[#84B9DC] ring-2 ring-sky-100' : 'border-[#E2E8E8]'}`}>
        <span aria-hidden="true" className="absolute -left-[43px] top-8 flex h-7 w-7 items-center justify-center rounded-full border-2 border-cream bg-[#83BCE7] text-xs font-semibold text-white">{number}</span>
        <div className="flex items-start gap-2 sm:gap-3">
            <button type="button" onClick={locate} aria-label={`Locate ${place.name} on map`} className="group flex min-w-0 flex-1 items-center gap-3 rounded-[18px] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600">
                <span className="h-24 w-[72px] shrink-0 sm:h-28 sm:w-28"><PlannerPhoto id={place.id} name={place.name} /></span>
                <span className="min-w-0 flex-1"><span className="block font-serif text-xl leading-tight text-ink transition-colors group-hover:text-sky-700 sm:text-2xl">{place.name}</span><span className="mt-2 block text-[11px] leading-relaxed text-ink-500 sm:text-xs">{place.subcategory} · {place.district}</span><span className="mt-2 block text-xs text-ink-500">{included ? 'Included with your same-day ticket' : missing ? 'Quote needed · not in total yet' : <PriceTag min={item.quote ?? place.price.min} max={item.quote ?? place.price.max} free={item.quote == null && place.price.free} currency="EUR" approximate={item.quote == null} showOriginal={false} />} {!included && !missing && <span className="block pt-0.5 text-[10px]">{item.quote == null ? place.price.unit : 'your unit quote'}</span>}</span></span>
            </button>
            <button type="button" onPointerDown={event => controls.start(event)} style={{ touchAction: 'none' }} aria-label={`Drag ${place.name}`} className="flex h-10 w-8 shrink-0 cursor-grab items-center justify-center rounded-full text-[#6F8794] hover:bg-sky-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600"><GripVertical size={19} /></button>
        </div>
        <details className="mt-3 border-t border-[#E9EEEE] pt-2">
            <summary className="flex min-h-8 cursor-pointer list-none flex-wrap items-center justify-between gap-2 rounded-full text-[11px] text-[#718391] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600"><span className="flex items-center gap-1.5"><Clock3 aria-hidden="true" size={12} />{place.duration ? `About ${place.duration} min` : 'Set your own pace'}</span><span className="flex items-center gap-1">Edit stop<ChevronDown aria-hidden="true" size={13} /></span></summary>
            <div className="pt-4">
                <div className="flex flex-wrap items-center gap-2"><button type="button" className="concierge-icon-button disabled:opacity-30" disabled={first} onClick={() => move(-1)} aria-label={`Move ${place.name} up`}><ArrowUp size={15} /></button><button type="button" className="concierge-icon-button disabled:opacity-30" disabled={last} onClick={() => move(1)} aria-label={`Move ${place.name} down`}><ArrowDown size={15} /></button><label className="ml-1 flex items-center gap-2 text-xs">Day<select aria-label={`Day for ${place.name}`} className="concierge-input !w-20" value={item.day} onChange={event => patch({ day: Number(event.target.value) })}>{Array.from({ length: 21 }, (_, i) => <option key={i + 1}>{i + 1}</option>)}</select></label><button type="button" className="concierge-icon-button ml-auto text-red-700" aria-label={`Remove ${place.name}`} onClick={remove}><Trash2 size={15} /></button></div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3"><label className="text-xs text-ink-500">Price basis<select className="concierge-input mt-2" value={item.billing} onChange={event => patch({ billing: event.target.value as PlanItem['billing'] })}><option value="unconfirmed">Confirm a quote</option><option value="person">Per person</option><option value="group">Whole group</option><option value="room-night">Per room / night</option><option value="bed-night">Per bed / night</option></select></label><label className="text-xs text-ink-500">{item.billing.includes('night') ? 'Room-nights / nights per bed' : 'Number of purchases'}<input aria-label={`Quantity for ${place.name}`} className="concierge-input mt-2" type="number" min={1} max={100} value={item.quantity} onChange={event => patch({ quantity: Math.min(100, Math.max(1, Math.floor(Number(event.target.value)) || 1)) })} /></label><label className="text-xs text-ink-500">Your unit quote · EUR<input aria-label={`Quote for ${place.name}`} className="concierge-input mt-2" type="number" min={0} max={1000000} step="0.01" placeholder="Use estimate" value={item.quote ?? ''} onChange={event => patch({ quote: event.target.value === '' ? null : Math.max(0, Math.min(1000000, Number(event.target.value))) })} /></label></div>
                <p className="mt-3 text-xs leading-relaxed text-ink-500">{item.billing === 'person' || item.billing === 'bed-night' ? `Multiplied by ${travelers} travelers. ` : ''}{place.section === 'stay' || place.section === 'shop' ? 'Enter your actual quote and price basis to include this in the total.' : 'Without a quote, the approximate venue price is used.'}</p>
            </div>
        </details>
    </Reorder.Item>;
}
