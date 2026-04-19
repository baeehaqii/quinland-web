"use client"

import { useState } from "react"
import { usePage } from "@inertiajs/react"
import { FeatureCard } from "./feature-card"
import { BrickWall, Home, Triangle, LayoutGrid } from "lucide-react"
import { resolveMediaUrl } from "@/lib/resolve-media-url"

const FEATURES = [
  {
    icon: BrickWall,
    title: "Sejak 2022",
    description:
      "Quinland Group berdiri pada 2022 dan telah menyelesaikan lebih dari 495 unit hunian di wilayah Brebes dan Banyumas, Jawa Tengah.",
  },
  {
    icon: Home,
    title: "5 Proyek Unggulan",
    description:
      "Quinland, Quinland Village, Quinland Midtown, GriyaLand Sumbang, dan GriyaLand Kembaran — hunian untuk semua kalangan.",
  },
  {
    icon: Triangle,
    title: "Lokasi Strategis",
    description:
      "Setiap proyek hadir di lokasi strategis dengan akses mudah ke pusat kota, fasilitas publik, dan kawasan industri.",
  },
  {
    icon: LayoutGrid,
    title: "For a Better Life",
    description:
      "Komitmen kami: rumah bukan sekadar tempat tinggal, tetapi fondasi untuk tumbuh, bermimpi, dan menjalani hidup lebih bermakna.",
  },
] as const

const ABOUT_DESCRIPTION =
  "Quinland Group adalah developer properti terpercaya yang hadir sejak 2022. Didirikan oleh Zaldy Musa Muzaky, S.E., kami berkomitmen menghadirkan hunian berkualitas, inovatif, dan berkelanjutan — \"For a Better Life\" — bagi seluruh lapisan masyarakat."

export function AboutSection() {
  const [showDescription, setShowDescription] = useState(false)
  const { props } = usePage<any>()
  
  // Extract dynamic data from page content
  const pageContent = props.page?.content || []
  const aboutSection = pageContent.find((block: any) => block.type === 'about_section')?.data || {}
  
  const media = props.media || {}
  const coverImage = aboutSection.image_id ? resolveMediaUrl(aboutSection.image_id, "/storage/media/hero-bg-2.jpg") : resolveMediaUrl(media.about_cover, "/storage/media/hero-bg-2.jpg")
  const descriptionText = aboutSection.description_1 || ABOUT_DESCRIPTION

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Image with overlay text */}
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={coverImage}
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
              {descriptionText}
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
