import { Building2 } from "lucide-react"

export function About() {
  return (
    <section id="qui-sommes-nous" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">Notre histoire</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 text-balance">
            Qui Sommes-Nous ?
          </h2>

          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Hasilaza est une entreprise commerciale spécialisée dans l{"'"}usinage de tricycles 
              et la grande distribution.
            </p>
            <p>
              Excellant dans les prestations de service depuis quelques années, elle a attiré 
              de nombreuses structures désireuses d{"'"}acquérir ses produits. La société et ses 
              cadres dirigeants disposent d{"'"}une expérience solide et d{"'"}une grande compréhension 
              des affaires.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">+5</div>
              <div className="text-muted-foreground">Années d{"'"}expérience</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Satisfaction client</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">N°1</div>
              <div className="text-muted-foreground">En tricycles</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
