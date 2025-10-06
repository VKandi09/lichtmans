import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import ProductCard from '../components/ProductCard'


const productsList = [
  {
    id: 1,
    name: 'Red Wine',
    price: 19.99,
    image: 'https://www.finewineandgoodspirits.com/ccstore/v1/images/?source=/file/v6521856860642915980/products/000005722_1006780_F1.jpg&height=475&width=475',
    stock: 10,
  },
  {
    id: 2,
    name: 'White Wine',
    price: 29.99,
    image: 'https://hips.hearstapps.com/hmg-prod/images/clausthaler-1563894333.jpg?crop=1xw:1xh;center,top',
    stock: 5,
  },
  {
    id: 3,
    name: 'Vodka',
    price: 19.99,
    image: 'https://topshelfwineandspirits.com/cdn/shop/products/Untitled-2copy_a2ef47b4-ead4-4342-96aa-7e3b6615e5aa.jpg?v=1621637524',
    stock: 10,
  },
  {
    id: 4,
    name: 'Whiskey',
    price: 25.99,
    image: 'https://thumbs.dreamstime.com/b/tequila-bottle-isolated-white-transparent-background-alcohol-drink-product-300810221.jpg',
    stock: 7,
  },
  {
    id: 5,
    name: 'Champagne',
    price: 89.99,
    image: 'https://hips.hearstapps.com/toc.h-cdn.co/assets/16/41/10.jpg?resize=980:*',
    stock: 0,
  },
  {
    id: 6,
    name: 'Bourbon',
    price: 29.99,
    image: 'https://media.glamour.com/photos/585c388d59442a6146269be9/master/w_1600%2Cc_limit/robert-mondavi-private-selection-aged-in-bourbon-barrels-cabernet-sauvignon_1.jpg',
    stock: 5,
  },
  {
    id: 7,
    name: 'Scotch',
    price: 20.99,
    image: 'https://whisky.my/cdn-cgi/image/width=1000,height=1000,fit=crop,quality=80,format=auto,onerror=redirect,metadata=none/wp-content/uploads/BAILEY%E2%80%99S-Irish-Cream.jpg',
    stock: 8,
  },
  {
    id: 8,
    name: 'Whiskey',
    price: 59.99,
    image: 'https://delmosa.com/cdn/shop/files/GeigerBlancdeBlanc.jpg?v=1737224992&width=533',
    stock: 3,
  },
  {
    id: 9,
    name: 'Gin',
    price: 29.99,
    image: 'https://www.wineworldinc.com/media/catalog/product/cache/df4d6ab77e3c9593d62f9004fba54da5/A/G/AG200_c3ed09njOji6kYQI.jpg',
    stock: 0,
  },
  {
    id: 10,
    name: 'Tequila',
    price: 34.99,
    image: 'https://target.scene7.com/is/image/Target/GUEST_bb1f22c5-d79a-48b5-bb39-37d1c4ed60d9',
    stock: 16,
  }
]

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProductsList = () => {
  const query = useQuery();
  const searchTerm = query.get("search")?.toLowerCase() || "";

  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 100])
  const [filteredProducts, setFilteredProducts] = useState(productsList);

  // Update slider background dynamically
  // useEffect(() => {
  //   const slider = document.getElementById('priceRange')
  //   if (slider) {
  //     const percentage = (priceRange[1] / 100) * 100
  //     slider.style.background = `linear-gradient(to right, #b91c1c ${percentage}%, #d1d5db ${percentage}%)` // red-800 & gray-300
  //   }
  // }, [priceRange])

  // const filteredProducts = productsList.filter((product) => {
  //   if (selectedCategory === 'InStock' && product.stock === 0) return false
  //   if (selectedCategory === 'OutOfStock' && product.stock > 0) return false
  //   if (product.price < priceRange[0] || product.price > priceRange[1]) return false
  //   return true
  // })

  useEffect(() => {
    let filtered = productsList;

    // Filter by stock
    filtered = filtered.filter((product) => {
      if (selectedCategory === "InStock" && product.stock === 0) return false;
      if (selectedCategory === "OutOfStock" && product.stock > 0) return false;
      return true;
    });

    // Filter by price
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by search term (exact or partial match)
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, priceRange, searchTerm]);

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto my-24 gap-6">
      {/* Sidebar Filter */}
      <aside className="w-full lg:w-1/4 p-4 border-r-1 border-gray-300">
        <h2 className="text-xl font-semibold mb-6">Filter Products</h2>

        {/* Stock Filter */}
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

        {/* Price Filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Price</h3>
          <input
            type="range"
            min={0}
            max={100}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            id="priceRange"
            className="w-full h-2 rounded-lg accent-red-800 cursor-pointer"
          />
          <p className="text-gray-600 mt-1">Up to ${priceRange[1]}</p>
        </div>
      </aside>

      {/* Products Grid */}
      <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.length === 0 ? (
          <p className="text-gray-600 col-span-full text-center">No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </main>
    </div>
  )
}

export default ProductsList