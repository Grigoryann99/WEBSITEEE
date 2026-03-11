import { notFound } from 'next/navigation';
import { getBlogPost, getAllBlogPosts } from '@/lib/blogData';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPostPageProps {
    params: { slug: string };
}

export async function generateStaticParams() {
    const posts = getAllBlogPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const post = getBlogPost(params.slug);
    if (!post) return { title: 'Article Not Found | VeloraTravel' };
    return {
        title: `${post.title} | VeloraTravel Blog`,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            images: [{ url: post.image }],
            type: 'article',
        },
    };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
    const post = getBlogPost(params.slug);
    if (!post) notFound();

    const allPosts = getAllBlogPosts();
    const related = allPosts.filter(p => p.slug !== post.slug).slice(0, 3);

    // Convert markdown-style content to paragraphs/headings
    const renderContent = (content: string) => {
        const lines = content.trim().split('\n');
        const elements: React.ReactNode[] = [];
        let i = 0;

        while (i < lines.length) {
            const line = lines[i].trim();
            if (!line) { i++; continue; }

            if (line.startsWith('## ')) {
                elements.push(
                    <h2 key={i} className="font-serif text-2xl md:text-3xl text-brand-light mt-12 mb-5 leading-snug">
                        {line.replace('## ', '')}
                    </h2>
                );
            } else if (line.startsWith('**') && line.endsWith('**')) {
                elements.push(
                    <p key={i} className="font-sans text-sm text-brand-accent font-medium tracking-wide mb-2">
                        {line.replace(/\*\*/g, '')}
                    </p>
                );
            } else if (line.startsWith('| ')) {
                // Table — collect all table rows
                const tableRows: string[] = [];
                while (i < lines.length && lines[i].trim().startsWith('| ')) {
                    tableRows.push(lines[i].trim());
                    i++;
                }
                const headers = tableRows[0].split('|').filter(Boolean).map(s => s.trim());
                const rows = tableRows.slice(2).map(row => row.split('|').filter(Boolean).map(s => s.trim()));
                elements.push(
                    <div key={`table-${i}`} className="overflow-x-auto my-8 rounded-2xl border border-white/10">
                        <table className="w-full font-sans text-sm text-brand-light/70">
                            <thead>
                                <tr className="bg-[#1a1a1a]">
                                    {headers.map((h, hi) => <th key={hi} className="text-left px-5 py-3 text-brand-light/90 font-medium tracking-wide text-xs uppercase">{h}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, ri) => (
                                    <tr key={ri} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                                        {row.map((cell, ci) => <td key={ci} className="px-5 py-3">{cell}</td>)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
                continue;
            } else if (line.startsWith('- ') || line.startsWith('• ')) {
                // Collect bullet list
                const bullets: string[] = [];
                while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('• '))) {
                    bullets.push(lines[i].trim().replace(/^[-•] /, ''));
                    i++;
                }
                elements.push(
                    <ul key={`ul-${i}`} className="space-y-2 my-4 ml-4">
                        {bullets.map((b, bi) => (
                            <li key={bi} className="font-sans text-brand-light/70 font-light leading-relaxed flex gap-3">
                                <span className="text-brand-accent mt-1 flex-shrink-0">›</span>
                                <span>{b}</span>
                            </li>
                        ))}
                    </ul>
                );
                continue;
            } else if (line.startsWith('---')) {
                elements.push(<hr key={i} className="border-white/10 my-12" />);
            } else {
                elements.push(
                    <p key={i} className="font-sans text-brand-light/70 font-light leading-relaxed text-[15px]">
                        {line}
                    </p>
                );
            }
            i++;
        }
        return elements;
    };

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-brand-light">
            {/* Schema.org Article JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": post.title,
                        "description": post.description,
                        "image": post.image,
                        "datePublished": post.date,
                        "author": {
                            "@type": "Organization",
                            "name": "VeloraTravel Editorial Team"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "VeloraTravel",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://veloratravel.org/logo.png"
                            }
                        },
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": `https://veloratravel.org/blog/${post.slug}`
                        }
                    })
                }}
            />

            {/* Hero image */}
            <div className="relative h-[55vh] md:h-[65vh] overflow-hidden bg-[#1a1a1a]">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-[#0a0a0a]/20 to-[#0a0a0a]" />
            </div>

            {/* Article */}
            <article className="max-w-3xl mx-auto px-6 -mt-24 relative z-10 pb-24">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="font-sans text-[10px] tracking-widest uppercase text-brand-accent border border-brand-accent/30 px-3 py-1 rounded-full">
                        {post.category}
                    </span>
                    <span className="font-sans text-xs text-brand-light/40">
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="font-sans text-xs text-brand-light/40">· {post.readTime}</span>
                </div>

                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-light mb-6 leading-tight tracking-wide">
                    {post.title}
                </h1>
                <p className="font-sans text-brand-light/60 text-lg font-light leading-relaxed mb-12 border-b border-white/10 pb-12">
                    {post.description}
                </p>

                {/* Content */}
                <div className="space-y-5">
                    {renderContent(post.content)}
                </div>

                {/* Back to Blog */}
                <div className="mt-16 pt-12 border-t border-white/10">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-brand-accent hover:text-brand-light transition-colors duration-300"
                    >
                        <span>←</span> Back to Journal
                    </Link>
                </div>
            </article>

            {/* Related Articles */}
            {related.length > 0 && (
                <section className="border-t border-white/5 py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="font-serif text-3xl text-brand-light mb-10 text-center">More from the Journal</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {related.map((rp) => (
                                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group flex flex-col bg-[#141414] border border-white/5 hover:border-brand-accent/30 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1">
                                    <div className="relative aspect-[16/9] overflow-hidden bg-[#1a1a1a]">
                                        <Image src={rp.image} alt={rp.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                    <div className="p-6">
                                        <p className="font-sans text-xs text-brand-light/40 mb-2">{rp.category} · {rp.readTime}</p>
                                        <h3 className="font-serif text-lg text-brand-light group-hover:text-brand-accent transition-colors duration-300 leading-snug">
                                            {rp.title}
                                        </h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
