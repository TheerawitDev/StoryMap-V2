"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

    return (
        <Link
            href={href}
            className={cn(
                "text-sm font-medium transition-colors relative",
                isActive
                    ? "text-primary"
                    : "text-gray-600 hover:text-primary"
            )}
        >
            {children}
            {isActive && (
                <span className="absolute -bottom-5 left-0 w-full h-0.5 bg-primary rounded-t-md" />
            )}
        </Link>
    );
}
