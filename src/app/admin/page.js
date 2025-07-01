'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'
import { checkAdmin } from '../../lib/checkAdmin'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminProductsPage() {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)
  const router = useRouter()

  // AUTH CHECK
  useEffect(() => {
    const authorize = async () => {
      const session = await checkAdmin(router)
      if (!session) return
      setSession(session)
      setLoading(false)
    }

    authorize()
  }, [router])

  // FETCH PRODUCTS
  useEffect(() => {
    if (!session) return

    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('Product')
        .select('*')
        .order('name', { ascending: true })

      if (error) {
        console.error('Error fetching products:', error)
      } else {
        setProducts(data)
      }
    }

    fetchProducts()
  }, [session])

  const handleEdit = (id) => {
    router.push(`/admin/edit-product/${id}`)
  }

  const handleAddProduct = () => {
    router.push('/admin/add-product')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const confirmDelete = (product) => {
    setSelectedProduct(product)
    setShowConfirm(true)
  }

  const handleDeleteConfirmed = async () => {
    if (!selectedProduct) return

    // Extract image path from URL
    try {
      const imageUrl = selectedProduct.image_url
      const bucket = 'product-images'
      const path = imageUrl.split(`${bucket}/`)[1]

      // Delete image from bucket
      if (path) {
        const { error: storageError } = await supabase.storage
          .from(bucket)
          .remove([path])

        if (storageError) {
          console.error('Error deleting image:', storageError)
        }
      }

      // Delete product from DB
      const { error: dbError } = await supabase
        .from('Product')
        .delete()
        .eq('id', selectedProduct.id)

      if (dbError) {
        console.error('Error deleting product:', dbError)
      } else {
        setProducts(products.filter((p) => p.id !== selectedProduct.id))
        setToastMessage(`"${selectedProduct.name}" was successfully deleted.`)
        setTimeout(() => setToastMessage(''), 3000)
        setShowConfirm(false)
        setSelectedProduct(null)
      }
    } catch (err) {
      console.error('Deletion error:', err)
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto p-8 pt-22 relative"
    >
      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Product Dashboard</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={handleAddProduct}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm text-sm font-semibold"
          >
            Add Product
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="px-6 py-4 text-left">Image</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <motion.tbody
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.05 } },
            }}
          >
            {products.map((product, index) => (
              <motion.tr
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 },
                }}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-gray-100 transition`}
              >
                <td className="px-6 py-4">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded border"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-800">{product.name}</td>
                <td className="px-6 py-4 text-gray-600">{product.category}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(product)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Delete Product</h2>
              <p className="text-gray-600 mb-4">
                Are you sure you want to permanently delete{' '}
                <span className="font-medium text-red-600">{selectedProduct?.name}</span>?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirmed}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
