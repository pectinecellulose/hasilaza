"use client"

import { useState, useMemo, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, SlidersHorizontal, Star, Eye, ShoppingBag, X, ChevronDown, Grid3X3, List, Loader2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getProducts, formatPrice, type Product } from "@/lib/supabase/products"

function ProductCard({ product, index, viewMode }: { product: Product; index: number; viewMode: "grid" | "list" }) {
  const [isHovered, setIsHovered] = useState(false)

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 30 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="group bg-background rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all flex"
      >
        {/* Image */}
        <Link href={`/produits/${product.slug}`} className="relative w-48 h-48 shrink-0 overflow-hidden bg-muted block">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.is_best_seller && (
              <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                Best-Seller
              </span>
            )}
            {product.is_new && (
              <span className="px-2 py-0.5 bg-foreground text-background text-xs font-bold rounded-full">
                Nouveau
              </span>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {product.subcategory || product.category}
            </span>
            <Link href={`/produits/${product.slug}`} className="block">
              <h3 className="font-bold text-lg text-foreground mt-1 mb-2 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {product.short_description}
            </p>
            <div className="flex items-center gap-2">
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
              <span className="text-xs text-muted-foreground">({product.reviews} avis)</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div>
              {product.category === "piece" ? (
                <span className="text-sm text-muted-foreground">Contactez-nous pour le prix</span>
              ) : (
                <>
                  <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
                  {product.old_price && (
                    <span className="text-sm text-muted-foreground line-through ml-2">
                      {formatPrice(product.old_price)}
                    </span>
                  )}
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/produits/${product.slug}`}
                className="px-4 py-2 bg-muted rounded-lg text-foreground hover:bg-primary hover:text-primary-foreground transition-colors font-medium text-sm"
              >
                Voir details
              </Link>
              <a
                href={`https://wa.me/221781094091?text=Bonjour, je suis interesse par ${product.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary rounded-lg text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm"
              >
                Commander
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-background rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all"
    >
      {/* Image */}
      <Link href={`/produits/${product.slug}`} className="relative aspect-square overflow-hidden bg-muted block cursor-pointer">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>
      
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
              <Link
                href={`/produits/${product.slug}`}
                className="w-12 h-12 bg-background rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Eye className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.05 }}
              onClick={(e) => e.preventDefault()}
            >
              <a
                href={`https://wa.me/221781094091?text=Bonjour, je suis interesse par ${product.name}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
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

      {/* Content */}
      <div className="p-5">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {product.subcategory || product.category}
        </span>
        <h3 className="font-bold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
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
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-3">
          {product.category === "piece" ? (
            <span className="text-sm text-muted-foreground">Contactez-nous</span>
          ) : (
            <>
              <span className="text-xl font-bold text-primary">{formatPrice(product.price)}</span>
              {product.old_price && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.old_price)}
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function ProductsContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category") || "all"
  
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState(categoryParam)
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("popular")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000000])

  useEffect(() => {
    async function loadProducts() {
      setLoading(true)
      const data = await getProducts()
      setProducts(data)
      setLoading(false)
    }
    loadProducts()
  }, [])

  const categories = useMemo(() => [
    { id: "all", name: "Tous les produits", count: products.length },
    { id: "tricycle", name: "Tricycles", count: products.filter(p => p.category === "tricycle").length },
    { id: "moto", name: "Motos", count: products.filter(p => p.category === "moto").length },
    { id: "piece", name: "Pieces detachees", count: products.filter(p => p.category === "piece").length }
  ], [products])

  const subcategories: Record<string, string[]> = {
    tricycle: ["cargo", "passager", "mixte"],
    moto: ["sport", "ville", "trail"],
    piece: ["transmission", "freinage", "lubrification", "electrique", "filtration", "suspension"]
  }

  const filteredProducts = useMemo(() => {
    let filtered = products

    // Category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter(p => p.category === activeCategory)
    }

    // Subcategory filter
    if (activeSubcategory) {
      filtered = filtered.filter(p => p.subcategory?.toLowerCase() === activeSubcategory.toLowerCase())
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      )
    }

    // Price filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Sort
    switch (sortBy) {
      case "price-asc":
        filtered = [...filtered].sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered = [...filtered].sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered = [...filtered].sort((a, b) => (b.is_new ? 1 : 0) - (a.is_new ? 1 : 0))
        break
      default: // popular
        filtered = [...filtered].sort((a, b) => b.reviews - a.reviews)
    }

    return filtered
  }, [products, activeCategory, activeSubcategory, searchQuery, sortBy, priceRange])

  const currentSubcategories = activeCategory !== "all" 
    ? subcategories[activeCategory as keyof typeof subcategories] || []
    : []

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
            >
              <span className="text-sm font-semibold text-primary">Catalogue Complet</span>
            </motion.div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6">
              <span className="text-balance">Nos </span>
              <span className="text-primary">Produits</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Decouvrez notre gamme complete de tricycles, motos et pieces detachees. 
              Qualite garantie et prix competitifs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8"
          >
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-xl border-border"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Mobile Filter Toggle */}
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden bg-transparent"
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filtres
              </Button>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-background border border-border rounded-xl px-4 py-3 pr-10 text-sm font-medium cursor-pointer hover:border-primary transition-colors"
                >
                  <option value="popular">Plus populaires</option>
                  <option value="newest">Nouveautes</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix decroissant</option>
                  <option value="rating">Mieux notes</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              </div>

              {/* View Mode */}
              <div className="hidden sm:flex items-center bg-muted rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid" ? "bg-background shadow-sm" : "hover:bg-background/50"
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list" ? "bg-background shadow-sm" : "hover:bg-background/50"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <motion.aside
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`w-64 shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}
            >
              <div className="sticky top-32 space-y-6">
                {/* Categories */}
                <div className="bg-muted/50 rounded-2xl p-6">
                  <h3 className="font-bold text-foreground mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setActiveCategory(cat.id)
                          setActiveSubcategory(null)
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          activeCategory === cat.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted text-foreground"
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className={`text-xs ${activeCategory === cat.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                          {cat.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subcategories */}
                {currentSubcategories.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-muted/50 rounded-2xl p-6"
                  >
                    <h3 className="font-bold text-foreground mb-4">Sous-categories</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setActiveSubcategory(null)}
                        className={`w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          !activeSubcategory
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted text-foreground"
                        }`}
                      >
                        Toutes
                      </button>
                      {currentSubcategories.map((subcat) => (
                        <button
                          key={subcat}
                          onClick={() => setActiveSubcategory(subcat)}
                          className={`w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                            activeSubcategory === subcat
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-muted text-foreground"
                          }`}
                        >
                          {subcat}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Price Range */}
                <div className="bg-muted/50 rounded-2xl p-6">
                  <h3 className="font-bold text-foreground mb-4">Prix</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">De</span>
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm"
                        placeholder="0"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">A</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm"
                        placeholder="15000000"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* Products Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
              ) : filteredProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Aucun produit trouve</h3>
                  <p className="text-muted-foreground mb-6">
                    Essayez de modifier vos filtres ou votre recherche
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchQuery("")
                      setActiveCategory("all")
                      setActiveSubcategory(null)
                      setPriceRange([0, 15000000])
                    }}
                  >
                    Reinitialiser les filtres
                  </Button>
                </motion.div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-6">
                    {filteredProducts.length} produit(s) trouve(s)
                  </p>
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      layout
                      className={viewMode === "grid" 
                        ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
                        : "space-y-4"
                      }
                    >
                      {filteredProducts.map((product, index) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          index={index}
                          viewMode={viewMode}
                        />
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      }>
        <ProductsContent />
      </Suspense>
      <Footer />
    </main>
  )
}
