'use client';

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&h=400&auto=format&fit=crop";

interface NewsItem {
    title: string;
    description: string;
    link: string;
    date: string;
    image: string;
    source: string;
}

export default function News() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const loadNews = () => {
            fetch("/api/news")
                .then(res => res.json())
                .then((data: NewsItem[]) => {
                    setNews(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch news:", err);
                    setLoading(false);
                });
        };

        loadNews();
        const interval = setInterval(loadNews, 30 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="pt-32 pb-24 min-h-screen bg-brand-dark text-brand-light relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-mesh-luxury opacity-30 pointer-events-none" />

            <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <p className="font-sans text-brand-accent tracking-widest text-sm uppercase mb-4">
                        Discover &amp; Inspire
                    </p>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-luxury leading-tight mb-6">
                        Global News
                    </h1>
                    <p className="font-sans text-brand-light/70 max-w-2xl mx-auto text-lg leading-relaxed">
                        Stay informed with the latest global headlines, breaking stories, and important events shaping our world.
                    </p>
                </motion.div>

                {/* Loading spinner */}
                {isLoading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                {/* News grid */}
                {!isLoading && news.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {news.map((item, index) => (
                            <motion.div
                                key={item.link || index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
                                className="group flex flex-col rounded-3xl overflow-hidden bg-[#141414] border border-white/5 shadow-xl transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl"
                            >
                                {/* Image */}
                                <div className="relative w-full aspect-[16/9] overflow-hidden bg-white/5 flex-shrink-0">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={item.image || FALLBACK_IMAGE}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                        onError={(e) => {
                                            const target = e.currentTarget;
                                            if (target.src !== FALLBACK_IMAGE) {
                                                target.src = FALLBACK_IMAGE;
                                            }
                                        }}
                                    />
                                    {/* Source badge */}
                                    <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white/80 text-[10px] font-sans tracking-wider uppercase px-2 py-1 rounded-full">
                                        {item.source}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <p className="text-[11px] font-sans tracking-wide mb-2 text-brand-accent font-medium">
                                        {new Date(item.date).toLocaleDateString('en-US', {
                                            month: 'short', day: 'numeric', year: 'numeric'
                                        })}
                                    </p>
                                    <h3 className="font-serif text-xl mb-3 custom-line-clamp-2 leading-snug">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm font-sans leading-relaxed text-white/50 custom-line-clamp-3 mb-6">
                                        {item.description}
                                    </p>

                                    {/* READ ARTICLE button — separate anchor so it's always clickable */}
                                    <div className="mt-auto">
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="inline-flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-brand-accent hover:text-white transition-colors duration-300"
                                        >
                                            <span>Read Article</span>
                                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!isLoading && news.length === 0 && (
                    <div className="text-center py-20 text-brand-light/50">
                        <p>No news articles available right now. Please try again later.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
