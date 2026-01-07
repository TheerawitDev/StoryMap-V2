"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserActionsProps {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    } | undefined;
}

export function NavbarUserActions({ user }: UserActionsProps) {
    if (!user) {
        return (
            <Link href="/login">
                <Button className="rounded-full px-6 bg-primary hover:bg-primary/90 text-white font-medium">
                    เข้าสู่ระบบ
                </Button>
            </Link>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border border-zinc-200">
                        <AvatarImage src={user.image || ""} alt={user.name || ""} />
                        <AvatarFallback className="bg-sky-100 text-sky-700 font-bold">
                            {user.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>โปรไฟล์ของฉัน</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/submit" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>เพิ่มสถานที่ใหม่</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {(user as any).role === "ADMIN" && (
                    <DropdownMenuItem asChild>
                        <Link href="/admin" className="cursor-pointer text-blue-600 font-medium">
                            <User className="mr-2 h-4 w-4" />
                            <span>แดชบอร์ด (Admin)</span>
                        </Link>
                    </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="text-red-600 cursor-pointer"
                    onClick={() => signOut({ callbackUrl: "/" })}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>ออกจากระบบ</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
