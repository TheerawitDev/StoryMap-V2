
"use client";

import { useStore } from "@/store/useStore";
import { Award, Trophy, Medal, Star, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function AchievementsList() {
    const { visitedLocations, locations, series } = useStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const visitedCount = visitedLocations.length;

    // Define Milestone Achievements
    const milestones = [
        { id: 'level-1', min: 5, title: "Level 1 Explorer", desc: "Visit 5 Locations", token: "Bronze Token", color: "text-amber-600 bg-amber-100 border-amber-200" },
        { id: 'level-2', min: 10, title: "Level 2 Explorer", desc: "Visit 10 Locations", token: "Silver Token", color: "text-slate-600 bg-slate-100 border-slate-200" },
        { id: 'level-3', min: 20, title: "Level 3 Explorer", desc: "Visit 20 Locations", token: "Gold Token", color: "text-yellow-600 bg-yellow-100 border-yellow-200" },
        { id: 'master', min: 100, title: "Master Explorer", desc: "Visit 100 Locations", token: "Platinum Token", color: "text-purple-600 bg-purple-100 border-purple-200" },
    ];

    // Calculate Series Achievements
    const seriesAchievements = series.map(s => {
        const sLocations = locations.filter(l => l.seriesId === s.id);
        const sVisitedCount = sLocations.filter(l => visitedLocations.includes(l.id)).length;
        const total = sLocations.length;
        const isUnlocked = total > 0 && sVisitedCount === total;

        return {
            id: `series-${s.id}`,
            title: `${s.title} Super Fan`,
            desc: `Visited all ${total} locations`,
            isUnlocked,
            progress: total > 0 ? (sVisitedCount / total) * 100 : 0,
            image: s.poster
        };
    }).filter(s => s.isUnlocked || s.progress > 0); // Only show if started or unlocked? Or show all? Let's show only unlocked for clutter, or maybe all "In Progress" ones? 
    // Let's show strictly unlocked ones in a "Collection" section to keep it clean, or maybe separate sections.

    const unlockedMilestones = milestones.filter(m => visitedCount >= m.min);
    const nextMilestone = milestones.find(m => visitedCount < m.min);

    return (
        <div className="space-y-8">

            {/* Milestones Section */}
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Adventure Tokens ({unlockedMilestones.length})
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {milestones.map((m) => {
                        const isUnlocked = visitedCount >= m.min;
                        return (
                            <div
                                key={m.id}
                                className={cn(
                                    "p-4 rounded-xl border flex flex-col items-center text-center transition-all",
                                    isUnlocked ? `border-2 ${m.color} shadow-sm` : "bg-gray-50 border-gray-100 opacity-60"
                                )}
                            >
                                <div className={cn(
                                    "w-16 h-16 rounded-full flex items-center justify-center mb-3 text-3xl",
                                    isUnlocked ? "bg-white shadow-inner" : "bg-gray-200"
                                )}>
                                    {isUnlocked ? "🪙" : <Lock className="w-6 h-6 text-gray-400" />}
                                </div>
                                <h4 className={cn("font-bold mb-1", isUnlocked ? "text-gray-900" : "text-gray-500")}>{m.title}</h4>
                                <p className="text-xs text-gray-500 mb-2">{m.desc}</p>
                                {isUnlocked && (
                                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-white/50 border border-black/5">
                                        {m.token}
                                    </span>
                                )}
                                {!isUnlocked && (
                                    <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
                                        <div
                                            className="bg-gray-400 h-full transition-all"
                                            style={{ width: `${Math.min((visitedCount / m.min) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Series Achievements */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Medal className="w-5 h-5 text-purple-500" />
                    Series Collections
                </h3>

                {seriesAchievements.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {seriesAchievements.map((item) => (
                            <div
                                key={item.id}
                                className={cn(
                                    "p-4 rounded-xl border flex items-center gap-4 transition-all",
                                    item.isUnlocked
                                        ? "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100 shadow-sm"
                                        : "bg-white border-gray-100"
                                )}
                            >
                                <div className="relative w-16 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                    <img src={item.image} alt="" className={cn("object-cover w-full h-full", !item.isUnlocked && "grayscale")} />
                                    {item.isUnlocked && (
                                        <div className="absolute inset-0 bg-yellow-500/20 flex items-center justify-center">
                                            <Star className="w-8 h-8 text-yellow-400 drop-shadow-md fill-yellow-400" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                                    <p className="text-xs text-gray-500 mb-2">{item.desc}</p>

                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                                            <div
                                                className={cn("h-full transition-all", item.isUnlocked ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-gray-300")}
                                                style={{ width: `${item.progress}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs font-bold text-gray-600">{Math.round(item.progress)}%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed text-gray-400 text-sm">
                        เยี่ยมชมสถานที่ต่างๆ เพื่อปลดล็อกตราแฟนพันธุ์แท้!
                    </div>
                )}
            </div>
        </div>
    );
}
