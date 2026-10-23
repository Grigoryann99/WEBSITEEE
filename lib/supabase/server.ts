import 'server-only';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { supabaseConfigured, supabaseKey, supabaseUrl } from './config';
export async function serverSupabase() {
    if (!supabaseConfigured) return null;
    const jar = await cookies();
    return createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
            getAll: () => jar.getAll(),
            setAll: values => { try { values.forEach(({ name, value, options }) => jar.set(name, value, options)); } catch { /* Server components are refreshed by middleware. */ } },
        },
    });
}
