import { Link, Head, router } from '@inertiajs/react';
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { useState, useEffect } from 'react';

// Import Components
import { EventsSection } from "@/v0-ui-quinland/components/events/events-section";
import { FaqSection } from "@/v0-ui-quinland/components/faq/faq-section";
import { Footer } from "@/v0-ui-quinland/components/layout/footer";
import { Navbar } from "@/v0-ui-quinland/components/layout/navbar";
import { PropertyCard, type Property } from "@/v0-ui-quinland/components/properties/property-card";

/* ─── 1. Definisi Types ─── */
interface HeroSlide {
  image_url?: string;
  alt: string;
  tagline: string;
  heading: string;
  cta_label?: string;
  cta_url?: string;
}

interface PageSection {
  type: string;
  data: {
    title?: string;
    description?: string;
    cta_label?: string;
    cta_url?: string;
    slides?: HeroSlide[];
    features?: { feature: string }[];
  };
}

interface Props {
  page: {
    title: string;
    content: PageSection[];
  };
  properties?: Property[];
  searchParams?: {
    project?: string | null;
    kategori?: string | null;
    location?: string | null;
    price?: string | null;
  };
}

/* ─── 2. Data Statis Fallback (DISINKRONKAN DENGAN MODEL LARAVEL) ─── */
const ALL_PROPERTIES_SYNCED: Property[] = [
  {
    id: "1",
    name: "Skyline Space",
    location: "45 Pine Street",
    slug: "skyline-space",
    image: ["media/property-1.jpg"], // Harus Array
    tipe_rumah: [{ sqft: 3200, bedrooms: 5, bathrooms: 4 }] // Harus Array of Object
  },
  {
    id: "2",
    name: "Urban Oasis",
    location: "24 Brooklyn St.",
    slug: "urban-oasis",
    image: ["media/property-2.jpg"],
    tipe_rumah: [{ sqft: 2800, bedrooms: 6, bathrooms: 4 }]
  },
  {
    id: "3",
    name: "White Haven",
    location: "Oak Lane",
    slug: "white-haven",
    image: ["media/property-3.jpg"],
    tipe_rumah: [{ sqft: 4500, bedrooms: 6, bathrooms: 5 }]
  }
];

export default function PropertyPage({ page, properties = ALL_PROPERTIES_SYNCED, searchParams = {} }: Props) {
  /* ─── 3. Hooks (Wajib di atas) ─── */
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroBlock = page?.content?.find(b => b.type === 'hero');
  const slides = heroBlock?.data?.slides || [];

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  /* ─── 4. Guard Clause ─── */
  if (!page || !page.content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="animate-pulse font-medium text-foreground">Loading content...</p>
      </div>
    );
  }

  /* ─── 5. Mapping Data ─── */
  const propertyBlock = page.content.find(b => b.type === 'properties');
  const eventBlock = page.content.find(b => b.type === 'events');

  const goToNext = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const goToPrev = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  // Active filters derived from searchParams
  const activeFilters = Object.entries(searchParams)
    .filter(([, v]) => v)
    .map(([k, v]) => ({ key: k, value: v as string }));

  const hasFilters = activeFilters.length > 0;

  function clearFilter(key: string) {
    const params: Record<string, string> = {};
    Object.entries(searchParams).forEach(([k, v]) => {
      if (k !== key && v) params[k] = v;
    });
    router.visit('/property', { data: params });
  }

  function clearAllFilters() {
    router.visit('/property');
  }

  // Ambil data untuk Featured Residence
  const featured = properties[0] || ALL_PROPERTIES_SYNCED[0];
  const featuredImageRaw = featured.image?.[0] ?? '';
  const featuredImage = featuredImageRaw
    ? (featuredImageRaw.startsWith('http://') || featuredImageRaw.startsWith('https://') || featuredImageRaw.startsWith('/storage/')
      ? featuredImageRaw
      : `/storage/${featuredImageRaw.replace(/^\/+/, '')}`)
    : '/storage/media/property-1.jpg';

  return (
    <div className="min-h-screen bg-background">
      <Head title={page?.title ? `${page.title} | Quinland Grup` : "Property | Quinland Grup"} />
      <Navbar />

      {/* Hero Carousel */}
      <section className="relative h-[450px] w-full overflow-hidden sm:h-[550px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
            <img
              src={slide.image_url || "/storage/media/property-hero.jpg"}
              alt={slide.alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            <div className="relative z-20 mx-auto flex h-full w-full max-w-7xl flex-col justify-end px-6 pb-12 lg:px-10">
              <nav className="mb-4 flex items-center gap-1.5 text-sm text-white/70">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="size-3.5" />
                <span className="font-semibold text-white">{page.title}</span>
              </nav>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">{slide.heading}</h1>
              <p className="mt-3 max-w-xl text-lg text-white/80">{slide.tagline}</p>
            </div>
          </div>
        ))}

        {slides.length > 1 && (
          <div className="absolute inset-0 z-30 flex items-center justify-between px-4">
            <button onClick={goToPrev} className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all">
              <ChevronLeft className="size-6" />
            </button>
            <button onClick={goToNext} className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all">
              <ChevronRight className="size-6" />
            </button>
          </div>
        )}
      </section>

      <main>
        {/* Featured Residence */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <Link
            href={`/property/${featured.slug}`}
            className="group relative block overflow-hidden rounded-3xl"
          >
            <div className="relative h-[300px] sm:h-[380px]">
              <img
                src={featuredImage}
                alt={featured.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12">
              <span className="text-sm font-medium tracking-wide text-white/70 uppercase">Featured Residence</span>
              <h2 className="mt-2 text-3xl font-bold text-white group-hover:text-emerald-300 transition-colors sm:text-4xl">
                {featured.name}
              </h2>
            </div>
          </Link>
        </section>

        {/* Property Grid */}
        <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
          <div className="mb-8 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {hasFilters ? "Search Results" : (propertyBlock?.data?.title || "All Properties")}
                </h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {propertyBlock?.data?.features?.map((f: any, index: number) => (
                    <span key={index} className="px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                      {f.feature}
                    </span>
                  ))}
                </div>
                {propertyBlock?.data?.description && !hasFilters && (
                  <p className="text-sm text-muted-foreground mt-2">{propertyBlock.data.description}</p>
                )}
              </div>
              <span className="shrink-0 text-sm text-muted-foreground">
                {properties.length} {properties.length === 1 ? 'project' : 'projects'} found
              </span>
            </div>

            {/* Active filter chips */}
            {hasFilters && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">Filters:</span>
                {activeFilters.map(({ key, value }) => (
                  <span
                    key={key}
                    className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {value}
                    <button
                      type="button"
                      onClick={() => clearFilter(key)}
                      className="ml-0.5 rounded-full p-0.5 hover:bg-primary/20 transition-colors"
                      aria-label={`Remove ${value} filter`}
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-xs text-muted-foreground underline hover:text-foreground transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.length > 0 ? (
              properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <div className="col-span-full py-16 text-center">
                <p className="text-lg font-semibold text-foreground">Tidak ada properti ditemukan</p>
                <p className="mt-2 text-sm text-muted-foreground">Coba ubah atau hapus filter pencarian Anda.</p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Lihat Semua Properti
                </button>
              </div>
            )}
          </div>
        </section>

        <EventsSection
          title={eventBlock?.data?.title}
          ctaLabel={eventBlock?.data?.cta_label}
          ctaUrl={eventBlock?.data?.cta_url}
        />
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}