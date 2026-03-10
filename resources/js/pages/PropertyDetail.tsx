import { Link, Head } from '@inertiajs/react';
import { ChevronRight } from "lucide-react"
import { Navbar } from "@/v0-ui-quinland/components/layout/navbar"
import { ImageGallery } from "@/v0-ui-quinland/components/detail/image-gallery"
import { PropertyTabs } from "@/v0-ui-quinland/components/detail/property-tabs"
import { BookingSidebar } from "@/v0-ui-quinland/components/detail/booking-sidebar"
import { PropertyCard, type Property } from "@/v0-ui-quinland/components/properties/property-card"
import { EventsSection } from "@/v0-ui-quinland/components/events/events-section"
import { FaqSection } from "@/v0-ui-quinland/components/faq/faq-section"
import { Footer } from "@/v0-ui-quinland/components/layout/footer"

/* ---------- Dummy data ---------- */
const PROJECT = {
  name: "Nordville",
  slug: "nordville",
  category: "Residential",
  price: "Rp 3.062.284.000",
  images: [
    "/storage/media/detail-main.jpg",
    "/storage/media/detail-2.jpg",
    "/storage/media/detail-3.jpg",
  ],
  description:
    "Latest from Grand City Balikpapan, Nordville. Nordville has spacious units, green line facilities, and more contemporary home designs.\n\nWith a strategic location which is Grand City being a hub between Balikpapan City and IKN. Grand City Balikpapan is the main choice for having a dream residence.\n\nNordville is a housing project by Sinar Mas Land, equipped with 24-hour security and a one-gate system to ensure your comfort. This housing is available in 3 types: type 88, type 117, and type 172.",
}

const OTHER_PROPERTIES: Property[] = [
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

/* ---------- Breadcrumb ---------- */
const BREADCRUMB = [
  { label: "Home", href: "/" },
  { label: "Development", href: "/" },
  { label: "Residential", href: "/" },
  { label: "Nordville", href: "#" },
]

/* ---------- Page ---------- */
export default function PropertyDetailPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        {/* Breadcrumb – pt-24 accounts for the fixed navbar height */}
        <div className="mx-auto max-w-7xl px-4 pb-4 pt-24 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1 text-sm">
              {BREADCRUMB.map((item, index) => {
                const isLast = index === BREADCRUMB.length - 1
                return (
                  <li key={item.label} className="flex items-center gap-1">
                    {!isLast ? (
                      <>
                        <Link
                          href={item.href}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {item.label}
                        </Link>
                        <ChevronRight className="size-3.5 text-muted-foreground" />
                      </>
                    ) : (
                      <span className="font-semibold text-foreground">
                        {item.label}
                      </span>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
        </div>

        {/* Image Gallery */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ImageGallery
            images={PROJECT.images}
            projectName={PROJECT.name}
          />
        </div>

        {/* Content: Tabs + Sidebar */}
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
            <PropertyTabs
              name={PROJECT.name}
              description={PROJECT.description}
            />
            <BookingSidebar price={PROJECT.price} />
          </div>
        </div>

        {/* Project Lainnya */}
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Project Lainnya
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {OTHER_PROPERTIES.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>

        {/* Events & CSR */}
        <div className="border-t border-border">
          <EventsSection />
        </div>

        {/* FAQ */}
        <div className="border-t border-border">
          <FaqSection />
        </div>
      </main>

      <Footer />
    </>
  )
}
