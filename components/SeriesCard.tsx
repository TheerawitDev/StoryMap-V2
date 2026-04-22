
"use client";

import Link from "next/link";
import { Film, MapPin } from "lucide-react";
import { Series } from "@/store/useStore";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface SeriesCardProps {
    series: Series;
}

export function SeriesCard({ series }: SeriesCardProps) {
    const t = useTranslations("SeriesCard");
    return (
        <Link href={`/series/${series.slug}`} className="group block h-full">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                {/* Poster Image */}
                <div className="aspect-[2/3] w-full bg-zinc-100 relative overflow-hidden">
                    {/* Use fallback image if poster is missing or fails */}
                    <Image
                        src={series.poster || "/images/poster-default.jpg"}
                        alt={series.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute top-2 left-2 flex gap-2">
                        {series.isTrending && (
                            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md z-10">
                                TRENDING
                            </span>
                        )}
                        <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2 py-1 rounded-full shadow-md z-10 border border-white/20">
                            {series.category}
                        </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-1">
                        {series.title}
                    </h3>
                    <p className="text-sm font-medium text-gray-500 mt-auto flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-primary/70" />
                        {series.totalLocations} {t('locations')}
                    </p>
                </div>
            </div>
        </Link>
    );
}
