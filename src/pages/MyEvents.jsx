import React, { useContext, useState } from "react";
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
import { Form, FloatingLabel } from "react-bootstrap";

const MyEvents = () => {
  const { showEvents, showVenues, showVenuesForm } =
    useContext(MyEventsContext);

  const [column, setColumn] = useState(3);
  const [rows, setRows] = useState(3);

  return (
    <div className="myevents-container">
      <div>
        <NavBar />
      </div>
      <div className="myeventstab-container">
        <SubNavbar />
        {showVenues && !showVenuesForm && (
          <div>
            <div className="search-add-venues">
              <SearchVenues />
              <h1 className="or">or</h1>
              <AddNewVenue />
            </div>

            <DisplayVenues />
          </div>
        )}
        {showVenuesForm && !showEvents && <BackVenueSearch />}
        {showVenuesForm && !showEvents && <VenueForm />}

        {showEvents && (
          <>
            <div className="search-add-venues">
              <SearchEvents />
              <h1 className="or">or</h1>
              <AddNewEvent />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
