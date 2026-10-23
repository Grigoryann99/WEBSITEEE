'use client';
import { useEffect, useRef, useState } from 'react';
import { useDisplayPreferences } from '@/components/preferences/DisplayPreferences';
import type { Map as LeafletMap, Marker, Polyline } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Place } from '@/lib/places/types';

export default function CityMap({ places, selectedId, onSelect, numbered = false, connectStops = false, emptyMessage = 'No places match these filters.' }: { places: Place[]; selectedId: string | null; onSelect: (id: string) => void; numbered?: boolean; connectStops?: boolean; emptyMessage?: string }) {
    const container = useRef<HTMLDivElement>(null), map = useRef<LeafletMap | null>(null), markers = useRef<Marker[]>([]);
    const orderLine = useRef<Polyline | null>(null);
    const [ready, setReady] = useState(false), [failed, setFailed] = useState(false);
    const [visible, setVisible] = useState(false);
    const handler = useRef(onSelect); handler.current = onSelect;
    const selection = useRef(selectedId); selection.current = selectedId;
    const currentPlaces = useRef(places); currentPlaces.current = places;
    const plannerMode = useRef(connectStops); plannerMode.current = connectStops;
    const { reducedMotion: reduced } = useDisplayPreferences();
    useEffect(() => {
        const element = container.current;
        if (!element) return;
        const observer = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting && entry.boundingClientRect.width > 0 && entry.boundingClientRect.height > 0)) { setVisible(true); observer.disconnect(); }
        }, { rootMargin: '100px' });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);
    useEffect(() => {
        if (!visible) return;
        let cancelled = false; let observer: ResizeObserver | undefined;
        import('leaflet').then(L => {
            if (cancelled || !container.current) return;
            const instance = L.map(container.current, { scrollWheelZoom: false, attributionControl: false, zoomControl: false }).setView([41.9006, 12.48], 13);
            map.current = instance;
            L.control.zoom({ position: 'topright' }).addTo(instance);
            L.control.attribution({ prefix: false }).addTo(instance);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors', maxZoom: 19, keepBuffer: 1 }).addTo(instance);
            const position = () => {
                const center = instance.getCenter();
                if (container.current) container.current.dataset.mapCenter = `${center.lat.toFixed(4)},${center.lng.toFixed(4)}`;
            };
            instance.on('move', position);
            instance.on('movestart', () => { if (container.current) container.current.dataset.moving = 'true'; });
            instance.on('moveend', () => { if (container.current) container.current.dataset.moving = 'false'; });
            position();
            observer = new ResizeObserver(() => {
                instance.invalidateSize({ pan: true, animate: false });
                if (plannerMode.current && !selection.current && currentPlaces.current.length && container.current?.clientWidth) {
                    instance.fitBounds(currentPlaces.current.map(place => place.coords), { paddingTopLeft: [42, 64], paddingBottomRight: [42, 240], maxZoom: 14, animate: false });
                }
            }); observer.observe(container.current);
            setReady(true);
        }).catch(() => { if (!cancelled) setFailed(true); });
        return () => { cancelled = true; observer?.disconnect(); map.current?.remove(); map.current = null; markers.current = []; orderLine.current = null; };
    }, [visible]);
    useEffect(() => {
        if (!ready || !map.current) return;
        let cancelled = false;
        import('leaflet').then(L => {
            const instance = map.current; if (cancelled || !instance) return;
            orderLine.current?.remove(); orderLine.current = null;
            if (connectStops && places.length > 1) orderLine.current = L.polyline(places.map(place => place.coords), { color: '#3477B4', weight: 3, opacity: 0.9, dashArray: '5 9', lineCap: 'round', interactive: false }).addTo(instance);
            markers.current.forEach(marker => marker.remove());
            markers.current = places.map((place, i) => L.marker(place.coords, {
                icon: L.divIcon({ className: 'city-marker-wrap', html: `<span class="city-map-pin">${numbered ? i + 1 : '•'}</span>`, iconSize: [30, 30], iconAnchor: [15, 15] }), title: place.name, alt: place.name,
            }).addTo(instance).bindTooltip(Object.assign(document.createElement('span'), { textContent: place.name }), { direction: 'top', offset: [0, -14] }).on('click', () => handler.current(place.id)));
            const selected = places.find(place => place.id === selection.current);
            if (selected) {
                instance.flyTo(selected.coords, 16, { animate: !reduced, duration: 1.4 });
                const active = markers.current.find(marker => marker.options.title === selected.name);
                active?.getElement()?.classList.add('city-map-pin-selected');
                active?.setZIndexOffset(1000); active?.openTooltip();
            } else if (places.length) instance.fitBounds(places.map(place => place.coords), { paddingTopLeft: [42, connectStops ? 64 : 42], paddingBottomRight: [42, connectStops ? 240 : 42], maxZoom: 14, animate: !reduced, duration: 0.8 });
            else if (connectStops) instance.setView([41.9006, 12.48], 13, { animate: !reduced });
        });
        return () => { cancelled = true; };
    }, [places, ready, numbered, reduced, connectStops]);
    useEffect(() => {
        if (!ready || !map.current) return;
        if (!selectedId) {
            if (connectStops) {
                markers.current.forEach(marker => { marker.getElement()?.classList.remove('city-map-pin-selected'); marker.setZIndexOffset(0); marker.closeTooltip(); });
                if (places.length) map.current.fitBounds(places.map(place => place.coords), { paddingTopLeft: [42, connectStops ? 64 : 42], paddingBottomRight: [42, connectStops ? 240 : 42], maxZoom: 14, animate: !reduced, duration: 0.8 });
            }
            return;
        }
        const place = places.find(place => place.id === selectedId); if (!place) return;
        map.current.stop();
        map.current.flyTo(place.coords, 16, { animate: !reduced, duration: 1.4 });
        markers.current.forEach(marker => {
            const selected = marker.options.title === place.name;
            marker.getElement()?.classList.toggle('city-map-pin-selected', selected);
            marker.setZIndexOffset(selected ? 1000 : 0);
            if (selected) marker.openTooltip(); else marker.closeTooltip();
        });
    }, [selectedId, places, ready, reduced, connectStops]);
    return <div className={`city-map ${connectStops ? 'planner-map' : ''} relative isolate h-full min-h-[360px] overflow-hidden rounded-[30px] border border-sky-200 bg-sky-100`}>
        <div ref={container} role="region" aria-label="Interactive Rome map" className="h-full min-h-[360px] w-full" />
        {!ready && <p role="status" className="absolute inset-x-5 top-1/2 text-center text-sm text-ink-500">{failed ? 'Map unavailable. Location links remain available in each place.' : 'Finding your bearings…'}</p>}
        {ready && !places.length && <p className={`pointer-events-none absolute z-[500] rounded-pill bg-white px-4 py-2 ${connectStops ? 'left-4 right-4 top-20 text-center text-xs' : 'bottom-8 left-4 text-sm'}`}>{emptyMessage}</p>}
    </div>;
}
