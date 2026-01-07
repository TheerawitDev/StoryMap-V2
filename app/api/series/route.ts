
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
            id: s.id,
            title: s.title,
            slug: (s as any).slug,
            category: (s as any).category || "Series",
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
        console.log("Session:", session); // Debug log

        if (!session || !session.user) {
            console.log("Unauthorized: No session");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        console.log("Request Body:", body); // Debug log
        const { title, description, poster, isTrending, category } = body;

        if (!title || !description) {
            console.log("Missing fields");
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newSeries = await prisma.series.create({
            data: {
                title,
                description,
                category: category || "Series",
                poster: poster || "/images/placeholder.jpg",
                isTrending: isTrending || false,
            },
        });

        return NextResponse.json(newSeries, { status: 201 });
    } catch (error: any) {
        console.error("API Create Series Error:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
