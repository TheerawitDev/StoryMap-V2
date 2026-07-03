
import { MapPin } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function Footer() {
    const t = useTranslations("Footer");

    return (
        <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 py-16 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1 space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <MapPin className="w-8 h-8 text-primary" />
                            <span className="font-bold text-2xl text-white">StoryMap</span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-400">
                            {t("description")}
                        </p>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-white">{t("explore.title")}</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/explore" className="hover:text-primary transition-colors">{t("explore.popularSeries")}</Link></li>
                            <li><Link href="/places" className="hover:text-primary transition-colors">{t("explore.landmarks")}</Link></li>
                            <li><Link href="/submit-series" className="hover:text-primary transition-colors">{t("explore.addYourSeries")}</Link></li>
                            <li><Link href="/collections" className="hover:text-primary transition-colors">{t("explore.recommendedCollections")}</Link></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-white">{t("company.title")}</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/about" className="hover:text-primary transition-colors">{t("company.aboutUs")}</Link></li>
                            <li><Link href="/careers" className="hover:text-primary transition-colors">{t("company.careers")}</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">{t("company.privacy")}</Link></li>
                            <li><Link href="/terms" className="hover:text-primary transition-colors">{t("company.terms")}</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-white">{t("newsletter.title")}</h4>
                        <p className="text-sm text-gray-400 mb-4">{t("newsletter.description")}</p>
                        <form className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder={t("newsletter.placeholder")}
                                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-500"
                            />
                            <button
                                type="button" // Change to submit if integrating real form
                                className="bg-primary hover:bg-primary/90 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                            >
                                {t("newsletter.button")}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>{t("copyright", { year: new Date().getFullYear() })}</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">Facebook</Link>
                        <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                        <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
