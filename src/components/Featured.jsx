import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // core styles
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const products = [
  { 
    id: 1, 
    name: "Red Wine", 
    image: "https://www.finewineandgoodspirits.com/ccstore/v1/images/?source=/file/v6521856860642915980/products/000005722_1006780_F1.jpg&height=475&width=475" 
  },
  { 
    id: 2, 
    name: "Whiskey", 
    image: "https://hips.hearstapps.com/hmg-prod/images/clausthaler-1563894333.jpg?crop=1xw:1xh;center,top" 
  },
  { 
    id: 3, 
    name: "Vodka", 
    image: "https://topshelfwineandspirits.com/cdn/shop/products/Untitled-2copy_a2ef47b4-ead4-4342-96aa-7e3b6615e5aa.jpg?v=1621637524" 
  },
  { 
    id: 4, 
    name: "Champagne", 
    image: "https://hips.hearstapps.com/toc.h-cdn.co/assets/16/41/10.jpg?resize=980:*" 
  },
];

const Featured = () => {
  return (
    <section className="h-screen">
      <div>
        <h1 className="text-5xl text-gray-700 font-bold text-center my-10">Featured Products</h1>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="w-full max-w-6xl"
        >
          {products.map((product) => (
            <SwiperSlide>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
                <img src={product.image} alt={product.name} className="w-full h-64 object-contain mb-4"></img>
                <h2 className="text-xl text-gray-700 font-semibold text-center">{product.name}</h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Featured