
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file received" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        // Sanitize filename: remove spaces and special characters, keep extension
        const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const filename = Date.now() + "_" + sanitizedFilename;

        // Ensure uploads directory exists
        const uploadDir = path.join(process.cwd(), "public/uploads");
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e: any) {
            if (e.code !== 'EEXIST') {
                console.error("Directory creation error:", e);
                throw e;
            }
        }

        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);

        return NextResponse.json({ url: `/uploads/${filename}` });
    } catch (error: any) {
        console.error("Upload Error:", error);
        return NextResponse.json(
            { error: error.message || "Upload failed" },
            { status: 500 }
        );
    }
}
