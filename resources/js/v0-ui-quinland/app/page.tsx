import { Navbar } from "@/v0-ui-quinland/components/layout/navbar"
import { Footer } from "@/v0-ui-quinland/components/layout/footer"
import { HeroSection } from "@/v0-ui-quinland/components/hero/hero-section"
import { AboutSection } from "@/v0-ui-quinland/components/about/about-section"
import { PropertiesSection } from "@/v0-ui-quinland/components/properties/properties-section"
import { PartnerSection } from "@/v0-ui-quinland/components/partner/partner-section"
import { NewsSection } from "@/v0-ui-quinland/components/news/news-section"
import { EventsSection } from "@/v0-ui-quinland/components/events/events-section"
import { FaqSection } from "@/v0-ui-quinland/components/faq/faq-section"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        {/* Spacer agar search bar tidak tertutup konten berikutnya */}
        <div className="h-16" />
        <AboutSection />
        <PropertiesSection />
        <PartnerSection />
        <NewsSection />
        <EventsSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  )
}
