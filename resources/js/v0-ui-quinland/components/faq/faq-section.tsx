'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/v0-ui-quinland/components/ui/accordion"

const FAQS = [
  {
    question: "Bagaimana Cara Membeli Rumah di Quinland?",
    answer:
      "Anda dapat menghubungi nomer hotline Kami atau berinteraksi dengan marketing Kami langsung. Anda juga bisa mengunjungi kantor Marketing Kami.",
  },
  {
    question: 'Apa Saja Metode Pembayaran yang Tersedia?',
    answer:
      '<p><strong>KPR (Kredit Pemilikan Rumah)</strong> melalui Pembiayan Perbankan yang sudah bekerjasama dengan Kami</p><p><strong>Cash Keras</strong> : Metode pembayaran secara tunai ke developer dengan nominal 95% dibayar di awal dan 5% setelah Rumah jadi</p><p><strong>Cash Termin</strong> : Metode pembayaran secara tunai ke developer dengan nominal 50% dibayar di awal dan 50% Sisa dibayarkan bertahap selama 8 Bulan</p><p><strong>Cash Termin by Progress</strong> : Metode Pembayaran secara tunai ke developer dengan nominal 50% dibayar di awal, 45% setelah progrees Rumah selesai Atap, Dan 5% setelah Rumah jadi</p>',
  },
  {
    question: 'Apakah Ada Jaminan Pembangunan?',
    answer:
      'Ya, kami berkomitmen menyelesaikan pembangunan sesuai perjanjian. Konsumen juga akan mendapatkan surat komitmen pembangunan dari developer.',
  },
  {
    question: 'Bagaimana jika Pengajuan KPR Ditolak?',
    answer:
      '<p>Tim kami akan membantu :</p><ol><li>Evaluasi Penyebab Penolakan</li><li>Pengajuan ulang ke Bank Lain</li><li>Alternatif Skema Pembayaran Lain</li></ol><p>Jika, semua alternatif telah dicoba dan KPR masih belum bisa disetujui, Uang muka yang telah dibayarkan akan Kami kembalikan 100% sesuai dengan S&K yang berlaku</p>',
  },
  {
    question: 'Apa saja dokumen legalitas yang akan didapatkan?',
    answer:
      '<p>Seluruh konsumen Kami mendapatkan jaminan kepastian legalitas dengan dokumen yang akan diterima meliputi :</p><ol><li>Sertifikat Hak Milik atas nama Konsumen</li><li>Persetujuan Bangunan Gedung (PBG)</li><li>SPPT</li></ol>',
  },
]

import { usePage } from '@inertiajs/react'

export function FaqSection() {
  const { props } = usePage<any>()
  const faqsItems = props.faqs?.length > 0 ? props.faqs : FAQS;
  
  // Extract dynamic headline from Page Builder content
  const pageContent = props.page?.content || []
  const faqBlock = pageContent.find((block: any) => block.type === 'faq')?.data || {}

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
        {/* Left Column - Heading */}
        <div className="lg:col-span-2">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {faqBlock.title || "Pertanyaan Umum"}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {faqBlock.description || "Berikut Beberapa Pertanyaan Umum yang sering ditanyakan, Jika Anda masih belum menemukan jawaban disini, Anda bisa menghubungi nomer Hotline Kami"}
          </p>
        </div>

        {/* Right Column - Accordion */}
        <div className="lg:col-span-3">
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqsItems.map((faq: any, index: number) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="mb-4 overflow-hidden rounded-2xl border-0 bg-card shadow-sm transition-shadow hover:shadow-md data-[state=open]:bg-foreground data-[state=open]:text-background"
              >
                <AccordionTrigger className="px-6 py-5 text-left text-lg font-semibold hover:no-underline sm:px-8 sm:py-6 sm:text-xl [&[data-state=open]>svg]:text-background">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0 text-sm leading-relaxed sm:px-8 sm:text-base data-[state=open]:text-background/90">
                  <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
