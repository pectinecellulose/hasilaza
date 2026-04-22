"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Eye, Target, Flag, Heart, Sparkles, Zap, Shield, Handshake } from "lucide-react"

const advantages = [
  {
    icon: Eye,
    title: "Notre Vision",
    description: "Devenir le leader incontournable de la mobilité durable au Sénégal et en Afrique de l'Ouest, en offrant des solutions de transport accessibles et de qualité à tous.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Target,
    title: "Notre Mission",
    description: "Fournir des tricycles, motos et pièces détachées de haute qualité à des prix compétitifs, tout en garantissant un service client exceptionnel et un accompagnement personnalisé.",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Flag,
    title: "Nos Objectifs",
    description: "Élargir notre réseau de distribution, former nos partenaires, innover dans nos solutions de mobilité et contribuer au développement économique local.",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Heart,
    title: "Nos Valeurs",
    description: "Intégrité, qualité, proximité et engagement. Ces valeurs guident chacune de nos actions et nos relations avec nos clients et partenaires.",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
  },
]

const values = [
  { icon: Sparkles, label: "Qualité", desc: "Produits testés et certifiés" },
  { icon: Handshake, label: "Proximité", desc: "Service personnalisé" },
  { icon: Shield, label: "Intégrité", desc: "Transparence totale" },
  { icon: Zap, label: "Engagement", desc: "Satisfaction garantie" },
]

export function AdvantagesSection() {
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
            <span className="text-sm font-semibold text-primary">Nos Avantages</span>
          </motion.div>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6">
            <span className="text-balance">Pourquoi choisir </span>
            <span className="text-primary">Hasilaza Motor</span>?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Nous nous engageons à offrir les meilleurs produits et services pour répondre à vos besoins de mobilité
          </p>
        </motion.div>

        {/* Advantages Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-20">
          {advantages.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-background border border-border rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${item.color} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity`} />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center mb-6 relative z-10`}
                >
                  <Icon className="w-8 h-8 text-foreground" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-4 relative z-10">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed relative z-10">{item.description}</p>

                {/* Hover Line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} origin-left`}
                />
              </motion.div>
            )
          })}
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-foreground rounded-3xl p-8 lg:p-12"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl lg:text-3xl font-bold text-background mb-4">
              Nos 4 Piliers Fondamentaux
            </h3>
            <p className="text-background/70 max-w-2xl mx-auto">
              Ces valeurs sont au coeur de tout ce que nous faisons
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="bg-background/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center border border-background/10 hover:bg-background/20 transition-all cursor-default overflow-hidden min-w-0"
                >
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-primary rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-4">
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary-foreground" />
                  </div>
                  <h4 className="font-bold text-background text-xs sm:text-base mb-1 break-words">{value.label}</h4>
                  <p className="text-[10px] sm:text-sm text-background/60 line-clamp-2">{value.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
