import React, { useEffect, useState } from "react";
import { getAllVenues } from "../../services/venue.service";
import Carousel from "react-multi-carousel";

const DisplayVenues = () => {
  const [venues, setVenues] = useState([]);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
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
    // <div className="display-venues-container">
    //   {venues.map((venue, index) => (

    //     <div key={index}  className="venue-fields-container">
    //       <h1 className="venue-field">{venue.name}</h1>
    //       <h1 className="venue-field">{venue.address.street}</h1>
    //       <h1 className="venue-field">{venue.maxCapacity}</h1>

    //     </div>
    //   ))}
    // </div>

    <Carousel responsive={responsive} arrows>
      {venues &&
        venues.map((venue, index) => (
          <div key={index}>
            <h1 className="venue-field">{venue.name}</h1>
            <h1 className="venue-field">{venue.address.street}</h1>
            <h1 className="venue-field">{venue.maxCapacity}</h1>
          </div>
        ))}

      {/* <h1 className="carousel-test">1</h1>
      <h1 className="carousel-test">2</h1>
      <h1 className="carousel-test">3</h1>
      <h1 className="carousel-test">4</h1> */}
    </Carousel>
  );
};

export default DisplayVenues;
