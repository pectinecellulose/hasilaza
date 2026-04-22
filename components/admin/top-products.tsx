"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { createClient } from "@/lib/supabase/client"

interface TopProduct {
  name: string
  sales: number
  percentage: number
}

export function TopProducts() {
  const [topProducts, setTopProducts] = useState<TopProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTopProducts() {
      const supabase = createClient()
      
      // Get order counts by product
      const { data: orders } = await supabase
        .from("orders")
        .select("product_name, quantity")
        .in("status", ["confirmed", "processing", "shipped", "delivered"])

      if (!orders || orders.length === 0) {
        setTopProducts([])
        setLoading(false)
        return
      }

      // Aggregate by product name
      const productSales: Record<string, number> = {}
      orders.forEach(order => {
        productSales[order.product_name] = (productSales[order.product_name] || 0) + order.quantity
      })

      // Sort and get top 5
      const sorted = Object.entries(productSales)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
      
      const maxSales = sorted[0]?.[1] || 1
      
      const topList = sorted.map(([name, sales]) => ({
        name,
        sales,
        percentage: Math.round((sales / maxSales) * 100),
      }))

      setTopProducts(topList)
      setLoading(false)
    }

    loadTopProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (topProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
        <p>Aucune vente enregistree</p>
        <p className="text-sm">Le classement apparaitra ici</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {topProducts.map((product, index) => (
        <div key={product.name} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                {index + 1}
              </span>
              <span className="font-medium">{product.name}</span>
            </div>
            <span className="text-muted-foreground">{product.sales} ventes</span>
          </div>
          <Progress value={product.percentage} className="h-2" />
        </div>
      ))}
    </div>
  )
}
