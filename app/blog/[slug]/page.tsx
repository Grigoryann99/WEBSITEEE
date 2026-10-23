import { notFound, permanentRedirect } from 'next/navigation';
import { getBlogPost } from '@/lib/blogData';
export default async function LegacyArticle({ params: pendingParams }: { params: Promise<{ slug: string }> }) {
    const params = await pendingParams;
    if (!getBlogPost(params.slug)) notFound();
    permanentRedirect(`/guides/${params.slug}`);
}
