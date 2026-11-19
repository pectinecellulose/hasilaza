import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { AboutSection } from "@/components/home/about-section"
import { AdvantagesSection } from "@/components/home/advantages-section"
import { ProductsSection } from "@/components/home/products-section"
import { PiecesSection } from "@/components/home/pieces-section"
import { PartnersSection } from "@/components/home/partners-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <AdvantagesSection />
      <ProductsSection />
      <PiecesSection />
      <CTASection />
      <PartnersSection />
      <Footer />
    </main>
  )
}
