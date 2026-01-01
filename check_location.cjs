
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const location = await prisma.location.findFirst();
    console.log('First Location ID:', location?.id);
    console.log('First Location Name:', location?.name);
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
