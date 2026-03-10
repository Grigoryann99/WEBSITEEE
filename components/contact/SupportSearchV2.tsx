'use client';

import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SupportSearch() {
    return (
        <section id="support-search" className="relative z-40 -mt-10 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="relative group"
                >
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                        <Search className="text-white/40 group-focus-within:text-brand-accent transition-colors" size={24} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search destinations, travel guides, or support topics..."
                        className="w-full bg-white/[0.08] backdrop-blur-[10px] border border-white/10 rounded-[40px] py-6 md:py-8 pl-16 pr-8 text-white font-inter text-base md:text-lg placeholder:text-white/30 focus:outline-none focus:border-brand-accent/50 focus:bg-white/[0.12] transition-all shadow-2xl"
                    />
                    <div className="absolute inset-0 rounded-[40px] bg-brand-accent/5 blur-xl -z-10 opacity-0 group-focus-within:opacity-100 transition-opacity" />
                </motion.div>
            </div>
        </section>
    );
}
