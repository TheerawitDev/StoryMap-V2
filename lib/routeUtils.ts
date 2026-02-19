export interface Coordinates {
    lat: number;
    lng: number;
}

export interface LocationWithCoords {
    id: number | string;
    coords: string; // "lat, lng"
    [key: string]: any;
}

/**
 * Parses "lat, lng" string to object
 */
export function parseCoords(coords: string): Coordinates | null {
    try {
        const [lat, lng] = coords.split(',').map(s => parseFloat(s.trim()));
        if (isNaN(lat) || isNaN(lng)) return null;
        return { lat, lng };
    } catch (e) {
        return null;
    }
}

/**
 * Calculates distance between two points in km (Haversine)
 */
export function getDistance(p1: Coordinates, p2: Coordinates): number {
    const R = 6371; // Earth radius in km
    const dLat = (p2.lat - p1.lat) * Math.PI / 180;
    const dLon = (p2.lng - p1.lng) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

/**
 * Calculates the shortest distance from a point P to a line segment AB.
 */
export function distanceFromLineSegment(p: Coordinates, a: Coordinates, b: Coordinates): number {
    const R = 6371;
    // Proper geometric distance from point to line segment on a sphere is complex.
    // We will approximate by projecting to flat plane for short distances, 
    // or efficiently checking if P is within "buffer" of line AB effectively.

    // Simple approach:
    // 1. If length AB is 0, return dist(P, A)
    // 2. Project P onto line containing AB, find parameter t.
    // 3. Clamp t to [0, 1] to find nearest point on segment.
    // 4. Return dist(P, Projection)

    // Basic vector math (approximation for small areas, but works reasonably for city/country scale for a demo)
    const x = p.lat;
    const y = p.lng;
    const x1 = a.lat;
    const y1 = a.lng;
    const x2 = b.lat;
    const y2 = b.lng;

    const A = x - x1;
    const B = y - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const len_sq = C * C + D * D;

    let param = -1;
    if (len_sq !== 0) // in case of 0 length line
        param = dot / len_sq;

    let xx, yy;

    if (param < 0) {
        xx = x1;
        yy = y1;
    } else if (param > 1) {
        xx = x2;
        yy = y2;
    } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }

    // Now calculate distance from P to (xx, yy)
    return getDistance(p, { lat: xx, lng: yy });
}

/**
 * Finds locations that are within `thresholdKm` of the direct path from Start to End.
 */
export function findLocationsOnRoute(
    start: Coordinates,
    end: Coordinates,
    allLocations: LocationWithCoords[],
    thresholdKm: number = 5
) {
    const routeDistance = getDistance(start, end);

    return allLocations.filter(loc => {
        const p = parseCoords(loc.coords);
        if (!p) return false;

        // Optimization: Filter out points that are definitely too far (bounding box check)
        // Skip for now for simplicity on small dataset.

        const dist = distanceFromLineSegment(p, start, end);
        return dist <= thresholdKm;
    }).map(loc => {
        const p = parseCoords(loc.coords)!;
        return {
            ...loc,
            distanceFromRoute: distanceFromLineSegment(p, start, end),
            distanceFromStart: getDistance(start, p)
        };
    }).sort((a, b) => a.distanceFromStart - b.distanceFromStart); // Sort by order along path from start
}
