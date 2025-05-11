'use client'

import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import HeroLoader from '@/components/HeroLoader'
import HeroSection from '@/components/HeroSection'
import Section from '@/components/Section'
import HeroCarousel from '@/components/HeroCarousel'

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Prevent scrolling when loader is visible
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    // Smooth scroll setup
    const lenis = new Lenis()
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Hide loader after 3s
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => {
      clearTimeout(timer)
      // Reset scroll behavior when component is unmounted or loader finishes
      document.body.style.overflow = 'auto'
    }
  }, [loading])

  return (
    <main className="relative">
      {/* Always render page content */}
      <HeroSection loading={loading} />
      <Section />
      <HeroCarousel />

      {/* Loader overlays on top for 3s */}
      {loading && <HeroLoader />}
    </main>
  )
}
