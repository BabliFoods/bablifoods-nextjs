'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HeroLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2 }}
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
    >
      <div className="relative w-[80vw] h-[80vw] max-w-[400px] max-h-[400px]">
        <Image
          src="/images/bablifoods_logo.png"
          alt="Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </motion.div>
  )
}
