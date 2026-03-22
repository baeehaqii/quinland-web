import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Navbar } from "@/v0-ui-quinland/components/layout/navbar";
import { Footer } from "@/v0-ui-quinland/components/layout/footer";
import { BookingSidebar } from "@/v0-ui-quinland/components/detail/booking-sidebar";
import { ChevronRight, MessageCircle } from "lucide-react";

interface DetailItem {
    id: number;
    title: string;
    description: string;
    content?: string;
    image: string;
    date: string;
    category: string;
    slug: string;
}

interface EventCsrDetailProps {
    item: DetailItem;
    latestItems: DetailItem[];
    type: 'event' | 'csr';
    media?: Record<string, string>;
}

export default function EventCsrDetail({ item, latestItems, type, media = {} }: EventCsrDetailProps) {
    const pageTitle = type === 'event' ? 'Event Detail' : 'CSR Detail';
    const heroImage = media.event_csr_hero || "/storage/media/event-csr-hero.jpg";
    
    return (
        <div className="bg-[#f8faf6] text-[#191c1b] font-sans selection:bg-[#cceacd] selection:text-[#07200e]">
            <Head title={`${item.title} - ${pageTitle} | Quinland Grup`} />
            
            <Navbar />

            <main className="bg-background">
                {/* ─── Hero Banner ─── */}
                <section className="relative h-[340px] w-full overflow-hidden sm:h-[400px]">
                    <img
                        src={heroImage}
                        alt="Event & CSR Banner"
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
                            <Link href="/event-csr" className="transition-colors hover:text-white">Event & CSR</Link>
                            <ChevronRight className="size-3.5" />
                            <span className="font-medium text-white">{item.title}</span>
                        </nav>

                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            {item.title}
                        </h1>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
                        {/* Left Side: Editorial Content */}
                        <div className="flex-1">
                            {/* Article Image (Restored) */}
                            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#edeeeb] mb-12">
                                <img 
                                    src={item.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuBzSSg73ZhOL2UUNoBt4eUki1_cPP8qjDAWEKcStXje4MeGXnDWEknvZEqNm10rRZP10RT2zU7dB9cXpN-vUYBDjQnKuszQdG06ibfZD8wwDrUk6lScZeDmilfN1-xM0FjKh1iirCtvmpzeDCYLGfjOedp4xk9NKWQ8J1nAuCJn7UupOLngBUmqJW7bk9m_kC8SrLBO9cS9SfS7dCCRQQcce6no7V5s2ZHU-PaBlo7EynRng7QykBd9wW97skSGDYmj1zjDAWjWG-X-"} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#003426]/60 to-transparent"></div>
                                <div className="absolute bottom-8 left-8 right-8">
                                    <span className="inline-block bg-[#cfe6f2] text-[#354a53] px-4 py-1 rounded-full text-[0.75rem] font-sans uppercase tracking-wider mb-4">
                                        {item.category}
                                    </span>
                                    <h1 className="text-white font-sans font-extrabold text-4xl lg:text-5xl tracking-tight leading-tight max-w-3xl">
                                        {item.title}
                                    </h1>
                                </div>
                            </div>

                            {/* Event Details */}
                            <div className="border-[#bfc9c3]/15 pb-12 mb-12">
                                <div>
                                    <h2 className="font-sans text-2xl font-bold text-[#003426] mb-6">Informasi Detail</h2>
                                    <div className="space-y-6 text-[#191c1b] leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: item.content || `<p>${item.description}</p>` }}>
                                        {/* Content rendered from item.content or fallback to item.description */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Sidebar */}
                        <aside className="w-full lg:w-[320px] space-y-12">
                            {/* Latest Events Section */}
                            <section>
                                <h3 className="font-sans font-extrabold text-xl mb-8 flex items-center gap-2">
                                    <span className="w-8 h-1 bg-[#003426]"></span> Terbaru
                                </h3>
                                <div className="space-y-8">
                                    {latestItems.map((latest, idx) => (
                                        <Link href={`/event-csr/${type}/${latest.slug || latest.id}`} key={idx} className="group cursor-pointer block">
                                            <div className="flex gap-4 items-center">
                                                <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-[#e7e9e5]">
                                                    <img 
                                                        src={latest.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuDWweY7r06M07BlCVo9CqxM92nBG07pVrZUehsmg9dWqnbVgp8trWIUTvnV-SZdguhOh_uH_im6w5Vjmps7axlbdoumCPM6QfFwRNYR_rWzBchJUI4Vd4rw3awO2wSuxUz6_GLHTAkRFZig4JZj7pQZsGqBDUk7XChq9nx__uGX_ZFL4xXHLG9Pf8CDv05jfBtk7VCPHCjeunNUWzKmYXIiMRBS6t-pADLEpFGxfkU4iuRG-dC5EaalrFNUa8I8S_076om9p6wdR7-9"} 
                                                        alt={latest.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-sans text-[0.65rem] text-[#404944] uppercase mb-1">{latest.date}</p>
                                                    <h4 className="font-sans font-bold text-sm leading-tight group-hover:text-[#003426] transition-colors line-clamp-2">
                                                        {latest.title}
                                                    </h4>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>

                            {/* CTA Booking Card */}
                            <div className="bg-[#f2f4f1] p-8 rounded-2xl border border-border bg-card shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-green-200 opacity-20 -mr-12 -mt-12 rounded-full"></div>
                                <h3 className="font-sans font-black text-xl text-foreground mb-3 leading-tight">Ikut Serta Dukung Kami</h3>
                                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">Kami membuka kesempatan bagi mitra strategis dan partisipan untuk memperluas dampak positif kegiatan kami.</p>
                                <a href="https://wa.me/6280012345678" target="_blank" rel="noopener noreferrer" className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700">
                                    <MessageCircle className="size-4" />
                                    Hubungi via WhatsApp
                                </a>
                            </div>
                            
                            {/* Booking Sidebar Component */}
                            <BookingSidebar />
                        </aside>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
