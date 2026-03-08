import { NextResponse } from 'next/server';
import { getCountries } from '@/lib/dataLoader';

export async function GET() {
    try {
        const data = await getCountries();
        return NextResponse.json(data.countries);
    } catch (error) {
        console.error('Error fetching countries:', error);
        return NextResponse.json(
            { error: 'Failed to load countries' },
            { status: 500 }
        );
    }
}
