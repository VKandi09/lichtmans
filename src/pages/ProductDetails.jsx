import { useLocation, Link } from 'react-router-dom';
import { FiChevronLeft, FiX } from "react-icons/fi";
import { useState } from 'react';

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state?.product;
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!product) {
    return (
      <div className='flex justify-center items-center h-screen w-full'>
        <p className='text-lg text-gray-700 p-4 items-center'>Product not found.</p>
        <Link to="/products" className="text-blue-500 hover:underline ml-2">Go back to Products</Link>
      </div>
    )
  }

  return (
    <div className='relative'>
      <Link to="/products" className="flex gap-2 items-center text-gray-700 hover:text-red-800 absolute top-15 left-10">
        <FiChevronLeft /> Back to Products
      </Link>
      <div className='flex items-center h-screen w-full gap-6'>
        <div className='flex flex-col justify-self-start items-center p-8 mx-45 border border-gray-200 rounded-lg shadow cursor-zoom-in hover:scale-[1.02] transition-transform duration-300'
          onClick={() => setIsModalOpen(true)} >
          <img src={product.image && product.image !== "" ? product.image : "/images/placeholder-bottle.png"} alt={product.name} className='w-100 h-150 object-contain'/>
        </div>
        <div className='flex flex-col items-start justify-start'> 
          <h1 className='text-2xl font-semibold text-gray-800 mb-4'>{product.name}</h1>
          <p className="text-xl text-gray-600 mb-2">${product.price}</p>
          {product.stock === 0 ? (
            <p className="text-red-500">Out of Stock</p>
          ) : (
            <p className="text-green-500">In Stock</p>
          )}
        </div>
      </div>
      {/* Image Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="relative">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-8 -right-8 bg-white text-black rounded-full p-2 hover:bg-gray-200 transition"
            >
              <FiX size={20} />
            </button>

            {/* Large image */}
            <img
              src={product.image && product.image !== "" ? product.image : "/images/placeholder-bottle.png"}
              alt={product.name}
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetails
