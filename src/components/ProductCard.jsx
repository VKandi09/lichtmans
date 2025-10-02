import { Link } from 'react-router-dom'

const ProductCard = ({product}) => {
  const { id, name, image, price, stock} = product;
  return (
    <div className='w-1/4 m-4'>
      <Link to={`/products/${id}`} state={{ product }} className="block p-4 border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
          <img src={image} alt="Product" className="w-full h-48 object-contain mb-4 rounded" />
          <h2 className="text-lg text-gray-700 font-semibold mb-2">{name}</h2>
          <p className="text-gray-600 mb-4">{price}</p>
          { stock === 0 ? <p className='text-red-500 text-md'>Out of Stock</p> : <p className='text-green-500 text-md'>In Stock</p>}
      </Link>
    </div>
  )
}

export default ProductCard