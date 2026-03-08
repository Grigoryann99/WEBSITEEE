import { Search } from 'lucide-react';

interface SearchBarProps {
    value?: string;
    onChange?: (val: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div className="relative max-w-2xl mx-auto mt-12 w-full group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent/20 to-brand-accent/0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />

            <div className="relative flex items-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-full p-2 h-16 w-full shadow-2xl transition-all duration-500 group-hover:bg-black/60 group-hover:border-white/30">
                <div className="pl-6 w-full">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange?.(e.target.value)}
                        placeholder="Where would you like to go?"
                        className="w-full bg-transparent text-white placeholder:text-white/40 outline-none font-sans font-light tracking-wide text-lg"
                    />
                </div>
                <button className="flex-shrink-0 bg-brand-light hover:bg-brand-accent h-12 w-32 rounded-full flex items-center justify-center font-sans uppercase tracking-[0.2em] text-[10px] font-bold text-brand-dark hover:text-white transition-colors duration-300">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                </button>
            </div>
        </div>
    );
}
