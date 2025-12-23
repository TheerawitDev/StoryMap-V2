
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-2xl">
            <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-6">
                <ArrowLeft className="w-4 h-4 mr-1" /> กลับหน้าหลัก
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">ติดต่อเรา (Contact Us)</h1>
            <div className="bg-white p-8 rounded-xl shadow-sm border space-y-6">
                <p className="text-gray-600">
                    หากคุณมีข้อสงสัย ข้อเสนอแนะ หรือต้องการสอบถามข้อมูลเพิ่มเติมเกี่ยวกับ StoryMap สามารถติดต่อเราได้ผ่านช่องทางดังนี้
                </p>
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-700">
                        <Mail className="w-5 h-5 text-primary" />
                        <span>contact@storymap.app</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                        <Phone className="w-5 h-5 text-primary" />
                        <span>02-123-4567</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span>Bangkok, Thailand</span>
                    </div>
                </div>
                <div className="pt-4">
                    <Link href="/">
                        <Button>กลับสู่หน้าหลัก</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
