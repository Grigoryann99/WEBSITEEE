'use client';
import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import Dialog from '@/components/ui/Dialog';
import { CURRENCIES, convert, type CurrencyCode } from '@/lib/currency/config';
import { useCurrency } from '@/components/currency/CurrencyProvider';

export function TravelersDialog({ value, onChange, onClose }: { value: number; onChange: (value: number) => void; onClose: () => void }) {
    const [draft, setDraft] = useState(String(value));
    const count = Number(draft), valid = Number.isInteger(count) && count >= 1 && count <= 20;
    return <Dialog title="Who is coming along?" onClose={onClose}>
        <form onSubmit={event => { event.preventDefault(); if (valid) { onChange(count); onClose(); } }}>
            <p className="text-sm leading-relaxed text-ink-500">The total number of people in your group, including children. Venue age discounts need confirmation.</p>
            <div className="my-7 flex flex-col items-stretch gap-4 rounded-[24px] bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"><label htmlFor="journey-travelers" className="font-semibold">Travelers<span className="mt-1 block text-xs font-normal text-ink-500">1–20 people</span></label><div className="flex items-center justify-between gap-2 sm:justify-end"><button type="button" aria-label="Remove one traveler" className="concierge-icon-button disabled:opacity-40" disabled={!valid || count === 1} onClick={() => setDraft(String(count - 1))}><Minus size={17} /></button><input id="journey-travelers" aria-label="Number of travelers" type="number" min={1} max={20} step={1} required value={draft} onChange={event => setDraft(event.target.value)} className="w-14 rounded-xl border border-sky-200 bg-white py-3 text-center text-lg font-semibold" /><button type="button" aria-label="Add one traveler" className="concierge-icon-button disabled:opacity-40" disabled={!valid || count === 20} onClick={() => setDraft(String(count + 1))}><Plus size={17} /></button></div></div>
            <button type="submit" disabled={!valid} className="concierge-button concierge-button-primary w-full">Apply travelers</button>
        </form>
    </Dialog>;
}

export function BudgetDialog({ value, onChange, onClose }: { value: number | null; onChange: (value: number | null) => void; onClose: () => void }) {
    const { currency, setCurrency, fx } = useCurrency();
    const [draft, setDraft] = useState(value === null ? '' : String(Number(convert(value, 'EUR', currency, fx.rates).toFixed(2))));
    const amount = Number(draft), euros = Number.isFinite(amount) ? convert(amount, currency, 'EUR', fx.rates) : NaN;
    const valid = draft.trim() !== '' && Number.isFinite(euros) && euros >= 0 && euros <= 1000000;
    const changeCurrency = (next: CurrencyCode) => {
        if (draft.trim() !== '' && Number.isFinite(amount)) setDraft(String(Number(convert(amount, currency, next, fx.rates).toFixed(2))));
        setCurrency(next);
    };
    return <Dialog title="Set your spending budget" onClose={onClose}>
        <form onSubmit={event => { event.preventDefault(); if (valid) { onChange(Number(euros.toFixed(2))); onClose(); } }}>
            <p className="text-sm leading-relaxed text-ink-500">One total for your whole group’s activities, meals and shopping. Flights and accommodation are separate.</p>
            <div className="my-6 grid grid-cols-[minmax(0,1fr)_100px] gap-3"><label className="text-sm font-medium">Group budget<input data-dialog-autofocus aria-label={`Total budget in ${currency}`} className="concierge-input mt-2" type="number" min={0} step="0.01" required placeholder="For example, 500" value={draft} onChange={event => setDraft(event.target.value)} /></label><label className="text-sm font-medium">Currency<select aria-label="Budget currency" className="concierge-input mt-2" value={currency} onChange={event => changeCurrency(event.target.value as CurrencyCode)}>{CURRENCIES.map(code => <option key={code}>{code}</option>)}</select></label></div>
            {draft !== '' && !valid && <p role="alert" className="mb-4 text-sm text-red-700">Enter a non-negative amount up to the equivalent of €1,000,000.</p>}
            <p className="mb-6 text-xs leading-relaxed text-ink-500">{fx.stale ? 'Currency conversion uses a saved rate snapshot. ' : ''}Prices are planning estimates. A budget does not confirm availability or create a booking.</p>
            <div className="flex flex-wrap justify-between gap-3"><button type="button" className="concierge-button" onClick={() => { onChange(null); onClose(); }}>No budget yet</button><button type="submit" disabled={!valid} className="concierge-button concierge-button-primary">Apply budget</button></div>
        </form>
    </Dialog>;
}
