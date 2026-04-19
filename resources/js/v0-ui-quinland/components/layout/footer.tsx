import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';
import { Facebook, Linkedin, MapPin, Phone, Mail } from "lucide-react"

const NAVIGATION_LINKS = [
  { label: "Home", href: "/" },
  { label: "Property", href: "/property" },
  { label: "Event & CSR", href: "/event-csr" },
  { label: "Artikel", href: "/artikel" },
  { label: "About Us", href: "/about" },
]

const SOCIAL_LINKS = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

interface SharedProps extends PageProps {
  settings?: {
    site_name?: string
    site_logo?: string | null
  }
}

export function Footer() {
  const { props } = usePage<SharedProps>()
  const { settings } = props
  const siteName = settings?.site_name || "Quinland"
  const siteLogo = settings?.site_logo || null

  return (
    <footer className="bg-zinc-900 text-white">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* Navigation */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Navigation</h3>
            <ul className="space-y-3">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bumiayu Office */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Kantor Bumiayu</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-zinc-400" />
                <p className="text-sm text-zinc-400">
                  Perumahan Quinland Midtown, Jl. Rumono Krajan 1 RT 06/01, Desa Jatisawit, Kecamatan Bumiayu – Brebes
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-zinc-400" />
                <p className="text-sm text-zinc-400">0812 1555 0665</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-zinc-400" />
                <p className="text-sm text-zinc-400">quinlandofficial@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Purwokerto Office */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Kantor Purwokerto</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-zinc-400" />
                <p className="text-sm text-zinc-400">
                  Jalan Senopati No 1, Kejawar, Kelurahan Arcawinangun, Kec. Purwokerto Timur, Kab. Banyumas
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-zinc-400" />
                <p className="text-sm text-zinc-400">0823 2531 0008</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-zinc-400" />
                <p className="text-sm text-zinc-400">quinlandofficial@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
          {/* Logo and brand */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src={siteLogo || "/Quinland Group PNG Putih.png"}
              alt={siteName}
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Copyright */}
          <p className="text-center text-sm text-zinc-400">
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-5">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-zinc-400 transition-colors hover:text-white"
                  aria-label={social.label}
                >
                  <Icon className="size-5" />
                </Link>
              )
            })}
            {/* X/Twitter icon */}
            <Link
              href="#"
              className="text-zinc-400 transition-colors hover:text-white"
              aria-label="X (Twitter)"
            >
              <svg
                className="size-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
