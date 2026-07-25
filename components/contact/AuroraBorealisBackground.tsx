'use client';

import { useEffect, useRef } from 'react';

export default function AuroraBorealisBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Optimized mousemove using requestAnimationFrame (0 React re-renders, 0% CPU lag)
    useEffect(() => {
        let rafId: number;
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            targetX = (e.clientX / window.innerWidth - 0.5) * 30;
            targetY = (e.clientY / window.innerHeight - 0.5) * 30;
        };

        const updatePosition = () => {
            // Smooth lerp interpolation
            currentX += (targetX - currentX) * 0.05;
            currentY += (targetY - currentY) * 0.05;

            if (containerRef.current) {
                containerRef.current.style.setProperty('--aurora-x', `${currentX}px`);
                containerRef.current.style.setProperty('--aurora-y', `${currentY}px`);
            }
            rafId = requestAnimationFrame(updatePosition);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        rafId = requestAnimationFrame(updatePosition);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#0B131E]"
            style={{
                ['--aurora-x' as string]: '0px',
                ['--aurora-y' as string]: '0px',
            }}
        >
            {/* Deep Night Sky Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#080D1A] via-[#0D1527] to-[#0A0F1D]" />

            {/* GPU Hardware-Accelerated Aurora Light Ribbon Container */}
            <div
                className="absolute inset-0 w-full h-full transform-gpu transition-transform duration-75 ease-out"
                style={{
                    transform: 'translate3d(var(--aurora-x), var(--aurora-y), 0)',
                    willChange: 'transform',
                }}
            >
                {/* Aurora Wave Layer 1 — Emerald Teal & Mint */}
                <div
                    className="absolute -top-[20%] -left-[20%] w-[140%] h-[80%] opacity-40 transform-gpu animate-aurora-flow-1"
                    style={{
                        background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(5, 150, 105, 0.45), rgba(13, 148, 136, 0.25), transparent 70%)',
                        willChange: 'transform',
                    }}
                />

                {/* Aurora Wave Layer 2 — Sapphire Indigo & Lavender */}
                <div
                    className="absolute top-[20%] -left-[10%] w-[130%] h-[75%] opacity-35 transform-gpu animate-aurora-flow-2"
                    style={{
                        background: 'radial-gradient(ellipse 75% 45% at 50% 50%, rgba(99, 102, 241, 0.4), rgba(139, 92, 246, 0.25), transparent 70%)',
                        willChange: 'transform',
                    }}
                />

                {/* Aurora Wave Layer 3 — Deep Mint Curtain */}
                <div
                    className="absolute top-[50%] -left-[15%] w-[140%] h-[70%] opacity-30 transform-gpu animate-aurora-flow-3"
                    style={{
                        background: 'radial-gradient(ellipse 85% 50% at 50% 50%, rgba(16, 185, 129, 0.35), rgba(6, 182, 212, 0.2), transparent 70%)',
                        willChange: 'transform',
                    }}
                />
            </div>

            {/* Static CSS Lightweight Starlight Overlay */}
            <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.8) 1px, transparent 1.5px), radial-gradient(circle at 70% 60%, rgba(255, 255, 255, 0.7) 1px, transparent 1.5px), radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.6) 1px, transparent 1.5px), radial-gradient(circle at 85% 20%, rgba(255, 255, 255, 0.8) 1px, transparent 1.5px)',
                    backgroundSize: '300px 300px',
                }}
            />

            {/* Smooth Vignette Edge */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080D1A] via-transparent to-[#080D1A]/80 pointer-events-none" />

            {/* GPU Keyframe CSS Styles */}
            <style jsx>{`
                @keyframes auroraFlow1 {
                    0% { transform: translate3d(0, 0, 0) rotate(-8deg) scale(1); }
                    50% { transform: translate3d(60px, -40px, 0) rotate(-4deg) scale(1.1); }
                    100% { transform: translate3d(0, 0, 0) rotate(-8deg) scale(1); }
                }
                @keyframes auroraFlow2 {
                    0% { transform: translate3d(0, 0, 0) rotate(6deg) scale(1.05); }
                    50% { transform: translate3d(-50px, 40px, 0) rotate(10deg) scale(0.95); }
                    100% { transform: translate3d(0, 0, 0) rotate(6deg) scale(1.05); }
                }
                @keyframes auroraFlow3 {
                    0% { transform: translate3d(0, 0, 0) rotate(-10deg) scale(0.95); }
                    50% { transform: translate3d(40px, 30px, 0) rotate(-6deg) scale(1.08); }
                    100% { transform: translate3d(0, 0, 0) rotate(-10deg) scale(0.95); }
                }
                .animate-aurora-flow-1 {
                    animation: auroraFlow1 22s ease-in-out infinite;
                }
                .animate-aurora-flow-2 {
                    animation: auroraFlow2 28s ease-in-out infinite;
                }
                .animate-aurora-flow-3 {
                    animation: auroraFlow3 25s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
