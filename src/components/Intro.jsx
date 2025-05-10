'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import { useScroll, useTransform, motion } from 'framer-motion'

// Import background image (nacho_pattern.jpg)
import Background from '../../public/images/nacho_pattern.jpg'

// Import logo image (bablifoods_logo.png)
import LogoImage from '../../public/images/bablifoods_logo.png'

export default function Intro() {
  const container = useRef()
  
  // Track scroll progress to animate background and logo
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start'],
  })
  
  // Apply translation effect to both background and logo on scroll
  const y = useTransform(scrollYProgress, [0, 1], ['0vh', '150vh'])

  return (
    <div 
      ref={container} 
      className="h-screen overflow-hidden relative"
    >
      {/* Parallax scroll effect on the background */}
      <motion.div 
        style={{ y }} 
        className="absolute top-0 left-0 w-full h-full"
      >
        <Image
          src={Background} 
          alt="background" 
          fill 
          style={{ objectFit: 'cover' }}
        />
      </motion.div>

      {/* Logo that moves with the background */}
      <motion.div
        style={{ y }}  // Apply same scroll-based transform to the logo
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <Image
          src={LogoImage} 
          alt="logo"
          width={300} // Adjust width for PC
          height={300} // Adjust height for PC
          className="object-contain"
        />
      </motion.div>
    </div>
  )
}
