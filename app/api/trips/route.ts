import { NextRequest, NextResponse } from 'next/server';
import { serverSupabase } from '@/lib/supabase/server';
import { planSchema } from '@/lib/planner';
import { boundedJson, sameOrigin } from '@/lib/request';
import { z } from 'zod';
export const dynamic = 'force-dynamic';
const schema = z.object({ id: z.string().uuid().nullable(), plan: planSchema });
export async function POST(request: NextRequest) {
    if (!sameOrigin(request)) return NextResponse.json({ error: 'Request origin rejected' }, { status: 403 });
    const client = await serverSupabase();
    if (!client) return NextResponse.json({ error: 'Account saving is being connected' }, { status: 503 });
    const { data } = await client.auth.getUser();
    if (!data.user) return NextResponse.json({ error: 'Sign in to save your trip' }, { status: 401 });
    let body;
    try { body = schema.parse(await boundedJson(request, 48000)); } catch { return NextResponse.json({ error: 'Check your trip details' }, { status: 400 }); }
    // Older saved Rome plans have no identity field. Persist it on their next save.
    const { data: id, error } = await client.rpc('save_trip', { p_id: body.id, p_plan: { ...body.plan, destinationId: body.plan.destinationId || 'italy/rome' } });
    if (error || !id) return NextResponse.json({ error: 'Could not save this trip. Please try again.' }, { status: 400 });
    return NextResponse.json({ id }, { headers: { 'Cache-Control': 'private, no-store' } });
}
