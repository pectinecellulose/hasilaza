"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

const partners = [
  { name: "ANCS", fullName: "Alliance Nationale Contre le Sida", logo: "/images/partners/ancs.png" },
  { name: "Enabel", fullName: "Agence Belge de Developpement", logo: "/images/partners/enabel.png" },
  { name: "Human Appeal", fullName: "Human Appeal International", logo: "/images/partners/human-appeal.png" },
  { name: "Qatar Charity", fullName: "Qatar Charity Organization", logo: "/images/partners/qatar-charity.png" },
  { name: "SOCODEVI", fullName: "Societe de Cooperation pour le Developpement International", logo: "/images/partners/socodevi.png" },
  { name: "Somaphy West Africa", fullName: "Somaphy West Africa SA", logo: "/images/partners/somaphy.png" },
]

export function PartnersSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
          >
            <span className="text-sm font-semibold text-primary">Nos Partenaires</span>
          </motion.div>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6">
            <span className="text-balance">Ils nous font </span>
            <span className="text-primary">confiance</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Nous collaborons avec des organisations de renom pour fournir des solutions de mobilité 
            adaptées aux besoins de développement local
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="group relative bg-muted/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20"
            >
              {/* Partner Logo */}
              <div className="w-full h-16 flex items-center justify-center mb-4">
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="max-h-14 w-auto object-contain"
                />
              </div>
              
              {/* Partner Name */}
              <h3 className="font-bold text-foreground text-sm">{partner.name}</h3>
              
              {/* Full Name on Hover */}
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                whileHover={{ opacity: 1, height: "auto" }}
                className="text-xs text-muted-foreground mt-2 line-clamp-2"
              >
                {partner.fullName}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            Vous souhaitez devenir partenaire?
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <a
              href="mailto:Mortalla581@gmail.com?subject=Demande de partenariat"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl font-semibold hover:bg-foreground/90 transition-colors"
            >
              Contactez-nous
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
