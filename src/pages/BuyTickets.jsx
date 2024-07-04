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
          scale={0.8}
          edit={false}
          tooltip={true}
          formatPrices={true}
        />
      </div>
      <form className="buy-tickets-form"></form>
    </div>
  );
};

export default BuyTickets;
