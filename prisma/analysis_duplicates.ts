import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log("Checking for duplicate locations...")
    const locations = await prisma.location.findMany()
    const nameCounts = new Map<string, number>()
    const duplicates = []

    for (const loc of locations) {
        const count = nameCounts.get(loc.name) || 0
        nameCounts.set(loc.name, count + 1)
        if (count === 1) { // Found a second one
            duplicates.push(loc.name)
        }
    }

    if (duplicates.length > 0) {
        console.log("Found duplicate locations:")
        for (const name of duplicates) {
            console.log(`- ${name}: ${nameCounts.get(name)} copies`)
        }
    } else {
        console.log("No duplicates found.")
    }
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
