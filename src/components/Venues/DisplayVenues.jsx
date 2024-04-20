import React, { useEffect, useState, useContext } from "react";
import { getAllVenues } from "../../services/venue.service";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import VenueDetail from "./VenueDetail";
import { VenuesContext } from "../../context/venues.context";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/bundle";
import { useNavigate } from "react-router-dom";

const DisplayVenues = () => {
  const [venues, setVenues] = useState([]);
  const [hoveredVenueId, setHoverVenueId] = useState(null);
  const { venueDetail, setVenueDetail, venueId, setVenueId } =
    useContext(VenuesContext);
  const navigate = useNavigate();

  const changePage = (venueId) => {
    navigate(`/admin/venuedetails/${venueId}`);
  };

  const toggleChangePage = (venueId) => {
    setVenueId(venueId);
    changePage(venueId);
  };
  const responsive2 = {
    superLargeDesktop: {
      breakpoint: { max: 9000, min: 3000 },
      items: 4,
      partialVisibilityGutter: 80,
    },
    desktop: {
      breakpoint: { max: 1500, min: 1024 },
      items: 3,
      partialVisibilityGutter: 20,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const popUp = (venueId) => {
    setTimeout(() => {
      setHoverVenueId(venueId);
    }, 500);
  };

  const popDown = () => {
    setTimeout(() => {
      setHoverVenueId(null);
    }, 500);
  };

  useEffect(() => {
    const findAllVenues = async () => {
      try {
        const response = await getAllVenues();

        setVenues(response.venues);
        // setTimeout(() => {
        // }, 3000);
      } catch (error) {
        console.log("Line 59 - Error:", error);
      }
    };

    findAllVenues();
  }, []);

  console.log("Venues Object:", venues);

  // return (
  //     <Carousel
  //       responsive={responsive2}
  //       className="carousel-recently-added carousel-class2"
  //       showDots={true}
  //       containerClass="custom-carousel-container container"
  //       partialVisible={true}
  //       itemClass={!hoveredVenueId ? "" : "item-selected"}
  //     >
  //       {[...venues]
  //         .reverse()
  //         .slice(0, 10)
  //         .map((venue, index) => (
  //           <div key={index} className={`venue-fields-container `}>
  //             <div
  //               className={`${
  //                 hoveredVenueId === venue._id
  //                   ? "hovered-venues transition-bases"
  //                   : "venue-img venue-img-hov transition-base"
  //               } ${index === 0 ? "lastly-added" : ""}`}
  //               id={`${hoveredVenueId === venue._id ? "" : "venue-img-first"}`}
  //               onMouseEnter={() => {
  //                 popUp(venue._id);
  //                 setTimeout(() => {
  //                   // setVenueDetail(venue);
  //                   setVenueId(venue._id);
  //                 }, 500);
  //               }}
  //               onMouseLeave={() => {
  //                 popDown();
  //                 setTimeout(() => {
  //                   // setVenueDetail(null);
  //                 }, 500);
  //               }}
  //             >
  //               {hoveredVenueId === venue._id ? (
  //                 <div className="venue-component-container transition-base">
  //                   <VenueDetail />
  //                 </div>
  //               ) : (
  //                 <>
  //                   <h1 className="venue-field venue-name">{venue.name}</h1>
  //                   <h1 className="venue-field venue-city">
  //                     {venue.address.city}
  //                   </h1>
  //                 </>
  //               )}
  //             </div>
  //           </div>
  //         ))}
  //     </Carousel>
  // );

  // const allVenues = venues.filter(carro => carro.marca.name === "Nissan");

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
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
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
      wrapperClass={!venues.length ? "when-swipper-loading" : ""}
    >
      <button className="custom-prev"></button>
      <button className="custom-next"></button>
      <h1 className="recently-added">Recently Added</h1>
      {!venues.length && (
        <div class="loader-container">
          <div className="loader"></div>
        </div>
      )}
      {venues
        .slice(-12)
        .reverse()
        .map((venue) => (
          <div key={venue._id}>
            <SwiperSlide key={venue._id}>
              <div
                className="venue-slide"
                onClick={() => toggleChangePage(venue._id)}
              >
                <img className="venue-img-first" />
              </div>
              <div className="venue-carousel-info">
                <h1 className="venue-name">{venue.name}</h1>
                {/* <hr className="hr-venue"/> */}
                <h2 className="venue-address">{venue.address.street}</h2>
                <h2 className="venue-address">
                  Layouts: {venue.layouts.length}
                </h2>
              </div>
            </SwiperSlide>
          </div>
        ))}
    </Swiper>
  );
};

export default DisplayVenues;
