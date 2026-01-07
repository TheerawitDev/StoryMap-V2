
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Full Data Mapping from useStore.ts
// Full Data Mapping from useStore.ts
import { seriesData, locationData } from './data'

async function main() {
    console.log(`Start seeding ...`)

    for (const s of seriesData) {
        const series = await prisma.series.upsert({
            where: { id: s.id + 1 }, // Shift ID by 1 because Prisma autoincrement starts at 1 usually, but let's stick to 1-based index
            update: {
                title: s.title,
                poster: s.poster,
                description: s.description,
                isTrending: s.isTrending,
            },
            create: {
                id: s.id + 1,
                title: s.title,
                poster: s.poster,
                description: s.description,
                isTrending: s.isTrending,
            },
        })
        console.log(`Created series with id: ${series.id}`)
    }

    for (const loc of locationData) {
        // Check if location already exists
        const existing = await prisma.location.findFirst({
            where: { name: loc.name }
        })

        if (!existing) {
            await prisma.location.create({
                data: {
                    name: loc.name,
                    image: loc.image,
                    description: loc.description,
                    scene: loc.scene,
                    coords: loc.coords,
                    isMajor: loc.isMajor,
                    seriesId: loc.seriesId + 1,
                }
            })
        } else {
            // Update existing location
            await prisma.location.update({
                where: { id: existing.id },
                data: {
                    image: loc.image,
                    description: loc.description,
                    scene: loc.scene,
                    coords: loc.coords,
                    isMajor: loc.isMajor,
                    seriesId: loc.seriesId + 1,
                }
            })
            console.log(`Updated location: ${loc.name}`)
        }
    }

    console.log(`Seeding finished.`)

    // ==========================================
    // CROWD CHECK TESTING DATA
    // ==========================================
    console.log(`Start seeding visits for Crowd Check...`)

    // 1. Ensure we have dummy users
    const userIds: string[] = [];
    for (let i = 0; i < 30; i++) {
        const user = await prisma.user.upsert({
            where: { email: `dummy${i}@example.com` },
            update: {},
            create: {
                name: `Dummy Visitor ${i}`,
                email: `dummy${i}@example.com`,
            }
        });
        userIds.push(user.id);
    }

    // 2. Get Targets
    const taladPlu = await prisma.location.findFirst({ where: { name: { contains: "ตลาดพลู" } } });
    const taladNoi = await prisma.location.findFirst({ where: { name: { contains: "ตลาดน้อย" } } });

    if (taladPlu && taladNoi) {
        // 3. Create High Traffic at Talad Plu (25 visits)
        for (let i = 0; i < 25; i++) {
            await prisma.visit.upsert({
                where: {
                    userId_locationId: { userId: userIds[i], locationId: taladPlu.id }
                },
                update: { assignedAt: new Date() },
                create: {
                    userId: userIds[i],
                    locationId: taladPlu.id,
                    assignedAt: new Date()
                }
            });
        }
        // 4. Create Low Traffic at Talad Noi (2 visits)
        for (let i = 25; i < 27; i++) {
            await prisma.visit.upsert({
                where: {
                    userId_locationId: { userId: userIds[i], locationId: taladNoi.id }
                },
                update: { assignedAt: new Date() },
                create: {
                    userId: userIds[i],
                    locationId: taladNoi.id,
                    assignedAt: new Date()
                }
            });
        }
        console.log(`Seeded visits: ${taladPlu.name} (High=25), ${taladNoi.name} (Low=2).`);
    }

    // ==========================================
    // ALLOWED ADMIN
    // ==========================================
    await prisma.allowedAdmin.upsert({
        where: { email: "pm.theerawit@gmail.com" },
        update: {},
        create: { email: "pm.theerawit@gmail.com" }
    })
    console.log("Seeded default admin: pm.theerawit@gmail.com")
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
