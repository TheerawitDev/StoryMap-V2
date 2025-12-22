"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Suspense } from 'react';

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (searchParams.get("registered") === "true") {
            setSuccess("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
        }
        if (searchParams.get("error")) {
            setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        }
    }, [searchParams]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
            } else {
                router.push("/");
                router.refresh();
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
                        เข้าสู่ระบบ StoryMap
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        ยินดีต้อนรับกลับสู่การเดินทาง
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {success && (
                        <div className="bg-green-50 text-green-600 text-sm p-3 rounded-lg text-center font-medium">
                            {success}
                        </div>
                    )}
                    {error && (
                        <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg text-center font-medium">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
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
                                className="relative block w-full rounded-lg"
                                placeholder="รหัสผ่าน"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-11 text-base font-medium"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        เข้าสู่ระบบ
                    </Button>

                    <div className="text-center text-sm">
                        <span className="text-gray-500">ยังไม่มีบัญชี? </span>
                        <Link href="/register" className="font-medium text-primary hover:text-primary/90">
                            สมัครสมาชิก
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    )
}
