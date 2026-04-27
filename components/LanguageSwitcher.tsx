"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLanguage = (newLocale: string) => {
        if (newLocale === locale) return;
        
        let currentPath = window.location.pathname;
        
        // Remove /en prefix if it exists to normalize the path to default locale (th)
        if (currentPath.startsWith('/en')) {
            currentPath = currentPath.replace(/^\/en/, '') || '/';
        }

        // If we are appending a new locale that is not the default, prefix it
        let newPathname = currentPath;
        if (newLocale === "en") {
            newPathname = `/en${currentPath === '/' ? '' : currentPath}`;
        }
        
        // CRITICAL: Overwrite the cookie so next-intl middleware doesn't auto-redirect us back!
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
        
        window.location.href = newPathname;
    };

    return (
        <div className="flex items-center bg-gray-100 rounded-full p-1 border border-gray-200">
            <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => switchLanguage("th")} 
                className={`rounded-full px-3 py-1 h-7 text-xs font-semibold transition-all max-h-min ${locale === "th" ? "bg-white shadow-sm text-primary" : "text-gray-500 hover:text-gray-700"}`}
            >
                TH
            </Button>
            <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => switchLanguage("en")} 
                className={`rounded-full px-3 py-1 h-7 text-xs font-semibold transition-all max-h-min ${locale === "en" ? "bg-white shadow-sm text-primary" : "text-gray-500 hover:text-gray-700"}`}
            >
                EN
            </Button>
        </div>
    );
}
