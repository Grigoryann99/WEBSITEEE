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
        color: 'text-cyan-600'
    },
    {
        icon: Compass,
        title: 'Travel Information',
        description: 'Questions about countries, cities, and travel inspiration.',
        color: 'text-emerald-600'
    },
    {
        icon: Wrench,
        title: 'Technical Issues',
        description: 'Problems loading pages, images, or account content.',
        color: 'text-rose-600'
    },
    {
        icon: MessageSquare,
        title: 'Content Feedback',
        description: 'Report incorrect information or suggest improvements.',
        color: 'text-teal-600'
    },
    {
        icon: ShieldCheck,
        title: 'Partnerships',
        description: 'Business inquiries or collaborative travel partnerships.',
        color: 'text-purple-600'
    },
    {
        icon: HelpCircle,
        title: 'General Questions',
        description: 'Any other questions or general inquiries.',
        color: 'text-amber-600'
    }
];

export default function SupportCategories() {
    return (
        <section className="py-24 px-4 bg-transparent">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl text-[#0F172A] mb-6 font-medium">Expert Assistance</h2>
                    <p className="font-inter text-[#475569] max-w-2xl mx-auto font-light leading-relaxed text-base">
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
                            className="group cursor-pointer p-8 rounded-[2.5rem] bg-white/85 backdrop-blur-xl border border-slate-200/90 hover:border-emerald-500/50 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:bg-white transition-all duration-500"
                        >
                            <div className="mb-6 p-4 rounded-2xl bg-slate-100/80 border border-slate-200/80 w-fit group-hover:scale-110 group-hover:bg-emerald-50 transition-all duration-500">
                                <cat.icon className={`${cat.color} transition-all`} size={32} />
                            </div>
                            <h3 className="font-serif text-2xl text-[#0F172A] mb-3 tracking-wide font-medium">{cat.title}</h3>
                            <p className="font-inter text-[#475569] text-sm leading-relaxed font-normal">
                                {cat.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
