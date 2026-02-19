"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Navigation, ArrowRight, AlertTriangle, Users, ArrowLeftRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Coordinates, parseCoords, getDistance, distanceFromLineSegment } from "@/lib/routeUtils";
import { getAlternatives, CrowdLocationData } from "@/lib/crowdUtils";
import { getNearbyBusinesses, convertBusinessToLocation, LocalBusiness } from "@/lib/localBusinessUtils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface TripSidebarProps {
    allLocations: CrowdLocationData[];
    onSelectDestination: (location: any) => void;
    stops: CrowdLocationData[];
    selectedStopIds: Set<number | string>;
    onToggleStop: (id: number | string) => void;
    userLocation: Coordinates | null;
    requestLocation: () => void;
    onUpdateStops?: (newStops: CrowdLocationData[], newSelectedIds: Set<number | string>) => void;
}

export function TripSidebar({ allLocations, onSelectDestination, stops, selectedStopIds, onToggleStop, userLocation, requestLocation, onUpdateStops }: TripSidebarProps) {
    const [search, setSearch] = useState("");
    const [selectedDest, setSelectedDest] = useState<any | null>(null);
    const [suggestionModalOpen, setSuggestionModalOpen] = useState(false);
    const [targetStopForSwap, setTargetStopForSwap] = useState<CrowdLocationData | null>(null);
    const [alternatives, setAlternatives] = useState<CrowdLocationData[]>([]);
    const [nearbyBusinesses, setNearbyBusinesses] = useState<LocalBusiness[]>([]);
    const [showStops, setShowStops] = useState(false);

    const filteredLocations = allLocations.filter(loc =>
        loc.name.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 5);

    // Fetch local businesses when destination is selected
    useEffect(() => {
        if (selectedDest) {
            const businesses = getNearbyBusinesses({ coords: selectedDest.coords });
            setNearbyBusinesses(businesses);
        } else {
            setNearbyBusinesses([]);
        }
    }, [selectedDest]);

    const handleSelect = (loc: any) => {
        setSelectedDest(loc);
        onSelectDestination(loc);
        setSearch(""); // clear search to show selection state
    };

    const handleFindAlternative = (stop: CrowdLocationData) => {
        const alts = getAlternatives(stop, allLocations);
        setAlternatives(alts);
        setTargetStopForSwap(stop);
        setSuggestionModalOpen(true);
    };

    const handleSwapStop = (newStop: CrowdLocationData) => {
        if (!targetStopForSwap || !onUpdateStops) return;

        // Replace the stop in the list but keep position if possible
        const newStops = stops.map(s => s.id === targetStopForSwap.id ? newStop : s);

        // Update selection: remove old, add new
        const newSelected = new Set(selectedStopIds);
        if (newSelected.has(targetStopForSwap.id)) {
            newSelected.delete(targetStopForSwap.id);
            newSelected.add(newStop.id);
        }

        onUpdateStops(newStops, newSelected);
        setSuggestionModalOpen(false);
        setTargetStopForSwap(null);
    };

    const handleAddStop = (newStop: CrowdLocationData) => {
        if (!onUpdateStops || !userLocation || !selectedDest) return;

        // Calculate required metrics for the trip planner
        const stopCoords = parseCoords(newStop.coords);
        const startCoords = userLocation;
        const destCoords = parseCoords(selectedDest.coords);

        if (stopCoords && startCoords && destCoords) {
            newStop = {
                ...newStop,
                distanceFromRoute: distanceFromLineSegment(stopCoords, startCoords, destCoords),
                distanceFromStart: getDistance(startCoords, stopCoords)
            };
        } else {
            // Fallback if coords parsing fails
            newStop = {
                ...newStop,
                distanceFromRoute: 0,
                distanceFromStart: 0
            };
        }

        // Add to list if not exists
        let newStops = [...stops];
        if (!newStops.find(s => s.id === newStop.id)) {
            newStops.push(newStop);
            // Re-sort by distance might be needed, but simplified here
        }

        const newSelected = new Set(selectedStopIds);
        newSelected.add(newStop.id);

        onUpdateStops(newStops, newSelected);
        setSuggestionModalOpen(false);
        setTargetStopForSwap(null);
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
                            <div
                                className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-2 -mx-2 rounded-lg transition-colors"
                                onClick={() => setShowStops(!showStops)}
                            >
                                <div>
                                    <h3 className="font-semibold text-lg flex items-center gap-2">
                                        🚩 แวะเที่ยวระหว่างทาง
                                        {showStops ? (
                                            <span className="text-xs font-normal text-muted-foreground">(ซ่อน)</span>
                                        ) : (
                                            <span className="text-xs font-normal text-muted-foreground">(แสดง)</span>
                                        )}
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                        ระยะทางรวม +{stops.filter(s => selectedStopIds.has(s.id)).reduce((acc, curr) => acc + (curr.distanceFromRoute || 0), 0).toFixed(1)} กม. จากเส้นทางปกติ
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                                        {selectedStopIds.size} / {stops.length}
                                    </div>
                                </div>
                            </div>

                            {showStops && (
                                <div className="animate-in slide-in-from-top-2 fade-in duration-200">
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
                                                    <div key={stop.id} className="relative group transition-all duration-200">
                                                        <div
                                                            className={`
                                                        relative overflow-hidden rounded-xl border transition-all duration-200 cursor-pointer
                                                        ${isSelected
                                                                    ? 'bg-card border-green-500 shadow-md ring-1 ring-green-500/20'
                                                                    : 'bg-muted/30 border-transparent hover:bg-muted hover:border-border'
                                                                }
                                                    `}
                                                            onClick={() => onToggleStop(stop.id)}
                                                        >
                                                            <div className="flex p-3 gap-3">
                                                                {/* Image */}
                                                                <div className="w-20 h-20 rounded-lg bg-muted overflow-hidden flex-shrink-0 relative">
                                                                    {stop.image ? (
                                                                        <img src={stop.image} alt={stop.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                                                    ) : (
                                                                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                                                                            <MapPin size={24} />
                                                                        </div>
                                                                    )}
                                                                    {isSelected && (
                                                                        <div className="absolute top-1 right-1 bg-green-500 text-white p-0.5 rounded-full shadow-sm">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Content */}
                                                                <div className="flex-1 min-w-0 flex flex-col justify-between">
                                                                    <div>
                                                                        <div className="flex justify-between items-start gap-2">
                                                                            <h4 className={`font-semibold text-sm leading-tight ${isSelected ? 'text-green-700' : 'text-foreground'}`}>
                                                                                {stop.name}
                                                                            </h4>
                                                                            <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap bg-background/50 px-1.5 py-0.5 rounded">
                                                                                +{stop.distanceFromStart?.toFixed(0) || '?'}km
                                                                            </span>
                                                                        </div>
                                                                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                                                            {stop.description}
                                                                        </p>
                                                                    </div>

                                                                    <div className="flex items-center justify-between mt-2">
                                                                        <div className="text-xs font-medium text-orange-500 flex items-center gap-1">
                                                                            <ArrowRight className="w-3 h-3" />
                                                                            ออกนอกเส้นทาง {stop.distanceFromRoute?.toFixed(1) || '?'} กม.
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
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

                            {/* Support Local Section */}
                            {selectedDest && nearbyBusinesses.length > 0 && (
                                <div className="space-y-3 pt-4 border-t animate-in fade-in slide-in-from-bottom-5">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-lg flex items-center gap-2">
                                            🛍️ อุดหนุนร้านท้องถิ่น
                                        </h3>
                                        <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                                            Support Local
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        ร้านค้าแนะนำใกล้ {selectedDest.name}
                                    </p>

                                    <div className="grid gap-3">
                                        {nearbyBusinesses.map(biz => (
                                            <div key={biz.id} className="flex gap-3 p-3 bg-orange-50/50 border border-orange-100 rounded-lg hover:bg-orange-50 transition-colors">
                                                <div className="w-16 h-16 rounded-md bg-muted overflow-hidden flex-shrink-0">
                                                    {biz.image ? (
                                                        <img src={biz.image} alt={biz.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-orange-100 text-orange-300">
                                                            <MapPin size={24} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-medium text-sm line-clamp-1">{biz.name}</h4>
                                                    <p className="text-xs text-muted-foreground line-clamp-1">{biz.description}</p>
                                                    {biz.recommendedItem && (
                                                        <span className="text-[10px] text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded-full inline-block mt-1">
                                                            ⭐ {biz.recommendedItem}
                                                        </span>
                                                    )}
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0 shrink-0 text-orange-600 hover:text-orange-700 hover:bg-orange-100"
                                                    onClick={() => handleAddStop(convertBusinessToLocation(biz))}
                                                >
                                                    <Plus className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
            </div>
                {/* Alternatives Dialog */}
                <Dialog open={suggestionModalOpen} onOpenChange={setSuggestionModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>แนะนำสถานที่ทางเลือก (Suggested Alternatives)</DialogTitle>
                            <DialogDescription>
                                สถานที่ "{targetStopForSwap?.name}" คนหนาแน่นมาก ลองไปที่เหล่านี้แทนไหม?
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-3 mt-2">
                            {alternatives.length > 0 ? alternatives.map(alt => (
                                <Card key={alt.id} className="overflow-hidden hover:bg-muted/50 transition-colors">
                                    <CardContent className="p-3 flex items-center gap-3">
                                        <div className="w-16 h-16 rounded-md bg-muted overflow-hidden flex-shrink-0 relative">
                                            {alt.image ? (
                                                <img src={alt.image} alt={alt.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <MapPin className="w-6 h-6 m-auto text-muted-foreground" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-sm">{alt.name}</h4>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                                <span className="text-green-600 font-medium">คนน้อยกว่า</span>
                                                <span>•</span>
                                                <span>ห่างออกไป {alt.distance.toFixed(1)} กม.</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <Button size="sm" variant="secondary" className="h-7 text-xs" onClick={() => handleSwapStop(alt)}>
                                                <ArrowLeftRight className="w-3 h-3 mr-1" /> เปลี่ยน
                                            </Button>
                                            <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => handleAddStop(alt)}>
                                                <Plus className="w-3 h-3 mr-1" /> เพิ่ม
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )) : (
                                <div className="text-center py-4 text-muted-foreground">
                                    ไม่พบสถานที่ทางเลือกในบริเวณใกล้เคียง
                                </div>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            );
}
