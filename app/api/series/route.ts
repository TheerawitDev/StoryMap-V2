
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const series = await prisma.series.findMany({
            include: {
                _count: {
                    select: { locations: true }
                }
            }
        });

        // Transform to match Store Interface
        const formattedSeries = series.map(s => ({
            id: s.id - 1, // Transform back to 0-based index for now or update store to 1-based. Let's stick to 0-based for frontend compat if possible, OR better, update frontend to use DB IDs.
            // Actually, let's update frontend to use real IDs.
            realId: s.id,
            title: s.title,
            poster: s.poster || "",
            description: s.description,
            totalLocations: s._count.locations,
            isTrending: s.isTrending
        }));

        return NextResponse.json(formattedSeries);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch series" }, { status: 500 });
    }
}
