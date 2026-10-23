'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Reorder } from 'framer-motion';
import { ArrowRight, CalendarDays, Map as MapIcon, Pencil, Plus, Sparkles, Users, Wallet } from 'lucide-react';
import { calculatePlan, emptyPlan, makePlanItem, planSchema, type PlanItem, type TripPlan } from '@/lib/planner';
import { placeById } from '@/lib/places/catalog';
import { CURRENCIES, convert, formatMoney } from '@/lib/currency/config';
import { useCurrency } from '@/components/currency/CurrencyProvider';
import { useAuth } from '@/components/auth/AuthProvider';
import CityMap from '@/components/places/CityMap';
import Dialog from '@/components/ui/Dialog';
import PlannerStop from './PlannerStop';
import PlannerPhoto from './PlannerPhoto';
import PlannerPlacePicker from './PlannerPlacePicker';
import { track } from '@/lib/track';
import { dateLabel, travelDays, endForDays } from '@/lib/travel-dates';
import { INTERESTS, type Interest } from '@/lib/places/types';
import { destinationHref } from '@/lib/destinations';
import { clientJson } from '@/lib/client-json';

const SAMPLE_PLACES = ['colosseum', 'pantheon', 'trevi-fountain'];

export default function PlanEditor({ initialPlan, tripId = null }: { initialPlan?: TripPlan; tripId?: string | null }) {
    const params = useSearchParams(), router = useRouter();
    const [plan, setPlan] = useState<TripPlan>(initialPlan || emptyPlan), [id, setId] = useState(tripId);
    const [selected, setSelected] = useState<string | null>(null), [notice, setNotice] = useState(''), [busy, setBusy] = useState(false);
    const [activeDay, setActiveDay] = useState(1), [mobileMap, setMobileMap] = useState(false);
    const [pickerOpen, setPickerOpen] = useState(false), [budgetOpen, setBudgetOpen] = useState(false);
    const applied = useRef(false);
    const saveRequest = useRef<AbortController | null>(null);
    const mounted = useRef(true), saving = useRef(false);
    useEffect(() => { mounted.current = true; return () => { mounted.current = false; saveRequest.current?.abort(); }; }, []);
    const mapPanel = useRef<HTMLElement>(null);
    const { user, signIn } = useAuth(); const { currency, fx, setCurrency } = useCurrency();
    useEffect(() => {
        if (mobileMap && window.matchMedia('(max-width: 1023px)').matches) mapPanel.current?.scrollIntoView({ block: 'start', behavior: 'auto' });
    }, [mobileMap]);
    useEffect(() => {
        if (initialPlan || applied.current) return;
        applied.current = true;
        const seed = params.get('place');
        const start = params.get('start') || '', end = params.get('end') || '';
        const rangeDays = travelDays(start, end), validRange = rangeDays != null && rangeDays <= 21;
        const days = validRange ? rangeDays : Math.min(21, Math.max(1, Math.floor(Number(params.get('days')) || 3)));
        const travelers = Math.min(20, Math.max(1, Math.floor(Number(params.get('travelers')) || 2)));
        const requested = params.get('places')?.split(',').slice(0, 30) || (seed ? [seed] : []);
        const ids = Array.from(new Set(requested)).filter(placeId => placeById.has(placeId));
        const budget = Number(params.get('budgetEur'));
        const interests = (params.get('interests') || '').split(',').filter((value): value is Interest => INTERESTS.includes(value as Interest));
        setPlan({ ...emptyPlan, days, travelers, budget: Number.isFinite(budget) ? Math.min(1000000, Math.max(0, budget)) : 0, ...(validRange ? { startDate: start, endDate: end } : {}), interests, items: ids.map(placeId => makePlanItem(placeId)) });
    }, [initialPlan, params]);
    const day = Math.min(activeDay, plan.days);
    const dayItems = useMemo(() => plan.items.filter(item => item.day === day), [plan.items, day]);
    const total = useMemo(() => calculatePlan(plan), [plan]);
    const mapPlaces = useMemo(() => Array.from(new Set(dayItems.map(item => item.placeId))).map(placeId => placeById.get(placeId)!), [dayItems]);
    const money = (amount: number) => formatMoney(convert(amount, 'EUR', currency, fx.rates), currency);
    const preferences = new URLSearchParams({ destination: plan.destinationId || 'italy/rome', days: String(plan.days), travelers: String(plan.travelers), budgetEur: String(plan.budget) });
    if (plan.startDate && plan.endDate) { preferences.set('start', plan.startDate); preferences.set('end', plan.endDate); }
    if (plan.interests?.length) preferences.set('interests', plan.interests.join(','));
    const changeDays = (days: number) => setPlan(current => ({ ...current, days, ...(current.startDate ? { endDate: endForDays(current.startDate, days) } : {}), items: current.items.map(item => ({ ...item, day: Math.min(item.day, days) })) }));
    const patch = (itemId: string, value: Partial<PlanItem>) => {
        if (value.day) { setActiveDay(value.day); setSelected(null); }
        setPlan(current => {
            const days = value.day ? Math.max(current.days, value.day) : current.days;
            const updated = value.billing === 'unconfirmed' ? { ...value, quote: null } : value;
            return { ...current, days, ...(current.startDate ? { endDate: endForDays(current.startDate, days) } : {}), items: current.items.map(item => item.id === itemId ? { ...item, ...updated } : item) };
        });
    };
    const move = (item: PlanItem, direction: number) => setPlan(current => {
        const items = [...current.items], position = items.findIndex(value => value.id === item.id);
        const sameDay = items.map((value, index) => ({ ...value, index })).filter(value => value.day === item.day);
        const relative = sameDay.findIndex(value => value.id === item.id), target = sameDay[relative + direction]?.index;
        if (target != null) [items[position], items[target]] = [items[target], items[position]];
        return { ...current, items };
    });
    const addPlace = (placeId: string) => {
        if (plan.items.length >= 100 || dayItems.some(item => item.placeId === placeId)) return;
        const item = makePlanItem(placeId, day);
        setPlan(current => current.items.length < 100 && !current.items.some(value => value.day === day && value.placeId === placeId) ? { ...current, items: [...current.items, item] } : current);
        setSelected(placeId); setPickerOpen(false); setNotice(`${placeById.get(placeId)!.name} added to Day ${day}.`);
    };
    const addSample = () => {
        if (dayItems.length || plan.items.length > 97) return;
        const items = SAMPLE_PLACES.map(placeId => makePlanItem(placeId, day));
        setPlan(current => current.items.length <= 97 && !current.items.some(item => item.day === day) ? { ...current, items: [...current.items, ...items] } : current);
        setSelected(null); setNotice('Sample day added. Make it yours by moving, editing or removing a stop.');
    };
    const save = async () => {
        if (saving.current) return;
        if (!user) { signIn(); return; }
        const validated = planSchema.safeParse(plan);
        if (!validated.success) { setNotice(validated.error.issues[0]?.message || 'Check the plan.'); return; }
        setBusy(true); setNotice('');
        saving.current = true;
        const controller = new AbortController(); saveRequest.current = controller;
        try {
            const { response, data } = await clientJson<{ id?: string; error?: string }>('/api/trips', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, plan: validated.data }) }, { signal: controller.signal });
            if (!mounted.current) return;
            if (!response.ok || !data.id) throw new Error(data.error || 'Could not save your trip. Please try again.');
            setId(data.id); setNotice('Your trip is saved to your account.'); track('trip_created', { city: 'rome', stops: plan.items.length }); router.replace(`/plan/${data.id}`, { scroll: false });
        } catch (error) { if (mounted.current) setNotice(error instanceof Error ? error.message : 'Could not save your trip.'); } finally { saving.current = false; saveRequest.current = null; if (mounted.current) setBusy(false); }
    };
    return <div data-testid="planner-workspace" className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6 lg:px-8">
        <fieldset disabled={busy} aria-busy={busy} className="min-w-0">
        <Link href={destinationHref('/plan', null, Object.fromEntries(preferences))} className="mb-4 inline-flex min-h-10 items-center text-sm text-sky-700 underline">Change destination</Link>
        <header className="relative isolate mb-4 flex min-h-[230px] items-end overflow-hidden rounded-[30px] bg-[#344653] px-6 py-8 sm:min-h-[250px] sm:px-9 sm:py-9">
            <Image src="/images/attractions/italy-colosseum.jpg" alt="The Colosseum in Rome" fill priority sizes="(max-width: 1440px) 100vw, 1440px" className="absolute inset-0 -z-20 object-cover object-[65%_43%]" />
            <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(19,35,45,0.82),rgba(19,35,45,0.45)_65%,rgba(19,35,45,0.2))]" />
            <div className="flex w-full flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"><div><p className="mb-4 flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90"><Image src="/images/flags/it.svg" alt="" width={22} height={16} unoptimized className="rounded-sm" />Italy / Rome</p><h1 className="font-serif text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">Your Rome, day by day.</h1><p className="mt-4 font-serif text-lg text-white/90 sm:text-xl">A little structure. Plenty of possibility.</p></div><span className="rounded-full border border-white/60 bg-cream/95 px-4 py-2.5 text-xs text-ink shadow-sm">{id ? 'Saved journey' : user ? 'Your travel notebook' : 'Preview · sign in to save'}</span></div>
        </header>
        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-[30px] border border-[#E2E8E8] bg-[#FFFDFA] p-3 shadow-[0_4px_20px_rgba(30,53,70,0.025)] sm:gap-4 sm:px-5">
            <label className="flex min-w-0 basis-full items-center gap-2 rounded-full px-2 sm:basis-auto sm:flex-1"><span className="sr-only">Journey name</span><input aria-label="Journey name" maxLength={120} value={plan.title} onChange={event => setPlan(current => ({ ...current, title: event.target.value }))} className="min-w-0 flex-1 bg-transparent py-2 font-serif text-xl text-ink outline-none focus-visible:ring-2 focus-visible:ring-sky-200" /><Pencil aria-hidden="true" size={15} className="shrink-0 text-[#6F8794]" /></label>
            <label className="flex min-h-11 items-center gap-2 rounded-full bg-[#F4F6F5] px-3 text-xs"><CalendarDays aria-hidden="true" size={16} /><select aria-label="Days" value={plan.days} onChange={event => changeDays(Number(event.target.value))} className="bg-transparent py-2 outline-none focus-visible:ring-2 focus-visible:ring-sky-200">{Array.from({ length: 21 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'day' : 'days'}</option>)}</select></label>
            <label className="flex min-h-11 items-center gap-2 rounded-full bg-[#F4F6F5] px-3 text-xs"><Users aria-hidden="true" size={16} /><select aria-label="Travellers" value={plan.travelers} onChange={event => setPlan(current => ({ ...current, travelers: Number(event.target.value) }))} className="min-w-0 bg-transparent py-2 outline-none focus-visible:ring-2 focus-visible:ring-sky-200">{Array.from({ length: 20 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'traveler' : 'travelers'}</option>)}</select></label>
            <label className="flex min-h-11 items-center gap-2 rounded-full bg-[#F4F6F5] px-3 text-xs"><Wallet aria-hidden="true" size={15} /><select aria-label="Planner display currency" value={currency} onChange={event => setCurrency(event.target.value as typeof currency)} className="bg-transparent py-2 outline-none focus-visible:ring-2 focus-visible:ring-sky-200">{CURRENCIES.map(code => <option key={code}>{code}</option>)}</select></label>
            <button type="button" disabled={busy || !plan.items.length} onClick={save} className="ml-auto inline-flex min-h-11 items-center justify-center gap-3 rounded-full border border-sky-200 bg-[#C8E2F6] px-5 text-sm font-semibold text-ink transition-colors hover:bg-sky-200 disabled:opacity-50">{busy ? 'Saving…' : 'Save journey'}<ArrowRight aria-hidden="true" size={16} /></button>
        </div>
        {plan.startDate && plan.endDate && <p className="mb-4 rounded-full bg-[#EAF2F6] px-4 py-2 text-xs text-ink-500">{dateLabel(plan.startDate, true)} – {dateLabel(plan.endDate, true)} · {plan.days} days</p>}
        {!!plan.interests?.length && <p className="mb-4 text-xs capitalize text-ink-500">Your interests: {plan.interests.join(', ')}</p>}
        <div className="mb-3 flex w-fit rounded-full border border-[#DDE8ED] bg-white p-1 lg:hidden"><button type="button" aria-pressed={!mobileMap} onClick={() => setMobileMap(false)} className={`min-h-10 rounded-full px-4 text-sm ${!mobileMap ? 'bg-[#DCEFFB]' : ''}`}>Itinerary</button><button type="button" aria-pressed={mobileMap} onClick={() => setMobileMap(true)} className={`flex min-h-10 items-center gap-2 rounded-full px-4 text-sm ${mobileMap ? 'bg-[#DCEFFB]' : ''}`}><MapIcon size={15} />Map</button></div>
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
            <div className="min-w-0">
                <div className="mb-5 flex items-center gap-3"><div data-lenis-prevent className="flex min-w-0 gap-1 overflow-x-auto rounded-full border border-[#E2E8E8] bg-white/80 p-1" aria-label="Journey days">{Array.from({ length: plan.days }, (_, i) => i + 1).map(value => <button key={value} type="button" aria-pressed={value === day} aria-controls="planner-day-content" onClick={() => { setActiveDay(value); setSelected(null); }} className={`min-h-10 shrink-0 rounded-full px-5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600 ${value === day ? 'bg-[#B7D9F5] text-ink' : 'text-ink-500 hover:bg-sky-50'}`}>Day {value}</button>)}</div><button type="button" aria-label="Add a day" disabled={plan.days === 21} onClick={() => { changeDays(plan.days + 1); setActiveDay(plan.days + 1); setSelected(null); }} className="concierge-icon-button shrink-0 disabled:opacity-30"><Plus size={18} /></button></div>
                <section id="planner-day-content" aria-labelledby="planner-day-title" className={mobileMap ? 'hidden lg:block' : ''}>
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><h2 id="planner-day-title" className="font-serif text-2xl text-ink sm:text-3xl">{dayItems.length ? `Day ${day}, at your own pace.` : 'A day full of possibility.'}</h2><span className="rounded-full bg-[#E7EEF3] px-3 py-1 text-xs text-ink-500">{dayItems.length} {dayItems.length === 1 ? 'stop' : 'stops'}</span></div>
                    {!!dayItems.length && <Reorder.Group aria-label={`Stops for Day ${day}`} axis="y" values={dayItems} onReorder={reordered => setPlan(current => { let index = 0; return { ...current, items: current.items.map(item => item.day === day ? reordered[index++] : item) }; })} className="ml-3.5 space-y-3 border-l border-[#B7D9ED] pl-7">{dayItems.map((item, index) => {
                        const line = total.details.find(value => value.id === item.id)!;
                        return <PlannerStop key={item.id} item={item} number={mapPlaces.findIndex(place => place.id === item.placeId) + 1} travelers={plan.travelers} selected={selected === item.placeId} first={index === 0} last={index === dayItems.length - 1} included={line.included} missing={line.missing} patch={value => patch(item.id, value)} move={direction => move(item, direction)} locate={() => { setSelected(item.placeId); setMobileMap(true); }} remove={() => { setNotice(''); setPlan(current => ({ ...current, items: current.items.filter(value => value.id !== item.id) })); if (selected === item.placeId) setSelected(null); }} />;
                    })}</Reorder.Group>}
                    {!dayItems.length && <div className="rounded-[30px] border border-[#DEE8EC] bg-[#FFFDFA] p-5 sm:p-6"><p className="max-w-md text-sm leading-relaxed text-ink-500">Start with a place you want to see. Add your own stops, or try a sample day of Roman classics.</p><div className="mt-5 grid grid-cols-3 gap-3">{SAMPLE_PLACES.map(placeId => <button key={placeId} type="button" disabled={plan.items.length >= 100} onClick={() => addPlace(placeId)} className="min-w-0 rounded-[20px] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:opacity-50"><span className="block h-24 sm:h-28"><PlannerPhoto id={placeId} name={placeById.get(placeId)!.name} /></span><span className="mt-2 block font-serif text-sm sm:text-base">{placeById.get(placeId)!.name}</span><span className="mt-1 flex items-center gap-1 text-[10px] text-sky-700"><Plus size={11} />Add place</span></button>)}</div><button type="button" disabled={plan.items.length > 97} onClick={addSample} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-sky-200 bg-[#E3F0FB] px-4 text-xs font-medium text-ink hover:bg-sky-200 disabled:opacity-50"><Sparkles size={15} />Try a sample day<ArrowRight size={14} /></button></div>}
                    <div className="mt-5 flex flex-wrap gap-3"><button type="button" disabled={plan.items.length >= 100} onClick={() => setPickerOpen(true)} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-sky-200 bg-[#E3F0FB] px-5 text-sm text-ink hover:bg-sky-200 disabled:opacity-50"><Plus size={17} />Add a place</button><Link href={`/destinations/italy/rome?${preferences}`} className="inline-flex min-h-11 items-center gap-2 rounded-full px-2 text-xs text-ink-500 hover:text-sky-700">Explore the city guide<ArrowRight size={14} /></Link></div>
                    <Link href={`/concierge?${preferences}`} className="mt-7 inline-flex min-h-11 items-center gap-3 rounded-full border border-[#94BCE0] bg-white/70 px-5 text-sm text-ink"><Sparkles size={16} />Ask your concierge<ArrowRight size={15} /></Link>
                    {!user && <p className="mt-5 text-xs leading-relaxed text-ink-500">Your preview stays on this page. <button type="button" onClick={signIn} className="rounded-full font-medium text-sky-700 underline underline-offset-4">Sign in to save</button> before leaving or reloading.</p>}
                </section>
            </div>
            <aside ref={mapPanel} aria-label="Day map and trip budget" className={`min-w-0 scroll-mt-28 space-y-3 lg:sticky lg:top-24 ${mobileMap ? '' : 'hidden lg:block'}`}>
                <button type="button" onClick={() => setMobileMap(false)} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-sky-200 bg-white px-4 text-xs text-ink lg:hidden"><ArrowRight aria-hidden="true" size={14} className="rotate-180" />Back to itinerary</button>
                <div className="relative h-[580px] sm:h-[640px]"><CityMap places={mapPlaces} selectedId={selected} onSelect={setSelected} numbered connectStops emptyMessage={`Add a place to Day ${day} to begin your map.`} />
                    <span className="pointer-events-none absolute left-4 top-4 z-[20] rounded-full border border-white bg-cream/95 px-4 py-2 text-xs text-ink shadow-sm">Day {day} · {mapPlaces.length} places</span>
                    <div className="absolute bottom-12 right-3 z-[20] w-[min(280px,calc(100%-24px))] rounded-[26px] border border-white bg-[#FFFDFA]/95 p-5 shadow-[0_8px_30px_rgba(30,53,70,0.15)] backdrop-blur-md sm:bottom-10 sm:right-4"><p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#52758D]">Your planning estimate</p><p data-testid="plan-total" className="mt-3 break-words font-serif text-3xl leading-tight text-ink">{plan.items.length ? <>≈ {money(total.min)}{total.min !== total.max ? `–${money(total.max)}` : ''}</> : 'Your journey starts here.'}</p><p className="mt-2 text-[11px] leading-relaxed text-ink-500">{plan.travelers} travelers · all {plan.days} days · included items only</p><button type="button" onClick={() => setBudgetOpen(true)} className="mt-4 flex min-h-10 w-full items-center justify-between gap-3 rounded-full text-sm text-ink"><span className="flex items-center gap-2"><Wallet size={16} />{plan.budget ? `Budget ${money(plan.budget)}` : 'Set a budget'}</span><ArrowRight size={16} /></button>{total.overBudget && <p role="status" className="mt-2 text-xs text-amber-800">Above your budget · review costs</p>}{total.missing > 0 && <p className="mt-2 text-xs text-amber-800">{total.missing} stops still need a quote.</p>}</div>
                </div>
                <p className="px-2 text-[10px] leading-relaxed text-ink-500">Numbers and the dashed line show your stop order, not walking directions. Prices are planning estimates; confirm with each venue.</p>
            </aside>
        </div>
        <div className={`mt-5 flex-wrap gap-3 lg:hidden ${mobileMap ? 'hidden' : 'flex'}`}><button type="button" onClick={() => setBudgetOpen(true)} className="concierge-button"><Wallet size={15} />{plan.items.length ? `Estimate ≈ ${money(total.min)}${total.min !== total.max ? `–${money(total.max)}` : ''}` : 'Set a budget'}</button>{total.overBudget && <p role="status" className="w-full text-xs text-amber-800">The upper estimate is above your budget.</p>}</div>
        {notice && <p role="status" className="mt-5 rounded-[20px] bg-[#EAF2F6] px-4 py-3 text-xs leading-relaxed text-ink-500">{notice}</p>}
        <details className="mt-7 text-[10px] leading-relaxed text-ink-500"><summary className="w-fit cursor-pointer rounded-full px-2 py-1 underline underline-offset-4">Photography & credits</summary><p className="mt-2 max-w-2xl">Landmarks from the existing destination collection. Pantheon: <a href="https://commons.wikimedia.org/wiki/File:Pantheon_(Rome)_-_Right_side_and_front.jpg" target="_blank" rel="noreferrer" className="underline">NikonZ7II / Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer" className="underline">CC BY-SA 4.0</a>, resized. Some venue photos illustrate the type of experience rather than the venue itself.</p></details>
        {pickerOpen && <PlannerPlacePicker day={day} selected={dayItems.map(item => item.placeId)} full={plan.items.length >= 100} onAdd={addPlace} onClose={() => setPickerOpen(false)} />}
        {budgetOpen && <Dialog title="A budget that works for you" onClose={() => setBudgetOpen(false)}><p className="text-sm leading-relaxed text-ink-500">Your estimate covers the included stops across all {plan.days} days for {plan.travelers} travelers.</p><p className="my-5 font-serif text-3xl">≈ {money(total.min)}{total.min !== total.max ? `–${money(total.max)}` : ''}</p><label className="block text-sm text-ink-500">Your total budget · {currency}<input autoFocus aria-label="Total trip budget" className="concierge-input mt-3" type="number" min={0} max={1000000} step="0.01" value={plan.budget ? Number(convert(plan.budget, 'EUR', currency, fx.rates).toFixed(2)) : ''} placeholder="Optional" onChange={event => setPlan(current => ({ ...current, budget: convert(Math.min(1000000, Math.max(0, Number(event.target.value))), currency, 'EUR', fx.rates) }))} /></label>{total.overBudget && <p role="status" className="mt-4 rounded-[18px] bg-amber-50 p-3 text-sm text-amber-900">The upper estimate is above your budget. Adjust a stop or enter a confirmed quote.</p>}{total.missing > 0 && <p className="mt-4 text-sm text-amber-900">{total.missing} items need a quote before they can be included.</p>}{total.details.some(line => line.included) && <p className="mt-4 text-xs text-ink-500">Colosseum / Forum access is counted once per day for the same ticket quantity. Confirm ticket validity and inclusions.</p>}<p className="mt-5 text-xs leading-relaxed text-ink-500">Flights, insurance, additional meals, local taxes and unlisted expenses are excluded. Estimates do not guarantee availability.</p><button type="button" onClick={() => setBudgetOpen(false)} className="concierge-button concierge-button-primary mt-6 w-full">Done</button></Dialog>}
        </fieldset>
    </div>;
}
