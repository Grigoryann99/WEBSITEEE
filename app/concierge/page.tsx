import type { Metadata } from 'next';
import ConciergeChat from '@/components/planner/ConciergeChat';
import { supabaseConfigured } from '@/lib/supabase/config';
import { destinationOptions } from '@/lib/destination-options';
import { selectedDestination, type JourneyParams } from '@/lib/destinations';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Your AI travel concierge', description: 'Talk through your travel ideas, compare places and explore our destination guides with your AI concierge.', alternates: { canonical: '/concierge' } };
export default async function ConciergePage({ searchParams: pendingParams }: { searchParams: Promise<JourneyParams> }) {
    const searchParams = await pendingParams;
    const destination = selectedDestination(searchParams);
    return <main className="min-h-screen bg-gradient-to-br from-[#F8F5EE] via-[#F3F8FB] to-[#E7F1F7] pt-32"><ConciergeChat key={destination || 'new'} options={destinationOptions()} initialDestination={destination} preferences={searchParams} configured={Boolean(process.env.GROQ_API_KEY && supabaseConfigured)} /></main>;
}
