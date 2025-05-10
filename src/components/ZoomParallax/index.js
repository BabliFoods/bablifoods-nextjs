'use client'

import Image from 'next/image'
import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

export default function Index() {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.4, 1.2])

  return (
    <div ref={container} className="h-[150vh] relative">
      
      {/* Sticky container for both video and content */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="/images/vid4.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Foreground image */}
        <motion.div
          style={{ scale }}
          className="absolute top-0 w-full h-full flex items-center justify-center z-10"
        >

          <div className="relative w-[80vw] max-w-[400px] aspect-[531/470]">
            <Image
              src="/images/bablifoods_logo.png"
              alt="Zoom Image"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
