
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
        console.error("API Series Error:", error);
        return NextResponse.json({ error: "Failed to fetch series" }, { status: 500 });
    }
}

import { auth } from "@/auth";

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { title, description, poster, isTrending } = body;

        if (!title || !description) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newSeries = await prisma.series.create({
            data: {
                title,
                description,
                poster: poster || "/images/placeholder.jpg",
                isTrending: isTrending || false,
            },
        });

        return NextResponse.json(newSeries, { status: 201 });
    } catch (error) {
        console.error("API Create Series Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
