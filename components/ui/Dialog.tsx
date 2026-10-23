'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './Dialog.module.css';

const openPanels: HTMLDivElement[] = [];
let previousOverflow = '';

export default function Dialog({ title, children, onClose, wide = false }: { title: string; children: React.ReactNode; onClose: () => void; wide?: boolean }) {
    const panel = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();
    const [viewport, setViewport] = useState<{ top: number; height: number } | null>(null);
    const close = useRef(onClose);
    close.current = onClose;
    useEffect(() => {
        const visual = window.visualViewport;
        if (!visual) return;
        const sync = () => setViewport({ top: visual.offsetTop, height: visual.height });
        sync();
        visual.addEventListener('resize', sync);
        visual.addEventListener('scroll', sync);
        return () => { visual.removeEventListener('resize', sync); visual.removeEventListener('scroll', sync); };
    }, []);
    useEffect(() => {
        const previous = document.activeElement as HTMLElement | null;
        const element = panel.current;
        if (!element) return;
        if (!openPanels.length) previousOverflow = document.body.style.overflow;
        const underneath = openPanels.at(-1);
        if (underneath) { underneath.inert = true; underneath.setAttribute('aria-hidden', 'true'); }
        openPanels.push(element);
        document.body.style.overflow = 'hidden';
        const initial = element.querySelector<HTMLElement>('[data-dialog-autofocus], input[autofocus], textarea[autofocus]');
        // On touch screens, let the visitor open the keyboard deliberately.
        const desktopInput = window.matchMedia('(min-width: 640px) and (pointer: fine)').matches;
        (desktopInput && initial ? initial : element).focus({ preventScroll: true });
        const handleKey = (event: KeyboardEvent) => {
            if (openPanels.at(-1) !== element) return;
            if (event.key === 'Escape') { event.preventDefault(); close.current(); }
            if (event.key !== 'Tab') return;
            const focusable = Array.from(panel.current?.querySelectorAll<HTMLElement>('button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex="0"]') || []);
            const first = focusable[0], last = focusable[focusable.length - 1];
            if (event.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) { event.preventDefault(); last?.focus(); }
            else if (!event.shiftKey && (document.activeElement === last || document.activeElement === panel.current)) { event.preventDefault(); first?.focus(); }
        };
        document.addEventListener('keydown', handleKey);
        return () => {
            const wasTop = openPanels.at(-1) === element;
            const index = openPanels.indexOf(element);
            if (index >= 0) openPanels.splice(index, 1);
            const top = openPanels.at(-1);
            if (top) { top.inert = false; top.removeAttribute('aria-hidden'); }
            else document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', handleKey);
            if (wasTop && previous?.isConnected) previous.focus({ preventScroll: true });
        };
    }, []);
    if (typeof document === 'undefined') return null;
    return createPortal(<div data-lenis-prevent className={styles.overlay} style={viewport ? { top: viewport.top, bottom: 'auto', height: viewport.height } : undefined} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
        <motion.div ref={panel} tabIndex={-1} role="dialog" aria-modal="true" aria-label={title} initial={{ opacity: 0, y: reduced ? 0 : 24 }} animate={{ opacity: 1, y: 0 }} className={`${styles.panel} flex w-full min-w-0 flex-col overflow-hidden rounded-[30px] bg-cream p-4 text-ink shadow-lift outline-none sm:p-8 ${wide ? 'max-w-4xl' : 'max-w-xl'}`}>
            <div className="mb-4 flex shrink-0 items-start justify-between gap-4 sm:mb-6"><h2 className="min-w-0 font-serif text-2xl">{title}</h2><button onClick={onClose} type="button" className="concierge-icon-button shrink-0" aria-label="Close dialog"><X size={20} /></button></div>
            <div className={`${styles.content} min-h-0 overflow-y-auto overscroll-contain`}>{children}</div>
        </motion.div>
    </div>, document.body);
}
