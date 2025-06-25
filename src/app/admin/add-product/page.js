"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../../lib/supabaseClient"
import { motion } from "framer-motion"

export default function AddProductPage() {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from("Product").insert([
      { name, category, image_url: imageUrl },
    ])

    setLoading(false)

    if (error) {
      console.error("Add product error:", error)
    } else {
      router.push("/admin/")
    }
  }

  const handleImageUrlChange = (e) => {
    const url = e.target.value
    setImageUrl(url)
    setShowPreview(!!url && url.startsWith("http"))
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
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleImageUrlChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4"
          >
            <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
            <img
              src={imageUrl}
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
