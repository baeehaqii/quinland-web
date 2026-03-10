import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <article className="flex flex-col gap-3 font-sans">
      <Icon
        className="size-7 text-foreground"
        strokeWidth={1.2}
        aria-hidden="true"
      />
      <h3 className="text-lg font-bold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground text-justify">
        {description}
      </p>
    </article>
  )
}
