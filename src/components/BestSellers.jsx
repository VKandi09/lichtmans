import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
  { 
    id: 5, 
    name: "Red Wine", 
    image: "https://www.finewineandgoodspirits.com/ccstore/v1/images/?source=/file/v6521856860642915980/products/000005722_1006780_F1.jpg&height=475&width=475" 
  },
  { 
    id: 6, 
    name: "Whiskey", 
    image: "https://hips.hearstapps.com/hmg-prod/images/clausthaler-1563894333.jpg?crop=1xw:1xh;center,top" 
  },
  { 
    id: 7, 
    name: "Vodka", 
    image: "https://topshelfwineandspirits.com/cdn/shop/products/Untitled-2copy_a2ef47b4-ead4-4342-96aa-7e3b6615e5aa.jpg?v=1621637524" 
  },
  { 
    id: 8, 
    name: "Champagne", 
    image: "https://hips.hearstapps.com/toc.h-cdn.co/assets/16/41/10.jpg?resize=980:*" 
  },
];

const BestSellers = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl text-gray-700 font-bold">Best Sellers</h1>
          <a
            href="/best-sellers"
            className="flex items-center text-gray-700 hover:text-red-800 transition"
          >
            View All
            <FaChevronRight className="ml-2" />
          </a>
        </div>

        {/* Arrows + Swiper */}
        <div className="flex items-center gap-4">
          {/* Left Arrow */}
          <button className="swiper-button-prev-custom p-2 border rounded-full hover:text-red-800 text-gray-700">
            <FaChevronLeft />
          </button>
          <div className="relative w-full">
            <Swiper
              slidesPerView={4}
              spaceBetween={20}
              loop={true}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              pagination={{ clickable: true, el: ".custom-pagination", }}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              modules={[Autoplay, Pagination, Navigation]}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
              className="w-full pb-10"
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden p-4 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-contain mb-4"
                    />
                    <h2 className="text-lg text-gray-700 font-semibold text-center">
                      {product.name}
                    </h2>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="custom-pagination flex justify-center mt-4"></div>
          </div>
          {/* Right Arrow */}
          <button className="swiper-button-next-custom p-2 border rounded-full hover:text-red-800 text-gray-700">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
