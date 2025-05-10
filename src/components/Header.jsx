"use client"

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion' // Import AnimatePresence

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)

  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen)
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4 max-w-screen-xl">
        {/* Logo and Company Name */}
        <div className="flex items-center space-x-2">
          <Link href="/">
            <img src="/images/bablifoods_logo.png" alt="BabliFoods Logo" className="h-10" />
          </Link>
          <span className="text-2xl font-bold text-black">BabliFoods</span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex space-x-8">
          <Link href="/" className="text-black hover:text-red-600 transition duration-200">Home</Link>
          <Link href="/about" className="text-black hover:text-red-600 transition duration-200">About</Link>
          <Link href="/services" className="text-black hover:text-red-600 transition duration-200">Services</Link>
          <Link href="/contact" className="text-black hover:text-red-600 transition duration-200">Contact</Link>
        </nav>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={navbarToggleHandler}
          className="lg:hidden text-black focus:outline-none"
        >
          <span
            className={`block h-1 w-6 bg-black mb-1 transition-all duration-300 ${navbarOpen ? 'rotate-45 translate-y-2' : ''}`}
          ></span>
          <span
            className={`block h-1 w-6 bg-black mb-1 transition-all duration-300 ${navbarOpen ? 'opacity-0' : ''}`}
          ></span>
          <span
            className={`block h-1 w-6 bg-black mb-1 transition-all duration-300 ${navbarOpen ? '-rotate-45 -translate-y-2' : ''}`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu - Animation with Framer Motion */}
      <AnimatePresence>
        {navbarOpen && (
          <motion.div
            className="lg:hidden bg-white shadow-lg p-4 absolute top-full left-0 right-0 rounded-b-lg rounded-t-none"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}  // Slide down when opened
            exit={{ opacity: 0, y: -20 }} // Slide up when closed
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ul className="space-y-4 text-center">
              <li><Link href="/" className="text-black hover:text-red-600 transition duration-200">Home</Link></li>
              <li><Link href="/products" className="text-black hover:text-red-600 transition duration-200">Products</Link></li>
              <li><Link href="/contact" className="text-black hover:text-red-600 transition duration-200">Contact</Link></li>
              <li><Link href="/about" className="text-black hover:text-red-600 transition duration-200">About</Link></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
