"use client"

import React from "react"
import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Wrench,
  Phone,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  Send,
  MessageCircle,
  Truck,
  Shield,
  Settings,
  ArrowRight,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const services = [
  {
    icon: Wrench,
    title: "Reparation moteur",
    description: "Diagnostic et reparation de tous types de moteurs 200cc, 250cc et 300cc.",
  },
  {
    icon: Settings,
    title: "Entretien regulier",
    description: "Vidange, reglages, verification des freins et mise au point complete.",
  },
  {
    icon: Truck,
    title: "Depannage sur site",
    description: "Intervention rapide sur le lieu de la panne dans la region de Dakar.",
  },
  {
    icon: Shield,
    title: "Diagnostic complet",
    description: "Analyse approfondie de votre vehicule pour identifier tous les problemes.",
  },
]

const vehicleTypes = [
  "Tricycle 200CC AIR",
  "Tricycle 250CC",
  "Tricycle 300CC",
  "Tricycle 300CC (5 roues)",
  "Moto 150CC",
  "Autre",
]

const problemTypes = [
  "Panne moteur",
  "Probleme de freinage",
  "Probleme electrique",
  "Probleme de transmission",
  "Pneu / Roue",
  "Carrosserie / Benne",
  "Entretien regulier",
  "Diagnostic complet",
  "Autre",
]

function HeroSection() {
  return (
    <section className="pt-32 pb-20 bg-muted/30 relative overflow-hidden">
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
            <Wrench className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Service Depannage</span>
          </motion.div>

          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6">
            <span className="text-balance">Depannage et </span>
            <span className="text-primary">reparation</span>
          </h1>

          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Notre equipe de techniciens qualifies intervient rapidement pour reparer
            et entretenir vos tricycles et motos. Demandez une intervention en quelques clics.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-16 bg-background -mt-10 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background p-6 rounded-2xl shadow-lg border border-border hover:border-primary/30 hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function RepairFormSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    vehicleType: "",
    problemType: "",
    urgency: "normal",
    location: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const urgencyLabel =
      formData.urgency === "urgent"
        ? "URGENT"
        : formData.urgency === "tres-urgent"
          ? "TRES URGENT"
          : "Normal"

    const message = `*DEMANDE DE DEPANNAGE*

*Client:* ${formData.name}
*Telephone:* ${formData.phone}
*Vehicule:* ${formData.vehicleType}
*Probleme:* ${formData.problemType}
*Urgence:* ${urgencyLabel}
*Localisation:* ${formData.location}

*Description:*
${formData.description}

---
Demande envoyee depuis le site web Hasilaza Motor`

    const whatsappUrl = `https://wa.me/221781094091?text=${encodeURIComponent(message)}`

    // Small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 800))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Open WhatsApp
    window.open(whatsappUrl, "_blank")

    // Reset after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        phone: "",
        vehicleType: "",
        problemType: "",
        urgency: "normal",
        location: "",
        description: "",
      })
    }, 5000)
  }

  return (
    <section ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Demander une intervention
            </h2>
            <p className="text-muted-foreground mb-8">
              Decrivez votre probleme et nous vous contacterons rapidement pour organiser le depannage.
            </p>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">
                  Demande envoyee!
                </h3>
                <p className="text-green-600 dark:text-green-400">
                  Votre demande de depannage a ete transmise via WhatsApp. Notre equipe vous contactera tres rapidement.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nom complet *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Votre nom"
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Telephone *
                    </label>
                    <Input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+221 7X XXX XX XX"
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Type de vehicule *
                    </label>
                    <select
                      required
                      value={formData.vehicleType}
                      onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                      className="w-full h-12 px-4 bg-background border border-input rounded-xl text-foreground"
                    >
                      <option value="">Selectionnez un vehicule</option>
                      {vehicleTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Type de probleme *
                    </label>
                    <select
                      required
                      value={formData.problemType}
                      onChange={(e) => setFormData({ ...formData, problemType: e.target.value })}
                      className="w-full h-12 px-4 bg-background border border-input rounded-xl text-foreground"
                    >
                      <option value="">Selectionnez un probleme</option>
                      {problemTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Niveau d{"'"}urgence
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "normal", label: "Normal", color: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800" },
                      { value: "urgent", label: "Urgent", color: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-800" },
                      { value: "tres-urgent", label: "Tres urgent", color: "bg-red-100 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, urgency: option.value })}
                        className={`py-3 px-4 rounded-xl border-2 font-medium text-sm transition-all ${
                          formData.urgency === option.value
                            ? option.color
                            : "bg-background border-border text-muted-foreground hover:border-primary/30"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Localisation *
                  </label>
                  <Input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Ex: HLM Grand Yoff, Dakar"
                    className="h-12 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description du probleme *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Decrivez le probleme rencontre avec votre vehicule..."
                    rows={4}
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl text-foreground resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Envoi en cours...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Envoyer la demande via WhatsApp
                    </span>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Right Side - Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Urgency WhatsApp Card */}
            <div className="bg-primary rounded-3xl p-8 text-primary-foreground">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Panne urgente?</h3>
                  <p className="text-primary-foreground/80">
                    Appelez-nous directement ou envoyez un message WhatsApp pour une intervention
                    en urgence. Notre equipe est disponible du lundi au samedi.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="tel:+221781094091"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-white text-primary rounded-xl font-bold hover:bg-white/90 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Appeler maintenant
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://wa.me/221781094091?text=Bonjour, j'ai besoin d'un depannage urgent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Urgence
                </motion.a>
              </div>
            </div>

            {/* Info Cards */}
            <div className="bg-background rounded-3xl border border-border p-8">
              <h3 className="font-bold text-lg text-foreground mb-6">Informations pratiques</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Horaires d{"'"}intervention</h4>
                    <p className="text-sm text-muted-foreground">Lundi - Samedi: 8h - 18h</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Zone d{"'"}intervention</h4>
                    <p className="text-sm text-muted-foreground">Dakar et ses environs</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Garantie</h4>
                    <p className="text-sm text-muted-foreground">
                      Toutes nos reparations sont garanties. Pieces d{"'"}origine Hasilaza utilisees.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Wrench className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Atelier equipe</h4>
                    <p className="text-sm text-muted-foreground">
                      Venez directement a notre atelier HLM 2, Dakar pour un diagnostic sur place.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <a
                  href="https://maps.google.com/?q=HLM+2+Dakar+Senegal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  <MapPin className="w-4 h-4" />
                  Voir notre atelier sur Google Maps
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default function DepannagePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ServicesSection />
      <RepairFormSection />
      <Footer />
    </main>
  )
}
