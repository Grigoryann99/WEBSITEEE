'use client';
import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import { supabaseConfigured, supabaseKey, supabaseUrl } from './config';
let instance: SupabaseClient | null = null;
export function browserSupabase(): SupabaseClient | null {
    if (!supabaseConfigured) return null;
    if (!instance) instance = createBrowserClient(supabaseUrl, supabaseKey);
    return instance;
}
