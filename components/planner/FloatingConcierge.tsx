import { destinationOptions } from '@/lib/destination-options';
import { supabaseConfigured } from '@/lib/supabase/config';
import FloatingConciergeChat from './FloatingConciergeChat';

export default function FloatingConcierge() {
    const options = destinationOptions().map(({ id, name, country, kind }) => ({ id, name: kind === 'city' ? `${name}, ${country}` : name }));
    return <FloatingConciergeChat options={options} configured={Boolean(process.env.GROQ_API_KEY && supabaseConfigured)} />;
}
