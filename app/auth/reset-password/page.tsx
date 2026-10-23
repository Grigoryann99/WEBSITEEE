import type { Metadata } from 'next';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

export const metadata: Metadata = { title: 'Choose a new password', robots: { index: false, follow: false } };

export default function ResetPasswordPage() {
    return <main className="concierge-surface min-h-screen px-5 pb-20 pt-36"><section className="mx-auto max-w-md rounded-[30px] border border-sky-100 bg-cream p-6 shadow-soft sm:p-8"><p className="concierge-eyebrow mb-4">YOUR VELORA ACCOUNT</p><h1 className="mb-7 font-serif text-3xl text-ink">A fresh start.</h1><ResetPasswordForm /></section></main>;
}
