import { Suspense } from 'react';
import type { Metadata } from 'next';
import PlanEditor from '@/components/planner/PlanEditor';
import DestinationChooser from '@/components/search/DestinationChooser';
import { destinationOptions } from '@/lib/destination-options';
import { ROME_DESTINATION, selectedDestination, type JourneyParams } from '@/lib/destinations';
export const metadata: Metadata = { title: 'Plan your journey', alternates: { canonical: '/plan' }, robots: { index: false, follow: true } };
export default async function PlanPage({ searchParams: pendingParams }: { searchParams: Promise<JourneyParams> }) {
    const searchParams = await pendingParams;
    const destination = selectedDestination(searchParams);
    return <main className="min-h-screen bg-cream pt-28 sm:pt-32">{destination === ROME_DESTINATION
        ? <Suspense fallback={<p className="p-10">Preparing your plan…</p>}><PlanEditor key={destination} /></Suspense>
        : <DestinationChooser options={destinationOptions()} mode="plan" preferences={searchParams} selectedId={destination} />}</main>;
}
