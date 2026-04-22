import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Location, Series } from "@prisma/client";
import { useTranslations } from "next-intl";

interface HighlightsSectionProps {
    locations: (Location & { series: Series | null })[];
}

export function HighlightsSection({ locations }: HighlightsSectionProps) {
    const t = useTranslations("Home.highlights");
    const mainHighlight = locations[0];
    const secondaryHighlight1 = locations[1];
    const secondaryHighlight2 = locations[2];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">{t('title')}</h2>

                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
                    {/* Main Highlight */}
                    {mainHighlight ? (
                        <Link href={`/place/${mainHighlight.id}`} className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group cursor-pointer h-[300px] md:h-full block shadow-lg">
                            <Image
                                src={mainHighlight.image || "/images/bangkok-city.jpg"}
                                alt={mainHighlight.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90"></div>
                            <div className="absolute bottom-0 left-0 p-8 text-white transform transition-transform group-hover:translate-y-[-8px]">
                                <span className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full mb-3">{t('recommended')}</span>
                                <h3 className="text-3xl font-bold mb-2">{mainHighlight.name}</h3>
                                <p className="text-gray-200 line-clamp-2">{mainHighlight.scene || mainHighlight.series?.title || mainHighlight.description}</p>
                            </div>
                        </Link>
                    ) : (
                        <div className="md:col-span-2 md:row-span-2 bg-gray-100 rounded-3xl flex items-center justify-center text-gray-400">
                            {t('noHighlight')}
                        </div>
                    )}

                    {/* Secondary Highlight 1 */}
                    {secondaryHighlight1 ? (
                        <Link href={`/place/${secondaryHighlight1.id}`} className="md:col-span-2 relative rounded-3xl overflow-hidden cursor-pointer group block h-[250px] md:h-full shadow-lg">
                            <Image
                                src={secondaryHighlight1.image || "/images/bangkok-city.jpg"}
                                alt={secondaryHighlight1.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
                            <div className="absolute bottom-6 left-6 text-white transform transition-transform group-hover:translate-y-[-4px]">
                                <h3 className="text-2xl font-bold mb-1">{secondaryHighlight1.name}</h3>
                                <p className="text-sm text-gray-200 line-clamp-1">{secondaryHighlight1.series?.title || secondaryHighlight1.scene || secondaryHighlight1.description}</p>
                            </div>
                        </Link>
                    ) : (
                        <div className="md:col-span-2 bg-gray-100 rounded-3xl flex items-center justify-center text-gray-400">
                            {t('comingSoon')}
                        </div>
                    )}

                    {/* Secondary Highlight 2 */}
                    {secondaryHighlight2 ? (
                        <Link href={`/place/${secondaryHighlight2.id}`} className="md:col-span-1 relative rounded-3xl overflow-hidden cursor-pointer group block h-[200px] md:h-full shadow-lg">
                            <Image
                                src={secondaryHighlight2.image || "/images/bangkok-city.jpg"}
                                alt={secondaryHighlight2.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="text-lg font-bold">{secondaryHighlight2.name}</h3>
                                <p className="text-xs text-gray-200 line-clamp-1">{secondaryHighlight2.series?.title || secondaryHighlight2.description}</p>
                            </div>
                        </Link>
                    ) : (
                        <div className="md:col-span-1 bg-gray-100 rounded-3xl flex items-center justify-center text-gray-400">
                            ...
                        </div>
                    )}

                    {/* Secondary Highlight 3 */}
                    <div className="md:col-span-1 bg-gradient-to-br from-primary to-blue-600 rounded-3xl p-6 text-white text-center flex flex-col items-center justify-center relative overflow-hidden group shadow-lg">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-4">{t('moreTitle')}</h3>
                            <p className="text-blue-100 text-sm mb-6">{t('moreDesc')}</p>
                            <Link href="/places">
                                <Button variant="secondary" className="rounded-full w-full bg-white text-primary hover:bg-blue-50">
                                    {t('viewAll')}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
