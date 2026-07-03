import { ArrowLeft, Library } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function CollectionsPage() {
    const tFooter = useTranslations("Footer.explore");
    const tPlaceholders = useTranslations("Placeholders");
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-6">
                <ArrowLeft className="w-4 h-4 mr-1" /> {tPlaceholders("back")}
            </Link>
            <div className="bg-white p-12 rounded-xl shadow-sm border text-center">
                <Library className="w-16 h-16 text-primary mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{tFooter("recommendedCollections")}</h1>
                <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6">
                    {tPlaceholders("comingSoon")}
                </span>
                <p className="text-lg text-gray-600">
                    {tPlaceholders("collectionsDesc")}
                </p>
            </div>
        </div>
    );
}
