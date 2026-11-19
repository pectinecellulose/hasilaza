import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search } from "lucide-react"

export default function ProductNotFound() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Produit introuvable
            </h1>
            
            <p className="text-muted-foreground mb-8">
              Le produit que vous recherchez n{"'"}existe pas ou n{"'"}est plus disponible. 
              Parcourez notre catalogue pour découvrir nos autres produits.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild variant="outline" className="bg-transparent">
                <Link href="/produits" className="flex items-center gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  Retour aux produits
                </Link>
              </Button>
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/">
                  Page d{"'"}accueil
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
