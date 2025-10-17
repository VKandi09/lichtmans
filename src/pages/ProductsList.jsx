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

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  function capitalizeWords(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "http://localhost:5001/api/products";
        if (location.pathname === ("/products/specials")) {
          url = "http://localhost:5001/api/products/specials";
        } else if (typeFilter) {
          url += `?type=${typeFilter}`;
        }
        const res = await fetch(url);
        console.log("Fetching products from:", url);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        const formattedData = data.map(p => ({
          ...p,
          name: capitalizeWords(p.name),
          type: capitalizeWords(p.type),
          brand: capitalizeWords(p.brand),
      }));
        setFilteredProducts(formattedData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [location.pathname, typeFilter]);

  // Filter products dynamically
  const displayedProducts = filteredProducts.filter((product) => {
    if (selectedCategory === "InStock" && product.stock === 0) return false;
    if (selectedCategory === "OutOfStock" && product.stock > 0) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm)) return false;
    return true;
  });

  if (loading) return <p className='top-20'>Loading products...</p>;

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto my-24 gap-6">
      {/* Sidebar Filter */}
      <aside className="w-full lg:w-1/4 p-4 border-r-1 border-gray-300">
        <h2 className="text-xl font-semibold mb-6">Filter Products</h2>
        <div className="mb-6">
          <h3 className="font-medium mb-2">Stock</h3>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-red-800 focus:border-transparent focus:outline-none"
          >
            <option value="All">All</option>
            <option value="InStock">In Stock</option>
            <option value="OutOfStock">Out of Stock</option>
          </select>
        </div>

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
      </aside>

      {/* Products Grid */}
      <div className='flex flex-col w-full lg:w-3/4 px-4'>
        <h2 className="text-2xl font-bold mb-4">
          {typeFilter ? `${capitalizeWords(typeFilter)} Products` : location.pathname === "/products/specials" ? "Special Products" : "All Products"}
        </h2>
        <p className="text-gray-600 mb-6">{displayedProducts.length === 1 ? `${displayedProducts.length} product found` : `${displayedProducts.length} products found`}</p>
        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedProducts.length === 0 ? (
            <p className="text-gray-600 col-span-full text-center">No products found.</p>
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
