import React, { useEffect } from "react";
import { findAllEvents } from "../../services/events.service";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/bundle";

const ThisWeek = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={4}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 50,
        },
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
      }}
      className="thisweek-container"
      pagination={{
        clickable: true,
        // dynamicBullets: false,
      }}
      navigation
    >
      <SwiperSlide>
        <div>Example Slide</div>
      </SwiperSlide>
      <SwiperSlide>
        <div>Example Slide</div>
      </SwiperSlide>
      <SwiperSlide>
        <div>Example Slide</div>
      </SwiperSlide>
      <SwiperSlide>
        <div>Example Slide</div>
      </SwiperSlide>
    </Swiper>
  );
};

export default ThisWeek;
