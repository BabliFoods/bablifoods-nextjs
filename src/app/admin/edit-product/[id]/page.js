"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { supabase } from "../../../../lib/supabaseClient"
import { checkAdmin } from "../../../../lib/checkAdmin"
import { motion } from "framer-motion"

// Convert string to Title Case
function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ")
}

// Remove special characters from filename
function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9]+/g, "")
}

export default function EditProductPage() {
  const { id } = useParams()
  const router = useRouter()

  const [product, setProduct] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const protect = async () => {
      await checkAdmin(router)
    }
    protect()
  }, [router])

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("Product")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.error("Fetch error:", error)
      } else {
        setProduct(data)
        setPreviewUrl(data?.image_url || "")
      }
    }

    if (id) fetchProduct()
  }, [id])

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setPreviewUrl("")
    setProduct((prev) => ({ ...prev, image_url: "" }))
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage("")

    const newName = toTitleCase(product.name.trim())
    const newCategory = toTitleCase(product.category.trim())
    const oldImagePath = product.image_url?.split("/product-images/")[1] || null

    // Check for duplicate product name
    const { data: existingProducts, error: nameCheckError } = await supabase
      .from("Product")
      .select("id")
      .eq("name", newName)

    if (nameCheckError) {
      setErrorMessage("Error checking product name.")
      setLoading(false)
      return
    }

    const isDuplicate = existingProducts.some((p) => p.id !== id)
    if (isDuplicate) {
      setErrorMessage("Another product with this name already exists.")
      setLoading(false)
      return
    }

    let imageUrl = product.image_url

    // IMAGE CHANGED
    if (imageFile) {
      const ext = imageFile.name.split(".").pop()
      const cleanName = sanitizeFilename(newName)
      const newFilename = `${cleanName}.${ext}`

      if (oldImagePath) {
        await supabase.storage.from("product-images").remove([oldImagePath])
      }

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(newFilename, imageFile, { upsert: true })

      if (uploadError) {
        setErrorMessage("Failed to upload image.")
        setLoading(false)
        return
      }

      const { data: publicUrlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(newFilename)

      imageUrl = publicUrlData.publicUrl
    }

    // NAME CHANGED ONLY
    else if (newName !== product.name && oldImagePath) {
      const ext = oldImagePath.split(".").pop()
      const cleanName = sanitizeFilename(newName)
      const newFilename = `${cleanName}.${ext}`

      const { data: fileData, error: downloadError } = await supabase.storage
        .from("product-images")
        .download(oldImagePath)

      if (downloadError) {
        setErrorMessage("Could not rename image.")
        setLoading(false)
        return
      }

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(newFilename, fileData, { upsert: true })

      if (uploadError) {
        setErrorMessage("Failed to rename image.")
        setLoading(false)
        return
      }

      await supabase.storage.from("product-images").remove([oldImagePath])

      const { data: publicUrlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(newFilename)

      imageUrl = publicUrlData.publicUrl
    }

    // FINAL DB UPDATE
    const { error: updateError } = await supabase
      .from("Product")
      .update({
        name: newName,
        category: newCategory,
        image_url: imageUrl,
      })
      .eq("id", id)

    setLoading(false)

    if (updateError) {
      setErrorMessage("Failed to update the product.")
    } else {
      router.push("/admin/")
    }
  }

  if (!product) {
    return <div className="text-center p-8">Loading product...</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-xl mx-auto px-6 py-10"
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Product</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Category"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <div className="flex items-center space-x-4">
          <label className="bg-gray-100 px-4 py-2 border rounded cursor-pointer hover:bg-gray-200 transition">
            Change Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          <button
            type="button"
            onClick={handleRemoveImage}
            className="text-sm text-red-600 hover:underline"
          >
            Remove Image
          </button>
        </div>

        {previewUrl ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4"
          >
            <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
            <img
              src={previewUrl}
              alt="Preview"
              className="w-48 h-48 object-cover border rounded-lg"
            />
          </motion.div>
        ) : (
          <p className="text-sm text-gray-500">No image selected</p>
        )}

        {errorMessage && (
          <div className="text-red-600 text-sm font-medium">{errorMessage}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </motion.div>
  )
}
