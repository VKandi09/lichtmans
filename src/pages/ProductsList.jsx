import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import ProductCard from '../components/ProductCard';

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
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSubType, setSelectedSubType] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [loading, setLoading] = useState(true);

  function capitalizeWords(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "http://localhost:5001/api/products";
        if (location.pathname === "/products/specials") {
          url = "http://localhost:5001/api/products/specials";
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

  // Apply filters dynamically
  let displayedProducts = filteredProducts.filter((product) => {
    if (selectedBrand && product.brand.toLowerCase() !== selectedBrand) return false;
    if (selectedType && product.type.toLowerCase() !== selectedType) return false;
    if (selectedSubType && product.subType.toLowerCase() !== selectedSubType) return false;
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

  return (
    <div className="flex flex-col lg:flex-row max-w-8xl mx-auto my-10 gap-6">
      {/* Sidebar Filter */}
      <aside className="w-full lg:w-1/4 p-6 border-r border-gray-300">
        <h2 className="text-xl font-semibold mb-6">Filter Products</h2>

        {/* Brand Filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Brand</h3>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-red-800 focus:border-transparent focus:outline-none"
          >
            <option value="">All Brands</option>
            {brands.map((brand, idx) => (
              <option key={idx} value={brand.toLowerCase()}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Type</h3>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-red-800 focus:border-transparent focus:outline-none"
          >
            <option value="">All Types</option>
            {types.map((type, idx) => (
              <option key={idx} value={type.toLowerCase()}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Sub-Type Filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Sub-Type</h3>
          <select
            value={selectedSubType}
            onChange={(e) => setSelectedSubType(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-red-800 focus:border-transparent focus:outline-none"
          >
            <option value="">All Sub-Types</option>
            {subTypes.map((sub, idx) => (
              <option key={idx} value={sub.toLowerCase()}>
                {sub}
              </option>
            ))}
          </select>
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
            className="w-full h-2 rounded-lg accent-red-800 cursor-pointer"
          />
          <p className="text-gray-600 mt-1">Up to ${priceRange[1]}</p>
        </div>

        {/* Sort Option */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Sort By</h3>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-red-800 focus:border-transparent focus:outline-none"
          >
            <option value="">Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </aside>

      {/* Products Grid */}
      <div className="flex flex-col w-full px-2 lg:px-4">
        <h2 className="text-2xl font-bold mb-4">
          {subTypeFilter
            ? `${capitalizeWords(subTypeFilter)} Products`
            : typeFilter
            ? `${capitalizeWords(typeFilter)} Products`
            : location.pathname === "/products/specials"
            ? "Special Products"
            : "All Products"}
        </h2>
        <p className="text-gray-600 mb-6">
          {displayedProducts.length === 1
            ? `${displayedProducts.length} product found`
            : `${displayedProducts.length} products found`}
        </p>

        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
  );
};

export default ProductsList;
