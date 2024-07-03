import React, { useEffect } from "react";
import { findAllEvents } from "../../services/events.service";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/bundle";

const AllEvents = ({ events }) => {
  console.log("All Events:", events);

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
      {events &&
        events
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10)
          .map((event, index) => (
            <SwiperSlide key={event._id}>
              <div>{event.name}</div>
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default AllEvents;
