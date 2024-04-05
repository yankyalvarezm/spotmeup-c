import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MyEventsContext } from "../../context/myEvents.context";

const SubNavbar = () => {
  const { displayEvents, displayVenues, showVenues, showEvents } =
    useContext(MyEventsContext);

  return (
    <div className="myevents-navbar">
      <div className="sub-navbar-container">
        <Link
          onClick={displayEvents}
          className={showEvents ? "option-selected" : ""}
        >
          Events
        </Link>
        <Link
          onClick={displayVenues}
          className={showVenues ? "option-selected" : ""}
        >
          Venues
        </Link>
      </div>
    </div>
  );
};

export default SubNavbar;
