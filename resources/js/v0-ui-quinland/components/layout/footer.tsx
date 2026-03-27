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

          {/* Purwokerto Office */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Office Purwokerto</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-zinc-400" />
                <p className="text-sm text-zinc-400">
                  Jl. Prof. Dr. HR. Boenjamin No. 708, Grendeng, Purwokerto Timur, Banyumas, Jawa Tengah 53122
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-zinc-400" />
                <p className="text-sm text-zinc-400">+62 821-3456-7890</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-zinc-400" />
                <p className="text-sm text-zinc-400">info@quinland.co.id</p>
              </div>
            </div>
          </div>

          {/* Bumiayu Office */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Office Bumiayu</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-zinc-400" />
                <p className="text-sm text-zinc-400">
                  Jl. KH Ahmad Dahlan, Bumiayu (Samping JNE), Brebes, Jawa Tengah 52273
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-zinc-400" />
                <p className="text-sm text-zinc-400">+62 812-1916-6606</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-zinc-400" />
                <p className="text-sm text-zinc-400">support@quinland.co.id</p>
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
            {siteLogo ? (
              <img
                src={siteLogo}
                alt={siteName}
                className="h-12 w-auto object-contain"
              />
            ) : (
              <div className="flex items-center gap-2">
                 <div className="flex size-10 items-center justify-center rounded-lg bg-white/10">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-white"
                    >
                      <path d="M3 21V12L12 3L21 12V21" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      <path d="M9 21V14H15V21" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                 </div>
                <span className="text-xl font-bold">{siteName}</span>
              </div>
            )}
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
