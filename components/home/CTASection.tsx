import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { auth } from "@/auth";

export async function CTASection() {
    const session = await auth();

    if (session?.user) {
        return null; // Hide CTA section if user is logged in
    }

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gray-900 z-0">
                <Image
                    src="/images/ancient-city.jpg"
                    alt="Footer BG"
                    fill
                    className="object-cover opacity-10 mix-blend-overlay"
                />
            </div>
            <div className="container mx-auto px-4 relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">พร้อมออกเดินทางแล้วหรือยัง?</h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
                    เข้าร่วมคอมมูนิตี้ StoryMap วันนี้ แล้วเริ่มบันทึกความทรงจำการเดินทางของคุณ
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/register">
                        <Button size="lg" className="h-14 px-10 rounded-full text-lg font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25">
                            สมัครสมาชิกฟรี
                        </Button>
                    </Link>
                    <Link href="/login">
                        <Button size="lg" variant="outline" className="h-14 px-10 rounded-full text-lg font-semibold bg-transparent border-white/20 text-white hover:bg-white/10">
                            เข้าสู่ระบบ
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
