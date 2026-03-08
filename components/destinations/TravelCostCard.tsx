import { Wallet } from 'lucide-react';

interface TravelCostCardProps {
    city: string;
    cost: string;
    index: number;
}

export default function TravelCostCard({ city, cost, index }: TravelCostCardProps) {
    return (
        <div
            className="group flex items-center justify-between py-6 border-b border-white/10 hover:border-brand-accent/50 transition-colors duration-500"
        >
            <div className="flex items-center gap-6">
                <span className="text-brand-light/20 font-serif text-3xl italic w-8 opacity-50 font-light">
                    {(index + 1).toString().padStart(2, '0')}
                </span>
                <div>
                    <h4 className="font-serif text-2xl text-brand-light tracking-wide group-hover:text-brand-accent transition-colors duration-300">
                        {city}
                    </h4>
                    <p className="text-xs uppercase tracking-[0.2em] font-sans text-brand-light/50 mt-1">
                        Average Daily Cost
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="hidden sm:flex w-10 h-10 rounded-full border border-brand-accent/20 items-center justify-center bg-brand-accent/5 group-hover:bg-brand-accent/20 transition-colors duration-300">
                    <Wallet className="w-4 h-4 text-brand-accent" />
                </div>
                <span className="text-xl sm:text-2xl font-sans font-light tracking-widest text-brand-light">
                    {cost}
                </span>
            </div>
        </div>
    );
}
