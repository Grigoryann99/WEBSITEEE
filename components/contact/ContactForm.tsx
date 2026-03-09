'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

const formSchema = z.object({
    fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().optional(),
    destination: z.string().min(1, { message: "Please tell us your destination of interest." }),
    message: z.string().min(10, { message: "Please write at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);
        // Simulate an API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Form submitted:", data);
        setIsSubmitting(false);
        setIsSuccess(true);
        reset();

        // Hide success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
    };

    return (
        <div className="w-full relative">
            <AnimatePresence>
                {isSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute -top-4 left-0 right-0 transform -translate-y-full mb-6 z-10"
                    >
                        <div className="backdrop-blur-md bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl flex items-center justify-center gap-3">
                            <CheckCircle2 size={20} />
                            <span className="font-inter text-sm tracking-wide">Thank you for your message. We will be in touch shortly.</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 backdrop-blur-md bg-black/20 p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="fullName" className="block font-inter text-xs tracking-widest uppercase text-white/50 pl-2">Full Name</label>
                        <input
                            {...register("fullName")}
                            type="text"
                            id="fullName"
                            className="bg-transparent border-b border-white/20 px-2 py-3 w-full text-white font-inter placeholder:text-white/20 focus:outline-none focus:border-brand-accent focus:bg-white/5 transition-colors rounded-t-sm"
                            placeholder="John Doe"
                        />
                        {errors.fullName && <p className="text-red-400 text-xs mt-1 pl-2 font-inter">{errors.fullName.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block font-inter text-xs tracking-widest uppercase text-white/50 pl-2">Email Address</label>
                        <input
                            {...register("email")}
                            type="email"
                            id="email"
                            className="bg-transparent border-b border-white/20 px-2 py-3 w-full text-white font-inter placeholder:text-white/20 focus:outline-none focus:border-brand-accent focus:bg-white/5 transition-colors rounded-t-sm"
                            placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1 pl-2 font-inter">{errors.email.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="phone" className="block font-inter text-xs tracking-widest uppercase text-white/50 pl-2">Phone (Optional)</label>
                        <input
                            {...register("phone")}
                            type="tel"
                            id="phone"
                            className="bg-transparent border-b border-white/20 px-2 py-3 w-full text-white font-inter placeholder:text-white/20 focus:outline-none focus:border-brand-accent focus:bg-white/5 transition-colors rounded-t-sm"
                            placeholder="+1 (555) 000-0000"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="destination" className="block font-inter text-xs tracking-widest uppercase text-white/50 pl-2">Destination of Interest</label>
                        <input
                            {...register("destination")}
                            type="text"
                            id="destination"
                            className="bg-transparent border-b border-white/20 px-2 py-3 w-full text-white font-inter placeholder:text-white/20 focus:outline-none focus:border-brand-accent focus:bg-white/5 transition-colors rounded-t-sm"
                            placeholder="e.g., Kyoto, Santorini"
                        />
                        {errors.destination && <p className="text-red-400 text-xs mt-1 pl-2 font-inter">{errors.destination.message}</p>}
                    </div>
                </div>

                <div className="space-y-2 pt-2">
                    <label htmlFor="message" className="block font-inter text-xs tracking-widest uppercase text-white/50 pl-2">Message</label>
                    <textarea
                        {...register("message")}
                        id="message"
                        rows={4}
                        className="bg-transparent border-b border-white/20 px-2 py-3 w-full text-white font-inter placeholder:text-white/20 focus:outline-none focus:border-brand-accent focus:bg-white/5 transition-colors resize-none rounded-t-sm"
                        placeholder="Tell us about your dream journey..."
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1 pl-2 font-inter">{errors.message.message}</p>}
                </div>

                <div className="pt-6 flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative overflow-hidden bg-brand-light text-brand-dark px-10 py-4 rounded-full font-inter font-medium tracking-wide text-sm transition-transform duration-300 hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center min-w-[200px]"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {isSubmitting ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : (
                                "Send Message"
                            )}
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-custom" />
                    </button>
                </div>
            </form>
        </div>
    );
}
