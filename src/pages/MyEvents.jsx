import React, { useContext } from "react";
import SubNavbar from "../components/MyEvents/SubNavbar";
import NavBar from "../components/ToolsC/NavBar";
import AddNewVenue from "../components/MyEvents/AddNewVenue";
import SearchVenues from "../components/MyEvents/SearchVenues";
import { MyEventsContext } from "../context/MyEvents.context";
import SearchEvents from "../components/MyEvents/SearchEvents";
import AddNewEvent from "../components/MyEvents/AddNewEvent";
import VenueForm from "../components/Venues/VenueForm";
import BackVenueSearch from "../components/Venues/BackVenueSearch";
import DisplayVenues from "../components/Venues/DisplayVenues";

const MyEvents = () => {
  const { showEvents, showVenues, showVenuesForm } =
    useContext(MyEventsContext);

  return (
    <div className="myevents-container">
      <div>
        <NavBar />
      </div>
      <div className="myeventstab-container">
        <SubNavbar />
        {showVenues && !showVenuesForm && (
          <div className="search-add-venues">
            <SearchVenues />
            <h1 className="or">or</h1>
            <AddNewVenue />
          </div>
        )}
        {showVenuesForm && !showEvents && <BackVenueSearch />}
        {showVenuesForm && !showEvents && <VenueForm />}

        {showEvents && (
          <div className="search-add-venues">
            <SearchEvents />
            <h1 className="or">or</h1>
            <AddNewEvent />
          </div>
        )}

        {!showVenues && !showVenuesForm && <DisplayVenues />}
      </div>
    </div>
  );
};

export default MyEvents;
