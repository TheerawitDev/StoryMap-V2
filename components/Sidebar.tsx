
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Map as MapIcon, User, Film, Video } from "lucide-react";

export function Sidebar() {
    return (
        <div className="absolute left-4 top-4 bottom-4 w-80 flex flex-col gap-4 p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl z-[1000] text-white">
            <div className="flex items-center gap-2 mb-4">
                <Film className="w-8 h-8 text-primary" />
                <h1 className="text-2xl font-bold tracking-tight">StoryMap</h1>
            </div>

            <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search movies, actors..."
                    className="pl-8 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-primary/50"
                />
            </div>

            <nav className="flex flex-col gap-2 mt-2">
                <Button variant="ghost" className="justify-start text-white hover:bg-white/10 hover:text-white">
                    <Film className="mr-2 h-4 w-4" />
                    Explore
                </Button>
                <Button variant="ghost" className="justify-start bg-primary/20 text-primary hover:bg-primary/30 hover:text-primary">
                    <MapIcon className="mr-2 h-4 w-4" />
                    Map View
                </Button>
                <Button variant="ghost" className="justify-start text-white hover:bg-white/10 hover:text-white">
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                </Button>
            </nav>

            <div className="mt-auto pt-4 border-t border-white/10">
                <div className="text-xs text-gray-400">
                    Scanning for locations...
                </div>
            </div>
        </div>
    );
}
