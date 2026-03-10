"use client"

const CATEGORIES = [
  "Featured",
  "Apartment",
  "Residential",
  "Condos",
  "Cabins",
] as const

interface CategoryTabsProps {
  active: string
  onChange: (category: string) => void
}

export function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {CATEGORIES.map((category) => {
        const isActive = active === category
        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`rounded-full border px-6 py-2 text-sm font-semibold transition-all duration-300 ${
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-transparent text-foreground hover:border-primary/50 hover:bg-primary/5"
            }`}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
