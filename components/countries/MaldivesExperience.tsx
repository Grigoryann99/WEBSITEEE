'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Sun, CloudRain, Waves, MapPin, ArrowRight, Compass, Wallet } from 'lucide-react';
import { calculateTravelBudget } from '@/lib/travelBudget';

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const places = [
    { name: 'Malé', tag: 'City & arrival hub', x: 52, y: 52, text: 'A city stop for culture and local life. Keep your arrival day flexible and confirm your onward island transfer with your accommodation.' },
    { name: 'Maafushi', tag: 'Local island inspiration', x: 64, y: 76, text: 'Consider a local-island stay if you enjoy village life and choosing your own excursions. Ask your guesthouse about beach access and the current transfer schedule.' },
    { name: 'Baa Atoll', tag: 'Island & resort inspiration', x: 35, y: 24, text: 'Explore a different atoll setting, including the Soneva Fushi villas in our stay shortlist. Confirm the complete transfer route before combining it with another island.' },
];
const days = [
    ['Arrival and island transfer', 'Arrange the airport-to-island transfer before arrival. After check-in, confirm your return transfer, meal arrangements, and which beach to use. Leave this day free of prepaid activities in case the journey takes longer than planned.'],
    ['Beach access and a snorkeling plan', 'Find out which beach you can use and whether snorkeling requires a guide or boat trip. Ask about equipment, swimming conditions, and the total activity cost before choosing an operator. On a local island, check designated swimwear areas with your host.'],
    ['Your first boat excursion', 'Use this day for a snorkeling or boat trip if conditions allow. Before paying, confirm the duration, equipment, group size, cancellation terms, and any additional charges. Keep an alternative on the island if the trip is postponed.'],
    ['A day without a transfer', 'Stay on your island rather than adding another journey. On a local island, ask your host about cafés and village walks; at a resort, compare included activities with paid options. Keep the day available for an excursion delayed by weather.'],
    ['Choose a second activity', 'Decide whether another excursion adds something different to your trip. Compare its itinerary and cost with what you have already done. If you would rather spend the day at the beach, leave it unbooked.'],
    ['Confirm your departure arrangements', 'Check the transfer pickup point, departure time, luggage arrangements, and airport arrival plan with your accommodation. Use the rest of the day for a postponed activity only if it leaves enough time to pack and settle your bill.'],
    ['Island transfer and flight home', 'Follow the departure timing agreed with your accommodation and airline. Keep booking confirmations and transfer contact details available. Leave this day for travel rather than scheduling an excursion before your flight.'],
];
const buttonClass = 'relative rounded-full px-4 py-3 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700';
const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

function Heading({ number, title, children }: { number: string; title: string; children: ReactNode }) {
    return <div className="mb-8"><p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">{number} / MALDIVES TRIP PLANNER</p><h2 className="font-serif text-4xl sm:text-5xl">{title}</h2><p className="mt-4 max-w-2xl leading-relaxed text-slate-600">{children}</p></div>;
}

