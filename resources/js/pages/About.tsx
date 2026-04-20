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
import { Footer } from "@/v0-ui-quinland/components/layout/footer"
import { Navbar } from "@/v0-ui-quinland/components/layout/navbar"
import { PropertyCard, type Property } from "@/v0-ui-quinland/components/properties/property-card"
import { resolveMediaUrl } from "@/lib/resolve-media-url"

interface AboutPageProps {
  media?: Record<string, string>
  page?: any
  properties?: Property[]
}

const DEFAULT_MISSIONS = [
  "Mengembangkan hunian yang berkualitas tinggi dengan mengutamakan kenyamanan, keamanan, dan standar konstruksi terbaik.",
  "Mendorong inovasi dalam desain, teknologi bangunan, dan layanan untuk menciptakan pengalaman tinggal yang modern dan fungsional.",
  "Mewujudkan pembangunan berkelanjutan melalui penggunaan material ramah lingkungan, efisiensi energi, serta tata ruang yang memperhatikan ekosistem.",
  "Memberikan solusi hunian yang inklusif dan terjangkau bagi berbagai lapisan masyarakat.",
  "Meningkatkan kepuasan pelanggan melalui pelayanan profesional, transparansi, dan komitmen jangka panjang terhadap penghuni.",
  "Membangun hubungan yang kuat dengan pemangku kepentingan, mitra, pemerintah, dan masyarakat guna mendukung perkembangan kawasan yang harmonis.",
  "Menciptakan nilai tambah berkelanjutan bagi perusahaan melalui tata kelola yang baik, integritas, dan inovasi bisnis.",
]

const CORE_VALUES = [
  { letter: "Q", value: "Quality", desc: "Komitmen menghadirkan produk perumahan berkualitas tinggi." },
  { letter: "U", value: "Universal", desc: "Hunian untuk seluruh lapisan masyarakat tanpa terkecuali." },
  { letter: "I", value: "Innovation", desc: "Inovasi desain dan teknologi sebagai keunggulan produk kami." },
  { letter: "N", value: "Networking", desc: "Membangun jaringan kuat dengan mitra, pemerintah, dan komunitas." },
  { letter: "L", value: "Loyalty", desc: "Setia kepada pelanggan, mitra, dan nilai-nilai perusahaan." },
  { letter: "A", value: "Agility", desc: "Bergerak cepat dan adaptif dalam setiap kondisi bisnis." },
  { letter: "N", value: "Never Give Up", desc: "Pantang menyerah dalam mewujudkan hunian terbaik." },
  { letter: "D", value: "Dynamic", desc: "Terus berkembang mengikuti kebutuhan pasar dan zaman." },
]

const COMPANY_HISTORY = [
  { year: "2022", name: "Quinland", units: 22, company: "PT. Zahindo Properti Sukses", location: "Jl. Rumono RT 6 RW 2, Jatisawit, Kec. Bumiayu" },
  { year: "2023", name: "Quinland Village", units: 106, company: "PT. Bumikarta Inti Nusa", location: "Karangdempul RT 05, RW 07, Desa Jatisawit, Bumiayu" },
  { year: "2024", name: "Quinland Midtown", units: 24, company: "PT. Zamzami Abadi Properti", location: "Jl. Rumono RT 6 RW 2, Jatisawit, Kec. Bumiayu" },
  { year: "2025", name: "GriyaLand Sumbang", units: 146, company: "PT. Bumikarta Inti Nusa", location: "Jl. Raya Baturaden Timur, Desa Banteran, Sumbang, Banyumas" },
  { year: "2026", name: "GriyaLand Kembaran", units: 197, company: "PT. Zahindo Properti Sukses", location: "Desa Bantarwuni, Kec. Kembaran, Kab. Banyumas", comingSoon: true },
]

