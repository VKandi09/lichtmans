import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar = ({ activePage, setActivePage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menu = [
    { key: "dashboard", label: "Dashboard" },
    { key: "view-products", label: "View All Products" },
    { key: "add-product", label: "Add New Product" },
    { key: "view-events", label: "View Events" },
    { key: "add-event", label: "Add New Event" },
  ];

  const handleMenuClick = (key) => {
    setActivePage(key);
    setIsMobileMenuOpen(false);
  };

  const SidebarContent = () => (
    <>
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">Store Admin</h2>
      <nav className="flex flex-col">
        {menu.map((item) => (
          <button
            key={item.key}
            onClick={() => handleMenuClick(item.key)}
            className={`text-left px-4 py-3 rounded mb-2 transition-colors duration-300 text-sm sm:text-base ${
              activePage === item.key ? "bg-rose-800" : "hover:bg-rose-700"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-2 left-4 z-40 text-gray-700 hover:text-white hover:rounded-lg p-3 hover:bg-rose-800 transition-colors"
        aria-label="Open menu"
      >
        <FiMenu size={24} />
      </button>

      {/* Desktop Sidebar - Always visible on large screens */}
      <aside className="hidden lg:flex w-64 bg-rose-900 text-white p-4 flex-col min-h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar - Sliding drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sliding Sidebar */}
          <aside className="fixed top-0 left-0 h-full w-[280px] sm:w-[320px] bg-rose-900 text-white p-4 shadow-lg z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto lg:hidden">
            {/* Close Button */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Store Admin</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:bg-rose-800 p-2 rounded transition-colors"
                aria-label="Close menu"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex flex-col">
              {menu.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleMenuClick(item.key)}
                  className={`text-left px-4 py-3 rounded mb-2 transition-colors duration-300 ${
                    activePage === item.key ? "bg-rose-800" : "hover:bg-rose-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>
        </>
      )}
    </>
  );
};

export default Sidebar;