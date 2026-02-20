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
    const [isLocating, setIsLocating] = useState(false);
    const [destination, setDestination] = useState<any | null>(null);
    const [stops, setStops] = useState<any[]>([]);
    const [selectedStopIds, setSelectedStopIds] = useState<Set<number | string>>(new Set());
    const [lastDestId, setLastDestId] = useState<string | number | null>(null);

    // Get live crowd data
    const liveLocations = useCrowdData(initialLocations);

    const requestLocation = () => {
        setIsLocating(true);
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            setIsLocating(false);
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                setIsLocating(false);
            },
            () => {
                alert("Unable to retrieve your location");
                setIsLocating(false);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
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
                    20 // 20km threshold for demo
                );
                setStops(prevStops => {
                    // Preserve any local businesses (IDs starting with 'lb-')
                    const localStops = prevStops.filter(s => typeof s.id === 'string' && s.id.startsWith('lb-'));

                    const mergedStops = [...foundStops];
                    localStops.forEach(ls => {
                        if (!mergedStops.some(s => s.id === ls.id)) {
                            mergedStops.push(ls);
                        }
                    });

                    return mergedStops;
                });

                // Only reset selected stops if the destination fundamentally changed
                if (destination.id !== lastDestId) {
                    setSelectedStopIds(new Set());
                    setLastDestId(destination.id);
                } else {
                    // Clean up any stale selected stops just in case, but keep user choices
                    // AND keep local business choices!
                    setSelectedStopIds(prev => {
                        const validIds = new Set(foundStops.map(s => s.id));
                        const next = new Set<string | number>();
                        prev.forEach(id => {
                            if (validIds.has(id) || (typeof id === 'string' && id.startsWith('lb-'))) {
                                next.add(id);
                            }
                        });
                        return next;
                    });
                }
            }
        } else {
            // Reset if no active destination
            setStops([]);
            setSelectedStopIds(new Set());
            setLastDestId(null);
        }
    }, [userLocation, destination, liveLocations, lastDestId]);

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
                selectedDestination={destination}
                onClearDestination={() => setDestination(null)}
                stops={stops}
                selectedStopIds={selectedStopIds}
                onToggleStop={toggleStop}
                userLocation={userLocation}
                requestLocation={requestLocation}
                isLocating={isLocating}
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
