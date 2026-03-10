"use client"

import { useState } from "react"
import { MapPin, Building2, FolderKanban, DollarSign } from "lucide-react"

const LOCATIONS = [
  "Jakarta",
  "Surabaya",
  "Bandung",
  "Bali",
  "Yogyakarta",
  "Medan",
] as const

const PROPERTY_TYPES = [
  "House",
  "Apartment",
  "Villa",
  "Condo",
  "Townhouse",
  "Land",
] as const

const PROJECTS = [
  "Grand Residence",
  "The Green Park",
  "Skyline Tower",
  "Emerald Heights",
  "Sunset Valley",
] as const

const PRICE_RANGES = [
  "< 500 Jt",
  "500 Jt - 1 M",
  "1 M - 2 M",
  "2 M - 5 M",
  "> 5 M",
] as const

export function PropertySearch() {
  const [location, setLocation] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [project, setProject] = useState("")
  const [priceRange, setPriceRange] = useState("")

  return (
    <div className="mx-auto w-full max-w-4xl px-4">
      <div className="flex flex-col items-stretch gap-3 rounded-2xl bg-card p-4 shadow-xl sm:flex-row sm:items-center sm:rounded-full sm:p-2">
        {/* Location */}
        <SearchSelect
          icon={<MapPin className="size-5 shrink-0 text-muted-foreground" />}
          value={location}
          onChange={setLocation}
          placeholder="Location"
          options={[...LOCATIONS]}
        />

        <Divider />

        {/* Property Type */}
        <SearchSelect
          icon={<Building2 className="size-5 shrink-0 text-muted-foreground" />}
          value={propertyType}
          onChange={setPropertyType}
          placeholder="Property Type"
          options={[...PROPERTY_TYPES]}
        />

        <Divider />

        {/* Project */}
        <SearchSelect
          icon={<FolderKanban className="size-5 shrink-0 text-muted-foreground" />}
          value={project}
          onChange={setProject}
          placeholder="Project"
          options={[...PROJECTS]}
        />

        <Divider />

        {/* Price Range */}
        <SearchSelect
          icon={<DollarSign className="size-5 shrink-0 text-muted-foreground" />}
          value={priceRange}
          onChange={setPriceRange}
          placeholder="Price Range"
          options={[...PRICE_RANGES]}
        />

        {/* Submit */}
        <button
          type="button"
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
