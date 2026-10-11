'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import { checkedOn, villasData } from '@/data/villasData';
import VillaTransition from '@/components/scrollytelling/VillaTransition';

const stories = [
    { tab: 'Island villas', title: ['Island state', 'of mind.'], image: '/images/stays/island-concept.webp', alt: 'Concept illustration of a contemporary overwater villa', caption: 'Concept illustration · not a photograph of Soneva Fushi', mood: 'Ocean air. A slower rhythm.' },
    { tab: 'Pool villas', title: ['A little closer', 'to nature.'], image: '/images/stays/nature-concept.webp', alt: 'Concept illustration of a pool villa surrounded by tropical greenery', caption: 'Concept illustration · not a photograph of Six Senses Zil Pasyon', mood: 'Green horizons. Space to unwind.' },
    { tab: 'Alpine chalet', title: ['Take the', 'high road.'], image: '/images/attractions/switzerland-zermatt.jpg', alt: 'Zermatt village and the Matterhorn in the Swiss Alps', caption: 'Swiss Alps inspiration: Zermatt · not The Lodge, Verbier', mood: 'Mountain air. A different perspective.' },
];

export default function VillaGallery() {
    const [selected, setSelected] = useState(0);
    const reduceMotion = useReducedMotion();
    const villa = villasData[selected];
    const story = stories[selected];
    const change = (step: number) => setSelected(index => (index + step + stories.length) % stories.length);

    return (
        <section id="villas" aria-labelledby="stay-title" className="scroll-mt-20 bg-[#f3f2ef] px-5 py-16 text-[#191919] sm:px-8 md:py-24 lg:px-12">
            <div className="mx-auto max-w-[1440px]">
                <VillaTransition />
                <div className="grid grid-cols-3 border-b border-[#191919]/20" aria-label="Choose a stay setting">
                    {stories.map((item, index) => <button key={item.tab} type="button" aria-pressed={selected === index} aria-controls="stay-story" onClick={() => setSelected(index)} className={`relative min-h-16 px-2 py-5 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] sm:text-xs md:text-sm ${selected === index ? 'text-[#191919]' : 'text-[#727272] hover:text-[#191919]'}`}>
                        <span className="mr-3 hidden text-[10px] text-[#7a7066] sm:inline">0{index + 1}</span>{item.tab}
                        {selected === index && <motion.span layoutId="stay-underline" transition={{ duration: reduceMotion ? 0 : 0.3 }} className="absolute bottom-[-1px] left-0 h-[3px] w-full bg-[#bc6448]" />}
                    </button>)}
                </div>
                <div id="stay-story" className="mt-7 grid overflow-hidden rounded-[30px] bg-[#eaf3f8] lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
                    <div className="relative isolate min-w-0 min-h-[360px] overflow-hidden sm:min-h-[470px] lg:min-h-[600px]">
                        <AnimatePresence initial={false}>
                            <motion.div key={story.image} initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.65 }} className="absolute inset-0">
                                <Image src={story.image} alt={story.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
                            </motion.div>
                        </AnimatePresence>
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/10" />
                        <div className="absolute left-6 top-6 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.22em] text-white sm:left-10 sm:top-10"><span className="h-px w-7 bg-white/70" />Stay inspiration / 0{selected + 1}</div>
                        <div className="absolute bottom-10 left-6 right-6 text-white sm:bottom-12 sm:left-10 sm:right-10">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div key={story.tab} initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.25 }}>
                                    <p className="mb-3 font-serif text-xl italic sm:text-2xl">{story.mood}</p>
                                    <h3 className="font-montserrat text-[clamp(2.1rem,3.8vw,4rem)] font-bold uppercase leading-[1.04] tracking-[-0.05em]">{story.title[0]}<br />{story.title[1]}</h3>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <p className="absolute bottom-3 left-6 right-6 text-[9px] leading-relaxed text-white/80 sm:left-10">{story.caption}</p>
                    </div>
                    <div className="flex min-w-0 flex-col bg-gradient-to-br from-[#eaf3fa] via-[#f2f6f6] to-[#fff3df] p-7 text-[#243b49] sm:p-10 lg:p-12">
                        <div className="mb-8 flex items-center justify-between border-b border-[#243b49]/20 pb-5">
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#5b7280]">A property to explore</span>
                            <div className="flex items-center gap-3"><button type="button" onClick={() => change(-1)} aria-label="Previous stay" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#243b49]/25 transition-colors hover:bg-white hover:text-[#243b49] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"><ArrowLeft size={16} /></button><button type="button" onClick={() => change(1)} aria-label="Next stay" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#243b49]/25 transition-colors hover:bg-white hover:text-[#243b49] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"><ArrowRight size={16} /></button></div>
                        </div>
                        <div aria-live="polite" aria-atomic="true">
                            <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#5b7280]">{villa.location}</p>
                            <h4 className="mb-5 font-serif text-4xl leading-tight sm:text-5xl">{villa.name}</h4>
                            <p className="text-sm leading-[1.8] text-[#3e5664]">{villa.description}</p>
                        </div>
                        <div key={villa.id} className="my-7 divide-y divide-[#243b49]/20 border-y border-[#243b49]/20">
                            {[['Who it may suit', villa.goodFor], ['Before you book', villa.checkBeforeBooking]].map(([title, text]) => <details key={title} className="group py-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xs font-semibold [&::-webkit-details-marker]:hidden">{title}<Plus size={15} className="shrink-0 transition-transform group-open:rotate-45" aria-hidden="true" /></summary><p className="mt-3 text-sm leading-relaxed text-[#3e5664]">{text}</p></details>)}
                        </div>
                        <div className="mt-auto">
                            <a href={villa.officialUrl} target="_blank" rel="noopener noreferrer" aria-label={`${villa.name}: visit official website (opens in a new tab)`} className="inline-flex min-h-12 w-full items-center justify-between gap-4 rounded-[30px] border border-[#243b49]/15 bg-white/80 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.1em] text-[#191919] transition-colors hover:bg-[#deedf5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Visit official website<ArrowUpRight size={17} aria-hidden="true" /></a>
                            <p className="mt-4 text-[10px] leading-relaxed text-[#5b7280]">Source: {villa.sourceName}<br />Checked <time dateTime={checkedOn}>11 October 2026</time> · Confirm current rates with the operator.</p>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex flex-col gap-5 border-b border-[#191919]/20 pb-7 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-lg text-xs leading-relaxed text-[#717171]">Independent stay inspiration. Read the comparison for property details and the questions to ask before booking.</p>
                    <Link href="/villas" className="inline-flex shrink-0 items-center gap-5 text-[10px] font-bold uppercase tracking-[0.12em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Compare all three stays<ArrowRight size={18} aria-hidden="true" /></Link>
                </div>
            </div>
        </section>
    );
}
