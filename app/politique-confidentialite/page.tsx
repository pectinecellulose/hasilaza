"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PolitiqueConfidentialitePage() {
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
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">Politique de Confidentialite</h1>

            <div className="prose prose-lg max-w-none space-y-8 text-muted-foreground">
              <p>
                Hasilaza Motor accorde une grande importance a la protection de vos donnees
                personnelles. La presente politique de confidentialite a pour objet de vous informer
                sur la maniere dont nous collectons, utilisons et protegeons vos informations.
              </p>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">1. Donnees collectees</h2>
                <p>Nous collectons les donnees suivantes lors de votre utilisation du site :</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong className="text-foreground">Donnees d{"'"}identification :</strong> nom, prenom, adresse email, numero de telephone</li>
                  <li><strong className="text-foreground">Donnees de commande :</strong> adresse de livraison, ville, produits commandes</li>
                  <li><strong className="text-foreground">Donnees de depannage :</strong> type de vehicule, description de la panne</li>
                  <li><strong className="text-foreground">Donnees de navigation :</strong> adresse IP, type de navigateur, pages consultees</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">2. Finalites du traitement</h2>
                <p>Vos donnees personnelles sont collectees pour les finalites suivantes :</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Traitement et suivi de vos commandes</li>
                  <li>Gestion des demandes de depannage</li>
                  <li>Communication relative a nos produits et services</li>
                  <li>Amelioration de nos services et de l{"'"}experience utilisateur</li>
                  <li>Reponse a vos demandes de contact</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">3. Destinataires des donnees</h2>
                <p>
                  Vos donnees personnelles sont destinees exclusivement a l{"'"}equipe de Hasilaza Motor.
                  Elles ne sont jamais vendues, echangees ou louees a des tiers.
                  Seuls les responsables de la gestion des commandes et du service client
                  ont acces a vos informations.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">4. Duree de conservation</h2>
                <p>
                  Vos donnees personnelles sont conservees pendant la duree necessaire
                  a la realisation des finalites pour lesquelles elles ont ete collectees :
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Donnees de commande : 5 ans apres la derniere commande</li>
                  <li>Donnees de contact : 3 ans apres le dernier contact</li>
                  <li>Donnees de navigation : 13 mois maximum</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">5. Securite des donnees</h2>
                <p>
                  Nous mettons en oeuvre toutes les mesures techniques et organisationnelles
                  necessaires pour assurer la securite et la confidentialite de vos donnees
                  personnelles, notamment contre tout acces, modification ou divulgation non autorisee.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">6. Vos droits</h2>
                <p>
                  Conformement a la legislation en vigueur, vous disposez des droits suivants
                  concernant vos donnees personnelles :
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong className="text-foreground">Droit d{"'"}acces :</strong> obtenir la confirmation du traitement de vos donnees</li>
                  <li><strong className="text-foreground">Droit de rectification :</strong> demander la correction de donnees inexactes</li>
                  <li><strong className="text-foreground">Droit de suppression :</strong> demander la suppression de vos donnees</li>
                  <li><strong className="text-foreground">Droit d{"'"}opposition :</strong> vous opposer au traitement de vos donnees</li>
                </ul>
                <p className="mt-3">
                  Pour exercer ces droits, contactez-nous a : Mortalla581@gmail.com
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">7. Cookies</h2>
                <p>
                  Le site hasilaza.store utilise des cookies techniques necessaires au bon
                  fonctionnement du site. Ces cookies ne collectent aucune donnee personnelle
                  a des fins publicitaires.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">8. Modification de la politique</h2>
                <p>
                  Hasilaza Motor se reserve le droit de modifier la presente politique de
                  confidentialite a tout moment. Toute modification sera publiee sur cette page.
                </p>
                <p className="mt-3">
                  <strong className="text-foreground">Derniere mise a jour :</strong> Fevrier 2026
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">9. Contact</h2>
                <p>
                  Pour toute question relative a la presente politique de confidentialite :
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Email : Mortalla581@gmail.com</li>
                  <li>Telephone : +221 781094091</li>
                  <li>Adresse : HLM 2, Dakar, Senegal</li>
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
