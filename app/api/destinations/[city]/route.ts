import { NextResponse } from 'next/server';
import { getDestinations } from '@/lib/dataLoader';

interface RouteContext {
    params: { city: string };
}

export async function GET(request: Request, { params }: RouteContext) {
    try {
        const cityParam = params.city.toLowerCase();
        const data = await getDestinations();

        const destination = data.destinations.find(
            (dest) => dest.city.toLowerCase() === cityParam
        );

        if (!destination) {
            return NextResponse.json(
                { error: `Destination '${params.city}' not found.` },
                { status: 404 }
            );
        }

        return NextResponse.json(destination);
    } catch (error) {
        console.error(`Error fetching destination ${params.city}:`, error);
        return NextResponse.json(
            { error: 'Failed to load destination details' },
            { status: 500 }
        );
    }
}
