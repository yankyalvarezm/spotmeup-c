import React, { useEffect, useState, useContext } from "react";
import { getAllVenues } from "../../services/venue.service";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import VenueDetail from "./VenueDetail";
import { VenuesContext } from "../../context/venues.context";

const DisplayVenues = () => {
  const [venues, setVenues] = useState([]);
  const [hoveredVenueId, setHoverVenueId] = useState(null);
  const { venueDetail, setVenueDetail, venueId, setVenueId } =
    useContext(VenuesContext);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
      partialVisibilityGutter: 20,
    },
    desktop: {
      breakpoint: { max: 1500, min: 1024 },
      items: 4,
      partialVisibilityGutter: 15,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 15,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 15,
    },
  };

  const responsive2 = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
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
  console.log("mouse in");
  console.log("Venue:", venueDetail);

  const popDown = () => {
    setTimeout(() => {
      setHoverVenueId(null);
    }, 500);

    console.log("mouse out");
    console.log("Venue:", venueDetail);
  };

  useEffect(() => {
    const findAllVenues = async () => {
      try {
        const response = await getAllVenues();
        setVenues(response.venues);
        // console.log("response", response);
      } catch (error) {
        console.log("Line 10 - Error:", error);
      }
    };

    findAllVenues();
  }, []);

  return (
    <div className="display-venues-container">
      <h1 className="carousel-title">Recently Added</h1>
      <Carousel
        responsive={responsive2}
        className="carousel-recently-added carousel-class2"
        showDots={true}
        containerClass="custom-carousel-container container"
        partialVisible={true}
        itemClass={!hoveredVenueId ? "" : "item-selected"}
      >
        {[...venues]
          .reverse()
          .slice(0, 10)
          .map((venue, index) => (
            <div key={index} className={`venue-fields-container `}>
              <div
                className={`${
                  hoveredVenueId === venue._id
                    ? "hovered-venue transition-base"
                    : "venue-img venue-img-hov transition-base"
                } ${index === 0 ? "lastly-added" : ""}`}
                id={`${hoveredVenueId === venue._id ? "" : "venue-img-first"}`}
                onMouseEnter={() => {
                  popUp(venue._id);
                  setTimeout(() => {
                    // setVenueDetail(venue);
                    setVenueId(venue._id);
                  }, 500);
                }}
                onMouseLeave={() => {
                  popDown();
                  setTimeout(() => {
                    // setVenueDetail(null);
                  }, 500);
                }}
              >
                {hoveredVenueId === venue._id ? (
                  <div className="venue-component-container transition-base">
                    <VenueDetail />
                  </div>
                ) : (
                  <>
                    <h1 className="venue-field venue-name">{venue.name}</h1>
                    <h1 className="venue-field venue-city">
                      {venue.address.city}
                    </h1>
                  </>
                )}
              </div>
            </div>
          ))}
      </Carousel>

      <h1 className="carousel-title">Clasicos</h1>
      <Carousel
        responsive={responsive}
        infinite={false}
        className="carousel-package"
        partialVisible={true}

        // focusOnSelect
      >
        {venues.map((venue, index) => (
          <div key={index} className="venue-fields-container">
            <div className="venue-img" id="venue-img">
              <h1 className="venue-field venue-name">{venue.name}</h1>
              <h1 className="venue-field venue-city">{venue.address.street}</h1>
            </div>
          </div>
        ))}
      </Carousel>

      <h1 className="carousel-title">Los que no fallan</h1>
      <Carousel
        responsive={responsive}
        infinite={false}
        className="carousel-package"
        partialVisible={true}
      >
        {venues.map((venue, index) => (
          <div key={index} className="venue-fields-container">
            <div className="venue-img" id="venue-img">
              <h1 className="venue-field venue-name">{venue.name}</h1>
              <h1 className="venue-field venue-city">{venue.address.street}</h1>
            </div>
          </div>
        ))}
      </Carousel>

      {/* <VenueDetail /> */}
    </div>
  );
};

export default DisplayVenues;
