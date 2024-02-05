import React, { useEffect, useState } from "react";
import { getAllVenues } from "../../services/venue.service";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const DisplayVenues = () => {
  const [venues, setVenues] = useState([]);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1500, min: 1024 },
      items: 4,
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

  useEffect(() => {
    const findAllVenues = async () => {
      try {
        const response = await getAllVenues();
        setVenues(response.venues);
        console.log("response", response);
      } catch (error) {
        console.log("Line 10 - Error:", error);
      }
    };

    findAllVenues();
  }, []);

  return (
    <div className="display-venues-container">
      <h1 className="carousel-title">Recently Added</h1>
      <Carousel responsive={responsive} infinite={false} className="carousel-package">
        {venues.map((venue, index) => (
          <div key={index} className="venue-fields-container">
            <div className="venue-img">IMG</div>
            <h1 className="venue-field">{venue.name}</h1>
            <h1 className="venue-field">{venue.address.street}</h1>
            <h1 className="venue-field">Max-Capacity: {venue.maxCapacity}</h1>
          </div>
        ))}
      </Carousel>

      <h1 className="carousel-title">Clasicos</h1>
      <Carousel responsive={responsive} infinite={false}>
        {venues.map((venue, index) => (
          <div key={index} className="venue-fields-container">
            <h1 className="venue-field">{venue.name}</h1>
            <h1 className="venue-field">{venue.address.street}</h1>
            <h1 className="venue-field">{venue.maxCapacity}</h1>
          </div>
        ))}
      </Carousel>

      <h1 className="carousel-title">Los que no fallan</h1>
      <Carousel responsive={responsive} infinite={false}>
        {venues.map((venue, index) => (
          <div key={index} className="venue-fields-container">
            <h1 className="venue-field">{venue.name}</h1>
            <h1 className="venue-field">{venue.address.street}</h1>
            <h1 className="venue-field">{venue.maxCapacity}</h1>
          </div>
        ))}
      </Carousel>

    </div>
  );
};

export default DisplayVenues;
