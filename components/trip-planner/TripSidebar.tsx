"use client";

import { useState } from "react";
import { Search, MapPin, Navigation, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Coordinates, parseCoords, getDistance } from "@/lib/routeUtils";

interface TripSidebarProps {
    allLocations: any[];
    onSelectDestination: (location: any) => void;
    stops: any[];
    selectedStopIds: Set<number | string>;
    onToggleStop: (id: number | string) => void;
    userLocation: Coordinates | null;
    requestLocation: () => void;
}

export function TripSidebar({ allLocations, onSelectDestination, stops, selectedStopIds, onToggleStop, userLocation, requestLocation }: TripSidebarProps) {
    const [search, setSearch] = useState("");
    const [selectedDest, setSelectedDest] = useState<any | null>(null);

    const filteredLocations = allLocations.filter(loc =>
        loc.name.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 5);

    const handleSelect = (loc: any) => {
        setSelectedDest(loc);
        onSelectDestination(loc);
        setSearch(""); // clear search to show selection state
    };

    return (
        <div className="h-full flex flex-col bg-background/95 backdrop-blur shadow-xl border-r z-10 w-full md:w-[400px]">
            {/* Header / Input */}
            <div className="p-4 border-b space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold text-xl">
                    <Navigation className="w-6 h-6" />
                    Trip Planner
                </div>

                <div className="space-y-3">
                    {/* User Location */}
                    <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md border text-sm">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        {userLocation ? (
                            <span className="text-muted-foreground">ตำแหน่งของคุณ (Your Location)</span>
                        ) : (
                            <Button size="sm" variant="link" onClick={requestLocation} className="h-auto p-0 text-primary">
                                กดเพื่อระบุตำแหน่ง (Click to locate)
                            </Button>
                        )}
                    </div>

                    {/* Destination Input */}
                    <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="ค้นหาปลายทาง... (Where to?)"
                            value={selectedDest ? selectedDest.name : search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                if (selectedDest) setSelectedDest(null); // Clear selection if typing
                            }}
                            className="pl-9"
                        />
                    </div>
                </div>
            </div>

            {/* Results / Route Info */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="p-4 space-y-4">
                    {/* Search / Suggestions */}
                    {!selectedDest && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-muted-foreground">
                                {search.length > 0 ? "ผลการค้นหา (Results)" : "สถานที่แนะนำ (Suggested)"}
                            </h3>
                            {(search.length > 0 ? filteredLocations : allLocations.slice(0, 10)).map(loc => (
                                <button
                                    key={loc.id}
                                    onClick={() => handleSelect(loc)}
                                    className="w-full text-left p-3 rounded-lg hover:bg-accent flex items-center gap-3 transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-background transition-colors">
                                        {loc.image ? (
                                            <img src={loc.image} alt={loc.name} className="w-full h-full object-cover rounded" />
                                        ) : <MapPin className="w-5 h-5" />}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="font-medium truncate">{loc.name}</div>
                                        <div className="text-xs text-muted-foreground truncate">{loc.description}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Stops Along Route */}
                    {selectedDest && userLocation && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-5">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-lg">🚩 แวะเที่ยวระหว่างทาง</h3>
                                <div className="text-xs text-muted-foreground">เลือก: {selectedStopIds.size} / {stops.length}</div>
                            </div>

                            {stops.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    ไม่พบสถานที่ท่องเที่ยวในเส้นทางนี้
                                    <br /><span className="text-xs opacity-70">Try a longer route!</span>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {stops.map((stop, idx) => {
                                        const isSelected = selectedStopIds.has(stop.id);
                                        return (
                                            <div key={stop.id} className="relative group">
                                                {/* Selection Checkbox Overlay */}
                                                <div className="absolute top-3 left-3 z-20">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => onToggleStop(stop.id)}
                                                        className="w-5 h-5 accent-primary cursor-pointer shadow-sm"
                                                    />
                                                </div>

                                                <Card className={`group relative overflow-hidden border-l-4 transition-all ${isSelected ? 'border-l-yellow-400 bg-background' : 'border-l-gray-300 bg-muted/40 opacity-70 grayscale'}`}>
                                                    <div className="absolute top-2 right-2 text-xs font-mono text-muted-foreground bg-background/80 px-1 rounded">
                                                        +{stop.distanceFromStart.toFixed(1)}km
                                                    </div>
                                                    <CardContent className="p-3 pl-10 flex items-start gap-3" onClick={() => onToggleStop(stop.id)}>
                                                        <div className="w-16 h-16 rounded-md bg-muted overflow-hidden flex-shrink-0">
                                                            {stop.image && <img src={stop.image} alt={stop.name} className="w-full h-full object-cover" />}
                                                        </div>
                                                        <div className="cursor-pointer">
                                                            <h4 className="font-medium leading-tight mb-1">{stop.name}</h4>
                                                            <p className="text-xs text-muted-foreground line-clamp-2">{stop.description}</p>
                                                            <div className="mt-2 text-xs text-primary font-medium flex items-center">
                                                                ห่างจากเส้นทาง {stop.distanceFromRoute.toFixed(1)} กม.
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}

                            <Button
                                className="w-full mt-4"
                                size="lg"
                                disabled={selectedStopIds.size === 0}
                                onClick={() => {
                                    if (!userLocation || !selectedDest) return;

                                    const origin = `${userLocation.lat},${userLocation.lng}`;
                                    const dest = selectedDest.coords;

                                    // Filter only selected stops
                                    const waypoints = stops
                                        .filter(s => selectedStopIds.has(s.id))
                                        .slice(0, 8) // Google Maps limit
                                        .map(s => s.coords.replace(/\s/g, ''))
                                        .join('|');

                                    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}&waypoints=${waypoints}&travelmode=driving`;
                                    window.open(url, '_blank');
                                }}
                            >
                                <Navigation className="w-4 h-4 mr-2" />
                                เริ่มนำทาง ({selectedStopIds.size} stops)
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
