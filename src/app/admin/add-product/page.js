"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../../lib/supabaseClient"
import { motion } from "framer-motion"

export default function AddProductPage() {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    let imageUrl = ""

    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop()

      // Convert product name to PascalCase, remove special characters
      const sanitizedProductName = name
        .trim()
        .replace(/[^a-zA-Z0-9 ]+/g, "") // remove special chars
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join("")

      const fileName = sanitizedProductName
        ? `${sanitizedProductName}.${fileExt}`
        : `${Date.now()}.${fileExt}`

      const { data, error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, imageFile)

      if (uploadError) {
        console.error("Image upload error:", uploadError)
        setLoading(false)
        return
      }

      const { data: publicUrlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName)

      imageUrl = publicUrlData.publicUrl
    }

    const { error } = await supabase
      .from("Product")
      .insert([{ name, category, image_url: imageUrl }])

    setLoading(false)

    if (error) {
      console.error("Add product error:", error)
    } else {
      router.push("/admin/")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-xl mx-auto px-6 py-10"
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        {/* File input styled as a button */}
        <div className="flex items-center space-x-4">
          <label className="bg-gray-100 px-4 py-2 border rounded cursor-pointer hover:bg-gray-200 transition">
            Choose Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="hidden"
            />
          </label>
          {imageFile && (
            <span className="text-sm text-gray-600 truncate max-w-xs">{imageFile.name}</span>
          )}
        </div>

        {previewUrl && (
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
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </motion.div>
  )
}
