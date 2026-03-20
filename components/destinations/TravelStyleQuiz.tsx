'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw, ChevronDown } from 'lucide-react';
import Link from 'next/link';

/* ─── Quiz Data ──────────────────────────────────────────────────────── */

const questions = [
    {
        id: 1,
        label: 'What kind of trip are you planning?',
        options: [
            { emoji: '🥂', text: 'Honeymoon & Romance', value: 'honeymoon' },
            { emoji: '👨‍👩‍👧', text: 'Family Vacation', value: 'family' },
            { emoji: '🎒', text: 'Solo Adventure', value: 'solo' },
            { emoji: '✨', text: 'Luxury Escape', value: 'luxury' },
            { emoji: '👥', text: 'Group Travel', value: 'group' },
        ],
    },
    {
        id: 2,
        label: "What's your travel style?",
        options: [
            { emoji: '🏖️', text: 'Beach & Relaxation', value: 'beach' },
            { emoji: '🏛️', text: 'Culture & History', value: 'culture' },
            { emoji: '🏔️', text: 'Nature & Adventure', value: 'nature' },
            { emoji: '🍷', text: 'Food & Wine', value: 'food' },
            { emoji: '🌆', text: 'City Exploration', value: 'city' },
        ],
    },
    {
        id: 3,
        label: 'When are you planning to travel?',
        options: [
            { emoji: '❄️', text: 'Dec – Feb', value: 'winter' },
            { emoji: '🌸', text: 'Mar – May', value: 'spring' },
            { emoji: '☀️', text: 'Jun – Aug', value: 'summer' },
            { emoji: '🍂', text: 'Sep – Nov', value: 'autumn' },
        ],
    },
];

/* ─── Result Matrix ──────────────────────────────────────────────────── */

interface ResultCountry {
    name: string;
    slug: string;
    bestSeason: string;
    budget: string;
}

const countryDB: Record<string, ResultCountry> = {
    maldives:     { name: 'Maldives',     slug: 'maldives',     bestSeason: 'Nov – Apr', budget: '$250 – $600/day' },
    bali:         { name: 'Indonesia',    slug: 'indonesia',    bestSeason: 'Apr – Oct', budget: '$50 – $200/day' },
    seychelles:   { name: 'Seychelles',   slug: 'seychelles',   bestSeason: 'Apr – May', budget: '$150 – $400/day' },
    paris:        { name: 'France',       slug: 'france',       bestSeason: 'Apr – Jun', budget: '$150 – $350/day' },
    rome:         { name: 'Italy',        slug: 'italy',        bestSeason: 'Apr – Jun', budget: '$120 – $300/day' },
    santorini:    { name: 'Greece',       slug: 'greece',       bestSeason: 'May – Oct', budget: '$100 – $300/day' },
    newzealand:   { name: 'New Zealand',  slug: 'new_zealand',  bestSeason: 'Dec – Feb', budget: '$120 – $280/day' },
    iceland:      { name: 'Iceland',      slug: 'iceland',      bestSeason: 'Jun – Aug', budget: '$180 – $400/day' },
    norway:       { name: 'Norway',       slug: 'norway',       bestSeason: 'Jun – Aug', budget: '$150 – $350/day' },
    thailand:     { name: 'Thailand',     slug: 'thailand',     bestSeason: 'Nov – Mar', budget: '$40 – $150/day' },
    spain:        { name: 'Spain',        slug: 'spain',        bestSeason: 'May – Sep', budget: '$100 – $250/day' },
    greece:       { name: 'Greece',       slug: 'greece',       bestSeason: 'May – Oct', budget: '$100 – $300/day' },
    canada:       { name: 'Canada',       slug: 'canada',       bestSeason: 'Jun – Sep', budget: '$120 – $300/day' },
    costarica:    { name: 'Costa Rica',   slug: 'costa_rica',   bestSeason: 'Dec – Apr', budget: '$80 – $200/day' },
    italy:        { name: 'Italy',        slug: 'italy',        bestSeason: 'Apr – Jun', budget: '$120 – $300/day' },
    japan:        { name: 'Japan',        slug: 'japan',        bestSeason: 'Mar – May', budget: '$100 – $300/day' },
    france:       { name: 'France',       slug: 'france',       bestSeason: 'Apr – Jun', budget: '$150 – $350/day' },
    peru:         { name: 'Peru',         slug: 'peru',         bestSeason: 'May – Sep', budget: '$50 – $150/day' },
    morocco:      { name: 'Morocco',      slug: 'morocco',      bestSeason: 'Mar – May', budget: '$50 – $150/day' },
    india:        { name: 'India',        slug: 'india',        bestSeason: 'Oct – Mar', budget: '$30 – $120/day' },
    southkorea:   { name: 'South Korea',  slug: 'south_korea',  bestSeason: 'Mar – May', budget: '$80 – $200/day' },
    singapore:    { name: 'Singapore',    slug: 'singapore',    bestSeason: 'Feb – Apr', budget: '$120 – $350/day' },
    uae:          { name: 'UAE',          slug: 'uae',          bestSeason: 'Nov – Mar', budget: '$200 – $500/day' },
    switzerland:  { name: 'Switzerland',  slug: 'switzerland',  bestSeason: 'Jun – Sep', budget: '$200 – $500/day' },
};

