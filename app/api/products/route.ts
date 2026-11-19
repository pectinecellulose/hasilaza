import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching products:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const supabase = await createClient()

    // Validate required fields
    if (!body.name || !body.slug || !body.price || !body.description || !body.short_description || !body.category) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      )
    }

    const productData = {
      name: body.name,
      slug: body.slug,
      category: body.category,
      subcategory: body.subcategory || null,
      price: parseInt(body.price),
      old_price: body.old_price ? parseInt(body.old_price) : null,
      description: body.description,
      short_description: body.short_description,
      specifications: body.specifications || {},
      features: body.features || [],
      images: body.images || ["/placeholder.jpg"],
      in_stock: body.in_stock ?? true,
      is_best_seller: body.is_best_seller ?? false,
      is_new: body.is_new ?? false,
      rating: body.rating ?? 0,
      reviews: body.reviews ?? 0,
    }

    const { data, error } = await supabase
      .from("products")
      .insert(productData)
      .select()
      .single()

    if (error) {
      console.error("Error creating product:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
