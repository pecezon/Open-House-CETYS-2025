import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./carousel.css";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

export default function Carousel({ images }) {
  const CDNURL =
    "https://cbygflokfoqtkdhgzkus.supabase.co/storage/v1/object/public/carousel/public/";

  return (
    <div className="flex justify-center items-center h-1/3 w-full">
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
        }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {images.map((imagen) => (
          <SwiperSlide key={imagen.id}>
            <img
              src={CDNURL + imagen.name}
              alt={imagen.alt}
              className="w-full h-full object-contain rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
