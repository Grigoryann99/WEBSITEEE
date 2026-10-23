'use client';

import { useState } from 'react';
import { Search, Plane, AlertTriangle, CalendarCheck, User, ChevronDown, CheckCircle2, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
    {
        id: 'planning',
        title: 'Trip Planning & Concierge',
        icon: Plane,
        desc: 'How to craft itineraries, use AI recommendations, and adjust days.',
    },
    {
        id: 'reporting',
        title: 'Report Inaccurate Place/Price',
        icon: AlertTriangle,
        desc: 'Found an outdated opening hour or ticket price? Let our verification team know.',
    },
    {
        id: 'booking',
        title: 'Bookings & Partners',
        icon: CalendarCheck,
        desc: 'Understanding partner tickets, cancellation terms, and verified links.',
    },
    {
        id: 'account',
        title: 'Account & Preferences',
        icon: User,
        desc: 'Managing saved places, active currency, and personal travel profile.',
    },
];

const FAQS = [
    {
        q: 'How does VeloraTravel verify venue prices and opening hours?',
        a: 'Every attraction, restaurant, and transit link in our verified cities (such as Rome) cites its official ticketing or transport authority. If a price or schedule has not been recently re-checked by our team, it is clearly tagged as "Approximate / Unverified" so you can plan safely without surprises.',
    },
    {
        q: 'Can I use VeloraTravel without creating an account?',
        a: 'Yes! All destination directories, city guides, verified prices, and interactive maps are 100% free and open to explore without an account. An account is only prompted when you want to save places or sync an itinerary across your devices.',
    },
    {
        q: 'How does the Currency Converter calculate local prices?',
        a: 'We fetch daily institutional exchange rates covering 10 major currencies (USD, EUR, AMD, RUB, GBP, CHF, AED, JPY, CNY, TRY). You can switch your currency anytime from the navigation bar, and we always keep the venue’s native local price visible on hover or tap.',
    },
    {
        q: 'Are bookings handled directly on VeloraTravel?',
        a: 'VeloraTravel acts as an intelligent curated concierge. When you book a ticket or hotel, you are directed to verified partner platforms (official monuments, museums, or authorized booking services). A booking is only finalized after real confirmation by the partner.',
    },
    {
        q: 'How can I report a closed venue or incorrect ticket price?',
        a: 'You can use the "Report an Error" form on this page or click "Report an issue" inside any place detail card. Our editorial team reviews reports within 24 hours to update the dataset.',
    },
];

export default function SupportWorkspace() {
    const [searchQuery, setSearchQuery] = useState('');
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [selectedPlace, setSelectedPlace] = useState('');
    const [errorDetail, setErrorDetail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const filteredFaqs = FAQS.filter(f =>
        f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.a.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSubmitError = (e: React.FormEvent) => {
        e.preventDefault();
        if (!errorDetail.trim()) return;
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setSelectedPlace('');
            setErrorDetail('');
        }, 4000);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Header & Search */}
            <div className="text-center max-w-3xl mx-auto pt-6 pb-12">
                <span className="text-xs font-bold uppercase tracking-[0.24em] text-sky-700">
                    Velora Assistance & Verification
                </span>
                <h1 className="font-serif text-4xl sm:text-6xl font-semibold text-ink tracking-tight mt-3">
                    How Can We Assist You?
                </h1>
                <p className="text-ink-500 text-sm sm:text-base mt-3 max-w-xl mx-auto">
                    Search our knowledge center, ask concierge questions, or report outdated information to keep our guides accurate.
                </p>

                {/* Search Bar */}
                <div className="relative max-w-xl mx-auto mt-8">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for advice, verification status, or questions..."
                        className="w-full bg-white border border-sky-100 rounded-pill py-3.5 pl-12 pr-6 text-sm text-ink placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-soft"
                    />
                    <Search className="w-5 h-5 text-sky-600 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
            </div>

            {/* 4 Category Cards with 26px rounded corners */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
                {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    return (
                        <div
                            key={cat.id}
                            className="p-6 rounded-[26px] bg-white border border-sky-100 shadow-soft hover:shadow-lift hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-11 h-11 rounded-chip bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-serif text-lg font-semibold text-ink">
                                    {cat.title}
                                </h3>
                                <p className="text-xs text-ink-500 mt-2 leading-relaxed">
                                    {cat.desc}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Split Section: FAQs (Left) and Error Report / Contact (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-start">
                {/* Left: FAQ Accordion */}
                <div className="lg:col-span-7 bg-white rounded-card p-6 sm:p-8 border border-sky-100 shadow-soft">
                    <h2 className="font-serif text-2xl font-semibold text-ink mb-6">
                        Frequently Asked Questions
                    </h2>

                    <div className="divide-y divide-sky-100">
                        {filteredFaqs.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div key={idx} className="py-4">
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                                        className="w-full flex items-center justify-between gap-4 text-left font-serif text-base sm:text-lg font-medium text-ink hover:text-sky-700 transition-colors"
                                    >
                                        <span>{faq.q}</span>
                                        <ChevronDown className={`w-4 h-4 text-sky-600 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="text-xs sm:text-sm text-ink-500 font-sans mt-3 leading-relaxed">
                                                    {faq.a}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right: Report an Error / Contact Form */}
                <div className="lg:col-span-5 bg-white rounded-card p-6 sm:p-8 border border-sky-100 shadow-soft">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-cream text-ink-700 text-xs font-semibold uppercase tracking-wider mb-3 border border-cream-300">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        Data Verification
                    </div>
                    <h2 className="font-serif text-2xl font-semibold text-ink">
                        Report an Error
                    </h2>
                    <p className="text-xs text-ink-500 mt-2 leading-relaxed">
                        Notice a price increase, closed restaurant, or altered schedule? Tell us and our curators will investigate immediately.
                    </p>

                    {submitted ? (
                        <div className="mt-6 p-6 rounded-card bg-sky-50 border border-sky-200 text-center">
                            <CheckCircle2 className="w-10 h-10 text-sky-600 mx-auto mb-2" />
                            <h3 className="font-serif text-lg font-semibold text-ink">Thank you for keeping travel accurate!</h3>
                            <p className="text-xs text-ink-500 mt-1">Our editorial verification team has received your report.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmitError} className="mt-6 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-ink mb-1.5">
                                    Place / Landmark / City
                                </label>
                                <input
                                    type="text"
                                    value={selectedPlace}
                                    onChange={(e) => setSelectedPlace(e.target.value)}
                                    placeholder="e.g. Colosseum underground, Roscioli Rome..."
                                    className="w-full px-4 py-2.5 rounded-chip bg-cream-100 border border-sky-100 text-xs sm:text-sm text-ink placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-ink mb-1.5">
                                    What is inaccurate?
                                </label>
                                <textarea
                                    value={errorDetail}
                                    onChange={(e) => setErrorDetail(e.target.value)}
                                    rows={4}
                                    placeholder="Describe the updated price, hours change, or closure..."
                                    className="w-full px-4 py-2.5 rounded-chip bg-cream-100 border border-sky-100 text-xs sm:text-sm text-ink placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-pill bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm active:scale-98"
                            >
                                <Send className="w-4 h-4" />
                                <span>Submit Verification Report</span>
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
