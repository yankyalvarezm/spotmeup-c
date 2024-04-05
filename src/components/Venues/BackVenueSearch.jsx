import React, { useContext, useState } from "react";
import { MyEventsContext } from "../../context/myEvents.context";

const BackVenueSearch = () => {
  const { toggleVenuesForm } = useContext(MyEventsContext);

  return (
    <div className="venueform-goback">
      <button onClick={toggleVenuesForm}>Go Back</button>
    </div>
  );
};

export default BackVenueSearch;
