"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Pencil, Trash2, Eye, MoreHorizontal, Loader2, Upload, X, Image as ImageIcon } from "lucide-react"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatPrice, type Product } from "@/lib/supabase/products"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const { toast } = useToast()

  // Form state - separate states for each field to avoid re-render issues
  const [formName, setFormName] = useState("")
  const [formSlug, setFormSlug] = useState("")
  const [formCategory, setFormCategory] = useState<"tricycle" | "moto" | "piece">("tricycle")
  const [formSubcategory, setFormSubcategory] = useState("")
  const [formPrice, setFormPrice] = useState("")
  const [formOldPrice, setFormOldPrice] = useState("")
  const [formShortDescription, setFormShortDescription] = useState("")
  const [formDescription, setFormDescription] = useState("")
  const [formImages, setFormImages] = useState("")
  const [formInStock, setFormInStock] = useState(true)
  const [formIsBestSeller, setFormIsBestSeller] = useState(false)
  const [formIsNew, setFormIsNew] = useState(false)
  const [formFeatures, setFormFeatures] = useState("")
  const [formSpecs, setFormSpecs] = useState<{ key: string; value: string }[]>([{ key: "", value: "" }])
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const addSpecRow = () => setFormSpecs(prev => [...prev, { key: "", value: "" }])
  const removeSpecRow = (index: number) => setFormSpecs(prev => prev.filter((_, i) => i !== index))
  const updateSpecRow = (index: number, field: "key" | "value", val: string) => {
    setFormSpecs(prev => prev.map((row, i) => i === index ? { ...row, [field]: val } : row))
  }

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    setLoading(true)
    try {
      const response = await fetch("/api/products")
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      } else {
        console.error("Failed to fetch products")
        toast({
          title: "Erreur",
          description: "Impossible de charger les produits",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error loading products:", error)
    }
    setLoading(false)
  }

  // Image upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    
    for (const file of Array.from(files)) {
      try {
        const formData = new FormData()
        formData.append("file", file)
        
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })
        
        if (response.ok) {
          const data = await response.json()
          setUploadedImages(prev => [...prev, data.url])
        } else {
          const error = await response.json()
          toast({
            title: "Erreur",
            description: error.error || "Erreur lors du telechargement",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Upload error:", error)
        toast({
          title: "Erreur",
          description: "Erreur lors du telechargement de l'image",
          variant: "destructive",
        })
      }
    }
    
    setIsUploading(false)
    e.target.value = "" // Reset input
  }

  const removeImage = (url: string) => {
    setUploadedImages(prev => prev.filter(img => img !== url))
  }

  const resetForm = () => {
    setFormName("")
    setFormSlug("")
    setFormCategory("tricycle")
    setFormSubcategory("")
    setFormPrice("")
    setFormOldPrice("")
    setFormShortDescription("")
    setFormDescription("")
    setFormImages("")
    setFormInStock(true)
    setFormIsBestSeller(false)
    setFormIsNew(false)
    setFormFeatures("")
    setFormSpecs([{ key: "", value: "" }])
    setUploadedImages([])
  }

  const openEditDialog = (product: Product) => {
    setEditingProduct(product)
    setFormName(product.name)
    setFormSlug(product.slug)
    setFormCategory(product.category)
    setFormSubcategory(product.subcategory || "")
    setFormPrice(product.price.toString())
    setFormOldPrice(product.old_price?.toString() || "")
    setFormShortDescription(product.short_description)
    setFormDescription(product.description)
    setFormImages("")
    setUploadedImages(product.images || [])
    setFormInStock(product.in_stock)
    setFormIsBestSeller(product.is_best_seller || false)
    setFormIsNew(product.is_new || false)
    setFormFeatures(product.features?.join("\n") || "")
    const specsObj = product.specifications || {}
    const specsArr = Object.entries(specsObj).map(([key, value]) => ({ key, value: String(value) }))
    setFormSpecs(specsArr.length > 0 ? specsArr : [{ key: "", value: "" }])
    setIsEditDialogOpen(true)
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.slug.includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const categoryLabels: Record<string, string> = {
    tricycle: "Tricycle",
    moto: "Moto",
    piece: "Piece",
  }

  const handleSubmit = async () => {
    if (!formName || !formSlug || !formPrice || !formDescription || !formShortDescription) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    
    // Combine uploaded images with manually entered URLs
    const allImages = [
      ...uploadedImages,
      ...(formImages ? formImages.split(",").map(s => s.trim()).filter(Boolean) : [])
    ]
    
    // Parse features (one per line)
    const features = formFeatures ? formFeatures.split("\n").map(f => f.trim()).filter(Boolean) : []
    
    // Build specifications from dynamic key-value pairs
    const specifications = formSpecs.reduce((acc, { key, value }) => {
      if (key.trim() && value.trim()) acc[key.trim()] = value.trim()
      return acc
    }, {} as Record<string, string>)
    
    const productData = {
      name: formName,
      slug: formSlug,
      category: formCategory,
      subcategory: formSubcategory || undefined,
      price: parseInt(formPrice),
      old_price: formOldPrice ? parseInt(formOldPrice) : undefined,
      description: formDescription,
      short_description: formShortDescription,
      specifications,
      features,
      images: allImages.length > 0 ? allImages : ["/images/placeholder.jpg"],
      in_stock: formInStock,
      is_best_seller: formIsBestSeller,
      is_new: formIsNew,
      rating: 0,
      reviews: 0,
    }

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      })
      
      if (response.ok) {
        toast({
          title: "Succes",
          description: "Produit ajoute avec succes",
        })
        setIsAddDialogOpen(false)
        resetForm()
        loadProducts()
      } else {
        const error = await response.json()
        toast({
          title: "Erreur",
          description: error.error || "Erreur lors de l'ajout du produit",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating product:", error)
      toast({
        title: "Erreur",
        description: "Erreur lors de l'ajout du produit",
        variant: "destructive",
      })
    }
    
    setIsSubmitting(false)
  }

  const handleUpdate = async () => {
    if (!editingProduct) return
    
    if (!formName || !formSlug || !formPrice || !formDescription || !formShortDescription) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    
    // Combine uploaded images with manually entered URLs
    const allImages = [
      ...uploadedImages,
      ...(formImages ? formImages.split(",").map(s => s.trim()).filter(Boolean) : [])
    ]
    
    // Parse features (one per line)
    const features = formFeatures ? formFeatures.split("\n").map(f => f.trim()).filter(Boolean) : []
    
    // Build specifications from dynamic key-value pairs
    const specifications = formSpecs.reduce((acc, { key, value }) => {
      if (key.trim() && value.trim()) acc[key.trim()] = value.trim()
      return acc
    }, {} as Record<string, string>)
    
    const updates = {
      name: formName,
      slug: formSlug,
      category: formCategory,
      subcategory: formSubcategory || null,
      price: parseInt(formPrice),
      old_price: formOldPrice ? parseInt(formOldPrice) : null,
      description: formDescription,
      short_description: formShortDescription,
      images: allImages.length > 0 ? allImages : editingProduct.images,
      features,
      specifications,
      in_stock: formInStock,
      is_best_seller: formIsBestSeller,
      is_new: formIsNew,
    }

    try {
      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      
      if (response.ok) {
        toast({
          title: "Succes",
          description: "Produit modifie avec succes",
        })
        setIsEditDialogOpen(false)
        setEditingProduct(null)
        resetForm()
        loadProducts()
      } else {
        const error = await response.json()
        toast({
          title: "Erreur",
          description: error.error || "Erreur lors de la modification du produit",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating product:", error)
      toast({
        title: "Erreur",
        description: "Erreur lors de la modification du produit",
        variant: "destructive",
      })
    }
    
    setIsSubmitting(false)
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Etes-vous sur de vouloir supprimer "${name}" ?`)) return

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      })
      
      if (response.ok) {
        toast({
          title: "Succes",
          description: "Produit supprime avec succes",
        })
        loadProducts()
      } else {
        const error = await response.json()
        toast({
          title: "Erreur",
          description: error.error || "Erreur lors de la suppression",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting product:", error)
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression",
        variant: "destructive",
      })
    }
  }

  const inStockCount = products.filter((p) => p.in_stock).length
  const outOfStockCount = products.filter((p) => !p.in_stock).length

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Produits</h1>
          <p className="text-muted-foreground">
            Gerez votre catalogue de produits
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
          setIsAddDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un produit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Ajouter un produit</DialogTitle>
              <DialogDescription>
                Remplissez les informations du nouveau produit
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="add-name">Nom du produit *</Label>
                <Input 
                  id="add-name" 
                  placeholder="Ex: Tricycle Cargo 200cc"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="add-slug">Slug (URL) *</Label>
                <Input 
                  id="add-slug" 
                  placeholder="Ex: tricycle-cargo-200cc"
                  value={formSlug}
                  onChange={(e) => setFormSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="add-category">Categorie *</Label>
                  <Select 
                    value={formCategory}
                    onValueChange={(value: "tricycle" | "moto" | "piece") => setFormCategory(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tricycle">Tricycle</SelectItem>
                      <SelectItem value="moto">Moto</SelectItem>
                      <SelectItem value="piece">Piece detachee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="add-subcategory">Sous-categorie</Label>
                  <Input 
                    id="add-subcategory" 
                    placeholder="Ex: Cargo"
                    value={formSubcategory}
                    onChange={(e) => setFormSubcategory(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="add-price">Prix (FCFA) *</Label>
                  <Input 
                    id="add-price" 
                    type="number" 
                    placeholder="1850000"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="add-oldPrice">Ancien prix (FCFA)</Label>
                  <Input 
                    id="add-oldPrice" 
                    type="number" 
                    placeholder="2100000"
                    value={formOldPrice}
                    onChange={(e) => setFormOldPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="add-shortDescription">Description courte *</Label>
                <Input 
                  id="add-shortDescription" 
                  placeholder="Description en une ligne"
                  value={formShortDescription}
                  onChange={(e) => setFormShortDescription(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="add-description">Description complete *</Label>
                <Textarea 
                  id="add-description" 
                  rows={4} 
                  placeholder="Description detaillee du produit"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Images du produit</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {uploadedImages.map((url, index) => (
                    <div key={index} className="relative group">
                      <Image 
                        src={url} 
                        alt={`Image ${index + 1}`} 
                        width={80} 
                        height={80} 
                        className="rounded-md object-cover border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(url)}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {uploadedImages.length === 0 && (
                    <div className="flex items-center justify-center w-20 h-20 border-2 border-dashed rounded-md text-muted-foreground">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <label className="flex-1">
                    <div className="flex items-center justify-center gap-2 px-4 py-2 border border-dashed rounded-md cursor-pointer hover:bg-muted/50 transition-colors">
                      {isUploading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="h-4 w-4" />
                      )}
                      <span className="text-sm">Telecharger des images</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>
                </div>
                <Input 
                  id="add-images" 
                  placeholder="Ou entrez des URLs separes par des virgules"
                  value={formImages}
                  onChange={(e) => setFormImages(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="add-features">Caracteristiques (une par ligne)</Label>
                <Textarea 
                  id="add-features" 
                  rows={3} 
                  placeholder="Moteur 200CC refroidi par eau&#10;Benne basculante hydraulique&#10;Charge utile 500kg"
                  value={formFeatures}
                  onChange={(e) => setFormFeatures(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label>Specifications</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addSpecRow} className="h-7 text-xs bg-transparent">
                    <Plus className="h-3 w-3 mr-1" /> Ajouter
                  </Button>
                </div>
                <div className="space-y-2">
                  {formSpecs.map((spec, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Input
                        placeholder="Ex: Moteur"
                        value={spec.key}
                        onChange={(e) => updateSpecRow(index, "key", e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        placeholder="Ex: 200CC"
                        value={spec.value}
                        onChange={(e) => updateSpecRow(index, "value", e.target.value)}
                        className="flex-1"
                      />
                      {formSpecs.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSpecRow(index)}
                          className="h-8 w-8 shrink-0 text-destructive hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input 
                    type="checkbox" 
                    className="rounded border-border"
                    checked={formInStock}
                    onChange={(e) => setFormInStock(e.target.checked)}
                  />
                  En stock
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input 
                    type="checkbox" 
                    className="rounded border-border"
                    checked={formIsBestSeller}
                    onChange={(e) => setFormIsBestSeller(e.target.checked)}
                  />
                  Best-seller
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input 
                    type="checkbox" 
                    className="rounded border-border"
                    checked={formIsNew}
                    onChange={(e) => setFormIsNew(e.target.checked)}
                  />
                  Nouveau
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="bg-transparent">
                Annuler
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Ajouter le produit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={(open) => {
        setIsEditDialogOpen(open)
        if (!open) {
          setEditingProduct(null)
          resetForm()
        }
      }}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Modifier le produit</DialogTitle>
            <DialogDescription>
              Modifiez les informations du produit
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Nom du produit *</Label>
              <Input 
                id="edit-name" 
                placeholder="Ex: Tricycle Cargo 200cc"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-slug">Slug (URL) *</Label>
              <Input 
                id="edit-slug" 
                placeholder="Ex: tricycle-cargo-200cc"
                value={formSlug}
                onChange={(e) => setFormSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Categorie *</Label>
                <Select 
                  value={formCategory}
                  onValueChange={(value: "tricycle" | "moto" | "piece") => setFormCategory(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tricycle">Tricycle</SelectItem>
                    <SelectItem value="moto">Moto</SelectItem>
                    <SelectItem value="piece">Piece detachee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-subcategory">Sous-categorie</Label>
                <Input 
                  id="edit-subcategory" 
                  placeholder="Ex: Cargo"
                  value={formSubcategory}
                  onChange={(e) => setFormSubcategory(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Prix (FCFA) *</Label>
                <Input 
                  id="edit-price" 
                  type="number" 
                  placeholder="1850000"
                  value={formPrice}
                  onChange={(e) => setFormPrice(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-oldPrice">Ancien prix (FCFA)</Label>
                <Input 
                  id="edit-oldPrice" 
                  type="number" 
                  placeholder="2100000"
                  value={formOldPrice}
                  onChange={(e) => setFormOldPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-shortDescription">Description courte *</Label>
              <Input 
                id="edit-shortDescription" 
                placeholder="Description en une ligne"
                value={formShortDescription}
                onChange={(e) => setFormShortDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description complete *</Label>
              <Textarea 
                id="edit-description" 
                rows={4} 
                placeholder="Description detaillee du produit"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Images du produit</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {uploadedImages.map((url, index) => (
                  <div key={index} className="relative group">
                    <Image 
                      src={url} 
                      alt={`Image ${index + 1}`} 
                      width={80} 
                      height={80} 
                      className="rounded-md object-cover border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(url)}
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {uploadedImages.length === 0 && (
                  <div className="flex items-center justify-center w-20 h-20 border-2 border-dashed rounded-md text-muted-foreground">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <label className="flex-1">
                  <div className="flex items-center justify-center gap-2 px-4 py-2 border border-dashed rounded-md cursor-pointer hover:bg-muted/50 transition-colors">
                    {isUploading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4" />
                    )}
                    <span className="text-sm">Telecharger des images</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>
              <Input 
                id="edit-images" 
                placeholder="Ou entrez des URLs separes par des virgules"
                value={formImages}
                onChange={(e) => setFormImages(e.target.value)}
                className="mt-2"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-features">Caracteristiques (une par ligne)</Label>
              <Textarea 
                id="edit-features" 
                rows={3} 
                placeholder="Moteur 200CC refroidi par eau&#10;Benne basculante hydraulique&#10;Charge utile 500kg"
                value={formFeatures}
                onChange={(e) => setFormFeatures(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Specifications</Label>
                <Button type="button" variant="outline" size="sm" onClick={addSpecRow} className="h-7 text-xs bg-transparent">
                  <Plus className="h-3 w-3 mr-1" /> Ajouter
                </Button>
              </div>
              <div className="space-y-2">
                {formSpecs.map((spec, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      placeholder="Ex: Moteur"
                      value={spec.key}
                      onChange={(e) => updateSpecRow(index, "key", e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Ex: 200CC"
                      value={spec.value}
                      onChange={(e) => updateSpecRow(index, "value", e.target.value)}
                      className="flex-1"
                    />
                    {formSpecs.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSpecRow(index)}
                        className="h-8 w-8 shrink-0 text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input 
                  type="checkbox" 
                  className="rounded border-border"
                  checked={formInStock}
                  onChange={(e) => setFormInStock(e.target.checked)}
                />
                En stock
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input 
                  type="checkbox" 
                  className="rounded border-border"
                  checked={formIsBestSeller}
                  onChange={(e) => setFormIsBestSeller(e.target.checked)}
                />
                Best-seller
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input 
                  type="checkbox" 
                  className="rounded border-border"
                  checked={formIsNew}
                  onChange={(e) => setFormIsNew(e.target.checked)}
                />
                Nouveau
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="bg-transparent">
              Annuler
            </Button>
            <Button onClick={handleUpdate} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Enregistrer les modifications
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total produits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              En stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inStockCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rupture de stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {outOfStockCount}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des produits</CardTitle>
          <CardDescription>
            {filteredProducts.length} produit(s) trouve(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Categorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes categories</SelectItem>
                <SelectItem value="tricycle">Tricycles</SelectItem>
                <SelectItem value="moto">Motos</SelectItem>
                <SelectItem value="piece">Pieces detachees</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead className="hidden md:table-cell">Categorie</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead className="hidden sm:table-cell">Stock</TableHead>
                  <TableHead className="hidden lg:table-cell">Note</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Aucun produit trouve
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 overflow-hidden rounded-lg bg-muted">
                            <img
                              src={product.images[0] || "/placeholder.svg"}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {product.slug}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline">
                          {categoryLabels[product.category]}
                        </Badge>
                        {product.subcategory && (
                          <span className="ml-2 text-xs text-muted-foreground">
                            {product.subcategory}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{formatPrice(product.price)}</div>
                        {product.old_price && (
                          <div className="text-xs text-muted-foreground line-through">
                            {formatPrice(product.old_price)}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant={product.in_stock ? "default" : "destructive"}>
                          {product.in_stock ? "En stock" : "Rupture"}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span>{product.rating}</span>
                          <span className="text-muted-foreground">({product.reviews})</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/produits/${product.slug}`} target="_blank">
                                <Eye className="mr-2 h-4 w-4" />
                                Voir
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditDialog(product)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => handleDelete(product.id, product.name)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
