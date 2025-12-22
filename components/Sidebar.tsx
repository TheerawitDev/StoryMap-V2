
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Map as MapIcon, User, Film, ChevronRight } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Sidebar() {
    const { series, selectedSeries, setSelectedSeries, locations, setSelectedLocation } = useStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState<"explore" | "map" | "profile">("explore");

    const filteredSeries = series.filter(s =>
        s.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSeriesClick = (s: typeof series[0]) => {
        setSelectedSeries(s);
        // Find first location of this series to zoom to
        const firstLoc = locations.find(l => l.seriesId === s.id);
        if (firstLoc) {
            setSelectedLocation(firstLoc);
        }
    };

    return (
        <div className="absolute transition-all duration-300 z-[1000] flex flex-col gap-4 p-4 border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl text-white overflow-hidden
            w-full h-[45vh] bottom-0 left-0 right-0 rounded-t-xl rounded-b-none border-b-0
            md:w-96 md:h-auto md:top-4 md:bottom-4 md:left-4 md:right-auto md:rounded-xl md:border-b"
        >

            {/* Header */}
            <div className="flex items-center gap-2 mb-2 shrink-0">
                <Film className="w-8 h-8 text-primary" />
                <h1 className="text-2xl font-bold tracking-tight">StoryMap</h1>
            </div>

            {/* Search */}
            <div className="relative shrink-0">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search series..."
                    className="pl-8 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-primary/50"
                />
            </div>

            {/* Tabs */}
            <nav className="flex gap-1 shrink-0 p-1 bg-white/5 rounded-lg">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("explore")}
                    className={cn("flex-1 text-xs", activeTab === "explore" ? "bg-primary text-white" : "text-gray-400 hover:text-white hover:bg-white/10")}
                >
                    Explore
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("map")}
                    className={cn("flex-1 text-xs", activeTab === "map" ? "bg-primary text-white" : "text-gray-400 hover:text-white hover:bg-white/10")}
                >
                    Map View
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("profile")}
                    className={cn("flex-1 text-xs", activeTab === "profile" ? "bg-primary text-white" : "text-gray-400 hover:text-white hover:bg-white/10")}
                >
                    Profile
                </Button>
            </nav>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 min-h-0 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">

                {activeTab === "explore" && (
                    <div className="flex flex-col gap-3">
                        {searchTerm === "" && (
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Trending Now</h3>
                        )}

                        {filteredSeries.map((s) => (
                            <div
                                key={s.id}
                                onClick={() => handleSeriesClick(s)}
                                className={cn(
                                    "group relative flex gap-3 p-3 rounded-xl border border-white/5 transition-all hover:bg-white/10 cursor-pointer overflow-hidden",
                                    selectedSeries?.id === s.id ? "bg-white/10 border-primary/50 ring-1 ring-primary/50" : "bg-black/20"
                                )}
                            >
                                {/* Poster Placeholder (Since we don't have real images yet) */}
                                <div className="w-16 h-24 shrink-0 rounded-lg bg-zinc-800 flex items-center justify-center overflow-hidden">
                                    <Film className="w-6 h-6 text-zinc-600" />
                                </div>

                                <div className="flex-1 min-w-0 flex flex-col justify-center">
                                    <h4 className="font-bold text-sm truncate leading-tight mb-1 group-hover:text-primary transition-colors">{s.title}</h4>
                                    <p className="text-xs text-gray-400 line-clamp-2 mb-2">{s.description}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300">
                                            {s.totalLocations} Locations
                                        </span>
                                        {s.isTrending && (
                                            <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded border border-red-500/20">
                                                Trending
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <ChevronRight className="w-5 h-5 text-gray-600 absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        ))}

                        {filteredSeries.length === 0 && (
                            <div className="text-center text-gray-500 py-10">
                                No series found by "{searchTerm}"
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Footer Status */}
            <div className="shrink-0 pt-3 border-t border-white/10 mx-1">
                <div className="flex justify-between items-center text-[10px] text-gray-500">
                    <span>{locations.length} Locations Mapped</span>
                    <span>v1.0.0</span>
                </div>
            </div>
        </div>
    );
}