export default function MaldivesExperience() {
    const reduced = useReducedMotion();
    const [place, setPlace] = useState(0);
    const [month, setMonth] = useState(0);
    const [stay, setStay] = useState<'local' | 'resort'>('local');
    const [day, setDay] = useState(0);
    const [nights, setNights] = useState(6);
    const [travelers, setTravelers] = useState(2);
    const [costs, setCosts] = useState({ room: '', meals: '', transfers: '', flights: '', extras: '' });
    const numericCosts = Object.fromEntries(Object.entries(costs).map(([key,value]) => [key, Number(value)])) as Record<keyof typeof costs, number>;
    const budget = calculateTravelBudget({ nights, travelers, ...numericCosts });
    const season = month < 3 ? 'dry' : month === 3 || month === 11 ? 'transition' : 'wet';
    const currentPlace = places[place];
    const panelMotion = { initial: reduced ? false as const : { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: reduced ? 0 : 0.25 } };
    const costFields: [keyof typeof costs, string][] = [
        ['room','Accommodation / night for your group'],
        ['meals','Meals / person / day'],
        ['transfers','Return island transfers / person'],
        ['flights','Return international flights / person'],
        ['extras','Activities, taxes & other costs / group'],
    ];

    return (
        <div className="space-y-20">
            <section className="relative overflow-hidden rounded-[2rem] bg-[#063f46] px-6 py-12 text-white sm:p-12">
                <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full border border-white/10" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-200">Maldives · planning tools</p>
                <h2 className="mt-4 max-w-3xl font-serif text-4xl sm:text-6xl">Plan your Maldives trip<br /><span className="italic text-teal-200">before you book.</span></h2>
                <p className="mt-6 max-w-xl leading-relaxed text-white/80">Compare a local-island stay with a resort, check seasonal conditions, and plan seven days from one island base. Add your accommodation and transfer quotes to calculate a trip total.</p>
                <nav aria-label="Maldives planner sections" className="mt-8 flex flex-wrap gap-3">{[['Explore','island-explorer'],['When to go','island-season'],['Your stay','island-stay'],['Your week','island-week'],['Your budget','island-budget']].map(([label,id]) => <a key={id} href={'#'+id} className="rounded-full border border-white/30 px-4 py-3 text-sm hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">{label} <ArrowRight size={14} className="ml-2 inline" aria-hidden="true" /></a>)}</nav>
            </section>

            <section id="island-explorer" className="scroll-mt-24">
                <Heading number="01" title="Malé, Maafushi or Baa Atoll?">Select a place to see what to consider before adding it to your route. Use the diagram to compare options; confirm the actual transfer route with your accommodation.</Heading>
                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="relative min-h-[360px] overflow-hidden rounded-3xl bg-[#073e48]">
                        <svg viewBox="0 0 400 360" className="absolute h-full w-full opacity-50" aria-hidden="true">
                            <defs><pattern id="island-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeOpacity=".12" /></pattern></defs>
                            <rect width="400" height="360" fill="url(#island-grid)" />
                            <path d="M140 86 Q110 160 208 187 T256 274" fill="none" stroke="#5eead4" strokeWidth="2" strokeDasharray="5 8" />
                            {[ [140,86], [208,187], [256,274] ].map(([x,y]) => <ellipse key={y} cx={x} cy={y} rx="30" ry="14" fill="#99f6e4" fillOpacity=".18" transform={'rotate(-25 '+x+' '+y+')'} />)}
                        </svg>
                        <span className="absolute left-6 top-6 text-xs uppercase tracking-widest text-teal-200">Island explorer</span>
                        {places.map((item,i) => <button key={item.name} onClick={()=>setPlace(i)} aria-pressed={place===i} aria-controls="island-place-panel" style={{left:item.x+'%',top:item.y+'%'}} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl px-3 py-2 text-left text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-200">
                            <motion.span animate={!reduced && place===i ? { scale: [1,1.15,1] } : { scale: 1 }} transition={{duration:0.6}} className={'mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full border '+(place===i?'border-teal-200 bg-teal-300 text-[#063f46]':'border-white/50 bg-[#063f46]')}><MapPin size={20} aria-hidden="true" /></motion.span><span className="block whitespace-nowrap rounded-full bg-[#063f46]/90 px-3 py-1 text-sm">{item.name}</span>
                        </button>)}
                        <p className="absolute bottom-5 left-6 right-6 text-xs text-white/65">Illustrative map · not to scale · lines are not transport routes</p>
                    </div>
                    <div id="island-place-panel" className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
                        <div className="relative h-56 overflow-hidden"><Image src="/images/travel-hero-coast-desktop.webp" alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /><span className="absolute bottom-3 left-4 rounded-full bg-black/60 px-3 py-1 text-xs text-white">Illustrative island scene</span></div>
                        <AnimatePresence mode="wait" initial={false}><motion.div key={place} {...panelMotion} className="p-6 sm:p-8"><p className="text-xs uppercase tracking-widest text-teal-700">{currentPlace.tag}</p><h3 className="mt-3 font-serif text-3xl">{currentPlace.name}</h3><p className="mt-4 leading-relaxed text-slate-600">{currentPlace.text}</p><a href="#maldives-highlights" className="mt-5 inline-flex items-center gap-2 font-semibold text-teal-700 underline underline-offset-4">Browse island highlights <ArrowRight size={16} aria-hidden="true" /></a></motion.div></AnimatePresence>
                    </div>
                </div>
            </section>

            <section id="island-season" className="scroll-mt-24">
                <Heading number="02" title="What changes in your travel month?">Select your month for a monsoon overview. Use it to plan flexible boat days, then check the local forecast closer to departure.</Heading>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">{months.map((name,i)=><button key={name} aria-pressed={month===i} aria-controls="season-panel" onClick={()=>setMonth(i)} className={buttonClass+' '+(month===i?'bg-[#063f46] text-white':'bg-white text-slate-700 hover:bg-teal-50')}>{name.slice(0,3)}</button>)}</div>
                <div id="season-panel" className="mt-6 rounded-3xl bg-gradient-to-br from-teal-50 to-sky-50 p-6 sm:p-10">
                    <AnimatePresence mode="wait" initial={false}><motion.div key={month} {...panelMotion} className="flex flex-col gap-5 sm:flex-row sm:items-start">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-teal-700">{season==='dry'?<Sun size={32}/>:season==='wet'?<CloudRain size={32}/>:<Waves size={32}/>}</div>
                        <div><p className="text-sm text-teal-700">{months[month]}</p><h3 className="mt-1 font-serif text-3xl">{season==='dry'?'The drier monsoon':season==='wet'?'The wetter monsoon':'A changing season'}</h3><p className="mt-3 max-w-2xl leading-relaxed text-slate-600">{season==='dry'?'January–March is the dry monsoon period. Consider it for a beach-focused trip, while still checking the forecast before water activities.':season==='wet'?'Mid-May–November is generally the wet monsoon period. Keep boat activities flexible and leave room to rearrange your days; early May is near the seasonal change.':'April and December are transition months. Build a flexible itinerary and check local conditions rather than expecting a fixed weather pattern.'}</p></div>
                    </motion.div></AnimatePresence>
                    <p className="mt-6 text-xs leading-relaxed text-slate-500">Climate guidance, not a forecast. Conditions vary across the atolls. Source: <a href="https://www.meteorology.gov.mv/climate" className="underline">Maldives Meteorological Service</a>.</p>
                </div>
            </section>

            <section id="island-stay" className="scroll-mt-24">
                <Heading number="03" title="Local guesthouse or island resort?">Compare beach access, meals, activities, and transfers before choosing accommodation. Open either option for the questions to send your host.</Heading>
                <div className="mb-6 flex flex-wrap gap-2">{(['local','resort'] as const).map(value=><button key={value} aria-pressed={stay===value} aria-controls="stay-panel" onClick={()=>setStay(value)} className={buttonClass+' '+(stay===value?'bg-[#063f46] text-white':'bg-white text-slate-700')}>{value==='local'?'Local island':'Resort island'}</button>)}</div>
                <div id="stay-panel" className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10">
                    <AnimatePresence mode="wait" initial={false}><motion.div key={stay} {...panelMotion} className="grid gap-8 md:grid-cols-2">
                        <div><Compass className="mb-4 text-teal-700" aria-hidden="true"/><h3 className="font-serif text-3xl">{stay==='local'?'Guesthouse on a local island':'Accommodation on a resort island'}</h3><p className="mt-4 leading-relaxed text-slate-600">{stay==='local'?'A guesthouse on an inhabited island may suit you if village walks and independent excursion choices matter. Dress modestly in the community and use designated swimwear beaches.':'A resort may suit you if you prefer arranging accommodation, dining, and activities through one operator. Compare the exact villa category and what the chosen rate includes.'}</p></div>
                        <div className="rounded-2xl bg-teal-50 p-6"><p className="font-semibold">Before you choose</p><ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">{(stay==='local'?['Ask which beach permits swimwear and how far it is from your room.','Confirm boat times and the full return-transfer cost.','Check meal options and which excursions run on your dates.']:['Ask for a complete quotation including transfers and taxes.','Compare meal plans and activity charges, not just the room rate.','Check arrival-flight compatibility with the transfer schedule.']).map(text=><li key={text} className="flex gap-3"><span className="text-teal-700" aria-hidden="true">↗</span>{text}</li>)}</ul><a href={stay==='local'?'#maldives-highlights':'/villas'} className="mt-5 inline-block font-semibold text-teal-700 underline underline-offset-4">{stay==='local'?'Explore island highlights':'Compare sourced stays'} →</a></div>
                    </motion.div></AnimatePresence>
                </div>
            </section>

            <section id="island-week" className="scroll-mt-24">
                <Heading number="04" title="Seven days, one island base.">This sample plan includes arrival and departure days, two optional activity days, and time to rearrange plans. Select each day for the checks to make with your host.</Heading>
                <div className="flex flex-wrap gap-2">{days.map((_,i)=><button key={i} aria-pressed={day===i} aria-controls="day-panel" onClick={()=>setDay(i)} className={buttonClass+' '+(day===i?'bg-[#063f46] text-white':'bg-white text-slate-700')}>Day {i+1}</button>)}</div>
                <div id="day-panel" className="relative mt-6 overflow-hidden rounded-3xl bg-[#063f46] p-8 text-white sm:p-12">
                    <span className="pointer-events-none absolute right-4 top-0 font-serif text-[180px] leading-none text-white/5" aria-hidden="true">{String(day+1).padStart(2,'0')}</span>
                    <AnimatePresence mode="wait" initial={false}><motion.div key={day} {...panelMotion} className="relative max-w-2xl"><p className="text-xs uppercase tracking-widest text-teal-200">Day {day+1} / 7</p><h3 className="mt-4 font-serif text-3xl sm:text-4xl">{days[day][0]}</h3><p className="mt-5 leading-relaxed text-white/80">{days[day][1]}</p></motion.div></AnimatePresence>
                    <div className="relative mt-8 flex gap-3"><button disabled={day===0} onClick={()=>setDay(value=>value-1)} className="rounded-full border border-white/30 px-5 py-3 text-sm disabled:opacity-40">Previous day</button><button disabled={day===6} onClick={()=>setDay(value=>value+1)} className="rounded-full bg-teal-200 px-5 py-3 text-sm font-semibold text-[#063f46] disabled:opacity-40">Next day →</button></div>
                </div>
            </section>

            <section id="island-budget" className="scroll-mt-24">
                <Heading number="05" title="What will your trip cost?">Enter your quotes in USD to add accommodation, meals, flights, island transfers, and extras. The calculator shows a group total and a cost per traveler; it does not supply current prices.</Heading>
                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
                        <div className="mb-8 grid gap-6 sm:grid-cols-2">
                            <label className="text-sm font-semibold">Nights: {nights}<input aria-label="Number of nights" type="range" min="1" max="14" value={nights} onChange={e=>setNights(Number(e.target.value))} className="mt-4 block w-full accent-teal-700" /></label>
                            <label className="text-sm font-semibold">Travelers: {travelers}<input aria-label="Number of travelers" type="range" min="1" max="8" value={travelers} onChange={e=>setTravelers(Number(e.target.value))} className="mt-4 block w-full accent-teal-700" /></label>
                        </div>
                        <div className="space-y-5">{costFields.map(([key,label])=><label key={key} className="block text-sm text-slate-600">{label}<input type="number" inputMode="decimal" min="0" max="1000000" step="0.01" value={costs[key]} placeholder="Enter your quote in USD" onChange={e=>{const value=e.target.value; if(value==='' || Number.isFinite(Number(value)) && Number(value)>=0 && Number(value)<=1000000) setCosts(current=>({...current,[key]:value}));}} className="mt-2 block w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20" /></label>)}</div>
                    </div>
                    <div className="self-start rounded-3xl bg-[#063f46] p-8 text-white lg:sticky lg:top-24">
                        <Wallet className="text-teal-200" aria-hidden="true"/><p className="mt-5 text-sm text-white/70">Your planning total</p>
                        <motion.p aria-live="polite" aria-atomic="true" key={budget.total} initial={reduced?false:{y:6}} animate={{y:0}} className="mt-2 break-words font-serif text-5xl">{budget.total?money(budget.total):'Add your costs'}</motion.p>
                        <p className="mt-3 text-sm text-teal-200">{nights} nights · {travelers} {travelers===1?'traveler':'travelers'}</p>
                        <dl className="mt-8 space-y-4 text-sm">{[['Accommodation',budget.accommodation],['Meals ('+(nights+1)+' days)',budget.food],['Flights & transfers',budget.transport],['Activities & other costs',numericCosts.extras]].map(([label,value])=><div key={label} className="flex justify-between gap-3"><dt className="text-white/70">{label}</dt><dd>{money(Number(value))}</dd></div>)}</dl>
                        <p className="mt-6 border-t border-white/20 pt-5">{money(budget.perPerson)} <span className="text-sm text-white/70">per person</span></p>
                        <p className="mt-5 text-xs leading-relaxed text-white/65">Empty fields count as zero. The total includes only what you enter. Use the group room cost; meals cover nights + 1 days. Add taxes, insurance, or extras yourself and avoid counting included meals twice.</p>
                    </div>
                </div>
            </section>
            <aside className="rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-relaxed text-slate-600">
                <p className="font-semibold text-slate-900">Sources & planning notes</p><p className="mt-2">Climate: <a className="underline" href="https://www.meteorology.gov.mv/climate">Maldives Meteorological Service</a>. Transfers and local beach etiquette: <a className="underline" href="https://visitmaldives.s3.amazonaws.com/jqJEjxY5/hzzsjdh5.pdf">Visit Maldives tourism guide</a>. Baa Atoll stay reference: <a className="underline" href="https://soneva.com/resorts/soneva-fushi/villas/">Soneva Fushi</a>. Checked 11 October 2026.</p><p className="mt-2">The map is schematic. Suitability notes and the sample week are editorial suggestions, not a guided tour or a firsthand review. Confirm transfer schedules and activity availability with your host. The budget uses your inputs, not market rate estimates.</p>
            </aside>
        </div>
    );
}
