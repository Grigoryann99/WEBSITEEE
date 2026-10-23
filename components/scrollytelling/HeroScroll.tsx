'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import NextImage from 'next/image';
import Link from 'next/link';

const TOTAL_FRAMES = 542;

const chapters = [
    {
        tagline: "DESTINATION GUIDES & TRAVEL INSPIRATION",
        title: "Find Your ",
        highlight: "Next Destination",
        description: "Explore places to visit, local highlights, and travel guides across 51 countries. Start with a destination and discover what makes it worth the journey.",
    },
    {
        tagline: "CURATED EXPERIENCES",
        title: "Crafted For ",
        highlight: "Discerning Travelers",
        description: "From overwater retreats in the Maldives to high-altitude chalets in the Swiss Alps, every destination is chosen with precision.",
    },
    {
        tagline: "YOUR JOURNEY AWAITS",
        title: "Begin Your ",
        highlight: "Next Adventure",
        description: "Immerse yourself in authentic culture, pristine landscapes, and unforgettable moments across 50+ world-class destinations.",
    },
];

function getFramePath(index: number): string {
    const frameNum = String(index + 1).padStart(4, '0');
    return `/hero-frames/frame_${frameNum}.jpg`;
}

export default function HeroScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const loadedImagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
    const currentFrameIndexRef = useRef<number>(0);
    const rAFRef = useRef<number | null>(null);

    // Start with a server-rendered poster; load the sequence only on desktop.
    const [animateHero, setAnimateHero] = useState(false);
    const frameStep = 6;
    useEffect(() => {
        const preference = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)');
        const update = () => setAnimateHero(preference.matches);
        update();
        preference.addEventListener('change', update);
        return () => preference.removeEventListener('change', update);
    }, []);

    // Framer Motion Scroll Setup
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 280,
        damping: 38,
        restDelta: 0.001,
    });

    // Chapter Animations
    const ch0Opacity = useTransform(smoothProgress, [0.0, 0.12, 0.28, 0.35], [1, 1, 1, 0]);
    const ch0Y       = useTransform(smoothProgress, [0.0, 0.12, 0.28, 0.35], [0, 0, -20, -60]);

    const ch1Opacity = useTransform(smoothProgress, [0.35, 0.42, 0.58, 0.65], [0, 1, 1, 0]);
    const ch1Y       = useTransform(smoothProgress, [0.35, 0.42, 0.58, 0.65], [60, 0, 0, -60]);

    const ch2Opacity = useTransform(smoothProgress, [0.65, 0.72, 0.90, 1.00], [0, 1, 1, 1]);
    const ch2Y       = useTransform(smoothProgress, [0.65, 0.72, 0.90, 1.00], [60, 0, 0, 0]);

    // Canvas Render Function
    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        // Use the closest available frame while the sequence is loading.
        let targetIndex = -1;
        let distance = Infinity;
        loadedImagesRef.current.forEach((_, candidate) => {
            if (Math.abs(candidate - index) < distance) {
                targetIndex = candidate;
                distance = Math.abs(candidate - index);
            }
        });

        const img = loadedImagesRef.current.get(targetIndex);
        if (!img) return;

        const displayWidth = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;
        // Cap DPR at 1.5 to reduce canvas pixel count on retina screens
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

        const width = Math.round(displayWidth * dpr);
        const height = Math.round(displayHeight * dpr);
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
        }

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgWidth = img.naturalWidth || img.width;
        const imgHeight = img.naturalHeight || img.height;

        const imgRatio = imgWidth / imgHeight;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth = canvasWidth;
        let drawHeight = canvasHeight;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
            drawHeight = canvasWidth / imgRatio;
            offsetY = (canvasHeight - drawHeight) / 2;
        } else {
            drawWidth = canvasHeight * imgRatio;
            offsetX = (canvasWidth - drawWidth) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }, []);

    useEffect(() => {
        if (!animateHero) return;
        const handleResize = () => {
            renderFrame(currentFrameIndexRef.current);
        };
        window.addEventListener('resize', handleResize, { passive: true });
        return () => window.removeEventListener('resize', handleResize);
    }, [animateHero, renderFrame]);

    // Progressive Device Frame Preloader — reduced batch size for smoother loading
    useEffect(() => {
        if (!animateHero) return;
        let isMounted = true;
        const framesToLoad: number[] = [];
        for (let i = 0; i < TOTAL_FRAMES; i += frameStep) {
            framesToLoad.push(i);
        }
        if (framesToLoad[framesToLoad.length - 1] !== TOTAL_FRAMES - 1) {
            framesToLoad.push(TOTAL_FRAMES - 1);
        }

        const priorityIndices = framesToLoad.slice(0, 10);
        const remainingIndices = framesToLoad.slice(10);

        const loadSingleImage = (idx: number): Promise<void> => {
            return new Promise((resolve) => {
                if (loadedImagesRef.current.has(idx)) {
                    resolve();
                    return;
                }

                const img = new Image();
                img.decoding = 'async';
                img.src = getFramePath(idx);
                img.onload = () => {
                    if (isMounted) {
                        loadedImagesRef.current.set(idx, img);
                        renderFrame(currentFrameIndexRef.current);
                    }
                    resolve();
                };
                img.onerror = () => {
                    resolve();
                };
            });
        };

        Promise.all(priorityIndices.map(loadSingleImage)).then(() => {
            if (!isMounted) return;
            let cursor = 0;
            const batchSize = 4;

            const loadNextBatch = () => {
                if (!isMounted || cursor >= remainingIndices.length) return;
                const batch = remainingIndices.slice(cursor, cursor + batchSize);
                cursor += batchSize;

                Promise.all(batch.map(loadSingleImage)).then(() => {
                    if (isMounted && cursor < remainingIndices.length) {
                        if ('requestIdleCallback' in window) {
                            (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(loadNextBatch);
                        } else {
                            setTimeout(loadNextBatch, 40);
                        }
                    }
                });
            };

            loadNextBatch();
        });

        return () => {
            isMounted = false;
        };
    }, [animateHero, frameStep, renderFrame]);

    // Subscribe to scroll changes
    useEffect(() => {
        if (!animateHero) return;
        const unsubscribe = smoothProgress.on('change', (latest) => {
            const frameIdx = Math.min(
                TOTAL_FRAMES - 1,
                Math.max(0, Math.floor(latest * (TOTAL_FRAMES - 1)))
            );
            currentFrameIndexRef.current = frameIdx;

            if (rAFRef.current !== null) {
                cancelAnimationFrame(rAFRef.current);
            }
            rAFRef.current = requestAnimationFrame(() => {
                renderFrame(frameIdx);
            });
        });

        return () => {
            unsubscribe();
            if (rAFRef.current !== null) {
                cancelAnimationFrame(rAFRef.current);
            }
        };
    }, [animateHero, smoothProgress, renderFrame]);

    return (
        <div ref={containerRef} className="relative w-full bg-black h-[100svh] min-h-[620px] md:h-[180svh] motion-reduce:!h-[100svh]">
            {/* Sticky Fullscreen Canvas Viewport */}
            <div className="sticky top-0 h-[100svh] min-h-[620px] w-full overflow-hidden bg-black flex items-center justify-center">
                {animateHero ? (
                    <NextImage src={getFramePath(0)} alt="" fill priority sizes="100vw" quality={80} className="object-cover" />
                ) : (
                    <picture>
                        <source media="(min-width: 1024px)" srcSet="/images/travel-hero-coast-desktop.webp" />
                        {/* Native picture selects the correct composition before hydration. */}
                        {}
                        <img src="/images/travel-hero-coast.webp" alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
                    </picture>
                )}
                {/* HTML5 Canvas Frame Renderer — GPU-accelerated */}
                {animateHero && <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    aria-hidden="true"
                />}

                {/* Subtle Global Dark Gradient Overlay for perfect text contrast against bright sun/sky */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/40 pointer-events-none z-10" />

                {/* Mobile & Desktop Optimized Typography Overlays */}
                <div className="relative z-20 w-full max-w-5xl px-4 sm:px-6 text-center flex flex-col items-center justify-center">
                    {/* Chapter 01 */}
                    <motion.div
                        style={animateHero ? { opacity: ch0Opacity, y: ch0Y } : { opacity: 1, y: 0 }}
                        className="absolute inset-x-0 mx-auto max-w-4xl px-4 flex flex-col items-center justify-center drop-shadow-2xl"
                    >
                        <div className="w-full flex flex-col items-center">
                            <p className="font-sans text-[#D4AF37] tracking-[0.4em] sm:tracking-[0.5em] text-[10px] sm:text-xs uppercase mb-6 sm:mb-8 font-medium">
                                {chapters[0].tagline}
                            </p>
                            <h1 className="font-serif text-[42px] sm:text-[64px] md:text-[86px] lg:text-[100px] leading-[1.05] text-white mb-6 sm:mb-8 font-light">
                                {chapters[0].title}
                                <span className="font-light block sm:inline mt-2 sm:mt-0 italic text-white/90">{chapters[0].highlight}</span>
                            </h1>
                            <p className="font-sans font-light text-white/80 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed">
                                {chapters[0].description}
                            </p>
                        </div>
                    </motion.div>

                    {/* Chapter 02 */}
                    {animateHero && <motion.div
                        style={{ opacity: ch1Opacity, y: ch1Y }}
                        className="absolute inset-x-0 mx-auto max-w-4xl px-4 flex flex-col items-center justify-center drop-shadow-2xl"
                    >
                        <div className="w-full flex flex-col items-center">
                            <p className="font-sans text-[#D4AF37] tracking-[0.4em] sm:tracking-[0.5em] text-[10px] sm:text-xs uppercase mb-6 sm:mb-8 font-medium">
                                {chapters[1].tagline}
                            </p>
                            <h2 className="font-serif text-[42px] sm:text-[64px] md:text-[86px] lg:text-[100px] leading-[1.05] text-white mb-6 sm:mb-8 font-light">
                                {chapters[1].title}
                                <span className="font-light block sm:inline mt-2 sm:mt-0 italic text-white/90">{chapters[1].highlight}</span>
                            </h2>
                            <p className="font-sans font-light text-white/80 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed">
                                {chapters[1].description}
                            </p>
                        </div>
                    </motion.div>}

                    {/* Chapter 03 */}
                    {animateHero && <motion.div
                        style={{ opacity: ch2Opacity, y: ch2Y }}
                        className="absolute inset-x-0 mx-auto max-w-4xl px-4 flex flex-col items-center justify-center drop-shadow-2xl"
                    >
                        <div className="w-full flex flex-col items-center">
                            <p className="font-sans text-[#D4AF37] tracking-[0.4em] sm:tracking-[0.5em] text-[10px] sm:text-xs uppercase mb-6 sm:mb-8 font-medium">
                                {chapters[2].tagline}
                            </p>
                            <h2 className="font-serif text-[42px] sm:text-[64px] md:text-[86px] lg:text-[100px] leading-[1.05] text-white mb-6 sm:mb-8 font-light">
                                {chapters[2].title}
                                <span className="font-light block sm:inline mt-2 sm:mt-0 italic text-white/90">{chapters[2].highlight}</span>
                            </h2>
                            <p className="font-sans font-light text-white/80 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed">
                                {chapters[2].description}
                            </p>
                        </div>
                    </motion.div>}
                </div>
                <div className="absolute bottom-12 sm:bottom-16 inset-x-0 z-30 flex justify-center px-6">
                    <Link href="/guides" className="rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#0F172A] shadow-lg transition-colors hover:bg-[#F4E7BE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                        Explore Travel Guides <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
