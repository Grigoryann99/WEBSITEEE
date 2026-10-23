'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
export default function TripSearch() {
    const router = useRouter(); const [days, setDays] = useState('3'), [travelers, setTravelers] = useState('2');
    return <form className="mx-auto flex max-w-5xl flex-wrap items-end gap-3 rounded-[30px] border border-sky-200 bg-white/95 p-4 shadow-soft" onSubmit={event => { event.preventDefault(); router.push(`/plan?destination=italy%2Frome&days=${days}&travelers=${travelers}`); }}>
        <label className="min-w-[160px] flex-1 text-left text-xs text-ink-500">Your destination<select className="concierge-input mt-2" aria-label="Trip destination" defaultValue="rome"><option value="rome">Rome, Italy · city companion</option></select></label>
        <label className="w-24 text-left text-xs text-ink-500">Days<input className="concierge-input mt-2" type="number" min={1} max={21} value={days} onChange={event => setDays(String(Math.min(21, Math.max(1, Number(event.target.value) || 1))))} /></label>
        <label className="w-28 text-left text-xs text-ink-500">Travellers<input className="concierge-input mt-2" type="number" min={1} max={20} value={travelers} onChange={event => setTravelers(String(Math.min(20, Math.max(1, Number(event.target.value) || 1))))} /></label>
        <button className="concierge-button concierge-button-primary" type="submit">Shape my days<ArrowRight size={16} /></button>
    </form>;
}
