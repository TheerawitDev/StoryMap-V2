import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Checking Series ID sequence...')

    // 1. Get the current maximum ID in the Series table
    const result = await prisma.series.aggregate({
        _max: {
            id: true
        }
    })

    const maxId = result._max.id || 0
    const nextId = maxId + 1

    console.log(`Max Series ID is: ${maxId}`)
    console.log(`Resetting sequence to: ${nextId}`)

    // 2. Reset the sequence
    // Note: The sequence name is typically "Series_id_seq" for a model named Series and field id
    // Prisma usually preserves case if strictly quoted, but standard postgres lowercases unless quoted.
    // We'll try Standard casing first.

    try {
        await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Series_id_seq" RESTART WITH ${nextId};`)
        console.log('Successfully reset "Series_id_seq"')
    } catch (error) {
        console.log('Error resetting "Series_id_seq", trying lowercase "series_id_seq"...')
        try {
            await prisma.$executeRawUnsafe(`ALTER SEQUENCE "series_id_seq" RESTART WITH ${nextId};`)
            console.log('Successfully reset "series_id_seq"')
        } catch (err) {
            console.error('Failed to reset sequence. Ensure the table name is correct.', err)
        }
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
