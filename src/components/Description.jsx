import { motion } from 'framer-motion';
import Image from 'next/image'; // Import Image from Next.js

export default function Description() {
  return (
    <div>
      {/* Gradient Header */}
      {/* <div className="h-16 bg-gradient-to-b from-[#060606] to-red-600"></div> */}

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center py-[20vh] md:py-24 bg-red-600 px-4 text-yellow-50 text-center">
        
        {/* Animated Heading with toggle animation */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase leading-tight mb-6"
          initial={{ opacity: 0, y: 50 }} // Start off with opacity 0 and y 50px
          whileInView={{ opacity: 1, y: 0 }} // Fade in and move to original position when in view
          viewport={{ once: false, amount: 0.1 }} // Trigger when 10% of the element is in view, toggle animation every time it comes in/out
          transition={{ duration: 0.8 }} // 0.8 seconds animation duration
        >
          Welcome to BabliFoods
        </motion.h1>

        {/* Animated Description Text with toggle animation */}
        <motion.p
          className="max-w-3xl text-base sm:text-lg md:text-xl leading-relaxed"
          initial={{ opacity: 0, y: 50 }} // Start off with opacity 0 and y 50px
          whileInView={{ opacity: 1, y: 0 }} // Fade in and move to original position when in view
          viewport={{ once: false, amount: 0.1 }} // Trigger when 10% of the element is in view, toggle animation every time it comes in/out
          transition={{ duration: 0.8, delay: 0.3 }} // 0.8 seconds with a slight delay
        >
          Step into a world where every snack is an adventure! From crispy fryums to crunchy corn, we bring you the best of fun and flavor. Our playful, cartoon-style packaging is just the beginning – inside each bag, you’ll find snacks that are as exciting as they are tasty. Join the BabliFoods family and make snack time a whole lot more fun!
        </motion.p>
        
        {/* Animated Image */}
        <motion.div
          className="relative w-full max-w-4xl mt-8"
          initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and offset vertically
          whileInView={{ opacity: 1, y: 0 }} // Fade in and move to its position
          viewport={{ once: false, amount: 0.1 }} // Trigger animation when 10% of the element is in view
          transition={{ duration: 0.8, delay: 0.5 }} // Duration and delay of animation
        >
          <Image
            src="/images/shop.jpg" // Path to your image
            alt="Shop Image"
            layout="intrinsic" // Keep the original aspect ratio
            width={1000} // Set a width for the image
            height={667} // Set a height for the image (adjust as needed to maintain aspect ratio)
            className="rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </div>
  );
}
