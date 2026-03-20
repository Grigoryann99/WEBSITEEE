'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
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
        <section id="villas" className="relative py-32 bg-gradient-to-b from-[#050505] to-black text-white overflow-hidden">
            {/* Subtle background particles / lighting could go here */}
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
                    className="max-w-2xl mx-auto text-white/50 font-sans text-lg font-light leading-relaxed"
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
                            className="group relative flex flex-col rounded-[2rem] overflow-hidden bg-[#111] shadow-2xl transition-all duration-700 hover:-translate-y-3 cursor-pointer"
                        >
                            {/* Card Image Container */}
                            <div className="relative w-full aspect-[4/5] overflow-hidden">
                                <Image
                                    src={villa.image}
                                    alt={villa.name}
                                    fill
                                    className="object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:brightness-110"
                                    sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                                />

                                {/* Inner Gradient for Text Readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                                {/* Floating Metadata Badges (Top) */}
                                <div className="absolute top-6 left-6 right-6 flex justify-between items-start opacity-0 -translate-y-4 transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:translate-y-0">
                                    <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-sans tracking-widest uppercase border border-white/10">
                                        <MapPin className="w-3 h-3 text-brand-accent" />
                                        {villa.location}
                                    </span>
                                    <span className="flex items-center gap-1.5 bg-brand-accent/90 text-black px-3 py-1.5 rounded-full text-[11px] font-sans tracking-widest font-semibold uppercase">
                                        {villa.price.split(' ')[0]} {/* Takes just "From" or "Inquire" */}
                                    </span>
                                </div>

                                {/* Content Overlay (Bottom) */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end h-full">

                                    {/* Villa Title & Price */}
                                    <div className="mb-4 transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0 relative z-10">
                                        <h3 className="font-serif text-3xl md:text-4xl mb-2 text-white/90 group-hover:text-white transition-colors duration-300">
                                            {villa.name}
                                        </h3>
                                        <p className="text-brand-accent font-sans text-sm tracking-wide font-medium">
                                            {villa.price}
                                        </p>
                                    </div>

                                    {/* Micro-Interaction Details (Fades in on hover) */}
                                    <div className="overflow-hidden relative z-10 h-0 group-hover:h-auto transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:mt-4">
                                        <p className="text-white/60 font-sans text-sm leading-relaxed mb-6 font-light">
                                            {villa.description}
                                        </p>

                                        {/* Amenity Icons */}
                                        <div className="flex items-center gap-4 text-white/70 text-xs font-sans">
                                            <div className="flex items-center gap-1.5">
                                                <BedDouble className="w-4 h-4" />
                                                <span>{villa.bedrooms} Beds</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Users className="w-4 h-4" />
                                                <span>{villa.guests} Guests</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Waves className="w-4 h-4" />
                                                <span className="truncate max-w-[100px]">{villa.amenity}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Interactive Arrow Button */}
                                    <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-black/20 backdrop-blur-sm transition-all duration-500 group-hover:bg-brand-accent group-hover:border-brand-accent group-hover:text-black">
                                        <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:-rotate-45" />
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
                    <p className="font-sans text-brand-light/60 mb-6 tracking-wide font-light">
                        Explore our complete collection of 9 private residences worldwide.
                    </p>
                    <button className="group relative inline-flex items-center gap-4 px-8 py-4 bg-transparent border border-white/20 rounded-full font-sans tracking-widest uppercase text-sm hover:border-brand-accent hover:text-brand-accent transition-colors duration-500">
                        <span>View All Residences</span>
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-40"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
                        </span>
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default VillaGallery;
