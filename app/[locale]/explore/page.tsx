
"use client";

import { useStore } from "@/store/useStore";
import { SeriesCard } from "@/components/SeriesCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function ExplorePage() {
    const t = useTranslations("Explore");
    const { series, fetchData, isLoading } = useStore();

    useEffect(() => {
        if (series.length === 0) {
            fetchData();
        }
    }, [fetchData, series.length]);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredSeries = series.filter(s =>
        s.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-gray-50 min-h-screen pb-20 pt-8">
            <div className="container mx-auto px-4">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
                        <p className="text-gray-500">{t('subtitle')}</p>
                    </div>

                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder={t('searchPlaceholder')}
                            className="pl-9 bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button 
                                onClick={() => setSearchTerm("")}
                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    <Button variant="default" className="rounded-full px-6">{t('all')}</Button>
                    <Button variant="outline" className="rounded-full px-6 bg-white">{t('trending')}</Button>
                    <Button variant="outline" className="rounded-full px-6 bg-white">{t('bl')}</Button>
                    <Button variant="outline" className="rounded-full px-6 bg-white">{t('movies')}</Button>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-6">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="flex flex-col space-y-3">
                                <Skeleton className="h-[300px] w-full rounded-2xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[150px]" />
                                    <Skeleton className="h-3 w-[100px]" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredSeries.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-6">
                        {filteredSeries.map((s) => (
                            <SeriesCard key={s.id} series={s} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm mt-8">
                        <p className="text-gray-900 text-lg font-medium mb-2">{t('notFoundTitle', { query: searchTerm })}</p>
                        <p className="text-gray-500 mb-6">{t('notFoundSubtitle')}</p>
                        <Button onClick={() => setSearchTerm("")} variant="outline">
                            {t('clearSearch')}
                        </Button>
                    </div>
                )}

            </div>
        </div>
    );
}
