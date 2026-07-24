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
        <main
            className="min-h-screen text-[#0F172A] relative overflow-hidden animate-vivid-gradient"
            style={{
                background: 'linear-gradient(-45deg, #D1FAE5, #FEF3C7, #E0F2FE, #F3E8FF)',
            }}
        >
            {/* Background Soft Vivid Glow Orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60 z-0">
                <div className="absolute top-0 left-1/4 w-[550px] h-[550px] bg-[#10B981]/35 rounded-full blur-[110px] animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-[#F59E0B]/35 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-1/2 left-10 w-[450px] h-[450px] bg-[#8B5CF6]/30 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10">
                {/* Header */}
                <section className="pt-40 pb-16 px-6 text-center">
                    <p className="font-sans text-[#059669] tracking-[0.3em] text-xs uppercase mb-6 font-bold">Editorial</p>
                    <h1 className="font-serif text-5xl md:text-7xl text-[#0F172A] mb-6 tracking-wide font-semibold drop-shadow-sm">Travel Journal</h1>
                    <p className="font-sans text-[#1E293B] text-lg max-w-xl mx-auto font-medium leading-relaxed">
                        Original guides, destination stories, and practical travel wisdom from our editorial team.
                    </p>
                </section>

                <div className="max-w-7xl mx-auto px-6 pb-24 space-y-16">

                    {/* Featured post */}
                    <Link href={`/blog/${featured.slug}`} className="group block">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden bg-white/90 backdrop-blur-md border border-gray-200/80 hover:border-[#059669]/50 shadow-md hover:shadow-2xl transition-all duration-500">
                            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[400px] overflow-hidden bg-gray-100">
                                <Image
                                    src={featured.image}
                                    alt={featured.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 lg:to-white/20" />
                            </div>
                            <div className="p-10 flex flex-col justify-center bg-white/95">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="font-sans text-[10px] tracking-widest uppercase text-white bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full font-semibold">
                                        {featured.category}
                                    </span>
                                    <span className="font-sans text-xs text-[#475569] font-medium">{featured.readTime}</span>
                                </div>
                                <h2 className="font-serif text-3xl md:text-4xl text-[#0F172A] mb-5 leading-tight group-hover:text-[#059669] transition-colors duration-300 font-semibold">
                                    {featured.title}
                                </h2>
                                <p className="font-sans text-[#334155] font-normal leading-relaxed mb-8 text-sm">
                                    {featured.description}
                                </p>
                                <div className="flex items-center gap-3 text-[#059669] text-xs font-sans tracking-widest uppercase font-bold">
                                    <span>Read Article</span>
                                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Grid of remaining posts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {rest.map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col bg-white/90 backdrop-blur-md border border-gray-200/80 hover:border-[#059669]/40 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="font-sans text-[10px] tracking-widest uppercase text-white bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full font-semibold">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-7 flex flex-col flex-grow bg-white/95">
                                    <p className="font-sans text-xs text-[#475569] mb-3 font-medium">
                                        {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {post.readTime}
                                    </p>
                                    <h3 className="font-serif text-xl text-[#0F172A] mb-3 leading-snug group-hover:text-[#059669] transition-colors duration-300 flex-grow font-semibold">
                                        {post.title}
                                    </h3>
                                    <p className="font-sans text-sm text-[#334155] font-normal leading-relaxed line-clamp-2 mb-6">
                                        {post.description}
                                    </p>
                                    <span className="font-sans text-xs tracking-widest uppercase text-[#059669] font-bold inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                                        Read More <span>→</span>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </div>
        </main>
    );
}
