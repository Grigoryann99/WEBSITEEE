'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function SupportHero() {
    return (
        <section className="relative h-[65vh] md:h-[75vh] w-full flex items-center justify-center overflow-hidden">
            {/* Background Image Setup */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/contact-bg.jpg"
                    alt="VeloraTravel Support Center"
                    fill
                    priority
                    className="object-cover scale-105"
                />

                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-black/50 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/60 z-10" />
                {/* Radial vignette for focus */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_#000_150%)] z-10 pointer-events-none" />
            </div>

            {/* Content Content Container */}
            <div className="relative z-20 flex flex-col items-center justify-center px-4 w-full text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="backdrop-blur-sm bg-black/10 p-8 md:p-14 rounded-[3rem] border border-white/10 shadow-2xl flex flex-col items-center max-w-5xl w-full mx-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <p className="font-inter text-brand-accent tracking-[0.3em] text-xs md:text-sm uppercase mb-6 flex items-center justify-center gap-4">
                            <span className="w-8 h-[1px] bg-brand-accent block"></span>
                            Customer Assistance
                            <span className="w-8 h-[1px] bg-brand-accent block"></span>
                        </p>
                    </motion.div>

                    <motion.h1
                        className="font-serif text-[48px] md:text-[72px] lg:text-[88px] leading-[1] tracking-wide text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.4 }}
                    >
                        VeloraTravel <br /> Support Center
                    </motion.h1>

                    <motion.p
                        className="mt-8 font-inter text-base md:text-xl text-white/90 font-light tracking-wide max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.7 }}
                    >
                        Need help exploring destinations or using our website? <br className="hidden md:block" /> Our support team is here to assist you with every step of your journey.
                    </motion.p>

                    <motion.div
                        className="mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                    >
                        <button 
                            onClick={() => document.getElementById('support-search')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-brand-light text-brand-dark px-12 py-5 rounded-full font-inter font-medium tracking-wider text-sm hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl"
                        >
                            Get Support
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
