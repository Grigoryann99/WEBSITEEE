import { Utensils, Star } from 'lucide-react';

interface RestaurantCardProps {
    name: string;
    cuisine: string;
    rating: number;
    priceLevel: string;
    priceSuffix?: string;
}

export default function RestaurantCard({ name, cuisine, rating, priceLevel, priceSuffix = 'per person' }: RestaurantCardProps) {
    return (
        <div className="group bg-[#1a1a1a] p-6 sm:p-8 rounded-3xl border border-white/5 transition-all duration-500 hover:border-brand-accent/30 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden flex flex-col h-full">
            {/* Background texture on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col flex-grow">
                {/* Top row: icon + rating */}
                <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-black/40 rounded-full flex items-center justify-center border border-white/10 group-hover:border-brand-accent/50 transition-colors duration-500">
                        <Utensils className="text-brand-light/70 group-hover:text-brand-accent transition-colors duration-500 w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1 bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
                        <Star className="w-3.5 h-3.5 fill-brand-accent text-brand-accent" />
                        <span className="text-white text-xs font-sans font-medium">{rating}</span>
                    </div>
                </div>

                {/* Bottom content */}
                <div className="mt-auto">
                    <p className="text-xs uppercase tracking-widest text-brand-light/50 font-sans mb-2">
                        {cuisine}
                    </p>
                    <h4 className="font-serif text-2xl text-brand-light group-hover:text-brand-accent transition-colors duration-300 leading-snug">
                        {name}
                    </h4>

                    {/* Price block */}
                    <div className="pt-4 mt-4 border-t border-white/10">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-brand-light/35 font-sans mb-1">
                            Price
                        </p>
                        <p className="font-serif text-lg text-brand-accent leading-none tracking-wide">
                            {priceLevel}
                        </p>
                        <p className="text-[11px] text-brand-light/40 font-sans mt-0.5 tracking-wide">
                            {priceSuffix}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
