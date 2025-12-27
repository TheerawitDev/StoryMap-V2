
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Upload, Loader2, ArrowLeft, Search } from "lucide-react";
import { ImageUpload } from "@/components/ImageUpload";
import dynamic from "next/dynamic";
import { LatLngTuple } from "leaflet";
import Link from "next/link";
// Dynamic import for Map to avoid SSR issues
const Map = dynamic(
    async () => {
        const L = (await import("leaflet")).default;
        const { MapContainer, TileLayer, Marker, useMapEvents, useMap } = await import("react-leaflet");

        // Component to handle map clicks
        const LocationPicker = ({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) => {
            useMapEvents({
                click(e) {
                    onLocationSelect(e.latlng.lat, e.latlng.lng);
                },
            });
            return null;
        };

        // Component to update map center when props change
        const UpdateMapCenter = ({ center }: { center: LatLngTuple | null }) => {
            const map = useMap();
            useEffect(() => {
                if (center) {
                    map.flyTo(center, 16);
                }
            }, [center, map]);
            return null;
        };

        return function MapPicker({ selectedPos, onSelect }: { selectedPos: LatLngTuple | null, onSelect: (lat: number, lng: number) => void }) {
            return (
                <MapContainer center={[13.7563, 100.5018]} zoom={10} className="w-full h-full rounded-md z-0">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationPicker onLocationSelect={onSelect} />
                    <UpdateMapCenter center={selectedPos} />
                    {selectedPos && <Marker position={selectedPos} icon={L.icon({
                        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41]
                    })} />}
                </MapContainer>
            );
        };
    },
    { ssr: false, loading: () => <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">Loading Map...</div> }
);

export default function SubmitLocationPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { series } = useStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [name, setName] = useState("");
    const [seriesId, setSeriesId] = useState("");
    const [scene, setScene] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [coords, setCoords] = useState<LatLngTuple | null>(null);

    // Search State
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    // Redirect if not authenticated
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login?callbackUrl=/submit");
        }
    }, [status, router]);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        setIsSearching(true);
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
            const data = await response.json();
            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                const newLat = parseFloat(lat);
                const newLng = parseFloat(lon);
                setCoords([newLat, newLng]);
            } else {
                alert("ไม่พบสถานที่ที่ค้นหา");
            }
        } catch (error) {
            console.error("Search error:", error);
            alert("เกิดข้อผิดพลาดในการค้นหา");
        } finally {
            setIsSearching(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !seriesId || !coords) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน (ชื่อ, ซีรีส์, และพิกัด)");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/locations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    seriesId,
                    scene,
                    description,
                    image: imageUrl || "/images/placeholder.jpg",
                    coords: `${coords[0]}, ${coords[1]}`
                }),
            });

            if (!res.ok) throw new Error("Submission failed");

            // Success
            alert("บันทึกข้อมูลสำเร็จ!");
            router.push("/explore");
            // Optionally trigger a re-fetch of store data here if needed, 
            // but the Explore page might re-mount or store might need a manual refresh action.
            // For now, simpler flow.
        } catch (error) {
            console.error(error);
            alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (status === "loading") return <div className="p-20 text-center">Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link href="/" className="inline-flex items-center text-gray-500 hover:text-primary mb-6">
                <ArrowLeft className="w-4 h-4 mr-1" /> กลับหน้าหลัก
            </Link>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">เพิ่มสถานที่ใหม่ (Submit Location)</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div>
                                <Label>ชื่อสถานที่ (Location Name) *</Label>
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="เช่น ตลาดพลู"
                                    required
                                />
                            </div>

                            <div>
                                <Label>จากซีรีส์เรื่อง (Series) *</Label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={seriesId}
                                    onChange={(e) => setSeriesId(e.target.value)}
                                    required
                                >
                                    <option value="">-- เลือกซีรีส์ --</option>
                                    {series.map((s) => (
                                        // Using realId if available, or finding original ID
                                        <option key={s.id} value={s.id}>
                                            {s.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <Label>ชื่อฉาก (Scene Name)</Label>
                                <Input
                                    value={scene}
                                    onChange={(e) => setScene(e.target.value)}
                                    placeholder="เช่น ฉากสารภาพรัก"
                                />
                            </div>

                            <div>
                                <Label>รายละเอียด (Description)</Label>
                                <Textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="เล่ารายละเอียดเกี่ยวกับสถานที่นี้ในซีรีส์..."
                                />
                            </div>


                            <div>
                                <ImageUpload
                                    label="รูปภาพสถานที่ (Location Image)"
                                    value={imageUrl}
                                    onChange={setImageUrl}
                                />
                            </div>
                        </div>


                        {/* Map Picker */}
                        <div className="space-y-4 flex flex-col">
                            <Label>ปักหมุดตำแหน่ง (Pin Location) *</Label>

                            {/* Search Box */}
                            <div className="flex gap-2 mb-2">
                                <Input
                                    placeholder="ค้นหาสถานที่... (เช่น Siam Paragon)"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleSearch();
                                        }
                                    }}
                                />
                                <Button type="button" variant="outline" onClick={handleSearch} disabled={isSearching}>
                                    {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                                </Button>
                            </div>

                            <div className="h-[400px] border rounded-md relative overflow-hidden">
                                <Map
                                    selectedPos={coords}
                                    onSelect={(lat, lng) => setCoords([lat, lng])}
                                />
                                {!coords && (
                                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-black/5 z-[1000]">
                                        <span className="bg-white px-3 py-1 rounded shadow text-sm">คลิกบนแผนที่เพื่อเลือกตำแหน่ง</span>
                                    </div>
                                )}
                            </div>
                            {coords && (
                                <p className="text-sm text-gray-500 text-right">
                                    พิกัด: {coords[0].toFixed(5)}, {coords[1].toFixed(5)}
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-2 pt-4 border-t flex justify-end">
                            <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto min-w-[150px]">
                                {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> กำลังบันทึก...</> : "บันทึกข้อมูล"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div >
    );
}
