"use client"

import { useEffect, useState } from "react"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"
import { createClient } from "@/lib/supabase/client"

interface MonthData {
  name: string
  total: number
}

export function SalesChart() {
  const [data, setData] = useState<MonthData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSalesData() {
      const supabase = createClient()
      
      // Get last 6 months
      const months = []
      const monthNames = ["Jan", "Fev", "Mar", "Avr", "Mai", "Jun", "Jul", "Aou", "Sep", "Oct", "Nov", "Dec"]
      
      for (let i = 5; i >= 0; i--) {
        const date = new Date()
        date.setMonth(date.getMonth() - i)
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59)
        
        const { data: orders } = await supabase
          .from("orders")
          .select("total_price")
          .gte("created_at", startOfMonth.toISOString())
          .lte("created_at", endOfMonth.toISOString())
          .in("status", ["confirmed", "processing", "shipped", "delivered"])
        
        const total = orders?.reduce((sum, order) => sum + order.total_price, 0) || 0
        months.push({
          name: monthNames[date.getMonth()],
          total,
        })
      }
      
      setData(months)
      setLoading(false)
    }
    
    loadSalesData()
  }, [])

  if (loading) {
    return (
      <div className="flex h-[350px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  const hasData = data.some(d => d.total > 0)

  if (!hasData) {
    return (
      <div className="flex h-[350px] flex-col items-center justify-center text-muted-foreground">
        <p>Aucune vente enregistree</p>
        <p className="text-sm">Les statistiques apparaitront ici</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
        />
        <Tooltip
          cursor={{ fill: "hsl(var(--muted))" }}
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
          formatter={(value: number) => [
            `${new Intl.NumberFormat("fr-FR").format(value)} FCFA`,
            "Ventes",
          ]}
        />
        <Bar
          dataKey="total"
          fill="hsl(var(--primary))"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
