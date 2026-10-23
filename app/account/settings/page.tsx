import type { Metadata } from 'next';
import SettingsWorkspace from '@/components/auth/SettingsWorkspace';

export const metadata: Metadata = { title: 'Your settings', robots: { index: false, follow: false } };

export default function SettingsPage() { return <SettingsWorkspace />; }
