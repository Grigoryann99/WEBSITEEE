// Read public auth configuration without creating accounts, sending email, or printing keys.
require('dotenv').config({ path: '.env.local', quiet: true });
const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
(async () => {
    if (!base || !key) throw new Error('Not configured');
    const response = await fetch(`${base}/auth/v1/settings`, { headers: { apikey: key }, signal: AbortSignal.timeout(15000) });
    if (!response.ok) throw new Error('Settings unavailable');
    const settings = await response.json();
    console.log(JSON.stringify({ emailEnabled: settings.external?.email, googleEnabled: settings.external?.google, emailConfirmationRequired: !settings.mailer_autoconfirm, signupDisabled: settings.disable_signup }));
})().catch(() => { console.error('Could not read public authentication settings.'); process.exitCode = 1; });
