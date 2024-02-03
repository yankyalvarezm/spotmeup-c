import React, { createContext, useState } from "react";

const MyEventsContext = createContext();

function MyEventsProvider({ children }) {
  
  const [showEvents, setShowEvents] = useState(true);
  const [showVenues, setShowVenues] = useState(false);

  const displayEvents = () => {
    setShowEvents(true);
    setShowVenues(false);
  };

  const displayVenues = () => {
    setShowEvents(false);
    setShowVenues(true);
  };

  return (
    <MyEventsContext.Provider
      value={{
        showEvents,
        showVenues,
        displayEvents,
        displayVenues,
      }}
    >
      {children}
    </MyEventsContext.Provider>
  );
}

export { MyEventsProvider, MyEventsContext };
