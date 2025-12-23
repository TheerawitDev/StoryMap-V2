
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-6">
                <ArrowLeft className="w-4 h-4 mr-1" /> กลับหน้าหลัก
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">เกี่ยวกับเรา (About Us)</h1>
            <div className="bg-white p-8 rounded-xl shadow-sm border prose prose-gray max-w-none">
                <p className="text-lg text-gray-600 mb-4">
                    <strong>StoryMap</strong> คือแพลตฟอร์มที่เชื่อมโยงเรื่องราวในซีรีส์ที่คุณรักเข้ากับสถานที่จริง ให้คุณได้ออกไปสำรวจและสัมผัสบรรยากาศเหล่านั้นด้วยตัวเอง
                </p>
                <h3>พันธกิจของเรา</h3>
                <p>
                    เราเชื่อว่าทุกสถานที่มีเรื่องราว และซีรีส์คือสื่อกลางที่ทำให้สถานที่เหล่านั้นมีชีวิตชีวาขึ้นมา เราอยากช่วยให้แฟนๆ ซีรีส์ได้ตามรอยและสร้างความทรงจำใหม่ๆ ในสถานที่ที่พวกเขาประทับใจ
                </p>
                <h3>ทีมงาน</h3>
                <p>
                    พวกเราคือกลุ่มคนที่รักการดูซีรีส์และการท่องเที่ยว เหมือนกับคุณ! เราพัฒนา StoryMap ขึ้นมาเพื่อเป็นเพื่อนเดินทางให้กับทุกคน
                </p>
            </div>
        </div>
    );
}
