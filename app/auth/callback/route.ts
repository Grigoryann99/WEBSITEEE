import { NextResponse, type NextRequest } from 'next/server';
import { serverSupabase } from '@/lib/supabase/server';
import { safeReturnPath } from '@/lib/supabase/config';
export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get('code');
    const client = await serverSupabase();
    if (client && code) {
        const { error } = await client.auth.exchangeCodeForSession(code);
        if (!error) return NextResponse.redirect(new URL(safeReturnPath(request.nextUrl.searchParams.get('next')), request.nextUrl.origin), { headers: { 'Cache-Control': 'no-store' } });
    }
    return NextResponse.redirect(new URL('/account?auth=failed', request.nextUrl.origin), { headers: { 'Cache-Control': 'no-store' } });
}
