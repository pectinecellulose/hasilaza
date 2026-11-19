"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Wrench, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProducts, type Product } from "@/lib/supabase/products"

function PieceCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex-shrink-0 w-[180px] sm:w-[200px]"
    >
      <Link href={`/produits/${product.slug}`} className="group block">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-card border border-border group-hover:border-primary/50 transition-all duration-300 group-hover:shadow-xl">
          <Image
            src={product.images?.[0] || "/images/pieces/default-piece.jpg"}
            alt={product.name}
            fill
            sizes="200px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-xs font-semibold text-white">Voir le detail</span>
          </div>
        </div>
        <div className="mt-2.5 px-0.5">
          <h4 className="font-semibold text-foreground text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h4>
          <p className="text-muted-foreground text-xs mt-1">Contactez-nous pour le prix</p>
        </div>
      </Link>
    </motion.div>
  )
}

export function PiecesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [pieces, setPieces] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  useEffect(() => {
    async function loadPieces() {
      setLoading(true)
      const data = await getProducts()
      setPieces(data.filter((p) => p.category === "piece"))
      setLoading(false)
    }
    loadPieces()
  }, [])

  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 5)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5)
  }, [])

  useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return
    el.addEventListener("scroll", checkScroll, { passive: true })
    // Initial check after a small delay to let items render
    const timer = setTimeout(checkScroll, 100)
    return () => {
      el.removeEventListener("scroll", checkScroll)
      clearTimeout(timer)
    }
  }, [pieces, checkScroll])

  const scroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current
    if (!el) return
    el.scrollBy({
      left: direction === "left" ? -400 : 400,
      behavior: "smooth",
    })
  }

  if (loading) {
    return (
      <section className="py-20 lg:py-28 bg-primary">
        <div className="container mx-auto px-4 flex items-center justify-center py-12">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </section>
    )
  }

  if (pieces.length === 0) return null

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 1, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
        >
          <div>
            <motion.div
              initial={{ opacity: 1, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4"
            >
              <Wrench className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Pieces Detachees</span>
            </motion.div>
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground mb-2 text-balance">
              Nos <span className="text-primary">Pieces Detachees</span>
            </h2>
            <p className="text-muted-foreground max-w-lg leading-relaxed">
              Toutes les pieces compatibles pour vos tricycles et motos Hasilaza
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="w-10 h-10 rounded-full border border-border bg-card text-foreground flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Defiler a gauche"
            >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="w-10 h-10 rounded-full border border-border bg-card text-foreground flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Defiler a droite"
            >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <Button asChild variant="outline" size="lg" className="border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary bg-transparent">
              <Link href="/produits?category=piece" className="flex items-center gap-2">
                Tout voir
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Scrollable row */}
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div
            ref={scrollContainerRef}
            className="flex gap-5 overflow-x-auto pb-4"
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
          >
            {pieces.map((piece, i) => (
              <PieceCard key={piece.id} product={piece} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
