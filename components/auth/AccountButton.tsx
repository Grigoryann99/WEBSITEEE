'use client';
import Link from 'next/link';
import { UserRound } from 'lucide-react';
import { useAuth } from './AuthProvider';
export default function AccountButton() {
    const { user, signIn, loading } = useAuth();
    return user ? <Link href="/account" className="concierge-icon-button" aria-label="My account"><UserRound size={18} /></Link>
        : <button type="button" className="concierge-icon-button" aria-label="Sign in" onClick={signIn} disabled={loading}><UserRound size={18} /></button>;
}
