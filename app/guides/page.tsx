import type { Metadata } from 'next';
import { getAllBlogPosts } from '@/lib/blogData';
import GuidesDirectory from '@/components/guides/GuidesDirectory';

export const metadata: Metadata = { title: 'Travel guides', alternates: { canonical: '/guides' } };
export default function GuidesPage() {
    const posts = getAllBlogPosts().map(({ slug, title, description, category, date, readTime, image }) => ({ slug, title, description, category, date, readTime, image }));
    return <GuidesDirectory allPosts={posts} />;
}
