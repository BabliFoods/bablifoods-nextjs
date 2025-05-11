import { FaFacebookF, FaInstagram, FaGlobe } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        
        {/* Column 1: Address */}
        <div>
          <h3 className="font-semibold text-base mb-2">Babli Food Products</h3>
          <p>Milkat No. 1085, Bhivri Village</p>
          <p>Taluka Purandar, District Pune</p>
          <p>Maharashtra – 412301, India</p>
        </div>

        {/* Column 2: Contact */}
        <div>
          <h3 className="font-semibold text-base mb-2">Contact</h3>
          <p>Email: <a href="mailto:bablifoodproducts@gmail.com" className="text-red-300 hover:underline">bablifoodproducts@gmail.com</a></p>
          <p>Phone 1: <a href="tel:+919325345500" className="text-red-300 hover:underline">+91 93253 45500</a></p>
          <p>Phone 2: <a href="tel:+919766255500" className="text-red-300 hover:underline">+91 97662 55500</a></p>
        </div>

        {/* Column 3: Socials */}
        <div>
          <h3 className="font-semibold text-base mb-2">Socials</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <FaGlobe className="text-lg" />
              <a href="https://www.bablifoods.com/" target="_blank" rel="noopener noreferrer" className="hover:underline text-red-300">
                bablifoods.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaFacebookF className="text-lg" />
              <a href="https://www.facebook.com/bablifoodsproducts/" target="_blank" rel="noopener noreferrer" className="hover:underline text-red-300">
                bablifoodsproducts
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaInstagram className="text-lg" />
              <a href="https://www.instagram.com/babli_foods/" target="_blank" rel="noopener noreferrer" className="hover:underline text-red-300">
                babli_foods
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom line */}
      <div className="text-center text-xs mt-8 border-t border-gray-700 pt-4 px-4">
        <p>&copy; {new Date().getFullYear()} Babli Food Products. All rights reserved.</p>
        <p>
          Website created by{' '}
          <a
            href="https://www.linkedin.com/in/mihir-gujarathi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-300 hover:underline"
          >
            Mihir Gujarathi
          </a>
        </p>
      </div>
    </footer>
  );
}
