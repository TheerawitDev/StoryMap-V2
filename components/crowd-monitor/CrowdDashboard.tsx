"use client";

import { useState, useEffect } from "react";
import { LocationPermissionRequest } from "./LocationPermissionRequest";
import { LocationStatusCard, LocationData } from "./LocationStatusCard";
import { AlternativeSuggestions } from "./AlternativeSuggestions";
import { Loader2 } from "lucide-react";

interface CrowdDashboardProps {
    initialLocations: Omit<LocationData, "visitorCount" | "capacity">[];
}

export function CrowdDashboard({ initialLocations }: CrowdDashboardProps) {
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [permissionError, setPermissionError] = useState<string | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [locations, setLocations] = useState<LocationData[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
    const [loading, setLoading] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState<'all' | 'low' | 'moderate' | 'high'>('all');

    // Initialize locations with random simulated data
    useEffect(() => {
        const simulated = initialLocations.map(loc => ({
            ...loc,
            visitorCount: Math.floor(Math.random() * 200), // Random 0-200
            capacity: 150, // Fixed capacity for demo
            trend: 'stable' as const
        }));
        setLocations(simulated);
    }, [initialLocations]);

    // Simulate "Live" updates
    useEffect(() => {
        if (!hasPermission) return;

        const interval = setInterval(() => {
            setLocations(prev => prev.map(loc => {
                // Randomly fluctuate visitor count by -5 to +5
                const change = Math.floor(Math.random() * 11) - 5;
                const newCount = Math.max(0, Math.min(loc.capacity * 1.2, loc.visitorCount + change)); // Cap at 120% capacity

                let trend: 'up' | 'down' | 'stable' = 'stable';
                if (newCount > loc.visitorCount) trend = 'up';
                else if (newCount < loc.visitorCount) trend = 'down';

                return { ...loc, visitorCount: Math.round(newCount), trend };
            }));
        }, 3000); // Update every 3 seconds

        return () => clearInterval(interval);
    }, [hasPermission]);

    // Check pre-existing permission
    useEffect(() => {
        if (navigator.permissions && navigator.permissions.query) {
            navigator.permissions.query({ name: "geolocation" }).then((result) => {
                if (result.state === "granted") {
                    requestLocation();
                }
            });
        }
    }, []);

    const requestLocation = () => {
        setLoading(true);
        if (!navigator.geolocation) {
            setPermissionError("Geolocation is not supported by your browser");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                setHasPermission(true);
                setPermissionError(null);
                setLoading(false);
            },
            (error) => {
                console.error("Error obtaining location", error);
                setPermissionError("Unable to retrieve your location. Please allow access.");
                setLoading(false);
            }
        );
    };

    const handleLocationClick = (location: LocationData) => {
        if (selectedLocation?.id === location.id) {
            setSelectedLocation(null); // Deselect
        } else {
            setSelectedLocation(location);
        }
    };

    // Calculate distance (Haversine formula)
    const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; // Radius of the earth in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    };

    const getAlternatives = (target: LocationData) => {
        // Parse target coords
        const [lat1, lng1] = target.coords.split(',').map(s => parseFloat(s.trim()));
        if (isNaN(lat1) || isNaN(lng1)) return [];

        return locations
            .filter(l => l.id !== target.id) // Exclude self
            .filter(l => (l.visitorCount / l.capacity) < 0.7) // Only show not-crowded places
            .map(l => {
                const [lat2, lng2] = l.coords.split(',').map(s => parseFloat(s.trim()));
                const distance = getDistance(lat1, lng1, lat2, lng2);
                return { ...l, distance };
            })
            .sort((a, b) => a.distance - b.distance) // Sort by nearest
            .slice(0, 3); // Top 3
    };

    // Filter Logic
    const filteredLocations = locations.filter(loc => {
        const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase());
        const density = loc.visitorCount / loc.capacity;
        let matchesFilter = true;

        if (filter === 'low') matchesFilter = density <= 0.5;
        else if (filter === 'moderate') matchesFilter = density > 0.5 && density <= 0.8;
        else if (filter === 'high') matchesFilter = density > 0.8;

        return matchesSearch && matchesFilter;
    });

    if (!hasPermission) {
        return (
            <LocationPermissionRequest
                onRequestPermission={requestLocation}
                error={permissionError}
            />
        );
    }

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold tracking-tight">สถานการณ์ความหนาแน่น (Live Crowd Monitor)</h2>
                    <p className="text-muted-foreground">ข้อมูลผู้เข้าชมแบบเรียลไทม์และคำแนะนำสถานที่ท่องเที่ยว</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        placeholder="ค้นหาสถานที่..."
                        className="px-3 py-2 border rounded-md text-sm w-full sm:w-[200px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="flex bg-muted p-1 rounded-md">
                        {(['all', 'low', 'moderate', 'high'] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-all ${filter === f
                                    ? 'bg-background shadow text-foreground'
                                    : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {f === 'all' && 'ทั้งหมด'}
                                {f === 'low' && 'ว่าง'}
                                {f === 'moderate' && 'ปานกลาง'}
                                {f === 'high' && 'หนาแน่น'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLocations.map((location) => (
                    <div key={location.id} className="space-y-4">
                        <LocationStatusCard
                            location={location}
                            onClick={handleLocationClick}
                        />
                        {selectedLocation?.id === location.id && (
                            <AlternativeSuggestions
                                currentLocation={location}
                                alternatives={getAlternatives(location)}
                                onSelect={(l) => {
                                    handleLocationClick(l);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                            />
                        )}
                    </div>
                ))}

                {filteredLocations.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        ไม่พบสถานที่ที่ค้นหา
                    </div>
                )}
            </div>

            {userLocation && (
                <div className="text-xs text-center text-muted-foreground mt-8">
                    <p>พิกัดของคุณ: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}</p>
                    <p>ระบบกำลังคำแนะนำสถานที่ใกล้เคียงตำแหน่งปัจจุบันของคุณ</p>
                </div>
            )}
        </div>
    );
}
