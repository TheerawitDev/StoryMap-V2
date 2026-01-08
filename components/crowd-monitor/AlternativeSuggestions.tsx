"use client";

import { ArrowRight, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocationData } from "./LocationStatusCard";
import { Card, CardContent } from "@/components/ui/card";

interface AlternativeSuggestionsProps {
    currentLocation: LocationData;
    alternatives: LocationData[];
    onSelect: (location: LocationData) => void;
}

export function AlternativeSuggestions({ currentLocation, alternatives, onSelect }: AlternativeSuggestionsProps) {
    if (alternatives.length === 0) return null;

    return (
        <div className="mt-4 space-y-4 animate-in slide-in-from-bottom-5 duration-500 fade-in">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-primary">✨ ทางเลือกแนะนำ (Smart Alternatives)</h3>
                <span className="text-sm text-muted-foreground">ใกล้เคียง & คนน้อยกว่า</span>
            </div>

            <div className="grid gap-3">
                {alternatives.map((alt) => (
                    <Card key={alt.id} className="overflow-hidden hover:bg-accent/50 transition-colors border-dashed border-primary/20">
                        <CardContent className="p-3 flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden flex-shrink-0 relative">
                                {alt.image ? (
                                    <img src={alt.image} alt={alt.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-primary/10">
                                        <Map className="w-5 h-5 text-primary" />
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm truncate">{alt.name}</h4>
                                <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                                    คนน้อยกว่า {(currentLocation.visitorCount - alt.visitorCount)} คน
                                </p>
                            </div>

                            <Button size="sm" variant="ghost" onClick={() => onSelect(alt)}>
                                ไปที่นี่ <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
