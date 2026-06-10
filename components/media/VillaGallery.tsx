'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BedDouble, Users, MapPin, Waves } from 'lucide-react';

const villas = [
    {
        id: 1,
        name: 'The Ocean Villas',
        price: 'From $1,200 / Night',
        description: 'Perched above a turquoise lagoon with private infinity pools and direct reef access below. Each villa includes a dedicated butler, sunset deck, and water sports facility.',
        image: '/villas/1villa.png',
        bedrooms: 2,

        guests: 4,
        amenity: 'Private Pool',
        location: 'Maldives'
    },
    {
        id: 2,
        name: 'The Beach Residence',
        price: 'From $2,500 / Night',
        description: 'Three acres of tropical garden on a private beachfront accommodating up to eight guests in ocean-facing suites. Includes private chef, tennis court, and direct beach access.',
        image: '/villas/2villa.png',
        bedrooms: 4,
        guests: 8,
        amenity: 'Ocean Front',
        location: 'Seychelles'
    },
    {
        id: 3,
        name: 'The Royal Estate',
        price: 'Inquire for Pricing',
        description: 'Five bedrooms, private chef, dedicated yacht, and a 25-meter infinity pool overlooking the lagoon. Available for weekly bookings only — inquire for pricing.',
        image: '/villas/3villa.png',
        bedrooms: 5,
        guests: 10,
        amenity: 'Yacht Access',
        location: 'Bora Bora'
    },
    {
        id: 4,
        name: 'Golden Horizon',
        price: 'From $1,500 / Night',
        description: 'Carved into the volcanic caldera cliff with uninterrupted sunset views from a private infinity pool. Sleeps six, includes dedicated concierge and daily breakfast.',
        image: '/villas/4villa.png',
        bedrooms: 3,
        guests: 6,
        amenity: 'Cliffside Pool',
        location: 'Santorini'
    },
    {
        id: 5,
        name: 'Ivory Oasis',
        price: 'From $1,800 / Night',
        description: '180 meters of private white sand beach with three bedroom suites, a private cinema, and a full spa. Calm shallow waters ideal for families and couples.',
        image: '/villas/5villa.png',
        bedrooms: 3,
        guests: 6,
        amenity: 'White Sand Beach',
        location: 'Turks & Caicos'
    },
    {
        id: 6,
        name: 'Crimson Peak',
        price: 'From $2,200 / Night',
        description: 'At 1,850 meters with panoramic Alpine views and direct ski-in/ski-out access. Private wellness spa and heated outdoor pool available year-round.',
        image: '/villas/6villa.png',
        bedrooms: 4,
        guests: 8,
        amenity: 'Mountain Views',
        location: 'Swiss Alps'
    },
    {
        id: 7,
        name: 'Midnight Cove',
        price: 'From $1,400 / Night',
        description: 'Private dock and kayaks on a bay famous for its natural bioluminescent waters. Swim at night in waters that glow — one of our most unique properties.',
        image: '/villas/7villa.png',
        bedrooms: 2,
        guests: 4,
        amenity: 'Private Dock',
        location: 'Bioluminescent Bay'
    },
    {
        id: 8,
        name: 'Pearl Waters',
        price: 'From $1,100 / Night',
        description: 'Glass floor panels reveal the coral reef below this intimate overwater bungalow for couples. Private plunge pool and romantic dining deck above the water included.',
        image: '/villas/8villa.png',
        bedrooms: 1,
        guests: 2,
        amenity: 'Glass Floors',
        location: 'Fiji'
    },
    {
        id: 9,
        name: 'Obsidian Ridge',
        price: 'From $3,000 / Night',
        description: 'Carved into volcanic rock with a geothermal spa and private aurora viewing deck. Unobstructed Northern Lights views — available year-round.',
        image: '/villas/9villa.png',
        bedrooms: 5,
        guests: 10,
        amenity: 'Volcanic Spa',
        location: 'Iceland'
    },
];

