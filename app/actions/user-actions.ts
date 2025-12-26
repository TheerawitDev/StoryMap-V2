"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleVisit(locationId: number) {
    const session = await auth();
    if (!session?.user?.email) {
        throw new Error("Not authenticated");
    }

    const { email } = session.user;

    // Get user ID first (needed for creating Visit with foreign key)
    const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true }
    });

    if (!user) {
        throw new Error("User not found");
    }

    // Check if visit exists
    // @ts-ignore - Prisma types might be stale in editor, but build passes
    const existingVisit = await prisma.visit.findUnique({
        where: {
            userId_locationId: {
                userId: user.id,
                locationId: locationId
            }
        }
    });

    if (existingVisit) {
        // Remove visit
        await prisma.visit.delete({
            where: {
                userId_locationId: {
                    userId: user.id,
                    locationId: locationId
                }
            }
        });
    } else {
        // Add visit
        await prisma.visit.create({
            data: {
                userId: user.id,
                locationId: locationId
            }
        });
    }

    revalidatePath('/profile');
    revalidatePath('/explore');
    revalidatePath(`/place/${locationId}`);

    return !existingVisit; // Return if it is visited now (true if we just created it)
}

export async function getVisitedLocations() {
    const session = await auth();
    if (!session?.user?.email) {
        return [];
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true }
    });

    if (!user) return [];

    const visits = await prisma.visit.findMany({
        where: { userId: user.id },
        select: { locationId: true }
    });

    return visits.map(v => v.locationId);
}
