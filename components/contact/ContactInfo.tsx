import { Mail, MessageSquare, Globe, Clock } from 'lucide-react';

const contactInfo = [
    {
        icon: Mail,
        title: "Email Support",
        description: "Our team will respond to your inquiry within 24 hours.",
        detail: "reservations@veloratravel.org",
        action: "mailto:reservations@veloratravel.org"
    },
    {
        icon: MessageSquare,
        title: "Online Support",
        description: "Live chat with our dedicated travel specialists.",
        detail: "Available 24/7",
        action: "#" // Link to a hypothetical live chat
    },
    {
        icon: Globe,
        title: "Global Travel Service",
        description: "Reach our international concierge desk anytime.",
        detail: "+1 (800) 123-4567",
        action: "tel:+18001234567"
    },
    {
        icon: Clock,
        title: "Response Time",
        description: "Expected response time for premium inquiries.",
        detail: "Under 2 hours",
        action: undefined
    }
];

export default function ContactInfo() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {contactInfo.map((info, index) => {
                const Icon = info.icon;
                const isClickable = !!info.action;

                const CardContent = (
                    <div
                        className={`h-full flex flex-col items-start p-6 rounded-2xl border border-white/5 backdrop-blur-md bg-white/5 shadow-2xl transition-all duration-500 ease-custom 
                            ${isClickable ? 'hover:border-brand-accent/30 hover:bg-white/10 group cursor-pointer' : ''}`}
                    >
                        <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center mb-5 text-brand-accent">
                            <Icon strokeWidth={1.5} size={20} />
                        </div>
                        <h3 className="font-serif text-xl sm:text-2xl text-white mb-2 tracking-wide">{info.title}</h3>
                        <p className="font-inter text-white/60 text-xs sm:text-sm font-light leading-relaxed mb-6 flex-grow">{info.description}</p>
                        <p className={`w-full font-inter text-brand-accent text-sm md:text-base font-medium tracking-wide break-words break-all ${isClickable ? 'group-hover:text-brand-light transition-colors duration-300' : ''}`} title={info.detail}>
                            {info.detail}
                        </p>
                    </div>
                );

                if (isClickable) {
                    return (
                        <a href={info.action} key={index} className="block h-full outline-none focus-visible:ring-1 focus-visible:ring-brand-accent rounded-2xl">
                            {CardContent}
                        </a>
                    );
                }

                return <div key={index} className="h-full">{CardContent}</div>;
            })}
        </div>
    );
}
