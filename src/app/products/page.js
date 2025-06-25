'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabaseClient'

export default function ProductPage() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('Product')
        .select('*')
        .order('name', { ascending: true })

      if (error) {
        console.error('Error fetching products:', error)
      } else {
        setProducts(data || [])
      }

      setLoading(false)
    }

    fetchProducts()
  }, [])

  // Get all unique categories for the filter dropdown
  const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))]

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="pt-24 px-6 max-w-screen-xl mx-auto font-sans text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4 justify-center mb-10">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          className="w-full max-w-md border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow p-4 flex flex-col items-center text-center hover:shadow-lg transition"
              >
                <Image
                  src={product.image_url}
                  alt={product.name}
                  width={128}
                  height={128}
                  className="object-contain mb-4 rounded"
                />
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">No products found.</p>
          )}
        </div>
      )}
    </main>
  )
}
