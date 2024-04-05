import React, { useContext } from "react";
import { MyEventsContext } from "../../context/myEvents.context";

const AddNewVenue = () => {
  const { displayVenuesForm } = useContext(MyEventsContext);

  return (
    <div className="addnewvenue-myevents">
      <button onClick={displayVenuesForm}>Add New Venue</button>
    </div>
  );
};

export default AddNewVenue;
