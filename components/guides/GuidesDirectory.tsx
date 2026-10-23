'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bookmark, Clock, Sparkles, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/lib/blogData';

export default function GuidesDirectory({ allPosts }: { allPosts: Omit<BlogPost, 'content'>[] }) {
    const guideTags = useMemo(() => ['All', ...Array.from(new Set(allPosts.map(post => post.category)))], [allPosts]);
    const [selectedTag, setSelectedTag] = useState('All');
    const [bookmarkedSlugs, setBookmarkedSlugs] = useState<string[]>([]);

    const toggleBookmark = (slug: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setBookmarkedSlugs(prev =>
            prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
        );
    };

    const featuredPost = allPosts[0];

    const filteredPosts = useMemo(() => {
        if (selectedTag === 'All') return allPosts.slice(1);
        return allPosts.filter(post => post.category === selectedTag);
    }, [allPosts, selectedTag]);

    return (
        <main className="min-h-screen bg-cream text-ink pt-28 pb-20 selection:bg-sky-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* 1. Header Section */}
                <section className="text-center max-w-3xl mx-auto pt-6 pb-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-sky-100 text-sky-800 text-xs font-semibold uppercase tracking-wider mb-4">
                        <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                        Practical Travel Notebook
                    </div>
                    <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-semibold text-ink tracking-tight">
                        Velora Travel Guides
                    </h1>
                    <p className="text-ink-500 text-sm sm:text-base md:text-lg mt-3 max-w-xl mx-auto leading-relaxed">
                        Practical insider advice, transparent budget tips, and curated city secrets from our editorial team.
                    </p>

                    {/* Filter Tag Pills */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                        {guideTags.map((tag) => {
                            const isSelected = selectedTag === tag;
                            return (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => setSelectedTag(tag)}
                                    className={`px-4 py-2 rounded-pill text-xs sm:text-sm font-semibold transition-all ${
                                        isSelected
                                            ? 'bg-ink text-white shadow-xs'
                                            : 'bg-white text-ink-600 hover:text-ink hover:bg-cream-100 border border-sky-100'
                                    }`}
                                >
                                    {tag}
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* 2. Big Featured Story Card (Mockup Style) */}
                {featuredPost && selectedTag === 'All' && (
                    <section className="mb-14">
                        <Link
                            href={`/guides/${featuredPost.slug}`}
                            className="group relative block rounded-[32px] overflow-hidden bg-white border border-sky-100 shadow-lift hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="relative h-80 sm:h-96 md:h-[420px] w-full overflow-hidden bg-ink/10">
                                <Image
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    fill
                                    priority
                                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />

                                {/* Top Floating Meta */}
                                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center gap-2">
                                    <span className="px-3 py-1 rounded-pill bg-white/90 backdrop-blur-md text-xs font-bold text-ink shadow-xs">
                                        Featured Story
                                    </span>
                                    <span className="px-3 py-1 rounded-pill bg-sky-900/80 backdrop-blur-md text-xs font-semibold text-sky-200">
                                        {featuredPost.readTime}
                                    </span>
                                </div>

                                {/* Bottom Story Content */}
                                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 text-white max-w-3xl">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300 mb-2">
                                        {featuredPost.category} · {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </p>
                                    <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold leading-tight drop-shadow-sm group-hover:text-sky-200 transition-colors">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="font-sans text-xs sm:text-sm text-white/85 mt-3 line-clamp-2 leading-relaxed hidden sm:block">
                                        {featuredPost.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </section>
                )}

                {/* 3. 3-Column Practical Guide Grid */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-serif text-2xl font-semibold text-ink">
                            {selectedTag === 'All' ? 'All Practical Notebooks' : `${selectedTag} Guides`}
                        </h3>
                        <span className="text-xs font-semibold text-ink-400">
                            {filteredPosts.length} articles
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                        {filteredPosts.map((post) => {
                            const isBookmarked = bookmarkedSlugs.includes(post.slug);
                            return (
                                <Link
                                    key={post.slug}
                                    href={`/guides/${post.slug}`}
                                    className="group flex flex-col rounded-card bg-white border border-sky-100 overflow-hidden shadow-soft hover:shadow-lift hover:-translate-y-1.5 transition-all duration-300"
                                >
                                    {/* Image */}
                                    <div className="relative h-52 w-full overflow-hidden bg-sky-50">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                        />
                                        <div className="absolute top-3 left-3">
                                            <span className="px-2.5 py-1 rounded-pill bg-white/90 backdrop-blur-md text-[11px] font-semibold text-sky-800 shadow-xs">
                                                {post.category}
                                            </span>
                                        </div>

                                        {/* Bookmark Button */}
                                        <button
                                            type="button"
                                            onClick={(e) => toggleBookmark(post.slug, e)}
                                            aria-label="Bookmark article"
                                            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-ink-500 hover:text-sky-600 backdrop-blur-md transition-colors shadow-xs"
                                        >
                                            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-sky-600 text-sky-600' : ''}`} />
                                        </button>
                                    </div>

                                    {/* Body */}
                                    <div className="p-5 flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 text-[11px] text-ink-400 mb-2">
                                                <Clock className="w-3 h-3 text-sky-600" />
                                                <span>{post.readTime}</span>
                                                <span>•</span>
                                                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            </div>

                                            <h4 className="font-serif text-lg font-semibold text-ink group-hover:text-sky-700 transition-colors line-clamp-2 leading-snug">
                                                {post.title}
                                            </h4>

                                            <p className="text-xs text-ink-500 mt-2 line-clamp-2 leading-relaxed">
                                                {post.description}
                                            </p>
                                        </div>

                                        <div className="mt-5 pt-4 border-t border-sky-100 flex items-center justify-between">
                                            <span className="text-xs font-semibold text-sky-600 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                                Read Guide <ArrowRight className="w-3.5 h-3.5" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            </div>
        </main>
    );
}
