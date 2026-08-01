import { Metadata } from 'next';
import { getAllBlogPosts } from '@/lib/blogData';
import Link from 'next/link';
import Image from 'next/image';
import FeaturedBlogCarousel from '@/components/blog/FeaturedBlogCarousel';

export const metadata: Metadata = {
    title: 'Travel Blog | VeloraTravel',
    description: 'Explore our original travel guides, destination deep-dives, and expert tips for luxury travelers worldwide.',
};

export default function BlogPage() {
    const posts = getAllBlogPosts();
    const featuredPosts = posts.slice(0, 5); // Take top 5 for carousel
    const restPosts = posts.slice(5); // The rest for the grid

    return (
        <main
            className="min-h-screen text-[#0F172A] relative overflow-hidden animate-blog-gradient"
            style={{
                background: 'linear-gradient(-45deg, #FFE4E6, #FEF3C7, #FED7AA, #F3E8FF)',
            }}
        >
            {/* Background Soft Vivid Glow Orbs — Rose Coral & Sunset Gold */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-65 z-0">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#F43F5E]/35 rounded-full blur-[110px] animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 w-[650px] h-[650px] bg-[#F59E0B]/35 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-[#FB923C]/30 rounded-full blur-[100px]" />
                <div className="absolute top-1/4 right-10 w-[450px] h-[450px] bg-[#C084FC]/30 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10">
                {/* Header */}
                <section className="pt-40 pb-16 px-6 text-center">
                    <p className="font-sans text-[#E11D48] tracking-[0.3em] text-xs uppercase mb-6 font-bold">Editorial Journal</p>
                    <h1 className="font-serif text-5xl md:text-7xl text-[#0F172A] mb-6 tracking-wide font-semibold drop-shadow-sm">Travel Journal</h1>
                    <p className="font-sans text-[#334155] text-lg max-w-xl mx-auto font-medium leading-relaxed">
                        Original guides, destination stories, and practical travel wisdom from our editorial team.
                    </p>
                </section>

                <div className="max-w-7xl mx-auto px-6 pb-24 space-y-16">

                    {/* Featured Carousel */}
                    <FeaturedBlogCarousel posts={featuredPosts} />

                    {/* Grid of remaining posts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {restPosts.map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col bg-white/90 backdrop-blur-md border border-rose-200/80 hover:border-[#E11D48]/40 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
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
                                    <h3 className="font-serif text-xl text-[#0F172A] mb-3 leading-snug group-hover:text-[#E11D48] transition-colors duration-300 flex-grow font-semibold">
                                        {post.title}
                                    </h3>
                                    <p className="font-sans text-sm text-[#334155] font-normal leading-relaxed line-clamp-2 mb-6">
                                        {post.description}
                                    </p>
                                    <span className="font-sans text-xs tracking-widest uppercase text-[#E11D48] font-bold inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
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
