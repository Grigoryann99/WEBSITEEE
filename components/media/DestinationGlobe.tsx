'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import DestinationIcon from './DestinationIcon';

const destinations = [
    {
        title: "Maldives: Island Escapes",
        desc: "Explore island destinations and coastal highlights to find inspiration for your next beach getaway.",
        href: "/countries/maldives",
    },
    {
        title: "Switzerland: Alpine Adventures",
        desc: "Discover mountain landscapes, lakes, and Swiss destinations to explore when planning an Alpine escape.",
        href: "/countries/switzerland",
    },
    {
        title: "Greece: Islands & Culture",
        desc: "Browse Greek destinations, historic landmarks, and island highlights to shape your own itinerary.",
        href: "/countries/greece",
    },
    {
        title: "South Africa: Nature & Wildlife",
        desc: "Explore national parks, coastal scenery, and city highlights for a trip that combines nature and culture.",
        href: "/countries/south_africa",
    },
    {
        title: "Japan: Cities & Traditions",
        desc: "Discover Japanese destinations, temples, and cultural landmarks as a starting point for your journey.",
        href: "/countries/japan",
    }
];

export default function DestinationGlobe() {
    const reducedMotion = useReducedMotion();

    return (
        <div
            className="relative isolate bg-white flex flex-col items-center justify-center py-24 md:py-32 px-6 overflow-clip border-t border-gray-100"
        >
            {/* Keep the image viewport-sized instead of enlarging it across the tall mobile list. */}
            <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
                <div className="sticky top-0 h-[100svh] min-h-[620px] w-full">
                    <picture>
                        <source media="(min-width: 1024px)" srcSet="/images/journeys-coast-desktop.webp" />
                        {/* Art direction keeps the mobile and desktop compositions separate. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/images/journeys-coast.webp" alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-60" />
                    </picture>
                </div>
            </div>

            {/* Subtle Clean Edge Softening Gradients */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent z-[1] pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent z-[1] pointer-events-none" />

            {/* Content overlay */}
            <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 xl:gap-20 items-center">

                {/* Left Side: Elegant Text */}
                <div className="w-full min-w-0 flex flex-col items-start text-left">
                    <div>
                        <p className="font-sans text-brand-accent tracking-[0.3em] text-xs uppercase mb-6 flex items-center gap-4 font-semibold">
                            <span className="w-12 h-[2px] bg-brand-accent block"></span>
                            Find Your Travel Inspiration
                        </p>
                    </div>

                    <h2
                        className="font-serif text-5xl md:text-7xl lg:text-[4.5rem] text-[#1A1A1A] leading-[1.1] mb-8 drop-shadow-sm font-normal"
                    >
                        Explore the <br /> World with <br />
                        <span className="text-brand-accent italic font-light">VeloraTravel</span>
                    </h2>

                    <div
                        className="backdrop-blur-md bg-white/85 border border-black/10 rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)] relative overflow-hidden group"
                    >
                        <p className="font-sans text-[#2D3748] text-lg leading-relaxed max-w-md relative z-10 font-normal">
                            Not sure where to go next? Start with these five destinations, explore their highlights, and follow the links to build your own travel shortlist.
                        </p>
                        <Link href="/destinations" className="inline-flex mt-5 font-semibold text-brand-accent underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Browse all destinations →</Link>
                    </div>
                </div>

                {/* Right Side: Clean White Luxury Glass Cards */}
                <motion.div
                    className="w-full min-w-0 space-y-4 relative z-20"
                >
                    {destinations.map((dest, i) => {
                        return (
                            <motion.div
                                key={i}
                                initial={reducedMotion ? false : { opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
                                className="group cursor-pointer"
                            >
                                <Link href={dest.href} className="destination-card backdrop-blur-xl bg-white/95 border border-slate-200/90 hover:border-brand-accent/50 hover:bg-white rounded-2xl p-6 transition-all duration-300 ease-out transform hover:-translate-y-1 motion-reduce:transform-none shadow-xl flex items-center gap-6 relative overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accent focus-visible:outline-offset-4">

                                    {/* Hover subtle highlight */}
                                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-brand-accent/[0.04] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out motion-reduce:hidden" />

                                    <div aria-hidden="true" className="destination-icon relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-[18px] bg-[#dceffb] text-[#233946]">
                                        <DestinationIcon variant={i} />
                                    </div>

                                    <div className="relative z-10">
                                        <h3 className="font-sans text-lg md:text-2xl text-[#0F172A] font-semibold group-hover:text-brand-accent transition-colors duration-300">
                                            {dest.title}
                                        </h3>
                                        <p className="font-sans font-normal text-[#334155] mt-1.5 text-sm xl:text-base leading-relaxed group-hover:text-[#0F172A] transition-colors duration-300">
                                            {dest.desc}
                                        </p>
                                        <span className="inline-block mt-3 text-sm font-semibold text-brand-accent">Explore destination →</span>
                                    </div>

                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}
