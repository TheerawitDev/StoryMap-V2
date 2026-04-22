"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (res.ok) {
                router.push("/login?registered=true");
            } else {
                const data = await res.json();
                setError(data.message || "Registration failed");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-lg border">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                        สร้างบัญชีผู้ใช้
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        สมัครสมาชิกเพื่อบันทึกสถานที่ที่คุณชื่นชอบ
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg text-center font-medium">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="sr-only">ชื่อ</label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="relative block w-full rounded-lg"
                                placeholder="ชื่อของคุณ"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">อีเมล</label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="relative block w-full rounded-lg"
                                placeholder="อีเมล"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">รหัสผ่าน</label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                minLength={6}
                                className="relative block w-full rounded-lg"
                                placeholder="รหัสผ่าน (อย่างน้อย 6 ตัวอักษร)"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="sr-only">ยืนยันรหัสผ่าน</label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                minLength={6}
                                className="relative block w-full rounded-lg"
                                placeholder="ยืนยันรหัสผ่าน"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-11 text-base font-medium"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        สมัครสมาชิก
                    </Button>

                    <div className="text-center text-sm">
                        <span className="text-gray-500">มีบัญชีอยู่แล้ว? </span>
                        <Link href="/login" className="font-medium text-primary hover:text-primary/90">
                            เข้าสู่ระบบ
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
