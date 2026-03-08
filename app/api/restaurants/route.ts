import { NextResponse } from 'next/server';
import { getRestaurants } from '@/lib/dataLoader';

export async function GET() {
    try {
        const data = await getRestaurants();
        return NextResponse.json(data.restaurants);
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        return NextResponse.json(
            { error: 'Failed to load restaurants' },
            { status: 500 }
        );
    }
}
