import React, { useEffect, useState, useContext } from "react";
import { findAllEvents } from "../../services/events.service";
import "react-multi-carousel/lib/styles.css";
import { MyEventsContext } from "../../context/myEvents.context";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/bundle";
import { useNavigate } from "react-router-dom";

const DisplayEvents = () => {
  const [events, setEvents] = useState([]);
  // const [eventLayout, setEventLayout] = useState(null);
  const { eventId, setEventId } = useContext(MyEventsContext);
  const navigate = useNavigate();

  const changePage = (eventId, eventLayout) => {
    navigate(`/admin/designpage/EventBreakDown/${eventId}/${eventLayout}`);
  };

  const toggleChangePage = (eventId) => {
    setEventId(eventId);
    changePage(eventId);
  };

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const response = await findAllEvents();
        console.log("🚀 ~ getAllEvents ~ response:", response);

        setEvents(response.events);
        // setTimeout(() => {
        // }, 3000);
      } catch (error) {
        console.log("Get All Events - Error:", error.message);
      }
    };

    getAllEvents();
  }, []);

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={4}
      navigation={{
        nextEl: ".custom-next",
        prevEl: ".custom-prev",
      }}
      pagination={{
        clickable: true,
        dynamicBullets: false,
      }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log("slide change")}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 50,
        },
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3.3,
        },
      }}
      wrapperClass={!events.length ? "when-swipper-loading" : ""}
    >
      <button className="custom-prev"></button>
      <button className="custom-next"></button>
      <h1 className="recently-added">Just Added</h1>
      {!events.length && (
        <div class="loader-container">
          <div className="loader"></div>
        </div>
      )}
      {events
        .slice(-12)
        .reverse()
        .map((event) => (
          <div key={event._id}>
            <SwiperSlide
              key={event._id}
              onClick={() => {
                toggleChangePage(event._id, event?.layout?._id);
                // setEventLayout(event?.layout?._id);
                console.log("Display This Event:", event);
              }}
            >
              <div className="event-slide">
                {event.images.length && console.log("Image Event:", event)}
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
                    height: "350px",
                  }}
                  className="event-image"
                ></div>
              </div>
              <div className="event-carousel-info">
                {/* <h1 className="event-name">{event.name}</h1> */}
                {/* <hr className="hr-event"/> */}
                {/* <h2 className="event-address">{event.address.street}</h2> */}
                <h2 className="event-address">{event.name}</h2>
              </div>
            </SwiperSlide>
          </div>
        ))}
    </Swiper>
  );
};

export default DisplayEvents;
