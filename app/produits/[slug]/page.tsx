"use client"

import { useState, useRef, useEffect } from "react"
import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, 
  Star, 
  Check, 
  Truck, 
  Shield, 
  Phone, 
  ChevronRight,
  Minus,
  Plus,
  Share2,
  Heart,
  MessageCircle,
  Loader2
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { OrderModal } from "@/components/order-modal"
import { getProductBySlug, getProducts, formatPrice, type Product } from "@/lib/supabase/products"

function ProductGallery({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0)

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative aspect-square bg-muted rounded-3xl overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={product.images[activeImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          {product.is_best_seller && (
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-full"
            >
              Best-Seller
            </motion.span>
          )}
          {product.is_new && (
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="px-4 py-2 bg-foreground text-background text-sm font-bold rounded-full"
            >
              Nouveau
            </motion.span>
          )}
          {product.old_price && (
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="px-4 py-2 bg-green-500 text-white text-sm font-bold rounded-full"
            >
              -{Math.round((1 - product.price / product.old_price) * 100)}% de reduction
            </motion.span>
          )}
        </div>

        {/* Zoom hint */}
        <div className="absolute bottom-6 right-6 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-medium">
          Cliquez pour agrandir
        </div>
      </motion.div>

      {/* Thumbnails */}
      {product.images.length > 1 && (
        <div className="flex gap-3">
          {product.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                activeImage === idx ? "border-primary" : "border-transparent hover:border-primary/50"
              }`}
            >
              <Image src={img || "/placeholder.svg"} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ProductInfo({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  // Convert to legacy format for OrderModal
  const legacyProduct = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    category: product.category,
    subcategory: product.subcategory,
    price: product.price,
    oldPrice: product.old_price,
    description: product.description,
    shortDescription: product.short_description,
    specifications: product.specifications,
    features: product.features,
    images: product.images,
    inStock: product.in_stock,
    isBestSeller: product.is_best_seller,
    isNew: product.is_new,
    rating: product.rating,
    reviews: product.reviews,
  }

  return (
    <>
      <OrderModal 
        product={legacyProduct} 
        quantity={quantity} 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
      />
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/produits" className="hover:text-primary transition-colors">Produits</Link>
          <ChevronRight className="w-4 h-4" />
          <Link 
            href={`/produits?category=${product.category}`} 
            className="hover:text-primary transition-colors capitalize"
          >
            {product.category === "tricycle" ? "Tricycles" : product.category === "moto" ? "Motos" : "Pieces"}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Category */}
        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
          {product.subcategory || product.category}
        </span>

        {/* Title */}
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground">{product.name}</h1>

        {/* Rating */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-muted"
                }`}
              />
            ))}
          </div>
          <span className="font-medium">{product.rating}</span>
          <span className="text-muted-foreground">({product.reviews} avis verifies)</span>
        </div>

        {/* Price */}
        {product.category === "piece" ? (
          <div className="flex items-baseline gap-4">
            <span className="text-2xl font-semibold text-muted-foreground">Contactez-nous pour le prix</span>
          </div>
        ) : (
          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-bold text-primary">{formatPrice(product.price)}</span>
            {product.old_price && (
              <>
                <span className="text-xl text-muted-foreground line-through">{formatPrice(product.old_price)}</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-bold rounded">
                  Economisez {formatPrice(product.old_price - product.price)}
                </span>
              </>
            )}
          </div>
        )}

        {/* Stock Status */}
        <div className={`flex items-center gap-2 ${product.in_stock ? "text-green-600" : "text-red-600"}`}>
          <div className={`w-3 h-3 rounded-full ${product.in_stock ? "bg-green-500" : "bg-red-500"} animate-pulse`} />
          <span className="font-medium">{product.in_stock ? "En stock - Livraison rapide" : "Rupture de stock"}</span>
        </div>

        {/* Short Description */}
        <p className="text-muted-foreground leading-relaxed">{product.short_description}</p>

        {/* Quantity & Actions */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          {/* Quantity */}
          <div className="flex items-center border border-border rounded-xl">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-3 hover:bg-muted transition-colors rounded-l-xl"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="w-12 text-center font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-3 hover:bg-muted transition-colors rounded-r-xl"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Order Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
            <Button 
              size="lg" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14"
              onClick={() => setIsOrderModalOpen(true)}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Commander maintenant
            </Button>
          </motion.div>

          {/* Secondary Actions */}
          <button className="p-4 border border-border rounded-xl hover:bg-muted transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-4 border border-border rounded-xl hover:bg-muted transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Call CTA */}
        <div className="flex items-center gap-4 p-4 bg-muted rounded-2xl">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Phone className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Besoin de conseils?</p>
            <a href="tel:+221781094091" className="font-bold text-foreground hover:text-primary transition-colors">
              +221 781094091
            </a>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
            <Truck className="w-6 h-6 text-primary" />
            <div>
              <p className="font-semibold text-sm">Livraison gratuite</p>
              <p className="text-xs text-muted-foreground">Sur Dakar</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
            <Shield className="w-6 h-6 text-primary" />
            <div>
              <p className="font-semibold text-sm">Garantie 2 ans</p>
              <p className="text-xs text-muted-foreground">Pieces et main d'oeuvre</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

function ProductDetails({ product }: { product: Product }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "features">("description")

  return (
    <section ref={ref} className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {[
            { id: "description", label: "Description" },
            { id: "specs", label: "Specifications" },
            { id: "features", label: "Caracteristiques" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-foreground hover:bg-muted border border-border"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-background rounded-3xl p-8 shadow-lg"
          >
            {activeTab === "description" && (
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(product.specifications || {}).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-xl"
                  >
                    <span className="text-muted-foreground">{key}</span>
                    <span className="font-semibold text-foreground">{value}</span>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "features" && (
              <div className="grid md:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function RelatedProducts({ currentProduct }: { currentProduct: Product }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

  useEffect(() => {
    async function loadRelated() {
      const allProducts = await getProducts()
      const related = allProducts
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4)
      setRelatedProducts(related)
    }
    loadRelated()
  }, [currentProduct.category, currentProduct.id])

  if (relatedProducts.length === 0) return null

  return (
    <section ref={ref} className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Produits similaires</h2>
          <Link 
            href={`/produits?category=${currentProduct.category}`}
            className="text-primary font-medium hover:underline flex items-center gap-1"
          >
            Voir tout
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/produits/${product.slug}`} className="group block">
                <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-primary font-bold mt-1">
                  {product.category === "piece" ? <span className="text-sm text-muted-foreground font-normal">Contactez-nous</span> : formatPrice(product.price)}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductDetailContent({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFoundState, setNotFoundState] = useState(false)

  useEffect(() => {
    async function loadProduct() {
      const data = await getProductBySlug(slug)
      if (!data) {
        setNotFoundState(true)
      } else {
        setProduct(data)
      }
      setLoading(false)
    }
    loadProduct()
  }, [slug])

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
        <Footer />
      </main>
    )
  }

  if (notFoundState || !product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Product Section */}
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link 
              href="/produits"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Retour aux produits
            </Link>
          </motion.div>

          {/* Product Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <ProductGallery product={product} />
            <ProductInfo product={product} />
          </div>
        </div>
      </section>

      <ProductDetails product={product} />
      <RelatedProducts currentProduct={product} />
      
      <Footer />
    </main>
  )
}

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = params instanceof Promise ? use(params) : params
  return <ProductDetailContent slug={resolvedParams.slug} />
}
