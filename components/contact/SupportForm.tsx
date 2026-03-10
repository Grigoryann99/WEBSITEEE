'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Loader2, CheckCircle2, Send, AlertTriangle, XCircle, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';
import SupportToast from './SupportToast';

const formSchema = z.object({
    fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    subject: z.string().min(1, { message: "Please select a topic." }),
    message: z.string()
        .min(10, { message: "Please write at least 10 characters." })
        .max(1000, { message: "Message is too long (max 1000 characters)." }),
    honeypot: z.string().max(0).optional(), // Hidden field to catch bots
});

type FormValues = z.infer<typeof formSchema>;

export default function SupportForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; visible: boolean }>({
        message: '',
        type: 'success',
        visible: false
    });
    const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
    const [cooldown, setCooldown] = useState(0);
    
    const formRef = useRef<HTMLFormElement>(null);

    const EMAILJS_CONFIG = {
        SERVICE_ID: 'service_zx6950j',
        TEMPLATE_ID: 'template_17dlobp',
        PUBLIC_KEY: 'QASK8vrBzKA4SVLCN'
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    // Cooldown timer logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (cooldown > 0) {
            interval = setInterval(() => {
                setCooldown(prev => Math.max(0, prev - 1));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [cooldown]);

    const onSubmit = async (data: FormValues) => {
        // Spam protection: Honeypot check
        if (data.honeypot) {
            console.warn("Bot detected via honeypot.");
            return;
        }

        // Spam protection: Rate limiting
        const now = Date.now();
        if (now - lastSubmitTime < 30000) {
            const remaining = Math.ceil((30000 - (now - lastSubmitTime)) / 1000);
            setCooldown(remaining);
            setToast({
                message: `Please wait ${remaining}s before sending another request.`,
                type: 'error',
                visible: true
            });
            return;
        }

        setIsSubmitting(true);
        
        try {
            await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                {
                    from_name: data.fullName,
                    from_email: data.email,
                    subject: data.subject,
                    message: data.message,
                    reply_to: data.email,
                },
                EMAILJS_CONFIG.PUBLIC_KEY
            );

            setShowModal(true);
            reset();
            setLastSubmitTime(Date.now());
            setCooldown(30);
        } catch (error) {
            console.error("EmailJS Error:", error);
            setToast({
                message: "❌ Failed to send message. Please try again.",
                type: 'error',
                visible: true
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="support-form" className="py-24 px-4 bg-brand-dark overflow-hidden relative">
            <SupportToast 
                isVisible={toast.visible} 
                message={toast.message} 
                type={toast.type} 
                onClose={() => setToast(prev => ({ ...prev, visible: false }))} 
            />

            {/* Success Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl bg-black/40"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-[#121212] border border-white/10 p-8 md:p-12 rounded-[2.5rem] max-w-md w-full shadow-[0_30px_60px_rgba(0,0,0,0.5)] text-center relative overflow-hidden"
                        >
                            {/* Decorative Background Blob */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-brand-accent/20 blur-[100px] -z-10" />

                            <div className="flex justify-center mb-8">
                                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                                    <Check className="text-green-400" size={40} />
                                </div>
                            </div>

                            <h3 className="font-serif text-3xl text-white mb-4">Message Sent Successfully</h3>
                            <p className="font-inter text-white/50 text-base leading-relaxed mb-10">
                                Your message has been sent successfully. Our support team will respond to you shortly via the email address provided.
                            </p>

                            <button 
                                onClick={() => setShowModal(false)}
                                className="w-full bg-white text-black py-4 rounded-2xl font-inter font-semibold tracking-wide hover:bg-white/90 transition-all duration-300 active:scale-95 shadow-lg"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                                <p className="text-sm font-medium">veloratravel.support@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:w-2/3 relative">
                    <form 
                        ref={formRef}
                        onSubmit={handleSubmit(onSubmit)} 
                        className="space-y-8 backdrop-blur-md bg-white/[0.02] p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl transition-all duration-500 overflow-hidden"
                    >
                        {/* Honeypot Field (Hidden from users) */}
                        <div className="hidden" aria-hidden="true">
                            <input {...register("honeypot")} tabIndex={-1} autoComplete="off" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="block font-inter text-xs tracking-widest uppercase text-white/40 pl-2">Full Name</label>
                                <input
                                    {...register("fullName")}
                                    className="bg-transparent border-b border-white/10 px-2 py-4 w-full text-white font-inter focus:outline-none focus:border-brand-accent transition-all"
                                    placeholder="Enter your name"
                                    disabled={isSubmitting}
                                />
                                {errors.fullName && <p className="text-red-400 text-[10px] mt-1 pl-2 font-inter">{errors.fullName.message}</p>}
                            </div>

                            <div className="space-y-3">
                                <label className="block font-inter text-xs tracking-widest uppercase text-white/40 pl-2">Email Address</label>
                                <input
                                    {...register("email")}
                                    className="bg-transparent border-b border-white/10 px-2 py-4 w-full text-white font-inter focus:outline-none focus:border-brand-accent transition-all"
                                    placeholder="your@email.com"
                                    disabled={isSubmitting}
                                />
                                {errors.email && <p className="text-red-400 text-[10px] mt-1 pl-2 font-inter">{errors.email.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="block font-inter text-xs tracking-widest uppercase text-white/40 pl-2">Support Topic</label>
                            <select
                                {...register("subject")}
                                className="bg-transparent border-b border-white/10 px-2 py-4 w-full text-white font-inter focus:outline-none focus:border-brand-accent transition-all appearance-none cursor-pointer"
                                disabled={isSubmitting}
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
                            <div className="flex justify-between items-center">
                                <label className="block font-inter text-xs tracking-widest uppercase text-white/40 pl-2">Message</label>
                                <span className={`text-[10px] font-inter uppercase tracking-widest ${errors.message ? 'text-red-400' : 'text-white/20'}`}>
                                    Max 1000 characters
                                </span>
                            </div>
                            <textarea
                                {...register("message")}
                                rows={4}
                                className="bg-transparent border-b border-white/10 px-2 py-4 w-full text-white font-inter focus:outline-none focus:border-brand-accent transition-all resize-none"
                                placeholder="How can we help you today?"
                                disabled={isSubmitting}
                            />
                            {errors.message && <p className="text-red-400 text-[10px] mt-1 pl-2 font-inter">{errors.message.message}</p>}
                        </div>

                        <div className="pt-4 flex flex-col gap-4">
                            <button
                                type="submit"
                                disabled={isSubmitting || cooldown > 0}
                                className="relative w-full bg-brand-light text-brand-dark py-5 rounded-xl font-inter font-semibold tracking-wider text-sm hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                                
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>{cooldown > 0 ? `Please wait ${cooldown}s` : 'Send Support Request'}</span>
                                        <Send size={18} />
                                    </>
                                )}
                            </button>

                            {cooldown > 0 && (
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-amber-400/60 text-[10px] font-inter text-center uppercase tracking-widest flex items-center justify-center gap-2"
                                >
                                    <AlertTriangle size={12} />
                                    Rate limit active to prevent spam
                                </motion.p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
