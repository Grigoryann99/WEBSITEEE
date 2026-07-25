'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "What is VeloraTravel?",
        answer: "VeloraTravel is a premium travel inspiration and information platform. We curate world-class destinations, high-quality travel guides, and luxury lifestyle content to help you plan your next extraordinary journey. We are not a booking engine, but a gateway to global travel wisdom."
    },
    {
        question: "How can I explore destinations?",
        answer: "You can use our 'Destinations' page to browse by region or interest. Each destination highlights unique landmarks, cultural history, and practical travel insights. Our search bar in the Support Center can also help you find specific guides."
    },
    {
        question: "How can I report an error on the website?",
        answer: "We strive for absolute accuracy. If you find incorrect information, please use the 'Content Feedback' category in the support form below. Provide details about the error and the page URL, and our editorial team will review it immediately."
    },
    {
        question: "Can I suggest a destination or article?",
        answer: "Absolutely. We love hearing from our community. Use the 'General Questions' category to send us your suggestions. We frequently update our content based on user interest and emerging travel trends."
    },
    {
        question: "How can I contact VeloraTravel directly?",
        answer: "For specific inquiries not covered in our FAQ, please fill out the Support Request Form below. Our team typically responds within 24-48 business hours. For business or press, please select 'Partnerships' in the subject field."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 px-4 bg-transparent">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 font-medium">Frequently Asked Questions</h2>
                    <p className="font-inter text-slate-300 font-light">Find instant answers to the most common questions about VeloraTravel.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div 
                            key={idx} 
                            className={`rounded-2xl border transition-all duration-300 ${
                                openIndex === idx
                                    ? 'bg-slate-900/85 backdrop-blur-xl border-emerald-400/50 shadow-2xl'
                                    : 'bg-slate-900/60 backdrop-blur-xl border-white/15 hover:border-white/30'
                            }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full p-6 md:p-8 flex items-center justify-between text-left"
                            >
                                <span className="font-serif text-xl text-white tracking-wide font-medium">{faq.question}</span>
                                <div className={`ml-4 flex-shrink-0 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}>
                                    {openIndex === idx ? <Minus className="text-emerald-400" size={20} /> : <Plus className="text-white/60" size={20} />}
                                </div>
                            </button>
                            
                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-8 pb-8 text-slate-300 font-inter font-normal leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
