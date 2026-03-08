interface ActivityCardProps {
    category: string;
    activities: string[];
}

export default function ActivityCard({ category, activities }: ActivityCardProps) {
    return (
        <div className="group bg-[#111] border border-white/5 rounded-3xl p-8 hover:bg-brand-accent/5 hover:border-brand-accent/30 transition-all duration-500 hover:-translate-y-2">
            <h4 className="font-serif text-2xl text-brand-light mb-6 group-hover:text-brand-accent transition-colors duration-300">
                {category}
            </h4>
            <ul className="space-y-4">
                {activities.map((activity, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-brand-light/70 font-sans text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent/50 mt-1.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                        <span className="group-hover:text-brand-light transition-colors duration-300">
                            {activity}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
