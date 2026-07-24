'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';

const TOTAL_FRAMES = 542;

function getFramePath(index: number): string {
    const padded = String(index + 1).padStart(4, '0');
    return `/hero-frames/frame_${padded}.jpg`;
}

interface Chapter {
    id: number;
    tagline: string;
    title: string;
    highlight: string;
    description: string;
    targetProgress: number;
    buttonText: string;
    buttonHref: string;
}

const chapters: Chapter[] = [
    {
        id: 0,
        tagline: 'DISCOVER THE EXTRAORDINARY',
        title: 'Where Luxury Meets',
        highlight: ' the Horizon',
        description: 'Explore private sanctuaries, handpicked villas, and luxury travel guides designed for the modern explorer.',
        targetProgress: 0,
        buttonText: 'Explore Destinations',
        buttonHref: '/destinations',
    },
    {
        id: 1,
        tagline: 'UNRIVALED SANCTUARIES',
        title: 'Crafted for the',
        highlight: ' Discerning Voyager',
        description: 'Immerse yourself in spectacular overwater retreats, private islands, and alpine escapes around the globe.',
        targetProgress: 0.45,
        buttonText: 'View Private Villas',
        buttonHref: '/villas',
    },
    {
        id: 2,
        tagline: 'YOUR JOURNEY BEGINS',
        title: 'From Dream to',
        highlight: ' Destination',
        description: 'Browse 50+ destinations across 6 continents and experience tailored luxury travel at its finest.',
        targetProgress: 0.85,
        buttonText: 'Start Your Escape',
        buttonHref: '/contact',
    },
];

