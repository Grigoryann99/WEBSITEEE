'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AuroraBorealisBackground() {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMouse({
                x: (e.clientX / window.innerWidth - 0.5) * 40,
                y: (e.clientY / window.innerHeight - 0.5) * 40,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#0B131E]">
            {/* Dark Deep Night Sky Foundation */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#090D16] via-[#0F172A] to-[#0A0F1D] opacity-95" />

            {/* Aurora Light Wave 1: Emerald & Mint Ribbon */}
            <motion.div
                animate={{
                    x: [0 + mouse.x, 80 + mouse.x, -50 + mouse.x, 0 + mouse.x],
                    y: [0 + mouse.y, -60 + mouse.y, 40 + mouse.y, 0 + mouse.y],
                    scaleY: [1, 1.4, 0.9, 1],
                    rotate: [-12, -2, -18, -12],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-[10%] left-[-20%] w-[140%] h-[70%] bg-gradient-to-r from-transparent via-[#059669]/45 to-transparent blur-[90px] mix-blend-screen transform origin-center"
            />

            {/* Aurora Light Wave 2: Cyan & Teal Wave */}
            <motion.div
                animate={{
                    x: [0 - mouse.x, -100 - mouse.x, 60 - mouse.x, 0 - mouse.x],
                    y: [0 - mouse.y, 80 - mouse.y, -50 - mouse.y, 0 - mouse.y],
                    scaleY: [1.2, 0.8, 1.3, 1.2],
                    rotate: [15, 5, 20, 15],
                }}
                transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[15%] left-[-10%] w-[130%] h-[65%] bg-gradient-to-r from-transparent via-[#0D9488]/40 to-transparent blur-[100px] mix-blend-screen transform origin-center"
            />

            {/* Aurora Light Wave 3: Sapphire Indigo Veil */}
            <motion.div
                animate={{
                    x: [0 + mouse.x * 0.5, 90 + mouse.x * 0.5, -70 + mouse.x * 0.5, 0 + mouse.x * 0.5],
                    y: [0 + mouse.y * 0.5, -40 + mouse.y * 0.5, 60 + mouse.y * 0.5, 0 + mouse.y * 0.5],
                    scale: [1, 1.2, 0.9, 1],
                    rotate: [-5, 8, -10, -5],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[35%] left-[-15%] w-[140%] h-[70%] bg-gradient-to-r from-transparent via-[#6366F1]/35 to-transparent blur-[110px] mix-blend-screen transform origin-center"
            />

            {/* Aurora Light Wave 4: Radiant Violet Stream */}
            <motion.div
                animate={{
                    x: [0 - mouse.x * 0.7, -80 - mouse.x * 0.7, 70 - mouse.x * 0.7, 0 - mouse.x * 0.7],
                    y: [0 - mouse.y * 0.7, 50 - mouse.y * 0.7, -40 - mouse.y * 0.7, 0 - mouse.y * 0.7],
                    scaleY: [0.9, 1.3, 1, 0.9],
                    rotate: [8, -12, 4, 8],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[55%] left-[-10%] w-[135%] h-[60%] bg-gradient-to-r from-transparent via-[#8B5CF6]/30 to-transparent blur-[120px] mix-blend-screen transform origin-center"
            />

            {/* Aurora Light Wave 5: Lower Emerald Curtain */}
            <motion.div
                animate={{
                    x: [0 + mouse.x * 0.8, 60 + mouse.x * 0.8, -80 + mouse.x * 0.8, 0 + mouse.x * 0.8],
                    y: [0 + mouse.y * 0.8, -50 + mouse.y * 0.8, 30 + mouse.y * 0.8, 0 + mouse.y * 0.8],
                    scaleY: [1.1, 0.85, 1.25, 1.1],
                    rotate: [-15, -4, -18, -15],
                }}
                transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[70%] left-[-15%] w-[140%] h-[65%] bg-gradient-to-r from-transparent via-[#10B981]/35 to-transparent blur-[105px] mix-blend-screen transform origin-center"
            />

            {/* Soft Ambient Starlight Particles */}
            <div className="absolute inset-0 opacity-40">
                {[...Array(25)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]"
                        style={{
                            top: `${(i * 37) % 100}%`,
                            left: `${(i * 53) % 100}%`,
                        }}
                        animate={{
                            opacity: [0.2, 0.9, 0.2],
                            scale: [0.8, 1.3, 0.8],
                        }}
                        transition={{
                            duration: 3 + (i % 4),
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: (i % 5) * 0.6,
                        }}
                    />
                ))}
            </div>

            {/* Subtle Vignette for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-[#090D16]/80 pointer-events-none" />
        </div>
    );
}
