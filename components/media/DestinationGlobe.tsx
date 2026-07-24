'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { MapPin, MountainSnow, Compass, Binoculars, Flower2 } from 'lucide-react';

const destinations = [
    {
        title: "The Maldivian Sanctum",
        desc: "Seven nights in a private overwater villa with a dedicated chef, daily spa treatments, and a sunset dhoni cruise included. Full board, seaplane transfers, and a private snorkeling guide are all arranged.",
        icon: Compass,
    },
    {
        title: "Alpine Serenity",
        desc: "Five nights in an exclusive Swiss Alps chalet with daily heliskiing, a private mountain guide, and Michelin-starred in-chalet dining every evening. Designed for those who demand the finest mountain experience on earth.",
        icon: MountainSnow,
    },
    {
        title: "Aegean Odyssey",
        desc: "Eight days from a private cliffside villa in Santorini with day trips to Thirassia and Oia included. A private catamaran sunset cruise and dedicated concierge complete the experience.",
        icon: MapPin,
    },
    {
        title: "Safari Elegance",
        desc: "Six nights across two luxury camps in the Serengeti timed to coincide with the Great Migration. Private game drives, bush dinners, and a sunrise hot air balloon safari are all included.",
        icon: Binoculars,
    },
    {
        title: "Kyoto Harmony",
        desc: "Five nights in a private ryokan in Higashiyama with exclusive temple access before opening hours. A private tea ceremony master and guided night walk through Gion are included.",
        icon: Flower2,
    }
];

export default function DestinationGlobe() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax background
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const backgroundScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.0, 1.05]);

    // Main text animations
    const titleOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
    const titleY = useTransform(scrollYProgress, [0.1, 0.3], [30, 0]);

    const subtitleOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
    const subtitleY = useTransform(scrollYProgress, [0.15, 0.35], [20, 0]);

    const descOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
    const descY = useTransform(scrollYProgress, [0.2, 0.4], [25, 0]);

    // Cards list container animation
    const listOpacity = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
    const listY = useTransform(scrollYProgress, [0.25, 0.5], [40, 0]);

    return (
        <div
            ref={containerRef}
            className="relative bg-white flex flex-col items-center justify-center py-24 md:py-32 px-6 overflow-hidden border-t border-gray-100"
        >
            {/* Background Image Layer — Clean, Rich & Crisp (No dark tint, no overexposure) */}
            <motion.div
                style={{ y: backgroundY, scale: backgroundScale }}
                className="absolute inset-0 w-full h-[120%] -top-[10%]"
            >
                <Image
                    src="/NAPRAVLEN.png"
                    alt="World Landmarks Panorama"
                    fill
                    priority
                    className="object-cover opacity-60 brightness-[0.95] contrast-[1.1] saturate-[1.05]"
                    quality={100}
                />
            </motion.div>

            {/* Subtle Clean Edge Softening Gradients */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent z-[1] pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent z-[1] pointer-events-none" />

            {/* Content overlay */}
            <div className="z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">

                {/* Left Side: Elegant Text */}
                <div className="w-full lg:w-1/2 flex flex-col items-start text-left lg:pr-8">
                    <motion.div style={{ opacity: subtitleOpacity, y: subtitleY }}>
                        <p className="font-sans text-brand-accent tracking-[0.3em] text-xs uppercase mb-6 flex items-center gap-4 font-semibold">
                            <span className="w-12 h-[2px] bg-brand-accent block"></span>
                            Exclusive Journeys
                        </p>
                    </motion.div>

                    <motion.h2
                        style={{ opacity: titleOpacity, y: titleY }}
                        className="font-serif text-5xl md:text-7xl lg:text-[4.5rem] text-[#1A1A1A] leading-[1.1] mb-8 drop-shadow-sm font-normal"
                    >
                        Discover the <br /> World with <br />
                        <span className="text-brand-accent italic font-light">VeloraTravel</span>
                    </motion.h2>

                    <motion.div
                        style={{ opacity: descOpacity, y: descY }}
                        className="backdrop-blur-md bg-white/85 border border-black/10 rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)] relative overflow-hidden group"
                    >
                        <p className="font-sans text-[#2D3748] text-lg leading-relaxed max-w-md relative z-10 font-normal">
                            Five exclusive packages designed for the world&apos;s most discerning travelers. Unmatched elegance, ultimate privacy, and cinematic experiences crafted just for you.
                        </p>
                    </motion.div>
                </div>

                {/* Right Side: Clean White Luxury Glass Cards */}
                <motion.div
                    style={{ opacity: listOpacity, y: listY }}
                    className="w-full lg:w-1/2 space-y-4 relative z-20"
                >
                    {destinations.map((dest, i) => {
                        const Icon = dest.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
                                className="group cursor-pointer"
                            >
                                <div className="backdrop-blur-md bg-white/90 border border-gray-200/80 hover:border-brand-accent/50 hover:bg-white rounded-2xl p-6 transition-all duration-300 ease-out transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] flex items-center gap-6 relative overflow-hidden">

                                    {/* Hover subtle highlight */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-accent/[0.04] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center text-brand-accent group-hover:scale-105 group-hover:bg-brand-accent group-hover:text-white transition-all duration-300 shadow-sm">
                                        <Icon size={22} strokeWidth={1.75} />
                                    </div>

                                    <div className="relative z-10">
                                        <h3 className="font-serif text-xl md:text-2xl text-[#1A1A1A] font-medium group-hover:text-brand-accent transition-colors duration-300">
                                            {dest.title}
                                        </h3>
                                        <p className="font-sans font-normal text-[#4A5568] mt-1.5 text-sm leading-relaxed tracking-wide group-hover:text-[#2D3748] transition-colors duration-300">
                                            {dest.desc}
                                        </p>
                                    </div>

                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}
