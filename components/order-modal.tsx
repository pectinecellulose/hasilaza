"use client"

import React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  X, 
  ShoppingCart, 
  MessageCircle, 
  Mail, 
  Phone, 
  User, 
  MapPin,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { type Product, formatPrice } from "@/lib/supabase/products"

interface OrderModalProps {
  product: Product
  quantity: number
  isOpen: boolean
  onClose: () => void
}

type OrderStatus = "idle" | "loading" | "success" | "error"

export function OrderModal({ product, quantity, isOpen, onClose }: OrderModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    message: ""
  })
  const [status, setStatus] = useState<OrderStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const totalPrice = product.price * quantity

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product: {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity
          },
          customer: formData,
          totalPrice
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue")
      }

      setStatus("success")
      
      // Reset form after 3 seconds and close
      setTimeout(() => {
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          address: "",
          city: "",
          message: ""
        })
        setStatus("idle")
        onClose()
      }, 3000)

    } catch (error) {
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Une erreur est survenue")
    }
  }

  const handleWhatsAppOrder = () => {
    const priceInfo = product.category === "piece" 
      ? `- Prix: A confirmer` 
      : `- Prix unitaire: ${formatPrice(product.price)}
- Total: ${formatPrice(totalPrice)}`
    const message = `Bonjour Hasilaza Motor,

Je souhaite commander:
- Produit: ${product.name}
- Quantite: ${quantity}
${priceInfo}

Mes informations:
- Nom: ${formData.fullName || "[A completer]"}
- Telephone: ${formData.phone || "[A completer]"}
- Email: ${formData.email || "[Non fourni]"}
- Adresse: ${formData.address || "[A completer]"}, ${formData.city || "[A completer]"}

${formData.message ? `Message: ${formData.message}` : ""}

Merci de me confirmer la disponibilite et les modalites de livraison.`

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/221781094091?text=${encodedMessage}`, "_blank")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[90vh] bg-background rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Commander ce produit</h2>
                  <p className="text-sm text-muted-foreground">Remplissez vos informations</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Commande envoyee!</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Votre commande a ete transmise. Vous recevrez une confirmation par email et WhatsApp tres bientot.
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Product Summary */}
                  <div className="bg-muted/50 rounded-2xl p-4 mb-6">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-muted rounded-xl overflow-hidden shrink-0">
                        <img 
                          src={product.images[0] || "/placeholder.svg"} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">Quantite: {quantity}</p>
                        {product.category !== "piece" && (
                          <>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm text-muted-foreground">Prix unitaire:</span>
                              <span className="font-medium">{formatPrice(product.price)}</span>
                            </div>
                            <div className="flex items-center justify-between border-t border-border mt-2 pt-2">
                              <span className="font-semibold">Total:</span>
                              <span className="text-lg font-bold text-primary">{formatPrice(totalPrice)}</span>
                            </div>
                          </>
                        )}
                        {product.category === "piece" && (
                          <div className="mt-2 pt-2 border-t border-border">
                            <span className="text-sm text-muted-foreground">Prix sur demande</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-800">Erreur</p>
                        <p className="text-sm text-red-600">{errorMessage}</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Order Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          Nom complet *
                        </Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Votre nom complet"
                          required
                          className="h-12 rounded-xl"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          Telephone *
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+221 XX XXX XX XX"
                          required
                          className="h-12 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        className="h-12 rounded-xl"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="address" className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          Adresse *
                        </Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Votre adresse"
                          required
                          className="h-12 rounded-xl"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city">Ville *</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Ex: Dakar"
                          required
                          className="h-12 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message (optionnel)</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Instructions speciales, questions..."
                        rows={3}
                        className="rounded-xl resize-none"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <Button
                        type="submit"
                        disabled={status === "loading"}
                        className="flex-1 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-base font-semibold"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <Mail className="w-5 h-5 mr-2" />
                            Commander par email
                          </>
                        )}
                      </Button>

                      <Button
                        type="button"
                        onClick={handleWhatsAppOrder}
                        variant="outline"
                        className="flex-1 h-14 border-2 border-green-500 text-green-600 hover:bg-green-50 rounded-xl text-base font-semibold bg-transparent"
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Commander via WhatsApp
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground text-center pt-2">
                      En commandant, vous acceptez nos conditions de vente. 
                      Le proprietaire recevra votre commande par email et WhatsApp.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
