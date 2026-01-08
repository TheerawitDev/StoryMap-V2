import { prisma } from "@/lib/prisma";
import { CrowdDashboard } from "@/components/crowd-monitor/CrowdDashboard";

export default async function CrowdMonitorPage() {
    const locations = await prisma.location.findMany({
        select: {
            id: true,
            name: true,
            image: true,
            coords: true,
        },
        take: 12, // Ensure we check plenty
    });

    // Map to format expected by Dashboard
    const initialLocations = locations.map(loc => ({
        ...loc,
        // Add default null/empty for properties we don't fetch but interface might expect if strict
        // But our Omit<LocationData, ...> in Dashboard helps
    }));

    return (
        <div className="container mx-auto py-8 px-4 min-h-screen">
            <div className="max-w-5xl mx-auto">
                <CrowdDashboard initialLocations={initialLocations} />
            </div>
        </div>
    );
}
