'use client';

import { motion } from 'framer-motion';
import { 
    Navigation2, 
    Compass, 
    Wrench, 
    MessageSquare, 
    ShieldCheck, 
    HelpCircle 
} from 'lucide-react';

const categories = [
    {
        icon: Navigation2,
        title: 'Website Navigation',
        description: 'Help using the website and finding destinations.',
        color: 'text-blue-400'
    },
    {
        icon: Compass,
        title: 'Travel Information',
        description: 'Questions about countries, cities, and travel inspiration.',
        color: 'text-brand-accent'
    },
    {
        icon: Wrench,
        title: 'Technical Issues',
        description: 'Problems loading pages, images, or account content.',
        color: 'text-red-400'
    },
    {
        icon: MessageSquare,
        title: 'Content Feedback',
        description: 'Report incorrect information or suggest improvements.',
        color: 'text-green-400'
    },
    {
        icon: ShieldCheck,
        title: 'Partnerships',
        description: 'Business inquiries or collaborative travel partnerships.',
        color: 'text-purple-400'
    },
    {
        icon: HelpCircle,
        title: 'General Questions',
        description: 'Any other questions or general inquiries.',
        color: 'text-amber-400'
    }
];

export default function SupportCategories() {
    return (
        <section className="py-24 px-4 bg-brand-dark">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Expert Assistance</h2>
                    <p className="font-inter text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
                        Select a category below to get targeted help with your travel exploration or technical needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ scale: 1.03, translateY: -5 }}
                            className="group cursor-pointer p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 backdrop-blur-md hover:bg-white/[0.05] hover:border-brand-accent/20 transition-all duration-300 shadow-xl"
                        >
                            <div className={`mb-6 p-4 rounded-2xl bg-white/[0.03] w-fit group-hover:scale-110 transition-transform duration-500`}>
                                <cat.icon className={`${cat.color} group-hover:brightness-125 transition-all`} size={32} />
                            </div>
                            <h3 className="font-serif text-2xl text-white mb-3 tracking-wide">{cat.title}</h3>
                            <p className="font-inter text-white/40 text-sm leading-relaxed font-light">
                                {cat.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
