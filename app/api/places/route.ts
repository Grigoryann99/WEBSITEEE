import { NextResponse } from 'next/server';
import { getPlaces } from '@/lib/dataLoader';

export async function GET() {
    try {
        const data = await getPlaces();
        return NextResponse.json(data.places);
    } catch (error) {
        console.error('Error fetching places:', error);
        return NextResponse.json(
            { error: 'Failed to load places' },
            { status: 500 }
        );
    }
}
