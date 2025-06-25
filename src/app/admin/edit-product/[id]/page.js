"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { supabase } from "../../../../lib/supabaseClient"
import { motion } from "framer-motion"

export default function EditProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("Product")
        .select("*")
        .eq("id", id)
        .single()

      if (error) console.error("Fetch error:", error)
      else {
        setProduct(data)
        setShowPreview(!!data?.image_url?.startsWith("http"))
      }
    }

    if (id) fetchProduct()
  }, [id])

  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase
      .from("Product")
      .update({
        name: product.name,
        category: product.category,
        image_url: product.image_url,
      })
      .eq("id", id)

    setLoading(false)

    if (error) {
      console.error("Update error:", error)
    } else {
      router.push("/admin/")
    }
  }

  const handleImageChange = (e) => {
    const url = e.target.value
    setProduct({ ...product, image_url: url })
    setShowPreview(!!url && url.startsWith("http"))
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
        <input
          type="text"
          placeholder="Image URL"
          value={product.image_url}
          onChange={handleImageChange}
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
              src={product.image_url}
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
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </motion.div>
  )
}
