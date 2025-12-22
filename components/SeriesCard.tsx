
"use client";

import Link from "next/link";
import { Film } from "lucide-react";
import { Series } from "@/store/useStore";
import Image from "next/image";

interface SeriesCardProps {
    series: Series;
}

export function SeriesCard({ series }: SeriesCardProps) {
    return (
        <Link href={`/series/${series.id}`} className="group block h-full">
            <div className="relative overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-1 h-full flex flex-col">
                {/* Poster Image */}
                <div className="aspect-[2/3] w-full bg-zinc-100 relative overflow-hidden">
                    {/* Use fallback image if poster is missing or fails */}
                    <div className="relative w-full h-full">
                        <Image
                            src={series.poster || "/images/poster-default.jpg"}
                            alt={series.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                    </div>

                    {/* Trending Badge */}
                    {series.isTrending && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm z-10">
                            TRENDING
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-1">
                        {series.title}
                    </h3>
                    <p className="text-xs text-gray-400 mb-3">{series.totalLocations} Locations</p>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-auto">
                        {series.description}
                    </p>
                </div>
            </div>
        </Link>
    );
}
