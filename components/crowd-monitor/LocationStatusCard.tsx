"use client";

import { Users, MapPin, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface LocationData {
    id: number;
    name: string;
    visitorCount: number;
    capacity: number;
    image?: string | null;
    coords: string;
}

interface LocationStatusCardProps {
    location: LocationData;
    onClick: (location: LocationData) => void;
}

export function LocationStatusCard({ location, onClick }: LocationStatusCardProps) {
    const density = location.visitorCount / location.capacity;

    let statusColor = "bg-green-500";
    let statusText = "ว่าง (Not Busy)";
    let statusBg = "bg-green-500/10";
    let statusBorder = "border-green-500/20";

    if (density > 0.8) {
        statusColor = "bg-red-500";
        statusText = "หนาแน่นมาก (Very Crowded)";
        statusBg = "bg-red-500/10";
        statusBorder = "border-red-500/20";
    } else if (density > 0.5) {
        statusColor = "bg-yellow-500";
        statusText = "ปานกลาง (Moderate)";
        statusBg = "bg-yellow-500/10";
        statusBorder = "border-yellow-500/20";
    }

    return (
        <Card
            className={cn(
                "cursor-pointer transition-all hover:shadow-md active:scale-95 border-l-4 overflow-hidden",
                statusBorder
            )}
            style={{ borderLeftColor: density > 0.8 ? '#ef4444' : density > 0.5 ? '#eab308' : '#22c55e' }}
            onClick={() => onClick(location)}
        >
            <div className="flex flex-row h-full">
                {/* Image / Icon Section */}
                <div className="w-24 h-auto relative bg-muted self-stretch flex-shrink-0">
                    {location.image ? (
                        <img src={location.image} alt={location.name} className="w-full h-full object-cover absolute inset-0" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-zinc-800">
                            <MapPin className="w-8 h-8 text-gray-400" />
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="flex-1 p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-lg line-clamp-1">{location.name}</h3>
                        {density > 0.8 && (
                            <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse flex-shrink-0" />
                        )}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                        <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", "font-normal border-0", statusBg, density > 0.8 ? "text-red-700 dark:text-red-400" : density > 0.5 ? "text-yellow-700 dark:text-yellow-400" : "text-green-700 dark:text-green-400")}>
                            {statusText}
                        </span>
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="w-4 h-4 mr-1.5" />
                        <span className="font-medium text-foreground">{location.visitorCount}</span>
                        <span className="mx-1">/</span>
                        <span>{location.capacity} คน (visitors)</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}
