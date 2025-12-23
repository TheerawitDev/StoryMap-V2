
"use client";

import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";

export function VisitedCount() {
    const { visitedLocations } = useStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="text-3xl font-bold text-gray-400 mb-1">-</div>;

    return (
        <>
            <div className="text-3xl font-bold text-primary mb-1">{visitedLocations.length}</div>
            <div className="text-sm text-gray-600 font-medium">สถานที่ที่เช็คอินแล้ว</div>
        </>
    );
}
