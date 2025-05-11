"use client"

import { useState } from "react"
import products from "@/data/products" // Adjust path based on your structure

export default function ProductPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = products.filter((product) =>
    product.title?.toLowerCase().includes(searchTerm.toLowerCase()) // Safeguard for undefined title
  )

  return (
    <main className="pt-24 py-6 px-6 max-w-screen-xl mx-auto font-sans text-gray-800 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>

      {/* Search Bar */}
      <div className="mb-8 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-32 h-32 object-contain mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
              {/* Optionally, you can display the description */}
              <p className="text-sm text-gray-500">{product.description}</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No products found.</p>
        )}
      </div>
    </main>
  )
}
