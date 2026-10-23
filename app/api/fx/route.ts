import { NextResponse } from 'next/server';
import { getRates } from '@/lib/currency/rates';

export const revalidate = 21600;

export async function GET() {
    const payload = await getRates();
    return NextResponse.json(payload, {
        headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=21600' },
    });
}
