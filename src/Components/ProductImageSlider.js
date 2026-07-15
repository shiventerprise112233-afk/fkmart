import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ProductImageSlider = ({ images }) => {
  const swiperRef = useRef(null);
  const [activeImage, setActiveImage] = useState(0);

  return (
    <>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveImage(swiper.activeIndex)}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt=""
              className="w-full object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-4 overflow-x-auto">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => {
              swiperRef.current?.slideTo(index);
              setActiveImage(index);
            }}
            className={`border ${
              activeImage === index
                ? "border-blue-500"
                : "border-gray-300"
            }`}
          >
            <img
              src={img}
              alt=""
              className="w-14 h-14 object-cover"
            />
          </button>
        ))}
      </div>
    </>
  );
};

export default ProductImageSlider;