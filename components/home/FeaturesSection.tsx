import { useTranslations } from "next-intl";

export function FeaturesSection() {
    const t = useTranslations("Home.features");
    return (
        <section className="py-24 bg-white relative z-10">
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('title')}</h2>
                    <p className="text-lg text-gray-600">{t('subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="group p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2">
                        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{t('f1Title')}</h3>
                        <p className="text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors">
                            {t('f1Desc')}
                        </p>
                    </div>
                    <div className="group p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-2">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{t('f2Title')}</h3>
                        <p className="text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors">
                            {t('f2Desc')}
                        </p>
                    </div>
                    <div className="group p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-2">
                        <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" x2="20" y1="8" y2="14" /><line x1="23" x2="17" y1="11" y2="11" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{t('f3Title')}</h3>
                        <p className="text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors">
                            {t('f3Desc')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
