import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";

export async function CTASection() {
    const t = await getTranslations("Home.cta");
    const session = await auth();

    if (session?.user) {
        return null; // Hide CTA section if user is logged in
    }

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gray-900 z-0">
                <Image
                    src="/images/ancient-city.jpg"
                    alt="Footer BG"
                    fill
                    className="object-cover opacity-10 mix-blend-overlay"
                />
            </div>
            <div className="container mx-auto px-4 relative z-10 text-center">
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-blue-100 mb-10 opacity-90">
                        {t('subtitle')}
                    </p>
                    <Link href="/explore">
                        <Button size="lg" className="h-14 px-8 bg-white text-blue-600 hover:bg-gray-50 rounded-full text-lg shadow-xl shadow-blue-900/20 hover:scale-105 transition-all">
                            {t('button')} <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
