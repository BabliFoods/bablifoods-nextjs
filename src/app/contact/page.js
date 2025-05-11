import React from 'react';

export default function Contact() {
  return (
    <div className="min-h-screen pt-24 px-4 py-10 bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        
        {/* Contact Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-red-600">Contact Us</h1>
          <div>
            <h2 className="font-semibold">Babli Food Products</h2>
            <p>Milkat No. 1085, Bhivri Village</p>
            <p>Taluka Purandar, District Pune</p>
            <p>412301 Maharashtra, India</p>
          </div>
          <div>
            <p>Email: <a href="mailto:bablifoodproducts@gmail.com" className="text-red-500 hover:underline">bablifoodproducts@gmail.com</a></p>
            <p>Phone: <a href="tel:+919325345500" className="text-red-500 hover:underline">+91 93253 45500</a></p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Send a Message</h2>
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input type="text" className="w-full mt-1 px-3 py-2 border rounded" placeholder="Your Name" />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" className="w-full mt-1 px-3 py-2 border rounded" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea rows="4" className="w-full mt-1 px-3 py-2 border rounded" placeholder="Your message..."></textarea>
          </div>
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
            Send
          </button>
        </form>
      </div>

      {/* Google Maps Section */}
      <div className="mt-16 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Find Us Here</h2>
        <div className="w-full h-96">
          <iframe
            title="Babli Food Products Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60336.36594204875!2d73.90328771050596!3d18.34872022753909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc3f337aaaaaaab%3A0xabcdef1234567890!2sBhivri%2C%20Maharashtra%20412301!5e0!3m2!1sen!2sin!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
