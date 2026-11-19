"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Play, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { value: "+5", label: "Années d'expérience", suffix: "ans" },
  { value: "100", label: "Clients satisfaits", suffix: "%" },
  { value: "N°1", label: "Au Sénégal", suffix: "" },
]

const features = [
  "Livraison gratuite sur Dakar",
  "Garantie 2 ans incluse",
  "Service après-vente réactif",
]

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-background pt-20 md:pt-32 pb-12 md:pb-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          style={{ y }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl"
        />
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div style={{ opacity, scale }} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">Leader au Sénégal depuis 2018</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-4 md:mb-6"
            >
              <span className="text-balance">Motos & Tricycles de</span>{" "}
              <span className="relative inline-block">
                <span className="text-primary">Qualité</span>
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <motion.path
                    d="M2 8C50 2 150 2 198 8"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="text-primary/40"
                  />
                </motion.svg>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed"
            >
              Hasilaza Motor est votre partenaire de confiance pour l{"'"}achat de tricycles cargo, 
              motos et pièces détachées. Nous offrons les meilleurs prix du marché avec une garantie complète.
            </motion.p>

            {/* Features List */}
            <motion.ul
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              {features.map((feature, index) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-foreground/80"
                >
                  <CheckCircle className="w-4 h-4 text-primary" />
                  {feature}
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 text-base shadow-xl shadow-primary/30">
                  <Link href="/produits" className="flex items-center gap-2">
                    Voir nos produits
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" className="h-14 px-8 text-base border-2 hover:bg-muted bg-transparent">
                  <a 
                    href="https://wa.me/221781094091?text=Bonjour, je souhaite en savoir plus sur vos produits" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Contactez-nous
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:gap-8 lg:gap-12"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-xl sm:text-2xl lg:text-4xl font-bold text-primary">
                    {stat.value}
                    <span className="text-sm sm:text-lg">{stat.suffix}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative">
              {/* Main Image Container */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10"
              >
                <div className="relative aspect-square max-w-xs md:max-w-md lg:max-w-lg mx-auto">
                  <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl transform rotate-6" />
                  <div className="relative bg-muted rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src="/images/tricycle-200cc.jpg"
                      alt="Tricycle Cargo Hasilaza Motor"
                      width={600}
                      height={600}
                      className="w-full h-full object-cover"
                      priority
                    />
                    {/* Overlay Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1 }}
                      className="absolute top-6 right-6 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-sm shadow-lg"
                    >
                      Best-Seller
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Cards - hidden on small screens, compact on medium */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="hidden md:block absolute -left-2 lg:-left-10 top-1/4 bg-background p-2.5 lg:p-4 rounded-xl lg:rounded-2xl shadow-xl border border-border z-20"
              >
                <div className="flex items-center gap-2 lg:gap-3">
                  <div className="w-8 h-8 lg:w-12 lg:h-12 bg-primary/10 rounded-lg lg:rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 lg:w-6 lg:h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-xs lg:text-base">Garantie 2 ans</div>
                    <div className="text-[10px] lg:text-xs text-muted-foreground">Pieces et main d{"'"}oeuvre</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="hidden md:block absolute -right-2 lg:-right-10 bottom-1/4 bg-background p-2.5 lg:p-4 rounded-xl lg:rounded-2xl shadow-xl border border-border z-20"
              >
                <div className="flex items-center gap-2 lg:gap-3">
                  <div className="w-8 h-8 lg:w-12 lg:h-12 bg-primary/10 rounded-lg lg:rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 lg:w-6 lg:h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-xs lg:text-base">Livraison Express</div>
                    <div className="text-[10px] lg:text-xs text-muted-foreground">Partout au Senegal</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground">Défiler</span>
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
