
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
    console.log("Backing up Location-Series relationships...");

    // We fetch as 'any' because strict TS might complain if it looks at the NEW schema file
    // but we are running effectively against the OLD client (if not generated yet).
    const locations = await (prisma.location as any).findMany({
        select: {
            id: true,
            seriesId: true
        }
    });

    const relations = locations.map((l: any) => ({
        locationId: l.id,
        seriesId: l.seriesId
    }));

    const outputPath = path.join(process.cwd(), "relations_backup.json");
    fs.writeFileSync(outputPath, JSON.stringify(relations, null, 2));

    console.log(`Backup complete! Saved ${relations.length} relationships to relations_backup.json`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
