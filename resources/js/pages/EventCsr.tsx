import { Link } from '@inertiajs/react';
import {
  ChevronRight,
  TreePine,
  GraduationCap,
  HeartPulse,
  Home,
  ArrowRight,
  Calendar,
} from "lucide-react"
import { EventsSection } from "@/v0-ui-quinland/components/events/events-section"
import { FaqSection } from "@/v0-ui-quinland/components/faq/faq-section"
import { Footer } from "@/v0-ui-quinland/components/layout/footer"
import { Navbar } from "@/v0-ui-quinland/components/layout/navbar"
import { resolveMediaUrl } from "@/lib/resolve-media-url"

const CSR_PROGRAMS = [
  {
    id: 1,
    title: "Rumah untuk Semua",
    description:
      "Program pembangunan rumah layak huni bagi keluarga kurang mampu di berbagai wilayah Indonesia. Bersama relawan dan mitra, kami membantu mewujudkan hunian yang aman dan nyaman.",
    image: "/storage/media/csr-1.jpg",
    category: "Housing",
    icon: Home,
    date: "Ongoing",
  },
  {
    id: 2,
    title: "Quinland Green Initiative",
    description:
      "Inisiatif penanaman 10.000 pohon di kawasan perumahan dan area publik untuk menciptakan lingkungan hijau yang berkelanjutan bagi generasi mendatang.",
    image: "/storage/media/csr-2.jpg",
    category: "Lingkungan",
    icon: TreePine,
    date: "Jan - Des 2026",
  },
  {
    id: 3,
    title: "Beasiswa Pendidikan Anak Bangsa",
    description:
      "Program beasiswa pendidikan bagi anak-anak berprestasi dari keluarga prasejahtera di sekitar kawasan pengembangan Quinland Grup.",
    image: "/storage/media/csr-3.jpg",
    category: "Pendidikan",
    icon: GraduationCap,
    date: "Tahun Ajaran 2026",
  },
  {
    id: 4,
    title: "Layanan Kesehatan Masyarakat",
    description:
      "Kegiatan pemeriksaan kesehatan gratis dan penyuluhan gizi untuk warga di sekitar proyek pengembangan, bekerja sama dengan rumah sakit dan tenaga medis profesional.",
    image: "/storage/media/csr-4.jpg",
    category: "Kesehatan",
    icon: HeartPulse,
    date: "Quarterly",
  },
]

export const metadata = {
  title: "Event & CSR - Quinland Grup",
  description:
    "Kegiatan event properti dan program Corporate Social Responsibility Quinland Grup untuk masyarakat dan lingkungan.",
}

interface EventCsrPageProps {
  media?: Record<string, string>
  csrs?: any[]
}

export default function EventCsrPage({ media = {}, csrs = [] }: EventCsrPageProps) {
  const csrItems = csrs.length > 0 ? csrs : CSR_PROGRAMS
  const heroImage = resolveMediaUrl(media.event_csr_hero, "/storage/media/event-csr-hero.jpg")
  const csrImages = [
    resolveMediaUrl(media.csr_1, "/storage/media/csr-1.jpg"),
    resolveMediaUrl(media.csr_2, "/storage/media/csr-2.jpg"),
    resolveMediaUrl(media.csr_3, "/storage/media/csr-3.jpg"),
    resolveMediaUrl(media.csr_4, "/storage/media/csr-4.jpg"),
  ]

  return (
    <>
      <Navbar />
      <main className="bg-background">
        {/* ─── Hero Banner ─── */}
        <section className="relative h-[340px] w-full overflow-hidden sm:h-[400px]">
          <img
            src={heroImage}
            alt="Event & CSR Quinland Grup"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-12 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mb-4 flex items-center gap-1.5 text-sm text-white/70"
            >
              <Link
                href="/"
                className="transition-colors hover:text-white"
              >
                Home
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="font-medium text-white">Event & CSR</span>
            </nav>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Event & CSR
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              Berbagai kegiatan event properti eksklusif dan program tanggung
              jawab sosial Quinland Grup untuk masyarakat dan lingkungan.
            </p>
          </div>
        </section>

        {/* ─── Events Section ─── */}
        <EventsSection />

        {/* ─── CSR Section ─── */}
        <section className="bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="mb-12 max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
                Corporate Social Responsibility
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Komitmen Kami untuk Masyarakat
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Quinland Grup percaya bahwa pembangunan yang berkelanjutan
                tidak hanya soal properti, tetapi juga tentang membangun
                kehidupan yang lebih baik bagi masyarakat sekitar.
              </p>
            </div>

            {/* CSR Cards Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {csrItems.map((program: any) => {
                const Icon = program.icon || HeartPulse
                return (
                  <Link
                    href={`/event-csr/csr/${program.slug || program.id}`}
                    key={program.id}
                    className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg block"
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={csrImages[program.id - 1] || program.image}
                        alt={program.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Category badge */}
                      <div className="absolute left-4 top-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                          <Icon className="size-3" />
                          {program.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-emerald-700">
                        {program.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {program.description}
                      </p>

                      {/* Footer */}
                      <div className="mt-5 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="size-3.5" />
                          <span>{program.date}</span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 transition-colors group-hover:text-emerald-800">
                          Selengkapnya
                          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── FAQ Section ─── */}
        <FaqSection />
      </main>
      <Footer />
    </>
  )
}
