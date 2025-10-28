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
        }))
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
    <section className="py-15 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl text-center justify-center text-rose-900 font-bold mb-3">Best Sellers</h1>
        <div className="flex w-full justify-center items-center sm:justify-end mb-2">
          {/* <h1 className="text-4xl text-rose-800 font-bold">Best Sellers</h1> */}
          <a
            href="/products?subType=bourbon"
            className="flex items-center text-gray-700 hover:text-red-800 transition"
          >
            View All
            <FaArrowRight className="ml-2" />
          </a>
        </div>

        {/* Arrows + Swiper */}
        <div className="relative">
          {/* Left Arrow */}
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white border rounded-full shadow hover:text-red-800 text-gray-700 hidden sm:flex">
            <FaChevronLeft />
          </button>

          <div className="relative w-full">
            {bourbonProducts.length === 0 ? (
              <p className="text-gray-600 text-center py-10">No bourbon products available.</p>
            ) : (
              <Swiper
                slidesPerView={1.1}
                centeredSlides={true}
                spaceBetween={16}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true, el: ".custom-pagination" }}
                navigation={{
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                }}
                modules={[Autoplay, Pagination, Navigation]}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  480: { slidesPerView: 3, centeredSlides: true },
                  640: { slidesPerView: 3, centeredSlides: false },
                  768: { slidesPerView: 3, centeredSlides: false },
                  1024: { slidesPerView: 4, centeredSlides: false },
                }}
                className="w-full pb-10"
              >
                {bourbonProducts.map((product) => (
                  <SwiperSlide key={product._id}>
                    <ProductCard product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            {/* Right Arrow */}
            <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white border rounded-full shadow hover:text-red-800 text-gray-700 hidden sm:flex">
              <FaChevronRight />
            </button>
            <div className="custom-pagination flex justify-center mt-4"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
