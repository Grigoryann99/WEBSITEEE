import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { supabaseConfigured, supabaseKey, supabaseUrl } from '@/lib/supabase/config';
export async function middleware(request: NextRequest) {
    let response = NextResponse.next({ request });
    response.headers.set('Cache-Control', 'private, no-store');
    if (!supabaseConfigured) return response;
    const supabase = createServerClient(supabaseUrl, supabaseKey, { cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: values => {
            values.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({ request });
            values.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
    } });
    await supabase.auth.getUser();
    response.headers.set('Cache-Control', 'private, no-store');
    return response;
}
export const config = { matcher: ['/account/:path*', '/plan/:path*', '/auth/:path*', '/api/trips/:path*', '/api/concierge/:path*', '/api/custom-plan/:path*'] };
