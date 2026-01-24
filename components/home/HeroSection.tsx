import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";


interface HeroStats {
    seriesCount: number;
    locationCount: number;
    userCount: number;
}

export function HeroSection({ stats }: { stats: HeroStats }) {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Image / Gradient */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/bk2.jpg"
                    alt="Thailand Travel"
                    fill
                    className="object-cover opacity-20"
                    priority
                    quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
            </div>

            {/* Floating Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="container px-4 z-10 pt-20">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="inline-block animate-fade-in-up">
                        <span className="px-4 py-2 rounded-full bg-blue-50 text-primary text-sm font-semibold tracking-wide border border-blue-100 shadow-sm">
                            ✈️ ท่องเที่ยวตามรอยซีรีส์ไทย
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] animate-fade-in-up delay-100">
                        เปลี่ยนฉากประทับใจ<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-primary">
                            ให้กลายเป็นการเดินทาง
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
                        ค้นพบสถานที่ถ่ายทำจากซีรีส์เรื่องโปรด ปักหมุดพิกัด แล้วออกเดินทางไปสัมผัสบรรยากาศจริงที่ไม่ได้มีแค่ในจอ
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-up delay-300">
                        <Link href="/explore">
                            <Button size="lg" className="h-14 px-8 rounded-full text-lg shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-1">
                                เริ่มสำรวจสถานที่ <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-lg bg-white/50 backdrop-blur-sm border-gray-200 hover:bg-white hover:border-gray-300 transition-all">
                                รู้จัก StoryMap
                            </Button>
                        </Link>
                    </div>

                    {/* Stats Check */}
                    <div className="pt-12 grid grid-cols-3 divide-x divide-gray-200/50 animate-fade-in-up delay-400">
                        <div>
                            <div className="text-3xl font-bold text-gray-900">{stats.seriesCount}+</div>
                            <div className="text-sm text-gray-500 mt-1">ซีรีส์ยอดฮิต</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-gray-900">{stats.locationCount}+</div>
                            <div className="text-sm text-gray-500 mt-1">พิกัดสถานที่</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-gray-900">{stats.userCount > 1000 ? (stats.userCount / 1000).toFixed(0) + 'k' : stats.userCount}+</div>
                            <div className="text-sm text-gray-500 mt-1">นักเดินทาง</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
