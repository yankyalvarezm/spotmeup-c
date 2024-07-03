import React from "react";
import { useNavigate } from "react-router-dom";

const ETopNavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="d-event-top-navbar">
      <h1 onClick={() => navigate("/")} className="d-event-link">
        Home
      </h1>
      <h1 onClick={() => navigate("/about")} className="d-event-link">
        About Us
      </h1>
      <h1 onClick={() => navigate("/myevents")} className="d-event-link">
        My Events
      </h1>
      <h1 onClick={() => navigate("/profile")} className="d-event-link">
        Profile
      </h1>
    </div>
  );
};

export default ETopNavBar;
