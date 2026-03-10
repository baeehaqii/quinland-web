import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Navbar } from "@/v0-ui-quinland/components/layout/navbar"
import { Footer } from "@/v0-ui-quinland/components/layout/footer"
import { PropertyCard, type Property } from "@/v0-ui-quinland/components/properties/property-card"
import { EventsSection } from "@/v0-ui-quinland/components/events/events-section"
import { FaqSection } from "@/v0-ui-quinland/components/faq/faq-section"

/* ─── Property data ─── */
const FEATURED_PROPERTY: Property = {
  id: "1",
  name: "Skyline Space",
  location: "45 Pine Street",
  image: "/storage/media/property-1.jpg",
  bedrooms: 5,
  bathrooms: 4,
  sqft: 3200,
  category: "Featured",
}

const ALL_PROPERTIES: Property[] = [
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
  {
    id: "4",
    name: "Metro Loft",
    location: "12 Central Ave",
    image: "/storage/media/property-1.jpg",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    category: "Apartment",
  },
  {
    id: "5",
    name: "Sunset Villa",
    location: "88 Hillside Dr",
    image: "/storage/media/property-2.jpg",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2600,
    category: "Residential",
  },
  {
    id: "6",
    name: "Harbor View",
    location: "5 Marina Bay",
    image: "/storage/media/property-3.jpg",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2100,
    category: "Condos",
  },
]

export default function PropertyPage() {
  return (
    <>
      <Navbar />

      {/* ─── Hero Banner ─── */}
      <section className="relative flex h-[340px] items-end sm:h-[400px]">
        <Image
          src="/storage/media/property-hero.jpg"
          alt="Residential community"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 lg:px-10">
          {/* Breadcrumb */}
          <nav
            className="mb-4 flex items-center gap-1.5 text-sm text-white/70"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="size-3.5" />
            <Link
              href="/property"
              className="transition-colors hover:text-white"
            >
              Discover Projects
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="font-semibold text-white">Residential</span>
          </nav>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Residential
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Houses to everyone who wants to experience first hand what a modern,
            vibrant multicultural community really feels like.
          </p>
        </div>
      </section>

      <main className="bg-background">
        {/* ─── Featured Residence ─── */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <Link
            href={`/property/${FEATURED_PROPERTY.id}`}
            className="group relative block overflow-hidden rounded-3xl"
          >
            <div className="relative h-[300px] sm:h-[380px]">
              <Image
                src={FEATURED_PROPERTY.image}
                alt={FEATURED_PROPERTY.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-8 sm:justify-center sm:p-12">
              <span className="text-sm font-medium tracking-wide text-white/70">
                Featured Residence
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white transition-colors group-hover:text-emerald-300 sm:text-4xl">
                {FEATURED_PROPERTY.name}
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
                A premium residential development offering spacious units, green
                facilities, and contemporary home designs in a strategic
                location.
              </p>
            </div>
          </Link>
        </section>

        {/* ─── Property Grid ─── */}
        <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              All Properties
            </h2>
            <span className="text-sm text-muted-foreground">
              {ALL_PROPERTIES.length} projects
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_PROPERTIES.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>

        {/* ─── Events ─── */}
        <EventsSection />

        {/* ─── FAQ ─── */}
        <FaqSection />
      </main>

      <Footer />
    </>
  )
}
