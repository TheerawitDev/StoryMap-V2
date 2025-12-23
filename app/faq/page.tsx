
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function FAQPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-6">
                <ArrowLeft className="w-4 h-4 mr-1" /> กลับหน้าหลัก
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">คำถามที่พบบ่อย (FAQ)</h1>

            <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
                <div className="border border-gray-100 rounded-lg overflow-hidden">
                    <details className="group">
                        <summary className="flex cursor-pointer list-none items-center justify-between p-4 font-medium text-gray-900 group-open:bg-gray-50">
                            StoryMap คืออะไร?
                            <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <div className="text-gray-600 bg-white p-4 pt-0 group-open:pt-4">
                            StoryMap คือเว็บไซต์รวบรวมพิกัดสถานที่ถ่ายทำซีรีส์ เพื่อให้แฟนๆ ได้ตามรอยไปเยี่ยมชมสถานที่จริงที่ปรากฏในฉากต่างๆ
                        </div>
                    </details>
                </div>

                <div className="border border-gray-100 rounded-lg overflow-hidden">
                    <details className="group">
                        <summary className="flex cursor-pointer list-none items-center justify-between p-4 font-medium text-gray-900 group-open:bg-gray-50">
                            ฉันสามารถเพิ่มสถานที่เองได้ไหม?
                            <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <div className="text-gray-600 bg-white p-4 pt-0 group-open:pt-4">
                            ได้! คุณสามารถกดปุ่ม "เพิ่มสถานที่" หรือ "เพิ่มซีรีส์" เพื่อแบ่งปันข้อมูลสถานที่ถ่ายทำที่คุณรู้จักให้กับเพื่อนๆ ได้เลย
                        </div>
                    </details>
                </div>

                <div className="border border-gray-100 rounded-lg overflow-hidden">
                    <details className="group">
                        <summary className="flex cursor-pointer list-none items-center justify-between p-4 font-medium text-gray-900 group-open:bg-gray-50">
                            Adventure Token คืออะไร?
                            <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <div className="text-gray-600 bg-white p-4 pt-0 group-open:pt-4">
                            ระบบ Adventure Token คือเหรียญรางวัลที่คุณจะได้รับเมื่อเช็คอินสถานที่ครบตามจำนวนที่กำหนด เป็นเหมือนรางวัลสำหรับการออกสำรวจของคุณ
                        </div>
                    </details>
                </div>
            </div>
        </div>
    );
}
