'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Globe, Pen, Home, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-brand-light font-sans selection:bg-[#1D9E75]/30 overflow-hidden">
            
            {/* SECTION 1 — Hero */}
            <section className="relative pt-48 pb-32 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#1D9E75]/10 via-transparent to-transparent pointer-events-none" />
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto relative z-10"
                >
                    <p className="font-sans text-[#1D9E75] tracking-[0.4em] text-xs uppercase mb-8">Established in Curation</p>
                    <h1 className="font-serif text-6xl md:text-8xl text-brand-light mb-10 leading-tight tracking-tight">
                        About VeloraTravel
                    </h1>
                    <p className="font-sans text-brand-light/80 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
                        We believe travel is not a product to be purchased — it is an experience to be curated, a story to be lived, and a perspective to be changed.
                    </p>
                </motion.div>
            </section>

            {/* SECTION 2 — Our Story */}
            <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="font-serif text-4xl md:text-5xl text-brand-light mb-8">Our Story</h2>
                        <div className="space-y-6 font-sans text-brand-light/70 text-lg font-light leading-relaxed">
                            <p>
                                VeloraTravel was born from a simple, personal frustration. As a lifelong traveler, I spent years navigating a web filled with shallow "top 10" lists and AI-generated clickbait that offered little more than surface-level advice. I realized that what the modern explorer truly needed wasn't more options, but better curation—a single, trusted place to find honest, deep travel guides that respect the reader's time and intelligence.
                            </p>
                            <p>
                                We are not a booking engine. We don&apos;t sell flights or hotel rooms. Instead, we are a curation and inspiration platform dedicated to the architecture of a great journey. We believe the internet has enough transaction platforms; it needs more destinations for thought.
                            </p>
                            <p>
                                When we started, VeloraTravel covered just 10 of our most beloved destinations—places we knew intimately and could recommend without hesitation. As our editorial team grew, so did our reach. Today, we cover over 50 global icons and hidden gems, each one researched with the same rigor and passion that defined our first day.
                            </p>
                            <p>
                                Our mission is simple: to help people travel smarter, not just more. We advocate for the idea that a single, well-curated trip to one extraordinary place—where you understand the history, the hidden corners, and the local rhythm—is worth more than ten generic vacations. By focusing on the "why" and the "how" of travel, we hope to provide the transformative perspectives that stay with you long after the suitcase is unpacked.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#141414] border border-white/10 group"
                    >
                        <Image 
                            src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000&auto=format&fit=crop"
                            alt="Our Founding Story"
                            fill
                            className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                        <div className="absolute bottom-10 left-10">
                            <p className="text-[#1D9E75] font-serif italic text-2xl">&quot;Quality over quantity, always.&quot;</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 3 — What We Offer */}
            <section className="py-32 bg-[#141414]/50 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="font-serif text-4xl md:text-5xl text-brand-light mb-4">What We Offer</h2>
                        <div className="w-20 h-1 bg-[#1D9E75] mx-auto opacity-50" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Globe className="w-8 h-8 text-[#1D9E75]" />,
                                title: "Destination Guides",
                                text: "In-depth guides for 50+ destinations covering best seasons, visa info, local tips, and hidden gems."
                            },
                            {
                                icon: <Pen className="w-8 h-8 text-[#1D9E75]" />,
                                title: "Travel Journal",
                                text: "Original articles written by our editorial team — practical guides, top lists, and destination deep dives."
                            },
                            {
                                icon: <Home className="w-8 h-8 text-[#1D9E75]" />,
                                title: "Luxury Villa Collection",
                                text: "A curated selection of the world's finest private residences, from overwater bungalows to alpine retreats."
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="p-10 bg-[#0a0a0a] border border-white/5 rounded-3xl hover:border-[#1D9E75]/30 transition-colors group text-center"
                            >
                                <div className="mb-6 flex justify-center">{item.icon}</div>
                                <h3 className="font-serif text-2xl text-brand-light mb-4">{item.title}</h3>
                                <p className="font-sans text-brand-light/60 font-light leading-relaxed">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 4 — Our Values */}
            <section className="py-32 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {[
                        {
                            title: "Authenticity",
                            desc: "We only recommend destinations and properties we would genuinely suggest to a close friend."
                        },
                        {
                            title: "Depth over breadth",
                            desc: "Surface-level guides are everywhere. We go deeper — the history, the practical reality, the experiences that matter."
                        },
                        {
                            title: "Sustainability",
                            desc: "We highlight responsible operators and travel practices that preserve the places we love."
                        }
                    ].map((value, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative p-1 border-l border-white/10 pl-10"
                        >
                            <span className="absolute left-0 top-0 text-7xl font-serif text-white/5 select-none">0{idx + 1}</span>
                            <h3 className="font-serif text-2xl text-[#1D9E75] mb-4 relative z-10">{value.title}</h3>
                            <p className="font-sans text-brand-light/70 font-light leading-relaxed relative z-10">{value.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* SECTION 5 — Honest Stats */}
            <section className="py-24 bg-[#141414] border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        {[
                            { value: "50+", label: "Destinations Covered" },
                            { value: "6", label: "Travel Categories" },
                            { value: "Weekly", label: "New guides added" }
                        ].map((stat, idx) => (
                            <div key={idx} className="space-y-2">
                                <p className="font-serif text-6xl text-brand-light tracking-tight">{stat.value}</p>
                                <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#1D9E75] font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 6 — CTA */}
            <section className="py-40 px-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-[#1D9E75]/5 pointer-events-none" />
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-center relative z-10"
                >
                    <h2 className="font-serif text-5xl md:text-7xl text-brand-light mb-10 leading-tight">
                        Ready to Explore?
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link 
                            href="/destinations" 
                            className="bg-[#1D9E75] text-[#0a0a0a] px-10 py-5 rounded-full text-sm font-sans tracking-widest uppercase font-semibold hover:bg-white transition-all transform hover:scale-105 shadow-xl shadow-[#1D9E75]/20"
                        >
                            Browse Destinations
                        </Link>
                        <Link 
                            href="/blog" 
                            className="border border-[#1D9E75] text-[#1D9E75] px-10 py-5 rounded-full text-sm font-sans tracking-widest uppercase font-semibold hover:bg-[#1D9E75] hover:text-[#0a0a0a] transition-all transform hover:scale-105"
                        >
                            Read the Journal
                        </Link>
                    </div>
                </motion.div>
            </section>

        </main>
    );
}
