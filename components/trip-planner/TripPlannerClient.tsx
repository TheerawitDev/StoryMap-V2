"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { TripSidebar } from "@/components/trip-planner/TripSidebar";
import { findLocationsOnRoute, Coordinates } from "@/lib/routeUtils";
import { useCrowdData } from "@/lib/crowdUtils";

// Dynamic import for Leaflet map to avoid SSR issues
const TripMap = dynamic(() => import("@/components/trip-planner/TripMap"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-muted flex items-center justify-center">Loading Map...</div>
});

interface TripPlannerPageProps {
    initialLocations: any[];
}

export default function TripPlannerPage({ initialLocations }: TripPlannerPageProps) {
    const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
    const [destination, setDestination] = useState<any | null>(null);
    const [stops, setStops] = useState<any[]>([]);
    const [selectedStopIds, setSelectedStopIds] = useState<Set<number | string>>(new Set());

    // Get live crowd data
    const liveLocations = useCrowdData(initialLocations);

    const requestLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            () => {
                alert("Unable to retrieve your location");
            }
        );
    };

    // Recalculate stops when destination changes
    useEffect(() => {
        if (userLocation && destination) {
            const destCoords = parseCoordsLike(destination.coords);
            if (destCoords) {
                const foundStops = findLocationsOnRoute(
                    userLocation,
                    destCoords,
                    liveLocations.filter(l => l.id !== destination.id), // Exclude dest
                    20 // 20km threshold for demo (catch more things)
                );
                setStops(foundStops);
                // Do not select by default - let user choose
                setSelectedStopIds(new Set());
            }
        }
    }, [userLocation, destination, liveLocations]);

    const handleSelectDestination = (loc: any) => {
        setDestination(loc);
        if (!userLocation) {
            requestLocation();
        }
    };

    const toggleStop = (id: number | string) => {
        setSelectedStopIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    return (
        <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)] overflow-hidden">
            {/* Sidebar */}
            <TripSidebar
                allLocations={liveLocations}
                onSelectDestination={handleSelectDestination}
                stops={stops}
                selectedStopIds={selectedStopIds}
                onToggleStop={toggleStop}
                userLocation={userLocation}
                requestLocation={requestLocation}
                // Helper to change stops from sidebar
                onUpdateStops={(newStops, newSelectedIds) => {
                    setStops(newStops);
                    setSelectedStopIds(newSelectedIds);
                }}
            />

            {/* Map Area */}
            <div className="flex-1 relative bg-gray-100">
                <TripMap
                    userLocation={userLocation}
                    destination={destination ? parseCoordsLike(destination.coords) : null}
                    stops={stops}
                    selectedStopIds={selectedStopIds}
                    onToggleStop={toggleStop}
                />
            </div>
        </div>
    );
}

// Helper to parse coord string
function parseCoordsLike(coords: string): Coordinates | null {
    try {
        const [lat, lng] = coords.split(',').map(s => parseFloat(s.trim()));
        if (isNaN(lat) || isNaN(lng)) return null;
        return { lat, lng };
    } catch { return null; }
}
