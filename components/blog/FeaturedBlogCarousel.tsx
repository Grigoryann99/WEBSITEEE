'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogPost } from '@/lib/blogData';

export default function FeaturedBlogCarousel({ posts }: { posts: BlogPost[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance the carousel
    useEffect(() => {
        if (posts.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % posts.length);
        }, 5000); // 5 seconds
        return () => clearInterval(timer);
    }, [posts.length]);

    if (!posts || posts.length === 0) return null;

    const featured = posts[currentIndex];

    return (
        <div className="relative group block rounded-3xl overflow-hidden bg-white/90 backdrop-blur-md border border-rose-200/80 hover:border-[#E11D48]/50 shadow-md hover:shadow-2xl transition-all duration-500">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-0"
                >
                    {/* Image Half */}
                    <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[400px] overflow-hidden bg-gray-100">
                        <Link href={`/blog/${featured.slug}`}>
                            <Image
                                src={featured.image}
                                alt={featured.title}
                                fill
                                className="object-cover transition-transform duration-700"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 lg:to-white/20 pointer-events-none" />
                        </Link>
                    </div>
                    
                    {/* Content Half */}
                    <div className="p-10 flex flex-col justify-center bg-white/95 relative">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="font-sans text-[10px] tracking-widest uppercase text-white bg-gradient-to-r from-[#E11D48] to-[#F59E0B] backdrop-blur-md px-3.5 py-1.5 rounded-full font-bold shadow-sm">
                                {featured.category}
                            </span>
                            <span className="font-sans text-xs text-[#475569] font-medium">{featured.readTime}</span>
                        </div>
                        <Link href={`/blog/${featured.slug}`}>
                            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#0F172A] mb-6 leading-[1.15] font-semibold hover:text-[#E11D48] transition-colors duration-300">
                                {featured.title}
                            </h2>
                        </Link>
                        <p className="font-sans text-[#475569] text-base leading-relaxed mb-8">
                            {featured.description}
                        </p>
                        <Link
                            href={`/blog/${featured.slug}`}
                            className="inline-flex items-center gap-3 font-sans text-xs font-bold uppercase tracking-[0.15em] text-[#E11D48] hover:text-[#0F172A] transition-colors group-hover:text-[#0F172A]"
                        >
                            Read Article
                            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                        </Link>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Pagination Dots */}
            {posts.length > 1 && (
                <div className="absolute bottom-6 right-10 flex gap-2 z-20">
                    {posts.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                idx === currentIndex
                                    ? 'w-8 bg-[#E11D48]'
                                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
