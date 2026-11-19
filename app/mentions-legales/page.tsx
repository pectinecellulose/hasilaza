"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">Mentions Legales</h1>

            <div className="prose prose-lg max-w-none space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">1. Editeur du site</h2>
                <p>Le site hasilaza.store est edite par :</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong className="text-foreground">Raison sociale :</strong> Hasilaza Motor</li>
                  <li><strong className="text-foreground">Siege social :</strong> HLM 2, Dakar, Senegal</li>
                  <li><strong className="text-foreground">Telephone :</strong> +221 781094091</li>
                  <li><strong className="text-foreground">Email :</strong> Mortalla581@gmail.com</li>
                  <li><strong className="text-foreground">Activite :</strong> Vente de motos, tricycles et pieces detachees</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">2. Hebergement</h2>
                <p>Le site est heberge par :</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong className="text-foreground">Hebergeur :</strong> Vercel Inc.</li>
                  <li><strong className="text-foreground">Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, USA</li>
                  <li><strong className="text-foreground">Site web :</strong> vercel.com</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">3. Propriete intellectuelle</h2>
                <p>
                  L{"'"}ensemble du contenu du site hasilaza.store (textes, images, logos, photos, videos)
                  est la propriete exclusive de Hasilaza Motor, sauf mention contraire.
                  Toute reproduction, distribution, modification ou utilisation de ce contenu sans
                  autorisation prealable ecrite est strictement interdite.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">4. Responsabilite</h2>
                <p>
                  Hasilaza Motor s{"'"}efforce d{"'"}assurer l{"'"}exactitude et la mise a jour des informations
                  diffusees sur ce site. Toutefois, Hasilaza Motor ne peut garantir l{"'"}exactitude,
                  la precision ou l{"'"}exhaustivite des informations mises a disposition sur ce site.
                </p>
                <p>
                  Hasilaza Motor decline toute responsabilite pour toute imprecision, inexactitude
                  ou omission portant sur des informations disponibles sur le site.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">5. Liens hypertextes</h2>
                <p>
                  Le site hasilaza.store peut contenir des liens hypertextes vers d{"'"}autres sites internet.
                  Hasilaza Motor ne dispose d{"'"}aucun moyen de controle du contenu de ces sites tiers
                  et n{"'"}assume aucune responsabilite quant a leur contenu.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">6. Droit applicable</h2>
                <p>
                  Les presentes mentions legales sont soumises au droit senegalais.
                  En cas de litige, les tribunaux de Dakar seront seuls competents.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">7. Contact</h2>
                <p>
                  Pour toute question relative aux presentes mentions legales, vous pouvez nous contacter :
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Par email : Mortalla581@gmail.com</li>
                  <li>Par telephone : +221 781094091</li>
                  <li>Par courrier : HLM 2, Dakar, Senegal</li>
                </ul>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
