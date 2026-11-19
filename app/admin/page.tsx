import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { RecentOrders } from "@/components/admin/recent-orders"
import { SalesChart } from "@/components/admin/sales-chart"
import { TopProducts } from "@/components/admin/top-products"
import { createClient } from "@/lib/supabase/server"
import { formatPrice } from "@/lib/supabase/products"

async function getStats() {
  const supabase = await createClient()

  // Get products count
  const { count: productsCount } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })

  // Get orders
  const { data: orders } = await supabase
    .from("orders")
    .select("total_price, status, created_at")

  // Calculate revenue from non-cancelled orders
  const totalRevenue = orders
    ?.filter(o => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total_price, 0) || 0

  // Get unique customers
  const { data: customers } = await supabase
    .from("orders")
    .select("customer_phone")
  
  const uniqueCustomers = new Set(customers?.map(c => c.customer_phone)).size

  return {
    revenue: totalRevenue,
    ordersCount: orders?.length || 0,
    productsCount: productsCount || 0,
    customersCount: uniqueCustomers,
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const statsConfig = [
    {
      title: "Chiffre d'affaires",
      value: formatPrice(stats.revenue),
      change: stats.revenue > 0 ? "actif" : "0",
      trend: stats.revenue > 0 ? "up" : "neutral",
      icon: TrendingUp,
      description: "total",
    },
    {
      title: "Commandes",
      value: stats.ordersCount.toString(),
      change: stats.ordersCount > 0 ? "actif" : "0",
      trend: stats.ordersCount > 0 ? "up" : "neutral",
      icon: ShoppingCart,
      description: "total",
    },
    {
      title: "Produits",
      value: stats.productsCount.toString(),
      change: `${stats.productsCount}`,
      trend: stats.productsCount > 0 ? "up" : "neutral",
      icon: Package,
      description: "en catalogue",
    },
    {
      title: "Clients",
      value: stats.customersCount.toString(),
      change: stats.customersCount > 0 ? "actif" : "0",
      trend: stats.customersCount > 0 ? "up" : "neutral",
      icon: Users,
      description: "clients uniques",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Tableau de bord
        </h1>
        <p className="text-muted-foreground">
          Bienvenue sur votre espace d{"'"}administration Hasilaza
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsConfig.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs">
                {stat.trend === "up" && (
                  <ArrowUpRight className="h-3 w-3 text-green-600" />
                )}
                <span
                  className={
                    stat.trend === "up" ? "text-green-600" : "text-muted-foreground"
                  }
                >
                  {stat.change}
                </span>
                <span className="text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Ventes mensuelles</CardTitle>
            <CardDescription>
              Evolution du chiffre d'affaires sur les 6 derniers mois
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SalesChart />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Produits les plus vendus</CardTitle>
            <CardDescription>Top 5 des ventes ce mois</CardDescription>
          </CardHeader>
          <CardContent>
            <TopProducts />
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Commandes recentes</CardTitle>
          <CardDescription>
            Les 5 dernieres commandes recues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecentOrders />
        </CardContent>
      </Card>
    </div>
  )
}
