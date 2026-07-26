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
            className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#F8FAF9]"
            style={{
                ['--aurora-x' as string]: '0px',
                ['--aurora-y' as string]: '0px',
            }}
        >
            {/* Light Pearl Luxury Foundation */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#F0FDF4] via-[#F8FAFC] to-[#F1F5F9]" />

            {/* GPU Hardware-Accelerated Light Aurora Wave Container */}
            <div
                className="absolute inset-0 w-full h-full transform-gpu transition-transform duration-75 ease-out"
                style={{
                    transform: 'translate3d(var(--aurora-x), var(--aurora-y), 0)',
                    willChange: 'transform',
                }}
            >
                {/* Light Aurora Wave 1 — Mint Emerald & Soft Teal */}
                <div
                    className="absolute -top-[20%] -left-[20%] w-[140%] h-[80%] opacity-70 transform-gpu animate-aurora-flow-1"
                    style={{
                        background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(16, 185, 129, 0.28), rgba(13, 148, 136, 0.18), transparent 70%)',
                        willChange: 'transform',
                    }}
                />

                {/* Light Aurora Wave 2 — Warm Amber Gold & Sunlit Peach */}
                <div
                    className="absolute top-[20%] -left-[10%] w-[130%] h-[75%] opacity-65 transform-gpu animate-aurora-flow-2"
                    style={{
                        background: 'radial-gradient(ellipse 75% 45% at 50% 50%, rgba(245, 158, 11, 0.25), rgba(249, 115, 22, 0.15), transparent 70%)',
                        willChange: 'transform',
                    }}
                />

                {/* Light Aurora Wave 3 — Sky Azure & Soft Violet */}
                <div
                    className="absolute top-[50%] -left-[15%] w-[140%] h-[70%] opacity-60 transform-gpu animate-aurora-flow-3"
                    style={{
                        background: 'radial-gradient(ellipse 85% 50% at 50% 50%, rgba(6, 182, 212, 0.22), rgba(139, 92, 246, 0.16), transparent 70%)',
                        willChange: 'transform',
                    }}
                />
            </div>

            {/* Subtle Vignette for Soft Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/40 pointer-events-none" />

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
