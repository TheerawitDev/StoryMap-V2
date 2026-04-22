"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useTranslations } from "next-intl";

export function MobileNav() {
    const [open, setOpen] = useState(false);
    const t = useTranslations("Navigation");

    return (
        <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="w-5 h-5 text-gray-600" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-white dark:bg-zinc-950">
                    <SheetHeader>
                        <SheetTitle className="text-left flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                                <MapPin className="w-5 h-5" />
                            </div>
                            StoryMap
                        </SheetTitle>
                        <SheetDescription className="text-left text-muted-foreground">
                            {t('tools')}
                        </SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-col gap-4 mt-8">
                        <Link
                            href="/"
                            onClick={() => setOpen(false)}
                            className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                        >
                            {t('home')}
                        </Link>
                        <Link
                            href="/explore"
                            onClick={() => setOpen(false)}
                            className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                        >
                            {t('explore')}
                        </Link>
                        <Link
                            href="/places"
                            onClick={() => setOpen(false)}
                            className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                        >
                            {t('places')}
                        </Link>
                        <Link
                            href="/crowd-monitor"
                            onClick={() => setOpen(false)}
                            className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                        >
                            {t('crowdMonitor')}
                        </Link>
                        <Link
                            href="/trip-planner"
                            onClick={() => setOpen(false)}
                            className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                        >
                            {t('tripPlanner')}
                        </Link>

                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
