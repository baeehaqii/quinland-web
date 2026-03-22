import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { Calendar, ArrowRight } from "lucide-react";
import { resolveMediaUrl } from "@/lib/resolve-media-url"

/* ─── 1. Definisi Interface Props ─── */
interface EventsSectionProps {
  title?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

/* ─── 2. Data Dummy (Tetap di sini sebagai fallback/isi list) ─── */
const EVENTS = [
  {
    id: 1,
    title: "BCA Expoversary",
    description:
      "Temukan promo eksklusif Sinar Mas Land di BCA Expoversary 2026. Dapatkan diskon, DP ringan, bunga rendah, dan hadiah menarik untuk properti impian Anda.",
    date: "28 Feb 2026",
    image: "/storage/media/event-1.jpg",
  },
  {
    id: 2,
    title: "BRI Expo",
    description:
      "Temukan properti impian lebih mudah di BRI Expo 2025. Sinar Mas Land hadir dengan kemudahan dan promo menarik untuk hunian keluarga Anda.",
    date: "31 Agt 2025",
    image: "/storage/media/event-2.jpg",
  },
  {
    id: 3,
    title: "BNI EXPO",
    description:
      "Temukan hunian impian di BNI wondrX 2025 bersama Sinar Mas Land. Nikmati promo eksklusif, bunga rendah, cashback, dan lucky draw menarik!",
    date: "17 Agt 2025",
    image: "/storage/media/event-3.jpg",
  },
];

/* ─── 3. Komponen Utama ─── */
export function EventsSection({
  title = "Special Events",
  ctaLabel = "See All",
  ctaUrl = "/events"
}: EventsSectionProps) {
  const { props } = usePage<any>()
  const media = props.media || {}
  
  // Ambil events dari backend jika ada
  let events = props.events || []

  // Fallback data dummy
  if (events.length === 0) {
      events = [
        { ...EVENTS[0], image: resolveMediaUrl(media.event_1, EVENTS[0].image) },
        { ...EVENTS[1], image: resolveMediaUrl(media.event_2, EVENTS[1].image) },
        { ...EVENTS[2], image: resolveMediaUrl(media.event_3, EVENTS[2].image) },
      ]
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header - Sekarang mengambil data dari Props (Database) */}
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

      {/* Events Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event: any) => (
          <Link
            href={`/event-csr/event/${event.slug || event.id}`}
            key={event.id}
            className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-sm transition-shadow hover:shadow-md block"
          >
            {/* Event Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Event Content */}
            <div className="flex flex-1 flex-col gap-3 p-5">
              <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-emerald-700">
                {event.title}
              </h3>

              <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {event.description}
              </p>

              {/* Date */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="size-4" />
                <time dateTime={event.date}>{event.date}</time>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}