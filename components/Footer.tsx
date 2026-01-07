
import { MapPin } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 py-16 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1 space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <MapPin className="w-8 h-8 text-primary" />
                            <span className="font-bold text-2xl text-white">StoryMap</span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-400">
                            แพลตฟอร์มสำหรับคนรักหนังและซีรีส์ ให้คุณได้ตามรอยสถานที่ถ่ายทำจริงทั่วโลก เปิดประสบการณ์การท่องเที่ยวในมุมมองใหม่
                        </p>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-white">สำรวจ</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/explore" className="hover:text-primary transition-colors">ซีรีส์ยอดนิยม</Link></li>
                            <li><Link href="/places" className="hover:text-primary transition-colors">สถานที่สำคัญ</Link></li>
                            <li><Link href="/submit-series" className="hover:text-primary transition-colors">เพิ่มซีรีส์ของคุณ</Link></li>
                            <li><Link href="/collections" className="hover:text-primary transition-colors">คอลเลกชันแนะนำ</Link></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-white">บริษัท</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/about" className="hover:text-primary transition-colors">เกี่ยวกับเรา</Link></li>
                            <li><Link href="/careers" className="hover:text-primary transition-colors">ร่วมงานกับเรา</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">ความเป็นส่วนตัว</Link></li>
                            <li><Link href="/terms" className="hover:text-primary transition-colors">ข้อกำหนดการใช้งาน</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-white">ติดตามข่าวสาร</h4>
                        <p className="text-sm text-gray-400 mb-4">รับข่าวสารสถานที่ถ่ายทำใหม่ๆ ก่อนใคร</p>
                        <form className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="อีเมลของคุณ"
                                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-500"
                            />
                            <button
                                type="button" // Change to submit if integrating real form
                                className="bg-primary hover:bg-primary/90 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                            >
                                สมัครรับข่าวสาร
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} StoryMap. สงวนลิขสิทธิ์ทั้งหมด.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">Facebook</Link>
                        <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                        <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
