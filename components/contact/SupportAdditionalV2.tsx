'use client';

import { motion } from 'framer-motion';
import { Mail, FileText, Share2 } from 'lucide-react';

const options = [
    {
        icon: Mail,
        title: 'Email Support',
        desc: 'Direct help via email',
        value: 'veloratravel.support@gmail.com'
    },
    {
        icon: FileText,
        title: 'Support Articles',
        desc: 'In-depth documentation',
        value: 'Visit Help Center'
    },
    {
        icon: Share2,
        title: 'Social Support',
        desc: 'Connect with us socially',
        value: '@veloratravel'
    }
];

export default function SupportAdditional() {
    return (
        <section className="pb-24 px-4 bg-transparent">
            <div className="max-w-7xl mx-auto border-t border-white/15 pt-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {options.map((opt, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="flex flex-col items-center text-center group bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-white/15 shadow-xl hover:border-emerald-400/50 transition-all"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 group-hover:border-emerald-400/40 transition-all duration-500">
                                <opt.icon className="text-emerald-400 group-hover:scale-110 transition-transform" size={28} />
                            </div>
                            <h4 className="font-serif text-xl text-white mb-2 font-medium">{opt.title}</h4>
                            <p className="text-slate-400 text-xs uppercase tracking-widest mb-4 font-inter font-medium">{opt.desc}</p>
                            <p className="text-white font-medium font-inter group-hover:text-emerald-400 transition-colors cursor-pointer">{opt.value}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
