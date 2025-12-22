import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({
    datasources: {
        db: {
            url: "file:C:/Users/pmthe/OneDrive/Documents/Work/project/story-map_v3/StoryMap-V2/prisma/dev.db",
        },
    },
})

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
