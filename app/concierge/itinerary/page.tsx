import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import ConciergeWorkspace from '@/components/planner/ConciergeWorkspace';
import { supabaseConfigured } from '@/lib/supabase/config';
import { destinationHref, selectedDestination, ROME_DESTINATION, type JourneyParams } from '@/lib/destinations';
import Link from 'next/link';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Arrange your Rome itinerary', robots: { index: false, follow: true } };
export default async function ConciergeItinerary({ searchParams: pendingParams }: { searchParams: Promise<JourneyParams> }) {
    const searchParams = await pendingParams;
    const destination = selectedDestination(searchParams);
    if (destination !== ROME_DESTINATION) redirect(destinationHref('/concierge', destination, searchParams));
    return <main className="concierge-surface min-h-screen pt-32"><header className="mx-auto max-w-3xl px-5"><Link href={destinationHref('/concierge', destination, searchParams)} className="text-sm text-sky-700 underline">Back to your concierge</Link><p className="concierge-eyebrow mt-5">Rome, Italy · Daily planning</p><h1 className="mt-4 font-serif text-4xl sm:text-6xl">Let’s arrange your days.</h1><p className="mt-4 text-ink-500">Get a suggested itinerary from the Rome catalog, then adjust the stops and budget in your planner.</p></header><Suspense><ConciergeWorkspace preferences={searchParams} available={Boolean(process.env.GROQ_API_KEY && supabaseConfigured)} /></Suspense></main>;
}
