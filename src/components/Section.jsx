'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import Background from '../../public/images/shop.jpg'

export default function ParallaxSection() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['-10vh', '10vh'])

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute top-0 left-0 w-full h-[120vh] -z-10"
      >
        <Image
          src={Background}
          alt="Parallax Background"
          fill
          className="object-cover object-center md:object-left"
          style={{ objectPosition: 'left center' }}
          priority
        />
      </motion.div>

      {/* Foreground Text Block */}
      <div className="bg-white bg-opacity-90 p-6 md:p-16 rounded-2xl shadow-xl w-[80vw] md:w-[40vw] text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
          Welcome to BabliFoods
        </h1>
        <p className="mt-[5vh] md:mt-6 text-gray-600 text-base md:text-lg">
          Step into a world where every snack is an adventure! From crispy fryums to crunchy corn, we bring you the best of fun and flavor. Our playful, cartoon-style packaging is just the beginning – inside each bag, you’ll find snacks that are as exciting as they are tasty. Join the BabliFoods family and make snack time a whole lot more fun!
        </p>

      </div>

    </section>
  )
}
