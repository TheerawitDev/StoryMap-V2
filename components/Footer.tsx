
import { MapPin } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-white border-t py-12 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <MapPin className="w-6 h-6 text-primary" />
                            <span className="font-bold text-lg text-primary">StoryMap</span>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            สำรวจโลกผ่านสายตาของเรื่องราวต่างๆ <br />
                            ตามรอยสถานที่ถ่ายทำจริงทั่วโลก
                        </p>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h4 className="font-bold mb-4 text-sm uppercase tracking-wide">สำรวจ</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link href="#" className="hover:text-primary">ซีรีส์ยอดนิยม</Link></li>
                            <li><Link href="#" className="hover:text-primary">สถานที่สำคัญ</Link></li>
                            <li><Link href="#" className="hover:text-primary">เพิ่มซีรีส์ของคุณ</Link></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h4 className="font-bold mb-4 text-sm uppercase tracking-wide">บริษัท</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link href="#" className="hover:text-primary">เกี่ยวกับเรา</Link></li>
                            <li><Link href="#" className="hover:text-primary">ร่วมงานกับเรา</Link></li>
                            <li><Link href="#" className="hover:text-primary">ความเป็นส่วนตัว</Link></li>
                        </ul>
                    </div>

                    {/* Links 3 */}
                    <div>
                        <h4 className="font-bold mb-4 text-sm uppercase tracking-wide">สนับสนุน</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link href="#" className="hover:text-primary">ติดต่อเรา</Link></li>
                            <li><Link href="#" className="hover:text-primary">คำถามที่พบบ่อย</Link></li>
                            <li><Link href="#" className="hover:text-primary">ให้ข้อเสนอแนะ</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t mt-12 pt-8 text-center text-xs text-gray-400">
                    © 2024 StoryMap. สงวนลิขสิทธิ์ทั้งหมด.
                </div>
            </div>
        </footer>
    );
}
