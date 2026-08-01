'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { villasData } from '../../data/villasData';
import { MapPin, Users, BedDouble, Waves, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function VillasPage() {
    return (
        <main className="min-h-screen bg-[#F9F9F9]">
            {/* HERO SECTION */}
            <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop"
                        alt="Luxury Villa Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
                
                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="block text-[#1D9E75] font-sans text-xs tracking-[0.3em] uppercase mb-6 font-semibold"
                    >
                        Exclusive Collection
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="font-serif text-5xl md:text-7xl text-white mb-6 drop-shadow-lg"
                    >
                        60 Private Residences
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-sans text-white/90 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md"
                    >
                        Discover our handpicked selection of the world's most luxurious and secluded villas across 51 iconic destinations.
                    </motion.p>
                </div>
            </section>

            {/* VILLAS GRID */}
            <section className="py-24 px-6 max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {villasData.map((villa, idx) => (
                        <motion.div 
                            key={villa.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, delay: (idx % 3) * 0.1 }}
                            className="group flex flex-col h-full bg-white border border-gray-200 hover:border-gray-300 transition-all duration-500 rounded-sm overflow-hidden hover:shadow-xl"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                                <Image
                                    src={villa.image}
                                    alt={villa.name}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                                
                                {/* Location Tag */}
                                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                                    <MapPin className="w-3 h-3 text-white" />
                                    <span className="text-[10px] uppercase tracking-widest text-white font-medium">
                                        {villa.location}
                                    </span>
                                </div>
                                
                                {/* Price Tag */}
                                <div className="absolute bottom-4 left-4">
                                    <span className="text-sm font-sans font-medium text-white tracking-wide">
                                        {villa.price}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="font-serif text-2xl text-brand-dark mb-4 group-hover:text-[#1D9E75] transition-colors">
                                    {villa.name}
                                </h3>
                                <p className="font-sans text-brand-dark/60 text-sm leading-relaxed mb-8 flex-grow font-light">
                                    {villa.description}
                                </p>

                                {/* Amenities Line */}
                                <div className="flex items-center gap-6 pt-6 border-t border-gray-100">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-brand-dark/40">
                                            <BedDouble className="w-4 h-4" />
                                            <span className="text-[10px] uppercase tracking-widest font-semibold">{villa.bedrooms} Beds</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-brand-dark/40">
                                            <Users className="w-4 h-4" />
                                            <span className="text-[10px] uppercase tracking-widest font-semibold">{villa.guests} Guests</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1 ml-auto">
                                        <div className="flex items-center gap-2 text-[#1D9E75]/70">
                                            <Waves className="w-4 h-4" />
                                            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#1D9E75]">{villa.amenity}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
            
            {/* CALL TO ACTION */}
            <section className="py-32 bg-brand-dark text-white text-center px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-serif text-4xl md:text-5xl mb-6">Ready for the Ultimate Escape?</h2>
                    <p className="font-sans text-white/60 mb-10 font-light leading-relaxed">
                        Contact our dedicated concierge team to inquire about availability and personalize your luxurious stay at one of our 60 exclusive villas.
                    </p>
                    <Link
                        href="/support"
                        className="inline-flex items-center gap-3 bg-[#1D9E75] text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-bold hover:bg-white hover:text-brand-dark transition-colors"
                    >
                        Inquire Now <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
