import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import SearchBox from "./Search";

const Header = () => {
  const navigate = useNavigate();
  const [desktopActiveDropdown, setDesktopActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);

  const menuItems = [
    {
      title: "Wines",
      path: "/products?type=wine",
    },
    {
      title: "Spirits",
      links: [
        { name: "Bourbon", path: "/products?subType=bourbon" },
        { name: "Whiskey", path: "/products?type=whiskey" },
        { name: "Vodka", path: "/products?type=vodka" },
        { name: "Tequila", path: "/products?type=tequila" },
      ]
    },
    {
      title: "Specials",
      path: "/products/specials",
    },
    // {
    //   title: "All Products",
    //   path: "/products",
    // },
    {
      title: "Events",
      path: "/events",
    },
    {
      title: "Contact Us",
      path: "/contact",
    },
  ];

  return (
    <header className="fixed top-0 left-0 bg-white w-full shadow z-50">
      <div className="max-w-8xl mx-auto flex px-4 sm:px-8 py-4 items-center justify-between w-full">
        <Link to="/" className="text-gray-700 hover:text-rose-800 text-base md:text-xl font-bold">
          <img
            src="/images/logo.svg"
            alt="Lichtman's Logo"
            className="rounded-md inline h-10 w-auto md:mr-4"
          />
          <span className="hidden sm:inline">Lichtman's Wine & Liquor Store Inc.</span>
          {/* <span className="sm:hidden">Lichtman's</span> */}
        </Link>
        <nav className="hidden md:flex items-start gap-8 relative">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="group relative"
            >
              { item.links ? (
                <div 
                  onMouseEnter={() => setDesktopActiveDropdown(index)}
                  onMouseLeave={() => setDesktopActiveDropdown(null)}
                >
                  <button
                      className="text-gray-700 hover:text-rose-800 font-medium cursor-pointer"
                    >
                    {item.title}
                    </button>
                    {/* Dropdown */}
                    {desktopActiveDropdown === index && (
                      <div
                        className='absolute top-4 left-0 bg-white shadow-lg rounded-lg mt-2 py-2 w-52 outline-1 outline-gray-200'>
                        {item.links.map((link, linkIndex) => (
                          <Link
                            key={linkIndex}
                            to={link.path}
                            className="block px-4 py-2 text-gray-700 hover:text-rose-800"
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    )}
                </div>
              ) : (
                <button
                  className="text-gray-700 hover:text-rose-800 font-medium cursor-pointer"
                  onClick={() => navigate(item.path)}
                >
                    {item.title}
                  </button>
              )}
            
            </div>
          ))}
        </nav>
        {/* Search box */}
        <SearchBox />
        <button
          className="md:hidden text-gray-700 hover:text-rose-800 focus:outline-none relative z-[60] flex-shrink-0 cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX size={25}/> : <FiMenu size={25} />}
        </button>
      </div>
      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] sm:w-[320px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0 pointer-events-auto" : "-translate-x-full pointer-events-none"
        }`}
      >
        <h2 className="py-5 text-center text-md font-bold">Lichtman's Wine & Liquor Store Inc.</h2>
        <div className="p-4">
          {menuItems.map((item, index) => (
            <div key={index} className="mb-4">
              {item.links ? (
                <>
                  <button
                    className="w-full text-left font-medium text-gray-700 hover:text-rose-800 flex justify-between items-center py-2 cursor-pointer"
                    onClick={() =>
                      setMobileActiveDropdown(mobileActiveDropdown === index ? null : index)
                    }
                  >
                    {item.title}
                    <span>{mobileActiveDropdown === index ? <FiChevronUp /> : <FiChevronDown />}</span>
                  </button>

                  {/* Mobile Submenu */}
                  {mobileActiveDropdown === index && (
                    <div className="pl-4 mt-1">
                      {item.links.map((link, linkIndex) => (
                        <Link
                          key={linkIndex}
                          to={link.path}
                          className="block px-2 py-1 text-gray-700 hover:text-rose-800 rounded"
                          onClick={() => setIsMobileMenuOpen(false)} // close menu on click
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <button
                  className="text-gray-700 hover:text-rose-800 font-medium cursor-pointer"
                  onClick={() => {navigate(item.path), setIsMobileMenuOpen(false)}}
                >
                    {item.title}
                  </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </header>
  )
}

export default Header