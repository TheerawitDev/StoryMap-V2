
import { Sidebar } from "@/components/Sidebar";
import MapWithNoSSR from "@/components/MapWithNoSSR";

export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">
      <Sidebar />
      <div className="absolute inset-0 z-0">
        <MapWithNoSSR />
      </div>
    </main>
  );
}
