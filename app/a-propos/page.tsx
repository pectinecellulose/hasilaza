"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { 
  Eye, 
  Target, 
  Flag, 
  Heart, 
  Users, 
  Award, 
  TrendingUp, 
  Shield,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Handshake
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const timeline = [
  { year: "2018", title: "Création", description: "Fondation de Hasilaza Motor à Dakar avec une vision claire: démocratiser la mobilité au Sénégal." },
  { year: "2019", title: "Expansion", description: "Ouverture de notre premier showroom et développement de notre réseau de distribution." },
  { year: "2020", title: "Partenariats", description: "Signature de partenariats stratégiques avec des organisations internationales." },
  { year: "2021", title: "Innovation", description: "Lancement de notre service d'usinage de tricycles sur mesure." },
  { year: "2022", title: "Croissance", description: "Atteinte du cap des 5000 véhicules vendus et expansion nationale." },
  { year: "2023", title: "Excellence", description: "Certification qualité et reconnaissance comme leader du marché sénégalais." },
]

const values = [
  { icon: Sparkles, title: "Qualité", description: "Nous sélectionnons rigoureusement nos produits pour garantir fiabilité et durabilité." },
  { icon: Handshake, title: "Proximité", description: "Un service personnalisé et une relation de confiance avec chaque client." },
  { icon: Shield, title: "Intégrité", description: "Transparence totale dans nos pratiques commerciales et nos engagements." },
  { icon: Zap, title: "Engagement", description: "Nous nous investissons pleinement pour la satisfaction de nos clients." },
]

const stats = [
  { icon: Users, value: "5000+", label: "Clients satisfaits" },
  { icon: Award, value: "8+", label: "Partenaires officiels" },
  { icon: TrendingUp, value: "10000+", label: "Véhicules vendus" },
  { icon: Shield, value: "5+", label: "Années d'expérience" },
]

const partners = [
  { name: "ANCS", fullName: "Alliance Nationale Contre le Sida", logo: "/images/partners/ancs.png" },
  { name: "Enabel", fullName: "Agence Belge de Developpement", logo: "/images/partners/enabel.png" },
  { name: "Human Appeal", fullName: "Human Appeal International", logo: "/images/partners/human-appeal.png" },
  { name: "Qatar Charity", fullName: "Qatar Charity Organization", logo: "/images/partners/qatar-charity.png" },
  { name: "SOCODEVI", fullName: "Societe de Cooperation pour le Developpement International", logo: "/images/partners/socodevi.png" },
  { name: "Somaphy West Africa", fullName: "Somaphy West Africa SA", logo: "/images/partners/somaphy.png" },
]

function HeroSection() {
  return (
    <section className="pt-32 pb-20 bg-muted/30 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
          >
            <span className="text-sm font-semibold text-primary">Notre Histoire</span>
          </motion.div>
          
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6">
            <span className="text-balance">Qui sommes-nous chez </span>
            <span className="text-primary">Hasilaza Motor</span>?
          </h1>
          
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Depuis 2018, nous accompagnons les entrepreneurs, artisans et particuliers sénégalais 
            dans leurs projets de mobilité avec des véhicules de qualité à prix compétitifs.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function StorySection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/tricycle-200cc.jpg"
                alt="Hasilaza Motor - Notre histoire"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
            </div>
            
            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
              className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-xl"
            >
              <div className="text-4xl font-black">+5</div>
              <div className="text-sm font-medium opacity-90">Années d{"'"}expérience</div>
            </motion.div>

            {/* Decorative */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-primary/20 rounded-2xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Une entreprise née de la passion pour la mobilité
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Hasilaza Motor</strong> est une entreprise commerciale 
                spécialisée dans l{"'"}usinage de tricycles et la grande distribution. Notre aventure a 
                commencé en 2018 avec une vision simple mais ambitieuse: rendre la mobilité accessible 
                à tous les Sénégalais.
              </p>
              <p>
                Aujourd{"'"}hui, nous sommes fiers d{"'"}être reconnus comme le <strong className="text-foreground">leader du marché</strong> des 
                tricycles et motos au Sénégal, servant des milliers de clients satisfaits à travers le pays.
              </p>
              <p>
                Notre succès repose sur trois piliers fondamentaux: des <strong className="text-foreground">produits de qualité</strong>, 
                des <strong className="text-foreground">prix compétitifs</strong> et un <strong className="text-foreground">service client exceptionnel</strong>.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8"
            >
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/contact" className="flex items-center gap-2">
                  Contactez-nous
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Notre <span className="text-primary">Parcours</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Découvrez les étapes clés de notre croissance
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="bg-background p-6 rounded-2xl shadow-lg border border-border">
                    <span className="text-3xl font-bold text-primary">{item.year}</span>
                    <h3 className="font-bold text-foreground text-xl mt-2 mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>

                {/* Dot */}
                <div className="relative z-10 w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg shrink-0" />

                {/* Empty space for alignment */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ValuesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4">
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
            <span className="text-sm font-semibold text-primary">Nos Valeurs</span>
          </motion.div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Les piliers de notre <span className="text-primary">succès</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Ces valeurs guident chacune de nos actions et nos relations avec nos clients
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-muted/50 rounded-3xl p-8 text-center hover:shadow-xl transition-all border border-transparent hover:border-primary/20"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-xl text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Mission/Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {[
            { 
              icon: Eye, 
              title: "Notre Vision", 
              description: "Devenir le leader incontournable de la mobilité durable au Sénégal et en Afrique de l'Ouest, en offrant des solutions de transport accessibles et de qualité à tous.",
              color: "from-blue-500 to-cyan-500"
            },
            { 
              icon: Target, 
              title: "Notre Mission", 
              description: "Fournir des tricycles, motos et pièces détachées de haute qualité à des prix compétitifs, tout en garantissant un service client exceptionnel.",
              color: "from-purple-500 to-pink-500"
            },
          ].map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="relative bg-foreground text-background rounded-3xl p-8 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${item.color} opacity-10 rounded-full blur-3xl`} />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-2xl mb-4">{item.title}</h3>
                  <p className="text-background/70 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center text-primary-foreground"
              >
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-foreground/70">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function PartnersSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} id="partenaires" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
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
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Ils nous font <span className="text-primary">confiance</span>
          </h2>
          <p className="text-lg text-muted-foreground">
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
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-background rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg border border-border hover:border-primary/30 transition-all"
            >
              <div className="w-full h-16 flex items-center justify-center mb-4">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="max-h-14 w-auto object-contain"
                />
              </div>
              <h3 className="font-bold text-foreground text-sm">{partner.name}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{partner.fullName}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center bg-foreground rounded-3xl p-12 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-background mb-4">
              Prêt à travailler avec nous?
            </h2>
            <p className="text-background/70 mb-8 max-w-2xl mx-auto">
              Que vous soyez un particulier, une entreprise ou une organisation, 
              nous avons des solutions adaptées à vos besoins.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8">
                  <Link href="/produits" className="flex items-center gap-2">
                    Voir nos produits
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" variant="outline" className="border-2 border-background text-background hover:bg-background hover:text-foreground h-14 px-8 bg-transparent">
                  <Link href="/contact">
                    Contactez-nous
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <StorySection />
      <StatsSection />
      <TimelineSection />
      <ValuesSection />
      <PartnersSection />
      <CTASection />
      <Footer />
    </main>
  )
}
