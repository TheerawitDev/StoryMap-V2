
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings, LogOut, MapPin, Plus, Film } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AchievementsList } from "@/components/AchievementsList";
import { VisitedCount } from "@/components/VisitedCount";
// ...

export default async function ProfilePage() {
    const session = await auth();

    if (!session || !session.user?.email) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            locations: {
                orderBy: { createdAt: 'desc' },
                include: { series: true }
            }
        }
    });

    if (!user) {
        return <div>User not found</div>;
    }

    const createdLocations = user.locations;

    return (
        <div className="bg-gray-50 min-h-screen pb-20 pt-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">โปรไฟล์ของคุณ</h1>

                {/* Profile Header Card */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border mb-8">
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                        <div className="relative">
                            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                                <AvatarImage src={user.image || ""} alt={user.name || ""} />
                                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                                    {user.name?.charAt(0).toUpperCase() || "U"}
                                </AvatarFallback>
                            </Avatar>
                        </div>

                        <div className="text-center md:text-left flex-1">
                            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                            <p className="text-gray-500">{user.email}</p>
                            <div className="mt-2 flex items-center justify-center md:justify-start gap-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    สมาชิกทั่วไป
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Link href="/submit-series">
                                <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
                                    <Film className="w-4 h-4" /> เพิ่มซีรีส์
                                </Button>
                            </Link>
                            <Link href="/submit">
                                <Button className="gap-2">
                                    <Plus className="w-4 h-4" /> เพิ่มสถานที่
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-6 rounded-xl text-center border border-blue-100">
                            <div className="text-3xl font-bold text-primary mb-1">{createdLocations.length}</div>
                            <div className="text-sm text-gray-600 font-medium">สถานที่ที่แนะนำ (Submitted)</div>
                        </div>
                        <div className="bg-green-50 p-6 rounded-xl text-center border border-green-100">
                            <VisitedCount />
                        </div>
                    </div>
                </div>

                {/* Achievements Section */}
                <div className="mb-12">
                    <AchievementsList />
                </div>

                {/* Submitted Locations Section */}
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    สถานที่ที่คุณแนะนำ ({createdLocations.length})
                </h2>

                {createdLocations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {createdLocations.map((loc) => (
                            <div key={loc.id} className="bg-white p-4 rounded-xl border shadow-sm flex gap-4 hover:shadow-md transition-shadow">
                                <div className="w-24 h-24 bg-gray-100 rounded-lg shrink-0 relative overflow-hidden">
                                    <Image
                                        src={loc.image || "/images/placeholder.jpg"}
                                        alt={loc.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-gray-900 truncate">{loc.name}</h4>
                                    <p className="text-xs text-primary font-medium mb-1 truncate">{loc.series.title}</p>
                                    <p className="text-xs text-gray-500 line-clamp-2">{loc.description}</p>

                                    <div className="mt-2 flex items-center gap-2">
                                        <Link href={`/explore?seriesId=${loc.seriesId}`} className="text-xs text-gray-400 hover:text-primary hover:underline">
                                            ดูในแผนที่
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
                        <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                            <MapPin className="w-6 h-6 text-gray-400" />
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1">ยังไม่มีสถานที่ที่แนะนำ</h3>
                        <p className="text-gray-500 text-sm mb-4">คุณรูจักสถานที่ถ่ายทำเจ๋งๆ ไหม? แชร์ให้เพื่อนๆ รู้สิ!</p>
                        <Link href="/submit">
                            <Button variant="outline">เริ่มแบ่งปันสถานที่</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
