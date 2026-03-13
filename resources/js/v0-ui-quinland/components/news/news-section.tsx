import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { ArrowRight } from "lucide-react"
import { resolveMediaUrl } from "@/lib/resolve-media-url"

const FEATURED_POST = {
  id: 1,
  title: "Rumah Dijual di Tangerang untuk Keluarga Nyaman & Aman",
  excerpt:
    "Cari rumah dijual di Tangerang untuk keluarga? Ini kelebihan Excelia Banjar Wijaya dengan ruang luas, lokasi strategis, keamanan 24 jam, dan akses sekolah.",
  image: "/storage/media/blog-1.jpg",
  date: "19 Feb 2026",
  category: "Blog",
}

const RECENT_POSTS = [
  {
    id: 2,
    title: "Amadeus Signature, Rumah di Bogor untuk Investasi Jangka...",
    excerpt:
      "Rumah di Bogor Amadeus Signature menawarkan desain premium, lingkungan asri, akses tol dekat,...",
    image: "/storage/media/blog-2.jpg",
    date: "17 Feb 2026",
    category: "Blog",
  },
  {
    id: 3,
    title: "Aerium Residence, Apartemen untuk Milenial, Pet Friendly &...",
    excerpt:
      "Apartemen Jakarta Barat Aerium hadir dengan konsep pet-friendly, fasilitas premium, lingkungan...",
    image: "/storage/media/blog-3.jpg",
    date: "16 Feb 2026",
    category: "Blog",
  },
  {
    id: 4,
    title: "Tips Memilih Rumah Idaman dengan Budget Terbatas",
    excerpt:
      "Panduan lengkap memilih rumah impian dengan budget pas-pasan tanpa mengorbankan kualitas dan lokasi...",
    image: "/storage/media/blog-4.jpg",
    date: "15 Feb 2026",
    category: "Blog",
  },
]

export function NewsSection() {
  const { props } = usePage<any>()
  const media = props.media || {}

  const featuredPost = {
    ...FEATURED_POST,
    image: resolveMediaUrl(media.blog_1, FEATURED_POST.image),
  }

  const recentPosts = [
    { ...RECENT_POSTS[0], image: resolveMediaUrl(media.blog_2, RECENT_POSTS[0].image) },
    { ...RECENT_POSTS[1], image: resolveMediaUrl(media.blog_3, RECENT_POSTS[1].image) },
    { ...RECENT_POSTS[2], image: resolveMediaUrl(media.blog_4, RECENT_POSTS[2].image) },
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Latest News
        </h2>
        <Link
          href="/artikel"
          className="group flex items-center gap-2 text-sm font-semibold text-red-600 transition-colors hover:text-red-700"
        >
          See All
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Featured Post - Large with overlay */}
        <article className="group lg:col-span-3">
          <Link href={`/news/${featuredPost.id}`} className="block">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Badge - Top Right */}
              <div className="absolute right-4 top-4">
                <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                  {featuredPost.category}
                </span>
              </div>

              {/* Content overlay - Bottom */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <h3 className="text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-emerald-400 sm:text-3xl">
                  {featuredPost.title}
                </h3>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/90 sm:text-base">
                  {featuredPost.excerpt}
                </p>
                <time className="mt-4 block text-sm text-white/80">
                  {featuredPost.date}
                </time>
              </div>
            </div>
          </Link>
        </article>

        {/* Recent Posts - Small Cards */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {recentPosts.map((post) => (
            <article key={post.id} className="group">
              <Link href={`/news/${post.id}`} className="flex gap-4">
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-32">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Badge - Top Right */}
                  <div className="absolute right-2 top-2">
                    <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <h3 className="line-clamp-2 text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-emerald-700 sm:text-lg">
                    {post.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground sm:text-sm">
                    {post.excerpt}
                  </p>
                  <time className="mt-2 text-xs text-muted-foreground">
                    {post.date}
                  </time>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
