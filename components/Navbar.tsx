import Link from "next/link";
import { MapPin, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { NavbarUserActions } from "./NavbarUserActions";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { MobileNav } from "./MobileNav";
import { NavLink } from "./NavLink";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Map, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "./LanguageSwitcher";

export async function Navbar() {
    const session = await auth();
    const t = await getTranslations("Navigation");

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
                <div className="hidden md:flex items-center gap-6">
                    <NavLink href="/">
                        {t('home')}
                    </NavLink>
                    <NavLink href="/explore">
                        {t('explore')}
                    </NavLink>
                    <NavLink href="/places">
                        {t('places')}
                    </NavLink>
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors focus:outline-none">
                            {t('tools')} <ChevronDown className="w-4 h-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56">
                            <DropdownMenuItem asChild>
                                <Link href="/trip-planner" className="cursor-pointer flex items-center py-2">
                                    <Map className="mr-2 h-4 w-4 text-gray-500" />
                                    <span>{t('tripPlanner')}</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/crowd-monitor" className="cursor-pointer flex items-center py-2">
                                    <Users className="mr-2 h-4 w-4 text-gray-500" />
                                    <span>{t('crowdMonitor')}</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    <LanguageSwitcher />

                    {/* Mobile Menu */}
                    <MobileNav />

                    <NavbarUserActions user={session?.user} />
                </div>
            </div>
        </nav>
    );
}
