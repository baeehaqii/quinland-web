import { Link } from '@inertiajs/react';
import { ArrowRight, Tag } from "lucide-react"

const PROMOS = [
  {
    id: 1,
    title: "DP 0% untuk Unit Pilihan",
    description:
      "Dapatkan kemudahan kepemilikan hunian impian Anda dengan program DP 0% untuk unit-unit pilihan di kawasan Nordville. Berlaku hingga akhir kuartal ini.",
    badge: "Terbatas",
    image: "/storage/media/property-1.jpg",
    href: "#",
  },
  {
    id: 2,
    title: "Bunga KPR Flat 3% per Tahun",
    description:
      "Nikmati cicilan ringan dengan bunga KPR flat 3% per tahun selama 2 tahun pertama bekerja sama dengan bank rekanan kami.",
    badge: "Hot Deal",
    image: "/storage/media/property-2.jpg",
    href: "#",
  },
  {
    id: 3,
    title: "Free Biaya BPHTB & AJB",
    description:
      "Hemat biaya administrasi dengan promo gratis BPHTB dan AJB untuk setiap pembelian unit di bulan ini. Syarat dan ketentuan berlaku.",
    badge: "Promo Bulan Ini",
    image: "/storage/media/property-3.jpg",
    href: "#",
  },
]

export function PromoSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Promo Spesial
          </h2>
          <p className="mt-1 text-base leading-relaxed text-muted-foreground">
            Penawaran terbaik untuk hunian impian Anda
          </p>
        </div>
        <Link
          href="/promo"
          className="group flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          Lihat Semua
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Promo Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROMOS.map((promo) => (
          <article
            key={promo.id}
            className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-sm transition-shadow hover:shadow-md"
          >
            {/* Image */}
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={promo.image}
                alt={promo.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Badge */}
              <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                <Tag className="size-3" />
                {promo.badge}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-3 p-5">
              <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                {promo.title}
              </h3>
              <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {promo.description}
              </p>
              <Link
                href={promo.href}
                className="flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                Pelajari Lebih Lanjut
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
