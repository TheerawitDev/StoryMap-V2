
"use client";

import { Button } from "@/components/ui/button";
import { User, MapPin, CheckCircle, Settings, LogOut } from "lucide-react";

export default function ProfilePage() {
    // Mock Data for Profile
    const stats = {
        visited: 2,
        saved: 1,
        total: 64,
        progress: 3.1
    };

    const visitedLocations = [
        { id: 1002, name: "วัดพุทไธศวรรย์", series: "บุพเพสันนิวาส (Love Destiny)", rating: 5 },
        { id: 2002, name: "ตลาดน้อย - ชุมชนจีนเก่า", series: "สี่แผ่นดิน", rating: 5 }
    ];

    const savedLocations = [
        { id: 29003, name: "โจ้ก อาม่า", series: "หลานม่า" }
    ];


    return (
        <div className="bg-gray-50 min-h-screen pb-20 pt-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">โปรไฟล์ของคุณ</h1>

                {/* Profile Header Card */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border mb-8">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-primary">
                            <User className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">ผู้เยี่ยมชม</h2>
                            <p className="text-sm text-gray-500">ข้อมูลจัดเก็บในเครื่อง (Local Storage)</p>
                        </div>
                        <div className="ml-auto flex gap-2">
                            <Button variant="outline" size="icon">
                                <Settings className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                <LogOut className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    <h3 className="font-bold text-gray-900 mb-4">ภาพรวมความคืบหน้า</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-50 p-6 rounded-xl text-center border border-blue-100">
                            <div className="text-3xl font-bold text-primary mb-1">{stats.visited}</div>
                            <div className="text-sm text-gray-600 font-medium">สถานที่ที่เยี่ยมชมแล้ว</div>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-xl text-center border border-blue-100">
                            <div className="text-3xl font-bold text-primary mb-1">{stats.saved}</div>
                            <div className="text-sm text-gray-600 font-medium">บันทึกส่วนตัว</div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl text-center border border-gray-200">
                            <div className="text-3xl font-bold text-gray-700 mb-1">{stats.total}</div>
                            <div className="text-sm text-gray-600 font-medium">สถานที่ทั้งหมด</div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative pt-1">
                        <div className="overflow-hidden h-2 mb-2 text-xs flex rounded bg-blue-200">
                            <div style={{ width: "3.1%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
                        </div>
                        <div className="text-center text-xs text-primary font-bold">ความคืบหน้ารวม: 3.1%</div>
                    </div>
                </div>

                {/* Visited Section */}
                <h2 className="text-xl font-bold text-gray-900 mb-4">สถานที่ที่เยี่ยมชมแล้ว ({stats.visited})</h2>
                <div className="space-y-4 mb-8">
                    {visitedLocations.map((loc) => (
                        <div key={loc.id} className="bg-white p-4 rounded-xl border flex items-center justify-between shadow-sm">
                            <div>
                                <h4 className="font-bold text-gray-900">{loc.name}</h4>
                                <p className="text-xs text-gray-500">จาก: {loc.series}</p>
                            </div>
                            <div className="flex items-center gap-1 text-yellow-500">
                                <span className="text-sm font-bold">★ {loc.rating}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Saved Section */}
                <h2 className="text-xl font-bold text-gray-900 mb-4">สถานที่ที่พร้อมบันทึกส่วนตัว ({stats.saved})</h2>
                <div className="space-y-4">
                    {savedLocations.map((loc) => (
                        <div key={loc.id} className="bg-white p-4 rounded-xl border shadow-sm">
                            <div className="mb-2">
                                <h4 className="font-bold text-gray-900">{loc.name}</h4>
                                <p className="text-xs text-gray-500">จาก: {loc.series}</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-500 italic border border-gray-100">
                                " hello world "
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
