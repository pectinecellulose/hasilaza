"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Eye, Phone, Mail, MapPin, Calendar, Package, MoreHorizontal, Loader2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { formatPrice } from "@/lib/supabase/products"

interface Order {
  id: string
  order_number: string
  customer_name: string
  customer_phone: string
  customer_email: string | null
  customer_address: string
  customer_city: string
  product_name: string
  product_slug: string
  quantity: number
  unit_price: number
  total_price: number
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  notes: string | null
  created_at: string
  updated_at: string
}
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; color: string }> = {
  pending: { label: "En attente", variant: "secondary", color: "bg-yellow-500" },
  confirmed: { label: "Confirme", variant: "default", color: "bg-blue-500" },
  processing: { label: "En cours", variant: "outline", color: "bg-orange-500" },
  shipped: { label: "Expedie", variant: "default", color: "bg-indigo-500" },
  delivered: { label: "Livre", variant: "default", color: "bg-green-500" },
  cancelled: { label: "Annule", variant: "destructive", color: "bg-red-500" },
}

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadOrders()
  }, [])

  async function loadOrders() {
    setLoading(true)
    try {
      const response = await fetch("/api/orders")
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      } else {
        toast({
          title: "Erreur",
          description: "Impossible de charger les commandes",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error loading orders:", error)
    }
    setLoading(false)
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_phone.includes(searchQuery)
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const statusCounts = {
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  }

  const handleStatusChange = async (orderId: string, newStatus: Order["status"]) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      
      if (response.ok) {
        toast({
          title: "Succes",
          description: `Statut mis a jour: ${statusMap[newStatus].label}`,
        })
        loadOrders()
      } else {
        toast({
          title: "Erreur",
          description: "Erreur lors de la mise a jour du statut",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating status:", error)
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise a jour du statut",
        variant: "destructive",
      })
    }
  }

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
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Commandes</h1>
        <p className="text-muted-foreground">
          Gerez et suivez toutes les commandes
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              En attente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.pending}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Confirmees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.confirmed}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              En cours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.processing}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-indigo-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Expediees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.shipped}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Livrees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.delivered}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Annulees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.cancelled}</div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des commandes</CardTitle>
          <CardDescription>
            {filteredOrders.length} commande(s) trouvee(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, ID ou telephone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="confirmed">Confirme</SelectItem>
                <SelectItem value="processing">En cours</SelectItem>
                <SelectItem value="shipped">Expedie</SelectItem>
                <SelectItem value="delivered">Livre</SelectItem>
                <SelectItem value="cancelled">Annule</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {orders.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              Aucune commande pour le moment
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Commande</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead className="hidden md:table-cell">Produit</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{order.order_number}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(order.created_at)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{order.customer_name}</span>
                          <span className="text-xs text-muted-foreground">
                            {order.customer_city}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-col">
                          <span>{order.product_name}</span>
                          <span className="text-xs text-muted-foreground">
                            Qte: {order.quantity}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusMap[order.status]?.variant || "secondary"}>
                          {statusMap[order.status]?.label || order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatPrice(order.total_price)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Voir details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Changer le statut</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, "confirmed")}>
                              Confirmer
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, "processing")}>
                              Marquer en cours
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, "shipped")}>
                              Marquer expedie
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, "delivered")}>
                              Marquer livre
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => handleStatusChange(order.id, "cancelled")}
                            >
                              Annuler
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Details de la commande</DialogTitle>
            <DialogDescription>
              {selectedOrder?.order_number}
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <Badge variant={statusMap[selectedOrder.status]?.variant || "secondary"} className="text-sm">
                  {statusMap[selectedOrder.status]?.label || selectedOrder.status}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {formatDate(selectedOrder.created_at)}
                </div>
              </div>

              <Separator />

              {/* Customer Info */}
              <div className="space-y-3">
                <h4 className="font-semibold">Informations client</h4>
                <div className="grid gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{selectedOrder.customer_name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <a href={`tel:${selectedOrder.customer_phone}`} className="hover:underline">
                      {selectedOrder.customer_phone}
                    </a>
                  </div>
                  {selectedOrder.customer_email && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <a href={`mailto:${selectedOrder.customer_email}`} className="hover:underline">
                        {selectedOrder.customer_email}
                      </a>
                    </div>
                  )}
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4" />
                    <span>{selectedOrder.customer_address}, {selectedOrder.customer_city}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Product Info */}
              <div className="space-y-3">
                <h4 className="font-semibold">Produit commande</h4>
                <div className="flex items-center gap-4 rounded-lg border p-3">
                  <Package className="h-10 w-10 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="font-medium">{selectedOrder.product_name}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatPrice(selectedOrder.unit_price)} x {selectedOrder.quantity}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">
                      {formatPrice(selectedOrder.total_price)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-semibold">Notes</h4>
                    <p className="text-sm text-muted-foreground">{selectedOrder.notes}</p>
                  </div>
                </>
              )}

              <Separator />

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="flex-1 bg-transparent" asChild>
                  <a href={`https://wa.me/${selectedOrder.customer_phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                    <Phone className="mr-2 h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" asChild>
                  <a href={`tel:${selectedOrder.customer_phone}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    Appeler
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
