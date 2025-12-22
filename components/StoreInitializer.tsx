
"use client";

import { useStore } from "@/store/useStore";
import { useEffect, useRef } from "react";

export function StoreInitializer() {
    const fetchData = useStore((state) => state.fetchData);
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            fetchData();
            initialized.current = true;
        }
    }, [fetchData]);

    return null;
}
