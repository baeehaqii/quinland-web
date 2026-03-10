"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  Facebook,
  Link2,
  MessageCircle,
  ShieldCheck,
  TreePine,
  Building2,
  Dumbbell,
  Waves,
  ChevronDown,
  ChevronUp,
  BedDouble,
  Bath,
  Ruler,
  Home,
  MapPin,
  CalendarDays,
  ZoomIn,
  ZoomOut,
  X,
} from "lucide-react"

/* ── Tabs ── */
const SCROLL_TABS = ["Overview", "Facilities", "Type Rumah", "Denah"] as const
const PANEL_TABS = ["Lokasi", "Property Progress"] as const
const ALL_TABS = [...SCROLL_TABS, ...PANEL_TABS] as const
type Tab = (typeof ALL_TABS)[number]

const SCROLL_IDS: Record<(typeof SCROLL_TABS)[number], string> = {
  Overview: "overview",
  Facilities: "facilities",
  "Type Rumah": "type-rumah",
  Denah: "denah",
}

/* ── Data ── */
const PROGRESS_DATA = [
  { month: "Oktober 2025", image: "/storage/media/progress-1.jpg", label: "Land Clearing & Foundation", percentage: 15 },
  { month: "November 2025", image: "/storage/media/progress-2.jpg", label: "Struktur & Framework", percentage: 35 },
  { month: "Desember 2025", image: "/storage/media/progress-3.jpg", label: "Dinding & Atap", percentage: 55 },
  { month: "Januari 2026", image: "/storage/media/progress-4.jpg", label: "Finishing Eksterior", percentage: 78 },
  { month: "Februari 2026", image: "/storage/media/progress-5.jpg", label: "Serah Terima", percentage: 95 },
]

const FACILITIES = [
  { icon: ShieldCheck, label: "Security 24/7" },
  { icon: TreePine, label: "Outdoor Playground" },
  { icon: Building2, label: "Club House" },
  { icon: Dumbbell, label: "Fitness Center" },
  { icon: Waves, label: "Swimming Pool" },
  { icon: Home, label: "Smart Home System" },
]

const HOUSE_TYPES = [
  { name: "Type 88", bedrooms: 3, bathrooms: 2, sqft: 88, description: "Cocok untuk keluarga muda dengan 3 kamar tidur dan 2 kamar mandi. Desain modern dan efisien.", denah: "/storage/media/denah-88.jpg" },
  { name: "Type 117", bedrooms: 4, bathrooms: 3, sqft: 117, description: "Hunian luas dengan 4 kamar tidur dan 3 kamar mandi. Ruang tamu dan keluarga terpisah.", denah: "/storage/media/denah-117.jpg" },
  { name: "Type 172", bedrooms: 5, bathrooms: 4, sqft: 172, description: "Tipe premium dengan 5 kamar tidur dan 4 kamar mandi. Dilengkapi ruang kerja dan balkon utama.", denah: "/storage/media/denah-172.jpg" },
]

/* ── Helpers ── */
function isScrollTab(tab: Tab): tab is (typeof SCROLL_TABS)[number] {
  return (SCROLL_TABS as readonly string[]).includes(tab)
}

/* ── Component ── */
interface PropertyTabsProps {
  name: string
  description: string
}

