
"use client";

import { useStore } from "@/store/useStore";
import { LocationCard } from "@/components/LocationCard";
import MapWithNoSSR from "@/components/MapWithNoSSR";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, Film } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SeriesDetailPage() {
    const params = useParams();
    const { series, getLocationsBySeries, fetchData, visitedLocations } = useStore();
    // Derived state
    const id = params.id ? parseInt(params.id as string) : null;
    const activeSeries = id ? series.find(item => item.id === id) : null;
    const locations = id ? getLocationsBySeries(id) : [];

    useEffect(() => {
        if (series.length === 0) {
            fetchData();
        }
    }, [series.length, fetchData]);



    if (!activeSeries) {
        return <div className="p-20 text-center">Loading or Series Not Found...</div>;
    }

    // Calculate center for map based on first location
    const firstLoc = locations[0];
    const mapCenter = firstLoc
        ? firstLoc.coords.split(",").map((c: string) => parseFloat(c.trim())) as [number, number]
        : [13.7563, 100.5018] as [number, number];

    // Calculate progress
    const visitedCount = locations.filter(l => visitedLocations.includes(l.id)).length;
    const progressPercentage = locations.length > 0 ? (visitedCount / locations.length) * 100 : 0;

    const handleShare = async () => {
        const shareData = {
            title: activeSeries.title,
            text: `Check out ${activeSeries.title} on StoryMap!`,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                alert("ลิงก์ถูกคัดลอกไปยังคลิปบอร์ดแล้ว (Link copied to clipboard)!");
            } catch (err) {
                console.error("Failed to copy:", err);
            }
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    กลับสู่หน้าสำรวจซีรีส์
                </Link>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    {/* Sidebar / Info Column */}
                    <div className="xl:col-span-4 space-y-6">
                        {/* Series Main Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border">
                            <div className="aspect-[2/3] w-full bg-zinc-100 rounded-lg mb-6 relative overflow-hidden">
                                <Image
                                    src={activeSeries.poster}
                                    alt={activeSeries.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                {activeSeries.isTrending && (
                                    <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                                        TRENDING
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{activeSeries.title}</h1>
                            <p className="text-gray-600 leading-relaxed mb-6">{activeSeries.description}</p>

                            {/* Stats Card */}
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
                                <h3 className="font-bold text-primary mb-1">ความคืบหน้าของคุณ</h3>
                                <div className="flex items-center gap-2">
                                    <div className="text-2xl font-bold text-gray-900">{visitedCount} / {locations.length}</div>
                                    <div className="text-sm text-gray-500">สถานที่ที่เคยเยี่ยมชมแล้ว</div>
                                </div>
                                <div className="w-full bg-blue-200 h-2 rounded-full mt-3 overflow-hidden">
                                    <div
                                        className="bg-primary h-full transition-all duration-500"
                                        style={{ width: `${progressPercentage}%` }}
                                    ></div>
                                </div>
                            </div>

                            <Button className="w-full gap-2" variant="outline" onClick={handleShare}>
                                <Share2 className="w-4 h-4" />
                                แชร์ซีรีส์นี้
                            </Button>
                        </div>
                    </div>

                    {/* Main Content Column */}
                    <div className="xl:col-span-8 space-y-6">

                        {/* Map Section */}
                        <div className="bg-white p-1 rounded-2xl shadow-sm border h-[400px] overflow-hidden relative z-0">
                            <MapWithNoSSR
                                center={mapCenter}
                                zoom={activeSeries.totalLocations > 1 ? 10 : 13}
                                locations={locations}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">สถานที่ในซีรีส์นี้ ({locations.length})</h2>
                            <select className="bg-white border text-sm rounded-lg p-2 text-gray-600">
                                <option>เรียง: ชื่อ (ก-ฮ)</option>
                                <option>เรียง: ใกล้ฉัน</option>
                            </select>
                        </div>

                        {/* Locations Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {locations.map((loc: any) => (
                                <LocationCard key={loc.id} location={loc} seriesTitle={activeSeries.title} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
