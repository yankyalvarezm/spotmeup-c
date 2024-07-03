import React, { useEffect } from "react";
import { findAllEvents } from "../../services/events.service";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css/bundle";

const MainEvents = ({ events }) => {
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const differenceInTime =
      eventDate.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0); // Ignore time part
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    if (differenceInDays === 0) {
      return "Hoy";
    } else if (differenceInDays === 1) {
      return "Mañana";
    } else if (differenceInDays > 1 && differenceInDays < 7) {
      return `Este ${eventDate.toLocaleString("es-ES", { weekday: "long" })}`;
    } else {
      return new Intl.DateTimeFormat("es-ES", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).format(eventDate);
    }
  };

  const filteredEvents = events?.filter((event) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate.setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0);
  });

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    let hours12 = parseInt(hours, 10);
    const period = hours12 >= 12 ? "PM" : "AM";
    hours12 = hours12 % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
  };

  const handleChangePage = (eventId) => {
    navigate(`/event-details/${eventId}`);
  };
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={5}
      breakpoints={{
        320: {
          slidesPerView: 1,
          navigation: false,
        },
        640: {
          slidesPerView: 3,
          navigation: true,
        },
        768: {
          slidesPerView: 4,
          navigation: true,
        },
      }}
      className="thisweek-container"
      pagination={{
        clickable: true,
        // dynamicBullets: false,
      }}
    >
      {events &&
        events
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4)
          .map((event) => (
            <SwiperSlide
              key={event._id}
              className="featured-events-container"
              onClick={() => handleChangePage(event._id)}
            >
              <div
                style={{
                  backgroundImage: `url(${
                    event.images && event.images.length > 0
                      ? event.images[0]
                      : "/no-image.jpg" // URL de la imagen de respaldo
                  })`,
                  backgroundSize: "100%",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                //   height: "270px",
                  borderRadius: "10px",
                }}
                className="event-image"
              ></div>
              <h1 className="featured-event-fonts featured-event-name">
                {event?.name}
              </h1>
              <h1 className="featured-event-fonts">
                {event?.address?.state}, {event?.address?.city}
              </h1>

              <h1 className="featured-event-fonts">
                {formatDate(event?.date)} - {formatTime(event?.time)}
              </h1>
              <h1 className="featured-event-fonts"></h1>
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default MainEvents;
