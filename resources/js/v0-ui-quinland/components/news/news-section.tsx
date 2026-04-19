import { Link, usePage } from '@inertiajs/react';
import { ArrowRight } from "lucide-react"

interface Article {
  id: number
  title: string
  excerpt: string
  image: string | null
  date: string
  category: string
  slug: string
}

export function NewsSection() {
  const { props } = usePage<any>()
  const articles: Article[] = props.articles || []

  const featured = articles[0] ?? null
  const recents = articles.slice(1, 4)

  if (articles.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
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

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Featured Post */}
        {featured && (
          <article className="group lg:col-span-3">
            <Link href={`/artikel/${featured.slug}`} className="block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <img
                  src={featured.image || "/storage/media/blog-1.jpg"}
                  alt={featured.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute right-4 top-4">
                  <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                    {featured.category}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <h3 className="text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-emerald-400 sm:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/90 sm:text-base">
                    {featured.excerpt}
                  </p>
                  <time className="mt-4 block text-sm text-white/80">{featured.date}</time>
                </div>
              </div>
            </Link>
          </article>
        )}

        {/* Recent Posts */}
        {recents.length > 0 && (
          <div className="flex flex-col gap-6 lg:col-span-2">
            {recents.map((post) => (
              <article key={post.id} className="group">
                <Link href={`/artikel/${post.slug}`} className="flex gap-4">
                  <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-32">
                    <img
                      src={post.image || "/storage/media/blog-1.jpg"}
                      alt={post.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
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
                    <time className="mt-2 text-xs text-muted-foreground">{post.date}</time>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
