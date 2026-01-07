import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HighlightsSection() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">ไฮไลท์สัปดาห์นี้</h2>

                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
                    {/* Main Highlight */}
                    <Link href="/series/1" className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group cursor-pointer h-[300px] md:h-full block shadow-lg">
                        <Image
                            src="/images/wat-chaiwatthanaram.jpg"
                            alt="Ayutthaya"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90"></div>
                        <div className="absolute bottom-0 left-0 p-8 text-white transform transition-transform group-hover:translate-y-[-8px]">
                            <span className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full mb-3">แนะนำ</span>
                            <h3 className="text-3xl font-bold mb-2">อยุธยา (Ayutthaya)</h3>
                            <p className="text-gray-200 line-clamp-2">ตามรอยบุพเพสันนิวาสและพรหมลิขิต ย้อนเวลาสู่อดีตที่งดงามและทรงคุณค่า</p>
                        </div>
                    </Link>

                    {/* Secondary Highlight 1 */}
                    <Link href="/series/13" className="md:col-span-2 relative rounded-3xl overflow-hidden cursor-pointer group block h-[250px] md:h-full shadow-lg">
                        <Image
                            src="/images/phuket-old-town.jpg"
                            alt="Phuket"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
                        <div className="absolute bottom-6 left-6 text-white transform transition-transform group-hover:translate-y-[-4px]">
                            <h3 className="text-2xl font-bold mb-1">ภูเก็ต (Phuket)</h3>
                            <p className="text-sm text-gray-200">แปลรักฉันด้วยใจเธอ</p>
                        </div>
                    </Link>

                    {/* Secondary Highlight 2 */}
                    <Link href="/series/0" className="md:col-span-1 relative rounded-3xl overflow-hidden cursor-pointer group block h-[200px] md:h-full shadow-lg">
                        <Image
                            src="/images/bangkok-city.jpg"
                            alt="Bangkok"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="text-lg font-bold">กรุงเทพฯ</h3>
                            <p className="text-xs text-gray-200">เมืองหลวงที่ไม่เคยหลับใหล</p>
                        </div>
                    </Link>

                    {/* Secondary Highlight 3 */}
                    <div className="md:col-span-1 bg-gradient-to-br from-primary to-blue-600 rounded-3xl p-6 text-white text-center flex flex-col items-center justify-center relative overflow-hidden group shadow-lg">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-4">ยังมีอีกเพียบ!</h3>
                            <p className="text-blue-100 text-sm mb-6">ค้นพบสถานที่มากกว่า 100+ แห่งทั่วไทย</p>
                            <Link href="/places">
                                <Button variant="secondary" className="rounded-full w-full bg-white text-primary hover:bg-blue-50">
                                    ดูทั้งหมด
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
