"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Phone, Mail, MapPin, User, ShoppingCart, Loader2, Users } from "lucide-react"
import { formatPrice } from "@/lib/supabase/products"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface Client {
  id: string
  name: string
  phone: string
  email: string | null
  city: string
  address: string
  ordersCount: number
  totalSpent: number
  lastOrderDate: string
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    loadClients()
  }, [])

  async function loadClients() {
    setLoading(true)
    try {
      const response = await fetch("/api/orders")
      if (response.ok) {
        const orders = await response.json()
        
        // Group orders by customer phone (unique identifier)
        const clientMap = new Map<string, Client>()
        
        for (const order of orders) {
          const key = order.customer_phone
          
          if (clientMap.has(key)) {
            const existing = clientMap.get(key)!
            existing.ordersCount += 1
            existing.totalSpent += order.total_price || 0
            if (new Date(order.created_at) > new Date(existing.lastOrderDate)) {
              existing.lastOrderDate = order.created_at
            }
          } else {
            clientMap.set(key, {
              id: key,
              name: order.customer_name,
              phone: order.customer_phone,
              email: order.customer_email,
              city: order.customer_city,
              address: order.customer_address,
              ordersCount: 1,
              totalSpent: order.total_price || 0,
              lastOrderDate: order.created_at,
            })
          }
        }
        
        setClients(Array.from(clientMap.values()).sort((a, b) => 
          new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime()
        ))
      } else {
        toast({
          title: "Erreur",
          description: "Impossible de charger les clients",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error loading clients:", error)
    }
    setLoading(false)
  }

  const filteredClients = clients.filter((client) => {
    return (
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery) ||
      (client.email && client.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      client.city.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const totalClients = clients.length
  const totalRevenue = clients.reduce((sum, c) => sum + c.totalSpent, 0)
  const totalOrders = clients.reduce((sum, c) => sum + c.ordersCount, 0)
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Clients</h1>
        <p className="text-muted-foreground">
          Liste des clients ayant passe des commandes
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total clients
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClients}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              CA total clients
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(totalRevenue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Panier moyen
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(Math.round(avgOrderValue))}</div>
          </CardContent>
        </Card>
      </div>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des clients</CardTitle>
          <CardDescription>
            {filteredClients.length} client(s) trouve(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, telephone ou ville..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {clients.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">Aucun client</h3>
              <p className="text-muted-foreground">
                Les clients apparaitront ici lorsqu'ils passeront des commandes
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead className="hidden md:table-cell">Contact</TableHead>
                    <TableHead>Ville</TableHead>
                    <TableHead className="hidden sm:table-cell">Commandes</TableHead>
                    <TableHead className="text-right">Total depense</TableHead>
                    <TableHead className="hidden lg:table-cell">Derniere commande</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <span className="text-sm font-medium text-primary">
                              {client.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">{client.name}</div>
                            <div className="text-xs text-muted-foreground md:hidden">
                              {client.phone}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3" />
                            {client.phone}
                          </div>
                          {client.email && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              {client.email}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {client.city}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="secondary">{client.ordersCount} commande{client.ordersCount > 1 ? 's' : ''}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatPrice(client.totalSpent)}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">
                        {formatDate(client.lastOrderDate)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="outline" size="sm" className="bg-transparent" asChild>
                            <a href={`https://wa.me/${client.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                              <Phone className="h-4 w-4" />
                            </a>
                          </Button>
                          {client.email && (
                            <Button variant="outline" size="sm" className="bg-transparent" asChild>
                              <a href={`mailto:${client.email}`}>
                                <Mail className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
