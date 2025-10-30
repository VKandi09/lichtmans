import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight, FaChevronRight as FaArrowRight } from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import { API_BASE } from '../api';

const BestSellers = () => {
  const [bourbonProducts, setBourbonProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const capitalizeFirstChar = (str) => {
    if (!str) return str;
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    const fetchBourbonProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products?subType=bourbon`);
        if (!res.ok) throw new Error("Failed to fetch bourbon products");
        const data = await res.json();

        const formattedData = data.map((product) => ({
          ...product,
          name: capitalizeFirstChar(product.name),
          type: capitalizeFirstChar(product.type),
          brand: capitalizeFirstChar(product.brand),
          subType: capitalizeFirstChar(product.subType),
        }));
        setBourbonProducts(formattedData);
      } catch (err) {
        console.error("Error fetching bourbon products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBourbonProducts();
  }, []);

  if (loading) return <p className="text-center py-10 text-gray-600">Loading best sellers...</p>;

  return (
    <section className="py-12 sm:py-15 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl text-center text-rose-900 font-bold mb-3">
          Best Sellers
        </h1>
        <div className="flex w-full justify-center sm:justify-end items-center mb-4">
          <a
            href="/products?subType=bourbon"
            className="flex items-center text-sm sm:text-base text-gray-700 hover:text-red-800 transition"
          >
            View All
            <FaArrowRight className="ml-2 text-xs sm:text-sm" />
          </a>
        </div>

        {/* Swiper Container */}
        <div className="relative">
          {bourbonProducts.length === 0 ? (
            <p className="text-gray-600 text-center py-10">No bourbon products available.</p>
          ) : (
            <>
              {/* Left Arrow - Desktop Only */}
              <button 
                className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white border rounded-full shadow hover:text-red-800 text-gray-700 hidden md:flex items-center justify-center"
                aria-label="Previous slide"
              >
                <FaChevronLeft />
              </button>

              <div className="max-w-sm mx-auto sm:max-w-none">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={16}
                  centeredSlides={true}
                  loop={true}
                  autoplay={{ delay: 4000, disableOnInteraction: false }}
                  pagination={{ 
                    clickable: true, 
                    el: ".custom-pagination",
                    bulletClass: "swiper-pagination-bullet",
                    bulletActiveClass: "swiper-pagination-bullet-active"
                  }}
                  navigation={{
                    nextEl: ".swiper-button-next-custom",
                    prevEl: ".swiper-button-prev-custom",
                  }}
                  modules={[Autoplay, Pagination, Navigation]}
                  breakpoints={{
                    // Mobile: 1 card centered
                    320: { 
                      slidesPerView: 1,
                      spaceBetween: 16,
                      centeredSlides: true
                    },
                    // Small tablets: 2 cards
                    640: { 
                      slidesPerView: 2,
                      spaceBetween: 20,
                      centeredSlides: false
                    },
                    // Tablets: 3 cards
                    768: { 
                      slidesPerView: 3,
                      spaceBetween: 20,
                      centeredSlides: false
                    },
                    // Desktop: 4 cards
                    1024: { 
                      slidesPerView: 4,
                      spaceBetween: 24,
                      centeredSlides: false
                    },
                  }}
                  className="w-full pb-12"
                >
                  {bourbonProducts.map((product) => (
                    <SwiperSlide key={product._id} className="!flex !justify-center">
                      <div className="w-full max-w-xs mx-auto">
                        <ProductCard product={product} />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Right Arrow - Desktop Only */}
              <button 
                className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white border rounded-full shadow hover:text-red-800 text-gray-700 hidden md:flex items-center justify-center"
                aria-label="Next slide"
              >
                <FaChevronRight />
              </button>

              {/* Pagination Dots */}
              <div className="custom-pagination flex justify-center mt-2"></div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
