"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatPrice, getRecentOrders, type Order } from "@/lib/supabase/products"

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "En attente", variant: "secondary" },
  confirmed: { label: "Confirme", variant: "default" },
  processing: { label: "En cours", variant: "outline" },
  shipped: { label: "Expedie", variant: "default" },
  delivered: { label: "Livre", variant: "default" },
  cancelled: { label: "Annule", variant: "destructive" },
}

export function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadOrders() {
      const data = await getRecentOrders(5)
      setOrders(data)
      setLoading(false)
    }
    loadOrders()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-muted-foreground">
        Aucune commande pour le moment
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Commande</TableHead>
          <TableHead>Client</TableHead>
          <TableHead className="hidden md:table-cell">Produit</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">{order.order_number}</span>
                <span className="text-xs text-muted-foreground md:hidden">
                  {formatDate(order.created_at)}
                </span>
              </div>
            </TableCell>
            <TableCell>{order.customer_name}</TableCell>
            <TableCell className="hidden md:table-cell">{order.product_name}</TableCell>
            <TableCell>
              <Badge variant={statusMap[order.status]?.variant || "secondary"}>
                {statusMap[order.status]?.label || order.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right font-medium">
              {formatPrice(order.total_price)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
