"use client"

import { useState } from "react"
import { PropertyCard, type Property } from "./property-card"
import { CategoryTabs } from "./category-tabs"

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
  {
    id: "7",
    name: "Pine Retreat",
    location: "Mountain Rd",
    image: "/storage/media/property-1.jpg",
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1200,
    category: "Cabins",
  },
]

export function PropertiesSection() {
  const [activeCategory, setActiveCategory] = useState("Featured")

  const filtered = PROPERTIES.filter((p) => p.category === activeCategory)

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
