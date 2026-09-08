'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function VillaTransition() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    });

    // Scroll animations — lightweight transforms only
    const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
    const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden py-32 border-t border-b border-black/10"
            style={{
                background: 'linear-gradient(-45deg, #D1FAE5, #FEF3C7, #E0F2FE, #F3E8FF)',
                backgroundSize: '400% 400%',
                animation: 'vivid-gradient 15s ease infinite',
            }}
        >
            {/* Static gradient mesh — NO blur, NO infinite JS animations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {/* Emerald glow — static, hardware-accelerated with opacity instead of blur */}
                <div
                    className="absolute -top-20 -left-20 w-[650px] h-[650px] rounded-full opacity-30"
                    style={{
                        background: 'radial-gradient(circle, #10B981 0%, transparent 70%)',
                        transform: 'translateZ(0)',
                    }}
                />
                {/* Amber glow */}
                <div
                    className="absolute -bottom-20 -right-20 w-[700px] h-[700px] rounded-full opacity-30"
                    style={{
                        background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)',
                        transform: 'translateZ(0)',
                    }}
                />
                {/* Cyan glow */}
                <div
                    className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-25"
                    style={{
                        background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)',
                        transform: 'translateZ(0)',
                    }}
                />
                {/* Purple glow */}
                <div
                    className="absolute bottom-1/4 left-1/4 w-[580px] h-[580px] rounded-full opacity-25"
                    style={{
                        background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)',
                        transform: 'translateZ(0)',
                    }}
                />
            </div>

            {/* Minimal decorative particles — CSS-only, 4 instead of 15 */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 z-0">
                <div className="absolute w-2 h-2 bg-[#0F172A]/40 rounded-full" style={{ left: '15%', top: '20%', animation: 'float-particle 18s ease-in-out infinite' }} />
                <div className="absolute w-1.5 h-1.5 bg-[#0F172A]/30 rounded-full" style={{ left: '70%', top: '60%', animation: 'float-particle 22s ease-in-out infinite 3s' }} />
                <div className="absolute w-2 h-2 bg-[#0F172A]/35 rounded-full" style={{ left: '40%', top: '75%', animation: 'float-particle 20s ease-in-out infinite 6s' }} />
                <div className="absolute w-1.5 h-1.5 bg-[#0F172A]/25 rounded-full" style={{ left: '85%', top: '30%', animation: 'float-particle 24s ease-in-out infinite 9s' }} />
            </div>

            <motion.div
                style={{ opacity: sectionOpacity }}
                className="relative z-10 max-w-5xl mx-auto text-center px-6 flex flex-col items-center"
            >
                {/* Text 1: "You deserve" */}
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="font-serif text-5xl md:text-7xl lg:text-[6rem] tracking-widest leading-tight text-[#0F172A] uppercase font-semibold drop-shadow-sm"
                >
                    You deserve
                </motion.h2>

                {/* Text 2: "it." */}
                <motion.h2
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 1.5, delay: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="font-serif text-6xl md:text-8xl lg:text-[8rem] tracking-widest leading-none text-[#0F172A] mt-4 uppercase relative font-bold"
                >
                    it.
                </motion.h2>

                <motion.div
                    style={{ y: y2 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1.2, delay: 1.0 }}
                >
                    <div className="w-[2px] h-24 bg-gradient-to-b from-[#10B981] via-[#F59E0B] to-transparent mx-auto mt-16 mb-12 shadow-sm" />

                    <p className="font-sans font-medium text-[#1E293B] max-w-lg mx-auto text-lg leading-relaxed tracking-wide drop-shadow-sm">
                        Curated escapes tailored to the extraordinary. From overwater sanctuaries to alpine serenity, experience the pinnacle of luxury travel.
                    </p>
                </motion.div>
            </motion.div>

            {/* CSS keyframes for lightweight particle float */}
            <style jsx>{`
                @keyframes float-particle {
                    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
                    50% { transform: translateY(-40px) translateX(10px); opacity: 0.7; }
                }
            `}</style>
        </section>
    );
}
