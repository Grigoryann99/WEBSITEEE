'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabaseConfigured } from '@/lib/supabase/config';
export default function CustomPlanRequest() {
    const { user, signIn } = useAuth();
    const [brief, setBrief] = useState(''), [busy, setBusy] = useState(false), [message, setMessage] = useState('');
    return <form className="mt-8 rounded-card border border-sky-200 bg-white p-6 shadow-soft sm:p-8" onSubmit={async event => {
        event.preventDefault(); if (!user) { signIn(); return; } setBusy(true); setMessage('');
        try { const response = await fetch('/api/custom-plan', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ brief }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error); setMessage(`Your request is saved. Reference: ${data.id}. No payment has been taken.`); setBrief(''); }
        catch (error) { setMessage(error instanceof Error ? error.message : 'Could not save your request.'); } finally { setBusy(false); }
    }}><p className="text-sm leading-relaxed text-ink-500">Request a written quote for a personalised Rome itinerary. The price, delivery date, number of revisions and inclusions will be agreed before you accept a paid service. This form does not make a booking or collect payment.</p><label className="mt-6 block text-sm">Your dates, group, interests and budget<textarea className="concierge-input mt-3 !rounded-[26px]" rows={6} minLength={20} maxLength={2000} required value={brief} onChange={event => setBrief(event.target.value)} /></label><button type="submit" className="concierge-button concierge-button-primary mt-5" disabled={busy || !supabaseConfigured}>{busy ? 'Saving request…' : 'Request a quote'}</button>{!supabaseConfigured && <p className="mt-4 text-sm text-ink-500">Personal requests are being connected. You can <Link href="/plan?destination=italy%2Frome" className="underline">preview your own plan</Link> today.</p>}<p role="status" className="mt-4 text-sm text-ink-500">{message}</p></form>;
}
