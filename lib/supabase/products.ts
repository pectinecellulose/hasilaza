import { createClient } from "@/lib/supabase/client"

export interface Product {
  id: string
  slug: string
  name: string
  category: "tricycle" | "moto" | "piece"
  subcategory?: string
  price: number
  old_price?: number
  description: string
  short_description: string
  specifications: Record<string, string>
  features: string[]
  images: string[]
  in_stock: boolean
  is_best_seller?: boolean
  is_new?: boolean
  rating: number
  reviews: number
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  order_number: string
  customer_name: string
  customer_phone: string
  customer_email?: string
  customer_address: string
  customer_city: string
  product_id?: string
  product_name: string
  product_slug: string
  quantity: number
  unit_price: number
  total_price: number
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  notes?: string
  created_at: string
  updated_at: string
}

// Product functions
export async function getProducts() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }
  return data as Product[]
}

export async function getProductBySlug(slug: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching product:", error)
    return null
  }
  return data as Product
}

export async function getProductsByCategory(category: string) {
  const supabase = createClient()
  
  if (category === "all") {
    return getProducts()
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching products by category:", error)
    return []
  }
  return data as Product[]
}

export async function getBestSellers() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_best_seller", true)
    .limit(6)

  if (error) {
    console.error("Error fetching best sellers:", error)
    return []
  }
  return data as Product[]
}

export async function getNewProducts() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_new", true)
    .limit(6)

  if (error) {
    console.error("Error fetching new products:", error)
    return []
  }
  return data as Product[]
}

export async function createProduct(product: Omit<Product, "id" | "created_at" | "updated_at">) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single()

  if (error) {
    console.error("Error creating product:", error)
    return null
  }
  return data as Product
}

export async function updateProduct(id: string, updates: Partial<Product>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating product:", error)
    return null
  }
  return data as Product
}

export async function deleteProduct(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting product:", error)
    return false
  }
  return true
}

// Order functions
export async function getOrders() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching orders:", error)
    return []
  }
  return data as Order[]
}

export async function getRecentOrders(limit = 5) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching recent orders:", error)
    return []
  }
  return data as Order[]
}

export async function getOrdersByStatus(status: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("status", status)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching orders by status:", error)
    return []
  }
  return data as Order[]
}

export async function createOrder(order: Omit<Order, "id" | "order_number" | "created_at" | "updated_at">) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("orders")
    .insert(order)
    .select()
    .single()

  if (error) {
    console.error("Error creating order:", error)
    return null
  }
  return data as Order
}

export async function updateOrderStatus(id: string, status: Order["status"]) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating order status:", error)
    return null
  }
  return data as Order
}

// Statistics functions
export async function getProductsCount() {
  const supabase = createClient()
  const { count, error } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })

  if (error) {
    console.error("Error fetching products count:", error)
    return 0
  }
  return count || 0
}

export async function getOrdersCount() {
  const supabase = createClient()
  const { count, error } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })

  if (error) {
    console.error("Error fetching orders count:", error)
    return 0
  }
  return count || 0
}

export async function getTotalRevenue() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("orders")
    .select("total_price")
    .in("status", ["confirmed", "processing", "shipped", "delivered"])

  if (error) {
    console.error("Error fetching total revenue:", error)
    return 0
  }
  return data.reduce((sum, order) => sum + order.total_price, 0)
}

export async function getOrdersStats() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("orders")
    .select("status")

  if (error) {
    console.error("Error fetching orders stats:", error)
    return {
      pending: 0,
      confirmed: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    }
  }

  const stats = {
    pending: 0,
    confirmed: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  }

  data.forEach((order) => {
    if (order.status in stats) {
      stats[order.status as keyof typeof stats]++
    }
  })

  return stats
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-SN", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price) + " FCFA"
}
