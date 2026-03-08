'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';

export default function SmoothScroll({ children }: { children: ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        let animationFrameId: number;

        function raf(time: number) {
            lenis.raf(time);
            animationFrameId = requestAnimationFrame(raf);
        }

        animationFrameId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(animationFrameId);
            lenis.destroy();
        };
    }, []);

    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityBlur = useTransform(smoothVelocity, [-2500, 0, 2500], [0.8, 0, 0.8]);
    const filter = useTransform(velocityBlur, (blur) => `blur(${blur}px)`);

    return (
        <motion.div style={{ filter }}>
            {children}
        </motion.div>
    );
}
