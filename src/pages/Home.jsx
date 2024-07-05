import React, { useEffect, useState } from "react";
import NavBar from "../components/ToolsC/NavBar";
import ThisWeek from "../components/Home/ThisWeek";
import AllEvents from "../components/Home/AllEvents";
import MainEvents from "../components/Home/MainEvents";
import Footer from "../components/Home/Footer";
import { findAllEvents } from "../services/events.service";
import UpcomingEvents from "../components/Home/UpcomingEvents";

const Home = () => {
  const [events, setEvents] = useState(null);
  const getAllEvents = async () => {
    try {
      const response = await findAllEvents();
      if (response.success) {
        setEvents(response.events);
      }
      console.log("findAllEvents:", response);
    } catch (error) {
      console.error("FindAllEvents - Error:", error.response);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);
  return (
    <div className="homepage-container">
      <h1 className="become-promoter">Become a promoter</h1>
      <NavBar />
      <div className="home-search-bar-container">
        <input
          type="search"
          className="home-search-bar"
          placeholder="Search..."
        />
        <button class="button search-button">
          <span class="span">🔎</span>
        </button>
      </div>
      <h1 className="home-carousel-title">Feature Events</h1>
      <MainEvents events={events} />
      <h1 className="home-carousel-title">Upcoming Events</h1>
      <UpcomingEvents events={events} />
      {/* <h1 className="home-carousel-title">This Week</h1>
      <ThisWeek events={events} /> */}
      {/* <h1 className="home-carousel-title">All Events</h1>
      <AllEvents events={events} /> */}

      {/* <Footer /> */}
      <div className="logos-parent">
        <hr className="logos-hr" />
        <h1 className="powered-by">Powered By</h1>
        <div className="logos-container">
          <div className="logo-smp"></div>
          <div className="logo-visa"></div>
          <div className="logo-visa-secure"></div>
          <div className="logo-mastercard"></div>
          <div className="logo-mastercard-secure"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
