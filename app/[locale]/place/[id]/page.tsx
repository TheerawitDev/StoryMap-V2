
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { MapPin, Navigation } from "lucide-react";
import ReviewsSection from "@/components/ReviewsSection";
import Link from "next/link";
import { auth } from "@/auth";
import { StarRating } from "@/components/StarRating";

export default async function PlacePage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const idStr = params.id;
    const id = parseInt(idStr);

    if (isNaN(id)) {
        notFound();
    }

    const location = await prisma.location.findUnique({
        where: { id },
        include: {
            series: true,
            reviews: {
                include: {
                    user: {
                        select: { name: true, image: true },
                    },
                },
                orderBy: { createdAt: "desc" },
            },
        },
    });

    if (!location) {
        notFound();
    }

    const session = await auth();

    // Calculate average rating
    const averageRating =
        location.reviews.length > 0
            ? location.reviews.reduce((acc, review) => acc + review.rating, 0) /
            location.reviews.length
            : 0;

    return (
        <div className="min-h-screen bg-black text-white pt-20 px-4 pb-12">
            <div className="max-w-4xl mx-auto">
                <Link href="/explore" className="text-gray-400 hover:text-white mb-6 inline-block transition-colors">
                    ← Back to Explore
                </Link>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Image Section */}
                    <div className="relative aspect-video md:aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gray-900 border border-white/10">
                        {location.image ? (
                            <Image
                                src={location.image}
                                alt={location.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                <MapPin size={48} />
                            </div>
                        )}
                        {/* Major Location Badge */}
                        {location.isMajor && (
                            <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                                Major Location
                            </div>
                        )}
                    </div>

                    {/* Info Section */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-2 text-blue-400 text-sm font-medium tracking-wide uppercase">
                            {location.series.title}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{location.name}</h1>

                        {/* Rating Display */}
                        <div className="flex items-center gap-2 mb-6">
                            <StarRating rating={Math.round(averageRating)} size={24} />
                            <span className="text-xl font-bold">{averageRating.toFixed(1)}</span>
                            <span className="text-gray-400">({location.reviews.length} reviews)</span>
                        </div>

                        <div className="prose prose-invert mb-8 text-gray-300">
                            <p>{location.description}</p>
                            {location.scene && (
                                <div className="mt-4 p-4 bg-white/5 rounded-lg border-l-4 border-blue-500">
                                    <span className="text-gray-400 text-sm uppercase block mb-1 font-bold">Scene Context</span>
                                    {location.scene}
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.coords)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                            >
                                <Navigation size={20} />
                                Navigate Here
                            </a>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <ReviewsSection
                    locationId={location.id}
                    initialReviews={JSON.parse(JSON.stringify(location.reviews))}
                    isLoggedIn={!!session?.user}
                />
            </div>
        </div>
    );
}
