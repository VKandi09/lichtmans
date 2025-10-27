import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Hero = () => {
  const navigate = useNavigate();

  const images = [
    { src: "/images/bourbon-banner.png", path: "/products?subType=bourbon" },
    { src: "/images/whiskey-banner.png", path: "/products?type=whiskey" },
    { src: "/images/wine-banner.png", path: "/products?type=wine" },
    { src: "/images/vodka-banner.png", path: "/products?type=vodka" },
    { src: "/images/tequila-banner.png", path: "/products?type=tequila" },
  ];

  return (
    <section className="h-auto bg-fixed bg-center bg-cover flex flex-col justify-center items-center text-white py-6 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white p-2 sm:p-6 md:p-2 lg:p-2 text-center w-full"
      >
        {/* Image Swiper Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="w-full lg:w-3/4 mx-auto mb-5"
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 5500, disableOnInteraction: false }}
            pagination={{ clickable: true, el: ".custom-pagination", }}
            className="flex transition-transform duration-500 ease-in-out"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="min-w-full cursor-pointer"
                  onClick={() => navigate(img.path)}
                >
                  <img
                    src={img.src}
                    alt={img.path}
                    className="w-full h-[150px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-contain hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
        <div className="custom-pagination flex justify-center mb-6"></div>
        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl text-rose-900 font-bold mb-6 md:mb-10 mt-10 md:mt-20 px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Lichtman's Wine & Liquor Store
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 md:mb-10 w-full sm:w-11/12 md:w-3/4 mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          At <span className="font-semibold">Lichtman's Wine & Liquor Store</span>, we believe every occasion deserves the perfect drink. 
          Our shelves feature an exceptional selection of fine wines, premium whiskeys, smooth tequilas, refined vodkas, and a remarkable 
          collection of bourbons — for which we’re proudly known as one of the area’s largest sellers. Whether you’re celebrating a special 
          moment, restocking your home bar, or searching for the perfect gift, our friendly team is here to guide you. With a commitment to 
          quality, value, and outstanding service, we make discovering your favorite spirits a truly enjoyable experience. 
          Cheers to great taste and even greater company – all starting here at <span className="font-bold">Lichtman's Wine & Liquor Store</span>.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Hero;
