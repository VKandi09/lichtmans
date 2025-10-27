import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight, FaChevronRight as FaArrowRight } from "react-icons/fa";
import ProductCard from "../components/ProductCard";

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
        const res = await fetch("http://localhost:5001/api/products?subType=bourbon");
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
    <section className="py-22 bg-white">
      <div className="mx-auto max-w-7xl p-2">
        {/* Header */}
        <h1 className="text-4xl text-center justify-center text-rose-800 font-bold mb-3">Best Sellers</h1>
        <div className="flex w-full justify-end items-end mb-4">
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
        <div className="flex items-center gap-4">
          {/* Left Arrow */}
          <button className="swiper-button-prev-custom p-2 border rounded-full hover:text-red-800 text-gray-700">
            <FaChevronLeft />
          </button>

          <div className="relative w-full">
            {bourbonProducts.length === 0 ? (
              <p className="text-gray-600 text-center py-10">No bourbon products available.</p>
            ) : (
              <Swiper
                slidesPerView={4}
                spaceBetween={20}
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
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 4 },
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
