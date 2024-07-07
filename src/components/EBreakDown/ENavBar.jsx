import React, { useContext } from "react";
import { MyEventsContext } from "../../context/myEvents.context";

const ENavBar = () => {
  const { linkName, setLinkName } = useContext(MyEventsContext);

  return (
    <div className="d-event-left-navbar">
      <h1
        onClick={() => setLinkName("dashboard")}
        className={
          linkName === "dashboard" ? "d-link-active" : "d-link-not-active"
        }
      >
        Dashboard
      </h1>
      <h1
        onClick={() => setLinkName("sales")}
        className={linkName === "sales" ? "d-link-active" : "d-link-not-active"}
      >
        Sales
      </h1>
      <h1
        onClick={() => setLinkName("event-info")}
        className={
          linkName === "event-info" ? "d-link-active" : "d-link-not-active"
        }
      >
        Event Info
      </h1>
      <h1
        onClick={() => setLinkName("promotors")}
        className={
          linkName === "promotors" ? "d-link-active" : "d-link-not-active"
        }
      >
        Promotors
      </h1>
      <h1
        onClick={() => setLinkName("bouncers")}
        className={
          linkName === "bouncers" ? "d-link-active" : "d-link-not-active"
        }
      >
        Bouncers
      </h1>
    </div>
  );
};

export default ENavBar;
