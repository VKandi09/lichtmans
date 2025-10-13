import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Hero = () => {
  const navigate = useNavigate();

  const images = [
    { src: "/images/beer-banner.png", path: "/beer" },
    { src: "/images/bourbon-banner.png", path: "/bourbon" },
    { src: "/images/wine-banner.png", path: "/wine" },
  ];

  return (
    <section className="h-auto bg-fixed bg-center bg-cover flex flex-col justify-center items-center text-white py-10">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white p-10 text-center w-full"
      >
        {/* Image Swiper Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="w-full md:w-3/4 mx-auto mb-15"
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 5500, disableOnInteraction: false }}
            pagination={{ clickable: true, el: ".custom-pagination", }}
            className=""
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                  onClick={() => navigate(img.path)}
                >
                  <img
                    src={img.src}
                    alt={img.path}
                    className="w-full h-[400px] object-cover shadow-md hover:shadow-xl transition-shadow"
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
        <div className="custom-pagination flex justify-center mt-4"></div>
        {/* Title */}
        <motion.h1
          className="text-5xl text-rose-900 font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Lichtman's Wine & Liquor Store
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-lg text-gray-700 leading-relaxed mb-10 w-3/4 mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          At <span className="font-semibold">Lichtman's Wine & Liquor Store</span>, we believe every occasion deserves the perfect drink. From fine wines and premium spirits to
          local craft beers and unique mixers, our shelves are stocked with a wide selection to suit every taste and budget.
          Whether you’re planning a celebration, stocking up for the weekend, or looking for the perfect gift, our friendly
          team is here to help you find just what you need. With a commitment to quality, value, and exceptional service, we
          make shopping for your favorite beverages simple and enjoyable. Cheers to great times, great taste, and great
          company – all starting here at <span className="font-bold">Lichtman's Wine & Liquor Store</span>.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Hero;
