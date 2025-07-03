"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabaseClient'
import { checkAdmin } from '../../../lib/checkAdmin'
import { motion } from 'framer-motion'

export default function AddProductPage() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const router = useRouter()

  useEffect(() => {
    const protect = async () => {
      await checkAdmin(router)
    }
    protect()
  }, [router])

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
    setErrorMessage('')

    if (!imageFile || !name || !category) {
      setErrorMessage('All fields including image are required.')
      setLoading(false)
      return
    }

    // Check if product name already exists
    const { data: existing, error: fetchError } = await supabase
      .from('Product')
      .select('id')
      .eq('name', name.trim())

    if (fetchError) {
      console.error('Fetch error:', fetchError)
      setErrorMessage('Error checking existing products.')
      setLoading(false)
      return
    }

    if (existing.length > 0) {
      setErrorMessage('A product with this name already exists.')
      setLoading(false)
      return
    }

    let imageUrl = ''
    const fileExt = imageFile.name.split('.').pop()

    const sanitizedProductName = name
      .trim()
      .replace(/[^a-zA-Z0-9 ]+/g, '')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')

    const fileName = sanitizedProductName
      ? `${sanitizedProductName}.${fileExt}`
      : `${Date.now()}.${fileExt}`

    // Upload with overwrite support
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, imageFile, { upsert: true })

    if (uploadError) {
      console.error('Image upload error:', uploadError)
      setErrorMessage('Failed to upload image. Try a different file.')
      setLoading(false)
      return
    }

    const { data: publicUrlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName)

    imageUrl = publicUrlData.publicUrl

    const { error: insertError } = await supabase
      .from('Product')
      .insert([{ name: name.trim(), category: category.trim(), image_url: imageUrl }])

    setLoading(false)

    if (insertError) {
      console.error('Insert error:', insertError)
      setErrorMessage('Something went wrong while adding the product.')
    } else {
      router.push('/admin')
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
          <span className="text-sm text-gray-600 truncate max-w-xs">
            {imageFile ? imageFile.name : 'No image selected'}
          </span>
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

        {errorMessage && (
          <div className="text-red-600 text-sm font-medium">{errorMessage}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </motion.div>
  )
}
