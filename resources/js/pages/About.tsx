import { Link, Head } from '@inertiajs/react';
import {
  ChevronRight,
  Eye,
  Target,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react"
import { Navbar } from "@/v0-ui-quinland/components/layout/navbar"
import { Footer } from "@/v0-ui-quinland/components/layout/footer"
import { PropertyCard, type Property } from "@/v0-ui-quinland/components/properties/property-card"

/* ────────────────────────── Static Data ────────────────────────── */

const PROPERTIES: Property[] = [
  {
    id: "1",
    name: "Skyline Space",
    location: "45 Pine Street",
    image: "/storage/media/property-1.jpg",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3200,
    category: "Featured",
  },
  {
    id: "2",
    name: "Urban Oasis",
    location: "24 Brooklyn St.",
    image: "/storage/media/property-2.jpg",
    bedrooms: 6,
    bathrooms: 4,
    sqft: 2800,
    category: "Featured",
  },
  {
    id: "3",
    name: "White Haven",
    location: "Oak Lane",
    image: "/storage/media/property-3.jpg",
    bedrooms: 6,
    bathrooms: 5,
    sqft: 4500,
    category: "Featured",
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        {/* ─── Hero Banner ─── */}
        <section className="relative flex h-[340px] items-end overflow-hidden sm:h-[400px]">
          <img
            src="/storage/media/about-hero.jpg"
            alt="About Quinland Grup"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 lg:px-10">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex items-center gap-1.5 text-sm text-white/70"
            >
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="font-semibold text-white">About</span>
            </nav>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Quinland Grup
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-white/80">
              The largest and most diversified property developer in Indonesia
            </p>
          </div>
        </section>

        {/* ─── About Section (2 columns) ─── */}
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left - Text */}
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
                Tentang Kami
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Membangun Masa Depan, Menciptakan Kebahagiaan
              </h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Quinland Grup adalah pengembang properti terkemuka di Indonesia
                yang telah berpengalaman selama lebih dari 20 tahun dalam
                membangun hunian berkualitas tinggi. Kami berkomitmen untuk
                menghadirkan properti yang tidak hanya nyaman, tetapi juga
                bernilai investasi tinggi.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Dengan portofolio yang mencakup perumahan, apartemen, dan
                kawasan komersial di berbagai kota besar Indonesia, kami terus
                berinovasi untuk memenuhi kebutuhan masyarakat modern akan
                hunian yang berkualitas dan terjangkau.
              </p>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl font-bold text-foreground">20+</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Tahun Pengalaman
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">150+</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Project Selesai
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">10K+</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Keluarga Bahagia
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Image */}
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/storage/media/about-team.jpg"
                alt="Tim Quinland Grup"
                width={640}
                height={480}
                className="h-[380px] w-full object-cover sm:h-[440px]"
              />
            </div>
          </div>
        </section>

        {/* ─── Vision & Mission ─── */}
        <section className="bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
                Visi & Misi
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Landasan Kami Berkarya
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Vision Card */}
              <div className="rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-lg">
                <div className="flex size-14 items-center justify-center rounded-xl bg-emerald-100">
                  <Eye className="size-7 text-emerald-700" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-foreground">
                  Visi Kami
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Menjadi pengembang properti terdepan di Indonesia yang
                  menghadirkan hunian berkualitas tinggi, berkelanjutan, dan
                  terjangkau untuk seluruh lapisan masyarakat. Kami percaya
                  setiap keluarga berhak memiliki rumah impian.
                </p>
              </div>

              {/* Mission Card */}
              <div className="rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-lg">
                <div className="flex size-14 items-center justify-center rounded-xl bg-emerald-100">
                  <Target
                    className="size-7 text-emerald-700"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="mt-6 text-xl font-bold text-foreground">
                  Misi Kami
                </h3>
                <ul className="mt-3 flex flex-col gap-3 leading-relaxed text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-600" />
                    Mengembangkan kawasan hunian yang terintegrasi dengan
                    fasilitas modern dan ramah lingkungan.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-600" />
                    Memberikan pelayanan terbaik kepada konsumen mulai dari
                    proses pembelian hingga after-sales.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-600" />
                    Berinovasi dalam desain dan teknologi untuk menciptakan
                    properti yang bernilai investasi tinggi.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-600" />
                    Berkontribusi dalam pembangunan infrastruktur dan ekonomi
                    daerah di seluruh Indonesia.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Office Section ─── */}
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
              Kantor Kami
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Kunjungi Kantor Quinland Grup
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
            {/* Office Image */}
            <div className="overflow-hidden rounded-2xl">
              <img
                src="/storage/media/office.jpg"
                alt="Kantor Quinland Grup"
                width={640}
                height={400}
                className="h-[300px] w-full object-cover sm:h-[360px]"
              />
            </div>

            {/* Office Details */}
            <div className="flex flex-col gap-6">
              <h3 className="text-2xl font-bold text-foreground">
                Kantor Pusat - Jakarta
              </h3>

              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                    <MapPin
                      className="size-5 text-emerald-700"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Alamat
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan 12190
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                    <Phone
                      className="size-5 text-emerald-700"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Telepon
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      +62 21 5292 1888
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                    <Mail
                      className="size-5 text-emerald-700"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Email
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      info@quinlandgrup.co.id
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                    <Clock
                      className="size-5 text-emerald-700"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Jam Operasional
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      Senin - Jumat, 08:00 - 17:00 WIB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Properties Section ─── */}
        <section className="bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
                  Project Kami
                </span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Properti Unggulan
                </h2>
              </div>
              <Link
                href="/"
                className="hidden items-center gap-1 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-800 sm:flex"
              >
                Lihat Semua
                <ChevronRight className="size-4" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PROPERTIES.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700"
              >
                Lihat Semua
                <ChevronRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
