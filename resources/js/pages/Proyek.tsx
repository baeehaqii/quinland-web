import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { Navbar } from '@/v0-ui-quinland/components/layout/navbar';
import { Footer } from '@/v0-ui-quinland/components/layout/footer';
import { PropertyCard, type Property } from '@/v0-ui-quinland/components/properties/property-card';

interface ProyekProperty extends Property {
    kategori: string | null;
    harga_mulai: string | null;
}

interface PageData {
    id: number;
    title: string;
    slug: string;
    content: any;
    seo_title?: string;
    seo_description?: string;
}

interface ProyekProps {
    page?: PageData | null;
    properties?: ProyekProperty[];
}

export default function Proyek({ page, properties = [] }: ProyekProps) {
    const pageTitle = page?.seo_title || page?.title || 'Proyek Kami';
    const seoDesc = page?.seo_description || 'Jelajahi berbagai proyek properti unggulan dari Quinland Grup.';

    // Kumpulkan kategori unik dari data properties
    const categories = ['Semua', ...Array.from(
        new Set(properties.map(p => p.kategori).filter(Boolean) as string[])
    )];

    const [activeCategory, setActiveCategory] = useState('Semua');

    const filtered = activeCategory === 'Semua'
        ? properties
        : properties.filter(p => p.kategori === activeCategory);

    return (
        <>
            <Head>
                <title>{pageTitle} | Quinland Grup</title>
                <meta name="description" content={seoDesc} />
            </Head>

            <Navbar />

            {/* ─── Hero Banner ─── */}
            <section className="relative flex h-[300px] items-end overflow-hidden sm:h-[380px]">
                <div className="absolute inset-0 bg-[url('/storage/media/property-hero.jpg')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20" />

                <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 lg:px-10">
                    <nav
                        aria-label="Breadcrumb"
                        className="mb-4 flex items-center gap-1.5 text-sm text-white/70"
                    >
                        <Link href="/" className="transition-colors hover:text-white">
                            Home
                        </Link>
                        <ChevronRight className="size-3.5" />
                        <span className="font-semibold text-white">Proyek</span>
                    </nav>

                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        {page?.title || 'Proyek Kami'}
                    </h1>
                    <p className="mt-3 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                        Temukan hunian impian Anda dari berbagai proyek unggulan yang kami kembangkan.
                    </p>
                </div>
            </section>

            <main className="bg-background">
                <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">

                    {/* ─── Filter Kategori ─── */}
                    {categories.length > 1 && (
                        <div className="mb-10 flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={[
                                        'rounded-full px-5 py-2 text-sm font-semibold transition-colors',
                                        activeCategory === cat
                                            ? 'bg-emerald-700 text-white'
                                            : 'border border-border bg-card text-foreground hover:border-emerald-700 hover:text-emerald-700',
                                    ].join(' ')}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* ─── Property Grid ─── */}
                    {filtered.length === 0 ? (
                        <div className="py-24 text-center">
                            <p className="text-lg text-muted-foreground">
                                {properties.length === 0
                                    ? 'Belum ada proyek yang tersedia.'
                                    : 'Tidak ada proyek untuk kategori ini.'}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6 flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    Menampilkan <span className="font-semibold text-foreground">{filtered.length}</span> proyek
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {filtered.map((property) => (
                                    <PropertyCard key={property.id} property={property} />
                                ))}
                            </div>
                        </>
                    )}

                </div>
            </main>

            <Footer />
        </>
    );
}
