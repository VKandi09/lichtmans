import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to products page with query param
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center border-gray-300 border-2 rounded-xl h-10 w-80 justify-between md:w-48 lg:w-64 focus-within:ring-2 focus-within:ring-red-800 focus-within:border-transparent"
    >
      <input
        type="text"
        placeholder="Search for items..."
        className="hidden md:inline-block px-3 py-1 focus:outline-none w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="submit"
        className="hidden md:inline-block text-gray-700 px-3 py-1 hover:text-red-800 focus:outline-none"
      >
        <FiSearch size={20} />
      </button>
    </form>
  );
};

export default SearchBox;