export default function HeroScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const loadedImagesRef = useRef<Map<number, HTMLImageElement>>(new Map());

    const [loadProgress, setLoadProgress] = useState<number>(0);
    const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    // Frame step: load every frame on desktop, skip every 2nd frame on mobile to save bandwidth & GPU RAM
    const frameStep = isMobile ? 2 : 1;

    // Detect device screen size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Framer motion scroll tracking
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Physics spring for liquid-smooth scroll interpolation
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 280,
        damping: 32,
        restDelta: 0.0001,
    });

    // Chapter content motion transforms
    const ch0Opacity = useTransform(smoothProgress, [0, 0.02, 0.22, 0.28], [1, 1, 1, 0]);
    const ch0Y = useTransform(smoothProgress, [0, 0.22, 0.28], [0, 0, -30]);

    const ch1Opacity = useTransform(smoothProgress, [0.32, 0.38, 0.58, 0.64], [0, 1, 1, 0]);
    const ch1Y = useTransform(smoothProgress, [0.32, 0.38, 0.58, 0.64], [30, 0, 0, -30]);

    const ch2Opacity = useTransform(smoothProgress, [0.68, 0.74, 0.94, 1], [0, 1, 1, 1]);
    const ch2Y = useTransform(smoothProgress, [0.68, 0.74, 0.94], [30, 0, 0]);

    // Canvas Frame Renderer
    const renderFrame = useCallback((frameIdx: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        // Retrieve target image or nearest loaded neighbor fallback
        let img = loadedImagesRef.current.get(frameIdx);
        if (!img) {
            // Find nearest loaded frame index if requested frame is still downloading
            let bestDiff = Infinity;
            let bestImg: HTMLImageElement | null = null;
            loadedImagesRef.current.forEach((loadedImg, idx) => {
                const diff = Math.abs(idx - frameIdx);
                if (diff < bestDiff) {
                    bestDiff = diff;
                    bestImg = loadedImg;
                }
            });
            img = bestImg || undefined;
        }

        if (!img) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const displayWidth = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;

        if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
            canvas.width = displayWidth * dpr;
            canvas.height = displayHeight * dpr;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

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

    // Handle Window Resize
    useEffect(() => {
        const handleResize = () => {
            renderFrame(currentFrameIndex);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [renderFrame, currentFrameIndex]);

    // Progressive Device Frame Preloader
    useEffect(() => {
        let isMounted = true;
        const framesToLoad: number[] = [];
        for (let i = 0; i < TOTAL_FRAMES; i += frameStep) {
            framesToLoad.push(i);
        }
        // Ensure final frame is always included
        if (framesToLoad[framesToLoad.length - 1] !== TOTAL_FRAMES - 1) {
            framesToLoad.push(TOTAL_FRAMES - 1);
        }

        let loadedCount = 0;
        const totalToLoad = framesToLoad.length;

        // Priority 1: Instant load initial 20 frames for instant display
        const priorityIndices = framesToLoad.slice(0, 20);
        const remainingIndices = framesToLoad.slice(20);

        const loadSingleImage = (idx: number): Promise<void> => {
            return new Promise((resolve) => {
                if (loadedImagesRef.current.has(idx)) {
                    loadedCount++;
                    if (isMounted) setLoadProgress(Math.round((loadedCount / totalToLoad) * 100));
                    resolve();
                    return;
                }

                const img = new Image();
                img.src = getFramePath(idx);
                img.onload = () => {
                    if (!isMounted) return;
                    loadedImagesRef.current.set(idx, img);
                    loadedCount++;
                    setLoadProgress(Math.round((loadedCount / totalToLoad) * 100));

                    // Initial render as soon as frame 0 lands
                    if (idx === 0) {
                        renderFrame(0);
                    }
                    resolve();
                };
                img.onerror = () => {
                    loadedCount++;
                    resolve();
                };
            });
        };

        // Load priority batch immediately
        Promise.all(priorityIndices.map(loadSingleImage)).then(() => {
            if (!isMounted) return;
            renderFrame(0);

            // Progressive background loading in chunks of 10 to avoid thread locking
            let chunkIndex = 0;
            const chunkSize = 10;

            const loadNextChunk = () => {
                if (!isMounted || chunkIndex >= remainingIndices.length) return;
                const chunk = remainingIndices.slice(chunkIndex, chunkIndex + chunkSize);
                chunkIndex += chunkSize;

                Promise.all(chunk.map(loadSingleImage)).then(() => {
                    if ('requestIdleCallback' in window) {
                        (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(loadNextChunk);
                    } else {
                        setTimeout(loadNextChunk, 20);
                    }
                });
            };

            loadNextChunk();
        });

        return () => {
            isMounted = false;
        };
    }, [frameStep, renderFrame]);

    // Bind Canvas rendering to Scroll Progress
    useEffect(() => {
        const unsubscribe = smoothProgress.on('change', (latest) => {
            const frameIdx = Math.min(
                TOTAL_FRAMES - 1,
                Math.max(0, Math.floor(latest * (TOTAL_FRAMES - 1)))
            );
            setCurrentFrameIndex(frameIdx);
            renderFrame(frameIdx);
        });

        return () => unsubscribe();
    }, [smoothProgress, renderFrame]);

    // Scroll to Chapter helper
    const scrollToChapter = (targetProgress: number) => {
        if (!containerRef.current) return;
        const containerTop = containerRef.current.offsetTop;
        const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
        const targetY = containerTop + containerHeight * targetProgress;

        window.scrollTo({
            top: targetY,
            behavior: 'smooth',
        });
    };

    return (
        <div ref={containerRef} className="relative h-[450vh] w-full bg-black">
            {/* Sticky Fullscreen Canvas Viewport */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
                {/* HTML5 Canvas Frame Renderer */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Permanent Luxury Dark Gradient Vignette Overlay for Text Contrast */}
                <div className="absolute inset-0 bg-black/35 z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_25%,_rgba(0,0,0,0.65)_100%)] pointer-events-none z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 pointer-events-none z-10" />

                {/* Initial Loading Progress Bar (Fades out when >= 15% priority frames ready) */}
                {loadProgress < 15 && (
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-40 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-3 shadow-xl">
                        <div className="w-3 h-3 rounded-full border-2 border-brand-accent border-t-transparent animate-spin" />
                        <span className="font-sans text-[11px] uppercase tracking-widest text-white/80 font-medium">
                            Loading Sanctuary Experience {loadProgress}%
                        </span>
                    </div>
                )}

                {/* Scrollytelling Overlay Cards */}
                <div className="relative z-20 w-full max-w-4xl px-6 text-center flex flex-col items-center justify-center">
                    {/* Chapter 01 */}
                    <motion.div
                        style={{ opacity: ch0Opacity, y: ch0Y }}
                        className="absolute inset-x-0 flex flex-col items-center justify-center px-4"
                    >
                        <div className="backdrop-blur-md bg-black/25 p-8 md:p-14 rounded-[2.5rem] border border-white/15 shadow-2xl flex flex-col items-center w-full max-w-3xl">
                            <p className="font-sans text-brand-accent tracking-[0.3em] text-xs md:text-sm uppercase mb-5 flex items-center gap-3 font-medium">
                                <span className="w-8 h-[1px] bg-brand-accent block" />
                                {chapters[0].tagline}
                                <span className="w-8 h-[1px] bg-brand-accent block" />
                            </p>
                            <h1 className="font-serif text-[38px] sm:text-[54px] md:text-[68px] leading-[1.1] tracking-tight text-white mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
                                {chapters[0].title}
                                <em className="not-italic text-brand-accent/90">{chapters[0].highlight}</em>
                            </h1>
                            <p className="font-sans font-light text-white/90 max-w-xl text-sm md:text-base leading-relaxed mb-8 drop-shadow">
                                {chapters[0].description}
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <Link
                                    href={chapters[0].buttonHref}
                                    className="px-8 py-3.5 bg-brand-accent hover:bg-brand-accent/90 text-brand-dark font-sans text-xs tracking-[0.2em] uppercase font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-brand-accent/20"
                                >
                                    {chapters[0].buttonText}
                                </Link>
                                <button
                                    onClick={() => scrollToChapter(chapters[1].targetProgress)}
                                    className="px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-sans text-xs tracking-[0.2em] uppercase font-medium rounded-full transition-all duration-300 backdrop-blur-sm"
                                >
                                    Scroll To Discover
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Chapter 02 */}
                    <motion.div
                        style={{ opacity: ch1Opacity, y: ch1Y }}
                        className="absolute inset-x-0 flex flex-col items-center justify-center px-4"
                    >
                        <div className="backdrop-blur-md bg-black/25 p-8 md:p-14 rounded-[2.5rem] border border-white/15 shadow-2xl flex flex-col items-center w-full max-w-3xl">
                            <p className="font-sans text-brand-accent tracking-[0.3em] text-xs md:text-sm uppercase mb-5 flex items-center gap-3 font-medium">
                                <span className="w-8 h-[1px] bg-brand-accent block" />
                                {chapters[1].tagline}
                                <span className="w-8 h-[1px] bg-brand-accent block" />
                            </p>
                            <h2 className="font-serif text-[38px] sm:text-[54px] md:text-[68px] leading-[1.1] tracking-tight text-white mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
                                {chapters[1].title}
                                <em className="not-italic text-brand-accent/90">{chapters[1].highlight}</em>
                            </h2>
                            <p className="font-sans font-light text-white/90 max-w-xl text-sm md:text-base leading-relaxed mb-8 drop-shadow">
                                {chapters[1].description}
                            </p>
                            <Link
                                href={chapters[1].buttonHref}
                                className="px-8 py-3.5 bg-brand-accent hover:bg-brand-accent/90 text-brand-dark font-sans text-xs tracking-[0.2em] uppercase font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-brand-accent/20"
                            >
                                {chapters[1].buttonText}
                            </Link>
                        </div>
                    </motion.div>

                    {/* Chapter 03 */}
                    <motion.div
                        style={{ opacity: ch2Opacity, y: ch2Y }}
                        className="absolute inset-x-0 flex flex-col items-center justify-center px-4"
                    >
                        <div className="backdrop-blur-md bg-black/25 p-8 md:p-14 rounded-[2.5rem] border border-white/15 shadow-2xl flex flex-col items-center w-full max-w-3xl">
                            <p className="font-sans text-brand-accent tracking-[0.3em] text-xs md:text-sm uppercase mb-5 flex items-center gap-3 font-medium">
                                <span className="w-8 h-[1px] bg-brand-accent block" />
                                {chapters[2].tagline}
                                <span className="w-8 h-[1px] bg-brand-accent block" />
                            </p>
                            <h2 className="font-serif text-[38px] sm:text-[54px] md:text-[68px] leading-[1.1] tracking-tight text-white mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
                                {chapters[2].title}
                                <em className="not-italic text-brand-accent/90">{chapters[2].highlight}</em>
                            </h2>
                            <p className="font-sans font-light text-white/90 max-w-xl text-sm md:text-base leading-relaxed mb-8 drop-shadow">
                                {chapters[2].description}
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <Link
                                    href={chapters[2].buttonHref}
                                    className="px-8 py-3.5 bg-brand-accent hover:bg-brand-accent/90 text-brand-dark font-sans text-xs tracking-[0.2em] uppercase font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-brand-accent/20"
                                >
                                    {chapters[2].buttonText}
                                </Link>
                                <Link
                                    href="/destinations"
                                    className="px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-sans text-xs tracking-[0.2em] uppercase font-medium rounded-full transition-all duration-300 backdrop-blur-sm"
                                >
                                    Explore Map
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Navigation & Scrubber Bar */}
                <div className="absolute bottom-8 left-6 right-6 z-30 flex items-center justify-between pointer-events-auto">
                    {/* Chapter Navigation Buttons */}
                    <div className="hidden sm:flex items-center gap-2 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/15">
                        {chapters.map((ch) => {
                            const isActive =
                                (ch.id === 0 && currentFrameIndex < TOTAL_FRAMES * 0.3) ||
                                (ch.id === 1 && currentFrameIndex >= TOTAL_FRAMES * 0.3 && currentFrameIndex < TOTAL_FRAMES * 0.7) ||
                                (ch.id === 2 && currentFrameIndex >= TOTAL_FRAMES * 0.7);

                            return (
                                <button
                                    key={ch.id}
                                    onClick={() => scrollToChapter(ch.targetProgress)}
                                    className={`px-4 py-1.5 rounded-full text-[10px] font-sans tracking-[0.2em] uppercase transition-all duration-300 ${
                                        isActive
                                            ? 'bg-brand-accent text-brand-dark font-semibold shadow-md'
                                            : 'text-white/70 hover:text-white hover:bg-white/10'
                                    }`}
                                >
                                    0{ch.id + 1} {ch.tagline.split(' ')[0]}
                                </button>
                            );
                        })}
                    </div>

                    {/* Frame Motion Counter Indicator */}
                    <div className="bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 font-mono text-[11px] text-white/80 tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                        FRAME {String(currentFrameIndex + 1).padStart(3, '0')} / {TOTAL_FRAMES}
                    </div>

                    {/* Scroll Down Indicator */}
                    <button
                        onClick={() => scrollToChapter(chapters[1].targetProgress)}
                        className="flex items-center gap-3 text-white/70 hover:text-brand-accent font-sans text-[11px] tracking-[0.2em] uppercase transition-colors group"
                    >
                        <span className="hidden md:inline">Scroll Down</span>
                        <div className="w-6 h-10 rounded-full border-2 border-white/30 group-hover:border-brand-accent flex items-start justify-center p-1 transition-colors">
                            <motion.div
                                animate={{ y: [0, 14, 0] }}
                                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                                className="w-1.5 h-1.5 rounded-full bg-brand-accent"
                            />
                        </div>
                    </button>
                </div>

                {/* Scroll Progress Bar at very bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
                    <div
                        className="h-full bg-gradient-to-r from-brand-accent/80 via-brand-accent to-amber-200 transition-all duration-75 ease-out"
                        style={{ width: `${((currentFrameIndex + 1) / TOTAL_FRAMES) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
