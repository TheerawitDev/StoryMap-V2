
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
    console.log("Restoring Location-Series relationships...");

    const backupPath = path.join(process.cwd(), "relations_backup.json");

    if (!fs.existsSync(backupPath)) {
        console.error("Backup file relations_backup.json not found!");
        process.exit(1);
    }

    const relations = JSON.parse(fs.readFileSync(backupPath, "utf-8"));

    let count = 0;
    for (const rel of relations) {
        if (rel.seriesId && rel.locationId) {
            try {
                // Connect using the new M-N relation style
                await prisma.location.update({
                    where: { id: rel.locationId },
                    data: {
                        series: {
                            connect: { id: rel.seriesId }
                        }
                    }
                });
                count++;
            } catch (error) {
                console.error(`Failed to restore relation for Location ${rel.locationId} <-> Series ${rel.seriesId}`, error);
            }
        }
    }

    console.log(`Restore complete! Restored ${count} relationships.`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
