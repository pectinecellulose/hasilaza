"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Save, Globe, Mail, Phone, MapPin, Bell, Shield, Palette } from "lucide-react"

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1000)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Parametres</h1>
          <p className="text-muted-foreground">
            Configurez les parametres de votre site
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Apparence</TabsTrigger>
          <TabsTrigger value="security">Securite</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Informations generales
              </CardTitle>
              <CardDescription>
                Parametres de base de votre site web
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nom du site</Label>
                  <Input id="siteName" defaultValue="Hasilaza" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline">Slogan</Label>
                  <Input id="tagline" defaultValue="Votre partenaire de confiance" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description du site</Label>
                <Textarea
                  id="description"
                  rows={3}
                  defaultValue="Hasilaza est le leader de la vente de motos et tricycles au Senegal. Nous proposons des vehicules de qualite a des prix competitifs."
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Parametres SEO</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="metaTitle">Titre Meta</Label>
                    <Input id="metaTitle" defaultValue="Hasilaza - Motos et Tricycles au Senegal" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="metaKeywords">Mots-cles</Label>
                    <Input id="metaKeywords" defaultValue="moto, tricycle, Senegal, Dakar" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Description Meta</Label>
                  <Textarea
                    id="metaDescription"
                    rows={2}
                    defaultValue="Achetez vos motos et tricycles de qualite chez Hasilaza. Livraison partout au Senegal. Prix competitifs et service apres-vente."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Settings */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Informations de contact
              </CardTitle>
              <CardDescription>
                Coordonnees affichees sur le site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone1">Telephone principal</Label>
                  <Input id="phone1" defaultValue="+221 78 109 40 91" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone2">Telephone secondaire</Label>
                  <Input id="phone2" defaultValue="+221 77 123 45 67" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email1">Email principal</Label>
                  <Input id="email1" type="email" defaultValue="Mortalla581@gmail.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email2">Email secondaire</Label>
                  <Input id="email2" type="email" defaultValue="jobken080@gmail.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp">Numero WhatsApp</Label>
                <Input id="whatsapp" defaultValue="221781094091" />
                <p className="text-xs text-muted-foreground">
                  Format international sans le + (ex: 221781094091)
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Adresse
                </h4>
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse complete</Label>
                  <Textarea
                    id="address"
                    rows={2}
                    defaultValue="HLM 2, Dakar, Senegal"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville</Label>
                    <Input id="city" defaultValue="Dakar" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <Input id="region" defaultValue="Dakar" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Pays</Label>
                    <Input id="country" defaultValue="Senegal" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Horaires d'ouverture</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="weekdays">Lundi - Vendredi</Label>
                    <Input id="weekdays" defaultValue="08h00 - 18h00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="saturday">Samedi</Label>
                    <Input id="saturday" defaultValue="09h00 - 14h00" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>
                Configurez les notifications par email et WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Notifications par email</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Nouvelle commande</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir un email a chaque nouvelle commande
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Confirmation client</Label>
                      <p className="text-sm text-muted-foreground">
                        Envoyer un email de confirmation au client
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Stock bas</Label>
                      <p className="text-sm text-muted-foreground">
                        Alerte quand un produit est en rupture de stock
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Notifications WhatsApp</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Nouvelle commande WhatsApp</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir une notification WhatsApp a chaque commande
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Resume quotidien</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir un resume des ventes chaque soir
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Configuration email (Resend)</h4>
                <div className="space-y-2">
                  <Label htmlFor="resendKey">Cle API Resend</Label>
                  <Input id="resendKey" type="password" placeholder="re_xxxxxxxxxxxx" />
                  <p className="text-xs text-muted-foreground">
                    Obtenez votre cle sur resend.com
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">Email d'envoi</Label>
                  <Input id="fromEmail" defaultValue="onboarding@resend.dev" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Apparence
              </CardTitle>
              <CardDescription>
                Personnalisez l'apparence de votre site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Theme</h4>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mode sombre disponible</Label>
                    <p className="text-sm text-muted-foreground">
                      Permettre aux visiteurs de basculer en mode sombre
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Couleur principale</h4>
                <div className="flex flex-wrap gap-3">
                  {["#E53935", "#1976D2", "#388E3C", "#F57C00", "#7B1FA2"].map((color) => (
                    <button
                      key={color}
                      className="h-10 w-10 rounded-lg border-2 border-transparent transition-all hover:scale-110 focus:border-foreground"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Logo et images</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Logo principal</Label>
                    <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50">
                      <span className="text-sm text-muted-foreground">
                        Glissez une image ici
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Favicon</Label>
                    <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50">
                      <span className="text-sm text-muted-foreground">
                        Glissez une image ici
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Securite
              </CardTitle>
              <CardDescription>
                Parametres de securite et acces administrateur
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Administrateurs</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-sm font-medium text-primary">M</span>
                      </div>
                      <div>
                        <div className="font-medium">Mortalla</div>
                        <div className="text-sm text-muted-foreground">Mortalla581@gmail.com</div>
                      </div>
                    </div>
                    <Badge>Super Admin</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-sm font-medium text-primary">J</span>
                      </div>
                      <div>
                        <div className="font-medium">Jobken</div>
                        <div className="text-sm text-muted-foreground">jobken080@gmail.com</div>
                      </div>
                    </div>
                    <Badge variant="secondary">Admin</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Ajouter un administrateur
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Changer le mot de passe</h4>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
                <Button variant="outline">Mettre a jour le mot de passe</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Sessions actives</h4>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Deconnecter toutes les sessions</Label>
                    <p className="text-sm text-muted-foreground">
                      Deconnecte tous les appareils sauf celui-ci
                    </p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Deconnecter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
