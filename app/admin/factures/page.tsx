"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import {
  Plus,
  Trash2,
  Download,
  MessageCircle,
  Printer,
  Building2,
  User,
  Receipt,
  FileText,
  Search,
} from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { getProducts, type Product } from "@/lib/supabase/products"

interface InvoiceLine {
  id: string
  description: string
  quantity: number
  unitPrice: number
}

interface InvoiceData {
  invoiceNumber: string
  date: string
  dueDate: string
  clientName: string
  clientPhone: string
  clientEmail: string
  clientAddress: string
  clientCity: string
  lines: InvoiceLine[]
  discount: number
  advance: number
  notes: string
  conditions: string
}

const SHOP_INFO = {
  name: "Hasilaza Motor",
  address: "HLM 2, Dakar, Senegal",
  phone: "+221 78 109 40 91",
  email: "Mortalla581@gmail.com",
  logo: "/images/logo-hasilaza.png",
}

function generateInvoiceNumber() {
  const year = new Date().getFullYear()
  const rand = Math.floor(Math.random() * 9000) + 1000
  return `FAC-${year}-${rand}`
}

// Use a locale-independent formatter to avoid the "/" separator bug in fr-SN
function formatPriceFCFA(n: number) {
  // Format with spaces as thousand separator: 40 000 FCFA
  const formatted = Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0") // non-breaking space
  return `${formatted} FCFA`
}

function newLine(): InvoiceLine {
  return { id: crypto.randomUUID(), description: "", quantity: 1, unitPrice: 0 }
}

