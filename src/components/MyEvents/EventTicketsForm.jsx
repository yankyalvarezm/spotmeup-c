import React, { useContext, useEffect } from "react";
import { MyEventsContext } from "../../context/myEvents.context";

const EventTicketsForm = ({ setEvent, selectedVenue, event, hasVenue }) => {
  const { setTicketFormActive, tuneFormActive, setTuneFormActive } =
    useContext(MyEventsContext);
  const createEvent = (e) => {
    e.preventDefault();
  };

  const handleTune = (e) => {
    e.preventDefault();
    setTuneFormActive(true);
    setTicketFormActive(false);
  };

  console.log("Event:", event);

  useEffect(() => {
    if (hasVenue) {
      setEvent((prev) => ({
        ...prev,
        hasVenue,
        // venue: selectedVenue._id,
        // address: {
        //   street: selectedVenue.address.street,
        //   city: selectedVenue.address.city,
        //   zip: selectedVenue.address.zip,
        //   state: selectedVenue.address.state,
        // },
        sales: {
          date: selectedVenue.sales.date,
          time: selectedVenue.sales.time,
        },
      }));
    }
  }, [hasVenue]);

  return (
    <form className="tickets-form">
      <div>
        <div className="tickets-title-input-container">
          <h1 className="tickets-input-title">Tickets Sales Start </h1>
          <div className="tickets-input-container">
            <input type="date" className="tickets-input" />
            <input type="time" className="tickets-input" />
          </div>
        </div>

        {/* <div className="tickets-title-input-container">
          <h1 className="tickets-input-title">Tickets Sales End Sale Time</h1>
          <div className="tickets-input-container">
            <input type="date" className="tickets-input" />
            <input type="time" className="tickets-input" placeholder="8:00AM" />
          </div>
        </div> */}

        <div className="tickets-title-input-container">
          <div className="tickets-input-container">
            <label htmlFor="maxQuantity" className="ticket-maxQuantity">
              Max Quantity Per User
            </label>
            <input
              name="maxQuantity"
              type="number"
              className="tickets-input max-ticket-input"
              // placeholder="1"
              defaultValue={2}
              min={2}
              max={20}
            />
          </div>
          <hr className="tickets-hr" />
        </div>

        <button className="ticket-fine-tune" onClick={handleTune}>
          <h1 className="ticket-symbol">+</h1> <br />
          <h1 className="ticket-guide-tune">
            Add Things like "Early Bird Special"
          </h1>
        </button>
      </div>

      <button className="event-submit-form-one" onClick={createEvent}>
        Create Event
      </button>
    </form>
  );
};

export default EventTicketsForm;
