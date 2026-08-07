'use client';

import { motion } from 'framer-motion';
import { Mail, FileText, Share2 } from 'lucide-react';

const options = [
    {
        icon: Mail,
        title: 'Email Support',
        desc: 'Direct help via email',
        value: 'support@veloratravel.org'
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
            <div className="max-w-7xl mx-auto border-t border-slate-200/80 pt-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {options.map((opt, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="flex flex-col items-center text-center group bg-white/85 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-xl hover:bg-white hover:border-emerald-500/50 transition-all"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                                <opt.icon className="text-emerald-600 group-hover:text-white group-hover:scale-110 transition-all" size={28} />
                            </div>
                            <h4 className="font-serif text-xl text-[#0F172A] mb-2 font-medium">{opt.title}</h4>
                            <p className="text-[#64748B] text-xs uppercase tracking-widest mb-4 font-inter font-medium">{opt.desc}</p>
                            <p className="text-[#0F172A] font-semibold font-inter group-hover:text-emerald-600 transition-colors cursor-pointer">{opt.value}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
