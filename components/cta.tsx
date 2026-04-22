import { Button } from "@/components/ui/button"
import { MessageCircle, ShieldCheck, Truck } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 md:py-28 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
            Commandez dès maintenant
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 text-balance">
            Prêt à transformer<br />votre activité ?
          </h2>

          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Rejoignez plus de 500 entrepreneurs qui ont fait confiance à Hasilaza 
            pour développer leur business. Commandez votre tricycle aujourd{"'"}hui.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              asChild 
              size="lg" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <a href="#produits">
                Voir le catalogue
              </a>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              <a 
                href="https://wa.me/221781094091" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Discuter sur WhatsApp
              </a>
            </Button>
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-lg mx-auto">
            <div className="flex items-center gap-3 text-primary-foreground">
              <div className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center gap-3 text-primary-foreground">
              <div className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <span>Livraison partout au Sénégal</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
