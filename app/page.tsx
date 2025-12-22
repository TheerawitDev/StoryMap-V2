"use client";

import { useStore } from "@/store/useStore";
import { SeriesCard } from "@/components/SeriesCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { useEffect } from "react";

export default function Home() {
  const { series, fetchData, isLoading, error } = useStore();

  useEffect(() => {
    if (series.length === 0) {
      fetchData();
    }
  }, [fetchData, series.length]);

  const trendingSeries = series.filter(s => s.isTrending).slice(0, 5);

  if (isLoading) return <div className="p-20 text-center text-lg">Loading Series Data...</div>;
  if (error) return <div className="p-20 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden py-20 md:py-0">
        <div className="container px-4 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 tracking-tight">
            ตามรอยฉากโปรดของคุณไป<br />
            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              ยังโลเคชันจริง
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            ค้นพบสถานที่ถ่ายทำซีรีส์และภาพยนตร์ไทยที่คุณชื่นชอบ แล้วออกเดินทางไปสัมผัสบรรยากาศจริง
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/explore">
              <Button size="lg" className="rounded-full px-8 text-lg shadow-lg shadow-blue-500/20">
                เริ่มสำรวจเลย
              </Button>
            </Link>
          </div>
        </div>

        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] bg-indigo-200/30 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Statistics / Features */}
      <section className="container mx-auto px-4 -mt-16 z-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 text-center">
            <h3 className="text-4xl font-bold text-primary mb-2">30+</h3>
            <p className="text-gray-500 font-medium">ซีรีส์ยอดนิยม</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 text-center">
            <h3 className="text-4xl font-bold text-primary mb-2">100+</h3>
            <p className="text-gray-500 font-medium">สถานที่ถ่ายทำ</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 text-center">
            <h3 className="text-4xl font-bold text-primary mb-2">3</h3>
            <p className="text-gray-500 font-medium">จังหวัดยอดฮิต</p>
          </div>
        </div>
      </section>

      {/* Trending Series */}
      <section className="container mx-auto px-4 mt-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">ซีรีส์ยอดนิยม</h2>
            <p className="text-gray-500">เรื่องราวที่ทุกคนกำลังพูดถึงในขณะนี้</p>
          </div>
          <Link href="/explore" className="text-primary font-medium hover:underline flex items-center gap-1 group">
            ดูทั้งหมด <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {trendingSeries.map((s) => (
            <SeriesCard key={s.id} series={s} />
          ))}
        </div>
      </section>

      {/* Featured Locations Preview */}
      <section className="container mx-auto px-4 mt-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">สถานที่ไฮไลท์</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:h-[400px]">
          <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-[300px] md:h-full">
            <Image
              src="/images/wat-chaiwatthanaram.jpg"
              alt="Ayutthaya"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">อยุธยา (Ayutthaya)</h3>
              <p className="text-gray-200">ตามรอยบุพเพสันนิวาสและพรหมลิขิต ย้อนเวลาสู่อดีตที่งดงาม</p>
            </div>
          </div>
          <div className="grid grid-rows-2 gap-6 h-[400px] md:h-full">
            <div className="relative rounded-2xl overflow-hidden cursor-pointer group">
              <Image
                src="/images/phuket-old-town.jpg"
                alt="Phuket"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-6 text-white">
                <h3 className="text-xl font-bold">ภูเก็ต (Phuket)</h3>
                <p className="text-sm text-gray-200">แปลรักฉันด้วยใจเธอ</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden cursor-pointer group">
              <Image
                src="/images/bangkok-city.jpg"
                alt="Bangkok"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-6 text-white">
                <h3 className="text-xl font-bold">กรุงเทพฯ (Bangkok)</h3>
                <p className="text-sm text-gray-200">หลานม่า & Hunger</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
