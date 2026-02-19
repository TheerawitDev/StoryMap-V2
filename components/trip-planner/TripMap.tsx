"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Coordinates } from "@/lib/routeUtils";

// Fix for default marker icon in Leaflet with Next.js
const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

// Custom Icons using Lucide React rendered to SVG
const createCustomIcon = (color: string, type: 'user' | 'dest' | 'stop' | 'selected') => {
    let svg = '';

    if (type === 'user') {
        svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3" fill="white"></circle></svg>`;
    } else if (type === 'dest') {
        svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3" fill="white"></circle></svg>`;
    } else if (type === 'selected') {
        // Green star-like or check
        svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>`;
    } else {
        // Yellow dot for suggested
        svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>`;
    }

    const size = type === 'selected' ? 40 : 30;

    return L.divIcon({
        className: 'custom-marker',
        html: `<div style="width: ${size}px; height: ${size}px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)); transition: transform 0.2s;">${svg}</div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
        popupAnchor: [0, -size]
    });
};

const UserIcon = createCustomIcon('#3b82f6', 'user'); // Blue
const DestIcon = createCustomIcon('#ef4444', 'dest'); // Red
const StopIcon = createCustomIcon('#eab308', 'stop'); // Yellow
const SelectedStopIcon = createCustomIcon('#22c55e', 'selected'); // Green

// Component to handle map view updates
function MapUpdater({ center, zoom }: { center: [number, number], zoom?: number }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, zoom || 13);
        }
    }, [center, zoom, map]);
    return null;
}

// Component to fit bounds to a route
function RouteFitter({ start, end }: { start?: Coordinates | null, end?: Coordinates | null }) {
    const map = useMap();
    useEffect(() => {
        if (start && end) {
            const bounds = L.latLngBounds([start.lat, start.lng], [end.lat, end.lng]);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [start, end, map]);
    return null;
}

interface TripMapProps {
    userLocation: Coordinates | null;
    destination: Coordinates | null;
    stops: any[];
    selectedStopIds: Set<number | string>;
    onToggleStop: (id: number | string) => void;
}

export default function TripMap({ userLocation, destination, stops, selectedStopIds, onToggleStop }: TripMapProps) {
    const center: [number, number] = userLocation ? [userLocation.lat, userLocation.lng] : [13.7563, 100.5018]; // Default Bangkok

    return (
        <MapContainer
            center={center}
            zoom={13}
            style={{ height: "100%", width: "100%", zIndex: 0 }}
            zoomControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* User Location */}
            {userLocation && (
                <Marker position={[userLocation.lat, userLocation.lng]} icon={UserIcon} zIndexOffset={1000}>
                    <Popup>ตำแหน่งของคุณ (You)</Popup>
                </Marker>
            )}

            {/* Destination */}
            {destination && (
                <Marker position={[destination.lat, destination.lng]} icon={DestIcon} zIndexOffset={1000}>
                    <Popup>จุดหมาย (Destination)</Popup>
                </Marker>
            )}

            {/* Stops */}
            {stops.map((stop) => {
                const [lat, lng] = stop.coords.split(',').map((s: string) => parseFloat(s.trim()));
                const isSelected = selectedStopIds.has(stop.id);

                return (
                    <Marker
                        key={stop.id}
                        position={[lat, lng]}
                        icon={isSelected ? SelectedStopIcon : StopIcon}
                        zIndexOffset={isSelected ? 500 : 0} // Selected on top
                    >
                        <Popup>
                            <div className="flex flex-col gap-2 min-w-[150px]">
                                <h3 className="font-bold text-sm">{stop.name}</h3>
                                <div className="w-full h-24 bg-muted rounded overflow-hidden">
                                    {stop.image && <img src={stop.image} alt={stop.name} className="w-full h-full object-cover" />}
                                </div>
                                <p className="text-xs line-clamp-2">{stop.description}</p>
                                <button
                                    onClick={() => onToggleStop(stop.id)}
                                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${isSelected
                                            ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                            : 'bg-green-100 text-green-600 hover:bg-green-200'
                                        }`}
                                >
                                    {isSelected ? 'Remove from Trip' : 'Add to Trip'}
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}

            {/* Route Line */}
            {userLocation && destination && (
                <Polyline
                    positions={[
                        [userLocation.lat, userLocation.lng],
                        [destination.lat, destination.lng]
                    ]}
                    color="blue"
                    dashArray="10, 10"
                    opacity={0.4}
                />
            )}

            <MapUpdater center={center} />
            <RouteFitter start={userLocation} end={destination} />
        </MapContainer>
    );
}
