'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useEffect } from 'react';

interface SupportToastProps {
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
    onClose: () => void;
}

export default function SupportToast({ message, type, isVisible, onClose }: SupportToastProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(onClose, 4000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className="fixed bottom-8 right-8 z-[100] flex items-center gap-4 p-5 rounded-2xl backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] min-w-[320px]"
                    style={{
                        background: type === 'success' 
                            ? 'rgba(34, 197, 94, 0.15)' 
                            : 'rgba(239, 68, 68, 0.15)'
                    }}
                >
                    <div className={`p-2 rounded-xl scale-110 ${type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                    </div>
                    
                    <div className="flex-1">
                        <p className="text-white font-inter font-medium text-sm leading-tight">
                            {message}
                        </p>
                    </div>

                    <button 
                        onClick={onClose}
                        className="p-1 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white"
                    >
                        <X size={18} />
                    </button>

                    {/* Progress Bar */}
                    <motion.div 
                        initial={{ scaleX: 1 }}
                        animate={{ scaleX: 0 }}
                        transition={{ duration: 4, ease: "linear" }}
                        className={`absolute bottom-0 left-0 h-1 rounded-full origin-left ${type === 'success' ? 'bg-green-500/50' : 'bg-red-500/50'}`}
                        style={{ width: '100%' }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
