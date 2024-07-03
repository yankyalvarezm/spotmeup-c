import React from "react";
import DynamicLayout from "../ToolsC/DynamicLayout";

const EDashboard = ({ event }) => {
//   console.log("Event From EDashboard:", event);

  return (
    <div className="e-dashboard-grid-container">
      <DynamicLayout layoutId={event?.layout?._id} scale={0.6} edit={true} />

      <div className="e-dashboard-item">
        <h1 className="e-edit-item">Edit</h1>

        <div className="e-info-grid">
          <h1>Event Name:</h1>
          <h1 className="e-info-value">{event?.name}</h1>
          <h1>Address:</h1>
          <h1 className="e-info-value">{event?.address?.street}</h1>
          <h1>Sales Start:</h1>
          <h1 className="e-info-value">
            {event?.saleStartDate} - {event?.saleStartTime}
          </h1>
          <h1>Date:</h1>
          <h1 className="e-info-value">{event?.date}</h1>
          <h1>About:</h1>
          <h1 className="e-info-value">{event?.description}</h1>
        </div>
      </div>
      <div>Promoters</div>
      <div>Sales</div>
    </div>
  );
};

export default EDashboard;
