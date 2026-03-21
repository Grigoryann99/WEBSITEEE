'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Lightbulb, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

export interface CountryDestinationCardProps {
    name: string;
    location: string;
    category: string;
    description: string;
    whyVisit: string;
    bestTime: string;
    insiderTip: string;
    imageUrl: string;
    featured?: boolean;
}

// Map categories to specific pill colors
const getCategoryStyles = (category: string) => {
    switch (category.toLowerCase()) {
        case 'historical':
            return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
        case 'nature':
            return 'bg-green-500/10 text-green-500 border-green-500/20';
        case 'city':
            return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
        case 'coastal':
            return 'bg-teal-500/10 text-teal-400 border-teal-500/20';
        case 'cultural':
            return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
        case 'food':
            return 'bg-coral-500/10 text-[#FF7F50] border-[#FF7F50]/20';
        default:
            return 'bg-white/5 text-white/70 border-white/10';
    }
};

// Quick helper to truncate tip to ~5 words for the pill preview
const truncateTip = (tip: string) => {
    const words = tip.split(' ');
    if (words.length <= 5) return tip;
    return words.slice(0, 5).join(' ') + '...';
};

export default function CountryDestinationCard({
    name,
    location,
    category,
    description,
    bestTime,
    insiderTip,
    imageUrl,
}: CountryDestinationCardProps) {
    
    const categoryStyles = getCategoryStyles(category);
    const shortTip = truncateTip(insiderTip);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="group flex flex-col md:flex-row bg-[#0a0a0a] border border-white/5 overflow-hidden transition-all duration-300 hover:border-[#1D9E75]/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#1D9E75]/5 w-full max-w-5xl mx-auto"
        >
            {/* Left: Photo (40% width on Desktop) */}
            <div className="relative w-full md:w-[40%] h-[250px] md:h-auto shrink-0 overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r" />
            </div>

            {/* Right: Content (60% width on Desktop) */}
            <div className="flex flex-col justify-between p-6 md:p-8 md:w-[60%] flex-grow relative">
                
                {/* Decorative background accent */}
                <div className="absolute right-0 top-0 w-32 h-32 bg-[#1D9E75]/5 blur-[80px] rounded-full pointer-events-none" />

                <div>
                    {/* Category & Location Header */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-sans tracking-widest font-semibold border ${categoryStyles}`}>
                            {category}
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75]" />
                            <span className="text-[#1D9E75] text-xs font-sans tracking-widest uppercase">
                                {location}
                            </span>
                        </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-serif text-3xl md:text-4xl text-white mb-3 leading-tight">
                        {name}
                    </h3>
                    <p className="font-sans text-white/50 font-light text-sm leading-relaxed mb-8 line-clamp-2 md:line-clamp-3">
                        {description}
                    </p>
                </div>

                {/* Info Pills & Action Button */}
                <div className="mt-auto">
                    {/* Info Pills Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {/* Best Time */}
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                            <Clock className="w-4 h-4 text-[#1D9E75] shrink-0 mt-0.5" />
                            <div>
                                <p className="text-[9px] uppercase tracking-widest font-sans text-white/30 mb-0.5">Best Time</p>
                                <p className="text-xs font-sans text-white/80">{bestTime}</p>
                            </div>
                        </div>

                        {/* Tip Preview */}
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 sm:col-span-1">
                            <Lightbulb className="w-4 h-4 text-[#1D9E75] shrink-0 mt-0.5" />
                            <div>
                                <p className="text-[9px] uppercase tracking-widest font-sans text-white/30 mb-0.5">Insider Tip</p>
                                <p className="text-xs font-sans text-white/80 line-clamp-1" title={insiderTip}>{shortTip}</p>
                            </div>
                        </div>
                    </div>

                    {/* Action */}
                    <Link
                        href={`/destinations/${name.toLowerCase().replace(/ /g, '-')}`}
                        className="inline-flex items-center justify-between w-full md:w-auto px-6 py-3 border border-[#1D9E75]/30 rounded-none text-xs uppercase tracking-widest font-sans font-semibold text-[#1D9E75] hover:bg-[#1D9E75] hover:text-black transition-all group/btn"
                    >
                        <span>Explore Details</span>
                        <ArrowRight className="w-4 h-4 md:ml-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