type ResultKey = string;

const resultMatrix: Record<string, ResultKey[]> = {
    'honeymoon_beach':   ['maldives', 'bali', 'seychelles'],
    'honeymoon_city':    ['paris', 'rome', 'santorini'],
    'honeymoon_nature':  ['newzealand', 'iceland', 'norway'],
    'honeymoon_culture': ['paris', 'rome', 'santorini'],
    'honeymoon_food':    ['italy', 'japan', 'france'],
    'family_beach':      ['thailand', 'spain', 'greece'],
    'family_nature':     ['canada', 'newzealand', 'costarica'],
    'family_culture':    ['italy', 'japan', 'france'],
    'family_city':       ['italy', 'japan', 'france'],
    'family_food':       ['italy', 'japan', 'thailand'],
    'solo_nature':       ['iceland', 'peru', 'newzealand'],
    'solo_culture':      ['japan', 'morocco', 'india'],
    'solo_city':         ['japan', 'southkorea', 'singapore'],
    'solo_beach':        ['thailand', 'bali', 'greece'],
    'solo_food':         ['italy', 'japan', 'thailand'],
    'luxury_beach':      ['maldives', 'uae', 'seychelles'],
    'luxury_city':       ['france', 'uae', 'singapore'],
    'luxury_nature':     ['switzerland', 'newzealand', 'norway'],
    'luxury_culture':    ['france', 'italy', 'japan'],
    'luxury_food':       ['italy', 'france', 'japan'],
    'group_beach':       ['thailand', 'spain', 'greece'],
    'group_culture':     ['italy', 'france', 'japan'],
    'group_nature':      ['iceland', 'newzealand', 'peru'],
    'group_city':        ['spain', 'japan', 'france'],
    'group_food':        ['italy', 'japan', 'spain'],
};

function getResults(tripType: string, style: string): ResultCountry[] {
    // Food & Wine overrides trip type
    if (style === 'food') {
        const keys = resultMatrix[`${tripType}_food`] || ['italy', 'japan', 'france'];
        return keys.map(k => countryDB[k]).filter(Boolean);
    }
    const key = `${tripType}_${style}`;
    const keys = resultMatrix[key] || ['italy', 'japan', 'thailand'];
    return keys.map(k => countryDB[k]).filter(Boolean);
}

/* ─── Component ──────────────────────────────────────────────────────── */

