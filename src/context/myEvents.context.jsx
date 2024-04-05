import React, { createContext, useState } from "react";

const MyEventsContext = createContext();

function MyEventsProvider({ children }) {
  const [showEvents, setShowEvents] = useState(true);
  const [showVenues, setShowVenues] = useState(false);
  const [showVenuesForm, setShowVenuesForm] = useState(false);
  const [showEventsForm, setShowEventsForm] = useState(false);

  const displayEvents = () => {
    setShowEvents(true);
    setShowVenues(false);
  };

  const displayVenues = () => {
    setShowEvents(false);
    setShowVenues(true);
  };

  const displayVenuesForm = () => {
    setShowEventsForm(false);
    setShowVenuesForm(true);
  };

  const displayEventsForm = () => {
    setShowEventsForm(true);
    setShowVenuesForm(false);
  };

  const toggleVenuesForm = () => {
    setShowVenuesForm(false);
  };

  const toggleEventsForm = () => {
    setShowEventsForm(false);
  };

  
  return (
    <MyEventsContext.Provider
      value={{
        showEvents,
        showEventsForm,
        showVenues,
        showVenuesForm,
        displayEvents,
        displayEventsForm,
        displayVenues,
        displayVenuesForm,
        toggleVenuesForm,
        toggleEventsForm,
      }}
    >
      {children}
    </MyEventsContext.Provider>
  );
}

export { MyEventsProvider, MyEventsContext };
