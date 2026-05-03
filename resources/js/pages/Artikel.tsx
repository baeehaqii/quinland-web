"use client"

import { useState, useEffect, useCallback } from "react"
import { Link, Head } from '@inertiajs/react';
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Navbar } from "@/v0-ui-quinland/components/layout/navbar"
import { Footer } from "@/v0-ui-quinland/components/layout/footer"
import { resolveMediaUrl } from "@/lib/resolve-media-url"

interface Article {
  id: number
  title: string
  excerpt: string
  image: string | null
  date: string
  category: string
  slug: string
}

interface ArtikelPageProps {
  articles?: Article[]
  categories?: string[]
  media?: Record<string, string>
}

function FeaturedSlider({ articles }: { articles: Article[] }) {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<"next" | "prev">("next")

  const goTo = useCallback(
    (index: number, dir: "next" | "prev") => {
      if (animating) return
      setDirection(dir)
      setAnimating(true)
      setTimeout(() => {
        setCurrent(index)
        setAnimating(false)
      }, 400)
    },
    [animating]
  )

  const prev = useCallback(() => {
    const index = (current - 1 + articles.length) % articles.length
    goTo(index, "prev")
  }, [articles.length, current, goTo])

  const next = useCallback(() => {
    const index = (current + 1) % articles.length
    goTo(index, "next")
  }, [articles.length, current, goTo])

  useEffect(() => {
    const timer = setInterval(() => {
      next()
    }, 5000)
    return () => clearInterval(timer)
  }, [next])

  const article = articles[current]

  return (
    <section className="mb-14">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Artikel Utama
      </h2>

      <div className="relative overflow-hidden rounded-3xl">
        <div
          key={current}
          className={[
            "relative h-[300px] sm:h-[420px]",
            animating
              ? direction === "next"
                ? "animate-slide-out-left"
                : "animate-slide-out-right"
              : direction === "next"
                ? "animate-slide-in-right"
                : "animate-slide-in-left",
          ].join(" ")}
        >
          <img
            src={article.image || "/storage/media/blog-1.jpg"}
            alt={article.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute right-5 top-5">
            <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
              {article.category}
            </span>
          </div>

          <Link
            href={`/artikel/${article.slug}`}
            className="group absolute inset-x-0 bottom-0 p-6 sm:p-10"
          >
            <h3 className="text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-emerald-400 sm:text-3xl text-balance">
              {article.title}
            </h3>
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/85 sm:text-base">
              {article.excerpt}
            </p>
            <time className="mt-4 block text-sm text-white/70">{article.date}</time>
          </Link>
        </div>

        <button
          onClick={prev}
          aria-label="Artikel sebelumnya"
          className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          onClick={next}
          aria-label="Artikel berikutnya"
          className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
        >
          <ChevronRight className="size-5" />
        </button>

        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {articles.map((_, i) => (
            <button
              key={i}
              aria-label={`Pergi ke slide ${i + 1}`}
              onClick={() => goTo(i, i > current ? "next" : "prev")}
              className={[
                "h-2 rounded-full transition-all duration-300",
                i === current ? "w-6 bg-white" : "w-2 bg-white/50",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ArtikelPage({ articles = [], categories = [], media = {} }: ArtikelPageProps) {
  const heroImage = resolveMediaUrl(media.blog_hero, "/storage/media/blog-1.jpg")
  const articlesPerPage = 8

  const [activeCategory, setActiveCategory] = useState<string>('Semua')
  const [currentPage, setCurrentPage] = useState(1)

  const allCategories = ['Semua', ...categories]

  const filtered = activeCategory === 'Semua'
    ? articles
    : articles.filter(a => a.category === activeCategory)

  const featured = filtered.slice(0, 3)
  const paginatedArticles = filtered.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage)
  const totalPages = Math.max(1, Math.ceil(filtered.length / articlesPerPage))

  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  return (
    <>
      <Head title="Artikel | Quinland Grup" />
      <Navbar />

      {/* Hero Banner */}
      <section className="relative flex h-[300px] items-end sm:h-[360px]">
        <img
          src={heroImage}
          alt="Artikel banner"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 lg:px-10">
          <nav
            className="mb-4 flex items-center gap-1.5 text-sm text-white/70"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="font-semibold text-white">Artikel</span>
          </nav>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Artikel
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Tips, insight, dan informasi terkini seputar dunia properti untuk membantu Anda membuat keputusan terbaik.
          </p>
        </div>
      </section>

      <main className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">

          {/* ─── Filter Kategori ─── */}
          {allCategories.length > 1 && (
            <div className="mb-10 flex flex-wrap gap-2">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={[
                    'rounded-full px-5 py-2 text-sm font-semibold transition-colors',
                    activeCategory === cat
                      ? 'bg-emerald-700 text-white'
                      : 'border border-border bg-card text-foreground hover:border-emerald-700 hover:text-emerald-700',
                  ].join(' ')}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="py-24 text-center text-muted-foreground">
              <p className="text-lg">
                {articles.length === 0
                  ? 'Belum ada artikel yang dipublikasikan.'
                  : 'Tidak ada artikel untuk kategori ini.'}
              </p>
            </div>
          ) : (
            <>
              {featured.length > 0 && <FeaturedSlider articles={featured} />}

              {paginatedArticles.length > 0 && (
                <section>
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      Semua Artikel
                    </h2>
                    <span className="text-sm text-muted-foreground">
                      {filtered.length} artikel
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {paginatedArticles.map((article) => (
                      <article key={article.id} className="group">
                        <Link href={`/artikel/${article.slug}`} className="block">
                          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                            <img
                              src={article.image || "/storage/media/blog-1.jpg"}
                              alt={article.title}
                              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute right-3 top-3">
                              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                                {article.category}
                              </span>
                            </div>
                          </div>
                          <div className="mt-4">
                            <h3 className="line-clamp-2 text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-emerald-700 sm:text-lg">
                              {article.title}
                            </h3>
                            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                              {article.excerpt}
                            </p>
                            <time className="mt-3 block text-xs text-muted-foreground">
                              {article.date}
                            </time>
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
                      <p className="text-sm text-muted-foreground">
                        Menampilkan {((currentPage - 1) * articlesPerPage) + 1}-{Math.min(currentPage * articlesPerPage, filtered.length)} dari {filtered.length} artikel
                      </p>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                          disabled={currentPage === 1}
                          className="inline-flex h-10 items-center rounded-xl border border-border px-4 text-sm font-semibold text-foreground transition-colors hover:border-emerald-700 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <ChevronLeft className="mr-1 size-4" />
                          Prev
                        </button>

                        <div className="flex items-center gap-2">
                          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                            <button
                              key={page}
                              type="button"
                              onClick={() => setCurrentPage(page)}
                              className={[
                                'inline-flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-semibold transition-colors',
                                currentPage === page
                                  ? 'bg-emerald-700 text-white'
                                  : 'border border-border bg-card text-foreground hover:border-emerald-700 hover:text-emerald-700',
                              ].join(' ')}
                            >
                              {page}
                            </button>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                          disabled={currentPage === totalPages}
                          className="inline-flex h-10 items-center rounded-xl border border-border px-4 text-sm font-semibold text-foreground transition-colors hover:border-emerald-700 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Next
                          <ChevronRight className="ml-1 size-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </section>
              )}
            </>
          )}

        </div>
      </main>

      <Footer />
    </>
  )
}
