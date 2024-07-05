import React, { useEffect, useContext, useState } from "react";
import { findEvent } from "../services/events.service";
import { TicketsContext } from "../context/tickets.context";
import { useParams } from "react-router-dom";

const Approved = () => {
  const param = useParams();
  const { ticketsCart } = useContext(TicketsContext);
  const [event, setEvent] = useState();

  console.log("🚀 ~ Approved ~ ticketsCart:", ticketsCart);

  const getTheEvent = async () => {
    try {
      const response = await findEvent(param.eventIdParam);
      if (response.success) {
        setEvent(response.event);
      }
      console.log("GetTheEvent - Success:", response.event);
    } catch (error) {
      console.error("GetTheEvent - Error:", error.response);
    }
  };

  useEffect(() => {
    getTheEvent();
  }, [param.eventIdParam]);

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    let hours12 = parseInt(hours, 10);
    const period = hours12 >= 12 ? "PM" : "AM";
    hours12 = hours12 % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
  };

  return (
    <div>
      <h1 className="approved-page">Approved Page - Summary</h1>
      <div className="approved-summary">
        <div className="summary-event-container">
          <h1 className="bold">{event?.name}</h1>
          <h1>{event?.address?.street}</h1>
          <h1>{formatTime(event?.time)}</h1>
        </div>

       
      </div>
    </div>
  );
};

export default Approved;
