"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Phone, Mail, Clock, CreditCard, MapPin, Facebook, ArrowUp } from "lucide-react"
import { fadeInUp, staggerContainer } from "@/lib/animations"

const quickLinks = [
  { href: "/", label: "Accueil" },
  { href: "/produits", label: "Tous les produits" },
  { href: "/produits?category=tricycle", label: "Tricycles" },
  { href: "/produits?category=moto", label: "Motos" },
  { href: "/produits?category=piece", label: "Pièces détachées" },
]

const companyLinks = [
  { href: "/a-propos", label: "Qui sommes-nous" },
  { href: "/depannage", label: "Depannage & Reparation" },
  { href: "/contact", label: "Contactez-nous" },
  { href: "/a-propos#partenaires", label: "Nos partenaires" },
  { href: "/mentions-legales", label: "Mentions legales" },
  { href: "/politique-confidentialite", label: "Politique de confidentialite" },
]

const paymentMethods = [
  { name: "Wave", icon: "💳" },
  { name: "Orange Money", icon: "📱" },
  { name: "Virement bancaire", icon: "🏦" },
  { name: "Chèque", icon: "📄" },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      
      {/* CTA Section */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6 bg-primary/10 rounded-2xl p-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-2">Prêt à passer commande?</h3>
              <p className="text-background/70">Contactez-nous dès maintenant pour un devis personnalisé</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+221781094091"
                className="px-6 py-3 bg-background text-foreground rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-background/90 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Appelez-nous
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/221781094091?text=Bonjour, je souhaite passer commande"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* Logo & Description */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-background/10">
                <Image src="/images/logo-hasilaza.png" alt="Hasilaza" width={48} height={48} className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-bold text-xl block">Hasilaza</span>
                <span className="text-xs text-background/50">Depuis 2018</span>
              </div>
            </Link>
            <p className="text-background/70 mb-6 leading-relaxed">
              Entreprise commerciale spécialisée dans l{"'"}usinage de tricycles et la grande distribution. 
              Leader de la vente de motos et pièces détachées au Sénégal.
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/share/1KvPQqW7kd/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@hasilata1?_r=1&_t=ZS-93ivd7mScrY" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.3z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@HasilazaMotor/shorts" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h3 className="font-bold text-lg mb-6">Produits</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={fadeInUp}>
            <h3 className="font-bold text-lg mb-6">Entreprise</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Payment */}
          <motion.div variants={fadeInUp}>
            <h3 className="font-bold text-lg mb-6">Contact</h3>
            <ul className="space-y-4 mb-8">
              <li>
                <a 
                  href="tel:+221781094091" 
                  className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors"
                >
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="block text-sm text-background/50">Téléphone</span>
                    <span className="font-medium text-background">+221 781094091</span>
                  </div>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:Mortalla581@gmail.com" 
                  className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors"
                >
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="block text-sm text-background/50">Email</span>
                    <span className="font-medium text-background text-sm">Mortalla581@gmail.com</span>
                  </div>
                </a>
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="block text-sm text-background/50">Horaires</span>
                  <span className="font-medium text-background">Lun-Sam: 9h - 18h</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-background/70">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="block text-sm text-background/50">Adresse</span>
                  <span className="font-medium text-background">HLM 2, Dakar, Senegal</span>
                </div>
              </li>
            </ul>

            
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/50 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Hasilaza Motor. Tous droits réservés. 
              <span className="hidden md:inline"> | </span>
              <span className="block md:inline">Conçu avec passion au Sénégal</span>
            </p>
            <motion.button
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
            >
              <ArrowUp className="w-5 h-5 text-primary-foreground" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}
