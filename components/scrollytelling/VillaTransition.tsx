'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

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
            className="relative min-h-screen text-brand-dark flex items-center justify-center overflow-hidden py-32 border-t border-gray-150"
            style={{
                background: 'linear-gradient(-45deg, #FAF7F2, #E8F4EE, #F8F2E4, #EBF1F7)',
                backgroundSize: '400% 400%',
                animation: 'smoothGradient4Color 18s ease infinite'
            }}
        >
            {/* Smoothly Changing 4-Color Animated Mesh Spheres */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {/* Color 1: Emerald Teal */}
                <motion.div
                    animate={{
                        scale: [1, 1.25, 1],
                        x: [0, 80, 0],
                        y: [0, -60, 0],
                    }}
                    transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-[#1D9E75]/25 blur-[120px]"
                />
                {/* Color 2: Warm Champagne Gold */}
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        x: [0, -90, 0],
                        y: [0, 70, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -bottom-32 -right-32 w-[700px] h-[700px] rounded-full bg-[#C5A059]/25 blur-[140px]"
                />
                {/* Color 3: Soft Mint Emerald */}
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [-60, 60, -60],
                        y: [60, -60, 60],
                    }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#0D5C46]/15 blur-[130px]"
                />
                {/* Color 4: Warm Pearl Amber */}
                <motion.div
                    animate={{
                        scale: [1.1, 0.9, 1.1],
                        x: [40, -40, 40],
                        y: [-40, 40, -40],
                    }}
                    transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-1/4 left-1/4 w-[550px] h-[550px] rounded-full bg-[#D4AF37]/20 blur-[110px]"
                />
            </div>

            {/* Interactive Ambient Glow tracking mouse */}
            <motion.div
                style={{ x: glowSpringX, y: glowSpringY }}
                className="absolute inset-0 flex items-center justify-center opacity-40 mix-blend-multiply pointer-events-none transition-opacity duration-1000 z-0"
            >
                <div className="w-[800px] h-[800px] bg-brand-accent/[0.08] rounded-full blur-[120px]" />
            </motion.div>

            {/* Floating interactive particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-35 z-0">
                {[...Array(15)].map((_, i) => {
                    const randomX = Math.random() * 100;
                    const randomY = Math.random() * 100;
                    const delay = Math.random() * 5;
                    const duration = Math.random() * 10 + 15;

                    return (
                        <motion.div
                            key={i}
                            className="absolute w-1.5 h-1.5 bg-brand-dark/40 rounded-full shadow-[0_0_15px_3px_rgba(0,0,0,0.05)]"
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
                    className="font-serif text-5xl md:text-7xl lg:text-[6rem] tracking-widest leading-tight text-brand-dark/75 uppercase font-medium drop-shadow-sm"
                >
                    You deserve
                </motion.h2>

                {/* Text 2: "it." (Delayed, brighter, glowing) */}
                <motion.h2
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(15px)' }}
                    whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 2, delay: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="font-serif text-6xl md:text-8xl lg:text-[8rem] tracking-widest leading-none text-brand-dark mt-4 uppercase relative font-normal"
                >
                    it.
                    {/* Subtle sweeping highlight across "it." */}
                    <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent bg-clip-text text-transparent mix-blend-overlay"
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
                    <div className="w-[1.5px] h-24 bg-gradient-to-b from-brand-accent to-transparent mx-auto mt-16 mb-12" />

                    <p className="font-sans font-normal text-brand-dark/85 max-w-lg mx-auto text-lg leading-relaxed tracking-wide drop-shadow-sm">
                        Curated escapes tailored to the extraordinary. From overwater sanctuaries to alpine serenity, experience the pinnacle of luxury travel.
                    </p>
                </motion.div>
            </motion.div>

            {/* CSS Animation Keyframes for Smooth 4-Color Gradient */}
            <style jsx>{`
                @keyframes smoothGradient4Color {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
            `}</style>
        </section>
    );
}