export function PropertyTabs({ name, description }: PropertyTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Overview")
  const [expanded, setExpanded] = useState(false)
  const [view, setView] = useState<"overview" | "Lokasi" | "Property Progress">("overview")
  const [denahModal, setDenahModal] = useState<{ name: string; image: string } | null>(null)
  const [zoom, setZoom] = useState(1)

  // Close modal on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDenahModal(null)
        setZoom(1)
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])
  const isClickScrolling = useRef(false)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  const setRef = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      sectionRefs.current[id] = el
    },
    [],
  )

  /* Scroll spy – only when showing overview sections */
  useEffect(() => {
    if (view !== "overview") return

    const handleScroll = () => {
      if (isClickScrolling.current) return
      const ids = Object.values(SCROLL_IDS)
      let current = ids[0]
      for (const id of ids) {
        const el = sectionRefs.current[id]
        if (el && el.getBoundingClientRect().top <= 120) current = id
      }
      const tab = (Object.entries(SCROLL_IDS) as [(typeof SCROLL_TABS)[number], string][]).find(
        ([, id]) => id === current,
      )?.[0]
      if (tab) setActiveTab(tab)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [view])

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab)

    if (isScrollTab(tab)) {
      // Switch back to overview if we were on a panel
      setView("overview")
      // Wait a tick for DOM to re-render, then scroll
      requestAnimationFrame(() => {
        const el = sectionRefs.current[SCROLL_IDS[tab]]
        if (el) {
          isClickScrolling.current = true
          el.scrollIntoView({ behavior: "smooth", block: "start" })
          setTimeout(() => { isClickScrolling.current = false }, 800)
        }
      })
    } else {
      // Panel tab – show its panel content
      setView(tab as "Lokasi" | "Property Progress")
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="flex-1">
      {/* Sticky tab nav */}
      <div className="sticky top-0 z-10 border-b border-border bg-background">
        <nav className="flex gap-6 overflow-x-auto" aria-label="Property details navigation">
          {ALL_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => handleTabClick(tab)}
              className={`shrink-0 whitespace-nowrap pb-3 pt-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-foreground text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* ─── Overview / scroll sections ─── */}
      {view === "overview" && (
        <div className="space-y-12 py-8">
          {/* Overview */}
          <section id="overview" ref={setRef("overview")} className="scroll-mt-16">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {name}
              </h2>
              <div className="flex shrink-0 items-center gap-3">
                {[Facebook, MessageCircle, Link2].map((Icon, i) => (
                  <button key={i} type="button" className="text-muted-foreground transition-colors hover:text-foreground" aria-label="Share">
                    <Icon className="size-5" strokeWidth={1.5} />
                  </button>
                ))}
                <button type="button" className="text-muted-foreground transition-colors hover:text-foreground" aria-label="Share on X">
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <p className={`text-sm leading-relaxed text-muted-foreground ${expanded ? "" : "line-clamp-3"}`}>
                {description}
              </p>
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
              >
                {expanded ? "Hide" : "See More"}
                {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
              </button>
            </div>
          </section>

          {/* Facilities */}
          <section id="facilities" ref={setRef("facilities")} className="scroll-mt-16">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Facilities</h2>
            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
              {FACILITIES.map((f) => {
                const Icon = f.icon
                return (
                  <div key={f.label} className="flex items-center gap-3">
                    <Icon className="size-6 shrink-0 text-foreground" strokeWidth={1.3} />
                    <span className="text-sm font-medium text-foreground">{f.label}</span>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Type Rumah */}
          <section id="type-rumah" ref={setRef("type-rumah")} className="scroll-mt-16">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Type Rumah</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {HOUSE_TYPES.map((type) => (
                <div key={type.name} className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
                  <h3 className="text-lg font-bold text-foreground">{type.name}</h3>
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><BedDouble className="size-3.5" /> {type.bedrooms} Beds</span>
                    <span className="flex items-center gap-1"><Bath className="size-3.5" /> {type.bathrooms} Baths</span>
                    <span className="flex items-center gap-1"><Ruler className="size-3.5" /> {type.sqft} m²</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{type.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Denah */}
          <section id="denah" ref={setRef("denah")} className="scroll-mt-16">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Denah</h2>
            <p className="mt-2 text-sm text-muted-foreground">Klik gambar untuk melihat denah secara detail.</p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {HOUSE_TYPES.map((type) => (
                <button
                  key={type.name}
                  type="button"
                  onClick={() => { setDenahModal({ name: type.name, image: type.denah }); setZoom(1) }}
                  className="group relative overflow-hidden rounded-xl border border-border bg-muted/20 transition-all hover:border-foreground/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={`Lihat denah ${type.name}`}
                >
                  <img
                    src={type.denah}
                    alt={`Denah ${type.name}`}
                    width={400}
                    height={300}
                    className="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-3 text-left">
                    <p className="text-sm font-semibold text-foreground">Denah {type.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Klik untuk preview</p>
                  </div>
                  {/* Hover overlay hint */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
                    <ZoomIn className="size-8 text-white opacity-0 drop-shadow-lg transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ─── Lokasi panel ─── */}
      {view === "Lokasi" && (
        <div className="py-8">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Lokasi</h2>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4 shrink-0" />
            <span>Grand City Balikpapan, Kalimantan Timur, Indonesia</span>
          </div>
          <div className="mt-6 overflow-hidden rounded-xl border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.0456!2d116.8813!3d-1.2654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df146f2f1ab0b0f%3A0x0!2sBalikpapan!5e0!3m2!1sid!2sid!4v1708000000000!5m2!1sid!2sid"
              className="h-[320px] w-full sm:h-[450px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Nordville - Grand City Balikpapan"
            />
          </div>
        </div>
      )}

      {/* ─── Denah Modal ─── */}
      {denahModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => { setDenahModal(null); setZoom(1) }}
          role="dialog"
          aria-modal="true"
          aria-label={`Denah ${denahModal.name}`}
        >
          {/* Modal box – stop propagation so clicking inside doesn't close */}
          <div
            className="relative flex max-h-[90vh] w-[90vw] max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <h3 className="font-semibold text-foreground">Denah {denahModal.name}</h3>
              <div className="flex items-center gap-2">
                {/* Zoom out */}
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.25).toFixed(2)))}
                  disabled={zoom <= 0.5}
                  className="flex size-8 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted disabled:opacity-40"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="size-4" />
                </button>
                {/* Zoom level */}
                <span className="w-12 text-center text-xs font-medium text-muted-foreground">
                  {Math.round(zoom * 100)}%
                </span>
                {/* Zoom in */}
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)))}
                  disabled={zoom >= 3}
                  className="flex size-8 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted disabled:opacity-40"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="size-4" />
                </button>
                {/* Close */}
                <button
                  type="button"
                  onClick={() => { setDenahModal(null); setZoom(1) }}
                  className="ml-2 flex size-8 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted"
                  aria-label="Close"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Image area – scrollable when zoomed */}
            <div className="overflow-auto bg-muted/30 p-4" style={{ maxHeight: "calc(90vh - 60px)" }}>
              <div
                className="flex origin-top-left items-center justify-center transition-transform duration-200"
                style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}
              >
                <img
                  src={denahModal.image}
                  alt={`Denah ${denahModal.name}`}
                  width={800}
                  height={600}
                  className="rounded-lg object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Property Progress panel ─── */}
      {view === "Property Progress" && (
        <div className="py-8">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Property Progress</h2>
          <p className="mt-2 text-sm text-muted-foreground">Pantau perkembangan pembangunan kawasan setiap bulannya.</p>

          {/* Overall progress bar */}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-emerald-600 transition-all"
                style={{ width: `${PROGRESS_DATA[PROGRESS_DATA.length - 1].percentage}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-emerald-700">
              {PROGRESS_DATA[PROGRESS_DATA.length - 1].percentage}%
            </span>
          </div>

          {/* Monthly progress cards */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRESS_DATA.map((item) => (
              <div key={item.month} className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={`Progress ${item.month} - ${item.label}`}
                    width={400}
                    height={260}
                    className="h-[180px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                      <CalendarDays className="size-3" />
                      {item.month}
                    </span>
                  </div>
                  <div className="absolute right-3 top-3">
                    <span className="inline-block rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground">{item.label}</h3>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-emerald-600 transition-all" style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
