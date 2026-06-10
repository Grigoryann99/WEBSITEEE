'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideData {
    id: number;
    videoSrc: string;
    tagline: string;
    title: string;
    description: string;
}

const slides: SlideData[] = [
    {
        id: 0,
        videoSrc: '/videos/hero-1.mp4',
        tagline: 'DISCOVER THE EXTRAORDINARY',
        title: 'What are you\nwaiting for?',
        description: 'Explore private sanctuaries, curated destinations, and luxury travel guides designed for the modern explorer.',
    },
    {
        id: 1,
        videoSrc: '/videos/hero-2.mp4',
        tagline: 'PRIVATE SANCTUARIES',
        title: 'Where Luxury Meets\nthe Horizon',
        description: 'Immerse yourself in spectacular landscapes, handpicked villas, and local secrets around the globe.',
    },
    {
        id: 2,
        videoSrc: '/videos/hero-3.mp4',
        tagline: 'YOUR JOURNEY BEGINS',
        title: 'From Dream\nto Destination',
        description: 'Browse 50+ destinations, discover private villas, and read expert travel guides — everything you need to plan your next extraordinary journey, all in one place.',
    }
];

function VideoPlayer({ src, isActive, onEnded }: { src: string; isActive: boolean; onEnded: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isActive) {
            video.currentTime = 0;
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch((err) => {
                    console.log('Video autoplay blocked or failed:', err);
                });
            }
        } else {
            video.pause();
        }
    }, [isActive]);

    return (
        <video
            ref={videoRef}
            src={src}
            muted
            playsInline
            onEnded={onEnded}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
        />
    );
}

export default function HeroScroll() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleVideoEnded = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    // Auto-advance backup timer in case video fails to load or onEnded doesn't fire
    useEffect(() => {
        const timer = setTimeout(() => {
            handleVideoEnded();
        }, 12000); // 12 seconds per slide fallback
        return () => clearTimeout(timer);
    }, [currentSlide]);

    return (
        <div className="relative h-screen w-full bg-brand-dark overflow-hidden">
            {/* Background Videos */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                {slides.map((slide, idx) => (
                    <VideoPlayer
                        key={slide.id}
                        src={slide.videoSrc}
                        isActive={currentSlide === idx}
                        onEnded={handleVideoEnded}
                    />
                ))}
                {/* Permanent dark overlay over the videos to comply with WCAG text contrast */}
                <div className="absolute inset-0 bg-black/40 z-20 pointer-events-none" />
            </div>

            {/* Subtle vignette — just enough to frame the text */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_35%,_rgba(0,0,0,0.45)_130%)] pointer-events-none z-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/30 pointer-events-none z-20" />

            {/* Slide Content Overlay */}
            <div className="relative z-30 h-full w-full flex flex-col items-center justify-center px-6 text-center">
                {/* Static luxury card container: does not jump, does not scale or unmount */}
                <div className="backdrop-blur-md bg-black/15 p-8 md:p-14 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col items-center w-full max-w-[90%] md:max-w-3xl justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full flex flex-col items-center"
                        >
                            {/* Tagline */}
                            <p className="font-sans text-brand-accent tracking-[0.3em] text-xs md:text-sm uppercase mb-6 flex items-center gap-4 font-light">
                                <span className="w-8 h-[1px] bg-brand-accent block"></span>
                                {slides[currentSlide].tagline}
                                <span className="w-8 h-[1px] bg-brand-accent block"></span>
                            </p>

                            {/* Title */}
                            <h1 className="font-serif text-[36px] sm:text-[48px] md:text-[60px] lg:text-[68px] leading-[1.15] tracking-wide text-white mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] whitespace-pre-line">
                                {slides[currentSlide].title}
                            </h1>

                            {/* Description */}
                            <p className="font-sans font-light text-white/90 max-w-xl text-sm md:text-base leading-relaxed drop-shadow-md">
                                {slides[currentSlide].description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Slide Navigation Dots */}
            <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center gap-3">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-2.5 rounded-full transition-all duration-500 ${
                            currentSlide === idx ? 'w-8 bg-brand-accent' : 'w-2.5 bg-white/30 hover:bg-white/50'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
