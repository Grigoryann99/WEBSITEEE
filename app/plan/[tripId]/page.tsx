import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { serverSupabase } from '@/lib/supabase/server';
import { planSchema } from '@/lib/planner';
import PlanEditor from '@/components/planner/PlanEditor';
import AccountWorkspace from '@/components/auth/AccountWorkspace';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'My journey', robots: { index: false, follow: false } };
export default async function SavedTrip({ params: pendingParams }: { params: Promise<{ tripId: string }> }) {
    const params = await pendingParams;
    if (!/^[a-f0-9-]{36}$/i.test(params.tripId)) notFound();
    const client = await serverSupabase();
    if (!client) return <AccountWorkspace />;
    const { data: auth } = await client.auth.getUser(); if (!auth.user) return <AccountWorkspace />;
    const { data } = await client.from('trips').select('plan').eq('id', params.tripId).eq('user_id', auth.user.id).maybeSingle();
    if (!data) notFound();
    const parsed = planSchema.safeParse(data.plan); if (!parsed.success) notFound();
    return <main className="min-h-screen bg-cream pt-28 sm:pt-32"><Suspense fallback={<p className="p-10">Opening your journey…</p>}><PlanEditor initialPlan={parsed.data} tripId={params.tripId} /></Suspense></main>;
}
