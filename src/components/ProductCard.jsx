import { Link } from 'react-router-dom'

const ProductCard = ({product}) => {
  const { _id, name, image, price } = product;
  return (
    <div className='w-64 m-4'>
      <Link to={`/products/${name}`} state={{ product }} className="block p-4 border border-gray-200 h-[340px] rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
          <img src={image && image !== "" ? image : "/images/placeholder-bottle.png"} alt="Product" className="w-full h-48 object-contain mb-4 rounded" />
          {/* <h2 className="text-lg text-gray-700 font-semibold mb-2">{name}</h2> */}
          <h2
            className={`text-gray-700 font-semibold mb-2 text-center leading-tight 
            ${name.length > 25 ? "text-sm" : "text-lg"}`}
          >
          {name.length > 35 ? name.slice(0, 35) + "..." : name}
          </h2>
          <p className="text-gray-600 mb-2 text-center">$ {price}</p>
          <button className="w-full bg-red-800 text-white py-2 rounded hover:bg-red-900 transition-colors duration-300">
            View Details
          </button>
      </Link>
    </div>
  )
}

export default ProductCard