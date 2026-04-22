
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-6">
                <ArrowLeft className="w-4 h-4 mr-1" /> กลับหน้าหลัก
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">นโยบายความเป็นส่วนตัว (Privacy Policy)</h1>
            <div className="bg-white p-8 rounded-xl shadow-sm border prose prose-gray max-w-none">
                <p>
                    StoryMap ให้ความสำคัญกับความเป็นส่วนตัวของคุณ นโยบายนี้อธิบายว่าเรารวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลของคุณอย่างไร
                </p>
                <h3>ข้อมูลที่เราจัดเก็บ</h3>
                <ul>
                    <li>ข้อมูลบัญชีผู้ใช้ (ชื่อ, อีเมล) ที่ได้จากการเข้าสู่ระบบผ่าน Google</li>
                    <li>ข้อมูลสถานที่และซีรีส์ที่คุณส่งเข้ามาในระบบ</li>
                    <li>ประวัติการเข้าชมและการเช็คอินสถานที่ของคุณ</li>
                </ul>
                <h3>การใช้ข้อมูล</h3>
                <p>
                    เราใช้ข้อมูลของคุณเพื่อ:
                </p>
                <ul>
                    <li>ให้บริการและปรับปรุงประสบการณ์การใช้งานเว็บไซต์</li>
                    <li>แสดงความคืบหน้าและรางวัลในโปรไฟล์ของคุณ</li>
                    <li>ติดต่อสื่อสารเกี่ยวกับอัปเดตใหม่ๆ (ถ้ามี)</li>
                </ul>
                <p className="text-sm text-gray-500 mt-8">
                    *นี่เป็นนโยบายตัวอย่างสำหรับการสาธิตเท่านั้น*
                </p>
            </div>
        </div>
    );
}
