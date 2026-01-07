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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image / Gradient */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/wat-chaiwatthanaram.jpg"
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
                <div className="text-3xl font-bold text-gray-900">30+</div>
                <div className="text-sm text-gray-500 mt-1">ซีรีส์ยอดฮิต</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">100+</div>
                <div className="text-sm text-gray-500 mt-1">พิกัดสถานที่</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">10k+</div>
                <div className="text-sm text-gray-500 mt-1">นักเดินทาง</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative z-10">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">ทำไมต้อง StoryMap?</h2>
            <p className="text-lg text-gray-600">เราช่วยให้การตามรอยซีรีส์ของคุณง่ายและสนุกกว่าเดิม ด้วยฟีเจอร์ที่ออกแบบมาเพื่อแฟนคลับโดยเฉพาะ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">พิกัดแม่นยำ</h3>
              <p className="text-gray-500 leading-relaxed">
                ไม่ต้องงมหาเอง เราปักหมุดตำแหน่งที่ถ่ายทำจริงไว้ให้แม่นยำ พร้อมการนำทางผ่าน Google Maps
              </p>
            </div>
            <div className="group p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">ข้อมูลเชิงลึก</h3>
              <p className="text-gray-500 leading-relaxed">
                รู้ลึกถึงฉากประทับใจ เบื้องหลังการถ่ายทำ และเกร็ดความรู้ของสถานที่นั้นๆ ที่คุณอาจไม่เคยรู้มาก่อน
              </p>
            </div>
            <div className="group p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" x2="20" y1="8" y2="14" /><line x1="23" x2="17" y1="11" y2="11" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">ชุมชนคนรักซีรีส์</h3>
              <p className="text-gray-500 leading-relaxed">
                แลกเปลี่ยนรูปภาพ รีวิว และความประทับใจกับเพื่อนๆ ที่มีความชอบเดียวกันจากทั่วทุกมุมโลก
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Series */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">Most Popular</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">ซีรีส์ยอดนิยมประจำสัปดาห์</h2>
            </div>
            <Link href="/explore" className="text-gray-600 hover:text-primary font-medium hover:underline flex items-center gap-2 group transition-colors">
              ดูทั้งหมด <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {trendingSeries.map((s) => (
              <SeriesCard key={s.id} series={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Locations (Bento Grid) */}
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

      {/* Call to Action */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-900 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Footer BG"
            fill
            className="object-cover opacity-10 mix-blend-overlay"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">พร้อมออกเดินทางแล้วหรือยัง?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            เข้าร่วมคอมมูนิตี้ StoryMap วันนี้ แล้วเริ่มบันทึกความทรงจำการเดินทางของคุณ
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="h-14 px-10 rounded-full text-lg font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25">
                สมัครสมาชิกฟรี
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="h-14 px-10 rounded-full text-lg font-semibold bg-transparent border-white/20 text-white hover:bg-white/10">
                เข้าสู่ระบบ
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
