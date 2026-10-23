'use client';

import { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { useDisplayPreferences } from '@/components/preferences/DisplayPreferences';
import JourneySearch, { type SearchDestination } from '@/components/search/JourneySearch';
import styles from './HeroConcierge.module.css';

const HERO_VIDEOS = [
    { src: '/videos/hero-1.mp4', poster: '/images/countries/rome.jpg' },
    { src: '/videos/hero-2.mp4', poster: '/images/countries/thailand.optimized.webp' },
    { src: '/videos/hero-3.mp4', poster: '/images/countries/greece.jpg' },
];

const POPULAR_DESTINATIONS = [
    { name: 'Rome, Italy', route: '/destinations/italy/rome', badge: 'Pilot City' },
    { name: 'Florence, Italy', route: '/destinations/italy', badge: 'Curated' },
    { name: 'Tokyo, Japan', route: '/destinations/japan', badge: 'Popular' },
    { name: 'Paris, France', route: '/destinations/france', badge: 'Iconic' },
    { name: 'Swiss Alps', route: '/destinations/switzerland', badge: 'Nature' },
];

const INTEREST_TAGS = [
    'Art & Culture',
    'Local Cuisine',
    'Hidden Gems',
    'Budget-Friendly',
    'Romantic',
    'Relaxed Stroll',
];

export default function HeroConcierge({ destinations }: { destinations: SearchDestination[] }) {
    const [suggestedDestination, setSuggestedDestination] = useState<SearchDestination | null>(null);
    const { reducedMotion } = useDisplayPreferences();
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [showInterestPicker, setShowInterestPicker] = useState(false);
    const intro = reducedMotion ? styles.settled : styles.intro;
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    // Switch video scene every 10 seconds smoothly
    useEffect(() => {
        const interval = setInterval(() => {
            if (!document.hidden) {
                setCurrentVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
            }
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    // Ensure all videos play continuously and smoothly
    useEffect(() => {
        videoRefs.current.forEach((vid) => {
            if (vid) {
                vid.play().catch(() => {});
            }
        });
    }, [currentVideoIndex]);

    const toggleInterest = (tag: string) => {
        setSelectedInterests(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    return (
        <section className="relative isolate min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#22324A] pt-28 pb-16 px-4 sm:px-6">
            {/* Background Videos with Continuous Smooth 2s Crossfade */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                {HERO_VIDEOS.map((vid, idx) => {
                    const isActive = idx === currentVideoIndex;
                    return (
                        <video
                            aria-hidden="true"
                            key={vid.src}
                            ref={(el) => { videoRefs.current[idx] = el; }}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            poster={vid.poster}
                            className="hero-scene absolute inset-0 h-full w-full object-cover brightness-[0.78] contrast-[1.05]"
                            style={{
                                opacity: isActive ? 1 : 0,
                                zIndex: isActive ? 2 : 1,
                                transition: 'opacity 2000ms cubic-bezier(0.45, 0, 0.55, 1)',
                                pointerEvents: 'none',
                            }}
                        >
                            <source src={vid.src} type="video/mp4" />
                        </video>
                    );
                })}

                {/* Soft gradient overlay for text readability */}
                <div className="absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(15,27,45,0.58)_0%,rgba(15,27,45,0.38)_50%,rgba(15,27,45,0.68)_100%)]" />

                {/* Subtle scene dots indicator */}
                <div className="pointer-events-auto absolute bottom-5 right-6 z-30 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-black/25 backdrop-blur-md border border-white/15">
                    {HERO_VIDEOS.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => setCurrentVideoIndex(idx)}
                            aria-pressed={idx === currentVideoIndex}
                            aria-label={`Switch to video scene ${idx + 1}`}
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                                idx === currentVideoIndex
                                    ? 'w-6 bg-white'
                                    : 'w-1.5 bg-white/40 hover:bg-white/70'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Central Content */}
            <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
                {/* Micro Pill Badge */}
                <div className={`${intro} ${styles.badge} inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-semibold tracking-[0.2em] uppercase mb-6 shadow-sm`}>
                    <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                    Intelligent Luxury Concierge
                </div>

                {/* Central Value Proposition */}
                <h1 className={`${intro} ${styles.title} font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.08] max-w-4xl mx-auto drop-shadow-md`}>
                    Your destination. Your budget. <br className="hidden sm:inline" />
                    <span className="italic font-normal text-sky-200">Your kind of journey.</span>
                </h1>

                <p className={`${intro} ${styles.description} font-sans text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto mt-5 mb-10 font-normal leading-relaxed drop-shadow-sm`}>
                    Discover verified places, plan your days with transparent costs, and make every stop count.
                </p>

                <div className={`${intro} ${styles.search}`}>
                    <JourneySearch destinations={destinations} interests={selectedInterests} suggestedDestination={suggestedDestination} />
                </div>

                {/* Quick Destination & Interest Suggestions */}
                <div className={`${intro} ${styles.trending} mt-5 flex flex-wrap items-center justify-center gap-2 text-xs`}>
                    <span className="text-white/80 font-medium mr-1">Trending:</span>
                    {POPULAR_DESTINATIONS.map((dest) => (
                        <button
                            key={dest.name}
                            type="button"
                            onClick={() => {

                                const option = destinations.find(option => option.route === dest.route);
                                setSuggestedDestination(option ? { ...option } : null);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-white/15 backdrop-blur-md text-white border border-white/25 hover:bg-white/30 transition-colors"
                        >
                            <span>{dest.name}</span>
                            {dest.badge && (
                                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-pill bg-sky-500/80 text-white">
                                    {dest.badge}
                                </span>
                            )}
                        </button>
                    ))}

                    <button
                        type="button"
                        onClick={() => setShowInterestPicker(!showInterestPicker)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-pill bg-white/20 text-white border border-white/30 hover:bg-white/40 transition-colors font-medium ml-1"
                    >
                        <span>{showInterestPicker ? 'Hide interests' : '+ Interests'}</span>
                    </button>
                </div>

                {/* Expandable Interest Tags */}
                {showInterestPicker && (
                    <div className="mt-3 inline-flex flex-wrap items-center justify-center gap-2 p-3 rounded-card bg-white/90 backdrop-blur-md border border-white/60 shadow-lift max-w-xl mx-auto">
                        {INTEREST_TAGS.map((tag) => {
                            const isSelected = selectedInterests.includes(tag);
                            return (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => toggleInterest(tag)}
                                    aria-pressed={isSelected}
                                    className={`px-3 py-1.5 rounded-pill text-xs font-medium transition-all ${
                                        isSelected
                                            ? 'bg-sky-600 text-white shadow-xs'
                                            : 'bg-cream text-ink-700 hover:bg-cream-200'
                                    }`}
                                >
                                    {tag}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
