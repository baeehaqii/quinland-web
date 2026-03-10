"use client"

import { useState } from "react"
import { FeatureCard } from "./feature-card"
import { BrickWall, Home, Triangle, LayoutGrid } from "lucide-react"

const FEATURES = [
  {
    icon: BrickWall,
    title: "Walls",
    description:
      "In construction, for both external and internal walls, we use Kerameya 2NF bricks, which are laid with a warm mortar.",
  },
  {
    icon: Home,
    title: "Facade",
    description:
      "Combining Roben clinker bricks with the durable silicon-silicate plaster Baumit, resistant to aggressive environments. Insulation consists of 200mm Neopor polystyrene.",
  },
  {
    icon: Triangle,
    title: "Roof",
    description:
      "Pruszynski standing seam roofing with 200mm thick basalt wool insulation.",
  },
  {
    icon: LayoutGrid,
    title: "Window",
    description:
      "Rehau PVC windows. Six-chamber profile with energy-saving double glazing and inert gas, profile system 70 mm.",
  },
] as const

const ABOUT_DESCRIPTION =
  "We are a team of passionate professionals dedicated to delivering exceptional real estate experiences. With years of expertise in property development and architecture, we combine innovative design with quality craftsmanship to create homes that inspire and endure."

export function AboutSection() {
  const [showDescription, setShowDescription] = useState(false)

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Image with overlay text */}
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src="/storage/media/hero-bg-2.jpg"
          alt="Modern luxury house with contemporary architecture"
          width={1400}
          height={600}
          className="h-[280px] w-full object-cover sm:h-[320px] lg:h-[360px]"
          loading="eager"
          priority
        />

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Animated text overlay */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-8 sm:px-10 sm:pb-12 lg:px-16">
          <div className="relative w-full min-h-[80px] sm:min-h-[100px]">
            {/* ABOUT US title */}
            <h2
              className={`text-center font-sans text-5xl font-bold tracking-wider text-white uppercase transition-all duration-700 ease-in-out sm:text-7xl lg:text-8xl ${showDescription
                  ? "translate-y-4 scale-95 opacity-0"
                  : "translate-y-0 scale-100 opacity-100"
                }`}
            >
              About Us
            </h2>

            {/* Description text */}
            <p
              className={`absolute inset-0 flex items-center text-left text-sm leading-relaxed font-medium text-white/90 transition-all duration-700 ease-in-out sm:text-base lg:text-lg ${showDescription
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-4 opacity-0"
                }`}
            >
              {ABOUT_DESCRIPTION}
            </p>
          </div>

          {/* Toggle button */}
          <button
            onClick={() => setShowDescription((prev) => !prev)}
            className="mt-6 rounded-full border border-white/30 bg-white/10 px-6 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:mt-8"
            aria-label={showDescription ? "Show title" : "Show description"}
          >
            {showDescription ? "Back" : "Learn More"}
          </button>
        </div>
      </div>

      {/* Feature cards */}
      <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {FEATURES.map((feature, index) => (
          <div
            key={feature.title}
            className={`px-6 ${index < FEATURES.length - 1
                ? "border-b border-border pb-8 sm:border-b-0 lg:border-r lg:pb-0"
                : ""
              } ${index % 2 === 0 && index < FEATURES.length - 1 ? "sm:border-r sm:pb-0" : ""}`}
          >
            <FeatureCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
