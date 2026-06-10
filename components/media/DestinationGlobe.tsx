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
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
    const backgroundScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1.15]);

    // Parallax clouds/foreground
    const cloudsY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    // Main text animations
    const titleOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
    const titleY = useTransform(scrollYProgress, [0.1, 0.3], [50, 0]);

    const headerBlur = useTransform(scrollYProgress, [0.1, 0.3], ["blur(10px)", "blur(0px)"]);

    const subtitleOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
    const subtitleY = useTransform(scrollYProgress, [0.15, 0.35], [30, 0]);

    const descOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
    const descY = useTransform(scrollYProgress, [0.2, 0.4], [40, 0]);

    // Cards list container animation
    const listOpacity = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
    const listY = useTransform(scrollYProgress, [0.25, 0.5], [60, 0]);

    return (
        <div
            ref={containerRef}
            className="relative bg-white flex flex-col items-center justify-center py-24 md:py-32 px-6 overflow-hidden border-t border-gray-150"
        >
            {/* Cinematic Background Image Layer with Parallax */}
            <motion.div
                style={{ y: backgroundY, scale: backgroundScale }}
                className="absolute inset-0 w-full h-[120%] -top-[10%]"
            >
                <Image
                    src="/NAPRAVLEN.png"
                    alt="World Landmarks Panorama"
                    fill
                    priority
                    className="object-cover brightness-[0.65] contrast-[1.05]"
                    quality={100}
                />
            </motion.div>

            {/* Clouds/Atmosphere Layer (simulated with a soft radial overlay) */}
            <motion.div
                style={{ y: cloudsY }}
                className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black/[0.02] via-transparent to-transparent opacity-60 mix-blend-multiply"
            />

            {/* Floating particles/birds animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-brand-dark/30 rounded-full shadow-[0_0_10px_2px_rgba(0,0,0,0.05)]"
                        initial={{
                            x: Math.random() * 100 + "vw",
                            y: Math.random() * 100 + "vh",
                            opacity: Math.random() * 0.5 + 0.1,
                            scale: Math.random() * 0.5 + 0.5
                        }}
                        animate={{
                            y: [null, Math.random() * -100 - 50],
                            x: [null, (Math.random() - 0.5) * 100],
                            opacity: [null, 0],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            {/* Light Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#F9F9F9] via-[#F9F9F9]/70 to-transparent z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F9F9F9]/90 via-transparent to-[#F9F9F9]/80 z-[1]" />

            {/* Content overlay */}
            <div className="z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">

                {/* Left Side: Elegant Text inside subtly glass panel */}
                <div className="w-full lg:w-1/2 flex flex-col items-start text-left lg:pr-8">
                    <motion.div
                        style={{ opacity: subtitleOpacity, y: subtitleY }}
                    >
                        <p className="font-sans text-brand-accent tracking-[0.3em] text-xs uppercase mb-6 flex items-center gap-4">
                            <span className="w-12 h-[1px] bg-brand-accent block"></span>
                            Exclusive Journeys
                        </p>
                    </motion.div>

                    <motion.h2
                        style={{ opacity: titleOpacity, y: titleY, filter: headerBlur }}
                        className="font-serif text-5xl md:text-7xl lg:text-[5rem] text-brand-dark leading-[1.1] mb-8 drop-shadow-sm"
                    >
                        Discover the <br /> World with <br />
                        <span className="text-brand-dark/90 italic font-light">VeloraTravel</span>
                    </motion.h2>

                    <motion.div
                        style={{ opacity: descOpacity, y: descY }}
                        className="backdrop-blur-xl bg-white/70 border border-black/5 rounded-2xl p-8 shadow-sm relative overflow-hidden group"
                    >
                        {/* Subtle inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <p className="font-sans text-brand-dark/80 text-lg leading-relaxed max-w-md relative z-10 font-light">
                            Five exclusive packages designed for the world&apos;s most discerning travelers. Unmatched elegance, ultimate privacy, and cinematic experiences crafted just for you.
                        </p>
                    </motion.div>
                </div>

                {/* Right Side: Floating Glass Cards */}
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
                                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                                className="group cursor-pointer"
                            >
                                <div className="backdrop-blur-md bg-white/70 border border-black/5 hover:border-brand-accent/40 hover:bg-white/95 rounded-xl p-6 transition-all duration-500 ease-out transform hover:-translate-y-2 shadow-sm hover:shadow-md flex items-center gap-6 relative overflow-hidden">

                                    {/* Hover gradient sweep */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent group-hover:scale-110 group-hover:bg-brand-accent/20 transition-all duration-500">
                                        <Icon size={20} strokeWidth={1.5} />
                                    </div>

                                    <div className="relative z-10">
                                        <h3 className="font-serif text-xl md:text-2xl text-brand-dark transition-colors duration-300">
                                            {dest.title}
                                        </h3>
                                        <p className="font-sans font-light text-brand-dark/60 mt-1.5 text-sm tracking-wide group-hover:text-brand-dark/85 transition-colors duration-300">
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



