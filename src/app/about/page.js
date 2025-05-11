'use client'

import Image from 'next/image'
import Link from 'next/link'

function About() {
  return (
    <main className="text-gray-800 bg-gray-50 pt-16">

      {/* Introduction Section */}
      <section className="bg-red-600 text-white py-16 px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Welcome to BabliFoods</h2>
        <p className="text-lg max-w-4xl mx-auto mb-6">
          Step into a world where every snack is an adventure! From crispy fryums to crunchy corn, we bring you the best of fun and flavor.
        </p>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Story</h2>
        <p className="text-lg max-w-3xl mx-auto mb-6">
          At BabliFoods, we believe that snack time should be more than just eating – it should be an experience! We have created a brand that brings excitement and fun to every bite. Our playful, cartoon-style packaging is just the beginning – inside each bag, you'll find crispy, flavorful snacks that everyone loves. Join the BabliFoods family and make every snack an adventure.
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="bg-gray-100 py-16 px-4 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-lg max-w-3xl mx-auto mb-6">
          Our mission is simple: to deliver the ultimate snacking experience – crispy, flavorful, and fun in every bite. We want every customer to savor the joy of a good snack, packed with taste, crunch, and a bit of adventure!
        </p>
      </section>

      {/* About the Founder Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Image */}
          <div className="flex-shrink-0 w-48 h-48 bg-gray-300 rounded-full overflow-hidden">
            <Image
              src="https://via.placeholder.com/150"
              alt="Founder - Shekhar Nadar"
              className="object-cover w-full h-full"
              width={150}
              height={150}
            />
          </div>

          {/* Text */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">About the Founder</h2>
            <p className="text-lg max-w-3xl">
              BabliFoods was founded by <b>Shekhar Nadar</b>, a passionate foodie and entrepreneur who believes that snacks should be as exciting as they are delicious. With a vision to bring joy to snack time, Shekhar created BabliFoods with the goal of revolutionizing the snack industry with a focus on fun, flavor, and quality. Today, BabliFoods is a beloved brand, and its playful packaging and innovative snacks have made it a household name.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="bg-red-600 text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          We’d love to hear from you! If you have any questions or want to learn more about BabliFoods, feel free to reach out.
        </p>
        <Link
          href="/contact"
          className="bg-white text-red-600 font-semibold px-8 py-3 rounded-full hover:bg-red-100 transition"
        >
          Contact Us
        </Link>
      </section>

    </main>
  )
}

export default About
