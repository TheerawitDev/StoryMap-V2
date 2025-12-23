
"use client";

import { useStore } from "@/store/useStore";
import { LocationCard } from "@/components/LocationCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";

export default function PlacesPage() {
    const { locations, series, fetchData } = useStore();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (locations.length === 0 || series.length === 0) {
            fetchData();
        }
    }, [fetchData, locations.length, series.length]);

    const filteredLocations = locations.filter(l =>
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.scene.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getSeriesTitle = (seriesId: number) => {
        return series.find(s => s.id === seriesId)?.title || "Unknown Series";
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-20 pt-8">
            <div className="container mx-auto px-4">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">สถานที่ทั้งหมด (All Places)</h1>
                        <p className="text-gray-500">ค้นหาสถานที่ถ่ายทำที่คุณสนใจ</p>
                    </div>

                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="ค้นหาสถานที่..."
                            className="pl-9 bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {filteredLocations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredLocations.map((loc) => (
                            <LocationCard
                                key={loc.id}
                                location={loc}
                                seriesTitle={getSeriesTitle(loc.seriesId)}
                                layout="vertical"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">ไม่พบสถานที่ที่คุณค้นหา</p>
                    </div>
                )}

            </div>
        </div>
    );
}
