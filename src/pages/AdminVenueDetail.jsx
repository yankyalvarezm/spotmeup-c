import React from "react";
import NavBar from "../components/ToolsC/NavBar";
import VenueDetailEdit from "../components/Venues/VenueDetailEdit";
import DisplayLayouts from "../components/Layouts/DisplayLayouts";

const AdminVenueDetail = () => {
  return (
    <div className="admin-venue-detail-full-container">
      <NavBar />

      <div className="admin-venue-detail-container">
        <VenueDetailEdit />

        <DisplayLayouts />
      </div>
    </div>
  );
};

export default AdminVenueDetail;
