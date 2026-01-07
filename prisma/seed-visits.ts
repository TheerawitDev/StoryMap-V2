
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log(`Start seeding visits...`)

    // 1. Ensure we have dummy users
    const userIds = [];
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
    console.log(`Ensured 30 dummy users.`);

    // 2. Get Targets
    // Talad Plu
    const taladPlu = await prisma.location.findFirst({ where: { name: { contains: "ตลาดพลู" } } });
    // Talad Noi (Nearby alternative)
    const taladNoi = await prisma.location.findFirst({ where: { name: { contains: "ตลาดน้อย" } } });

    if (!taladPlu || !taladNoi) {
        console.error("Could not find target locations (Talad Plu or Talad Noi)");
        return;
    }

    console.log(`Simulating crowds at: ${taladPlu.name}`);

    // 3. Clear existing visits for test (optional, but good for consistent state)
    // await prisma.visit.deleteMany({ where: { locationId: taladPlu.id } }); // Dangerous in prod, safe in dev/local

    // 4. Create High Traffic at Talad Plu (20 visits)
    // We use upsert to avoid unique constraint errors if re-running
    for (let i = 0; i < 20; i++) {
        await prisma.visit.upsert({
            where: {
                userId_locationId: {
                    userId: userIds[i],
                    locationId: taladPlu.id
                }
            },
            update: {
                assignedAt: new Date() // Refresh timestamp to Now
            },
            create: {
                userId: userIds[i],
                locationId: taladPlu.id,
                assignedAt: new Date()
            }
        });
    }

    // 5. Create Low Traffic at Talad Noi (2 visits)
    for (let i = 20; i < 22; i++) {
        await prisma.visit.upsert({
            where: {
                userId_locationId: {
                    userId: userIds[i],
                    locationId: taladNoi.id
                }
            },
            update: {
                assignedAt: new Date()
            },
            create: {
                userId: userIds[i],
                locationId: taladNoi.id,
                assignedAt: new Date()
            }
        });
    }

    console.log(`Seeded 20 visits for ${taladPlu.name} and 2 for ${taladNoi.name}.`);
    console.log("Done.");
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
