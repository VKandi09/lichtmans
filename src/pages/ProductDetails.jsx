import { useLocation, Link } from 'react-router-dom';
import { FiChevronLeft, FiX } from "react-icons/fi";
import { useState } from 'react';

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state?.product;
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <p className="text-lg text-gray-700 p-4 items-center">Product not found.</p>
        <Link to="/products" className="text-blue-500 hover:underline ml-2">
          Go back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-8">
      {/* Back button */}
      <Link
        to="/products"
        className="flex gap-2 items-center text-gray-700 hover:text-red-800 absolute top-8 left-8"
      >
        <FiChevronLeft /> Back to Products
      </Link>

      {/* Product Content */}
      <div className="flex items-center h-screen w-full top-3">
        {/* Product Image */}
        <div
          className="flex flex-col justify-self-start items-start p-8 mx-20 border border-gray-200 rounded-lg shadow cursor-zoom-in hover:scale-[1.02] transition-transform duration-300"
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={
              product.image && product.image !== ""
                ? product.image
                : "/images/placeholder-bottle.png"
            }
            alt={product.name}
            className="w-100 h-150 object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col items-start justify-start w-full lg:w-1/2 gap-5">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            {product.name}
          </h1>

          {/* Description */}
          {product.description && (
            <p className="text-gray-700 leading-relaxed mb-2">
              {product.description}
            </p>
          )}

          {/* Product availability */}
          <p className="text-green-600 font-medium">
            In Stock
          </p>
        
          <p className="text-xl text-gray-600 mb-2">${product.price}</p>

          {/* Product details */}
          <div className='flex flex-col gap-1'>
            <p className="text-xl font-semibold text-gray-600">Product details</p>
            <p className="text-sm italic text-gray-600">Brand : <span className='font-semibold italic'>{product.brand}</span></p>
            <p className="text-sm italic text-gray-600">Type of product : <span className='font-semibold italic'>{product.type}</span></p>
            { product.subType ? <p className="text-sm italic text-gray-600">Style : <span className='font-semibold italic'>{product.subType}</span></p> : null }
            <p className="text-sm italic text-gray-600">Bottle size : <span className='font-semibold italic'>{product.quantity}ml</span></p>
          </div>

          {/* Contact Link */}
          <p className="text-gray-600 mt-4">
            To place an order, please{" "}
            <Link
              to="/contact"
              className="text-red-800 font-medium hover:underline"
            >
              contact us
            </Link>.
          </p>
        </div>
      </div>

      {/* Image Modal */}
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

            {/* Enlarged Image */}
            <img
              src={
                product.image && product.image !== ""
                  ? product.image
                  : "/images/placeholder-bottle.png"
              }
              alt={product.name}
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
