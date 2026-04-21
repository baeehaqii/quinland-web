import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Navbar } from "@/v0-ui-quinland/components/layout/navbar";
import { Footer } from "@/v0-ui-quinland/components/layout/footer";
import { BookingSidebar } from "@/v0-ui-quinland/components/detail/booking-sidebar";
import { ChevronRight, MessageCircle, Calendar, User, Share2 } from "lucide-react";

interface ArticleItem {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    og_image?: string;
    og_url?: string;
    date: string;
    category: string;
    author: string;
    slug: string;
    cta_whatsapp: boolean;
}

interface ArtikelDetailProps {
    article: ArticleItem;
    latestArticles: any[];
    media?: Record<string, string>;
}

const WA_NUMBER = '6281215550665';

export default function ArtikelDetail({ article, latestArticles, media = {} }: ArtikelDetailProps) {
    const heroImage = media.artikel_hero || "/storage/media/blog-1.jpg";
    const pageUrl = article.og_url || (typeof window !== 'undefined' ? window.location.href : '');
    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedTitle = encodeURIComponent(article.title);

    const shareLinks = {
        whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    };

    return (
        <div className="bg-[#f8faf6] text-[#191c1b] font-sans selection:bg-[#cceacd] selection:text-[#07200e]">
            <Head title={`${article.title} - Artikel | Quinland Grup`}>
                <meta head-key="description" name="description" content={article.excerpt ?? ''} />
                <meta head-key="og:type" property="og:type" content="article" />
                <meta head-key="og:title" property="og:title" content={article.title} />
                <meta head-key="og:description" property="og:description" content={article.excerpt ?? ''} />
                {article.og_image && <meta head-key="og:image" property="og:image" content={article.og_image} />}
                {article.og_url && <meta head-key="og:url" property="og:url" content={article.og_url} />}
                <meta head-key="og:site_name" property="og:site_name" content="Quinland Grup" />
                <meta head-key="twitter:card" name="twitter:card" content="summary_large_image" />
                <meta head-key="twitter:title" name="twitter:title" content={article.title} />
                <meta head-key="twitter:description" name="twitter:description" content={article.excerpt ?? ''} />
                {article.og_image && <meta head-key="twitter:image" name="twitter:image" content={article.og_image} />}
            </Head>

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
                            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground mb-10 pb-10 border-b border-border">
                                <div className="flex flex-wrap items-center gap-4">
                                    <span className="flex items-center gap-2">
                                        <Calendar className="size-4" />
                                        {article.date}
                                    </span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
                                    <span className="flex items-center gap-2">
                                        <User className="size-4" />
                                        {article.author}
                                    </span>
                                </div>

                                {/* Share Buttons */}
                                <div className="flex items-center gap-2">
                                    <Share2 className="size-4 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground mr-1">Bagikan:</span>
                                    <a
                                        href={shareLinks.whatsapp}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Bagikan via WhatsApp"
                                        className="flex items-center justify-center w-8 h-8 rounded-full bg-[#25D366] text-white hover:opacity-90 transition-opacity"
                                    >
                                        <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                                    </a>
                                    <a
                                        href={shareLinks.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Bagikan via Facebook"
                                        className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1877F2] text-white hover:opacity-90 transition-opacity"
                                    >
                                        <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                    </a>
                                    <a
                                        href={shareLinks.x}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Bagikan via X (Twitter)"
                                        className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white hover:opacity-80 transition-opacity"
                                    >
                                        <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.737-8.835L1.254 2.25H8.08l4.258 5.633 5.905-5.633Zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                    </a>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="prose prose-emerald prose-lg max-w-none text-[#191c1b] leading-relaxed">
                                <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
                            </div>

                            {/* CTA WhatsApp - conditional */}
                            {article.cta_whatsapp && (
                                <div className="mt-12 p-8 rounded-3xl bg-emerald-50 border border-emerald-100 flex flex-col sm:flex-row items-center gap-6">
                                    <div className="flex-1">
                                        <h3 className="font-black text-xl text-emerald-900 mb-2">Tertarik? Konsultasikan Sekarang</h3>
                                        <p className="text-emerald-700/80 text-sm leading-relaxed">Tim ahli kami siap membantu Anda menemukan hunian impian yang sesuai dengan kebutuhan dan budget Anda.</p>
                                    </div>
                                    <a
                                        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo, saya tertarik setelah membaca artikel: ' + article.title)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex shrink-0 items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                                    >
                                        <MessageCircle className="size-4" />
                                        Hubungi via WhatsApp
                                    </a>
                                </div>
                            )}
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
                                <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700">
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
