'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const bookingSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    package: z.string().min(1, { message: 'Please select a package.' }),
    dietary: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BookingFormValues>({
        resolver: zodResolver(bookingSchema),
    });

    const onSubmit = async (data: BookingFormValues) => {
        setIsSubmitting(true);
        // Simulate high-end booking process
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log('Form data:', data);
        setSuccess(true);
        setIsSubmitting(false);
    };

    return (
        <section className="bg-brand-light py-32 px-6">
            <div className="max-w-3xl mx-auto bg-brand-dark p-12 md:p-16 shadow-2xl relative overflow-hidden rounded-[2rem]">
                {/* Subtle decorative border */}
                <div className="absolute inset-2 border border-brand-light/10 pointer-events-none rounded-[1.8rem]" />

                <div className="text-center mb-12">
                    <h2 className="font-serif text-4xl md:text-5xl text-brand-light tracking-luxury mb-4">Reserve Your Escape</h2>
                    <p className="font-sans text-brand-light/60 text-sm tracking-widest uppercase">Begin your journey today</p>
                </div>

                {success ? (
                    <div className="text-center text-brand-light border border-brand-accent p-12 rounded-2xl">
                        <h3 className="font-serif text-3xl mb-4 text-brand-accent">Inquiry Received</h3>
                        <p className="font-sans font-light">Your private concierge will contact you shortly to finalize your itinerary.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-brand-light/60">Full Name</label>
                                <input
                                    {...register('name')}
                                    className="w-full bg-transparent border-b border-brand-light/30 pb-3 text-brand-light focus:outline-none focus:border-brand-accent transition-colors transition-duration-300 font-sans font-light"
                                    placeholder="John Doe"
                                />
                                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-brand-light/60">Email Address</label>
                                <input
                                    {...register('email')}
                                    className="w-full bg-transparent border-b border-brand-light/30 pb-3 text-brand-light focus:outline-none focus:border-brand-accent transition-colors transition-duration-300 font-sans font-light"
                                    placeholder="john@example.com"
                                />
                                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-brand-light/60">Select Package</label>
                            <select
                                {...register('package')}
                                className="w-full bg-brand-dark border-b border-brand-light/30 pb-3 text-brand-light focus:outline-none focus:border-brand-accent transition-colors transition-duration-300 font-sans font-light appearance-none"
                            >
                                <option value="">Choose an escape...</option>
                                <option value="maldivian">The Maldivian Sanctum</option>
                                <option value="alpine">Alpine Serenity</option>
                                <option value="aegean">Aegean Odyssey</option>
                                <option value="safari">Safari Elegance</option>
                                <option value="kyoto">Kyoto Harmony (For Two)</option>
                            </select>
                            {errors.package && <p className="text-red-400 text-xs mt-1">{errors.package.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-brand-light/60">Special Requirements (Dietary, Preferences)</label>
                            <textarea
                                {...register('dietary')}
                                rows={3}
                                className="w-full bg-transparent border-b border-brand-light/30 pb-3 text-brand-light focus:outline-none focus:border-brand-accent transition-colors transition-duration-300 font-sans font-light resize-none mt-2"
                                placeholder="Any special requests..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full mt-10 py-5 bg-brand-light text-brand-dark rounded-xl uppercase tracking-widest text-sm font-semibold hover:bg-brand-accent hover:text-brand-light transition-all duration-300 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Processing...' : 'Confirm Inquiry'}
                        </button>


                    </form>
                )}
            </div>
        </section>
    );
}
