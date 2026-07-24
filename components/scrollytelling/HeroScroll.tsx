'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

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
}

const chapters: Chapter[] = [
    {
        id: 0,
        tagline: 'DISCOVER THE EXTRAORDINARY',
        title: 'Where Luxury Meets',
        highlight: ' the Horizon',
        description: 'Explore private sanctuaries, handpicked villas, and luxury travel guides designed for the modern explorer.',
    },
    {
        id: 1,
        tagline: 'UNRIVALED SANCTUARIES',
        title: 'Crafted for the',
        highlight: ' Discerning Voyager',
        description: 'Immerse yourself in spectacular overwater retreats, private islands, and alpine escapes around the globe.',
    },
    {
        id: 2,
        tagline: 'YOUR JOURNEY BEGINS',
        title: 'From Dream to',
        highlight: ' Destination',
        description: 'Browse 50+ destinations across 6 continents and experience tailored luxury travel at its finest.',
    },
];

export default function HeroScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const loadedImagesRef = useRef<Map<number, HTMLImageElement>>(new Map());

    const [loadProgress, setLoadProgress] = useState<number>(0);
    const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    // Frame step: load every frame on desktop, skip every 2nd frame on mobile
    const frameStep = isMobile ? 2 : 1;

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

        let img = loadedImagesRef.current.get(frameIdx);
        if (!img) {
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
        if (framesToLoad[framesToLoad.length - 1] !== TOTAL_FRAMES - 1) {
            framesToLoad.push(TOTAL_FRAMES - 1);
        }

        let loadedCount = 0;
        const totalToLoad = framesToLoad.length;

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

        Promise.all(priorityIndices.map(loadSingleImage)).then(() => {
            if (!isMounted) return;
            renderFrame(0);

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

    return (
        <div ref={containerRef} className="relative h-[450vh] w-full bg-black">
            {/* Sticky Fullscreen Canvas Viewport */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
                {/* HTML5 Canvas Frame Renderer */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Permanent Luxury Vignette for Text Contrast */}
                <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(0,0,0,0.7)_100%)] pointer-events-none z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none z-10" />

                {/* Initial Loading Indicator */}
                {loadProgress < 15 && (
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 z-40 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-3 shadow-xl">
                        <div className="w-3 h-3 rounded-full border-2 border-brand-accent border-t-transparent animate-spin" />
                        <span className="font-sans text-[11px] uppercase tracking-widest text-white/80 font-medium">
                            Loading Experience {loadProgress}%
                        </span>
                    </div>
                )}

                {/* Pure Clean Typography Overlays (No card boxes, no buttons) */}
                <div className="relative z-20 w-full max-w-5xl px-6 text-center flex flex-col items-center justify-center">
                    {/* Chapter 01 */}
                    <motion.div
                        style={{ opacity: ch0Opacity, y: ch0Y }}
                        className="absolute inset-x-0 flex flex-col items-center justify-center px-4"
                    >
                        <p className="font-sans text-brand-accent tracking-[0.35em] text-xs sm:text-sm uppercase mb-4 font-medium drop-shadow-md">
                            {chapters[0].tagline}
                        </p>
                        <h1 className="font-serif text-[42px] sm:text-[64px] md:text-[80px] lg:text-[90px] leading-[1.05] tracking-tight text-white mb-6 drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                            {chapters[0].title}
                            <em className="not-italic text-brand-accent">{chapters[0].highlight}</em>
                        </h1>
                        <p className="font-sans font-light text-white/90 max-w-xl text-base md:text-lg leading-relaxed drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
                            {chapters[0].description}
                        </p>
                    </motion.div>

                    {/* Chapter 02 */}
                    <motion.div
                        style={{ opacity: ch1Opacity, y: ch1Y }}
                        className="absolute inset-x-0 flex flex-col items-center justify-center px-4"
                    >
                        <p className="font-sans text-brand-accent tracking-[0.35em] text-xs sm:text-sm uppercase mb-4 font-medium drop-shadow-md">
                            {chapters[1].tagline}
                        </p>
                        <h2 className="font-serif text-[42px] sm:text-[64px] md:text-[80px] lg:text-[90px] leading-[1.05] tracking-tight text-white mb-6 drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                            {chapters[1].title}
                            <em className="not-italic text-brand-accent">{chapters[1].highlight}</em>
                        </h2>
                        <p className="font-sans font-light text-white/90 max-w-xl text-base md:text-lg leading-relaxed drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
                            {chapters[1].description}
                        </p>
                    </motion.div>

                    {/* Chapter 03 */}
                    <motion.div
                        style={{ opacity: ch2Opacity, y: ch2Y }}
                        className="absolute inset-x-0 flex flex-col items-center justify-center px-4"
                    >
                        <p className="font-sans text-brand-accent tracking-[0.35em] text-xs sm:text-sm uppercase mb-4 font-medium drop-shadow-md">
                            {chapters[2].tagline}
                        </p>
                        <h2 className="font-serif text-[42px] sm:text-[64px] md:text-[80px] lg:text-[90px] leading-[1.05] tracking-tight text-white mb-6 drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                            {chapters[2].title}
                            <em className="not-italic text-brand-accent">{chapters[2].highlight}</em>
                        </h2>
                        <p className="font-sans font-light text-white/90 max-w-xl text-base md:text-lg leading-relaxed drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
                            {chapters[2].description}
                        </p>
                    </motion.div>
                </div>

                {/* Single Minimal Scroll Down Indicator at Bottom Right */}
                <div className="absolute bottom-10 right-8 z-30 flex items-center gap-3 text-white/70 font-sans text-[10px] tracking-[0.25em] uppercase pointer-events-none">
                    <span className="hidden sm:inline font-light">Scroll Down</span>
                    <div className="w-5 h-9 rounded-full border border-white/30 flex items-start justify-center p-1">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-1 h-1 rounded-full bg-brand-accent"
                        />
                    </div>
                </div>

                {/* Minimal Bottom Progress Bar Line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-30 pointer-events-none">
                    <div
                        className="h-full bg-brand-accent transition-all duration-75 ease-out opacity-80"
                        style={{ width: `${((currentFrameIndex + 1) / TOTAL_FRAMES) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
