import { ArrowLeft, Mail, Phone, MapPin, Send } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";

export default function ContactPage() {
    const t = useTranslations("Contact");
    return (
        <div className="container mx-auto px-4 py-16 max-w-5xl">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> {t('backHome')}
            </Link>
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-0 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-gray-100">
                {/* Left Side: Contact Info */}
                <div className="bg-primary/5 p-8 md:p-12 flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">{t('title')}</h1>
                        <p className="text-gray-600 text-lg leading-relaxed mb-10">
                            {t('subtitle')}
                        </p>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 shrink-0">
                                    <Mail className="w-5 h-5 text-primary" />
                                </div>
                                <div className="pt-1">
                                    <h3 className="font-semibold text-gray-900">Email</h3>
                                    <p className="text-gray-600 mt-1">contact@storymap.app</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 shrink-0">
                                    <Phone className="w-5 h-5 text-primary" />
                                </div>
                                <div className="pt-1">
                                    <h3 className="font-semibold text-gray-900">Phone</h3>
                                    <p className="text-gray-600 mt-1">02-123-4567</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 shrink-0">
                                    <MapPin className="w-5 h-5 text-primary" />
                                </div>
                                <div className="pt-1">
                                    <h3 className="font-semibold text-gray-900">Office</h3>
                                    <p className="text-gray-600 mt-1">Bangkok, Thailand</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Contact Form */}
                <div className="p-8 md:p-12 bg-white">
                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Thanks for your message!"); }}>
                        <div className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-900">{t('firstName')}</label>
                                    <Input placeholder="" className="bg-gray-50/50" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-900">{t('lastName')}</label>
                                    <Input placeholder="" className="bg-gray-50/50" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">{t('email')}</label>
                                <Input type="email" placeholder="" className="bg-gray-50/50" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">{t('message')}</label>
                                <Textarea 
                                    placeholder={t('messagePlaceholder')} 
                                    className="min-h-[150px] bg-gray-50/50 resize-y" 
                                />
                            </div>
                        </div>
                        <Button className="w-full h-12 text-base rounded-xl font-medium shadow-sm transition-all hover:scale-[1.02]" type="submit">
                            <Send className="w-4 h-4 mr-2" /> {t('send')}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
