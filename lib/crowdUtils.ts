import { useState, useEffect } from "react";

export interface CrowdLocationData {
    id: number | string;
    name: string;
    visitorCount: number;
    capacity: number;
    image?: string | null;
    coords: string;
    description?: string;
    trend?: 'up' | 'down' | 'stable';
    [key: string]: any; // Allow other properties
}

export function useCrowdData(initialLocations: any[]) {
    const [locations, setLocations] = useState<CrowdLocationData[]>([]);

    useEffect(() => {
        // Initialize with simulated data if not present
        const simulated = initialLocations.map(loc => ({
            ...loc,
            visitorCount: loc.visitorCount ?? Math.floor(Math.random() * 200),
            capacity: loc.capacity ?? 150,
            trend: loc.trend ?? 'stable'
        }));
        setLocations(simulated);
    }, [initialLocations]);

    useEffect(() => {
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
    }, []);

    return locations;
}

// Calculate distance (Haversine formula)
export const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
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

export const getAlternatives = (target: CrowdLocationData, allLocations: CrowdLocationData[]) => {
    // Parse target coords
    const [lat1, lng1] = target.coords.split(',').map(s => parseFloat(s.trim()));
    if (isNaN(lat1) || isNaN(lng1)) return [];

    return allLocations
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
