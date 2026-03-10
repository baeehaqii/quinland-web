"use client"

import { Link } from '@inertiajs/react';

const PARTNERS = [
  {
    name: "Bank Jateng",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bank-jateng-QMMxuG7BosLy1zSnB8cy8RiU5FRrg2.png",
  },
  {
    name: "Bank Syariah Indonesia",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bsi-G2mI8fIWOgc5zi2gfqwEZqpRPA8zFI.png",
  },
  {
    name: "Bank Central Asia",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bca-AfNttX4cBHDcM5LEA3Jz3MMlk1HRYg.png",
  },
  {
    name: "Bank Gunung Slamet",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bgs-C2fN1vusGPbW74YaU7aoeJE5523v2o.png",
  },
  {
    name: "Bank Syariah Nasional",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bsn-xF3QmMq973UJZfOgBIP7j2JEn6HNUS.png",
  },
  {
    name: "Bank Tabungan Negara",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/btn-Tm80F7Md7AOThlTqJh6uXSo7PPxyKx.png",
  },
  {
    name: "Bank Rakyat Indonesia",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bri-J27QIg8v7oEnl0E7dheUf9vKpwUZs9.png",
  },
]

export function PartnerSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left side - Content */}
        <div className="flex flex-col justify-center space-y-6">
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Meet Our Partners
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            We collaborate with trusted financial institutions to provide
            comprehensive real estate solutions and financing options for our
            clients.
          </p>
          <div>
            <Link
              href="/partners"
              className="inline-block rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right side - Animated logo marquee */}
        <div className="flex flex-col justify-center gap-6 overflow-hidden">
          {/* First row - scroll right to left */}
          <div className="relative flex overflow-hidden">
            <div className="flex animate-marquee-left gap-6">
              {[...PARTNERS, ...PARTNERS].map((partner, index) => (
                <div
                  key={`left-${index}`}
                  className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl border border-border bg-white p-4 shadow-sm"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    width={200}
                    height={200}
                    className="h-auto w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Second row - scroll left to right */}
          <div className="relative flex overflow-hidden">
            <div className="flex animate-marquee-right gap-6">
              {[...PARTNERS, ...PARTNERS].map((partner, index) => (
                <div
                  key={`right-${index}`}
                  className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl border border-border bg-white p-4 shadow-sm"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    width={200}
                    height={200}
                    className="h-auto w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
