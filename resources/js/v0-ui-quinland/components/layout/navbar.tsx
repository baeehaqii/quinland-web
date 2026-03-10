"use client"

import { useState, useEffect } from "react"
import { Link, usePage } from '@inertiajs/react';
import { Menu, X, ChevronDown } from "lucide-react"

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Property", href: "/property" },
  { label: "Event & CSR", href: "/event-csr" },
  { label: "Artikel", href: "/artikel" },
  { label: "About Us", href: "/about" },
] as const

interface MenuItem {
  label: string
  url: string
  target?: string
  is_button?: boolean
  children?: MenuItem[]
}

interface SharedProps {
  settings?: {
    site_name?: string
    site_logo?: string | null
  }
  menu?: MenuItem[]
  [key: string]: unknown
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { url: pathname, props } = usePage<SharedProps>()
  const { settings, menu } = props
  const siteName = settings?.site_name || "Quinland Grup"
  const siteLogo = settings?.site_logo || null

  const navItems: MenuItem[] = menu && menu.length > 0
    ? menu
    : NAV_LINKS.map(link => ({ label: link.label, url: link.href, target: "_self", children: [] }))

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Detail property pages: /property/[slug] — has white bg, needs dark text when not scrolled
  const isDetailPage = /^\/property\/.+/.test(pathname)

  // On scroll: always dark glass. Not scrolled: transparent (white text) except detail page (dark text)
  const navBg = scrolled
    ? "bg-slate-900/40 backdrop-blur-md shadow-lg"
    : "bg-transparent"

  // Text color: black on detail pages when not scrolled, white everywhere else
  const textColor = !scrolled && isDetailPage ? "text-slate-900" : "text-white"
  const textColorMuted = !scrolled && isDetailPage ? "text-slate-700" : "text-white/80"
  const hoverTextColor = !scrolled && isDetailPage ? "hover:text-slate-900" : "hover:text-white"
  const underlineColor = !scrolled && isDetailPage ? "bg-slate-900" : "bg-white"
  const mobileToggleColor = !scrolled && isDetailPage ? "text-slate-900" : "text-white"
  const logoColor = !scrolled && isDetailPage ? "text-slate-900" : "text-white"

  // Login button
  const loginButtonClass = scrolled
    ? "bg-white text-slate-900 shadow-sm hover:shadow-md"
    : isDetailPage
      ? "border border-slate-900/60 text-slate-900 hover:bg-slate-900/10"
      : "border border-white/70 text-white hover:bg-white/10"

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Left: Logo */}
        <div className="flex flex-1 items-center justify-start">
          <Link href="/" className="flex items-center gap-2">
            {siteLogo ? (
              <img
                src={siteLogo}
                alt={siteName}
                className="h-16 w-auto object-contain transition-opacity duration-500"
              />
            ) : (
              <RealtekLogo color={logoColor} />
            )}
          </Link>
        </div>

        {/* Center: Desktop nav */}
        <ul className="hidden items-center justify-center gap-8 md:flex">
          {navItems.filter(item => !item.is_button).map((link) => (
            <li key={link.url}>
              {link.children && link.children.length > 0 ? (
                <div className="group relative">
                  <button className={`flex items-center gap-1 text-base font-bold transition-colors duration-500 ${textColorMuted} ${hoverTextColor}`}>
                    {link.label}
                    <ChevronDown className="size-4" />
                  </button>
                  <div className="invisible absolute left-0 top-full pt-4 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                    <div className="flex min-w-[200px] flex-col overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-900">
                      {link.children.map((child: any) => (
                        <Link
                          key={child.url}
                          href={child.url}
                          target={child.target || "_self"}
                          className="px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href={link.url}
                  target={link.target || "_self"}
                  className={`group relative text-base font-medium transition-colors duration-500 ${textColorMuted} ${hoverTextColor}`}
                >
                  {link.label}
                  <span className={`absolute inset-x-0 -bottom-1 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${underlineColor}`} />
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Right: Desktop buttons & Mobile toggle */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="hidden md:flex items-center gap-4">
            {navItems.filter(item => item.is_button).map((link) => (
              <Link
                key={link.url}
                href={link.url}
                target={link.target || "_self"}
                className={`rounded-full px-6 py-2 text-base font-semibold transition-all ${loginButtonClass}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className={`md:hidden transition-colors duration-500 ${mobileToggleColor}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-slate-900/50 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {navItems.filter(item => !item.is_button).map((link) => (
              <li key={link.url}>
                {link.children && link.children.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    <div className="block px-3 py-2 text-sm font-semibold text-white/90">
                      {link.label}
                    </div>
                    <div className="mb-2 ml-4 flex flex-col gap-1 border-l border-white/20 pl-4">
                      {link.children.map((child: any) => (
                        <Link
                          key={child.url}
                          href={child.url}
                          target={child.target || "_self"}
                          className="block rounded-lg py-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.url}
                    target={link.target || "_self"}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}

            {navItems.filter(item => item.is_button).map((link) => (
              <li key={link.url}>
                <Link
                  href={link.url}
                  target={link.target || "_self"}
                  className="mt-2 block rounded-full bg-white px-6 py-2 text-center text-sm font-semibold text-slate-900"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}


function RealtekLogo({ color = "text-white" }: { color?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`transition-colors duration-500 ${color}`}
    >
      <rect x="2" y="8" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 26V12L14 6L22 12V26" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 26V18H18V26" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="14" y1="2" x2="14" y2="6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

