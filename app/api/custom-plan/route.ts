import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { boundedJson, sameOrigin } from '@/lib/request';
import { serverSupabase } from '@/lib/supabase/server';
export const dynamic = 'force-dynamic';
export async function POST(request: NextRequest) {
    if (!sameOrigin(request)) return NextResponse.json({ error: 'Request origin rejected' }, { status: 403 });
    const client = await serverSupabase();
    if (!client) return NextResponse.json({ error: 'Personal planning requests are being connected.' }, { status: 503 });
    const { data: auth } = await client.auth.getUser();
    if (!auth.user) return NextResponse.json({ error: 'Sign in to request a quote.' }, { status: 401 });
    let body;
    try { body = z.object({ brief: z.string().trim().min(20).max(2000) }).parse(await boundedJson(request, 10000)); } catch { return NextResponse.json({ error: 'Please describe your trip in 20–2000 characters.' }, { status: 400 }); }
    const { data: allowed, error: quota } = await client.rpc('consume_concierge_quota');
    if (quota || !allowed) return NextResponse.json({ error: 'Please try submitting your request later.' }, { status: quota ? 503 : 429 });
    const { data, error } = await client.from('custom_plan_requests').insert({ user_id: auth.user.id, city: 'rome', brief: body.brief }).select('id').single();
    if (error) return NextResponse.json({ error: 'Your request could not be saved. Please try again.' }, { status: 503 });
    return NextResponse.json({ id: data.id }, { headers: { 'Cache-Control': 'no-store' } });
}
