import { Metadata } from 'next';
import DestinationsClient, { DestinationsPageData, DestinationUI, PlaceUI, RestaurantUI, CostUI, ActivityUI } from '@/components/destinations/DestinationsClient';
import { getDestinations, getRestaurants, getPlaces } from '@/lib/dataLoader';

export const metadata: Metadata = {
    title: 'Explore Destinations | Velora Travel',
    description: 'Discover popular places, best restaurants, relaxing getaways, and top things to do around the world.',
};

// Robust function to load and adapt data safely
async function getDestinationsPageData(): Promise<DestinationsPageData> {
    try {
        // Fetch from our new modular data loaders safely
        const [destData, restData, placeData] = await Promise.all([
            getDestinations().catch((err) => { console.error(err); return { destinations: [] }; }),
            getRestaurants().catch((err) => { console.error(err); return { restaurants: [] }; }),
            getPlaces().catch((err) => { console.error(err); return { places: [] }; })
        ]);

        const dests = destData?.destinations || [];
        const rests = restData?.restaurants || [];
        const places = placeData?.places || [];

        // Safely adapt backend data to UI expected shapes
        const popularDestinations: DestinationUI[] = dests.map(d => ({
            city: d?.city || 'Unknown City',
            country: d?.country || 'Unknown Country',
            image: d?.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop",
            description: d?.thingsToDo?.join(', ') || 'Discover amazing experiences.',
            landmarks: d?.popularPlaces || []
        }));

        const bestPlacesToVisit: PlaceUI[] = places.map(p => ({
            title: p?.name || 'Unknown Place',
            image: p?.image || "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop",
            rating: p?.rating || 0,
            description: p?.description || ''
        }));

        const bestRestaurants: RestaurantUI[] = rests.map(r => ({
            name: r?.name || '',
            cuisine: r?.cuisine || '',
            rating: r?.rating || 0,
            priceLevel: r?.priceLevel || ''
        }));

        const travelCosts: CostUI[] = dests.map(d => ({
            city: d?.city || '',
            cost: d?.averageCost || ''
        }));

        // Mock grouping activities
        const uniqueActivities = Array.from(new Set(dests.flatMap(d => d?.thingsToDo || [])));
        const thingsToDo: ActivityUI[] = uniqueActivities.length ? [{
            category: "Top Curated Activities",
            activities: uniqueActivities.slice(0, 6)
        }] : [];

        return {
            popularDestinations,
            bestPlacesToVisit,
            bestRestaurants,
            bestPlacesToRelax: bestPlacesToVisit.slice(0, 4), // Fallback logic
            travelCosts,
            thingsToDo
        };

    } catch (error) {
        console.error("Critical error adapting page data:", error);
        // Always return a valid object to prevent undefined runtime crashes
        return {};
    }
}

export default async function DestinationsPage() {
    const data = await getDestinationsPageData();

    return <DestinationsClient initialData={data} />;
}
