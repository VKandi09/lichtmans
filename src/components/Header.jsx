import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX, FiChevronDown, FiChevronUp, FiUser, FiSearch } from "react-icons/fi";

const Header = () => {
  const navigate = useNavigate();
  const [desktopActiveDropdown, setDesktopActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);

  const menuItems = [
    {
      title: "Wines",
      links: [
        { name: "Red Wine", path: "/products" },
        { name: "White Wine", path: "/products" },
        { name: "Rosé Wine", path: "/products" },
        { name: "Sparkling Wine", path: "/products" },
        { name: "Dessert Wine", path: "/products" },
      ]
    },
    {
      title: "Spirits",
      links: [
        { name: "Whiskey", path: "/products" },
        { name: "Vodka", path: "/products" },
        { name: "Rum", path: "/products" },
        { name: "Gin", path: "/products" },
        { name: "Tequila", path: "/products" },
      ]
    },
    {
      title: "Top Sellers",
      links: [
        { name: "Bestselling Wines", path: "/products" },
        { name: "Bestselling Spirits", path: "/products" },
        { name: "Bestselling Beers", path: "/products" },
      ]
    },
    {
      title: "Events",
      path: "/events",
    },
  ];

  return (
    <header className="fixed top-0 left-0 bg-white w-full shadow z-50">
      <div className="max-w-7xl mx-auto px-4 flex py-4 items-center justify-between w-full">
        <Link to="/" className="text-gray-700 hover:text-red-800 text-base md:text-xl font-bold truncate mr-4">
          <span className="hidden sm:inline">Lichtman's Wine & Liquor Store Inc.</span>
          <span className="sm:hidden">Lichtman's</span>
        </Link>
        {/* <Link to="/" className="text-sm sm:text-base md:text-xl font-bold flex-shrink-0">Lichtman's Wine & Liquor Store Inc.</Link> */}
        <nav className="hidden md:flex items-center gap-6 relative">
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
                      className="text-gray-700 hover:text-red-800 font-medium cursor-pointer"
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
                            className="block px-4 py-2 text-gray-700 hover:text-red-800"
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    )}
                </div>
              ) : (
                <button
                  className="text-gray-700 hover:text-red-800 font-medium cursor-pointer"
                  onClick={() => navigate(item.path)}
                >
                    {item.title}
                  </button>
              )}
             
            </div>
          ))}
        </nav>
        {/* Search box */}
        <div className="flex items-center border-gray-300 border-2 rounded-xl h-10 w-42 justify-between md:w-48 lg:w-64 focus-within:ring-2 focus-within:ring-red-800 focus-within:border-transparent ">
          <input
            type="text"
            placeholder="Search for items..."
            className="hidden md:inline-block px-3 py-1 focus:outline-none"
          />
          <button className="hidden md:inline-block text-gray-700 px-3 py-1 hover:text-red-800 focus:outline-none">
            <FiSearch size={20} />
          </button>
        </div>
        <div>
          <FiUser size={25} className="text-gray-700 hover:text-red-800 cursor-pointer" />
        </div>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-red-800 focus:outline-none relative z-[60] flex-shrink-0 cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX size={25}/> : <FiMenu size={25} />}
        </button>
      </div>
      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-75 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0 pointer-events-auto" : "-translate-x-full pointer-events-none"
        }`}
      >
        <h2 className="py-5 text-center text-md font-bold">Lichtman's Wine & Liquor Store Inc.</h2>
        <div className="p-4">
          {menuItems.map((item, index) => (
            <div key={index} className="mb-2">
              <button
                className="w-full text-left font-medium text-gray-700 hover:text-red-800 flex justify-between items-center py-2 cursor-pointer"
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
                      className="block px-2 py-1 text-gray-700 hover:text-red-800 rounded"
                      onClick={() => setIsMobileMenuOpen(false)} // close menu on click
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
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