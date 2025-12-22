
"use client";

import { Location } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { CheckCircle, MapPin, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";

interface LocationCardProps {
    location: Location;
    seriesTitle: string;
}

export function LocationCard({ location, seriesTitle }: LocationCardProps) {
    const [visited, setVisited] = useState(false);

    return (
        <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Image */}
                <div className="w-full md:w-48 h-48 md:h-auto bg-gray-100 rounded-lg shrink-0 relative overflow-hidden">
                    <Image
                        src={location.image}
                        alt={location.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 200px"
                    />
                </div>

                <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900">{location.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">จาก: <span className="text-primary font-medium">{seriesTitle}</span></p>

                    {location.isMajor && (
                        <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 inline-block">
                            MAJOR LOCATION
                        </span>
                    )}

                    <p className="text-sm text-gray-600 mb-4 bg-gray-50 p-2 rounded-lg border border-gray-100">
                        "{location.scene}" <br />
                        <span className="text-xs text-gray-400 mt-1 block">{location.description}</span>
                    </p>

                    <div className="flex items-center gap-2 mt-auto">
                        <Button
                            variant={visited ? "default" : "outline"}
                            size="sm"
                            className={cn("gap-2", visited && "bg-green-600 hover:bg-green-700 border-green-600")}
                            onClick={() => setVisited(!visited)}
                        >
                            <CheckCircle className="w-4 h-4" />
                            {visited ? "เยี่ยมชมแล้ว (Visited)" : "เช็คอิน (Check In)"}
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            className="ml-auto text-gray-500 hover:text-primary"
                            onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${location.coords}`, '_blank')}
                        >
                            <Navigation className="w-4 h-4 mr-1" />
                            นำทาง
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
