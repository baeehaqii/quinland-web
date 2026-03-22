import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Navbar } from "@/v0-ui-quinland/components/layout/navbar";
import { Footer } from "@/v0-ui-quinland/components/layout/footer";
import { BookingSidebar } from "@/v0-ui-quinland/components/detail/booking-sidebar";
import { ChevronRight, MessageCircle, Calendar } from "lucide-react";

interface ArticleItem {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    date: string;
    category: string;
    slug: string;
}

interface ArtikelDetailProps {
    article: ArticleItem;
    latestArticles: any[];
    media?: Record<string, string>;
}

export default function ArtikelDetail({ article, latestArticles, media = {} }: ArtikelDetailProps) {
    const heroImage = media.artikel_hero || "/storage/media/blog-1.jpg";
    
    return (
        <div className="bg-[#f8faf6] text-[#191c1b] font-sans selection:bg-[#cceacd] selection:text-[#07200e]">
            <Head title={`${article.title} - Artikel | Quinland Grup`} />
            
            <Navbar />

            <main className="bg-background">
                {/* ─── Hero Banner ─── */}
                <section className="relative h-[340px] w-full overflow-hidden sm:h-[400px]">
                    <img
                        src={heroImage}
                        alt="Artikel Banner"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

                    <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-12 sm:px-6 lg:px-8">
                        {/* Breadcrumb */}
                        <nav
                            aria-label="Breadcrumb"
                            className="mb-4 flex items-center gap-1.5 text-sm text-white/70"
                        >
                            <Link href="/" className="transition-colors hover:text-white">Home</Link>
                            <ChevronRight className="size-3.5" />
                            <Link href="/artikel" className="transition-colors hover:text-white">Artikel</Link>
                            <ChevronRight className="size-3.5" />
                            <span className="font-medium text-white">{article.title}</span>
                        </nav>

                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
                            {article.title}
                        </h1>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
                        {/* Left Side: Article Content */}
                        <div className="flex-1">
                            {/* Featured Image */}
                            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#edeeeb] mb-8">
                                <img 
                                    src={article.image} 
                                    alt={article.title} 
                                    className="w-full h-full object-cover" 
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="inline-block bg-[#cfe6f2] text-[#354a53] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md bg-white/30 text-white">
                                        {article.category}
                                    </span>
                                </div>
                            </div>

                            {/* Meta */}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10 pb-10 border-b border-border">
                                <span className="flex items-center gap-2">
                                    <Calendar className="size-4" />
                                    {article.date}
                                </span>
                                <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
                                <span>Quinland Editorial Team</span>
                            </div>

                            {/* Content */}
                            <div className="prose prose-emerald prose-lg max-w-none text-[#191c1b] leading-relaxed">
                                <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
                            </div>
                        </div>

                        {/* Right Side: Sidebar */}
                        <aside className="w-full lg:w-[320px] space-y-12">
                            {/* Latest Articles Section */}
                            <section>
                                <h3 className="font-sans font-extrabold text-xl mb-8 flex items-center gap-2">
                                    <span className="w-8 h-1 bg-emerald-700"></span> Artikel Terbaru
                                </h3>
                                <div className="space-y-8">
                                    {latestArticles.map((latest, idx) => (
                                        <Link href={`/artikel/${latest.slug || latest.id}`} key={idx} className="group cursor-pointer block">
                                            <div className="flex gap-4 items-center">
                                                <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-[#e7e9e5]">
                                                    <img 
                                                        src={latest.image} 
                                                        alt={latest.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[0.7rem] text-muted-foreground uppercase mb-1">{latest.date}</p>
                                                    <h4 className="font-bold text-sm leading-tight group-hover:text-emerald-700 transition-colors line-clamp-2">
                                                        {latest.title}
                                                    </h4>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>

                            {/* CTA Contact Card */}
                            <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-200 opacity-20 -mr-12 -mt-12 rounded-full"></div>
                                <h3 className="font-black text-xl text-emerald-900 mb-3 leading-tight">Butuh Konsultasi?</h3>
                                <p className="text-emerald-700/80 text-sm mb-6 leading-relaxed">Tim ahli kami siap membantu Anda menemukan hunian impian yang sesuai dengan kebutuhan dan budget Anda.</p>
                                <a href="https://wa.me/6280012345678" target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700">
                                    <MessageCircle className="size-4" />
                                    Tanya via WhatsApp
                                </a>
                            </div>
                            
                            {/* Booking Sidebar Component */}
                            <div className="pt-4">
                                <BookingSidebar />
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
