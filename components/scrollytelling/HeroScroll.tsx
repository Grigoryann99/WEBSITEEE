'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useImagePreloader } from '@/lib/hooks/useImagePreloader';

// ─── Scroll Progress Zones (0 to 1) ──────────────────────────────────────────
//
//  0.00 ─ 0.08  │ Initial title visible, then fades out
//  0.10 ─ 0.38  │ Text 1 – "Paradise is Closer Than it Seems"
//  0.42 ─ 0.68  │ Text 2 – "Worry-Free Vacation"
//  0.72 ─ 1.00  │ Text 3 – "How about a perfect trip – in one click"
//
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Mouse Parallax State
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        setMousePosition({
            x: (clientX - centerX) / centerX,
            y: (clientY - centerY) / centerY
        });
    };

    const mouseXSpring = useSpring(mousePosition.x, { stiffness: 50, damping: 20 });
    const mouseYSpring = useSpring(mousePosition.y, { stiffness: 50, damping: 20 });

    const parallaxX = useTransform(mouseXSpring, [-1, 1], [-20, 20]);
    const parallaxY = useTransform(mouseYSpring, [-1, 1], [-20, 20]);

    // 264 jpg frames: ezgif-frame-011.jpg → ezgif-frame-274.jpg
    const frameCount = 264;
    const startOffset = 10;

    const { images, isComplete } = useImagePreloader(
        frameCount,
        '/sequence-1/ezgif-frame-',
        '.jpg',
        startOffset,
        3
    );

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    // Spring physics – mass adds inertia for smooth wheel-release
    const smoothProgress = useSpring(scrollYProgress, { damping: 100, stiffness: 200, mass: 1.5 });

    // Background Cinema Scale
    const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.15]);

    // Map 0-1 scroll progress to frame index
    const frameIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1]);

    // ── Initial headline (fades out as you start scrolling) ──────────────────
    const initialOpacity = useTransform(smoothProgress, [0, 0.0, 0.06, 0.12], [1, 1, 1, 0]);
    const initialY = useTransform(smoothProgress, [0, 0.06, 0.12], [0, 0, -30]);
    const initialBlur = useTransform(smoothProgress, [0, 0.06, 0.12], ["blur(0px)", "blur(0px)", "blur(10px)"]);

    // ── Text 1: "Paradise is Closer Than it Seems" ───────────────────────────
    const text1Opacity = useTransform(smoothProgress, [0.10, 0.18, 0.32, 0.40], [0, 1, 1, 0]);
    const text1Y = useTransform(smoothProgress, [0.10, 0.18, 0.32, 0.40], [30, 0, 0, -30]);
    const text1Blur = useTransform(smoothProgress, [0.10, 0.18, 0.32, 0.40], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

    // ── Text 2: "Worry-Free Vacation" ────────────────────────────────────────
    const text2Opacity = useTransform(smoothProgress, [0.42, 0.50, 0.62, 0.70], [0, 1, 1, 0]);
    const text2Y = useTransform(smoothProgress, [0.42, 0.50, 0.62, 0.70], [30, 0, 0, -30]);
    const text2Blur = useTransform(smoothProgress, [0.42, 0.50, 0.62, 0.70], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

    // ── Text 3: "How about a perfect trip – in one click" ────────────────────
    const text3Opacity = useTransform(smoothProgress, [0.72, 0.80, 0.96, 1.0], [0, 1, 1, 1]);
    const text3Y = useTransform(smoothProgress, [0.72, 0.80, 1.0], [30, 0, 0]);
    const text3Blur = useTransform(smoothProgress, [0.72, 0.80, 1.0], ["blur(10px)", "blur(0px)", "blur(0px)"]);

    // ── Canvas render loop ────────────────────────────────────────────────────
    useEffect(() => {
        if (!isComplete || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        let animationFrameId: number;
        let lastDrawnIndex = -1;

        const render = () => {
            if (canvas.width !== window.innerWidth * dpr || canvas.height !== window.innerHeight * dpr) {
                canvas.width = window.innerWidth * dpr;
                canvas.height = window.innerHeight * dpr;
                ctx.scale(dpr, dpr);
                lastDrawnIndex = -1;
            }

            const currentIndex = Math.round(frameIndex.get());

            if (currentIndex !== lastDrawnIndex) {
                const img = images[currentIndex] || images[images.length - 1];

                if (img && img.width > 0 && img.height > 0) {
                    const ratio = Math.max(window.innerWidth / img.width, window.innerHeight / img.height);
                    const w = img.width * ratio;
                    const h = img.height * ratio;
                    const x = (window.innerWidth - w) / 2;
                    const y = (window.innerHeight - h) / 2;

                    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
                    ctx.drawImage(img, x, y, w, h);
                    lastDrawnIndex = currentIndex;
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animationFrameId);
    }, [isComplete, frameIndex, images]);

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-brand-dark" onMouseMove={handleMouseMove}>
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* Canvas frame sequence with smooth zoom effect */}
                <motion.div style={{ scale: bgScale }} className="absolute inset-0 w-full h-full pointer-events-none origin-center">
                    <canvas
                        ref={canvasRef}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${isComplete ? 'opacity-100' : 'opacity-0'}`}
                    />
                </motion.div>

                {/* Floating Particles Overlay */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50 z-0">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_12px_2px_rgba(255,255,255,0.8)]"
                            initial={{
                                x: Math.random() * 100 + "vw",
                                y: Math.random() * 100 + "vh",
                                opacity: Math.random() * 0.5 + 0.1,
                                scale: Math.random() * 0.5 + 0.5
                            }}
                            animate={{
                                y: [null, Math.random() * -100 - 50],
                                x: [null, (Math.random() - 0.5) * 50],
                                opacity: [null, 0],
                            }}
                            transition={{
                                duration: Math.random() * 15 + 15,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />
                    ))}
                </div>

                {/* Cinematic gradient vignette for text legibility */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_#000_120%)] pointer-events-none z-[1]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none z-[1]" />

                {/* Text Container with Mouse Parallax */}
                <motion.div
                    style={{ x: parallaxX, y: parallaxY }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
                >
                    {/* ── Initial Headline ─────────────────────────────────────── */}
                    <motion.div
                        style={{ opacity: initialOpacity, y: initialY, filter: initialBlur }}
                        className="absolute inset-0 flex flex-col items-center justify-center will-change-transform"
                    >
                        <div className="backdrop-blur-md bg-black/10 p-12 rounded-3xl border border-white/5 shadow-2xl flex flex-col items-center">
                            <h1 className="font-serif text-[72px] md:text-[84px] lg:text-[96px] leading-[1.1] tracking-wide text-white text-center drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                                What are you <br /> waiting for?
                            </h1>
                            <p className="mt-8 font-inter text-lg md:text-xl text-white/80 font-light tracking-widest uppercase max-w-[600px] text-center drop-shadow-md">
                                Discover the extraordinary
                            </p>
                        </div>
                    </motion.div>

                    {/* ── Text 1: Villa Exterior ───────────────────────────────── */}
                    <motion.div
                        style={{ opacity: text1Opacity, y: text1Y, filter: text1Blur }}
                        className="absolute inset-0 flex flex-col items-center justify-center will-change-transform"
                    >
                        <div className="backdrop-blur-md bg-black/10 p-12 rounded-3xl border border-white/5 shadow-2xl flex flex-col items-center">
                            <h2 className="font-serif text-[72px] md:text-[84px] lg:text-[96px] leading-[1.1] tracking-wide text-white text-center drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                                Paradise is Closer<br />Than it Seems
                            </h2>
                            <p className="mt-8 font-inter text-lg md:text-xl text-brand-accent font-medium tracking-widest uppercase max-w-[600px] text-center drop-shadow-md">
                                Villa Collection
                            </p>
                        </div>
                    </motion.div>

                    {/* ── Text 2: Villa Interior ───────────────────────────────── */}
                    <motion.div
                        style={{ opacity: text2Opacity, y: text2Y, filter: text2Blur }}
                        className="absolute inset-0 flex flex-col items-center justify-center will-change-transform"
                    >
                        <div className="backdrop-blur-md bg-black/10 p-12 rounded-3xl border border-white/5 shadow-2xl flex flex-col items-center">
                            <h2 className="font-serif text-[72px] md:text-[84px] lg:text-[96px] leading-[1.1] tracking-wide text-white text-center drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                                Worry-Free<br />Vacation
                            </h2>
                            <p className="mt-8 font-inter text-lg md:text-xl text-brand-accent font-medium tracking-widest uppercase max-w-[600px] text-center drop-shadow-md">
                                Life Inside
                            </p>
                        </div>
                    </motion.div>

                    {/* ── Text 3: Exit / CTA ───────────────────────────────────── */}
                    <motion.div
                        style={{ opacity: text3Opacity, y: text3Y, filter: text3Blur }}
                        className="absolute inset-0 flex flex-col items-center justify-center will-change-transform pointer-events-auto"
                    >
                        <div className="backdrop-blur-xl bg-black/20 p-12 md:p-16 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col items-center mx-6">
                            <p className="font-inter text-brand-accent tracking-[0.3em] text-sm uppercase mb-6 flex items-center gap-4">
                                <span className="w-8 h-[1px] bg-brand-accent block"></span>
                                Your Journey
                                <span className="w-8 h-[1px] bg-brand-accent block"></span>
                            </p>

                            <h2 className="font-serif text-[64px] md:text-[76px] lg:text-[84px] leading-[1.1] tracking-wide text-white text-center drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] max-w-[800px] mb-12">
                                How about a perfect trip<br />
                                <em className="not-italic text-brand-accent/90 focus:outline-none">– in one click</em>
                            </h2>


                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
}
