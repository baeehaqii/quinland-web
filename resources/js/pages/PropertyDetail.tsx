import { Link } from '@inertiajs/react';
import { ChevronRight } from "lucide-react"
import { Navbar } from "@/v0-ui-quinland/components/layout/navbar"
import { ImageGallery } from "@/v0-ui-quinland/components/detail/image-gallery"
import { PropertyTabs } from "@/v0-ui-quinland/components/detail/property-tabs"
import { BookingSidebar } from "@/v0-ui-quinland/components/detail/booking-sidebar"
import { PropertyCard, type Property } from "@/v0-ui-quinland/components/properties/property-card"
import { EventsSection } from "@/v0-ui-quinland/components/events/events-section"
import { FaqSection } from "@/v0-ui-quinland/components/faq/faq-section"
import { Footer } from "@/v0-ui-quinland/components/layout/footer"

interface TipeRumah {
  name: string
  sqft?: number | null
  bedrooms?: number | null
  bathrooms?: number | null
  description?: string
  gambar_denah?: string | null
}

interface PropertyProgress {
  month: string
  label?: string
  percentage: number
  image?: string | null
}

interface PropertyDetailData {
  name: string
  slug: string
  category?: string
  price: string
  images: string[]
  description: string
  promo_unit_rumah?: string | null
  alamat?: string
  whatsapp_number?: string | null
  fasilitas_property?: Array<{ label: string }>
  tipe_rumah?: TipeRumah[]
  lokasi_maps_embed?: string | null
  property_progress?: PropertyProgress[]
}

interface PropertyDetailPageProps {
  property: PropertyDetailData
  otherProperties?: Property[]
  propertyId: string | number
}

/* ---------- Breadcrumb ---------- */
const buildBreadcrumb = (name: string, category?: string) => [
  { label: "Home", href: "/" },
  { label: "Development", href: "/property" },
  { label: category || "Property", href: "/property" },
  { label: name, href: "#" },
]

/* ---------- Page ---------- */
export default function PropertyDetailPage({ property, otherProperties = [], propertyId }: PropertyDetailPageProps) {
  const images = property.images?.length ? property.images : ["/storage/media/placeholder.jpg"]
  const breadcrumb = buildBreadcrumb(property.name, property.category)

  return (
    <>
      <Navbar />
      <main className="bg-background">
        {/* Breadcrumb – pt-24 accounts for the fixed navbar height */}
        <div className="mx-auto max-w-7xl px-4 pb-4 pt-24 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1 text-sm">
              {breadcrumb.map((item, index) => {
                const isLast = index === breadcrumb.length - 1
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
            images={images}
            projectName={property.name}
          />
        </div>

        {/* Content: Tabs + Sidebar */}
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
            <PropertyTabs
              name={property.name}
              description={property.description}
              promoUnitRumah={property.promo_unit_rumah}
              alamat={property.alamat}
              fasilitasProperty={property.fasilitas_property ?? []}
              tipeRumah={property.tipe_rumah ?? []}
              lokasiMapsEmbed={property.lokasi_maps_embed}
              propertyProgress={property.property_progress ?? []}
            />
            <BookingSidebar price={property.price} propertyId={propertyId} />
          </div>
        </div>

        {/* Project Lainnya */}
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Project Lainnya
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherProperties.map((item) => (
              <PropertyCard key={item.id} property={item} />
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
