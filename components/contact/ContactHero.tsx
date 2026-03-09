'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ContactHero() {
    return (
        <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden">
            {/* Background Image Setup */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/contact-bg.jpg"
                    alt="Luxury Travel Destination"
                    fill
                    priority
                    className="object-cover scale-105" // Slight scale for parallax effect potential if needed later
                />

                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/50 z-10" />
                {/* Radial vignette for focus */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_#000_150%)] z-10 pointer-events-none" />
            </div>

            {/* Content Content Container */}
            <div className="relative z-20 flex flex-col items-center justify-center px-4 w-full">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="backdrop-blur-sm bg-black/10 p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col items-center max-w-4xl w-full mx-auto text-center"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <p className="font-inter text-brand-accent tracking-[0.3em] text-sm uppercase mb-4 flex items-center justify-center gap-4">
                            <span className="w-8 h-[1px] bg-brand-accent block"></span>
                            Get in Touch
                            <span className="w-8 h-[1px] bg-brand-accent block"></span>
                        </p>
                    </motion.div>

                    <motion.h1
                        className="font-serif text-[56px] md:text-[72px] lg:text-[84px] leading-[1.1] tracking-wide text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.4 }}
                    >
                        Contact <br className="md:hidden" /> VeloraTravel
                    </motion.h1>

                    <motion.p
                        className="mt-6 font-inter text-base md:text-lg text-white/80 font-light tracking-wide max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.7 }}
                    >
                        We are here to curate your perfect escape. Reach out to our dedicated travel specialists to begin planning your next extraordinary journey.
                    </motion.p>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 z-20 flex flex-col items-center justify-center cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                onClick={() => {
                    window.scrollTo({
                        top: window.innerHeight * 0.6,
                        behavior: 'smooth'
                    })
                }}
            >
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/50 mb-3 font-inter">Explore</p>
                <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
                    <motion.div
                        className="w-full h-1/2 bg-white absolute top-0"
                        animate={{ top: ['-50%', '150%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                </div>
            </motion.div>
        </section>
    );
}
