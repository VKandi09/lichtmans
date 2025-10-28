import { useState, useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import ProductCard from '../components/ProductCard';
import { FiFilter, FiX, FiChevronRight, FiHome } from "react-icons/fi";
import { API_BASE } from '../api';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProductsList = () => {
  const location = useLocation();
  const query = useQuery();
  const searchTerm = query.get("search")?.toLowerCase() || "";
  const typeFilter = query.get("type")?.toLowerCase() || "";
  const subTypeFilter = query.get("subType")?.toLowerCase() || "";

  // State setup
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [subTypes, setSubTypes] = useState([]);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSubTypes, setSelectedSubTypes] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({
    brands: [],
    types: [],
    subTypes: [],
  });

  const [sortOption, setSortOption] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  function capitalizeWords(str) {
    if (!str) return '';
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `${API_BASE}/api/products`;
        if (location.pathname === "/products/specials") {
          url = `${API_BASE}/api/products/specials`;
        } else if (typeFilter) {
          url += `?type=${typeFilter}`;
        } else if (subTypeFilter) {
          url += `?subType=${subTypeFilter}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        const formattedData = data.map(p => ({
          ...p,
          name: capitalizeWords(p.name),
          type: capitalizeWords(p.type),
          brand: capitalizeWords(p.brand),
          subType: capitalizeWords(p.subType),
        }));

        setFilteredProducts(formattedData);
        setBrands([...new Set(formattedData.map(p => p.brand).filter(Boolean))]);
        setTypes([...new Set(formattedData.map(p => p.type).filter(Boolean))]);
        setSubTypes([...new Set(formattedData.map(p => p.subType).filter(Boolean))]);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location.pathname, typeFilter, subTypeFilter]);

    // Handle checkbox selection toggles
  const handleCheckboxChange = (value, selectedList, setSelectedList) => {
    if (selectedList.includes(value)) {
      setSelectedList(selectedList.filter((v) => v !== value));
    } else {
      setSelectedList([...selectedList, value]);
    }
  };
  // Apply filters manually
  const applyFilters = () => {
    setAppliedFilters({
      brands: selectedBrands,
      types: selectedTypes,
      subTypes: selectedSubTypes,
    });
    setIsFilterOpen(false);
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedTypes([]);
    setSelectedSubTypes([]);
    setAppliedFilters({
      brands: [],
      types: [],
      subTypes: [],
    });
    setPriceRange([0, 5000]);
    setSortOption('');
  };

  // Displayed products after filters
  let displayedProducts = filteredProducts.filter(product => {
    if (appliedFilters.brands.length && !appliedFilters.brands.includes(product.brand.toLowerCase())) return false;
    if (appliedFilters.types.length && !appliedFilters.types.includes(product.type.toLowerCase())) return false;
    if (appliedFilters.subTypes.length && !appliedFilters.subTypes.includes(product.subType.toLowerCase())) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm)) return false;
    return true;
  });

  // Apply sorting
  if (sortOption === 'lowToHigh') {
    displayedProducts = [...displayedProducts].sort((a, b) => a.price - b.price);
  } else if (sortOption === 'highToLow') {
    displayedProducts = [...displayedProducts].sort((a, b) => b.price - a.price);
  }

  if (loading) return <p className='mt-20 text-center text-gray-600'>Loading products...</p>;

  // Remove chip
  const removeChip = (filterType, value) => {
    const updated = { ...appliedFilters };
    updated[filterType] = updated[filterType].filter(v => v !== value);
    setAppliedFilters(updated);

    // Update corresponding selected states
    if (filterType === "brands") {
      setSelectedBrands(prev => prev.filter(v => v !== value));
    } else if (filterType === "types") {
      setSelectedTypes(prev => prev.filter(v => v !== value));
    } else if (filterType === "subTypes") {
      setSelectedSubTypes(prev => prev.filter(v => v !== value));
    }
  };

  const FilterContent = () => (
    <>
      <h2 className="text-xl font-semibold mb-6">Filter Products</h2>

      {/* Brand Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Brand</h3>
        <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
          {brands.map((brand, idx) => (
            <label key={idx} className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                value={brand.toLowerCase()}
                checked={selectedBrands.includes(brand.toLowerCase())}
                onChange={() =>
                  handleCheckboxChange(
                    brand.toLowerCase(),
                    selectedBrands,
                    setSelectedBrands
                  )
                }
                className="accent-rose-800 cursor-pointer"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Type</h3>
        <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
          {types.map((type, idx) => (
            <label key={idx} className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                value={type.toLowerCase()}
                checked={selectedTypes.includes(type.toLowerCase())}
                onChange={() =>
                  handleCheckboxChange(
                    type.toLowerCase(),
                    selectedTypes,
                    setSelectedTypes
                  )
                }
                className="accent-rose-800 cursor-pointer"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Sub-Type Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Sub-Type</h3>
        <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
          {subTypes.map((sub, idx) => (
            <label key={idx} className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                value={sub.toLowerCase()}
                checked={selectedSubTypes.includes(sub.toLowerCase())}
                onChange={() =>
                  handleCheckboxChange(
                    sub.toLowerCase(),
                    selectedSubTypes,
                    setSelectedSubTypes
                  )
                }
                className="accent-rose-800 cursor-pointer"
              />
              {sub}
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Price</h3>
        <input
          type="range"
          min={0}
          max={5000}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          className="w-full h-2 rounded-lg accent-rose-800 cursor-pointer"
        />
        <p className="text-gray-600 mt-1">Up to ${priceRange[1]}</p>
      </div>

      {/* Sort Option */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Sort By</h3>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-rose-800 focus:border-transparent focus:outline-none cursor-pointer"
        >
          <option value="">Default</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>
      {/* Buttons */}
      <div className="flex gap-3 mt-8">
        <button
          onClick={applyFilters}
          className="flex-1 bg-rose-800 text-white py-2 rounded-lg hover:bg-rose-900 transition cursor-pointer"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFilters}
          className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
        >
          Reset
        </button>
      </div>
    </>
  );

  return (
    <div className='flex flex-col max-w-8xl mx-auto p-4'>
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-gray-500 mb-2 sm:mb-4 mt-4">
        <Link to="/" className="flex items-center hover:text-rose-800">
          <FiHome className="mr-1" /> Home
        </Link>
        <FiChevronRight className="mx-2" />
        <span className="text-rose-800 font-medium">Products</span>
      </nav>
      <div className='flex flex-col items-center justify-center mt-3 lg:mt-2 text-center'>          
          <h1 className="text-2xl font-bold mb-4">
            {subTypeFilter
              ? `${capitalizeWords(subTypeFilter)}`
              : typeFilter
              ? `${capitalizeWords(typeFilter)}`
              : location.pathname === "/products/specials"
              ? "Special"
              : "All Products"}
          </h1>
          <p className="text-gray-600 mb-6">
            {displayedProducts.length === 1
              ? `${displayedProducts.length} product found`
              : `${displayedProducts.length} products found`}
          </p>
          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2 justify-center mb-2">
            {Object.entries(appliedFilters).map(([key, values]) =>
              values.map((v) => (
                <div
                  key={`${key}-${v}`}
                  className="flex items-center bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {capitalizeWords(v)}
                  <button
                    onClick={() => removeChip(key, v)}
                    className="ml-2 text-gray-800 hover:bg-gray-400 hover:rounded-full p-1 cursor-pointer"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 bg-rose-800 text-white px-4 py-2 rounded-lg mb-4 hover:bg-rose-900 transition-colors w-fit"
        >
          <FiFilter size={20} />
          Filters
        </button>
      <div className="flex flex-col lg:flex-row my-4 lg:my-10 gap-6">
        {/* Sidebar Filter */}
        <aside className="hidden lg:block w-1/4 p-6 border-r border-gray-300 sticky top-20 self-start">
          <FilterContent />
        </aside>
        {/* Mobile Filter Overlay */}
        {isFilterOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/30 z-40 lg:hidden"
              onClick={() => setIsFilterOpen(false)}
            />
            {/* Sliding Filter Panel */}
            <aside className="fixed top-0 left-0 h-full w-[280px] sm:w-[320px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto lg:hidden">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-700 hover:text-rose-800 p-1"
                  aria-label="Close filters"
                >
                  <FiX size={24} />
                </button>
              </div>
              <div className="p-6">
                <FilterContent />
              </div>
            </aside>
            </>
        )}
        {/* Products Grid */}
        <div className="items-center flex flex-col w-full px-2 lg:px-4">
          {/* <div className='items-center justify-center mb-6'>          
            <h1 className="text-2xl font-bold mb-4">
              {subTypeFilter
                ? `${capitalizeWords(subTypeFilter)}`
                : typeFilter
                ? `${capitalizeWords(typeFilter)}`
                : location.pathname === "/products/specials"
                ? "Special"
                : "All Products"}
            </h1>
            <p className="text-gray-600 mb-6">
              {displayedProducts.length === 1
                ? `${displayedProducts.length} product found`
                : `${displayedProducts.length} products found`}
            </p>
          </div> */}

          <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayedProducts.length === 0 ? (
              <p className="text-gray-600 col-span-full text-center">
                No products found.
              </p>
            ) : (
              displayedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
