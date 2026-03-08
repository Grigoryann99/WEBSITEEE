import { NextResponse } from 'next/server';
import { getDestinations } from '@/lib/dataLoader';

export async function GET() {
    try {
        const data = await getDestinations();
        return NextResponse.json(data.destinations);
    } catch (error) {
        console.error('Error fetching destinations:', error);
        return NextResponse.json(
            { error: 'Failed to load destinations' },
            { status: 500 }
        );
    }
}
