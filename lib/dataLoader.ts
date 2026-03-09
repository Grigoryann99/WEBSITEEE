import fs from 'fs/promises';
import path from 'path';

export interface Destination {
    city: string;
    country: string;
    averageCost: string;
    image?: string;
    popularPlaces: string[];
    restaurants: string[];
    thingsToDo: string[];
}

export interface Restaurant {
    name: string;
    city: string;
    cuisine: string;
    rating: number;
    priceLevel: string;
    priceSuffix?: string;
}

export interface Place {
    name: string;
    city: string;
    category: string;
    rating: number;
    description: string;
    image?: string;
}

export interface Country {
    name: string;
    code: string;
    continent: string;
}

// Helper generic function to read JSON data safely
async function readJsonFile<T>(filename: string): Promise<T> {
    try {
        const filePath = path.join(process.cwd(), 'data', filename);
        const fileContents = await fs.readFile(filePath, 'utf8');
        return JSON.parse(fileContents) as T;
    } catch (error) {
        console.error(`Error reading ${filename}:`, error);
        throw new Error(`Failed to load data from ${filename}`);
    }
}

export async function getDestinations() {
    return readJsonFile<{ destinations: Destination[] }>('destinations.json');
}

export async function getRestaurants() {
    return readJsonFile<{ restaurants: Restaurant[] }>('restaurants.json');
}

export async function getPlaces() {
    return readJsonFile<{ places: Place[] }>('places.json');
}

export async function getCountries() {
    return readJsonFile<{ countries: Country[] }>('countries.json');
}
