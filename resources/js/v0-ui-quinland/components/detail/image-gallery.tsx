"use client"

import { useState, useCallback, useEffect } from "react"
import { Link } from '@inertiajs/react';
import { MessageCircle, X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"

interface ImageGalleryProps {
  images: string[]
  projectName: string
}

export function ImageGallery({ images, projectName }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [zoom, setZoom] = useState(1)

  const [main, secondary, tertiary] = images

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index)
    setZoom(1)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    setZoom(1)
  }, [])

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + images.length) % images.length)
      setZoom(1)
    },
    [images.length],
  )

  const zoomIn = useCallback(() => setZoom((z) => Math.min(z + 0.25, 4)), [])
  const zoomOut = useCallback(() => setZoom((z) => Math.max(z - 0.25, 0.5)), [])
  const resetZoom = useCallback(() => setZoom(1), [])

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") goTo(activeIndex - 1)
      if (e.key === "ArrowRight") goTo(activeIndex + 1)
      if (e.key === "+") zoomIn()
      if (e.key === "-") zoomOut()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [lightboxOpen, activeIndex, closeLightbox, goTo, zoomIn, zoomOut])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [lightboxOpen])

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:grid-rows-2 lg:max-h-[420px]">
        {/* Main large image */}
        <div className="relative overflow-hidden rounded-2xl lg:col-span-2 lg:row-span-2">
          <button
            type="button"
            onClick={() => openLightbox(0)}
            className="group relative h-full w-full cursor-zoom-in"
            aria-label={`Preview ${projectName} - Main view`}
          >
            <img
              src={main}
              alt={`${projectName} - Main view`}
              width={900}
              height={420}
              className="h-[240px] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] sm:h-[300px] lg:h-[420px]"
            />
            {/* Hover overlay */}
            <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10 rounded-2xl" />
          </button>

          {/* WhatsApp button */}
          <Link
            href="#"
            className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-emerald-700"
          >
            <MessageCircle className="size-4" />
            Whatsapp
          </Link>
        </div>

        {/* Top right image */}
        <div className="hidden overflow-hidden rounded-2xl lg:block">
          <button
            type="button"
            onClick={() => openLightbox(1)}
            className="group relative h-full w-full cursor-zoom-in"
            aria-label={`Preview ${projectName} - Exterior`}
          >
            <img
              src={secondary}
              alt={`${projectName} - Exterior`}
              width={500}
              height={204}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10 rounded-2xl" />
          </button>
        </div>

        {/* Bottom right image */}
        <div className="relative hidden overflow-hidden rounded-2xl lg:block">
          <button
            type="button"
            onClick={() => openLightbox(2)}
            className="group relative h-full w-full cursor-zoom-in"
            aria-label={`Preview ${projectName} - Detail`}
          >
            <img
              src={tertiary}
              alt={`${projectName} - Detail`}
              width={500}
              height={204}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10 rounded-2xl" />
          </button>

          {/* See All Image overlay */}
          <button
            type="button"
            onClick={() => openLightbox(0)}
            className="absolute bottom-3 right-3 rounded-lg bg-black/60 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-black/80"
          >
            See All Image
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-sm font-medium text-white/70">
              {activeIndex + 1} / {images.length}
            </p>

            {/* Zoom controls */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={zoomOut}
                disabled={zoom <= 0.5}
                className="flex size-9 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 disabled:opacity-30"
                aria-label="Zoom out"
              >
                <ZoomOut className="size-5" />
              </button>
              <button
                type="button"
                onClick={resetZoom}
                className="flex h-9 min-w-[52px] items-center justify-center rounded-lg px-2 text-xs font-semibold text-white/80 transition-colors hover:bg-white/10"
                aria-label="Reset zoom"
              >
                <RotateCcw className="size-4 mr-1" />
                {Math.round(zoom * 100)}%
              </button>
              <button
                type="button"
                onClick={zoomIn}
                disabled={zoom >= 4}
                className="flex size-9 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 disabled:opacity-30"
                aria-label="Zoom in"
              >
                <ZoomIn className="size-5" />
              </button>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={closeLightbox}
              className="flex size-9 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10"
              aria-label="Close preview"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Main image area */}
          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-14">
            {/* Prev button */}
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              className="absolute left-2 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-6" />
            </button>

            {/* Image — uses natural aspect ratio via width/height auto */}
            <div className="overflow-auto flex items-center justify-center w-full h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[activeIndex]}
                alt={`${projectName} - Image ${activeIndex + 1}`}
                className="rounded-lg transition-transform duration-200"
                style={{
                  maxWidth: "100%",
                  maxHeight: "72vh",
                  width: "auto",
                  height: "auto",
                  transform: `scale(${zoom})`,
                  transformOrigin: "center center",
                  display: "block",
                }}
              />
            </div>

            {/* Next button */}
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              className="absolute right-2 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Next image"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>

          {/* Thumbnail strip */}
          <div className="flex items-center justify-center gap-3 py-4 px-4">
            {images.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`relative h-16 w-24 overflow-hidden rounded-lg border-2 transition-all ${i === activeIndex
                    ? "border-white scale-105 shadow-lg"
                    : "border-white/20 opacity-50 hover:opacity-80"
                  }`}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === activeIndex}
              >
                <img
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Backdrop click to close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={closeLightbox}
            aria-hidden="true"
          />
        </div>
      )}
    </>
  )
}
