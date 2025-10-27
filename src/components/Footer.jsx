import { Link } from "react-router-dom";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-black/5 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Logo / About */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Lichtman's Wine & Liquor</h2>
          <p className="text-sm text-gray-600 mb-4">
            Your trusted local destination for fine wines and spirits — serving
            the community with quality and care for decades.
          </p>
          <div className="flex space-x-4 mt-4">
            {/* Social Links */}
            <Link to="/" className="hover:text-red-800" aria-label="Instagram">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06..."
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link to="/" className="hover:text-red-800" aria-label="Twitter">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253..." />
              </svg>
            </Link>
            <Link to="/" className="hover:text-red-800" aria-label="GitHub">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484..."
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products?type=wine" className="hover:text-red-800">Wine</Link></li>
            <li><Link to="/products?type=whiskey" className="hover:text-red-800">Whiskey</Link></li>
            <li><Link to="/products?type=vodka" className="hover:text-red-800">Vodka</Link></li>
            <li><Link to="/products?type=tequila" className="hover:text-red-800">Tequila</Link></li>
            <li><Link to="/products?subType=bourbon" className="hover:text-red-800">Bourbon</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-red-800">About Us</Link></li>
            <li><Link to="/products" className="hover:text-red-800">Shop All</Link></li>
            <li><Link to="/specials" className="hover:text-red-800">Specials</Link></li>
            <li><Link to="/contact" className="hover:text-red-800">Contact Us</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-red-800">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <FiMapPin className="text-red-800 mt-1" />
              <span>
                50 Auert Avenue, North Utica Plaza,
                <br />
                Utica, NY 13502
              </span>
            </li>
            <li className="flex items-center gap-2">
              <FiPhone className="text-red-800" />
              <a href="tel:+13157924161" className="hover:text-red-800">(315)732-8915</a>
            </li>
            <li className="flex items-center gap-2">
              <FiMail className="text-red-800" />
              <a href="mailto:info@lichtmans.com" className="hover:text-red-800">liquors@manianigroup.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 py-4 text-center text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <Link to="/" className="hover:underline">
          Lichtman's Wine & Liquor Store Inc.
        </Link>{" "}
        — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
