
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SeriesCard } from "@/components/SeriesCard";
// We need to import the type. Assuming we can export it from useStore or define it here if strict.
// Ideally types should be in a separate file. For now I'll use `any` or try to import if possible, 
// but to avoid circular deps or client-side only code in types, I will define a local interface or import from useStore if it is safe.
// useStore likely has 'use client' or imports things that are client side? No, useStore.ts starts with imports.
// Let's check useStore content again. It imports `create` from zustand. It is not "use client" explicit but zustand is usually used in client.
// However, the *type* export is fine to use in server components.

import { Series } from "@/store/useStore";

interface TrendingSectionProps {
    series: Series[];
}

export function TrendingSection({ series }: TrendingSectionProps) {
    const trendingSeries = series.filter(s => s.isTrending).slice(0, 5);

    return (
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
    );
}
