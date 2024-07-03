import React, { createContext, useState } from "react";

const MyEventsContext = createContext();

function MyEventsProvider({ children }) {
  const [showEvents, setShowEvents] = useState(true);
  const [showVenues, setShowVenues] = useState(false);
  const [showVenuesForm, setShowVenuesForm] = useState(false);
  const [showEventsForm, setShowEventsForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventId, setEventId] = useState(null);
  const [eventFormActive, setEventFormActive] = useState(false);
  const [ticketFormActive, setTicketFormActive] = useState(false);
  const [tuneFormActive, setTuneFormActive] = useState(false);
  const [hasVenue, setHasVenue] = useState(null);
  const [venuesEvents, setVenuesEvents] = useState(null);
  const [linkName, setLinkName] = useState("dashboard");

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
        isModalOpen,
        eventId,
        eventFormActive,
        ticketFormActive,
        tuneFormActive,
        hasVenue,
        venuesEvents,
        linkName,
        setLinkName,
        setVenuesEvents,
        displayEvents,
        displayEventsForm,
        displayVenues,
        displayVenuesForm,
        toggleVenuesForm,
        toggleEventsForm,
        setIsModalOpen,
        setEventId,
        setEventFormActive,
        setTicketFormActive,
        setTuneFormActive,
        setHasVenue,
      }}
    >
      {children}
    </MyEventsContext.Provider>
  );
}

export { MyEventsProvider, MyEventsContext };
