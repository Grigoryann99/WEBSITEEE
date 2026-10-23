import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { serverSupabase } from '@/lib/supabase/server';
import { conciergeRequestSchema, validateConciergeResult } from '@/lib/concierge';
import { catalogForDestination } from '@/lib/places/catalog';
import { boundedJson, sameOrigin } from '@/lib/request';
import { calculatePlan, makePlanItem } from '@/lib/planner';
import { groqModelOptions } from '@/lib/ai-config';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 45;
export async function POST(request: NextRequest) {
    if (!sameOrigin(request)) return NextResponse.json({ error: 'Request origin rejected' }, { status: 403 });
    let body;
    try { body = conciergeRequestSchema.parse(await boundedJson(request, 10000)); } catch { return NextResponse.json({ error: 'Choose an available city and check your request, days and group size.' }, { status: 400 }); }
    const places = catalogForDestination(body.destinationId);
    if (!places.length) return NextResponse.json({ error: 'Personal planning is not available for this destination yet.' }, { status: 400 });
    if (!process.env.GROQ_API_KEY) return NextResponse.json({ error: 'Live concierge is being connected. Explore the city guide or build a plan manually.' }, { status: 503 });
    const client = await serverSupabase();
    if (!client) return NextResponse.json({ error: 'Account sign-in is being connected.' }, { status: 503 });
    const { data: auth } = await client.auth.getUser();
    if (!auth.user) return NextResponse.json({ error: 'Sign in to use your personal concierge.' }, { status: 401 });
    const { data: allowed, error: quotaError } = await client.rpc('consume_concierge_quota');
    if (quotaError) return NextResponse.json({ error: 'Concierge is temporarily unavailable.' }, { status: 503 });
    if (!allowed) return NextResponse.json({ error: 'You’ve reached the hourly planning limit. Please try again later.' }, { status: 429, headers: { 'Retry-After': '3600' } });
    const provider = new OpenAI({ apiKey: process.env.GROQ_API_KEY, baseURL: 'https://api.groq.com/openai/v1', timeout: 30000, maxRetries: 0 });
    const catalog = places.filter(place => place.section !== 'stay').map(place => ({ id: place.id, name: place.name, section: place.section, district: place.district, coords: place.coords, duration: place.duration || 60, estimate: place.price, interests: place.interests }));
    try {
        const completion = await provider.chat.completions.create({ ...groqModelOptions(), temperature: 0.2, max_completion_tokens: 2400, response_format: { type: 'json_object' }, messages: [
            { role: 'system', content: `You arrange Rome travel plans from the supplied catalog only. Return ONLY JSON {"days":[{"day":1,"items":["catalog-id"]}]}. Exactly ${body.days} consecutive days, 1–6 stops each. No invented ids, no duplicate attractions, no accommodation, no prose, no booking confirmations. Keep each day relaxed, group nearby places, respect the user's preferences and estimate budget if provided. Prices are unverified estimates, not quotes. Catalog: ${JSON.stringify(catalog)}` },
            { role: 'user', content: JSON.stringify(body) },
        ] });
        const result = validateConciergeResult(JSON.parse(completion.choices[0]?.message.content || '{}'), body.days);
        const plan = { destinationId: body.destinationId, title: 'My concierge Rome journey', days: body.days, travelers: body.travelers, budget: body.budgetEur, items: result.days.flatMap(day => day.items.map(id => makePlanItem(id, day.day))) };
        const estimate = calculatePlan(plan);
        const { data: thread, error: threadError } = await client.from('concierge_threads').insert({ user_id: auth.user.id, title: 'Rome planning request' }).select('id').single();
        if (threadError || !thread) return NextResponse.json({ error: 'Your plan could not be stored. Please try again.' }, { status: 503 });
        const { error: messageError } = await client.from('concierge_messages').insert([{ thread_id: thread.id, role: 'user', content: body.message }, { thread_id: thread.id, role: 'assistant', content: JSON.stringify(result) }]);
        if (messageError) return NextResponse.json({ error: 'Your conversation could not be saved.' }, { status: 503 });
        return NextResponse.json({ result, plan, overBudget: estimate.overBudget }, { headers: { 'Cache-Control': 'private, no-store' } });
    } catch { return NextResponse.json({ error: 'A reliable plan could not be generated. Try a shorter request, or build your days manually.' }, { status: 502 }); }
}
