"use client"

import { useState } from "react"
import { Link, usePage } from "@inertiajs/react"
import { PropertyCard, type Property } from "./property-card"
import { ChevronRight } from "lucide-react"

interface PropertiesSectionProps {
  properties?: Array<Property & { kategori?: string }>
}

export function PropertiesSection({ properties: propsProp }: PropertiesSectionProps) {
  const { props } = usePage<any>()
  const properties: Array<Property & { kategori?: string }> = propsProp ?? props.properties ?? []
  const categories = ["Semua", ...Array.from(new Set(properties.map((p) => p.kategori ?? "Lainnya")))]
  const [activeCategory, setActiveCategory] = useState("Semua")

  const filtered = activeCategory === "Semua"
    ? properties
    : properties.filter((p) => p.kategori === activeCategory)

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Proyek Properti Kami
        </h2>
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
          Temukan hunian terbaik dari Quinland Group — berkualitas, inovatif, dan hadir untuk semua kalangan.
        </p>
      </div>

      {/* Category tabs */}
      {categories.length > 1 && (
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-foreground text-background shadow"
                  : "border border-border bg-background text-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Property grid */}
      {filtered.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-muted-foreground">Belum ada properti tersedia.</p>
      )}

      {/* Link to all properties */}
      <div className="mt-10 text-center">
        <Link
          href="/property"
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          Lihat Semua Properti
          <ChevronRight className="size-4" />
        </Link>
      </div>
    </section>
  )
}
