import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { Calendar, ArrowRight } from "lucide-react";

interface EventsSectionProps {
  title?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export function EventsSection({
  title = "Special Events",
  ctaLabel = "See All",
  ctaUrl = "/events"
}: EventsSectionProps) {
  const { props } = usePage<any>()
  const events: any[] = props.events || []

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        <Link
          href={ctaUrl}
          className="group flex items-center gap-2 text-sm font-semibold text-red-600 transition-colors hover:text-red-700"
        >
          {ctaLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {events.length === 0 ? (
        <p className="text-muted-foreground">Belum ada event yang dipublikasikan.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event: any) => (
            <Link
              href={`/event-csr/event/${event.slug || event.id}`}
              key={event.id}
              className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-sm transition-shadow hover:shadow-md block"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={event.image || "/storage/media/event-1.jpg"}
                  alt={event.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-emerald-700">
                  {event.title}
                </h3>

                <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {event.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="size-4" />
                  <time dateTime={event.date}>{event.date}</time>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}