export default function TravelStyleQuiz() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0); // 0 = Q1, 1 = Q2, 2 = Q3, 3 = results
    const [answers, setAnswers] = useState<string[]>([]);
    const quizRef = useRef<HTMLDivElement>(null);

    const handleOpen = () => {
        setIsOpen(true);
        setTimeout(() => {
            quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const handleSelect = (value: string) => {
        const newAnswers = [...answers];
        newAnswers[step] = value;
        setAnswers(newAnswers);

        setTimeout(() => {
            setStep(step + 1);
        }, 300);
    };

    const handleReset = () => {
        setStep(0);
        setAnswers([]);
        setIsOpen(false);
    };

    const scrollToGrid = () => {
        const grid = document.getElementById('directory-grid');
        if (grid) grid.scrollIntoView({ behavior: 'smooth' });
    };

    const results = step === 3 ? getResults(answers[0], answers[1]) : [];

    return (
        <section className="max-w-5xl mx-auto px-6">
            {/* Teaser Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[#141414] border border-white/10 rounded-3xl py-16 md:py-24 px-8 md:px-12 text-center shadow-2xl shadow-black/50"
            >
                <h3 className="font-serif text-3xl md:text-4xl text-brand-light mb-4">
                    Not sure where to go?
                </h3>
                <p className="font-sans text-brand-light/60 font-light text-lg max-w-xl mx-auto mb-8">
                    Answer 3 quick questions and we&apos;ll suggest your perfect destination.
                </p>
                {!isOpen && (
                    <button
                        onClick={handleOpen}
                        className="inline-flex items-center gap-3 bg-[#1D9E75] text-[#0a0a0a] px-8 py-4 rounded-full text-xs font-sans tracking-widest uppercase font-semibold hover:bg-white hover:scale-105 transition-all"
                    >
                        Find My Destination <ArrowRight className="w-4 h-4" />
                    </button>
                )}
            </motion.div>

            {/* Quiz Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={quizRef}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="bg-[#111] border border-white/5 border-t-0 rounded-b-3xl p-8 md:p-12">

                            {/* Questions */}
                            {step < 3 && (
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={step}
                                        initial={{ opacity: 0, x: 40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -40 }}
                                        transition={{ duration: 0.35 }}
                                    >
                                        {/* Progress */}
                                        <div className="flex items-center justify-between mb-8">
                                            <p className="font-sans text-brand-light/40 text-sm tracking-wide">
                                                Question <span className="text-[#1D9E75] font-medium">{step + 1}</span> of <span className="text-brand-light/60">3</span>
                                            </p>
                                            <div className="flex gap-2">
                                                {[0, 1, 2].map(i => (
                                                    <div
                                                        key={i}
                                                        className={`h-1 rounded-full transition-all duration-300 ${
                                                            i <= step ? 'w-8 bg-[#1D9E75]' : 'w-4 bg-white/10'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <h4 className="font-serif text-2xl md:text-3xl text-brand-light mb-8">
                                            {questions[step].label}
                                        </h4>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {questions[step].options.map(opt => (
                                                <button
                                                    key={opt.value}
                                                    onClick={() => handleSelect(opt.value)}
                                                    className={`group relative bg-[#1a1a1a] border rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                                                        answers[step] === opt.value
                                                            ? 'border-[#1D9E75] bg-[#1D9E75]/10 shadow-lg shadow-[#1D9E75]/10'
                                                            : 'border-white/5 hover:border-[#1D9E75]/40'
                                                    }`}
                                                >
                                                    <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform">
                                                        {opt.emoji}
                                                    </span>
                                                    <span className="font-sans text-sm text-brand-light/80 font-light">
                                                        {opt.text}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            )}

                            {/* Results */}
                            {step === 3 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <h4 className="font-serif text-2xl md:text-3xl text-brand-light mb-3 text-center">
                                        Your Perfect Destinations
                                    </h4>
                                    <p className="font-sans text-brand-light/50 text-center mb-10 font-light">
                                        Based on your answers, we recommend:
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                                        {results.map((country, i) => (
                                            <motion.div
                                                key={country.slug}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.15, duration: 0.4 }}
                                                className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-8 text-center hover:border-[#1D9E75]/30 transition-colors group"
                                            >
                                                <h5 className="font-serif text-2xl text-brand-light mb-4 group-hover:text-[#1D9E75] transition-colors">
                                                    {country.name}
                                                </h5>
                                                <span className="inline-block text-[10px] uppercase tracking-widest font-sans text-[#1D9E75] bg-[#1D9E75]/10 border border-[#1D9E75]/20 rounded-full px-3 py-1 mb-4">
                                                    Best: {country.bestSeason}
                                                </span>
                                                <p className="font-sans text-brand-light/50 text-sm mb-6">
                                                    {country.budget}
                                                </p>
                                                <Link
                                                    href={`/countries/${country.slug}`}
                                                    className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-sans font-medium text-[#1D9E75] hover:text-white transition-colors"
                                                >
                                                    Explore <ArrowRight className="w-3 h-3" />
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                        <button
                                            onClick={handleReset}
                                            className="inline-flex items-center gap-2 border border-white/10 text-brand-light/70 px-6 py-3 rounded-full text-xs tracking-widest uppercase font-sans hover:border-[#1D9E75] hover:text-[#1D9E75] transition-all"
                                        >
                                            <RotateCcw className="w-3.5 h-3.5" /> Start Over
                                        </button>
                                        <button
                                            onClick={scrollToGrid}
                                            className="inline-flex items-center gap-2 border border-white/10 text-brand-light/70 px-6 py-3 rounded-full text-xs tracking-widest uppercase font-sans hover:border-[#1D9E75] hover:text-[#1D9E75] transition-all"
                                        >
                                            <ChevronDown className="w-3.5 h-3.5" /> Show All Destinations
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
