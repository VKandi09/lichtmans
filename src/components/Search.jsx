import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      console.log("Searching for:", searchTerm.trim());
      setSearchTerm("");
      setIsSearchOpen(false);
    }
  };

  const handleSearchIconClick = () => {
    setIsSearchOpen(true);
  };

  const handleBlur = () => {
    // Delay to allow form submission to complete
    setTimeout(() => {
      setIsSearchOpen(false);
    }, 150);
  };

  return (
    <>
      {/* Desktop Search Box - always visible */}
      <div
        className="hidden md:flex items-center border-gray-300 border-2 rounded-full h-10 w-48 lg:w-80 justify-between focus-within:ring-2 focus-within:ring-rose-800 focus-within:border-transparent"
      >
        <input
          type="text"
          placeholder="Search for items..."
          className="px-3 py-1 focus:outline-none w-full rounded-l-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch(e);
          }}
        />
        <button
          onClick={handleSearch}
          className="text-gray-700 px-3 py-1 hover:text-rose-800 focus:outline-none"
        >
          <FiSearch size={20} />
        </button>
      </div>

      {/* Mobile Search Icon */}
      <button
        onClick={handleSearchIconClick}
        className="md:hidden text-gray-700 p-2 hover:text-rose-800 focus:outline-none"
        aria-label="Open search"
      >
        <FiSearch size={24} />
      </button>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <>
          {/* Backdrop with blur */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsSearchOpen(false)}
          />
          
          {/* Search Bar Below Header */}
          <div className="fixed top-16 left-0 right-0 z-50 bg-white shadow-lg p-4 md:hidden">
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center border-gray-300 border-2 rounded-full h-12 focus-within:ring-2 focus-within:ring-rose-800 focus-within:border-transparent">
                <input
                  type="text"
                  placeholder="Search for items..."
                  className="px-4 py-2 focus:outline-none w-full rounded-l-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onBlur={handleBlur}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch(e);
                  }}
                  autoFocus
                />
                <button
                  onClick={handleSearch}
                  className="text-gray-700 px-4 py-2 hover:text-rose-800 focus:outline-none"
                >
                  <FiSearch size={22} />
                </button>
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-gray-700 p-2 hover:text-rose-800 focus:outline-none"
                aria-label="Close search"
              >
                <FiX size={24} />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SearchBox;