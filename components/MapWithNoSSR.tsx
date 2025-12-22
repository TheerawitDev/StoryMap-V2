
"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
    ssr: false,
    loading: () => <div className="h-full w-full flex items-center justify-center bg-zinc-900 text-white">Loading Map...</div>
});

export default function MapWithNoSSR() {
    return <Map />;
}
