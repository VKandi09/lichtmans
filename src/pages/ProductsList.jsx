import ProductCard from '../components/ProductCard'

const productsList = [
  {
    id: 1,
    name: 'Product 1',
    price: 19.99,
    image: 'https://www.finewineandgoodspirits.com/ccstore/v1/images/?source=/file/v6521856860642915980/products/000005722_1006780_F1.jpg&height=475&width=475',
    stock: 10,
  },
  {
    id: 2,
    name: 'Product 2',
    price: 29.99,
    image: 'https://hips.hearstapps.com/hmg-prod/images/clausthaler-1563894333.jpg?crop=1xw:1xh;center,top',
    stock: 5,
  },
  {
    id: 3,
    name: 'Product 3',
    price: 19.99,
    image: 'https://topshelfwineandspirits.com/cdn/shop/products/Untitled-2copy_a2ef47b4-ead4-4342-96aa-7e3b6615e5aa.jpg?v=1621637524',
    stock: 10,
  },
  {
    id: 4,
    name: 'Product 4',
    price: 25.99,
    image: 'https://thumbs.dreamstime.com/b/tequila-bottle-isolated-white-transparent-background-alcohol-drink-product-300810221.jpg',
    stock: 7,
  },
  {
    id: 5,
    name: 'Product 5',
    price: 89.99,
    image: 'https://hips.hearstapps.com/toc.h-cdn.co/assets/16/41/10.jpg?resize=980:*',
    stock: 0,
  },
  {
    id: 6,
    name: 'Product 6',
    price: 29.99,
    image: 'https://media.glamour.com/photos/585c388d59442a6146269be9/master/w_1600%2Cc_limit/robert-mondavi-private-selection-aged-in-bourbon-barrels-cabernet-sauvignon_1.jpg',
    stock: 5,
  },
  {
    id: 7,
    name: 'Product 7',
    price: 20.99,
    image: 'https://whisky.my/cdn-cgi/image/width=1000,height=1000,fit=crop,quality=80,format=auto,onerror=redirect,metadata=none/wp-content/uploads/BAILEY%E2%80%99S-Irish-Cream.jpg',
    stock: 8,
  },
  {
    id: 8,
    name: 'Product 8',
    price: 59.99,
    image: 'https://delmosa.com/cdn/shop/files/GeigerBlancdeBlanc.jpg?v=1737224992&width=533',
    stock: 3,
  },
  {
    id: 9,
    name: 'Product 9',
    price: 29.99,
    image: 'https://www.wineworldinc.com/media/catalog/product/cache/df4d6ab77e3c9593d62f9004fba54da5/A/G/AG200_c3ed09njOji6kYQI.jpg',
    stock: 0,
  },
  {
    id: 10,
    name: 'Product 10',
    price: 34.99,
    image: 'https://target.scene7.com/is/image/Target/GUEST_bb1f22c5-d79a-48b5-bb39-37d1c4ed60d9',
    stock: 16,
  }
]

const ProductsList = () => {
  return (
    <div className='flex flex-wrap justify-center lg:flex-row'>
      { productsList.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductsList