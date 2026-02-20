import Link from "next/link";
import { MapPin, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { NavbarUserActions } from "./NavbarUserActions";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { MobileNav } from "./MobileNav";
import { NavLink } from "./NavLink";

export async function Navbar() {
    const session = await auth();

    return (
        <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-primary">StoryMap</span>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    <NavLink href="/">
                        หน้าหลัก (Home)
                    </NavLink>
                    <NavLink href="/explore">
                        สำรวจ (Explore)
                    </NavLink>
                    <NavLink href="/places">
                        สถานที่ (Places)
                    </NavLink>
                    <NavLink href="/crowd-monitor">
                        ติดตามคน (Crowd Monitor)
                    </NavLink>
                    <NavLink href="/trip-planner">
                        วางแผนเที่ยว (Trip Planner)
                    </NavLink>
                    <NavLink href="/profile">
                        โปรไฟล์ (Profile)
                    </NavLink>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    {/* Mobile Menu */}
                    <MobileNav />

                    <NavbarUserActions user={session?.user} />
                </div>
            </div>
        </nav>
    );
}
