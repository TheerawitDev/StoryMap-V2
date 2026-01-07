
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const seriesId = searchParams.get('seriesId');

    try {
        const whereClause = seriesId ? { seriesId: parseInt(seriesId) + 1 } : {}; // Handle 0-based index shift if passed from old frontend

        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const locations = await prisma.location.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' },
            include: {
                visits: {
                    where: { assignedAt: { gte: twentyFourHoursAgo } },
                    select: { userId: true }
                }
            }
        });

        const formattedLocations = locations.map(l => ({
            id: l.id,
            seriesId: l.seriesId - 1, // Shift back for frontend compatibility if we stick to that
            name: l.name,
            image: l.image || "/images/placeholder.jpg",
            isMajor: l.isMajor,
            scene: l.scene || "",
            description: l.description,
            coords: l.coords,
            recentVisitCount: l.visits.length
        }));

        return NextResponse.json(formattedLocations);
    } catch (error) {
        console.error("API Locations Error:", error);
        return NextResponse.json({ error: "Failed to fetch locations" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await auth();
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const user = await prisma.user.findUnique({ where: { email: session.user.email } });

        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const newLocation = await prisma.location.create({
            data: {
                name: body.name,
                description: body.description,
                image: body.image,
                coords: body.coords,
                scene: body.scene,
                seriesId: parseInt(body.seriesId), // If passing real DB ID
                createdById: user.id
            }
        });

        return NextResponse.json(newLocation);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create location" }, { status: 500 });
    }
}
