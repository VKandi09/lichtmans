import React from 'react';
import { useLocation, Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';

const ProductDetails = () => {
  // const { id } = useParams();
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return (
      <div className='flex justify-center items-center h-screen w-full'>
        <p className='text-lg text-gray-700 p-4 items-center'>Product not found.</p>
        <Link to="/products" className="text-blue-500 hover:underline ml-2">Go back to Products</Link>
      </div>
    )
  }

  return (
    <div>
      <Link to="/products" className="text-gray-700 hover:text-red-800 ml-2 absolute top-20 left-10">← Back to Products</Link>
      <div className='flex justify-center items-center h-screen w-full gap-6'>
        <div className='flex justify-self-center items-center border border-gray-200 rounded-lg shadow p-6 m-10'>
          <img src={product.image} alt={product.name} className='w-80 h-80 object-contain'/>
        </div>
        <div className=' flex flex-col items-start justify-start'> 
          <h1 className='text-2xl font-semibold text-gray-800 mb-4'>{product.name}</h1>
          <p className="text-xl text-gray-600 mb-2">${product.price}</p>
          {product.stock === 0 ? (
            <p className="text-red-500">Out of Stock</p>
          ) : (
            <p className="text-green-500">In Stock</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails