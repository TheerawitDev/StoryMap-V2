import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log("Starting cleanup of duplicate locations...")
    const locations = await prisma.location.findMany({
        orderBy: { id: 'asc' },
        include: { _count: { select: { visits: true, reviews: true } } }
    })

    const locationsByName = new Map<string, typeof locations>()

    for (const loc of locations) {
        if (!locationsByName.has(loc.name)) {
            locationsByName.set(loc.name, [])
        }
        locationsByName.get(loc.name)?.push(loc)
    }

    let groupsProcessed = 0
    let duplicatesDeleted = 0

    for (const [name, locs] of locationsByName) {
        if (locs.length > 1) {
            console.log(`Processing group: ${name} (${locs.length} copies)`)

            // Keep the one with the most data, or the first one if equal
            // Actually, usually we want to keep the oldest ID (first one created)
            // validating if they have data.
            // locs is already ordered by ID asc. 
            // Let's assume locs[0] is the original.

            const keep = locs[0]
            const duplicates = locs.slice(1)

            for (const dup of duplicates) {
                // Move Reviews
                const reviews = await prisma.review.findMany({ where: { locationId: dup.id } })
                for (const review of reviews) {
                    // Update locationId to kept one
                    await prisma.review.update({
                        where: { id: review.id },
                        data: { locationId: keep.id }
                    })
                }

                // Move Visits
                // Visits have composite ID (userId, locationId). 
                // We need to check if moving would cause collision
                const visits = await prisma.visit.findMany({ where: { locationId: dup.id } })
                for (const visit of visits) {
                    const existingVisit = await prisma.visit.findUnique({
                        where: {
                            userId_locationId: {
                                userId: visit.userId,
                                locationId: keep.id
                            }
                        }
                    })

                    if (!existingVisit) {
                        try {
                            // Can't update part of composite key easily if it changes identity? 
                            // Actually we can update locationId.
                            await prisma.visit.update({
                                where: {
                                    userId_locationId: {
                                        userId: visit.userId,
                                        locationId: dup.id
                                    }
                                },
                                data: { locationId: keep.id }
                            })
                        } catch (e) {
                            console.warn(`Failed to move visit for user ${visit.userId} from ${dup.id} to ${keep.id}`, e)
                        }
                    } else {
                        // Duplicate visit, just let it be deleted with the location
                        console.log(`Skipping duplicate visit for user ${visit.userId}`)
                    }
                }

                // Delete the duplicate location
                await prisma.location.delete({ where: { id: dup.id } })
                duplicatesDeleted++
            }
            groupsProcessed++
        }
    }

    console.log(`Cleanup finished.Processed ${groupsProcessed} groups. Deleted ${duplicatesDeleted} duplicate locations.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
