'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useAnimation, useInView } from 'framer-motion'
import Picture1 from '../../public/images/fryums.png'
import Picture2 from '../../public/images/wheels.png'
import Picture3 from '../../public/images/jadoo.png'
import Link from 'next/link'  // Importing Link from Next.js for client-side navigation

export default function HeroSection({ loading }) {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const sm = useTransform(scrollYProgress, [0, 1], [0, -50])
  const md = useTransform(scrollYProgress, [0, 1], [0, -150])
  const lg = useTransform(scrollYProgress, [0, 1], [0, -550])

  const images = [
    { src: Picture1, y: sm, className: 'top-[15vh] left-[5vw] h-[20vh] w-[15vh] md:h-[35vh] md:w-[25vh] z-[1]' },
    { src: Picture2, y: md, className: 'top-[80vh] right-[0vw] h-[15vh] w-[10vh] md:h-[40vh] md:w-[30vh] z-[2]' },
    { src: Picture3, y: lg, className: 'top-[120vh] left-[30vw] h-[18vh] w-[14vh] md:h-[25vh] md:w-[20vh] z-[3]' },
  ]

  const headingRef = useRef(null)
  const isInView = useInView(headingRef, { once: false, margin: '-20% 0px' })
  const controls = useAnimation()

  useEffect(() => {
    if (!loading) {
      if (isInView) controls.start('visible')
      else controls.start('hidden')
    }
  }, [isInView, controls, loading])

  const titleText = 'Crunch Into Delight With Us'
  const words = titleText.split(' ')

  return (
    <section
      ref={containerRef}
      className="min-h-[110vh] relative overflow-hidden bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/images/red_comic.jpg')" }}
    >
      {/* CENTERED TEXT */}
      <motion.div
        ref={headingRef}
        className="text-center max-w-2xl z-10"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { scaleY: 0, opacity: 0 },
          visible: {
            scaleY: 1,
            opacity: 1,
            transition: { duration: 0.5, ease: 'easeOut' },  // Much faster
          },
        }}
      >
        <motion.h1 className="text-white text-4xl md:text-6xl mb-4 leading-tight flex flex-wrap justify-center">
          {words.map((word, wordIndex) => (
            <motion.span
              key={wordIndex}
              className="inline-block mr-4"
              variants={{
                hidden: { scale: 0 },
                visible: {
                  scale: 1,
                  transition: {
                    delay: wordIndex * 0.1,  // Significantly reduced delay
                    duration: 0.3,  // Much faster
                    ease: 'easeOut',
                  },
                },
              }}
            >
              {word.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  variants={{
                    hidden: { opacity: 0, scale: 0 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: {
                        delay: wordIndex * 0.1 + index * 0.05,  // Reduced delay further for quicker animation
                        duration: 0.2,  // Much faster
                        ease: 'easeOut',
                      },
                    },
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="text-white text-base md:text-lg font-light mb-6"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { scaleY: 0, opacity: 0 },
            visible: {
              scaleY: 1,
              opacity: 1,
              transition: { duration: 0.5, ease: 'easeOut', delay: 0.8 },  // Faster with reduced delay
            },
          }}
        >
          Discover the ultimate snacking experience—crispy, flavorful, and fun in every bite.
        </motion.p>

        <motion.div
          className="flex justify-center gap-4 flex-wrap"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: 0.5, ease: 'easeOut', delay: 1.0 },  // Faster transition
            },
          }}
        >
          {/* Link wrapping the Explore Products Button */}
          <Link href="/products">
            <button className="bg-white text-red-600 font-semibold px-6 py-2 rounded-full hover:bg-red-100 transition">
              Explore Products
            </button>
          </Link>

          {/* Link wrapping the Learn More Button */}
          <Link href="/about">
            <button className="border border-white text-white font-semibold px-6 py-2 rounded-full hover:bg-white hover:text-red-600 transition">
              Learn More
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Floating IMAGES */}
      <div className="w-full h-full absolute top-0 left-0 pointer-events-none">
        {images.map(({ src, y, className }, i) => (
          <motion.div key={`image_${i}`} style={{ y }} className={`absolute ${className}`}>
            <Image src={src} fill placeholder="blur" alt={`image_${i}`} className="object-cover" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
