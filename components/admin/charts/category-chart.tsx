"use client"

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"

const data = [
  { name: "Tricycles", value: 65, color: "hsl(var(--chart-1))" },
  { name: "Motos", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Pieces detachees", value: 10, color: "hsl(var(--chart-3))" },
]

export function CategoryChart() {
  return (
    <div className="flex flex-col items-center lg:flex-row lg:justify-around">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
            formatter={(value: number) => [`${value}%`, "Part"]}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="mt-4 space-y-3 lg:mt-0">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-3">
            <div
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <div>
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-muted-foreground">{item.value}% du CA</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