const VillaGallery = () => {
    return (
        <section id="villas" className="relative py-24 md:py-32 bg-[#F9F9F9] text-brand-dark overflow-hidden border-t border-gray-150">
            <div className="absolute inset-0 bg-mesh-luxury opacity-10 pointer-events-none" />

            {/* Section Header */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 text-center relative z-10">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="font-sans text-brand-accent tracking-[0.2em] text-sm uppercase mb-4"
                >
                    Private Sanctuaries
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-wide mb-6"
                >
                    Luxury Villas
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-2xl mx-auto text-brand-dark/60 font-sans text-lg font-light leading-relaxed"
                >
                    Crafted for unforgettable escapes. Experience the pinnacle of luxury in our curated collection of private residences around the globe.
                </motion.p>
            </div>

            {/* Gallery Grid */}
            <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {villas.map((villa, index) => (
                        <motion.div
                            key={villa.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: (index % 3) * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="group relative flex flex-col rounded-[2rem] overflow-hidden bg-white border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:border-brand-accent/30 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                        >
                            {/* Card Image Container */}
                            <div className="relative w-full aspect-[16/11] overflow-hidden">
                                <Image
                                    src={villa.image}
                                    alt={villa.name}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />

                                {/* Floating Metadata Badges (Top) */}
                                <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                                    <span className="flex items-center gap-1.5 bg-white/85 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-sans tracking-widest uppercase border border-black/5 text-brand-dark">
                                        <MapPin className="w-3 h-3 text-brand-accent" />
                                        {villa.location}
                                    </span>
                                    <span className="bg-brand-accent text-white px-3 py-1.5 rounded-full text-[10px] font-sans tracking-widest font-semibold uppercase shadow-sm">
                                        {villa.price.split(' ')[0] === 'Inquire' ? 'Inquire' : villa.price.split(' ')[1] || 'Special'}
                                    </span>
                                </div>
                            </div>

                            {/* Content Box */}
                            <div className="flex flex-col flex-grow p-7 text-left">
                                <div className="mb-4">
                                    <h3 className="font-serif text-2xl md:text-3xl text-brand-dark group-hover:text-brand-accent transition-colors duration-300 leading-snug">
                                        {villa.name}
                                    </h3>
                                    <p className="text-brand-accent font-sans text-xs tracking-widest uppercase font-medium mt-1">
                                        {villa.price}
                                    </p>
                                </div>
                                
                                <p className="text-brand-dark/60 font-sans text-xs md:text-sm leading-relaxed mb-6 font-light flex-grow">
                                    {villa.description}
                                </p>

                                {/* Bottom Row */}
                                <div className="flex items-center justify-between pt-5 border-t border-gray-100 mt-auto">
                                    <div className="flex items-center gap-4 text-brand-dark/50 text-[11px] font-sans">
                                        <div className="flex items-center gap-1">
                                            <BedDouble className="w-3.5 h-3.5 text-brand-accent" />
                                            <span>{villa.bedrooms} Beds</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users className="w-3.5 h-3.5 text-brand-accent" />
                                            <span>{villa.guests} Guests</span>
                                        </div>
                                    </div>
                                    
                                    <div className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50 text-brand-dark group-hover:bg-brand-accent group-hover:border-brand-accent group-hover:text-white transition-all duration-300">
                                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-45" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Optional "View All" underneath grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-20 text-center"
                >
                    <p className="font-sans text-brand-dark/60 mb-6 tracking-wide font-light">
                        Explore our complete collection of 9 private residences worldwide.
                    </p>
                    <Link
                        href="/destinations"
                        className="inline-flex items-center gap-4 text-brand-dark border-b border-brand-dark/30 pb-1 font-sans text-xs tracking-[0.18em] uppercase font-medium hover:border-brand-accent hover:text-brand-accent transition-all duration-300 group"
                    >
                        View All Destinations
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default VillaGallery;
