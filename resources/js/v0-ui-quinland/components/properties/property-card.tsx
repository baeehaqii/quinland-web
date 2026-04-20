import { Link } from '@inertiajs/react';
import { MapPin, BedDouble, Bath, Ruler } from "lucide-react"

export interface Property {
  id: string | number
  name: string
  location: string
  image: string[]
  tipe_rumah: Array<{
    sqft: number;
    bedrooms: number;
    bathrooms: number;
  }>
  slug: string
  kategori?: string
}

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  // Ambil data tipe rumah pertama sebagai representasi di kartu
  const mainType = property.tipe_rumah?.[0] || { sqft: 0, bedrooms: 0, bathrooms: 0 };

  // Ambil gambar pertama dari array image
  // Kita tambahkan /storage/ karena Laravel menyimpan path relatif
  const rawImage = property.image?.[0] ?? ''
  const displayImage = rawImage
    ? (rawImage.startsWith('http://') || rawImage.startsWith('https://') || rawImage.startsWith('/storage/')
      ? rawImage
      : `/storage/${rawImage.replace(/^\/+/, '')}`)
    : '/storage/media/placeholder.jpg'

  return (
    <Link href={`/property/${property.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={displayImage}
          alt={property.name}
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Address pill */}
        <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-white/25 bg-white/20 px-3 py-1.5 backdrop-blur-md">
          <MapPin className="size-3.5 shrink-0 text-white" strokeWidth={2} />
          <span className="text-xs font-medium text-white truncate max-w-[150px]">
            {property.location}
          </span>
        </div>

        {/* Kategori badge */}
        {property.kategori && (
          <div className="absolute left-3 top-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${property.kategori === 'FLPP'
                ? 'bg-emerald-500/90 text-white'
                : 'bg-amber-500/90 text-white'
              }`}>
              {property.kategori}
            </span>
          </div>
        )}

        {/* Default state */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-5 pb-5 pt-16 transition-opacity duration-400 ease-in-out group-hover:opacity-0">
          <h3 className="text-xl font-bold text-white">{property.name}</h3>
        </div>

        {/* Hover state */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 m-3 translate-y-3 rounded-xl border border-white/20 bg-white/15 p-4 opacity-0 backdrop-blur-md transition-all duration-400 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
          <h3 className="text-lg font-bold text-white">{property.name}</h3>

          <div className="mt-2 flex items-center gap-4 text-xs font-medium text-white/90">
            <span className="flex items-center gap-1.5">
              <BedDouble className="size-3.5 shrink-0" strokeWidth={2} />
              {mainType.bedrooms} Beds
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="size-3.5 shrink-0" strokeWidth={2} />
              {mainType.bathrooms} Baths
            </span>
            <span className="flex items-center gap-1.5">
              <Ruler className="size-3.5 shrink-0" strokeWidth={2} />
              {/* Optional chaining ?. agar tidak error jika undefined */}
              {(mainType.sqft || 0).toLocaleString()} sqft
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}