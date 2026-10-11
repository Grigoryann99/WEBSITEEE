'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { MotionConfig } from 'framer-motion';

export default function SmoothScroll({ children }: { children: ReactNode }) {
    useEffect(() => {
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
        let stop = () => {};
        const update = () => {
            stop();
            stop = () => {};
            if (preference.matches) return;
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

            stop = () => {
                cancelAnimationFrame(animationFrameId);
                lenis.destroy();
            };
        };
        update();
        preference.addEventListener('change', update);
        return () => {
            preference.removeEventListener('change', update);
            stop();
        };
    }, []);

    return <MotionConfig reducedMotion="user"><div>{children}</div></MotionConfig>;
}
