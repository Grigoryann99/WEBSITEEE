import type { Metadata } from 'next';
import AccountWorkspace from '@/components/auth/AccountWorkspace';
export const metadata: Metadata = { title: 'My travel notebook', robots: { index: false, follow: false } };
export default function AccountPage() { return <AccountWorkspace />; }
