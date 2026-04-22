import { Sparkles, Eye, Target, Flag, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Advantages() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">Nos avantages</span>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Plus qu{"'"}un simple vendeur, nous sommes votre partenaire de confiance 
            pour une mobilité durable et performante.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Vision */}
          <Card className="bg-card border-border hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl font-bold text-foreground">Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                D{"'"}ici 2035, Hasilaza Motor vise à devenir le leader dans la vente de motos 
                au Sénégal. À l{"'"}horizon 2035, nous aspirons à nous imposer comme la référence 
                incontournable sur le marché africain, en devenant le leader de la vente de 
                motos et de pièces détachées.
              </p>
            </CardContent>
          </Card>

          {/* Mission */}
          <Card className="bg-card border-border hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl font-bold text-foreground">Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Notre mission est de fournir à nos clients des motos performantes à des prix 
                abordables, accompagnées d{"'"}un service après-vente et d{"'"}un savoir-faire technique. 
                Nous offrons des solutions fiables et innovantes pour qu{"'"}ils puissent rouler en 
                toute sécurité et sérénité.
              </p>
            </CardContent>
          </Card>

          {/* Objectifs */}
          <Card className="bg-card border-border hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Flag className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl font-bold text-foreground">Objectifs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Proposer une gamme diversifiée de motos neuves et pièces détachées de qualité, 
                adaptée aux besoins de notre clientèle particulière et professionnelle ; 
                Assurer la fiabilité de nos produits ainsi qu{"'"}un accompagnement technique 
                d{"'"}excellence ; Maintenir un service client exceptionnel avec conseils adaptés, 
                assistance rapide et SAV efficace pour renforcer les relations clients et 
                développer notre communauté.
              </p>
            </CardContent>
          </Card>

          {/* Valeurs */}
          <Card className="bg-card border-border hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl font-bold text-foreground">Nos Valeurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {["Qualité", "Proximité", "Intégrité", "Engagement"].map((value) => (
                  <span 
                    key={value}
                    className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
