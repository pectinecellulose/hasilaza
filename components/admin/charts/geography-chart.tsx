"use client"

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts"

const data = [
  { name: "Dakar", orders: 89, revenue: 7250000, color: "hsl(var(--chart-1))" },
  { name: "Thies", orders: 24, revenue: 1980000, color: "hsl(var(--chart-2))" },
  { name: "Saint-Louis", orders: 18, revenue: 1450000, color: "hsl(var(--chart-3))" },
  { name: "Mbour", orders: 12, revenue: 890000, color: "hsl(var(--chart-4))" },
  { name: "Rufisque", orders: 8, revenue: 520000, color: "hsl(var(--chart-5))" },
  { name: "Autres", orders: 5, revenue: 360000, color: "hsl(var(--muted-foreground))" },
]

export function GeographyChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
        <XAxis
          type="number"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
        />
        <YAxis
          type="category"
          dataKey="name"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          width={80}
        />
        <Tooltip
          cursor={{ fill: "hsl(var(--muted))" }}
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
          formatter={(value: number, name: string) => {
            if (name === "revenue") {
              return [`${new Intl.NumberFormat("fr-FR").format(value)} FCFA`, "Revenus"]
            }
            return [value, "Commandes"]
          }}
        />
        <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
