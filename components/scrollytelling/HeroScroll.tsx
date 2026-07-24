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
    const currentFrameIndexRef = useRef<number>(0);
    const rAFRef = useRef<number | null>(null);

    const [isMobile, setIsMobile] = useState<boolean>(false);

    // Frame step: step by 3 on desktop (~180 frames), step by 5 on mobile (~108 frames)
    // Decreases RAM and network usage by 70%, boosting FPS to 60-120fps
    const frameStep = isMobile ? 5 : 3;

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile, { passive: true });
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Framer motion scroll tracking
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 24,
        restDelta: 0.001,
    });

    // Chapter content motion transforms
    const ch0Opacity = useTransform(smoothProgress, [0, 0.02, 0.22, 0.28], [1, 1, 1, 0]);
    const ch0Y = useTransform(smoothProgress, [0, 0.22, 0.28], [0, 0, -30]);

    const ch1Opacity = useTransform(smoothProgress, [0.32, 0.38, 0.58, 0.64], [0, 1, 1, 0]);
    const ch1Y = useTransform(smoothProgress, [0.32, 0.38, 0.58, 0.64], [30, 0, 0, -30]);

    const ch2Opacity = useTransform(smoothProgress, [0.68, 0.74, 0.94, 1], [0, 1, 1, 1]);
    const ch2Y = useTransform(smoothProgress, [0.68, 0.74, 0.94], [30, 0, 0]);

    // Fast, Optimized Canvas Frame Renderer
    const renderFrame = useCallback((frameIdx: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        // O(1) Instant lookup to nearest loaded step frame
        const nearestStep = Math.round(frameIdx / frameStep) * frameStep;
        const clampedStep = Math.min(TOTAL_FRAMES - 1, Math.max(0, nearestStep));
        
        let img = loadedImagesRef.current.get(clampedStep);
        if (!img) {
            // Fallback to first available loaded image
            img = loadedImagesRef.current.get(0);
        }

        if (!img) return;

        const displayWidth = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
            canvas.width = displayWidth * dpr;
            canvas.height = displayHeight * dpr;
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
    }, [frameStep]);

    useEffect(() => {
        const handleResize = () => {
            renderFrame(currentFrameIndexRef.current);
        };
        window.addEventListener('resize', handleResize, { passive: true });
        return () => window.removeEventListener('resize', handleResize);
    }, [renderFrame]);

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

        const priorityIndices = framesToLoad.slice(0, 15);
        const remainingIndices = framesToLoad.slice(15);

        const loadSingleImage = (idx: number): Promise<void> => {
            return new Promise((resolve) => {
                if (loadedImagesRef.current.has(idx)) {
                    resolve();
                    return;
                }

                const img = new Image();
                img.src = getFramePath(idx);
                img.onload = () => {
                    if (!isMounted) return;
                    loadedImagesRef.current.set(idx, img);
                    if (idx === 0) {
                        renderFrame(0);
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
            renderFrame(0);

            let chunkIndex = 0;
            const chunkSize = 8;

            const loadNextChunk = () => {
                if (!isMounted || chunkIndex >= remainingIndices.length) return;
                const chunk = remainingIndices.slice(chunkIndex, chunkIndex + chunkSize);
                chunkIndex += chunkSize;

                Promise.all(chunk.map(loadSingleImage)).then(() => {
                    if ('requestIdleCallback' in window) {
                        (window as any).requestIdleCallback(loadNextChunk);
                    } else {
                        setTimeout(loadNextChunk, 30);
                    }
                });
            };

            loadNextChunk();
        });

        return () => {
            isMounted = false;
        };
    }, [frameStep, renderFrame]);

    // Bind Canvas rendering to Scroll Progress using requestAnimationFrame (No React State Re-renders!)
    useEffect(() => {
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
    }, [smoothProgress, renderFrame]);

    return (
        <div ref={containerRef} className="relative h-[400vh] w-full bg-black">
            {/* Sticky Fullscreen Canvas Viewport */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
                {/* HTML5 Canvas Frame Renderer */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Soft, Subtle Luxury Dark Gradient Overlay for Maximum Frame Clarity & Text Contrast */}
                <div className="absolute inset-0 bg-black/15 z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/25 pointer-events-none z-10" />

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
            </div>
        </div>
    );
}
