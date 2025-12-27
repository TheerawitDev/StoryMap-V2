import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file received" }, { status: 400 });
        }

        const filename = file.name;

        // Upload to Vercel Blob
        const blob = await put(filename, file, {
            access: 'public',
        });

        return NextResponse.json({ url: blob.url });
    } catch (error: any) {
        console.error("Upload Error:", error);
        return NextResponse.json(
            { error: error.message || "Upload failed" },
            { status: 500 }
        );
    }
}
