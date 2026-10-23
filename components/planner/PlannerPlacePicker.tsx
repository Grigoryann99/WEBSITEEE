'use client';
import { useState } from 'react';
import { Check, Plus, Search } from 'lucide-react';
import Dialog from '@/components/ui/Dialog';
import PriceTag from '@/components/currency/PriceTag';
import { romePlaces } from '@/lib/places/catalog';
import { SECTION_META, type Section } from '@/lib/places/types';
import PlannerPhoto from './PlannerPhoto';

export default function PlannerPlacePicker({ day, selected, full, onAdd, onClose }: { day: number; selected: string[]; full: boolean; onAdd: (id: string) => void; onClose: () => void }) {
    const [query, setQuery] = useState(''), [section, setSection] = useState<Section | ''>('');
    const results = romePlaces.filter(place => (!section || place.section === section) && `${place.name} ${place.district} ${place.subcategory}`.toLowerCase().includes(query.trim().toLowerCase()));
    return <Dialog title={`Add a place to Day ${day}`} onClose={onClose} wide>
        <div className="flex flex-col gap-3 sm:flex-row"><label className="flex min-w-0 flex-1 items-center gap-3 rounded-full border border-sky-200 bg-white px-4"><Search aria-hidden="true" size={18} /><input autoFocus aria-label="Search places to add" placeholder="A landmark, restaurant or neighbourhood…" value={query} onChange={event => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none" /></label><select aria-label="Place category" value={section} onChange={event => setSection(event.target.value as Section | '')} className="concierge-input sm:!w-48"><option value="">All categories</option>{Object.entries(SECTION_META).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}</select></div>
        <p className="my-4 text-xs text-ink-500">{results.length} places · prices are estimates{full ? ' · Your plan has reached 100 stops.' : ''}</p>
        <div data-lenis-prevent className="max-h-[55dvh] space-y-3 overflow-auto pr-1">{results.map(place => {
            const added = selected.includes(place.id);
            return <div key={place.id} className="flex items-center gap-3 rounded-[24px] border border-[#DEE8EC] bg-white p-3"><span className="h-20 w-20 shrink-0"><PlannerPhoto id={place.id} name={place.name} /></span><div className="min-w-0 flex-1"><h3 className="font-serif text-lg leading-tight">{place.name}</h3><p className="mt-1 text-xs text-ink-500">{place.subcategory} · {place.district}</p><PriceTag {...place.price} approximate showOriginal={false} className="mt-2 block text-xs text-ink-500" /></div><button type="button" disabled={added || full} onClick={() => onAdd(place.id)} aria-label={added ? `${place.name} already in this day` : `Add ${place.name}`} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#DCEFFB] text-ink transition-colors hover:bg-sky-200 disabled:opacity-50">{added ? <Check size={18} /> : <Plus size={18} />}</button></div>;
        })}{!results.length && <p className="rounded-[24px] bg-white p-6 text-sm text-ink-500">No matching place. Try another name or category.</p>}</div>
    </Dialog>;
}
