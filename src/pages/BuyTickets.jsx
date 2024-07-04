import React, { useState, useEffect } from "react";
import NavBar from "../components/ToolsC/NavBar";
import DynamicLayout from "../components/ToolsC/DynamicLayout";
import { useParams } from "react-router-dom";
import { findEvent } from "../services/events.service";

const BuyTickets = () => {
  const param = useParams();

  const [event, setEvent] = useState();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 760);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 760);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getEvent = async () => {
    try {
      const response = await findEvent(param.eventIdParam);
      console.log("GetTheEvent - Success:", response);
      if (response.success) {
        setEvent(response.event);
      }
    } catch (error) {
      console.error("GetTheEvent - Error:", error.response);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <div>
      <NavBar />
      <h1 className="buy-tickets-title">👇🏻 Select Where You Want To Go 👇🏻</h1>

      <div className="buy-tickets-container">
        <DynamicLayout
          layoutId={event?.layout?._id}
          scale={isMobile ? 0.5 : 0.8}
          edit={false}
          tooltip={true}
          formatPrices={true}
        />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="buy-tickets-cart"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.79166 2H1V4H4.2184L6.9872 16.6776H7V17H20V16.7519L22.1932 7.09095L22.5308 6H6.6552L6.08485 3.38852L5.79166 2ZM19.9869 8H7.092L8.62081 15H18.3978L19.9869 8Z"
            fill="currentColor"
          />
          <path
            d="M10 22C11.1046 22 12 21.1046 12 20C12 18.8954 11.1046 18 10 18C8.89543 18 8 18.8954 8 20C8 21.1046 8.89543 22 10 22Z"
            fill="currentColor"
          />
          <path
            d="M19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18C18.1046 18 19 18.8954 19 20Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <form className="buy-tickets-form"></form>
    </div>
  );
};

export default BuyTickets;
