'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { planSchema, type TripPlan } from '@/lib/planner';
import { placeById } from '@/lib/places/catalog';
import PlanEditor from './PlanEditor';
import { track } from '@/lib/track';
import { destinationHref, ROME_DESTINATION, type JourneyParams } from '@/lib/destinations';
import { travelDays } from '@/lib/travel-dates';
export default function ConciergeWorkspace({ available, preferences = {} }: { available: boolean; preferences?: JourneyParams }) {
    const { user, signIn } = useAuth();
    const [message, setMessage] = useState(''), [days, setDays] = useState(Math.min(7, Math.max(1, Math.floor(Number(preferences.days) || 3)))), [travelers, setTravelers] = useState(Math.min(20, Math.max(1, Math.floor(Number(preferences.travelers) || 2)))), [budget, setBudget] = useState(Number.isFinite(Number(preferences.budgetEur)) ? String(Math.min(1000000, Math.max(0, Number(preferences.budgetEur)))) : ''), [busy, setBusy] = useState(false), [error, setError] = useState(''), [plan, setPlan] = useState<TripPlan | null>(null), [over, setOver] = useState(false);
    const matchingDates = typeof preferences.start === 'string' && typeof preferences.end === 'string' && travelDays(preferences.start, preferences.end) === days;
    const manualHref = destinationHref('/plan', ROME_DESTINATION, { ...preferences, start: matchingDates ? preferences.start : undefined, end: matchingDates ? preferences.end : undefined, days: String(days), travelers: String(travelers), budgetEur: budget });
    return <><div className="mx-auto max-w-3xl px-5 pb-10"><form className="mt-8 rounded-card border border-sky-200 bg-white p-6 shadow-soft sm:p-8" onSubmit={async event => {
        event.preventDefault(); if (!user) { signIn(); return; } setBusy(true); setError('');
        try {
            const response = await fetch('/api/concierge', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ destinationId: 'italy/rome', message, days, travelers, budgetEur: Number(budget) || 0 }) });
            const data = await response.json(); if (!response.ok) throw new Error(data.error);
            const start = typeof preferences.start === 'string' ? preferences.start : '', end = typeof preferences.end === 'string' ? preferences.end : '';
            const parsed = planSchema.parse({ ...data.plan, ...(travelDays(start, end) === days ? { startDate: start, endDate: end } : {}) }); setPlan(parsed); setOver(Boolean(data.overBudget)); track('concierge_plan_generated', { city: 'rome' });
        } catch (error) { setError(error instanceof Error ? error.message : 'Could not generate a plan.'); } finally { setBusy(false); }
    }}><label className="block text-sm font-medium">What would make this trip yours?<textarea required minLength={10} maxLength={2000} rows={5} className="concierge-input mt-3 !rounded-[26px]" placeholder="Three days in Rome with local food, a few landmarks and time to browse for gifts…" value={message} onChange={event => setMessage(event.target.value)} /></label><div className="mt-4 grid gap-3 sm:grid-cols-3"><label className="text-xs text-ink-500">Days<input className="concierge-input mt-2" type="number" min={1} max={7} value={days} onChange={event => setDays(Math.min(7, Math.max(1, Number(event.target.value) || 1)))} /></label><label className="text-xs text-ink-500">Travellers<input className="concierge-input mt-2" type="number" min={1} max={20} value={travelers} onChange={event => setTravelers(Math.min(20, Math.max(1, Number(event.target.value) || 1)))} /></label><label className="text-xs text-ink-500">Activities & meals budget · EUR<input className="concierge-input mt-2" type="number" min={0} max={1000000} placeholder="Optional" value={budget} onChange={event => setBudget(event.target.value)} /></label></div>
        {!available && <p role="status" className="mt-5 rounded-chip bg-sky-50 p-4 text-sm text-ink-500">Personal concierge is being connected. You can explore places and build a plan manually today.</p>}
        <div className="mt-6 flex flex-wrap gap-3"><button disabled={busy || !available} className="concierge-button concierge-button-primary" type="submit">{busy ? 'Arranging your days…' : user ? 'Suggest my journey' : 'Sign in to plan with concierge'}</button><Link href={manualHref} className="concierge-button">Build it myself →</Link></div>{error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}<p className="mt-5 text-xs leading-relaxed text-ink-500">Recommendations use our Rome catalog. Venue prices and opening times still need confirmation. Requests are saved privately to your account and sent to our AI provider for planning.</p></form></div>
        {plan && <div><div className="mx-auto max-w-6xl px-5"><h2 className="font-serif text-3xl">Your suggested days</h2>{over && <p className="mt-3 text-sm text-amber-900">The estimate is above your budget. Adjust the plan before booking.</p>}<p className="mt-3 text-sm text-ink-500">{plan.items.map(item => placeById.get(item.placeId)?.name).join(' · ')}</p></div><PlanEditor key={JSON.stringify(plan)} initialPlan={plan} /></div>}
    </>;
}
