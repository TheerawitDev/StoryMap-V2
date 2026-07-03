import { useTranslations } from "next-intl";

export function FeaturesSection() {
    const t = useTranslations("Home.features");
    
    return (
        <section className="py-24 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden z-10">
            {/* Ambient Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-400/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '3s' }} />
            </div>

            <div className="container px-6 mx-auto relative z-10">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-12 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                        {t('title').split('StoryMap')[0]}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">StoryMap</span>
                        {t('title').split('StoryMap')[1] || '?'}
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Features Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
                    {/* Card 1: Accurate Coordinates */}
                    <div className="group relative p-10 rounded-3xl bg-white/70 backdrop-blur-md border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)] hover:bg-white hover:border-blue-100 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col justify-end min-h-[220px]">
                        {/* Faint card counter */}
                        <div className="absolute -top-6 -right-2 text-9xl font-black text-slate-50 select-none group-hover:text-blue-50/60 transition-colors duration-500">01</div>
                        
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-blue-600 transition-colors duration-300">{t('f1Title')}</h3>
                            <p className="text-slate-600 leading-relaxed font-normal text-[15px] group-hover:text-slate-700 transition-colors duration-300">
                                {t('f1Desc')}
                            </p>
                        </div>
                        {/* Decorative Top Line */}
                        <div className="absolute top-0 left-10 right-10 h-1 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-full"></div>
                    </div>

                    {/* Card 2: In-depth Information */}
                    <div className="group relative p-10 rounded-3xl bg-white/70 backdrop-blur-md border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.12)] hover:bg-white hover:border-indigo-100 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col justify-end min-h-[220px]">
                        {/* Faint card counter */}
                        <div className="absolute -top-6 -right-2 text-9xl font-black text-slate-50 select-none group-hover:text-indigo-50/60 transition-colors duration-500">02</div>
                        
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-indigo-600 transition-colors duration-300">{t('f2Title')}</h3>
                            <p className="text-slate-600 leading-relaxed font-normal text-[15px] group-hover:text-slate-700 transition-colors duration-300">
                                {t('f2Desc')}
                            </p>
                        </div>
                        {/* Decorative Top Line */}
                        <div className="absolute top-0 left-10 right-10 h-1 bg-gradient-to-r from-indigo-400 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-full"></div>
                    </div>

                    {/* Card 3: Series Lovers Community */}
                    <div className="group relative p-10 rounded-3xl bg-white/70 backdrop-blur-md border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.12)] hover:bg-white hover:border-purple-100 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col justify-end min-h-[220px]">
                        {/* Faint card counter */}
                        <div className="absolute -top-6 -right-2 text-9xl font-black text-slate-50 select-none group-hover:text-purple-50/60 transition-colors duration-500">03</div>
                        
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-purple-600 transition-colors duration-300">{t('f3Title')}</h3>
                            <p className="text-slate-600 leading-relaxed font-normal text-[15px] group-hover:text-slate-700 transition-colors duration-300">
                                {t('f3Desc')}
                            </p>
                        </div>
                        {/* Decorative Top Line */}
                        <div className="absolute top-0 left-10 right-10 h-1 bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-full"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
