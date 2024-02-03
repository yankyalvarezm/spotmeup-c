import React, { useContext } from "react";
import SubNavbar from "../components/MyEvents/SubNavbar";
import NavBar from "../components/ToolsC/NavBar";
import AddNewVenue from "../components/MyEvents/AddNewVenue";
import SearchVenues from "../components/MyEvents/SearchVenues";
import { MyEventsContext } from "../context/myEvents.context";
import SearchEvents from "../components/MyEvents/SearchEvents";
import AddNewEvent from "../components/MyEvents/AddNewEvent";

const MyEvents = () => {
  const { showEvents, showVenues } = useContext(MyEventsContext);

  return (
    <div className="myevents-container">
      <div>
        <NavBar />
      </div>
      <div className="myeventstab-container">
        <SubNavbar />
        {showVenues && (
          <div className="search-add-venues">
            <SearchVenues />
            <h1 className="or">or</h1>
            <AddNewVenue />
          </div>
        )}

        {showEvents && (
          <div className="search-add-venues">
            <SearchEvents />
            <h1 className="or">or</h1>
            <AddNewEvent />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
