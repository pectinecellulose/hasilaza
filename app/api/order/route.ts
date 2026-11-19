import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const OWNER_EMAILS = ["Mortalla581@gmail.com", "jobken080@gmail.com"]
const OWNER_PHONE = "221781094091"
const ADMIN_WHATSAPP_NUMBERS = ["221781094091"] // Admin WhatsApp numbers for notifications

interface OrderRequest {
  product: {
    id: string
    name: string
    price: number
    quantity: number
  }
  customer: {
    fullName: string
    phone: string
    email: string
    address: string
    city: string
    message: string
  }
  totalPrice: number
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-SN", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price) + " FCFA"
}

export async function POST(request: Request) {
  try {
    const body: OrderRequest = await request.json()
    const { product, customer, totalPrice } = body

    // Validate required fields
    if (!customer.fullName || !customer.phone || !customer.address || !customer.city) {
      return NextResponse.json(
        { error: "Veuillez remplir tous les champs obligatoires" },
        { status: 400 }
      )
    }

    // Generate order ID
    const orderId = `HM-${Date.now().toString(36).toUpperCase()}`
    const orderDate = new Date().toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })

    // Prepare WhatsApp message for owner
    const whatsappMessage = `🛒 *NOUVELLE COMMANDE #${orderId}*

📅 Date: ${orderDate}

📦 *PRODUIT:*
- Nom: ${product.name}
- Quantite: ${product.quantity}
- Prix unitaire: ${formatPrice(product.price)}
- *TOTAL: ${formatPrice(totalPrice)}*

👤 *CLIENT:*
- Nom: ${customer.fullName}
- Tel: ${customer.phone}
- Email: ${customer.email || "Non fourni"}
- Adresse: ${customer.address}, ${customer.city}

${customer.message ? `💬 *MESSAGE:*\n${customer.message}` : ""}

---
Contactez le client rapidement pour confirmer la commande.`

    // Send WhatsApp notification to owner via WhatsApp API
    // Note: In production, you would use WhatsApp Business API
    // For now, we'll create a click-to-send link that can be triggered
    const whatsappUrl = `https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(whatsappMessage)}`

    // Prepare email content (HTML)
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #E53935; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
    .order-id { font-size: 24px; font-weight: bold; }
    .section { background: white; padding: 15px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #E53935; }
    .section h3 { margin-top: 0; color: #E53935; }
    .total { font-size: 20px; font-weight: bold; color: #E53935; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    table { width: 100%; border-collapse: collapse; }
    td { padding: 8px 0; }
    .label { color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Hasilaza Motor</h1>
      <p>Nouvelle commande recue!</p>
      <div class="order-id">#${orderId}</div>
    </div>
    <div class="content">
      <p><strong>Date:</strong> ${orderDate}</p>
      
      <div class="section">
        <h3>📦 Produit commande</h3>
        <table>
          <tr>
            <td class="label">Produit:</td>
            <td><strong>${product.name}</strong></td>
          </tr>
          <tr>
            <td class="label">Quantite:</td>
            <td>${product.quantity}</td>
          </tr>
          <tr>
            <td class="label">Prix unitaire:</td>
            <td>${formatPrice(product.price)}</td>
          </tr>
          <tr>
            <td class="label">Total:</td>
            <td class="total">${formatPrice(totalPrice)}</td>
          </tr>
        </table>
      </div>
      
      <div class="section">
        <h3>👤 Informations client</h3>
        <table>
          <tr>
            <td class="label">Nom:</td>
            <td><strong>${customer.fullName}</strong></td>
          </tr>
          <tr>
            <td class="label">Telephone:</td>
            <td><a href="tel:${customer.phone}">${customer.phone}</a></td>
          </tr>
          <tr>
            <td class="label">Email:</td>
            <td>${customer.email || "Non fourni"}</td>
          </tr>
          <tr>
            <td class="label">Adresse:</td>
            <td>${customer.address}, ${customer.city}</td>
          </tr>
        </table>
      </div>
      
      ${customer.message ? `
      <div class="section">
        <h3>💬 Message du client</h3>
        <p>${customer.message}</p>
      </div>
      ` : ""}
      
      <div style="text-align: center; margin-top: 20px;">
        <a href="https://wa.me/${customer.phone.replace(/[^0-9]/g, '')}" 
           style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
          📱 Contacter sur WhatsApp
        </a>
      </div>
    </div>
    <div class="footer">
      <p>Hasilaza Motor - Votre partenaire de confiance</p>
      <p>HLM 2 Dakar, Senegal</p>
      <p>+221 781094091 | Mortalla581@gmail.com</p>
    </div>
  </div>
</body>
</html>
`

    // Send email using Resend or another email service
    // Check if RESEND_API_KEY is configured
    const resendApiKey = process.env.RESEND_API_KEY

    if (resendApiKey) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: "Hasilaza Motor <commandes@hasilaza.store>",
            to: OWNER_EMAILS,
            subject: `Nouvelle Commande #${orderId} - ${product.name}`,
            html: emailHtml
          })
        })

        if (!emailResponse.ok) {
          console.error("Email send failed:", await emailResponse.text())
        }
      } catch (emailError) {
        console.error("Email error:", emailError)
        // Continue even if email fails
      }
    } else {
      console.log("RESEND_API_KEY not configured - email notification skipped")
      console.log("Order details:", { orderId, product, customer, totalPrice })
    }

    // Also send confirmation email to customer if they provided email
    if (customer.email && resendApiKey) {
      const customerEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #E53935; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
    .order-id { font-size: 24px; font-weight: bold; }
    .section { background: white; padding: 15px; margin: 15px 0; border-radius: 8px; }
    .total { font-size: 20px; font-weight: bold; color: #E53935; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Merci pour votre commande!</h1>
      <div class="order-id">#${orderId}</div>
    </div>
    <div class="content">
      <p>Bonjour ${customer.fullName},</p>
      <p>Nous avons bien recu votre commande et nous vous contacterons tres bientot pour confirmer les details et la livraison.</p>
      
      <div class="section">
        <h3>Recapitulatif</h3>
        <p><strong>Produit:</strong> ${product.name}</p>
        <p><strong>Quantite:</strong> ${product.quantity}</p>
        <p><strong>Total:</strong> <span class="total">${formatPrice(totalPrice)}</span></p>
      </div>
      
      <div class="section">
        <h3>Livraison</h3>
        <p>${customer.address}, ${customer.city}</p>
      </div>
      
      <p>Pour toute question, n'hesitez pas a nous contacter:</p>
      <ul>
        <li>WhatsApp: <a href="https://wa.me/221781094091">+221 781094091</a></li>
        <li>Email: Mortalla581@gmail.com</li>
      </ul>
    </div>
    <div class="footer">
      <p>Hasilaza Motor - HLM 2 Dakar, Senegal</p>
      <p>Votre partenaire de confiance pour les motos et tricycles au Senegal</p>
    </div>
  </div>
</body>
</html>
`

      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: "Hasilaza Motor <commandes@hasilaza.store>",
            to: [customer.email],
            subject: `Confirmation de votre commande #${orderId} - Hasilaza Motor`,
            html: customerEmailHtml
          })
        })
      } catch (customerEmailError) {
        console.error("Customer email error:", customerEmailError)
      }
    }

    // Save order to database
    const supabase = await createClient()
    const { data: savedOrder, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderId,
        customer_name: customer.fullName,
        customer_phone: customer.phone,
        customer_email: customer.email || null,
        customer_address: customer.address,
        customer_city: customer.city,
        product_name: product.name,
        product_slug: product.id,
        quantity: product.quantity,
        unit_price: product.price,
        total_price: totalPrice,
        status: "pending",
        notes: customer.message || null,
      })
      .select()
      .single()

    if (orderError) {
      console.error("Error saving order:", orderError)
    }

    // Send WhatsApp notification to admin via CallMeBot API or similar service
    // Note: You need to register your number at https://www.callmebot.com/blog/free-api-whatsapp-messages/
    const callMeBotApiKey = process.env.CALLMEBOT_API_KEY
    
    if (callMeBotApiKey) {
      for (const adminNumber of ADMIN_WHATSAPP_NUMBERS) {
        try {
          const whatsappApiUrl = `https://api.callmebot.com/whatsapp.php?phone=${adminNumber}&text=${encodeURIComponent(whatsappMessage)}&apikey=${callMeBotApiKey}`
          
          await fetch(whatsappApiUrl)
          console.log(`WhatsApp notification sent to ${adminNumber}`)
        } catch (whatsappError) {
          console.error(`WhatsApp notification error for ${adminNumber}:`, whatsappError)
        }
      }
    } else {
      console.log("CALLMEBOT_API_KEY not configured - WhatsApp notification skipped")
      console.log("WhatsApp URL for manual notification:", whatsappUrl)
    }

    // Return success with WhatsApp link for manual notification
    return NextResponse.json({
      success: true,
      orderId,
      message: "Commande enregistree avec succes",
      whatsappUrl,
      order: savedOrder
    })

  } catch (error) {
    console.error("Order error:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue lors du traitement de votre commande" },
      { status: 500 }
    )
  }
}
