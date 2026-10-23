export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
export const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
export const supabaseConfigured = Boolean(supabaseUrl && supabaseKey);
export const authProviders = (process.env.NEXT_PUBLIC_AUTH_PROVIDERS || '').split(',').filter((value): value is 'google' | 'apple' | 'azure' => ['google', 'apple', 'azure'].includes(value));

export function safeReturnPath(value: string | null): string {
    if (!value || !value.startsWith('/') || value.startsWith('//') || /[\\\r\n]/.test(value)) return '/account';
    const path = value.split('?')[0];
    return path === '/account' || path === '/plan' || path === '/auth/reset-password' || /^\/plan\/[a-f0-9-]{36}$/.test(path) || path.startsWith('/destinations/') ? value : '/account';
}
