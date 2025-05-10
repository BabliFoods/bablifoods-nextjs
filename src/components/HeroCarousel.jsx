'use client'

import { useState } from 'react'
import Image from 'next/image'

const slides = [
  {
    id: 1,
    title: 'Fryums Delight',
    description: 'A crispy snack that’s full of fun and flavor.',
    src: '/images/fryums.png',
    backgroundColor: '#D11419',
  },
  {
    id: 2,
    title: 'Crunchy Corn',
    description: 'Irresistibly crunchy corn kernels for the perfect snack.',
    src: '/images/jadoo.png',
    backgroundColor: '#0288C8',
  },
  {
    id: 3,
    title: 'Potato Poppers',
    description: 'Crispy and tasty potato chips with a punch of flavor.',
    src: '/images/wheels.png',
    backgroundColor: '#034A16',
  },
]

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)

  const currentSlide = slides[currentIndex]

  const changeSlide = (newIndex) => {
    setIsFading(true)
    setTimeout(() => {
      setCurrentIndex(newIndex)
      setIsFading(false)
    }, 300)
  }

  const handlePrev = () => {
    const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1
    changeSlide(prevIndex)
  }

  const handleNext = () => {
    const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1
    changeSlide(nextIndex)
  }

  return (
    <section
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 transition-colors duration-500"
      style={{
        backgroundColor: currentSlide.backgroundColor,
        backgroundImage: `url('/images/comic_overlay.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply',
      }}
    >
      {/* Image & Arrows */}
      <div className="relative z-10 flex items-center justify-center w-full max-w-[500px] mb-6">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="absolute left-0 z-20 w-10 h-10 rounded-full bg-white text-black font-bold hover:bg-gray-200 shadow-md"
        >
          &#8592;
        </button>

        {/* Image */}
        <div className="w-[80vw] max-w-[300px] aspect-square relative overflow-hidden rounded-xl">
          <Image
            src={currentSlide.src}
            alt={currentSlide.title}
            fill
            sizes="(max-width: 768px) 80vw, 300px"
            className={`object-contain transition-opacity duration-500 ${
              isFading ? 'opacity-0' : 'opacity-100'
            }`}
            priority
          />
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-0 z-20 w-10 h-10 rounded-full bg-white text-black font-bold hover:bg-gray-200 shadow-md"
        >
          &#8594;
        </button>
      </div>

      {/* Title & Description */}
      <div className="z-10 text-center max-w-xl px-4 text-white">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">{currentSlide.title}</h2>
        <p className="text-lg md:text-xl font-light">{currentSlide.description}</p>
      </div>
    </section>
  )
}
