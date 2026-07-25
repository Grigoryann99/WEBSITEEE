'use client';

import { useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const TOTAL_FRAMES = 542;

const chapters = [
    {
        tagline: "DISCOVER THE EXTRAORDINARY",
        title: "Where Luxury Meets ",
        highlight: "the Horizon",
        description: "Explore private sanctuaries, handpicked villas, and luxury travel guides designed for the modern explorer.",
    },
    {
        tagline: "CURATED EXPERIENCES",
        title: "Crafted for ",
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
    return `/frames/frame_${frameNum}.jpg`;
}

export default function HeroScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const loadedImagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
    const currentFrameIndexRef = useRef<number>(0);
    const rAFRef = useRef<number | null>(null);

    // Responsive Frame Stepping
    const frameStep = useMemo(() => {
        if (typeof window === 'undefined') return 3;
        return window.innerWidth < 768 ? 5 : 3;
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

        let targetIndex = index;
        if (!loadedImagesRef.current.has(targetIndex)) {
            const stepIndex = Math.round(index / frameStep) * frameStep;
            const clampedStepIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, stepIndex));

            if (loadedImagesRef.current.has(clampedStepIndex)) {
                targetIndex = clampedStepIndex;
            } else if (loadedImagesRef.current.has(0)) {
                targetIndex = 0;
            } else {
                return;
            }
        }

        const img = loadedImagesRef.current.get(targetIndex);
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
            let cursor = 0;
            const batchSize = 6;

            const loadNextBatch = () => {
                if (!isMounted || cursor >= remainingIndices.length) return;
                const batch = remainingIndices.slice(cursor, cursor + batchSize);
                cursor += batchSize;

                Promise.all(batch.map(loadSingleImage)).then(() => {
                    if (isMounted && cursor < remainingIndices.length) {
                        if ('requestIdleCallback' in window) {
                            (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(loadNextBatch);
                        } else {
                            setTimeout(loadNextBatch, 20);
                        }
                    }
                });
            };

            loadNextBatch();
        });

        return () => {
            isMounted = false;
        };
    }, [frameStep, renderFrame]);

    // Subscribe to scroll changes
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

                {/* Subtle Edge Vignette for Frame Clarity (Image/Video is 100% Bright & Visible) */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/25 z-10 pointer-events-none" />

                {/* Pure Clean Typography Overlays with High Contrast */}
                <div className="relative z-20 w-full max-w-5xl px-6 text-center flex flex-col items-center justify-center">
                    {/* Chapter 01 */}
                    <motion.div
                        style={{ opacity: ch0Opacity, y: ch0Y }}
                        className="absolute inset-x-0 flex flex-col items-center justify-center px-4"
                    >
                        <p className="font-sans text-brand-accent tracking-[0.35em] text-xs sm:text-sm uppercase mb-4 font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,1.0)]">
                            {chapters[0].tagline}
                        </p>
                        <h1 className="font-serif text-[42px] sm:text-[64px] md:text-[80px] lg:text-[90px] leading-[1.05] tracking-tight text-white mb-6 font-semibold drop-shadow-[0_6px_30px_rgba(0,0,0,1.0)]">
                            {chapters[0].title}
                            <span className="text-[#F59E0B] drop-shadow-[0_4px_20px_rgba(0,0,0,1.0)]">{chapters[0].highlight}</span>
                        </h1>
                        <p className="font-sans font-medium text-white max-w-xl text-base md:text-lg leading-relaxed drop-shadow-[0_3px_15px_rgba(0,0,0,1.0)]">
                            {chapters[0].description}
                        </p>
                    </motion.div>

                    {/* Chapter 02 */}
                    <motion.div
                        style={{ opacity: ch1Opacity, y: ch1Y }}
                        className="absolute inset-x-0 flex flex-col items-center justify-center px-4"
                    >
                        <p className="font-sans text-brand-accent tracking-[0.35em] text-xs sm:text-sm uppercase mb-4 font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,1.0)]">
                            {chapters[1].tagline}
                        </p>
                        <h2 className="font-serif text-[42px] sm:text-[64px] md:text-[80px] lg:text-[90px] leading-[1.05] tracking-tight text-white mb-6 font-semibold drop-shadow-[0_6px_30px_rgba(0,0,0,1.0)]">
                            {chapters[1].title}
                            <span className="text-[#F59E0B] drop-shadow-[0_4px_20px_rgba(0,0,0,1.0)]">{chapters[1].highlight}</span>
                        </h2>
                        <p className="font-sans font-medium text-white max-w-xl text-base md:text-lg leading-relaxed drop-shadow-[0_3px_15px_rgba(0,0,0,1.0)]">
                            {chapters[1].description}
                        </p>
                    </motion.div>

                    {/* Chapter 03 */}
                    <motion.div
                        style={{ opacity: ch2Opacity, y: ch2Y }}
                        className="absolute inset-x-0 flex flex-col items-center justify-center px-4"
                    >
                        <p className="font-sans text-brand-accent tracking-[0.35em] text-xs sm:text-sm uppercase mb-4 font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,1.0)]">
                            {chapters[2].tagline}
                        </p>
                        <h2 className="font-serif text-[42px] sm:text-[64px] md:text-[80px] lg:text-[90px] leading-[1.05] tracking-tight text-white mb-6 font-semibold drop-shadow-[0_6px_30px_rgba(0,0,0,1.0)]">
                            {chapters[2].title}
                            <span className="text-[#F59E0B] drop-shadow-[0_4px_20px_rgba(0,0,0,1.0)]">{chapters[2].highlight}</span>
                        </h2>
                        <p className="font-sans font-medium text-white max-w-xl text-base md:text-lg leading-relaxed drop-shadow-[0_3px_15px_rgba(0,0,0,1.0)]">
                            {chapters[2].description}
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
