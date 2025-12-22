
"use client";

import { useStore } from "@/store/useStore";
import { SeriesCard } from "@/components/SeriesCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

import { useEffect } from "react";

export default function ExplorePage() {
    const { series, fetchData } = useStore();

    useEffect(() => {
        if (series.length === 0) {
            fetchData();
        }
    }, [fetchData, series.length]);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredSeries = series.filter(s =>
        s.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-gray-50 min-h-screen pb-20 pt-8">
            <div className="container mx-auto px-4">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">สำรวจ (Explore)</h1>
                        <p className="text-gray-500">ค้นหาซีรีส์ที่ใช่ แล้วไปให้ถึงที่</p>
                    </div>

                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="ค้นหาชื่อซีรีส์..."
                            className="pl-9 bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {filteredSeries.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredSeries.map((s) => (
                            <SeriesCard key={s.id} series={s} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">ไม่พบซีรีส์ที่คุณค้นหา</p>
                        <p className="text-sm text-gray-400">ลองใช้คำค้นหาอื่น</p>
                    </div>
                )}

            </div>
        </div>
    );
}
