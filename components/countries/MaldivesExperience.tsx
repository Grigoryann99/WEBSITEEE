'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Sun, CloudRain, Waves, ArrowRight, Compass, Wallet } from 'lucide-react';
import { calculateTravelBudget } from '@/lib/travelBudget';
import { maldivesPlaces as places } from '@/lib/maldivesPlaces';
import MaldivesIslandMap from './MaldivesIslandMap';

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
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
    const [budgetStep, setBudgetStep] = useState(0);
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

    const photos = ['/images/attractions/maldives-maafushi-island.jpg', '/images/attractions/maldives-male-grand-friday-mosque.jpg', '/images/attractions/maldives-baa-atoll-hanifaru-bay.jpg'];
    const budgetGroups = [['flights','transfers'], ['room','meals'], ['extras']];
    const breakdown = [['Accommodation',budget.accommodation], ['Meals',budget.food], ['Flights & transfers',budget.transport], ['Extras',numericCosts.extras]] as const;

    return (
        <div className="maldives-editorial space-y-24 bg-[#f5f2eb] px-5 py-10 text-[#253732] sm:px-10 sm:py-16">
            <section className="grid gap-10 border-b border-[#c9c8bc] pb-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
                <div><p className="text-xs uppercase tracking-[0.24em] text-[#52655b]">The Maldives / a field guide</p><h2 className="mt-5 font-serif text-4xl leading-tight sm:text-6xl lg:text-7xl">A little island.<br /><span className="italic text-[#537367]">A world of choices.</span></h2></div>
                <div><p className="max-w-lg leading-relaxed text-[#52655b]">Find your island, make room for the weather, and put a number to your plans. A practical companion for the days before you book.</p><nav aria-label="Maldives planner sections" className="mt-7 flex flex-wrap gap-x-6 gap-y-4">{[['Islands','island-explorer'],['Seasons','island-season'],['Stays','island-stay'],['Seven days','island-week'],['Budget','island-budget']].map(([label,id],i)=><a key={id} href={'#'+id} className="border-b border-[#a8b7aa] pb-2 text-sm focus-visible:outline focus-visible:outline-2"><span className="mr-2 text-xs text-[#6a7d70]">0{i+1}</span>{label}</a>)}</nav></div>
            </section>

            <section id="island-explorer" className="scroll-mt-24">
                <Heading number="01" title="Three ways into the islands.">The arrival city, a local island, or an atoll stay. Select a setting and explore its location before deciding on transfers.</Heading>
                <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
                    <div id="island-place-panel" className="relative min-h-[440px] overflow-hidden bg-[#c9d3c7] sm:min-h-[620px]">
                        <AnimatePresence initial={false}><motion.div key={place} initial={reduced?false:{opacity:0,scale:1.04}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:reduced?0:0.6}} className="absolute inset-0"><Image src={photos[place]} alt="Island-life inspiration" fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" /></motion.div></AnimatePresence>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-7 text-white sm:p-10"><p className="text-xs uppercase tracking-[0.2em]">{currentPlace.tag}</p><h3 className="mt-4 font-serif text-5xl sm:text-6xl">{currentPlace.name}</h3><p className="mt-4 max-w-lg leading-relaxed">{currentPlace.text}</p><p className="mt-6 text-xs text-white/75">Mood photograph · not a verified view of the selected location</p></div>
                    </div>
                    <div className="flex flex-col">
                        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#657a6b]">Choose your setting</p>
                        {places.map((item,i)=><button key={item.name} onClick={()=>setPlace(i)} aria-pressed={place===i} aria-controls="island-place-panel island-location-map" className="group flex min-h-20 items-center gap-5 border-b border-[#c9c8bc] py-5 text-left focus-visible:outline focus-visible:outline-2"><span className="text-xs text-[#6a7d70]">0{i+1}</span><span className={'flex-1 font-serif text-3xl transition-colors '+(place===i?'text-[#253732]':'text-[#788478]')}>{item.name}</span><ArrowRight size={20} className={place===i?'opacity-100':'opacity-30'} aria-hidden="true" /></button>)}
                        <MaldivesIslandMap selectedPlace={place} onSelect={setPlace} />
                        <a href="#maldives-highlights" className="mt-6 inline-flex items-center gap-3 text-sm underline underline-offset-4">Explore island highlights <ArrowRight size={16} aria-hidden="true" /></a>
                    </div>
                </div>
            </section>

            <section id="island-season" className="scroll-mt-24">
                <Heading number="02" title="What changes in your travel month?">Select your month for a monsoon overview. Use it to plan flexible boat days, then check the local forecast closer to departure.</Heading>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">{months.map((name,i)=><button key={name} aria-pressed={month===i} aria-controls="season-panel" onClick={()=>setMonth(i)} className={buttonClass+' '+(month===i?'bg-[#063f46] text-white':'bg-white text-slate-700 hover:bg-teal-50')}>{name.slice(0,3)}</button>)}</div>
                <div id="season-panel" className="mt-6 border-t border-b border-[#c9c8bc] bg-[#edece2] p-6 sm:p-10">
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
                <div id="stay-panel" className="border-t border-b border-[#c9c8bc] bg-transparent p-6 sm:p-10">
                    <AnimatePresence mode="wait" initial={false}><motion.div key={stay} {...panelMotion} className="grid gap-8 md:grid-cols-2">
                        <div><Compass className="mb-4 text-teal-700" aria-hidden="true"/><h3 className="font-serif text-3xl">{stay==='local'?'Guesthouse on a local island':'Accommodation on a resort island'}</h3><p className="mt-4 leading-relaxed text-slate-600">{stay==='local'?'A guesthouse on an inhabited island may suit you if village walks and independent excursion choices matter. Dress modestly in the community and use designated swimwear beaches.':'A resort may suit you if you prefer arranging accommodation, dining, and activities through one operator. Compare the exact villa category and what the chosen rate includes.'}</p></div>
                        <div className="border-l-2 border-[#a8b7aa] bg-transparent p-6"><p className="font-semibold">Before you choose</p><ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">{(stay==='local'?['Ask which beach permits swimwear and how far it is from your room.','Confirm boat times and the full return-transfer cost.','Check meal options and which excursions run on your dates.']:['Ask for a complete quotation including transfers and taxes.','Compare meal plans and activity charges, not just the room rate.','Check arrival-flight compatibility with the transfer schedule.']).map(text=><li key={text} className="flex gap-3"><span className="text-teal-700" aria-hidden="true">↗</span>{text}</li>)}</ul><a href={stay==='local'?'#maldives-highlights':'/stay'} className="mt-5 inline-block font-semibold text-teal-700 underline underline-offset-4">{stay==='local'?'Explore island highlights':'Compare sourced stays'} →</a></div>
                    </motion.div></AnimatePresence>
                </div>
            </section>

            <section id="island-week" className="scroll-mt-24">
                <Heading number="04" title="Seven days. A slower pace.">One island base, two optional excursions, and space to change your mind. Select a day to open the planning notes.</Heading>
                <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                    <nav aria-label="Seven-day itinerary" className="border-t border-[#c9c8bc]">{days.map((item,i)=><button key={i} onClick={()=>setDay(i)} aria-pressed={day===i} aria-controls="day-panel" className={'flex w-full items-center gap-5 border-b border-[#c9c8bc] px-3 py-5 text-left transition-colors focus-visible:outline focus-visible:outline-2 '+(day===i?'bg-[#e1e5d8]':'hover:bg-[#ecece2]')}><span className="font-serif text-3xl text-[#6a7d70]">{String(i+1).padStart(2,'0')}</span><span className="flex-1 text-sm">{item[0]}</span>{day===i&&<ArrowRight size={18} aria-hidden="true" />}</button>)}</nav>
                    <div id="day-panel" className="self-start lg:sticky lg:top-24">
                        <div className="relative h-64 overflow-hidden sm:h-80"><AnimatePresence initial={false}><motion.div key={day} initial={reduced?false:{opacity:0,scale:1.04}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:reduced?0:0.55}} className="absolute inset-0"><Image src={photos[day%3]} alt="Island-life inspiration for your sample week" fill sizes="(max-width:1024px) 100vw, 60vw" className="object-cover" /></motion.div></AnimatePresence><span className="absolute bottom-4 left-5 bg-black/50 px-3 py-1 text-xs text-white">Illustrative mood photograph</span></div>
                        <AnimatePresence mode="wait" initial={false}><motion.div key={day} {...panelMotion} className="border-b border-[#c9c8bc] py-8"><p className="text-xs uppercase tracking-[0.2em] text-[#657a6b]">Day {day+1} / your sample week</p><h3 className="mt-4 font-serif text-3xl sm:text-4xl">{days[day][0]}</h3><p className="mt-5 max-w-xl leading-relaxed text-[#52655b]">{days[day][1]}</p></motion.div></AnimatePresence>
                        <div className="mt-6 flex justify-between"><button disabled={day===0} onClick={()=>setDay(value=>value-1)} className="px-2 py-3 text-sm disabled:opacity-30">← Previous day</button><button disabled={day===6} onClick={()=>setDay(value=>value+1)} className="px-2 py-3 text-sm disabled:opacity-30">Next day →</button></div>
                    </div>
                </div>
            </section>

            <section id="island-budget" className="scroll-mt-24">
                <Heading number="05" title="What will your trip cost?">Enter your quotes in USD to add accommodation, meals, flights, island transfers, and extras. The calculator shows a group total and a cost per traveler; it does not supply current prices.</Heading>
                <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                    <div>
                        <div className="mb-8 grid grid-cols-3 border-b border-[#c9c8bc]">{['Getting there','Your stay','The extras'].map((label,i)=><button key={label} onClick={()=>setBudgetStep(i)} aria-pressed={budgetStep===i} aria-controls="budget-fields" className={'border-b-2 px-2 py-4 text-left text-sm focus-visible:outline focus-visible:outline-2 '+(budgetStep===i?'border-[#253732]':'border-transparent text-[#7a8275]')}><span className="mb-2 block text-xs">0{i+1}</span>{label}</button>)}</div>
                        <div className="mb-8 grid gap-6 sm:grid-cols-2"><label className="text-sm">Nights: {nights}<input aria-label="Number of nights" type="range" min="1" max="14" value={nights} onChange={e=>setNights(Number(e.target.value))} className="mt-4 block w-full accent-[#537367]" /></label><label className="text-sm">Travelers: {travelers}<input aria-label="Number of travelers" type="range" min="1" max="8" value={travelers} onChange={e=>setTravelers(Number(e.target.value))} className="mt-4 block w-full accent-[#537367]" /></label></div>
                        <div id="budget-fields"><AnimatePresence mode="wait" initial={false}><motion.div key={budgetStep} {...panelMotion} className="min-h-64 space-y-7">{costFields.filter(([key])=>budgetGroups[budgetStep].includes(key)).map(([key,label])=><label key={key} className="block text-sm text-[#52655b]">{label}<div className="mt-3 flex items-center gap-3 border-b border-[#9da99a] bg-white/40 px-3"><span className="text-xs">USD</span><input type="number" inputMode="decimal" min="0" max="1000000" step="0.01" value={costs[key]} placeholder="0" onChange={e=>{const value=e.target.value; if(value==='' || Number.isFinite(Number(value))&&Number(value)>=0&&Number(value)<=1000000)setCosts(current=>({...current,[key]:value}));}} className="min-w-0 flex-1 bg-transparent py-4 text-2xl text-[#253732] focus:outline-none focus:ring-2 focus:ring-[#537367]" /></div></label>)}<p className="text-xs leading-relaxed text-[#657a6b]">{budgetStep===0?'Enter return-flight and island-transfer quotes for one traveler.':budgetStep===1?'Enter the nightly room quote for your whole group and daily meals for one traveler.':'Add group totals for activities, taxes, insurance, and any other costs not already included.'}</p></motion.div></AnimatePresence></div>
                        <div className="mt-8 flex justify-between border-t border-[#c9c8bc] pt-5"><button disabled={budgetStep===0} onClick={()=>setBudgetStep(v=>v-1)} className="px-2 py-3 text-sm disabled:opacity-30">← Back</button><button disabled={budgetStep===2} onClick={()=>setBudgetStep(v=>v+1)} className="px-2 py-3 text-sm disabled:opacity-30">Continue →</button></div>
                    </div>
                    <div className="self-start bg-[#e2e5d9] p-7 sm:p-10 lg:sticky lg:top-24">
                        <Wallet size={22} className="text-[#657a6b]" aria-hidden="true"/><p className="mt-5 text-xs uppercase tracking-[0.2em]">Your trip, in numbers</p><motion.p aria-live="polite" aria-atomic="true" key={budget.total} initial={reduced?false:{y:6}} animate={{y:0}} className="mt-4 break-words font-serif text-5xl">{money(budget.total)}</motion.p><p className="mt-3 text-sm text-[#52655b]">{nights} nights · {travelers} {travelers===1?'traveler':'travelers'}</p>
                        <div className="mt-8 flex h-2 overflow-hidden bg-white/60" aria-hidden="true">{breakdown.map(([label,value],i)=><motion.div key={label} animate={{width:budget.total?(value/budget.total*100)+'%':'0%'}} transition={{duration:reduced?0:0.35}} style={{backgroundColor:['#253732','#72866a','#b69c72','#a4bdb3'][i]}} />)}</div>
                        <dl className="mt-6 space-y-4 text-sm">{breakdown.map(([label,value],i)=><div key={label} className="flex justify-between gap-3"><dt className="flex items-center gap-2 text-[#52655b]"><span className="h-2 w-2" style={{backgroundColor:['#253732','#72866a','#b69c72','#a4bdb3'][i]}} aria-hidden="true" />{label}</dt><dd>{money(value)}</dd></div>)}</dl><p className="mt-6 border-t border-[#aab5a0] pt-5"><span className="font-serif text-3xl">{money(budget.perPerson)}</span> <span className="text-sm text-[#52655b]">per person</span></p><p className="mt-5 text-xs leading-relaxed text-[#52655b]">Only your entered quotes are included. Empty fields count as zero. Meals cover nights + 1 days. Add any taxes or extras yourself, and avoid counting included meals twice.</p>
                    </div>
                </div>
            </section>
            <aside className="border-t border-[#c9c8bc] bg-transparent p-6 text-sm leading-relaxed text-slate-600">
                <p className="font-semibold text-slate-900">Sources & planning notes</p><p className="mt-2">Climate: <a className="underline" href="https://www.meteorology.gov.mv/climate">Maldives Meteorological Service</a>. Transfers and local beach etiquette: <a className="underline" href="https://visitmaldives.s3.amazonaws.com/jqJEjxY5/hzzsjdh5.pdf">Visit Maldives tourism guide</a>. Baa Atoll stay reference: <a className="underline" href="https://soneva.com/resorts/soneva-fushi/villas/">Soneva Fushi</a>. Checked 11 October 2026.</p><p className="mt-2">The map shows geographic context, not a planned transfer route. Suitability notes and the sample week are editorial suggestions, not a guided tour or a firsthand review. Confirm transfer schedules and activity availability with your host. The budget uses your inputs, not market rate estimates.</p>
            </aside>
        </div>
    );
}
