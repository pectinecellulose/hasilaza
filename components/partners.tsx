import { Handshake } from "lucide-react"

const partners = [
  { name: "ANCS", initials: "AN" },
  { name: "ENABEL", initials: "EN" },
  { name: "HUMAN APPEAL", initials: "HA" },
  { name: "QATAR CHARITY", initials: "QC" },
  { name: "SOCODEVI", initials: "SO" },
  { name: "SOMAPHY", initials: "SM" },
]

export function Partners() {
  return (
    <section id="partenaires" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Handshake className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">Nos partenaires</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ils nous font confiance
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Rejoignez les entreprises et organisations qui nous font confiance
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((partner) => (
            <div 
              key={partner.name}
              className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">{partner.initials}</span>
              </div>
              <span className="text-sm font-medium text-foreground text-center">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
