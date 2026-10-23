'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { useDisplayPreferences } from '@/components/preferences/DisplayPreferences';

export default function SmoothScroll({ children }: { children: ReactNode }) {
    const { reducedMotion } = useDisplayPreferences();
    useEffect(() => {
        if (reducedMotion) return;
        const lenis = new Lenis({
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical', gestureOrientation: 'vertical', smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 2,
        });
        let frame: number;
        const animate = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(animate); };
        frame = requestAnimationFrame(animate);
        return () => { cancelAnimationFrame(frame); lenis.destroy(); };
    }, [reducedMotion]);

    return <div>{children}</div>;
}
