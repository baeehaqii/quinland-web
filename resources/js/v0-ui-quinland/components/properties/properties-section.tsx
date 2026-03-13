"use client"

import { useState } from "react"
import { usePage } from "@inertiajs/react"
import { PropertyCard, type Property } from "./property-card"
import { CategoryTabs } from "./category-tabs"
import { resolveMediaUrl } from "@/lib/resolve-media-url"

const PROPERTIES: Property[] = [
  {
    id: "1",
    name: "Skyline Space",
    location: "45 Pine Street",
    slug: "skyline-space",
    image: ["media/property-1.jpg"],
    tipe_rumah: [{ bedrooms: 5, bathrooms: 4, sqft: 3200 }],
  },
  {
    id: "2",
    name: "Urban Oasis",
    location: "24 Brooklyn St.",
    slug: "urban-oasis",
    image: ["media/property-2.jpg"],
    tipe_rumah: [{ bedrooms: 6, bathrooms: 4, sqft: 2800 }],
  },
  {
    id: "3",
    name: "White Haven",
    location: "Oak Lane",
    slug: "white-haven",
    image: ["media/property-3.jpg"],
    tipe_rumah: [{ bedrooms: 6, bathrooms: 5, sqft: 4500 }],
  },
]

export function PropertiesSection() {
  const { props } = usePage<any>()
  const media = props.media || {}

  const [activeCategory, setActiveCategory] = useState("Featured")
  const categories = ["Featured", "Apartment", "Residential", "Condos", "Cabins"]

  const mappedProperties: Record<string, Property[]> = {
    Featured: [
      { ...PROPERTIES[0], image: [resolveMediaUrl(media.property_1, '/storage/media/property-1.jpg')] },
      { ...PROPERTIES[1], image: [resolveMediaUrl(media.property_2, '/storage/media/property-2.jpg')] },
      { ...PROPERTIES[2], image: [resolveMediaUrl(media.property_3, '/storage/media/property-3.jpg')] },
    ],
    Apartment: [{ ...PROPERTIES[0], id: '4', slug: 'metro-loft', name: 'Metro Loft', location: '12 Central Ave' }],
    Residential: [{ ...PROPERTIES[1], id: '5', slug: 'sunset-villa', name: 'Sunset Villa', location: '88 Hillside Dr' }],
    Condos: [{ ...PROPERTIES[2], id: '6', slug: 'harbor-view', name: 'Harbor View', location: '5 Marina Bay' }],
    Cabins: [{ ...PROPERTIES[0], id: '7', slug: 'pine-retreat', name: 'Pine Retreat', location: 'Mountain Rd' }],
  }

  const filtered = mappedProperties[activeCategory] ?? mappedProperties.Featured

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Explore Our Top-Rated Properties
        </h2>
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
          Discover exceptional properties that are acclaimed for their high
          ratings and exceptional features.
        </p>
      </div>

      {/* Category tabs */}
      <div className="mt-10">
        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
      </div>

      {/* Property grid */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  )
}
