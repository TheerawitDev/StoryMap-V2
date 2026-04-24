import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { StoreInitializer } from "@/components/StoreInitializer";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import { Providers } from "@/components/Providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const saoChingcha = localFont({
  src: [
    {
      path: "../fonts/SaoChingcha-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/SaoChingcha-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/SaoChingcha-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sao-chingcha",
  display: "swap",
});

export const metadata: Metadata = {
  title: "StoryMap - Set-jetting to Thailand",
  description: "Discover real-world filming locations of your favorite Thai series.",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={saoChingcha.variable} suppressHydrationWarning>
      <body className={`${saoChingcha.variable} font-sans antialiased bg-gray-50 text-gray-900 flex flex-col min-h-screen`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Navbar />
            <StoreInitializer />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
