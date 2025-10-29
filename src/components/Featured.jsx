import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../api";

const Featured = () => {
  const [featured, setFeatured] = useState([]);

  function capitalizeWords(str) {
    // if (!str) return '';
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/products/featured`);
        if (!response.ok) throw new Error("Failed to fetch featured products");
        const data = await response.json();
        let uniqueTypes = new Set();
        const formatted = data
          .filter(item => {
            if (!item.type) return false; // Skip items without type
            const lowerType = item.type.toLowerCase();
            if (uniqueTypes.has(lowerType)) {
              return false; // Skip duplicate type
            }
            uniqueTypes.add(lowerType);
            return true; // Keep first occurrence
          })  // Remove items without type
          .map(item => ({
          ...item,
          type: capitalizeWords(item.type) // Capitalize the type field
        }));
        setFeatured(formatted);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="py-15 bg-black/5">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-rose-900 mb-8">
          Featured Products
        </h1>
        <div className="flex justify-center">
          <div
            className="
              grid
              gap-6
              justify-items-center
              justify-center
              auto-cols-fr
              grid-flow-row
              w-full
              max-w-[1200px]
            "
            style={{
              gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
            }}
          >
            {featured.map((item, index) => (
              <Link
                key={index}
                to={`/products?type=${(item.type)}`}
                className="bg-white w-60 h-60 rounded-lg shadow hover:shadow-lg transition duration-300 border border-gray-200 p-4 flex flex-col items-center cursor-pointer"
              >
                <img 
                  src={item.image || '/images/placeholder-bottle.png'} 
                  alt={item.type} 
                  className="h-40 w-40 object-contain mb-3"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/images/placeholder-bottle.png'; }}
                />
                <h2 className="text-md font-semibold text-gray-700 text-center">
                  {item.type}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;

