import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Fetch orders
    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })

    if (ordersError) {
      console.error("Error fetching orders:", ordersError)
    }

    // Fetch products
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("*")

    if (productsError) {
      console.error("Error fetching products:", productsError)
    }

    const ordersList = orders || []
    const productsList = products || []

    // Calculate statistics
    const totalRevenue = ordersList
      .filter(o => o.status === 'completed' || o.status === 'delivered')
      .reduce((sum, o) => sum + (o.total_price || 0), 0)

    const totalOrders = ordersList.length
    const pendingOrders = ordersList.filter(o => o.status === 'pending').length
    const completedOrders = ordersList.filter(o => o.status === 'completed' || o.status === 'delivered').length
    const cancelledOrders = ordersList.filter(o => o.status === 'cancelled').length

    // Unique clients (by phone or email)
    const uniqueClients = new Set(ordersList.map(o => o.customer_phone || o.customer_email)).size

    // Orders by month (last 6 months)
    const now = new Date()
    const monthlyData = []
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthName = date.toLocaleDateString('fr-FR', { month: 'short' })
      const monthOrders = ordersList.filter(o => {
        const orderDate = new Date(o.created_at)
        return orderDate.getMonth() === date.getMonth() && 
               orderDate.getFullYear() === date.getFullYear()
      })
      const monthRevenue = monthOrders
        .filter(o => o.status === 'completed' || o.status === 'delivered')
        .reduce((sum, o) => sum + (o.total_price || 0), 0)
      
      monthlyData.push({
        month: monthName,
        orders: monthOrders.length,
        revenue: monthRevenue
      })
    }

    // Orders by category
    const categoryData = productsList.reduce((acc, product) => {
      const category = product.category || 'Autre'
      if (!acc[category]) acc[category] = 0
      // Count orders for this product
      const productOrders = ordersList.filter(o => o.product_slug === product.slug)
      acc[category] += productOrders.length
      return acc
    }, {} as Record<string, number>)

    // Top products
    const productOrderCounts = productsList.map(product => {
      const productOrders = ordersList.filter(o => o.product_slug === product.slug || o.product_name === product.name)
      const revenue = productOrders
        .filter(o => o.status === 'completed' || o.status === 'delivered')
        .reduce((sum, o) => sum + (o.total_price || 0), 0)
      return {
        name: product.name,
        orders: productOrders.length,
        revenue
      }
    }).sort((a, b) => b.orders - a.orders).slice(0, 5)

    // Recent orders
    const recentOrders = ordersList.slice(0, 10).map(order => ({
      id: order.id,
      orderNumber: order.order_number,
      customer: order.customer_name,
      product: order.product_name,
      total: order.total_price,
      status: order.status,
      date: order.created_at
    }))

    return NextResponse.json({
      summary: {
        totalRevenue,
        totalOrders,
        pendingOrders,
        completedOrders,
        cancelledOrders,
        uniqueClients,
        totalProducts: productsList.length
      },
      monthlyData,
      categoryData: Object.entries(categoryData).map(([name, value]) => ({ name, value })),
      topProducts: productOrderCounts,
      recentOrders
    })
  } catch (error) {
    console.error("Stats API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
