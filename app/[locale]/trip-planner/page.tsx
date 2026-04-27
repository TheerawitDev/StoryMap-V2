import { prisma } from "@/lib/prisma";
import TripPlannerPage from "@/components/trip-planner/TripPlannerClient";

export default async function Page() {
    const locations = await prisma.location.findMany({
        select: {
            id: true,
            name: true,
            image: true,
            coords: true,
            description: true,
        },
        take: 100, // Fetch enough to make routing interesting
    });

    return <TripPlannerPage initialLocations={locations} />;
}
