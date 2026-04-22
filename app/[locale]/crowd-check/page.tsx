"use client";

import { useState, useEffect, useMemo } from "react";
import { useStore, Location } from "@/store/useStore";
import dynamic from "next/dynamic";
// Dynamically import Map to prevent SSR window reference error
const Map = dynamic(() => import("@/components/Map"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">Loading Map...</div>
});
import { Loader2, MapPin, AlertTriangle, CheckCircle, Info, Navigation } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Helper for Haversine distance
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
}

export default function CrowdCheckPage() {
    const { locations, fetchData, isLoading } = useStore();
    const [selectedId, setSelectedId] = useState<number | "">("");
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [gettingLocation, setGettingLocation] = useState(false);

    useEffect(() => {
        if (locations.length === 0) fetchData();
    }, [locations.length, fetchData]);

    const handleGetUserLocation = () => {
        setGettingLocation(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    setGettingLocation(false);
                },
                (error) => {
                    console.error("Error getting location", error);
                    setGettingLocation(false);
                    alert("Could not get your location. Please check permissions.");
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            setGettingLocation(false);
        }
    };

    const selectedLocation = useMemo(() => {
        return locations.find(l => l.id === Number(selectedId)) || null;
    }, [locations, selectedId]);

    const crowdLevel = useMemo(() => {
        if (!selectedLocation) return null;
        const visits = selectedLocation.recentVisitCount || 0;
        if (visits > 10) return { level: "High", color: "text-red-500", bg: "bg-red-100", icon: AlertTriangle, text: "Very Crowded" };
        if (visits > 3) return { level: "Medium", color: "text-orange-500", bg: "bg-orange-100", icon: Info, text: "Moderately Busy" };
        return { level: "Low", color: "text-green-500", bg: "bg-green-100", icon: CheckCircle, text: "Quiet" };
    }, [selectedLocation]);

    const suggestions = useMemo(() => {
        if (!selectedLocation || !crowdLevel || crowdLevel.level === "Low") return [];

        const [lat, lng] = selectedLocation.coords.split(",").map(c => parseFloat(c.trim()));
        if (isNaN(lat) || isNaN(lng)) return [];

        // Find nearby locations (within 10km) that have LOWER crowd levels
        return locations
            .filter(l => l.id !== selectedLocation.id)
            .map(l => {
                const [lLat, lLng] = l.coords.split(",").map(c => parseFloat(c.trim()));
                return { ...l, distance: getDistanceFromLatLonInKm(lat, lng, lLat, lLng) };
            })
            .filter(l => l.distance <= 10 && (l.recentVisitCount || 0) < (selectedLocation.recentVisitCount || 0))
            .sort((a, b) => a.distance - b.distance) // Closest first
            .slice(0, 3); // Take top 3
    }, [locations, selectedLocation, crowdLevel]);

    const mapLocations = useMemo(() => {
        const list = [];
        if (selectedLocation) list.push(selectedLocation);
        list.push(...suggestions);
        return list;
    }, [selectedLocation, suggestions]);

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-gray-50">
            <div className="flex flex-col md:flex-row h-full">
                {/* Sidebar / Controls */}
                <div className="w-full md:w-1/3 lg:w-1/4 p-6 bg-white overflow-y-auto border-r shadow-sm z-10">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800">Plan Your Visit</h1>

                    {/* Location Selection */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Where do you want to go?
                        </label>
                        <select
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                            value={selectedId}
                            onChange={(e) => setSelectedId(Number(e.target.value))}
                        >
                            <option value="">Select a location...</option>
                            {locations.map(loc => (
                                <option key={loc.id} value={loc.id}>{loc.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* User Location Button */}
                    <div className="mb-6">
                        <button
                            onClick={handleGetUserLocation}
                            disabled={gettingLocation}
                            className="flex items-center justify-center w-full px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
                        >
                            {gettingLocation ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Navigation className="w-4 h-4 mr-2" />}
                            {userLocation ? "Update My Location" : "Use My Location"}
                        </button>
                        {userLocation && (
                            <p className="text-xs text-green-600 mt-2 text-center flex items-center justify-center">
                                <CheckCircle className="w-3 h-3 mr-1" /> Location active
                            </p>
                        )}
                    </div>

                    {/* Status Display */}
                    {selectedLocation && crowdLevel && (
                        <div className={`p-4 rounded-xl border ${crowdLevel.bg} mb-6 transition-all`}>
                            <div className="flex items-start">
                                <crowdLevel.icon className={`w-6 h-6 ${crowdLevel.color} mt-0.5 mr-3 flex-shrink-0`} />
                                <div>
                                    <h3 className={`font-bold ${crowdLevel.color} text-lg`}>{crowdLevel.text}</h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Recent visitors (24h): <span className="font-semibold">{selectedLocation.recentVisitCount || 0}</span>
                                    </p>
                                    {crowdLevel.level === "High" && (
                                        <p className="text-sm text-red-600 font-medium mt-2">
                                            High traffic detected. Consider alternatives.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Suggestions */}
                    {suggestions.length > 0 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                Less Crowded Nearby
                            </h2>
                            <div className="space-y-3">
                                {suggestions.map(place => (
                                    <Link
                                        href={`/place/${place.id}`}
                                        key={place.id}
                                        className="block p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer group"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                                    {place.name}
                                                </h4>
                                                <p className="text-xs text-gray-500 mt-1 line-clamp-1">{place.scene}</p>
                                                <div className="flex items-center mt-2 text-xs text-gray-500">
                                                    <MapPin className="w-3 h-3 mr-1" />
                                                    {place.distance.toFixed(1)} km away
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap">
                                                    {place.recentVisitCount || 0} visitors
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {!selectedLocation && !isLoading && locations.length > 0 && (
                        <div className="text-center text-gray-400 mt-10">
                            <MapPin className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p>Select a location to see crowd insights</p>
                        </div>
                    )}
                </div>

                {/* Map Area */}
                <div className="w-full md:w-2/3 lg:w-3/4 h-[50vh] md:h-full relative">
                    <Map
                        locations={mapLocations}
                        zoom={selectedLocation ? 13 : 6}
                        center={selectedLocation ? undefined : (userLocation ? [userLocation.lat, userLocation.lng] : undefined)}
                    />
                    {/* Legend Overlay */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg z-[1000] text-xs space-y-2 border border-gray-200">
                        <div className="font-semibold mb-1">Crowd Levels</div>
                        <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div> Low (&lt;5)</div>
                        <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div> Medium (5-10)</div>
                        <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div> High (&gt;10)</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
