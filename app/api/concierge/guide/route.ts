import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { guideContext, guidePromptContext, guidePromptHistory, guideRequestSchema, GUIDE_SYSTEM_PROMPT, validateGuideReply } from '@/lib/concierge-guide';
import { serverSupabase } from '@/lib/supabase/server';
import { boundedJson, sameOrigin } from '@/lib/request';
import { groqModelOptions } from '@/lib/ai-config';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 45;
const fail = (error: string, status: number) => NextResponse.json({ error }, { status, headers: { 'Cache-Control': 'private, no-store' } });
export async function POST(request: NextRequest) {
    if (!sameOrigin(request)) return fail('Request origin rejected.', 403);
    let body;
    try { body = guideRequestSchema.parse(await boundedJson(request, 24000)); } catch { return fail('Choose a destination and enter a question of 3–2000 characters.', 400); }
    const context = guideContext(body.destinationId);
    if (!context) return fail('This destination is not in our guide collection.', 400);
    if (!process.env.GROQ_API_KEY) return fail('The AI connection is not configured yet.', 503);
    const client = await serverSupabase();
    if (!client) return fail('Account sign-in is unavailable.', 503);
    const { data: auth, error: authError } = await client.auth.getUser();
    if (authError || !auth.user) return fail('Sign in to talk with your concierge.', 401);
    const { data: allowed, error } = await client.rpc('consume_concierge_quota');
    if (error) return fail('Your concierge is temporarily unavailable. Please try again.', 503);
    if (!allowed) return NextResponse.json({ error: 'You have reached the hourly conversation limit. Please try again later.' }, { status: 429, headers: { 'Retry-After': '3600', 'Cache-Control': 'private, no-store' } });
    try {
        const provider = new OpenAI({ apiKey: process.env.GROQ_API_KEY, baseURL: 'https://api.groq.com/openai/v1', timeout: 30000, maxRetries: 0 });
        const completion = await provider.chat.completions.create({ ...groqModelOptions(), temperature: 0.2, max_completion_tokens: 2400, response_format: { type: 'json_object' }, messages: [
            { role: 'system', content: `${GUIDE_SYSTEM_PROMPT}\nDestination guide: ${JSON.stringify(guidePromptContext(context))}` },
            ...guidePromptHistory(body.history),
            { role: 'user', content: body.message },
        ] });
        const result = validateGuideReply(JSON.parse(completion.choices[0]?.message.content || '{}'), context.places);
        // Country conversations must not be inserted into legacy Rome-only threads.
        // Until destination-aware persistence is deployed, the conversation stays in this tab.
        return NextResponse.json(result, { headers: { 'Cache-Control': 'private, no-store' } });
    } catch { return fail('A reliable answer could not be generated. Please try again.', 502); }
}
