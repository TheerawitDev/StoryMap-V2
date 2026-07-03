import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function TermsPage() {
    const t = useTranslations("Terms");
    const tPlaceholders = useTranslations("Placeholders");
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" /> {tPlaceholders("back")}
            </Link>
            
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
                <header className="mb-10 border-b border-gray-100 pb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("title")}</h1>
                    <p className="text-sm text-gray-500">{t("lastUpdated")}</p>
                </header>

                <div className="prose prose-gray max-w-none">
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                        {t("intro")}
                    </p>

                    {[1, 2, 3, 4, 5].map((section) => (
                        <div key={section} className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                {t(`sections.${section}.title`)}
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                {t(`sections.${section}.content`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