// --- Product suggestion dropdown ---
function ProductSuggestion({
  value,
  products,
  onChange,
  onSelect,
  placeholder,
}: {
  value: string
  products: Product[]
  onChange: (v: string) => void
  onSelect: (p: Product) => void
  placeholder: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const filtered = value.trim().length > 0
    ? products.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 6)
    : []

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div className="relative w-full" ref={ref}>
      <div className="relative">
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          className="pr-8"
        />
        <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      </div>
      {open && filtered.length > 0 && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-xl overflow-hidden">
          {filtered.map((p) => (
            <button
              key={p.id}
              type="button"
              className="w-full text-left px-3 py-2 text-sm hover:bg-accent flex items-center justify-between gap-2 border-b border-border last:border-0"
              onMouseDown={(e) => {
                e.preventDefault()
                onSelect(p)
                setOpen(false)
              }}
            >
              <span className="font-medium truncate">{p.name}</span>
              <span className="text-xs text-muted-foreground shrink-0">
                {p.category === "piece" ? "Sur demande" : formatPriceFCFA(p.price)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function FacturesPage() {
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [generating, setGenerating] = useState(false)

  const [invoice, setInvoice] = useState<InvoiceData>({
    invoiceNumber: generateInvoiceNumber(),
    date: new Date().toISOString().split("T")[0],
    dueDate: "",
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    clientAddress: "",
    clientCity: "",
    lines: [newLine()],
    discount: 0,
    advance: 0,
    notes: "",
    conditions: "Paiement a la livraison. Aucun retour accepte sans accord prealable.",
  })

  useEffect(() => {
    getProducts().then(setProducts)
  }, [])

  const subtotal = invoice.lines.reduce((s, l) => s + l.quantity * l.unitPrice, 0)
  const total = Math.max(0, subtotal - invoice.discount)
  const remaining = Math.max(0, total - invoice.advance)

  function updateLine(id: string, field: keyof InvoiceLine, value: string | number) {
    setInvoice((prev) => ({
      ...prev,
      lines: prev.lines.map((l) => (l.id === id ? { ...l, [field]: value } : l)),
    }))
  }

  function selectProductForLine(id: string, product: Product) {
    setInvoice((prev) => ({
      ...prev,
      lines: prev.lines.map((l) =>
        l.id === id
          ? { ...l, description: product.name, unitPrice: product.category === "piece" ? 0 : product.price }
          : l
      ),
    }))
  }

  function addLine() {
    setInvoice((prev) => ({ ...prev, lines: [...prev.lines, newLine()] }))
  }

  function removeLine(id: string) {
    setInvoice((prev) => ({
      ...prev,
      lines: prev.lines.length > 1 ? prev.lines.filter((l) => l.id !== id) : prev.lines,
    }))
  }

  const buildPDFDoc = useCallback(async () => {
    const { default: jsPDF } = await import("jspdf")
    const { default: autoTable } = await import("jspdf-autotable")

    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })
    const W = 210
    const margin = 14

    // ---- Header bar ----
    doc.setFillColor(15, 23, 42)
    doc.rect(0, 0, W, 45, "F")

    // Logo
    try {
      const canvas = await new Promise<HTMLCanvasElement>((resolve) => {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => {
          const c = document.createElement("canvas")
          c.width = img.width
          c.height = img.height
          const ctx = c.getContext("2d")
          if (ctx) ctx.drawImage(img, 0, 0)
          resolve(c)
        }
        img.src = SHOP_INFO.logo
      })
      const imgData = canvas.toDataURL("image/png")
      doc.addImage(imgData, "PNG", margin, 7, 15, 15)
    } catch (e) {
      // If logo fails, skip it
    }

    // Shop name
    doc.setFontSize(18)
    doc.setTextColor(255, 255, 255)
    doc.setFont("helvetica", "bold")
    doc.text(SHOP_INFO.name.toUpperCase(), margin + 18, 16)

    // Shop details
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(200, 210, 220)
    doc.text(SHOP_INFO.address, margin + 18, 23)
    doc.text(`Tel: ${SHOP_INFO.phone}`, margin + 18, 28)
    doc.text(`Email: ${SHOP_INFO.email}`, margin + 18, 33)

    // Invoice badge (right side)
    doc.setFillColor(220, 38, 38)
    doc.roundedRect(W - 62, 6, 50, 32, 3, 3, "F")
    doc.setFontSize(13)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(255, 255, 255)
    doc.text("FACTURE", W - 37, 17, { align: "center" })
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.text(invoice.invoiceNumber, W - 37, 23, { align: "center" })
    doc.text(`Date: ${new Date(invoice.date).toLocaleDateString("fr-FR")}`, W - 37, 28, { align: "center" })
    if (invoice.dueDate) {
      doc.text(`Echeance: ${new Date(invoice.dueDate).toLocaleDateString("fr-FR")}`, W - 37, 33, { align: "center" })
    }

    // ---- Client block ----
    const cy = 52
    doc.setFillColor(241, 245, 249)
    doc.roundedRect(margin, cy, 90, 36, 3, 3, "F")
    doc.setFontSize(7)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(100, 116, 139)
    doc.text("FACTURE A:", margin + 4, cy + 7)
    doc.setFontSize(11)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(15, 23, 42)
    doc.text(invoice.clientName || "—", margin + 4, cy + 15)
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(71, 85, 105)
    let cy2 = cy + 21
    if (invoice.clientPhone) { doc.text(`Tel: ${invoice.clientPhone}`, margin + 4, cy2); cy2 += 5 }
    if (invoice.clientEmail) { doc.text(`Email: ${invoice.clientEmail}`, margin + 4, cy2); cy2 += 5 }
    if (invoice.clientAddress) {
      const addr = `${invoice.clientAddress}${invoice.clientCity ? ", " + invoice.clientCity : ""}`
      doc.text(addr, margin + 4, cy2)
    }

    // ---- Products table ----
    const tableData = invoice.lines
      .filter((l) => l.description)
      .map((l, i) => [
        String(i + 1),
        l.description,
        String(l.quantity),
        formatPriceFCFA(l.unitPrice),
        formatPriceFCFA(l.quantity * l.unitPrice),
      ])

    autoTable(doc, {
      startY: cy + 44,
      head: [["N°", "DESIGNATION", "QTE", "PRIX UNIT.", "TOTAL"]],
      body: tableData.length > 0 ? tableData : [["", "Aucun article", "", "", ""]],
      theme: "grid",
      headStyles: {
        fillColor: [15, 23, 42],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 8,
        halign: "center",
        cellPadding: 3,
      },
      bodyStyles: {
        fontSize: 8,
        textColor: [30, 30, 30],
        cellPadding: 3,
      },
      columnStyles: {
        0: { cellWidth: 10, halign: "center" },
        1: { cellWidth: "auto", halign: "left" },
        2: { cellWidth: 14, halign: "center" },
        3: { cellWidth: 38, halign: "right" },
        4: { cellWidth: 38, halign: "right" },
      },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      margin: { left: margin, right: margin },
    })

    // ---- Totals block ----
    const finalY: number = (doc as any).lastAutoTable.finalY + 6
    const bx = W - margin - 76
    const bw = 76
    const rowH = 8

    const rows: { label: string; value: string; highlight: boolean }[] = [
      { label: "Sous-total", value: formatPriceFCFA(subtotal), highlight: false },
      ...(invoice.discount > 0
        ? [{ label: `Remise`, value: `- ${formatPriceFCFA(invoice.discount)}`, highlight: false }]
        : []),
      { label: "TOTAL", value: formatPriceFCFA(total), highlight: true },
      ...(invoice.advance > 0
        ? [{ label: "Avance recue", value: `- ${formatPriceFCFA(invoice.advance)}`, highlight: false }]
        : []),
      { label: "RESTANT A PAYER", value: formatPriceFCFA(remaining), highlight: remaining > 0 },
    ]

    let ry = finalY
    rows.forEach(({ label, value, highlight }) => {
      const h = highlight ? rowH + 1 : rowH
      if (highlight) {
        doc.setFillColor(15, 23, 42)
        doc.rect(bx, ry, bw, h, "F")
        doc.setTextColor(255, 255, 255)
        doc.setFont("helvetica", "bold")
        doc.setFontSize(9)
      } else {
        doc.setFillColor(248, 250, 252)
        doc.rect(bx, ry, bw, h, "F")
        doc.setTextColor(50, 50, 50)
        doc.setFont("helvetica", "normal")
        doc.setFontSize(8)
      }
      const textY = ry + h - 2.5
      doc.text(label, bx + 4, textY)
      doc.text(value, bx + bw - 4, textY, { align: "right" })
      ry += h
    })

    // ---- Notes & Conditions ----
    const notesY = ry + 8
    if (invoice.notes || invoice.conditions) {
      doc.setDrawColor(203, 213, 225)
      doc.setLineWidth(0.3)
      doc.line(margin, notesY, W - margin, notesY)
      let ny = notesY + 6
      if (invoice.notes) {
        doc.setFont("helvetica", "bold"); doc.setFontSize(8); doc.setTextColor(15, 23, 42)
        doc.text("Notes:", margin, ny); ny += 5
        doc.setFont("helvetica", "normal"); doc.setTextColor(80, 80, 80)
        const lines = doc.splitTextToSize(invoice.notes, W - margin * 2)
        doc.text(lines, margin, ny); ny += lines.length * 4 + 4
      }
      if (invoice.conditions) {
        doc.setFont("helvetica", "bold"); doc.setFontSize(8); doc.setTextColor(15, 23, 42)
        doc.text("Conditions:", margin, ny); ny += 5
        doc.setFont("helvetica", "normal"); doc.setTextColor(80, 80, 80)
        const lines = doc.splitTextToSize(invoice.conditions, W - margin * 2)
        doc.text(lines, margin, ny)
      }
    }

    // ---- Footer ----
    const pH = doc.internal.pageSize.getHeight()
    doc.setFillColor(15, 23, 42)
    doc.rect(0, pH - 14, W, 14, "F")
    doc.setFontSize(7)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(180, 190, 200)
    doc.text(
      `${SHOP_INFO.name}  |  ${SHOP_INFO.address}  |  ${SHOP_INFO.phone}  |  ${SHOP_INFO.email}`,
      W / 2,
      pH - 6,
      { align: "center" }
    )

    return doc
  }, [invoice, subtotal, total, remaining])

  async function handleDownloadPDF() {
    setGenerating(true)
    try {
      const doc = await buildPDFDoc()
      doc.save(`${invoice.invoiceNumber}.pdf`)
      toast({ title: "Facture telechargee", description: `${invoice.invoiceNumber}.pdf` })
    } catch (err) {
      console.error("[v0] PDF error:", err)
      toast({ title: "Erreur PDF", description: "Impossible de generer le PDF", variant: "destructive" })
    } finally {
      setGenerating(false)
    }
  }

  async function handleWhatsApp() {
    // 1. Generate + download PDF automatically
    setGenerating(true)
    try {
      const doc = await buildPDFDoc()
      doc.save(`${invoice.invoiceNumber}.pdf`)
    } catch (err) {
      console.error("[v0] PDF error:", err)
    } finally {
      setGenerating(false)
    }

    // 2. Open WhatsApp with a summary message
    const lines = invoice.lines.filter((l) => l.description)
    const itemsText = lines
      .map((l) => `  - ${l.description}: ${l.quantity} x ${formatPriceFCFA(l.unitPrice)} = ${formatPriceFCFA(l.quantity * l.unitPrice)}`)
      .join("\n")

    const msg = [
      `*FACTURE ${invoice.invoiceNumber}*`,
      `Date: ${new Date(invoice.date).toLocaleDateString("fr-FR")}`,
      "",
      `*Client:* ${invoice.clientName}`,
      invoice.clientPhone ? `Tel: ${invoice.clientPhone}` : "",
      invoice.clientAddress ? `Adresse: ${invoice.clientAddress}${invoice.clientCity ? ", " + invoice.clientCity : ""}` : "",
      "",
      "*Articles:*",
      itemsText,
      "",
      `Sous-total: ${formatPriceFCFA(subtotal)}`,
      invoice.discount > 0 ? `Remise: - ${formatPriceFCFA(invoice.discount)}` : "",
      `*TOTAL: ${formatPriceFCFA(total)}*`,
      invoice.advance > 0 ? `Avance recue: - ${formatPriceFCFA(invoice.advance)}` : "",
      `*Restant a payer: ${formatPriceFCFA(remaining)}*`,
      "",
      invoice.notes ? `Notes: ${invoice.notes}` : "",
      invoice.conditions ? `Conditions: ${invoice.conditions}` : "",
      "",
      `_${SHOP_INFO.name} | ${SHOP_INFO.phone}_`,
    ]
      .filter((l) => l !== "")
      .join("\n")

    const phone = invoice.clientPhone.replace(/[^0-9]/g, "")
    const url = `https://wa.me/${phone || "221781094091"}?text=${encodeURIComponent(msg)}`
    window.open(url, "_blank")

    toast({
      title: "PDF telecharge + WhatsApp ouvert",
      description: "Le PDF a ete telecharge. Joignez-le manuellement dans la conversation WhatsApp.",
    })
  }

  function handlePrint() {
    window.print()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl flex items-center gap-2">
            <Receipt className="h-7 w-7 text-primary" />
            Generer une facture
          </h1>
          <p className="text-muted-foreground">Creez et exportez des factures professionnelles</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handlePrint} className="gap-2">
            <Printer className="h-4 w-4" />
            Imprimer
          </Button>
          <Button variant="outline" onClick={handleWhatsApp} disabled={generating} className="gap-2">
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </Button>
          <Button onClick={handleDownloadPDF} disabled={generating} className="gap-2">
            <Download className="h-4 w-4" />
            {generating ? "Generation..." : "Telecharger PDF"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: form */}
        <div className="space-y-6 lg:col-span-2">
          {/* Invoice meta */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4" />
                Informations de la facture
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label>Numero de facture</Label>
                <Input
                  value={invoice.invoiceNumber}
                  onChange={(e) => setInvoice((p) => ({ ...p, invoiceNumber: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={invoice.date}
                  onChange={(e) => setInvoice((p) => ({ ...p, date: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label>{"Date d'echeance"}</Label>
                <Input
                  type="date"
                  value={invoice.dueDate}
                  onChange={(e) => setInvoice((p) => ({ ...p, dueDate: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Client info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="h-4 w-4" />
                Informations client
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Nom complet *</Label>
                <Input
                  placeholder="Prenom Nom"
                  value={invoice.clientName}
                  onChange={(e) => setInvoice((p) => ({ ...p, clientName: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Telephone *</Label>
                <Input
                  placeholder="+221 XX XXX XX XX"
                  value={invoice.clientPhone}
                  onChange={(e) => setInvoice((p) => ({ ...p, clientPhone: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="client@email.com"
                  value={invoice.clientEmail}
                  onChange={(e) => setInvoice((p) => ({ ...p, clientEmail: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Ville</Label>
                <Input
                  placeholder="Dakar"
                  value={invoice.clientCity}
                  onChange={(e) => setInvoice((p) => ({ ...p, clientCity: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label>Adresse</Label>
                <Input
                  placeholder="Rue, Quartier..."
                  value={invoice.clientAddress}
                  onChange={(e) => setInvoice((p) => ({ ...p, clientAddress: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Products */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Articles / Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Table header */}
              <div className="hidden sm:grid grid-cols-[1fr_72px_120px_44px_32px] gap-2 text-xs font-semibold uppercase text-muted-foreground">
                <span>Description</span>
                <span className="text-center">Qte</span>
                <span className="text-right">Prix unit. (FCFA)</span>
                <span className="text-right text-xs">Total</span>
                <span />
              </div>

              {invoice.lines.map((line, idx) => (
                <div key={line.id} className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_72px_120px_44px_32px] sm:items-center">
                  {/* Description with autocomplete */}
                  <ProductSuggestion
                    value={line.description}
                    products={products}
                    placeholder={`Article ${idx + 1}`}
                    onChange={(v) => updateLine(line.id, "description", v)}
                    onSelect={(p) => selectProductForLine(line.id, p)}
                  />
                  {/* Qty */}
                  <Input
                    type="number"
                    min={1}
                    value={line.quantity}
                    onChange={(e) => updateLine(line.id, "quantity", Math.max(1, Number(e.target.value)))}
                    className="text-center"
                  />
                  {/* Unit price */}
                  <Input
                    type="number"
                    min={0}
                    step={500}
                    placeholder="0"
                    value={line.unitPrice || ""}
                    onChange={(e) => updateLine(line.id, "unitPrice", Number(e.target.value))}
                    className="text-right"
                  />
                  {/* Line total */}
                  <span className="text-right text-sm font-medium text-muted-foreground hidden sm:block whitespace-nowrap">
                    {formatPriceFCFA(line.quantity * line.unitPrice)}
                  </span>
                  {/* Remove */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive h-8 w-8"
                    onClick={() => removeLine(line.id)}
                    disabled={invoice.lines.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button variant="outline" size="sm" onClick={addLine} className="gap-2 mt-2">
                <Plus className="h-4 w-4" />
                Ajouter un article
              </Button>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notes et conditions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Notes supplementaires</Label>
                <Textarea
                  placeholder="Informations supplementaires pour le client..."
                  value={invoice.notes}
                  onChange={(e) => setInvoice((p) => ({ ...p, notes: e.target.value }))}
                  rows={3}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Conditions de paiement</Label>
                <Textarea
                  value={invoice.conditions}
                  onChange={(e) => setInvoice((p) => ({ ...p, conditions: e.target.value }))}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: summary */}
        <div className="space-y-6">
          {/* Shop info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Building2 className="h-4 w-4" />
                Boutique
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl overflow-hidden bg-muted flex items-center justify-center shrink-0">
                  <Image
                    src="/images/logo-hasilaza.png"
                    alt="Logo Hasilaza"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="font-bold text-sm">{SHOP_INFO.name}</p>
                  <p className="text-xs text-muted-foreground">{SHOP_INFO.address}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>Tel: {SHOP_INFO.phone}</p>
                <p>Email: {SHOP_INFO.email}</p>
              </div>
            </CardContent>
          </Card>

          {/* Totals */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recapitulatif</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Sous-total</span>
                <span className="font-medium">{formatPriceFCFA(subtotal)}</span>
              </div>

              <div className="flex items-center justify-between gap-2 text-sm">
                <Label className="text-muted-foreground shrink-0">Remise (FCFA)</Label>
                <Input
                  type="number"
                  min={0}
                  value={invoice.discount || ""}
                  onChange={(e) => setInvoice((p) => ({ ...p, discount: Number(e.target.value) }))}
                  className="w-32 h-8 text-right text-sm"
                  placeholder="0"
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between font-bold">
                <span>Total</span>
                <span className="text-primary">{formatPriceFCFA(total)}</span>
              </div>

              <div className="flex items-center justify-between gap-2 text-sm">
                <Label className="text-muted-foreground shrink-0">Avance recue (FCFA)</Label>
                <Input
                  type="number"
                  min={0}
                  value={invoice.advance || ""}
                  onChange={(e) => setInvoice((p) => ({ ...p, advance: Number(e.target.value) }))}
                  className="w-32 h-8 text-right text-sm"
                  placeholder="0"
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between font-bold text-lg">
                <span>Restant a payer</span>
                <span className={remaining > 0 ? "text-destructive" : "text-green-600"}>
                  {formatPriceFCFA(remaining)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Button className="w-full gap-2" onClick={handleDownloadPDF} disabled={generating}>
              <Download className="h-4 w-4" />
              {generating ? "Generation..." : "Telecharger PDF"}
            </Button>
            <Button variant="outline" className="w-full gap-2" onClick={handleWhatsApp} disabled={generating}>
              <MessageCircle className="h-4 w-4" />
              Envoyer par WhatsApp
            </Button>
            <Button variant="ghost" className="w-full gap-2" onClick={handlePrint}>
              <Printer className="h-4 w-4" />
              Imprimer
            </Button>
          </div>
        </div>
      </div>

      {/* Print view */}
      <div className="hidden print:block">
        <InvoicePrintView invoice={invoice} subtotal={subtotal} total={total} remaining={remaining} />
      </div>
    </div>
  )
}

function InvoicePrintView({
  invoice,
  subtotal,
  total,
  remaining,
}: {
  invoice: InvoiceData
  subtotal: number
  total: number
  remaining: number
}) {
  return (
    <div className="p-8 font-sans text-sm text-foreground">
      <div className="flex items-start justify-between mb-8 pb-6 border-b-2 border-foreground">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Image src="/images/logo-hasilaza.png" alt="Logo" width={48} height={48} className="object-contain" />
            <h1 className="text-2xl font-bold">{SHOP_INFO.name}</h1>
          </div>
          <p className="text-muted-foreground text-xs">{SHOP_INFO.address}</p>
          <p className="text-muted-foreground text-xs">Tel: {SHOP_INFO.phone}</p>
          <p className="text-muted-foreground text-xs">Email: {SHOP_INFO.email}</p>
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-black text-primary mb-1">FACTURE</h2>
          <p className="font-bold">{invoice.invoiceNumber}</p>
          <p className="text-xs text-muted-foreground">
            Date: {new Date(invoice.date).toLocaleDateString("fr-FR")}
          </p>
          {invoice.dueDate && (
            <p className="text-xs text-muted-foreground">
              Echeance: {new Date(invoice.dueDate).toLocaleDateString("fr-FR")}
            </p>
          )}
        </div>
      </div>

      <div className="mb-8 p-4 bg-muted rounded-lg">
        <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Facture a:</p>
        <p className="font-bold text-lg">{invoice.clientName}</p>
        {invoice.clientPhone && <p className="text-xs">Tel: {invoice.clientPhone}</p>}
        {invoice.clientEmail && <p className="text-xs">Email: {invoice.clientEmail}</p>}
        {invoice.clientAddress && (
          <p className="text-xs">
            {invoice.clientAddress}
            {invoice.clientCity ? `, ${invoice.clientCity}` : ""}
          </p>
        )}
      </div>

      <table className="w-full mb-6 border-collapse text-xs">
        <thead>
          <tr className="bg-foreground text-background">
            <th className="text-center p-2 w-8">#</th>
            <th className="text-left p-2">DESIGNATION</th>
            <th className="text-center p-2 w-12">QTE</th>
            <th className="text-right p-2 w-32">PRIX UNIT.</th>
            <th className="text-right p-2 w-32">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {invoice.lines
            .filter((l) => l.description)
            .map((l, i) => (
              <tr key={l.id} className={i % 2 === 0 ? "bg-muted/40" : ""}>
                <td className="p-2 text-center">{i + 1}</td>
                <td className="p-2">{l.description}</td>
                <td className="p-2 text-center">{l.quantity}</td>
                <td className="p-2 text-right">{formatPriceFCFA(l.unitPrice)}</td>
                <td className="p-2 text-right font-medium">{formatPriceFCFA(l.quantity * l.unitPrice)}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="flex justify-end mb-8">
        <div className="w-72 space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sous-total</span>
            <span>{formatPriceFCFA(subtotal)}</span>
          </div>
          {invoice.discount > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Remise</span>
              <span>- {formatPriceFCFA(invoice.discount)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold border-t pt-1">
            <span>TOTAL</span>
            <span>{formatPriceFCFA(total)}</span>
          </div>
          {invoice.advance > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Avance recue</span>
              <span>- {formatPriceFCFA(invoice.advance)}</span>
            </div>
          )}
          <div className="flex justify-between font-black text-base border-t pt-1">
            <span>RESTANT A PAYER</span>
            <span>{formatPriceFCFA(remaining)}</span>
          </div>
        </div>
      </div>

      {(invoice.notes || invoice.conditions) && (
        <div className="border-t pt-4 space-y-2 text-xs">
          {invoice.notes && (
            <div>
              <p className="font-bold">Notes:</p>
              <p className="text-muted-foreground">{invoice.notes}</p>
            </div>
          )}
          {invoice.conditions && (
            <div>
              <p className="font-bold">Conditions:</p>
              <p className="text-muted-foreground">{invoice.conditions}</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 pt-4 border-t text-center text-xs text-muted-foreground">
        {SHOP_INFO.name} — {SHOP_INFO.address} — {SHOP_INFO.phone} — {SHOP_INFO.email}
      </div>
    </div>
  )
}
