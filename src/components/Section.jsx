'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
// import Background from '../../public/images/shop.jpg'
import Background from '../../public/images/nacho_pattern.jpg'

export default function ParallaxSection() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['-10vh', '10vh'])

  // Variants for text animation
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

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

      {/* Foreground White Box */}
      <div className="bg-white bg-opacity-90 p-6 md:p-16 shadow-xl w-[80vw] md:w-[30vw] text-center">
        {/* Heading */}
        <motion.h1
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight"
        >
          Welcome to BabliFoods
        </motion.h1>

        {/* Paragraphs with staggered animation */}
        <motion.p
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="mt-[10vh] text-gray-600 text-base md:text-lg"
        >
          Step into a world where every snack is an adventure! From crispy fryums to crunchy corn, we bring you the best of fun and flavor.
        </motion.p>

        <motion.p
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          className="text-gray-600 text-base md:text-lg"
        >
          Our playful, cartoon-style packaging is just the beginning – inside each bag, you’ll find snacks that are as exciting as they are tasty. Join the BabliFoods family and make snack time a whole lot more fun!
        </motion.p>
      </div>
    </section>
  )
}
