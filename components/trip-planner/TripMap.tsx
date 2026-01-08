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

const createCustomIcon = (color: string, type: 'user' | 'dest' | 'stop') => {
    let svg = '';

    if (type === 'user') {
        svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3" fill="white"></circle></svg>`;
    } else if (type === 'dest') {
        svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3" fill="white"></circle></svg>`;
    } else {
        svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3" fill="white"></circle></svg>`;
    }

    return L.divIcon({
        className: 'custom-marker',
        html: `<div style="width: 30px; height: 30px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">${svg}</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
    });
};

const UserIcon = createCustomIcon('#3b82f6', 'user'); // Blue
const DestIcon = createCustomIcon('#ef4444', 'dest'); // Red
const StopIcon = createCustomIcon('#eab308', 'stop'); // Yellow

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
    onStopClick: (stop: any) => void;
}

export default function TripMap({ userLocation, destination, stops, onStopClick }: TripMapProps) {
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
                <Marker position={[userLocation.lat, userLocation.lng]} icon={UserIcon}>
                    <Popup>ตำแหน่งของคุณ (You)</Popup>
                </Marker>
            )}

            {/* Destination */}
            {destination && (
                <Marker position={[destination.lat, destination.lng]} icon={DestIcon}>
                    <Popup>จุดหมาย (Destination)</Popup>
                </Marker>
            )}

            {/* Stops */}
            {stops.map((stop) => {
                const [lat, lng] = stop.coords.split(',').map((s: string) => parseFloat(s.trim()));
                return (
                    <Marker
                        key={stop.id}
                        position={[lat, lng]}
                        icon={StopIcon}
                        eventHandlers={{
                            click: () => onStopClick(stop)
                        }}
                    >
                        <Popup>{stop.name}</Popup>
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
                    opacity={0.6}
                />
            )}

            <MapUpdater center={center} />
            <RouteFitter start={userLocation} end={destination} />
        </MapContainer>
    );
}
