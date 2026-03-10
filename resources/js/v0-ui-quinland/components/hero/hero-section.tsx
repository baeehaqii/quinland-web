"use client"

import { useState, useEffect, useCallback } from "react"
import { usePage, Link } from "@inertiajs/react"
import { PropertySearch } from "./property-search"

const SLIDES = [
  {
    image: "/storage/media/hero-bg.jpg",
    alt: "Modern city skyline with glass skyscrapers",
    tagline: "Buy. Sell. Rent.",
    heading: "Real Estate Done Right",
  },
  {
    image: "/storage/media/hero-bg-2.jpg",
    alt: "Luxury residential neighborhood with modern houses",
    tagline: "Find Your Dream Home.",
    heading: "Where Comfort Meets Elegance",
  },
  {
    image: "/storage/media/hero-bg-3.jpg",
    alt: "Modern luxury apartment with pool and tropical landscape",
    tagline: "Invest. Grow. Prosper.",
    heading: "Premium Properties Await You",
  },
] as const

const INTERVAL_MS = 7000

export function HeroSection() {
  const { props } = usePage<any>()
  const page = props.page

  // Extract dynamic slides from page.content if available
  const heroBlock = page?.content?.find((block: any) => block.type === 'hero')
  const dynamicSlides = heroBlock?.data?.slides
  const activeSlides = dynamicSlides && dynamicSlides.length > 0 ? dynamicSlides : SLIDES

  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % activeSlides.length)
  }, [activeSlides.length])

  useEffect(() => {
    const timer = setInterval(next, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative flex min-h-[75vh] flex-col sm:min-h-[70vh] lg:min-h-[75vh]">
      {/* Slides */}
      {activeSlides.map((slide: any, index: number) => (
        <div
          key={slide.image}
          className={`absolute inset-0 -z-10 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100" : "opacity-0"
            }`}
          aria-hidden={index !== current}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-[oklch(0.78_0.04_230/0.35)]" />
        </div>
      ))}

      {/* Spacer for navbar */}
      <div className="h-24" />

      {/* Hero content */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-24 text-center sm:pb-28 lg:pb-32">
        {activeSlides.map((slide: any, index: number) => (
          <div
            key={slide.heading}
            className={`absolute max-w-2xl transition-all duration-700 ease-in-out ${index === current
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
              }`}
            aria-hidden={index !== current}
          >
            <h1>
              <span className="block font-serif text-4xl italic text-card md:text-5xl lg:text-6xl">
                {slide.tagline}
              </span>
              <span className="mt-2 block text-3xl font-bold tracking-tight text-card md:text-4xl lg:text-5xl">
                {slide.heading}
              </span>
            </h1>

            {slide.cta_label && slide.cta_url && (
              <div className="mt-8 flex justify-center">
                <Link
                  href={slide.cta_url}
                  className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-100 hover:shadow-lg hover:-translate-y-1"
                >
                  {slide.cta_label}
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Slide indicators */}
      <div className="absolute inset-x-0 bottom-20 flex items-center justify-center gap-2 sm:bottom-24">
        {activeSlides.map((slide: any, index: number) => (
          <button
            key={slide.image}
            type="button"
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all duration-300 ${index === current
              ? "w-8 bg-card"
              : "w-2 bg-card/50 hover:bg-card/70"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Search bar - anchored at bottom */}
      <div className="absolute inset-x-0 bottom-0 translate-y-1/2">
        <PropertySearch />
      </div>
    </section>
  )
}
