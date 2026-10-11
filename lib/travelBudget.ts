export interface TravelBudget {
    nights: number;
    travelers: number;
    room: number;
    meals: number;
    transfers: number;
    flights: number;
    extras: number;
}

export function calculateTravelBudget(input: TravelBudget) {
    const values = Object.values(input);
    if (values.some(value => !Number.isFinite(value) || value < 0) ||
        !Number.isInteger(input.nights) || input.nights < 1 ||
        !Number.isInteger(input.travelers) || input.travelers < 1) {
        throw new Error('Use non-negative costs and positive whole-number nights and travelers.');
    }
    const accommodation = input.room * input.nights;
    const food = input.meals * (input.nights + 1) * input.travelers;
    const transport = (input.transfers + input.flights) * input.travelers;
    const total = accommodation + food + transport + input.extras;
    return { accommodation, food, transport, total, perPerson: total / input.travelers };
}
