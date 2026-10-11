'use client';

import { useEffect, useRef, useState } from 'react';
import type { Map as LeafletMap, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { maldivesPlaces } from '@/lib/maldivesPlaces';

export default function MaldivesIslandMap({ selectedPlace, onSelect }: { selectedPlace: number; onSelect: (index: number) => void }) {
    const container = useRef<HTMLDivElement>(null);
    const mapRef = useRef<LeafletMap | null>(null);
    const markers = useRef<Marker[]>([]);
    const selection = useRef(selectedPlace);
    const selectHandler = useRef(onSelect);
    const [ready, setReady] = useState(false);
    const [failed, setFailed] = useState(false);
    const currentPlace = maldivesPlaces[selectedPlace];

    useEffect(() => { selection.current = selectedPlace; selectHandler.current = onSelect; }, [selectedPlace, onSelect]);

    useEffect(() => {
        let cancelled = false;
        let observer: ResizeObserver | undefined;
        import('leaflet').then(L => {
            if (cancelled || !container.current) return;
            const initial = maldivesPlaces[selection.current];
            const map = L.map(container.current, { scrollWheelZoom: false, attributionControl: false, zoomControl: false })
                .setView([initial.latitude, initial.longitude], initial.zoom);
            mapRef.current = map;
            L.control.zoom({ position: 'topright' }).addTo(map);
            L.control.attribution({ prefix: false }).addTo(map);
            L.tileLayer(process.env.NEXT_PUBLIC_MAP_TILE_URL || 'https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
                maxZoom: 19,
                keepBuffer: 1,
            }).addTo(map);
            markers.current = maldivesPlaces.map((place, index) => {
                const icon = L.divIcon({ className: 'island-map-marker', html: '<span class="island-map-dot"></span>', iconSize: [24, 24], iconAnchor: [12, 12] });
                const marker = L.marker([place.latitude, place.longitude], { icon, title: place.name, alt: place.name, keyboard: true })
                    .addTo(map)
                    .bindTooltip(place.name, { permanent: true, direction: 'top', offset: [0, -14], className: 'island-map-label', opacity: 1 })
                    .on('click', () => selectHandler.current(index));
                return marker;
            });
            const updatePosition = () => {
                if (!container.current) return;
                const center = map.getCenter();
                container.current.dataset.mapCenter = `${center.lat.toFixed(4)},${center.lng.toFixed(4)}`;
                container.current.dataset.mapZoom = String(map.getZoom());
            };
            map.on('move', updatePosition);
            map.on('movestart', () => { if (container.current) container.current.dataset.mapMoving = 'true'; });
            map.on('moveend', () => { if (container.current) container.current.dataset.mapMoving = 'false'; });
            updatePosition();
            observer = new ResizeObserver(() => map.invalidateSize({ pan: false }));
            observer.observe(container.current);
            setReady(true);
        }).catch(() => { if (!cancelled) setFailed(true); });
        return () => {
            cancelled = true;
            observer?.disconnect();
            mapRef.current?.remove();
            mapRef.current = null;
            markers.current = [];
        };
    }, []);

    useEffect(() => {
        const map = mapRef.current;
        if (!ready || !map) return;
        markers.current.forEach((marker, index) => {
            marker.getElement()?.classList.toggle('island-map-marker-selected', index === selectedPlace);
            marker.getTooltip()?.getElement()?.classList.toggle('island-map-label-selected', index === selectedPlace);
            marker.setZIndexOffset(index === selectedPlace ? 1000 : 0);
        });
        const place = maldivesPlaces[selectedPlace];
        map.stop();
        map.flyTo([place.latitude, place.longitude], place.zoom, { animate: true, duration: 1.5 });
    }, [selectedPlace, ready]);

    return (
        <div id="island-location-map" className="island-map relative isolate mt-8 overflow-hidden rounded-[30px] border border-[#c9d9de] bg-[#dceffb]">
            <div className="flex items-center justify-between gap-3 border-b border-[#c9d9de] bg-[#eef6fb] px-5 py-4">
                <p aria-live="polite" className="font-semibold text-[#243b49]">{currentPlace.name}</p>
                <button type="button" disabled={!ready} onClick={() => { mapRef.current?.stop(); mapRef.current?.flyToBounds(maldivesPlaces.map(place => [place.latitude, place.longitude]), { padding: [45, 45], duration: 1.5, maxZoom: 8 }); }} className="rounded-full border border-[#b9d3df] bg-white/80 px-3 py-2 text-xs text-[#365767] disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-700">All islands</button>
            </div>
            <div ref={container} role="region" aria-label={`Interactive map: ${currentPlace.name}`} className="h-80 w-full sm:h-96" />
            {!ready && <p role="status" className="absolute inset-x-5 top-1/2 text-center text-sm text-[#365767]">{failed ? 'Map unavailable. Try reloading the page.' : 'Loading map…'}</p>}
        </div>
    );
}
