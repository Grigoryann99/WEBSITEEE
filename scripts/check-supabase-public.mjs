import { config } from 'dotenv';

config({ path: '.env.local', quiet: true });
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key?.startsWith('sb_publishable_')) throw new Error('Configure the project URL and publishable key locally first.');
const tables = ['profiles', 'trips', 'trip_items', 'saved_places', 'concierge_threads', 'concierge_messages', 'concierge_usage', 'custom_plan_requests'];
// Read-only requests with no user session and no data rows requested.
const results = await Promise.all(tables.map(async table => {
    try {
        const response = await fetch(new URL(`/rest/v1/${table}?select=*&limit=0`, url), {
            headers: { apikey: key }, signal: AbortSignal.timeout(15000),
        });
        const body = await response.json();
        const passed = [401, 403].includes(response.status) && body.code === '42501';
        console.log(`${passed ? 'PASS' : 'FAIL'} ${table}: HTTP ${response.status}, ${passed ? 'guest permission denied' : 'unexpected response (body omitted)'}`);
        return passed;
    } catch {
        console.log(`FAIL ${table}: network request could not complete`);
        return false;
    }
}));
if (results.some(passed => !passed)) process.exitCode = 1;
