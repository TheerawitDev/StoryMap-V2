import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { TrendingSection } from "@/components/home/TrendingSection";
import { HighlightsSection } from "@/components/home/HighlightsSection";
import { CTASection } from "@/components/home/CTASection";
import { prisma } from "@/lib/prisma";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  // Fetch data in parallel
  const [seriesData, seriesCount, locationCount, userCount, locationHighlights] = await Promise.all([
    prisma.series.findMany({
      where: { isTrending: true },
      take: 5,
      include: {
        locations: true
      }
    }),
    prisma.series.count(),
    prisma.location.count(),
    prisma.user.count(),
    prisma.location.findMany({
      // Prefer major locations, then fallback to newest
      orderBy: [
        { isMajor: 'desc' },
        { createdAt: 'desc' }
      ],
      take: 3,
      include: {
        series: true
      }
    })
  ]);

  // Transform Prisma data to match our UI interface
  const formattedSeries = seriesData.map(s => ({
    id: s.id,
    title: s.title,
    slug: s.slug,
    category: s.category,
    poster: s.poster || "",
    description: s.description,
    isTrending: s.isTrending,
    totalLocations: s.locations.length
  }));

  const stats = {
    seriesCount: seriesCount > 30 ? seriesCount : 30, // Show at least 30+ if we have less (marketing :P)
    locationCount: locationCount > 100 ? locationCount : 100,
    userCount: userCount > 10000 ? userCount : 10000 // Keep the "10k+" vibe if we have few users
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection stats={stats} />
      <FeaturesSection />
      <TrendingSection series={formattedSeries} />
      <HighlightsSection locations={locationHighlights} />
      <CTASection />
    </div>
  );
}
