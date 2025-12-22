import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { StoreInitializer } from "@/components/StoreInitializer";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const kanit = Kanit({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-kanit",
});

export const metadata: Metadata = {
  title: "StoryMap - Set-jetting to Thailand",
  description: "Discover real-world filming locations of your favorite Thai series.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${kanit.variable} font-sans antialiased bg-background text-foreground flex flex-col min-h-screen`}
      >
        <Navbar />
        <StoreInitializer />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
