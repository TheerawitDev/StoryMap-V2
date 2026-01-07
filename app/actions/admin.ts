'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// Helper to check admin role
async function checkAdmin() {
    const session = await auth()
    if (!session?.user?.email) throw new Error("Unauthorized")

    const isAdmin = await (prisma as any).allowedAdmin.findUnique({
        where: { email: session.user.email }
    })

    if (!isAdmin) throw new Error("Forbidden: Admin access only")
    return session
}

// --- Series Actions ---

const SeriesSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1),
    description: z.string().min(1),
    poster: z.string().url(),
    isTrending: z.boolean().default(false),
})

export async function upsertSeries(data: z.infer<typeof SeriesSchema>) {
    await checkAdmin()
    const val = SeriesSchema.parse(data)

    if (val.id) {
        await prisma.series.update({
            where: { id: val.id },
            data: {
                title: val.title,
                description: val.description,
                poster: val.poster,
                isTrending: val.isTrending
            }
        })
    } else {
        await prisma.series.create({
            data: {
                title: val.title,
                description: val.description,
                poster: val.poster,
                isTrending: val.isTrending
            }
        })
    }
    revalidatePath('/admin')
    revalidatePath('/')
}

export async function deleteSeries(id: number) {
    await checkAdmin()
    await prisma.series.delete({ where: { id } })
    revalidatePath('/admin')
    revalidatePath('/')
}

// --- Location Actions ---

const LocationSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1),
    image: z.string().url(),
    description: z.string().min(1),
    scene: z.string().optional(),
    coords: z.string().min(1), // "lat, lng"
    isMajor: z.boolean().default(false),
    seriesId: z.number(),
})

export async function upsertLocation(data: z.infer<typeof LocationSchema>) {
    await checkAdmin()
    const val = LocationSchema.parse(data)

    if (val.id) {
        await prisma.location.update({
            where: { id: val.id },
            data: {
                name: val.name,
                image: val.image,
                description: val.description,
                scene: val.scene,
                coords: val.coords,
                isMajor: val.isMajor,
                seriesId: val.seriesId
            }
        })
    } else {
        await prisma.location.create({
            data: {
                name: val.name,
                image: val.image,
                description: val.description,
                scene: val.scene, // Allow null/undefined handled by prisma
                coords: val.coords,
                isMajor: val.isMajor,
                series: { connect: { id: val.seriesId } }
            }
        })
    }
    revalidatePath('/admin')
    revalidatePath('/')
}

export async function deleteLocation(id: number) {
    await checkAdmin()
    await prisma.location.delete({ where: { id } })
    revalidatePath('/admin')
    revalidatePath('/')
}

// --- Admin Management Actions ---

export async function addAdmin(email: string) {
    await checkAdmin()
    if (!email) throw new Error("Email required")

    await (prisma as any).allowedAdmin.create({
        data: { email }
    })
    revalidatePath('/admin')
}

export async function removeAdmin(email: string) {
    await checkAdmin()
    // Prevent self-lockout? user can remove themselves if they want, but maybe warn.
    // For now just allow it.
    await (prisma as any).allowedAdmin.delete({
        where: { email }
    })
    revalidatePath('/admin')
}

export async function getAllowedAdmins() {
    await checkAdmin()
    return await (prisma as any).allowedAdmin.findMany()
}
