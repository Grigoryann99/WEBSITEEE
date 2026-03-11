import { Metadata } from 'next';
import { getAllBlogPosts } from '@/lib/blogData';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Travel Blog | VeloraTravel',
    description: 'Explore our original travel guides, destination deep-dives, and expert tips for luxury travelers worldwide.',
};

export default function BlogPage() {
    const posts = getAllBlogPosts();
    const [featured, ...rest] = posts;

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-brand-light">
            {/* Header */}
            <section className="pt-40 pb-16 px-6 text-center">
                <p className="font-sans text-brand-accent tracking-[0.3em] text-xs uppercase mb-6">Editorial</p>
                <h1 className="font-serif text-5xl md:text-7xl text-brand-light mb-6 tracking-wide">Travel Journal</h1>
                <p className="font-sans text-brand-light/60 text-lg max-w-xl mx-auto font-light leading-relaxed">
                    Original guides, destination stories, and practical travel wisdom from our editorial team.
                </p>
            </section>

            <div className="max-w-7xl mx-auto px-6 pb-24 space-y-16">

                {/* Featured post */}
                <Link href={`/blog/${featured.slug}`} className="group block">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden bg-[#141414] border border-white/5 hover:border-brand-accent/30 transition-all duration-500">
                        <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[400px] overflow-hidden bg-[#1a1a1a]">
                            <Image
                                src={featured.image}
                                alt={featured.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#141414]/30 lg:to-[#141414]" />
                        </div>
                        <div className="p-10 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="font-sans text-[10px] tracking-widest uppercase text-brand-accent border border-brand-accent/30 px-3 py-1 rounded-full">
                                    {featured.category}
                                </span>
                                <span className="font-sans text-xs text-brand-light/40">{featured.readTime}</span>
                            </div>
                            <h2 className="font-serif text-3xl md:text-4xl text-brand-light mb-5 leading-tight group-hover:text-brand-accent transition-colors duration-300">
                                {featured.title}
                            </h2>
                            <p className="font-sans text-brand-light/60 font-light leading-relaxed mb-8 text-sm">
                                {featured.description}
                            </p>
                            <div className="flex items-center gap-3 text-brand-accent text-xs font-sans tracking-widest uppercase">
                                <span>Read Article</span>
                                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* Grid of remaining posts */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rest.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col bg-[#141414] border border-white/5 hover:border-brand-accent/30 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2">
                            <div className="relative aspect-[16/10] overflow-hidden bg-[#1a1a1a]">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="font-sans text-[10px] tracking-widest uppercase text-brand-light bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-7 flex flex-col flex-grow">
                                <p className="font-sans text-xs text-brand-light/40 mb-3">
                                    {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {post.readTime}
                                </p>
                                <h3 className="font-serif text-xl text-brand-light mb-3 leading-snug group-hover:text-brand-accent transition-colors duration-300 flex-grow">
                                    {post.title}
                                </h3>
                                <p className="font-sans text-sm text-brand-light/50 font-light leading-relaxed line-clamp-2 mb-6">
                                    {post.description}
                                </p>
                                <span className="font-sans text-xs tracking-widest uppercase text-brand-accent inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                                    Read More <span>→</span>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </main>
    );
}
