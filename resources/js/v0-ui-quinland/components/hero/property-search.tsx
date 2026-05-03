"use client"

import { useState } from "react"
import { MapPin, Building2, FolderKanban, DollarSign } from "lucide-react"
import { usePage, router } from "@inertiajs/react"

interface SearchMeta {
  unit_bisnis: string[]
  kategori: string[]
  locations: string[]
  price_ranges: { label: string; min: number; max: number | null }[]
}

export function PropertySearch() {
  const { props } = usePage<{ searchMeta?: SearchMeta }>()
  const meta = props.searchMeta ?? { unit_bisnis: [], kategori: [], locations: [], price_ranges: [] }

  const [project, setProject] = useState("")
  const [kategori, setKategori] = useState("")
  const [location, setLocation] = useState("")
  const [price, setPrice] = useState("")

  function handleSearch() {
    const params: Record<string, string> = {}
    if (project) params.project = project
    if (kategori) params.kategori = kategori
    if (location) params.location = location
    if (price) params.price = price

    router.visit('/property', { data: params })
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4">
      <div className="flex flex-col items-stretch gap-3 rounded-2xl bg-card p-4 shadow-xl sm:flex-row sm:items-center sm:rounded-full sm:p-2">

        {/* Project (Unit Bisnis) */}
        <SearchSelect
          icon={<FolderKanban className="size-5 shrink-0 text-muted-foreground" />}
          value={project}
          onChange={setProject}
          placeholder="Project"
          options={meta.unit_bisnis}
        />

        <Divider />

        {/* Property Type (Kategori) */}
        <SearchSelect
          icon={<Building2 className="size-5 shrink-0 text-muted-foreground" />}
          value={kategori}
          onChange={setKategori}
          placeholder="Property Type"
          options={meta.kategori}
        />

        <Divider />

        {/* Location */}
        <SearchSelect
          icon={<MapPin className="size-5 shrink-0 text-muted-foreground" />}
          value={location}
          onChange={setLocation}
          placeholder="Location"
          options={meta.locations}
        />

        <Divider />

        {/* Price Range */}
        <SearchSelect
          icon={<DollarSign className="size-5 shrink-0 text-muted-foreground" />}
          value={price}
          onChange={setPrice}
          placeholder="Price Range"
          options={meta.price_ranges.map(r => r.label)}
        />

        {/* Submit */}
        <button
          type="button"
          onClick={handleSearch}
          className="shrink-0 cursor-pointer rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Find Property
        </button>
      </div>
    </div>
  )
}

function SearchSelect({
  icon,
  value,
  onChange,
  placeholder,
  options,
}: {
  icon: React.ReactNode
  value: string
  onChange: (val: string) => void
  placeholder: string
  options: string[]
}) {
  return (
    <div className="relative flex min-w-0 flex-1 items-center gap-3 rounded-full px-4 py-2">
      {icon}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-w-0 cursor-pointer appearance-none bg-transparent text-sm font-medium outline-none"
        style={{
          color: value ? "inherit" : "hsl(var(--muted-foreground))",
        }}
        aria-label={placeholder}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="text-foreground">
            {opt}
          </option>
        ))}
      </select>
      <ChevronIcon />
    </div>
  )
}

function Divider() {
  return (
    <div
      className="hidden h-8 w-px bg-border sm:block"
      aria-hidden="true"
    />
  )
}

function ChevronIcon() {
  return (
    <svg
      className="pointer-events-none size-5 shrink-0 text-muted-foreground"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  )
}
