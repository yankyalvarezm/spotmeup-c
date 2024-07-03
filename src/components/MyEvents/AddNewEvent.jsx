import React, { useState, useEffect, useRef, useContext } from "react";
import { MyEventsContext } from "../../context/myEvents.context";
import { getAllVenues } from "../../services/venue.service";
import EventForm from "./EventForm";
import EventTicketsForm from "./EventTicketsForm";
import EventFineTune from "./EventFineTune";

const AddNewEvent = () => {
  const modalRef = useRef(null);
  const {
    isModalOpen,
    setIsModalOpen,
    eventFormActive,
    hasVenue,
    setHasVenue,
    venuesEvents,
    setVenuesEvents,
    setEventFormActive,
    ticketFormActive,
    setTicketFormActive,
    setTuneFormActive,
    tuneFormActive,
  } = useContext(MyEventsContext);
  const [fistPrompt, setFistPrompt] = useState(true);
  const [secondPrompt, setSecondPrompt] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedLayout, setSelectedLayout] = useState(null);
  const [event, setEvent] = useState({
    name: "",
    // images: "",
    eventType: "",
    // status: "",
    description: "",
    date: "",
    time: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
    // venue: "",
  });

  const handleFirstPrompt = () => {
    setFistPrompt(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFistPrompt(true);
    setSecondPrompt(false);
    setSelectedVenue(null);
    setSelectedLayout(null);
    setTicketFormActive(false);
    setTuneFormActive(false);
  };

  const handleClickOutsideModal = (e) => {
    const isClickInsidePack = e.target.closest(".pac-container");

    if (
      modalRef.current &&
      !modalRef.current.contains(e.target) &&
      !isClickInsidePack
    ) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        if (hasVenue) {
          const response = await getAllVenues();
          if (response.success) {
            setVenuesEvents(response.venues);
          }
          console.log("response:", response);
        }
      } catch (error) {
        console.log("venues.error", error.response);
      }
    };
    fetchVenues();
  }, [hasVenue]);

  // const filterVenue = (venueId) => {
  //   const venue = venuesEvents.find((venue) => venue._id === venueId);
  //   setSelectedVenue(venue);
  // };

  console.log("selectedVenue:", selectedVenue);

  return (
    <div className="addnewvenue-myevents">
      <button onClick={openModal}>Add New Event</button>

      {isModalOpen && (
        <div>
          <div className="modal-overlay"></div>
          <div className="event-create-modal" ref={modalRef}>
            <div className="event-close-navbar">
              <button className="event-close-button" onClick={closeModal}>
                X
              </button>
            </div>
            <div className="event-form-title">
              <h1>Let's Create An Amazing Event</h1>
              <h2>Event Information</h2>
            </div>

            {!fistPrompt && !secondPrompt && eventFormActive && (
              <EventForm
                hasVenue={hasVenue}
                selectedVenue={selectedVenue}
                selectedLayout={selectedLayout}
                event={event}
                setEvent={setEvent}
              />
            )}

            {!fistPrompt && !secondPrompt && ticketFormActive && (
              <EventTicketsForm
                hasVenue={hasVenue}
                selectedVenue={selectedVenue}
                event={event}
                setEvent={setEvent}
              />
            )}

            {!fistPrompt &&
              !secondPrompt &&
              !ticketFormActive &&
              tuneFormActive && <EventFineTune />}

            {fistPrompt && (
              <div className="first-prompt">
                <h1 className="regular-font">Will This Event Have a Venue?</h1>
                <div className="first-prompt-flex">
                  <button
                    className="first-prompt-btn"
                    onClick={() => {
                      handleFirstPrompt();
                      setHasVenue(true);
                      setSecondPrompt(true);
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className="first-prompt-btn"
                    onClick={() => {
                      handleFirstPrompt();
                      setHasVenue(false);
                      setSecondPrompt(false);
                      setEventFormActive(true);
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            )}
            {!fistPrompt && !secondPrompt && (
              <div className="event-progress-bar">
                <div>
                  <hr
                    className={
                      eventFormActive || ticketFormActive || tuneFormActive
                        ? "event-progressbar-hr progressbar-active"
                        : "event-progressbar-hr"
                    }
                  />
                  <h1 className="event-progressbar-title">Event</h1>
                </div>
                <div>
                  <hr
                    className={
                      ticketFormActive || tuneFormActive
                        ? "event-progressbar-hr progressbar-active"
                        : "event-progressbar-hr"
                    }
                  />
                  <h1 className="event-progressbar-title">Tickets</h1>
                </div>
                <div>
                  <hr
                    className={
                      tuneFormActive
                        ? "event-progressbar-hr progressbar-active"
                        : "event-progressbar-hr"
                    }
                  />
                  <h1 className="event-progressbar-title">Tune</h1>
                </div>
              </div>
            )}

            {secondPrompt && (
              <div className="event-venue-container-parent">
                <div className="event-venue-container">
                  {selectedVenue ? (
                    <div className="events-venue-layout-container">
                      <div className="events-venue-border">
                        <div className="event-field-container">
                          <h1 className="events-venue-title">Name:</h1>
                          <h1 className="events-venue-title">Capacity:</h1>
                          <h1 className="events-venue-title">Description:</h1>
                        </div>
                        <div className="event-field-container">
                          <h1 className="events-venue-field">
                            {selectedVenue.name}
                          </h1>
                          <h1 className="events-venue-field">
                            {selectedVenue.maxCapacity}
                          </h1>
                          <h1 className="events-venue-field">
                            {selectedVenue.description}
                          </h1>
                        </div>
                        <button
                          className="event-clear-selection"
                          onClick={() => {
                            setSelectedVenue(null);
                            setSelectedLayout(null);
                          }}
                        >
                          Clear Selection
                        </button>
                      </div>
                      <div className="event-venue-layouts">
                        {selectedVenue?.layouts?.map((layout, index) => (
                          <div
                            key={index}
                            onClick={() => setSelectedLayout(layout)}
                            className={
                              selectedLayout?._id === layout._id
                                ? "event-layout-selected"
                                : ""
                            }
                          >
                            <h2 className="event-layout-name">
                              {layout?.name}
                            </h2>
                          </div>
                        ))}
                      </div>
                      {selectedLayout && (
                        <button
                          className="event-venue-next"
                          onClick={() => {
                            setSecondPrompt(false);
                            setEventFormActive(true);
                          }}
                        >
                          Next
                        </button>
                      )}
                    </div>
                  ) : (
                    venuesEvents?.map((venue, index) => (
                      <div
                        key={index}
                        className="events-venue-border"
                        onClick={() => setSelectedVenue(venue)}
                      >
                        <div className="event-field-container">
                          <h1 className="events-venue-title">Name:</h1>
                          <h1 className="events-venue-title">Capacity:</h1>
                          <h1 className="events-venue-title">Description:</h1>
                        </div>
                        <div className="event-field-container">
                          <h1 className="events-venue-field">{venue.name}</h1>
                          <h1 className="events-venue-field">
                            {venue.maxCapacity}
                          </h1>
                         
                          <h1 className="events-venue-field">
                            {venue.description}
                          </h1>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewEvent;
