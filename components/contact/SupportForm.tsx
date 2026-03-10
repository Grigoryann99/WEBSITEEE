'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Loader2, CheckCircle2, Send } from 'lucide-react';

const formSchema = z.object({
    fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    subject: z.string().min(1, { message: "Please select a topic." }),
    message: z.string().min(10, { message: "Please write at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SupportForm() {
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
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Support Request submitted:", data);
        setIsSubmitting(false);
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
    };

    return (
        <section id="support-form" className="py-24 px-4 bg-brand-dark">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
                <div className="lg:w-1/3 flex flex-col justify-center">
                    <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Send a Request</h2>
                    <p className="font-inter text-white/50 mb-8 font-light leading-relaxed">
                        Can&apos;t find what you need? Fill out the form and our support specialists will get back to you with detailed information.
                    </p>
                    
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-white/70">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                <Send size={18} className="text-brand-accent" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-white/30 font-inter">Direct Email</p>
                                <p className="text-sm font-medium">support@veloratravel.org</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:w-2/3 relative">
                    <AnimatePresence>
                        {isSuccess && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="absolute inset-0 flex items-center justify-center z-20"
                            >
                                <div className="backdrop-blur-xl bg-green-500/10 border border-green-500/20 text-green-400 p-12 rounded-[2.5rem] flex flex-col items-center gap-4 text-center">
                                    <CheckCircle2 size={48} className="mb-2" />
                                    <h3 className="text-2xl font-serif text-white">Request Received</h3>
                                    <p className="font-inter text-sm max-w-xs text-white/70">Thank you for contacting us. Our specialists will review your request and reach out via email.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form 
                        onSubmit={handleSubmit(onSubmit)} 
                        className={`space-y-8 backdrop-blur-md bg-white/[0.02] p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl transition-all duration-500 ${isSuccess ? 'opacity-20 blur-sm pointer-events-none' : ''}`}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="block font-inter text-xs tracking-widest uppercase text-white/40 pl-2">Full Name</label>
                                <input
                                    {...register("fullName")}
                                    className="bg-transparent border-b border-white/10 px-2 py-4 w-full text-white font-inter focus:outline-none focus:border-brand-accent transition-all"
                                    placeholder="Enter your name"
                                />
                                {errors.fullName && <p className="text-red-400 text-[10px] mt-1 pl-2 font-inter">{errors.fullName.message}</p>}
                            </div>

                            <div className="space-y-3">
                                <label className="block font-inter text-xs tracking-widest uppercase text-white/40 pl-2">Email Address</label>
                                <input
                                    {...register("email")}
                                    className="bg-transparent border-b border-white/10 px-2 py-4 w-full text-white font-inter focus:outline-none focus:border-brand-accent transition-all"
                                    placeholder="your@email.com"
                                />
                                {errors.email && <p className="text-red-400 text-[10px] mt-1 pl-2 font-inter">{errors.email.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="block font-inter text-xs tracking-widest uppercase text-white/40 pl-2">Support Topic</label>
                            <select
                                {...register("subject")}
                                className="bg-transparent border-b border-white/10 px-2 py-4 w-full text-white font-inter focus:outline-none focus:border-brand-accent transition-all appearance-none cursor-pointer"
                            >
                                <option value="" className="bg-[#0f0f0f]">Select a topic</option>
                                <option value="navigation" className="bg-[#0f0f0f]">Website Navigation</option>
                                <option value="info" className="bg-[#0f0f0f]">Travel Information</option>
                                <option value="tech" className="bg-[#0f0f0f]">Technical Issues</option>
                                <option value="feedback" className="bg-[#0f0f0f]">Content Feedback</option>
                                <option value="partnership" className="bg-[#0f0f0f]">Partnership</option>
                                <option value="other" className="bg-[#0f0f0f]">Other</option>
                            </select>
                            {errors.subject && <p className="text-red-400 text-[10px] mt-1 pl-2 font-inter">{errors.subject.message}</p>}
                        </div>

                        <div className="space-y-3">
                            <label className="block font-inter text-xs tracking-widest uppercase text-white/40 pl-2">Message</label>
                            <textarea
                                {...register("message")}
                                rows={4}
                                className="bg-transparent border-b border-white/10 px-2 py-4 w-full text-white font-inter focus:outline-none focus:border-brand-accent transition-all resize-none"
                                placeholder="How can we help you today?"
                            />
                            {errors.message && <p className="text-red-400 text-[10px] mt-1 pl-2 font-inter">{errors.message.message}</p>}
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-brand-light text-brand-dark py-5 rounded-xl font-inter font-semibold tracking-wider text-sm hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        <span>Send Support Request</span>
                                        <Send size={18} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
