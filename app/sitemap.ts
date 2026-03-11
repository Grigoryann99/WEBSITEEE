import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/blogData';
import { countries } from '@/lib/countryData';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://veloratravel.org';
    const now = new Date().toISOString();

    const staticPages: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
        { url: `${baseUrl}/destinations`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/support`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
        { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${baseUrl}/cookies`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    ];

    const blogPages: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date).toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    const countryPages: MetadataRoute.Sitemap = Object.keys(countries).map((key) => ({
        url: `${baseUrl}/countries/${key.replace(/_/g, '-')}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...staticPages, ...blogPages, ...countryPages];
}
