import React, { useState, useEffect, useRef, useContext } from "react";
import { MyEventsContext } from "../../context/myEvents.context";
import EventForm from "./EventForm";

const AddNewEvent = () => {
  const modalRef = useRef(null);
  const { isModalOpen, setIsModalOpen } = useContext(MyEventsContext);
  const [fistPrompt, setfistPrompt] = useState(true);

  const handleFirstPrompt = () => {
    setfistPrompt(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setfistPrompt(true);
  };

  const handleClickOutsideModal = (e) => {
    const isClickInsidePack = e.target.closest(".pac-container");

    if (
      modalRef.current &&
      !modalRef.current.contains(e.target) &&
      !isClickInsidePack
    ) {
      closeModal();
      setfistPrompt(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  return (
    <div className="addnewvenue-myevents">
      <button onClick={() => openModal()}>Add New Event</button>

      {isModalOpen && (
        <div>
          <div className="modal-overlay"></div>
          <div className="event-create-modal" ref={modalRef}>
            <div className="event-close-navbar">
              <button
                className="event-close-button"
                onClick={() => closeModal()}
              >
                X
              </button>
            </div>
            <div className="event-form-title">
              <h1>Let's Create An Amazing Event</h1>
              <h2>Event Information</h2>
            </div>

            {!fistPrompt && <EventForm />}

            {fistPrompt && (
              <div className="first-prompt">
                <h1 className="regular-font">
                  Will This Event be Hosted In A Venue?
                </h1>
                <div className="first-prompt-flex">
                  <button
                    className="first-prompt-btn"
                    onClick={handleFirstPrompt}
                  >
                    Yes
                  </button>
                  <button
                    className="first-prompt-btn"
                    onClick={handleFirstPrompt}
                  >
                    No
                  </button>
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
