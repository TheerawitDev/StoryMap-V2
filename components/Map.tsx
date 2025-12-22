
"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useStore } from "@/store/useStore";
import { useEffect } from "react";

// Fix Leaflet's default icon path issues in Next.js
const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

const customIcon = L.icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// Component to handle map interactions (e.g., zooming to selected location)
function MapController() {
    const { selectedLocation } = useStore();
    const map = useMap();

    useEffect(() => {
        if (selectedLocation) {
            const [lat, lng] = selectedLocation.coords.split(",").map(c => parseFloat(c.trim()));
            map.flyTo([lat, lng], 14, { duration: 1.5 });
        }
    }, [selectedLocation, map]);

    return null;
}

interface MapProps {
    center?: [number, number];
    zoom?: number;
    locations?: any[]; // Optional explicit locations
    interactive?: boolean;
}

export default function Map({ center, zoom, locations: propLocations, interactive = true }: MapProps) {
    const { locations: storeLocations, series } = useStore();

    // Use props if provided, otherwise default to store
    const locationsToRender = propLocations || storeLocations;
    const mapCenter = center || ([13.7563, 100.5018] as L.LatLngExpression);
    const mapZoom = zoom || 6;

    const getSeriesTitle = (seriesId: number) => {
        return series.find(s => s.id === seriesId)?.title || "Unknown Series";
    };

    return (
        <MapContainer
            center={mapCenter as L.LatLngExpression}
            zoom={mapZoom}
            scrollWheelZoom={interactive}
            dragging={interactive}
            zoomControl={interactive}
            className="h-full w-full z-0 outline-none"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Only use controller if no explicit locations/center provided, or make it smarter */}
            {!propLocations && <MapController />}

            {locationsToRender.map((loc) => {
                const [lat, lng] = loc.coords.split(",").map((c: string) => parseFloat(c.trim()));
                // Skip invalid coordinates
                if (isNaN(lat) || isNaN(lng)) return null;

                return (
                    <Marker key={loc.id} position={[lat, lng]} icon={customIcon}>
                        {interactive && (
                            <Popup>
                                <div className="p-2 min-w-[200px]">
                                    <h3 className="font-bold text-lg mb-0.5">{getSeriesTitle(loc.seriesId)}</h3>
                                    <p className="text-sm font-semibold text-gray-800 mb-2">{loc.name}</p>
                                    <p className="text-xs text-gray-600 mb-2">{loc.scene}</p>
                                    <div className="text-xs text-blue-500 cursor-pointer hover:underline">View Details</div>
                                </div>
                            </Popup>
                        )}
                    </Marker>
                );
            })}
        </MapContainer>
    );
}