export default function AboutPage({ media = {}, page = null, properties = [] }: AboutPageProps) {
  const pageContent = page?.content || []

  const aboutSection = pageContent.find((block: any) => block.type === 'about_section')?.data || {}
  const visionMission = pageContent.find((block: any) => block.type === 'vision_mission')?.data || {}
  const officeSection = pageContent.find((block: any) => block.type === 'office_section')?.data || {}
  const pageHero = pageContent.find((block: any) => block.type === 'page_hero')?.data || {}

  const heroImage = resolveMediaUrl(pageHero?.image_url ?? pageHero?.image_id ?? media.about_hero, "/storage/media/about-hero.jpg")
  const heroTitle = pageHero?.title || "Tentang Quinland Group"
  const heroDesc = pageHero?.description || "Developer properti terpercaya yang menghadirkan hunian berkualitas, inovatif, dan berkelanjutan bagi seluruh lapisan masyarakat."

  return (
    <>
      <Head title="Tentang Kami | Quinland Grup" />
      <Navbar />
      <main className="bg-background">
        {/* ─── Hero Banner ─── */}
        <section className="relative flex h-[340px] items-end overflow-hidden sm:h-[400px]">
          <img
            src={heroImage}
            alt="About Quinland"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 lg:px-10">
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
              {heroTitle}
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-white/80">
              {heroDesc}
            </p>
          </div>
        </section>

        {/* ─── About Section ─── */}
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
                {aboutSection.title || "Tentang Kami"}
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {aboutSection.heading || "For a Better Life"}
              </h2>
              <p className="mt-6 leading-relaxed text-muted-foreground whitespace-pre-wrap">
                {aboutSection.description_1 || "Quinland Group adalah perusahaan pengembang properti yang didirikan oleh Zaldy Musa Muzaky, S.E. pada tahun 2022. Berawal dari bisnis ritel elektronik dan penjualan tempat tidur sejak 2013 yang berhasil menguasai wilayah Brebes bagian selatan, Quinland kini hadir sebagai developer properti terpercaya di Jawa Tengah."}
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground whitespace-pre-wrap">
                {aboutSection.description_2 || "\"For a Better Life\" adalah komitmen kami untuk menghadirkan hunian yang tidak hanya layak secara fisik, tetapi juga mendukung kualitas hidup yang lebih baik. Melalui lokasi strategis, desain fungsional, kualitas bangunan terpercaya, dan lingkungan nyaman — kami percaya rumah adalah fondasi untuk tumbuh, bermimpi, dan menjalani hidup yang lebih bermakna."}
              </p>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl font-bold text-foreground">{aboutSection.stats_years || "4+"}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Tahun Pengalaman</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">{aboutSection.stats_projects || "5"}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Project Perumahan</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">{aboutSection.stats_families || "495+"}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Unit Terbangun</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={resolveMediaUrl(aboutSection.image_url ?? aboutSection.image_id ?? media.about_team, "/storage/media/about-team.jpg")}
                alt="Tim Quinland"
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
                {visionMission.section_subtitle || "Visi & Misi"}
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {visionMission.section_heading || "Landasan Kami Berkarya"}
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Vision Card */}
              <div className="rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-lg">
                <div className="flex size-14 items-center justify-center rounded-xl bg-emerald-100">
                  <Eye className="size-7 text-emerald-700" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-foreground">
                  {visionMission.vision_title || "Visi Kami"}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground whitespace-pre-wrap">
                  {visionMission.vision_description || "Menjadi developer properti terpercaya yang menghadirkan hunian berkualitas, inovatif, dan berkelanjutan bagi seluruh lapisan masyarakat."}
                </p>
              </div>

              {/* Mission Card */}
              <div className="rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-lg">
                <div className="flex size-14 items-center justify-center rounded-xl bg-emerald-100">
                  <Target className="size-7 text-emerald-700" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-foreground">
                  {visionMission.mission_title || "Misi Kami"}
                </h3>
                <ul className="mt-3 flex flex-col gap-3 leading-relaxed text-muted-foreground">
                  {(visionMission.missions && visionMission.missions.length > 0) ? (
                    visionMission.missions.map((mission: any, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-600" />
                        <span>{mission.description || mission}</span>
                      </li>
                    ))
                  ) : (
                    DEFAULT_MISSIONS.map((mission, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-600" />
                        <span>{mission}</span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Core Values ─── */}
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
              Core Value
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Nilai-Nilai Quinland
            </h2>
            <p className="mt-4 text-muted-foreground">
              Setiap huruf dalam nama <strong>QUINLAND</strong> mencerminkan nilai yang kami pegang teguh.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {CORE_VALUES.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-lg"
              >
                <div className="mx-auto flex size-14 items-center justify-center rounded-xl bg-emerald-800 text-2xl font-bold text-white">
                  {item.letter}
                </div>
                <p className="mt-4 font-bold text-foreground">{item.value}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Company History / Timeline ─── */}
        <section className="bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
                Sejarah Perusahaan
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Perjalanan Quinland Group
              </h2>
            </div>

            <div className="mt-12 relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 hidden h-full w-px -translate-x-1/2 bg-emerald-200 md:block" />

              <div className="flex flex-col gap-8">
                {COMPANY_HISTORY.map((item, i) => (
                  <div
                    key={i}
                    className={`relative flex flex-col gap-4 md:flex-row md:items-center ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    {/* Content */}
                    <div className="flex-1 md:text-right">
                      {i % 2 !== 0 && <div className="hidden flex-1 md:block" />}
                      <div className={`rounded-2xl border border-border bg-card p-6 shadow-sm ${i % 2 !== 0 ? "md:ml-8" : "md:mr-8"}`}>
                        <div className="flex items-center gap-3 md:justify-end">
                          {item.comingSoon && (
                            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                              Coming Soon
                            </span>
                          )}
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-800">
                            {item.year}
                          </span>
                        </div>
                        <h3 className="mt-3 text-lg font-bold text-foreground">{item.name}</h3>
                        <p className="mt-1 text-sm font-medium text-emerald-700">{item.units} Unit</p>
                        <p className="mt-1 text-xs text-muted-foreground">{item.company}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{item.location}</p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="absolute left-1/2 hidden size-4 -translate-x-1/2 rounded-full border-4 border-emerald-700 bg-white md:block" />

                    {/* Spacer for alternating layout */}
                    <div className="hidden flex-1 md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Office Section ─── */}
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
              {officeSection.section_subtitle || "Kantor Kami"}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {officeSection.section_heading || "Kunjungi Kantor Quinland"}
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={resolveMediaUrl(officeSection.image_url ?? officeSection.image_id ?? media.office, "/storage/media/office.jpg")}
                alt="Kantor Quinland"
                width={640}
                height={400}
                className="h-[300px] w-full object-cover sm:h-[360px]"
              />
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-2xl font-bold text-foreground">
                {officeSection.office_name || "Quinland Group"}
              </h3>

              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                    <MapPin className="size-5 text-emerald-700" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Kantor Bumiayu</p>
                    <p className="mt-0.5 text-sm text-muted-foreground whitespace-pre-wrap">
                      {officeSection.address || "Perumahan Quinland Midtown, Jl. Rumono Krajan 1 RT 06/01, Desa Jatisawit, Kecamatan Bumiayu – Brebes"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                    <MapPin className="size-5 text-emerald-700" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Kantor Purwokerto</p>
                    <p className="mt-0.5 text-sm text-muted-foreground whitespace-pre-wrap">
                      {officeSection.marketing_address || "Jalan Senopati No 1, Kejawar, Kelurahan Arcawinangun, Kec. Purwokerto Timur, Kab. Banyumas"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                    <Phone className="size-5 text-emerald-700" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Telepon</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {officeSection.phone || "0812 1555 0665 (Bumiayu)"}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {officeSection.phone_2 || "0823 2531 0008 (Purwokerto)"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                    <Mail className="size-5 text-emerald-700" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Email</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {officeSection.email || "quinlandofficial@gmail.com"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                    <Clock className="size-5 text-emerald-700" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Jam Operasional</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {officeSection.operational_hours || "Senin - Sabtu, 08:00 - 17:00 WIB"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Properties Section ─── */}
        {properties.length > 0 && (
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
                  href="/property"
                  className="hidden items-center gap-1 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-800 sm:flex"
                >
                  Lihat Semua
                  <ChevronRight className="size-4" />
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              <div className="mt-8 text-center sm:hidden">
                <Link
                  href="/property"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700"
                >
                  Lihat Semua
                  <ChevronRight className="size-4" />
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
