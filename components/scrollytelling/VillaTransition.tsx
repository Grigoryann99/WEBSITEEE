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
            className="relative min-h-screen flex items-center justify-center overflow-hidden py-32 border-t border-b border-black/10"
            style={{
                background: 'linear-gradient(-45deg, #D1FAE5, #FEF3C7, #E0F2FE, #F3E8FF)',
                backgroundSize: '400% 400%',
                animation: 'vividGradient4Color 10s ease infinite'
            }}
        >
            {/* VIVID 4-COLOR ANIMATED MESH GRADIENT BLOBS */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {/* Color 1: Rich Emerald Green */}
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, 120, 0],
                        y: [0, -80, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-20 -left-20 w-[650px] h-[650px] rounded-full bg-[#10B981]/50 blur-[90px]"
                />
                {/* Color 2: Warm Amber Gold */}
                <motion.div
                    animate={{
                        scale: [1.3, 1, 1.3],
                        x: [0, -120, 0],
                        y: [0, 80, 0],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -bottom-20 -right-20 w-[700px] h-[700px] rounded-full bg-[#F59E0B]/50 blur-[100px]"
                />
                {/* Color 3: Electric Cyan Blue */}
                <motion.div
                    animate={{
                        scale: [1, 1.4, 1],
                        x: [-80, 80, -80],
                        y: [80, -80, 80],
                    }}
                    transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#06B6D4]/45 blur-[95px]"
                />
                {/* Color 4: Velvet Royal Purple */}
                <motion.div
                    animate={{
                        scale: [1.2, 0.9, 1.2],
                        x: [60, -60, 60],
                        y: [-60, 60, -60],
                    }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-1/4 left-1/4 w-[580px] h-[580px] rounded-full bg-[#8B5CF6]/45 blur-[100px]"
                />
            </div>

            {/* Interactive Ambient Glow tracking mouse */}
            <motion.div
                style={{ x: glowSpringX, y: glowSpringY }}
                className="absolute inset-0 flex items-center justify-center opacity-50 mix-blend-multiply pointer-events-none transition-opacity duration-1000 z-0"
            >
                <div className="w-[800px] h-[800px] bg-[#10B981]/20 rounded-full blur-[100px]" />
            </motion.div>

            {/* Floating interactive particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 z-0">
                {[...Array(15)].map((_, i) => {
                    const randomX = Math.random() * 100;
                    const randomY = Math.random() * 100;
                    const delay = Math.random() * 5;
                    const duration = Math.random() * 10 + 15;

                    return (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-[#0F172A]/50 rounded-full shadow-[0_0_15px_3px_rgba(0,0,0,0.1)]"
                            style={{
                                left: `${randomX}%`,
                                top: `${randomY}%`,
                            }}
                            animate={{
                                y: [0, -50, 0],
                                x: [0, Math.random() * 30 - 15, 0],
                                opacity: [0.2, 0.9, 0.2],
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
                    className="font-serif text-5xl md:text-7xl lg:text-[6rem] tracking-widest leading-tight text-[#0F172A] uppercase font-semibold drop-shadow-sm"
                >
                    You deserve
                </motion.h2>

                {/* Text 2: "it." (Delayed, brighter, glowing) */}
                <motion.h2
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(15px)' }}
                    whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 2, delay: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="font-serif text-6xl md:text-8xl lg:text-[8rem] tracking-widest leading-none text-[#0F172A] mt-4 uppercase relative font-bold"
                >
                    it.
                    {/* Subtle sweeping highlight across "it." */}
                    <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#10B981] to-transparent bg-clip-text text-transparent mix-blend-overlay"
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
                    <div className="w-[2px] h-24 bg-gradient-to-b from-[#10B981] via-[#F59E0B] to-transparent mx-auto mt-16 mb-12 shadow-sm" />

                    <p className="font-sans font-medium text-[#1E293B] max-w-lg mx-auto text-lg leading-relaxed tracking-wide drop-shadow-sm">
                        Curated escapes tailored to the extraordinary. From overwater sanctuaries to alpine serenity, experience the pinnacle of luxury travel.
                    </p>
                </motion.div>
            </motion.div>

            {/* CSS Animation Keyframes for Vivid 4-Color Gradient */}
            <style jsx>{`
                @keyframes vividGradient4Color {
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
