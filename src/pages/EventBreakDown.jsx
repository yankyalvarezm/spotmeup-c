import React, { useEffect, useState, useContext } from "react";
import ETopNavBar from "../components/EBreakDown/ETopNavBar";
import { findEvent } from "../services/events.service";
import { useParams } from "react-router-dom";
import ENavBar from "../components/EBreakDown/ENavBar";
import EDashboard from "../components/EBreakDown/EDashboard";
import { MyEventsContext } from "../context/myEvents.context";
import ESales from "../components/EBreakDown/ESales";
import EPromoters from "../components/EBreakDown/EPromoters";
import EventInfo from "../components/EBreakDown/EventInfo";
import EBouncers from "../components/EBreakDown/EBouncers";

const EventBreakDown = () => {
  const param = useParams();
  const { linkName } = useContext(MyEventsContext);

//   console.log("eventIdParam:", param.eventIdParam);

  const [event, setEvent] = useState({});

  const getEvent = async () => {
    try {
      const response = await findEvent(param.eventIdParam);
    //   console.log("getEvent - Response:", response);
      if (response.success) {
        setEvent(response.event);
      }
    } catch (error) {
      console.error("GetEvent - Error:", error.response);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

//   console.log("Event:", event);

  return (
    <div>
      <ETopNavBar event={event} />
      <div className="event-dashboard-grid">
        <ENavBar />
        <div>
          {event && <h1 className="event-dashboard-title">{event.name}</h1>}

          {linkName === "dashboard" && <EDashboard event={event} />}
          {linkName === "sales" && <ESales event={event} />}
          {linkName === "event-info" && <EventInfo event={event} />}
          {linkName === "promotors" && <EPromoters event={event} />}
          {linkName === "bouncers" && <EBouncers event={event} />}
        </div>
      </div>
    </div>
  );
};

export default EventBreakDown;
