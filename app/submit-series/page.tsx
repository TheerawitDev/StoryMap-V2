
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2, Film } from "lucide-react";
import Link from "next/link";

export default function SubmitSeriesPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { fetchData } = useStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [poster, setPoster] = useState("");

    // Redirect if not authenticated
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login?callbackUrl=/submit-series");
        }
    }, [status, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description) {
            alert("กรุณากรอกชื่อซีรีส์และรายละเอียด");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/series", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    description,
                    poster: poster || "",
                    isTrending: false // Default to false
                }),
            });

            if (!res.ok) throw new Error("Submission failed");

            // Success
            alert("เพิ่มซีรีส์สำเร็จ!");
            fetchData(); // Refresh store
            router.push("/explore");
        } catch (error) {
            console.error(error);
            alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (status === "loading") return <div className="p-20 text-center">Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl bg-gray-50 min-h-screen">
            <Link href="/profile" className="inline-flex items-center text-gray-500 hover:text-primary mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" /> กลับหน้าโปรไฟล์
            </Link>

            <Card className="shadow-lg border-none">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-xl">
                    <CardTitle className="text-2xl flex items-center gap-2">
                        <Film className="w-6 h-6" />
                        เพิ่มซีรีส์ใหม่ (Add Series)
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label className="text-base">ชื่อซีรีส์ (Series Title) *</Label>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="เช่น แปลรักฉันด้วยใจเธอ"
                                required
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <Label className="text-base">รายละเอียด (Description) *</Label>
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="เรื่องย่อฉบับย่อ..."
                                className="mt-2 min-h-[120px]"
                                required
                            />
                        </div>

                        <div>
                            <Label className="text-base">ลิงก์รูปภาพโปสเตอร์ (Poster URL)</Label>
                            <Input
                                value={poster}
                                onChange={(e) => setPoster(e.target.value)}
                                placeholder="https://..."
                                className="mt-2"
                            />
                            <p className="text-xs text-gray-400 mt-1">ใส่ลิงก์รูปภาพจากอินเทอร์เน็ต (ถ้ามี)</p>
                        </div>

                        <div className="pt-4">
                            <Button type="submit" disabled={isSubmitting} className="w-full h-12 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-none shadow-md">
                                {isSubmitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> กำลังบันทึก...</> : "บันทึกซีรีส์"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
