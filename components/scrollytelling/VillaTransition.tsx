'use client';

import { motion, useReducedMotion } from 'framer-motion';

const settings = ['Over the ocean.', 'Among the trees.', 'Above the clouds.'];

export default function VillaTransition() {
    const reduceMotion = useReducedMotion();

    return (
        <div className="mx-auto mb-9 max-w-4xl text-center md:mb-12">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#786a5e]">The stay is part of the story</p>
            <motion.h2
                id="stay-title"
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: reduceMotion ? 0 : 0.55 }}
                className="font-montserrat text-[clamp(1.9rem,4.2vw,4rem)] font-bold uppercase leading-[1.1] tracking-[-0.045em] text-[#191919]"
            >
                Where would you<br className="hidden sm:block" /> rather wake up<span className="text-[#bc6448]">?</span>
            </motion.h2>
            <div className="mt-7 flex flex-col items-center justify-center gap-2 sm:flex-row sm:flex-wrap sm:gap-x-7 sm:gap-y-3">
                {settings.map((setting, index) => (
                    <motion.p
                        key={setting}
                        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.18 }}
                        className="flex items-center gap-2 font-serif text-xl italic leading-relaxed text-[#686058] sm:text-2xl"
                    >
                        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#bc6448]" />{setting}
                    </motion.p>
                ))}
            </div>
            <p className="mt-5 text-xs leading-relaxed text-[#727272] sm:text-sm">Choose your setting. Find a stay worth exploring.</p>
        </div>
    );
}
