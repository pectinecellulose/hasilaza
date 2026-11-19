import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error fetching product:", error)
      return NextResponse.json({ error: error.message }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const supabase = await createClient()

    // Build update object with only provided fields
    const updates: Record<string, unknown> = {}
    
    if (body.name !== undefined) updates.name = body.name
    if (body.slug !== undefined) updates.slug = body.slug
    if (body.category !== undefined) updates.category = body.category
    if (body.subcategory !== undefined) updates.subcategory = body.subcategory || null
    if (body.price !== undefined) updates.price = parseInt(body.price)
    if (body.old_price !== undefined) updates.old_price = body.old_price ? parseInt(body.old_price) : null
    if (body.description !== undefined) updates.description = body.description
    if (body.short_description !== undefined) updates.short_description = body.short_description
    if (body.specifications !== undefined) updates.specifications = body.specifications
    if (body.features !== undefined) updates.features = body.features
    if (body.images !== undefined) updates.images = body.images
    if (body.in_stock !== undefined) updates.in_stock = body.in_stock
    if (body.is_best_seller !== undefined) updates.is_best_seller = body.is_best_seller
    if (body.is_new !== undefined) updates.is_new = body.is_new
    if (body.rating !== undefined) updates.rating = body.rating
    if (body.reviews !== undefined) updates.reviews = body.reviews

    const { data, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating product:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Error deleting product:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
