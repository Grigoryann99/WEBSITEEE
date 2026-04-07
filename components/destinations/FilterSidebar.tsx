'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface FilterSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (filters: FilterState) => void;
}

export interface FilterState {
    regions: string[];
    travelTypes: string[];
    maxPrice: number;
}

export default function FilterSidebar({ isOpen, onClose, onApply }: FilterSidebarProps) {
    const [regions, setRegions] = useState<string[]>([]);
    const [travelTypes, setTravelTypes] = useState<string[]>([]);
    const [price, setPrice] = useState<number>(5000);

    const toggleRegion = (reg: string) => {
        setRegions(prev => prev.includes(reg) ? prev.filter(r => r !== reg) : [...prev, reg]);
    };

    const toggleTravelType = (type: string) => {
        setTravelTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
    };

    const handleApply = () => {
        onApply({ regions, travelTypes, maxPrice: price });
        onClose();
    };

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    // Prevent body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md"
                    />

                    {/* Sidebar */}
                    <motion.aside
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 left-0 bottom-0 z-50 w-full max-w-sm bg-[#0a0a0a] border-r border-white/10 flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <h2 className="font-serif text-2xl text-white">Filters</h2>
                            <button
                                onClick={onClose}
                                className="p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                            
                            {/* Region Section */}
                            <div className="space-y-4">
                                <h3 className="font-sans text-xs uppercase tracking-widest text-[#2dd4bf] font-semibold">Region</h3>
                                <div className="space-y-3">
                                    {['Europe', 'Asia', 'America', 'Africa', 'Oceania'].map((reg) => (
                                        <label key={reg} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                                regions.includes(reg) ? 'bg-[#2dd4bf] border-[#2dd4bf]' : 'border-white/20 group-hover:border-white/50'
                                            }`}>
                                                {regions.includes(reg) && <span className="text-black text-xs font-bold">✓</span>}
                                            </div>
                                            <span className={`font-light text-sm transition-colors ${
                                                regions.includes(reg) ? 'text-white' : 'text-white/60 group-hover:text-white/90'
                                            }`}>
                                                {reg}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="w-full h-px bg-white/10" />

                            {/* Price Range */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-sans text-xs uppercase tracking-widest text-[#2dd4bf] font-semibold">Max Price</h3>
                                    <span className="text-sm font-medium text-white">${price}</span>
                                </div>
                                <input
                                    type="range"
                                    min="500"
                                    max="20000"
                                    step="500"
                                    value={price}
                                    onChange={(e) => setPrice(parseInt(e.target.value))}
                                    className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#2dd4bf]"
                                />
                                <div className="flex justify-between text-xs text-white/40">
                                    <span>$500</span>
                                    <span>$20,000+</span>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="w-full h-px bg-white/10" />

                            {/* Travel Type */}
                            <div className="space-y-4">
                                <h3 className="font-sans text-xs uppercase tracking-widest text-[#2dd4bf] font-semibold">Travel Type</h3>
                                <div className="space-y-3">
                                    {['Solo', 'Family', 'Romantic', 'Adventure', 'Luxury'].map((type) => (
                                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                                travelTypes.includes(type) ? 'bg-[#2dd4bf] border-[#2dd4bf]' : 'border-white/20 group-hover:border-white/50'
                                            }`}>
                                                {travelTypes.includes(type) && <span className="text-black text-xs font-bold">✓</span>}
                                            </div>
                                            <span className={`font-light text-sm transition-colors ${
                                                travelTypes.includes(type) ? 'text-white' : 'text-white/60 group-hover:text-white/90'
                                            }`}>
                                                {type}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Footer (Apply Button) */}
                        <div className="p-6 border-t border-white/10 bg-[#0a0a0a]/80 backdrop-blur-sm">
                            <button
                                onClick={handleApply}
                                className="w-full bg-[#1D9E75] text-[#000000] px-6 py-4 text-xs tracking-widest uppercase font-bold hover:bg-white transition-all rounded-sm flex items-center justify-center gap-2"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
