import Link from "next/link";
import { MapPin, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { NavbarUserActions } from "./NavbarUserActions";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";

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
                    <Link href="/" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                        หน้าหลัก (Home)
                    </Link>
                    <Link href="/explore" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                        สำรวจ (Explore)
                    </Link>
                    <Link href="/profile" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                        โปรไฟล์ (Profile)
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="w-5 h-5 text-gray-600" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left">
                                <SheetHeader>
                                    <SheetTitle className="text-left flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        StoryMap
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-4 mt-8">
                                    <Link href="/" className="text-lg font-medium text-gray-900 hover:text-primary transition-colors">
                                        หน้าหลัก (Home)
                                    </Link>
                                    <Link href="/explore" className="text-lg font-medium text-gray-900 hover:text-primary transition-colors">
                                        สำรวจ (Explore)
                                    </Link>
                                    <Link href="/profile" className="text-lg font-medium text-gray-900 hover:text-primary transition-colors">
                                        โปรไฟล์ (Profile)
                                    </Link>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <NavbarUserActions user={session?.user} />
                </div>
            </div>
        </nav>
    );
}
