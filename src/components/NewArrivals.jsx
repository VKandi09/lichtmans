import { Link, useNavigate } from "react-router-dom";

const newArrivals = [
  { 
    id: 1, 
    name: "La Marca Prosecco", 
    price: 15.99, 
    image: "https://www.finewineandgoodspirits.com/ccstore/v1/images/?source=/file/v6521856860642915980/products/000005722_1006780_F1.jpg&height=475&width=475"
  },
  { 
    id: 2, 
    name: "Jameson Irish Whiskey", 
    price: 34.99, 
    image: "https://topshelfwineandspirits.com/cdn/shop/products/Untitled-2copy_a2ef47b4-ead4-4342-96aa-7e3b6615e5aa.jpg?v=1621637524"
  },
  { 
    id: 3, 
    name: "Kendall-Jackson Chardonnay", 
    price: 12.49 ,
    image: "https://www.wineworldinc.com/media/catalog/product/cache/df4d6ab77e3c9593d62f9004fba54da5/A/G/AG200_c3ed09njOji6kYQI.jpg"
  },
  { 
    id: 4, 
    name: "Tito’s Handmade Vodka", 
    price: 19.99, 
    image: "https://thumbs.dreamstime.com/b/tequila-bottle-isolated-white-transparent-background-alcohol-drink-product-300810221.jpg"
  },
  { 
    id: 5, 
    name: "Josh Cellars Cabernet Sauvignon", 
    price: 13.99, 
    image: "https://target.scene7.com/is/image/Target/GUEST_bb1f22c5-d79a-48b5-bb39-37d1c4ed60d9"
  },
];

const NewArrivals = () => {
  const navigate = useNavigate();

  const handleProductDetails = (product) => {
    navigate(`/products/${product.id}`, { state: { product } });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-22">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">New Arrivals</h2>
        <Link
          to="/new-products"
          className="flex items-center text-gray-800 hover:text-rose-800 transition"
        >
          View All
          <svg
            className="w-5 h-5 ml-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {newArrivals.map((product) => (
          <div
            key={product.id}
            className="rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col"
          >
            <p className="text-rose-800 text-sm text-end m-3">New</p>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-contain"
            />
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-semibold text-gray-800 text-sm text-center mb-1">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm text-center mt-auto">${product.price}</p>
              <button onClick={() => handleProductDetails(product)} className="mt-4 w-full text-white bg-rose-800 hover:bg-rose-700 rounded-lg text-xs py-2 px-4 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
