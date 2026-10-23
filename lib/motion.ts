'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion, type Transition, type Variants } from 'framer-motion';

export const easeOut = [0.22, 1, 0.36, 1] as const;

export type MotionLevel = 'full' | 'reduced' | 'none';

/**
 * Adapts animation intensity to the user's OS preference and the device.
 * - `none`: user asked for reduced motion
 * - `reduced`: low-power device (few cores / save-data / small memory)
 * - `full`: everything else
 */
export function useMotionLevel(): MotionLevel {
    const prefersReduced = useReducedMotion();
    const [lowPower, setLowPower] = useState(false);

    useEffect(() => {
        const nav = navigator as Navigator & {
            deviceMemory?: number;
            connection?: { saveData?: boolean };
        };
        const cores = nav.hardwareConcurrency ?? 8;
        const memory = nav.deviceMemory ?? 8;
        setLowPower(cores <= 4 || memory <= 4 || Boolean(nav.connection?.saveData));
    }, []);

    if (prefersReduced) return 'none';
    return lowPower ? 'reduced' : 'full';
}

export function springFor(level: MotionLevel): Transition {
    if (level === 'none') return { duration: 0 };
    if (level === 'reduced') return { duration: 0.22, ease: easeOut };
    return { type: 'spring', stiffness: 320, damping: 32, mass: 0.9 };
}

export function fadeUp(level: MotionLevel, delay = 0): Variants {
    const y = level === 'full' ? 18 : level === 'reduced' ? 8 : 0;
    return {
        hidden: { opacity: level === 'none' ? 1 : 0, y },
        show: { opacity: 1, y: 0, transition: { duration: level === 'none' ? 0 : 0.55, ease: easeOut, delay } },
    };
}
