'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Star, Book, Globe } from 'lucide-react';

export default function VillaTransition() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    });

    // Handle mouse movement for interactive lighting/particles
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 2; // -1 to 1
            const y = (clientY / window.innerHeight - 0.5) * 2; // -1 to 1
            setMousePosition({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Scroll animations
    const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
    const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // Spring logic for smooth mouse parallax
    const springConfig = { damping: 30, stiffness: 200, mass: 1 };
    const springX = useSpring(mousePosition.x * 20, springConfig);
    const springY = useSpring(mousePosition.y * 20, springConfig);
    const glowSpringX = useSpring(mousePosition.x * 50, springConfig);
    const glowSpringY = useSpring(mousePosition.y * 50, springConfig);

    return (
        <section
            ref={containerRef}
            className="relative min-h-[150vh] bg-[#050505] text-brand-light flex items-center justify-center overflow-hidden py-40 perspective-1000"
        >
            {/* Cinematic Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-[#050505] to-[#010101] pointer-events-none" />

            {/* Interactive Ambient Glow tracking mouse */}
            <motion.div
                style={{ x: glowSpringX, y: glowSpringY }}
                className="absolute inset-0 flex items-center justify-center opacity-30 mix-blend-screen pointer-events-none transition-opacity duration-1000"
            >
                <div className="w-[800px] h-[800px] bg-brand-accent/[0.07] rounded-full blur-[120px]" />
            </motion.div>

            {/* Floating interactive particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
                {[...Array(15)].map((_, i) => {
                    const randomX = Math.random() * 100;
                    const randomY = Math.random() * 100;
                    const delay = Math.random() * 5;
                    const duration = Math.random() * 10 + 15;

                    return (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white/80 rounded-full shadow-[0_0_15px_3px_rgba(255,255,255,0.4)]"
                            style={{
                                left: `${randomX}%`,
                                top: `${randomY}%`,
                            }}
                            animate={{
                                y: [0, -50, 0],
                                x: [0, Math.random() * 30 - 15, 0],
                                opacity: [0.1, 0.8, 0.1],
                            }}
                            transition={{
                                duration: duration,
                                delay: delay,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    );
                })}
            </div>

            <motion.div
                style={{ opacity: sectionOpacity, x: springX, y: springY }}
                className="relative z-10 max-w-5xl mx-auto text-center px-6 flex flex-col items-center"
            >
                {/* Text 1: "You deserve" */}
                <motion.h2
                    initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 1.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="font-serif text-5xl md:text-7xl lg:text-[6rem] tracking-widest leading-tight text-brand-light/70 uppercase"
                >
                    You deserve
                </motion.h2>

                {/* Text 2: "it." (Delayed, brighter, glowing) */}
                <motion.h2
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(15px)' }}
                    whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 2, delay: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="font-serif text-6xl md:text-8xl lg:text-[8rem] tracking-widest leading-none text-white mt-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] uppercase relative"
                >
                    it.
                    {/* Subtle sweeping highlight across "it." */}
                    <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent bg-clip-text text-transparent mix-blend-overlay"
                        initial={{ backgroundPosition: '200% 0' }}
                        whileInView={{ backgroundPosition: '-200% 0' }}
                        viewport={{ once: true }}
                        transition={{ duration: 3, delay: 1.5, ease: "easeInOut" }}
                        style={{ backgroundSize: '200% 100%' }}
                    >
                        it.
                    </motion.span>
                </motion.h2>

                <motion.div
                    style={{ y: y2 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                >
                    <div className="w-[1px] h-24 bg-gradient-to-b from-brand-accent/50 to-transparent mx-auto mt-16 mb-12" />

                    <p className="font-sans font-light text-brand-light/60 max-w-lg mx-auto text-lg leading-relaxed tracking-wide mb-24">
                        Curated escapes tailored to the extraordinary. From overwater sanctuaries to alpine serenity, experience the pinnacle of luxury travel.
                    </p>

                    {/* ADDITION 7 - 3 Benefit Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full text-left">
                        <div className="bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-brand-accent/40 transition-colors">
                            <Star className="w-8 h-8 text-brand-accent mb-6" />
                            <h3 className="font-serif text-2xl text-white mb-4">Expert Curation</h3>
                            <p className="font-sans text-brand-light/60 leading-relaxed font-light">
                                Every destination and villa on VeloraTravel is handpicked by our editorial team. We feature only places we would genuinely recommend to a close friend — no paid placements, ever.
                            </p>
                        </div>
                        <div className="bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-brand-accent/40 transition-colors">
                            <Book className="w-8 h-8 text-brand-accent mb-6" />
                            <h3 className="font-serif text-2xl text-white mb-4">Honest Guides</h3>
                            <p className="font-sans text-brand-light/60 leading-relaxed font-light">
                                Real practical advice — seasonal insights, visa requirements, budget breakdowns, and local tips you will not find in a generic travel blog.
                            </p>
                        </div>
                        <div className="bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-brand-accent/40 transition-colors">
                            <Globe className="w-8 h-8 text-brand-accent mb-6" />
                            <h3 className="font-serif text-2xl text-white mb-4">50+ Destinations</h3>
                            <p className="font-sans text-brand-light/60 leading-relaxed font-light">
                                From the temples of Kyoto to the beaches of the Maldives — 50 extraordinary destinations with deep, researched editorial content.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
