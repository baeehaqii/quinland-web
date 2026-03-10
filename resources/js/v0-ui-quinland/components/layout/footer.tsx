import { Link } from '@inertiajs/react';
import { Building2, Facebook, Linkedin } from "lucide-react"

const NAVIGATION_LINKS = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "FAQs", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
]

const INFORMATION_LINKS = [
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Support", href: "/support" },
  { label: "Contact Us", href: "/contact" },
]

const COMPANY_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Terms & Conditions", href: "/terms" },
]

const SOCIAL_LINKS = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export function Footer() {
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

          {/* Information */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Information</h3>
            <ul className="space-y-3">
              {INFORMATION_LINKS.map((link) => (
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

          {/* Company */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Company</h3>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
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
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          {/* Logo and brand */}
          <Link href="/" className="flex items-center gap-3">
            <Building2 className="size-8 text-white" strokeWidth={1.5} />
            <span className="text-xl font-bold">Quinland Grup</span>
          </Link>

          {/* Copyright */}
          <p className="text-center text-sm text-zinc-400">
            © 2026 Quinland Grup. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
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
