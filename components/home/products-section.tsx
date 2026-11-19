"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowRight, Star, ShoppingBag, Eye, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProducts, formatPrice, type Product } from "@/lib/supabase/products"

const categories = [
  { id: "all", label: "Tout voir" },
  { id: "tricycle", label: "Tricycles" },
  { id: "moto", label: "Motos" },
]

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
    <Link href={`/produits/${product.slug}`} className="block bg-background rounded-3xl overflow-hidden shadow-lg border border-border hover:shadow-2xl transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-foreground/40 flex items-center justify-center gap-3"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span
                  className="w-12 h-12 bg-background rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Eye className="w-5 h-5" />
                </span>
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.05 }}
                onClick={(e) => e.preventDefault()}
              >
                <a
                  href={`https://wa.me/221781094091?text=Bonjour, je suis intéressé par ${product.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.is_best_seller && (
            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
              Best-Seller
            </span>
          )}
          {product.is_new && (
            <span className="px-3 py-1 bg-foreground text-background text-xs font-bold rounded-full">
              Nouveau
            </span>
          )}
          {product.old_price && (
            <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
              -{Math.round((1 - product.price / product.old_price) * 100)}%
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {product.subcategory || product.category}
        </span>

        {/* Name */}
        <h3 className="font-bold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviews} avis)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          {product.old_price && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.old_price)}
            </span>
          )}
        </div>
      </div>
    </Link>
    </motion.div>
  )
}

export function ProductsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState("all")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      setLoading(true)
      const data = await getProducts()
      setProducts(data)
      setLoading(false)
    }
    loadProducts()
  }, [])

  const vehicleProducts = products.filter(p => p.category !== "piece")
  const filteredProducts = activeCategory === "all" 
    ? vehicleProducts.slice(0, 8) 
    : vehicleProducts.filter(p => p.category === activeCategory).slice(0, 8)

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
            >
              <span className="text-sm font-semibold text-primary">Nos Produits</span>
            </motion.div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4">
              <span className="text-balance">Découvrez nos </span>
              <span className="text-primary">Best-Sellers</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Une sélection de nos véhicules et pièces les plus populaires
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" size="lg" className="border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary bg-transparent">
                <Link href="/produits" className="flex items-center gap-2">
                  Voir tout le catalogue
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-background text-foreground hover:bg-muted border border-border"
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">Aucun produit trouve dans cette categorie</p>
          </div>
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="wait">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            Vous ne trouvez pas ce que vous cherchez?
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <a
              href="https://wa.me/221781094091?text=Bonjour, je cherche un produit spécifique"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              Contactez-nous pour une demande personnalisée
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
