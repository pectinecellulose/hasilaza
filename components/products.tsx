import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star } from "lucide-react"

const bestSellers = [
  {
    id: 1,
    name: "Tricycle Cargo 250cc",
    price: "2 500 000 FCFA",
    image: "/images/tricycle-250cc.jpg",
    rating: 5,
    badge: "Best-seller"
  },
  {
    id: 2,
    name: "Moto Sport 150cc",
    price: "850 000 FCFA",
    image: "/images/motorcycle-product.jpg",
    rating: 5,
    badge: "Populaire"
  },
  {
    id: 3,
    name: "Tricycle Transport 200cc",
    price: "2 200 000 FCFA",
    image: "/images/tricycle-200cc.jpg",
    rating: 4,
    badge: "Nouveau"
  },
]

const spareParts = [
  {
    id: 1,
    name: "Kit Chaîne Complet",
    price: "45 000 FCFA",
    image: "/images/spare-parts.jpg",
  },
  {
    id: 2,
    name: "Plaquettes de Frein",
    price: "15 000 FCFA",
    image: "/images/spare-parts.jpg",
  },
  {
    id: 3,
    name: "Filtre à Huile",
    price: "8 000 FCFA",
    image: "/images/spare-parts.jpg",
  },
]

export function Products() {
  return (
    <section id="produits" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Best Sellers */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nos Best-Sellers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos tricycles et motos les plus populaires, choisis par des centaines 
              d{"'"}entrepreneurs au Sénégal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestSellers.map((product) => (
              <Card key={product.id} className="group overflow-hidden border-border hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {product.badge}
                    </span>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < product.rating ? 'fill-primary text-primary' : 'text-muted'}`}
                      />
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">{product.price}</span>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Commander
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Spare Parts */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pièces Détachées
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Toutes les pièces détachées dont vous avez besoin pour l{"'"}entretien 
              et la réparation de vos véhicules.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {spareParts.map((part) => (
              <Card key={part.id} className="group overflow-hidden border-border hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={part.image || "/placeholder.svg"}
                    alt={part.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">{part.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">{part.price}</span>
                    <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent">
                      Voir détails
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
