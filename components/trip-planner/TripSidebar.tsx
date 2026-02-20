"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Navigation, ArrowRight, X, Loader2, ArrowLeftRight, Plus, Route, Star } from "lucide-react";
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
} from "@/components/ui/dialog"

interface TripSidebarProps {
    allLocations: CrowdLocationData[];
    onSelectDestination: (location: any) => void;
    selectedDestination: any | null;
    onClearDestination: () => void;
    stops: CrowdLocationData[];
    selectedStopIds: Set<number | string>;
    onToggleStop: (id: number | string) => void;
    userLocation: Coordinates | null;
    requestLocation: () => void;
    isLocating: boolean;
    onUpdateStops?: (newStops: CrowdLocationData[], newSelectedIds: Set<number | string>) => void;
}

export function TripSidebar({
    allLocations,
    onSelectDestination,
    selectedDestination,
    onClearDestination,
    stops,
    selectedStopIds,
    onToggleStop,
    userLocation,
    requestLocation,
    isLocating,
    onUpdateStops
}: TripSidebarProps) {
    const [search, setSearch] = useState("");
    const [suggestionModalOpen, setSuggestionModalOpen] = useState(false);
    const [targetStopForSwap, setTargetStopForSwap] = useState<CrowdLocationData | null>(null);
    const [alternatives, setAlternatives] = useState<CrowdLocationData[]>([]);
    const [nearbyBusinesses, setNearbyBusinesses] = useState<LocalBusiness[]>([]);
    const [showLocalStops, setShowLocalStops] = useState(false);

    const filteredLocations = search.trim() === ""
        ? allLocations.slice(0, 5)
        : allLocations.filter(loc =>
            loc.name.toLowerCase().includes(search.toLowerCase())
        ).slice(0, 10);

    // Fetch local businesses when destination is selected
    useEffect(() => {
        if (selectedDestination) {
            const businesses = getNearbyBusinesses({ coords: selectedDestination.coords });
            setNearbyBusinesses(businesses);
        } else {
            setNearbyBusinesses([]);
            setShowLocalStops(false);
        }
    }, [selectedDestination]);

    const handleSelect = (loc: any) => {
        onSelectDestination(loc);
        setSearch("");
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
        if (!onUpdateStops || !userLocation || !selectedDestination) return;

        // Calculate required metrics for the trip planner
        const stopCoords = parseCoords(newStop.coords);
        const startCoords = userLocation;
        const destCoords = parseCoords(selectedDestination.coords);

        if (stopCoords && startCoords && destCoords) {
            newStop = {
                ...newStop,
                distanceFromRoute: distanceFromLineSegment(stopCoords, startCoords, destCoords),
                distanceFromStart: getDistance(startCoords, stopCoords)
            };
        } else {
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
        }

        const newSelected = new Set(selectedStopIds);
        newSelected.add(newStop.id);

        onUpdateStops(newStops, newSelected);
        setSuggestionModalOpen(false);
        setTargetStopForSwap(null);
    };

    return (
        <div className="h-full flex flex-col bg-white/80 dark:bg-black/60 backdrop-blur-xl shadow-2xl border-r border-gray-200/50 dark:border-white/10 z-10 w-full md:w-[420px] transition-all duration-300">
            {/* Header / Input */}
            <div className="p-6 border-b border-gray-200/50 dark:border-white/10 space-y-6 shrink-0 relative overflow-hidden">
                {/* Subtle gradient accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />

                <div className="flex items-center gap-3 relative">
                    <div className="p-2 bg-primary/10 rounded-xl text-primary">
                        <Route className="w-6 h-6" />
                    </div>
                    <h1 className="font-bold text-2xl tracking-tight text-foreground/90">Planner</h1>
                </div>

                <div className="space-y-4 relative">
                    {/* User Location Box */}
                    <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${userLocation ? 'bg-primary/5 text-primary border-primary/20 shadow-sm' : 'bg-muted/50 border-transparent hover:bg-muted'}`}>
                        {isLocating ? (
                            <Loader2 className="w-5 h-5 animate-spin text-primary shrink-0" />
                        ) : userLocation ? (
                            <div className="relative flex h-3 w-3 shrink-0 ml-1">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                            </div>
                        ) : (
                            <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
                        )}

                        <div className="flex-1 min-w-0">
                            {userLocation ? (
                                <p className="text-sm font-medium truncate">ตำแหน่งของคุณ (Current Location)</p>
                            ) : (
                                <button
                                    onClick={requestLocation}
                                    disabled={isLocating}
                                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left w-full truncate"
                                >
                                    {isLocating ? "กำลังระบุตำแหน่ง... (Locating...)" : "กดเพื่อนระบุตำแหน่ง (Set starting point)"}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Connecting Line (visibile only if destination is set) */}
                    {selectedDestination && (
                        <div className="absolute left-6 top-14 bottom-4 w-px bg-gradient-to-b from-primary/30 to-border hidden" />
                    )}

                    {/* Destination Input Box */}
                    <div className="relative group">
                        <div className="absolute left-3.5 top-3.5 w-2 h-2 rounded-full border-2 border-foreground bg-background z-10" />

                        {selectedDestination ? (
                            <div className="flex items-center justify-between p-3 pl-10 bg-card rounded-xl border shadow-sm ring-1 ring-border/50">
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold truncate">{selectedDestination.name}</p>
                                    <p className="text-xs text-muted-foreground truncate">ปลายทาง (Destination)</p>
                                </div>
                                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full shrink-0 hover:bg-destructive/10 hover:text-destructive" onClick={onClearDestination}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        ) : (
                            <Input
                                placeholder="ค้นหาปลายทาง... (Search destination)"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 py-6 bg-muted/50 border-transparent focus-visible:ring-primary/50 focus-visible:bg-background transition-all rounded-xl shadow-inner text-base"
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-gradient-to-b from-transparent to-black/[0.02] dark:to-white/[0.01]">
                {/* Search Results (When no destination is selected) */}
                {!selectedDestination && (
                    <div className="p-4 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider pl-2">
                                {search.length > 0 ? "ผลการค้นหา (Results)" : "สถานที่แนะนำ (Trending)"}
                            </h3>
                            <div className="space-y-2">
                                {filteredLocations.map(loc => (
                                    <button
                                        key={loc.id}
                                        onClick={() => handleSelect(loc)}
                                        className="w-full text-left p-3 rounded-2xl hover:bg-card hover:shadow-md border border-transparent hover:border-border transition-all duration-200 group flex gap-4 items-center focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    >
                                        <div className="w-14 h-14 rounded-xl bg-muted overflow-hidden flex-shrink-0 relative shadow-sm">
                                            {loc.image ? (
                                                <img src={loc.image} alt={loc.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                            ) : (
                                                <MapPin className="w-6 h-6 m-auto text-muted-foreground/50 h-full" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-foreground truncate">{loc.name}</p>
                                            <p className="text-xs text-muted-foreground truncate mt-0.5">{loc.description}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Itinerary View (When destination is selected) */}
                {selectedDestination && (
                    <div className="p-4 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                        {/* Requirement Warning */}
                        {!userLocation && (
                            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 flex gap-3 text-amber-800 dark:text-amber-200">
                                <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                                <div className="text-sm">
                                    <p className="font-semibold">โปรดระบุตำแหน่งของคุณ</p>
                                    <p className="opacity-90 mt-1">ระบบต้องการทราบจุดเริ่มต้นเพื่อคำนวณเส้นทางและแนะนำสถานที่แวะพัก (We need your location to calculate routes).</p>
                                </div>
                            </div>
                        )}

                        {/* Stops Along Route */}
                        {userLocation && stops.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between px-1">
                                    <h3 className="font-bold text-lg flex items-center gap-2">
                                        แวะเที่ยวระหว่างทาง
                                    </h3>
                                    <div className="bg-primary/10 text-primary-foreground font-semibold text-xs px-2.5 py-1 rounded-full text-primary">
                                        {selectedStopIds.size} stops
                                    </div>
                                </div>

                                <div className="space-y-3 relative before:absolute before:inset-y-0 before:left-6 before:w-px before:bg-border before:-z-10 before:my-4">
                                    {stops.map(stop => {
                                        const isSelected = selectedStopIds.has(stop.id);
                                        return (
                                            <div
                                                key={stop.id}
                                                className={`
                                                    relative rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden
                                                    ${isSelected ? 'bg-card border-primary shadow-lg ring-1 ring-primary/20 scale-[1.02]' : 'bg-background/50 hover:bg-muted border-border/50 hover:border-border'}
                                                `}
                                                onClick={() => onToggleStop(stop.id)}
                                            >
                                                <div className="flex p-3 gap-4 h-28">
                                                    <div className="w-20 h-full rounded-xl flex-shrink-0 relative overflow-hidden bg-muted">
                                                        {stop.image && typeof stop.image === 'string' && stop.image.length > 0 && !stop.image.includes('/images/shops/') ? (
                                                            <img src={stop.image} alt={stop.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            typeof stop.id === 'string' && stop.id.startsWith('lb-') ? (
                                                                <Star className="w-8 h-8 m-auto text-amber-400 h-full" />
                                                            ) : (
                                                                <MapPin className="w-8 h-8 m-auto text-muted-foreground/30 h-full" />
                                                            )
                                                        )}
                                                        {isSelected && (
                                                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center backdrop-blur-[1px]">
                                                                <div className="bg-primary text-white rounded-full p-1 shadow-md">
                                                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                        <h4 className={`font-semibold line-clamp-1 mb-1 ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                                                            {stop.name}
                                                        </h4>
                                                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                                            {stop.description}
                                                        </p>
                                                        <div className="mt-auto pt-2 flex items-center gap-3 text-[10px] font-medium text-muted-foreground uppercase">
                                                            <span className="flex items-center gap-1 bg-muted px-2 py-0.5 rounded-sm">
                                                                <Navigation className="w-3 h-3" />
                                                                +{stop.distanceFromRoute?.toFixed(1) || '?'} กม.
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Support Local Section */}
                        {nearbyBusinesses.length > 0 && (
                            <div className="space-y-4 pt-6 border-t border-border/50 relative">
                                <div className="flex items-center justify-between px-1 cursor-pointer" onClick={() => setShowLocalStops(!showLocalStops)}>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-lg flex items-center gap-2">
                                            อุดหนุนร้านท้องถิ่น
                                        </h3>
                                        <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                            Support Local
                                        </span>
                                    </div>
                                    <Button variant="ghost" size="sm" className="h-8 text-xs font-semibold px-2">
                                        {showLocalStops ? 'Hide' : 'Show All'}
                                    </Button>
                                </div>

                                <div className="grid gap-3">
                                    {(showLocalStops ? nearbyBusinesses : nearbyBusinesses.slice(0, 2)).map(biz => (
                                        <div key={biz.id} className="flex gap-4 p-3 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50 rounded-2xl hover:shadow-md transition-all group">
                                            <div className="w-16 h-16 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 overflow-hidden flex-shrink-0 relative shadow-sm ring-1 ring-amber-500/20">
                                                {biz.image && typeof biz.image === 'string' && biz.image.length > 0 && !biz.image.includes('undefined') && !biz.image.includes('/images/shops/') ? (
                                                    <img src={biz.image} alt={biz.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                                ) : (
                                                    <Star className="w-6 h-6 m-auto text-amber-400 drop-shadow-sm h-full animate-in zoom-in duration-500 delay-100" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                <h4 className="font-semibold text-sm line-clamp-1">{biz.name}</h4>
                                                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{biz.description}</p>
                                                {biz.recommendedItem && (
                                                    <span className="text-[10px] text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full inline-flex w-fit mt-1.5 font-medium">
                                                        ⭐ {biz.recommendedItem}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center mr-1">
                                                <Button
                                                    size="icon"
                                                    variant="secondary"
                                                    className="w-8 h-8 rounded-full bg-white dark:bg-black shadow-sm text-amber-600 hover:bg-amber-600 hover:text-white transition-colors"
                                                    onClick={() => handleAddStop(convertBusinessToLocation(biz))}
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Start Navigation Action */}
                        <div className="pt-6 pb-2">
                            <Button
                                className="w-full h-14 rounded-2xl text-base font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95"
                                disabled={!userLocation || !selectedDestination}
                                onClick={() => {
                                    if (!userLocation || !selectedDestination) return;
                                    const origin = `${userLocation.lat},${userLocation.lng}`;
                                    const dest = selectedDestination.coords;
                                    const waypoints = stops
                                        .filter(s => selectedStopIds.has(s.id))
                                        .slice(0, 8)
                                        .map(s => s.coords.replace(/\s/g, ''))
                                        .join('|');

                                    let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}&travelmode=driving`;
                                    if (waypoints) url += `&waypoints=${waypoints}`;
                                    window.open(url, '_blank');
                                }}
                            >
                                <Navigation className="w-5 h-5 mr-2" />
                                เริ่มนำทางไปยังปลายทาง ({selectedStopIds.size} stops)
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Alternatives Dialog */}
            <Dialog open={suggestionModalOpen} onOpenChange={setSuggestionModalOpen}>
                <DialogContent className="rounded-2xl border-none shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl">แนะนำสถานที่ทางเลือก</DialogTitle>
                        <DialogDescription className="text-base text-muted-foreground pt-2">
                            สถานที่ <span className="font-semibold text-foreground">"{targetStopForSwap?.name}"</span> คนหนาแน่นมาก ลองไปที่เหล่านี้แทนไหม?
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-3 mt-4">
                        {alternatives.length > 0 ? alternatives.map(alt => (
                            <div key={alt.id} className="flex gap-4 p-3 rounded-2xl border hover:bg-muted/50 transition-colors">
                                <div className="w-20 h-20 rounded-xl bg-muted overflow-hidden flex-shrink-0">
                                    {alt.image ? <img src={alt.image} alt={alt.name} className="w-full h-full object-cover" /> : <MapPin className="w-8 h-8 m-auto text-muted-foreground/30 h-full" />}
                                </div>
                                <div className="flex-1 flex flex-col justify-center">
                                    <h4 className="font-semibold">{alt.name}</h4>
                                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mt-1 bg-green-500/10 text-green-700 w-fit px-2 py-0.5 rounded-sm">
                                        คนน้อยกว่า • ห่างออกไป {alt.distance.toFixed(1)} กม.
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <Button size="sm" variant="default" className="h-8 rounded-lg flex-1" onClick={() => handleSwapStop(alt)}>
                                            <ArrowLeftRight className="w-3 h-3 mr-1.5" /> เปลี่ยน
                                        </Button>
                                        <Button size="sm" variant="outline" className="h-8 rounded-lg px-3" onClick={() => handleAddStop(alt)}>
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-2xl">
                                ไม่พบสถานที่ทางเลือกในบริเวณใกล้เคียง
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
