import React, { useContext, useEffect, useState } from "react";
import { MyEventsContext } from "../../context/myEvents.context";
import { createEvent, imageUploader } from "../../services/events.service";
import { useNavigate } from "react-router-dom";

const EventTicketsForm = ({ setEvent, selectedVenue, event, hasVenue }) => {
  const navigate = useNavigate();
  const { setTicketFormActive, tuneFormActive, setTuneFormActive } =
    useContext(MyEventsContext);

  const [message, setMessage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createEvent({ ...event, images: [""] });
      if (response.success) {
        const formData = new FormData();
        if (event.images.length) {
          event.images.forEach((img) => {
            formData.append("image", img);
          });
          const uploadResponse = await imageUploader(
            response.event._id,
            formData
          );
          console.log("uploadREsponse:", uploadResponse);
          if (uploadResponse.success) {
            console.log(uploadResponse.message);
          }
        }
      }
      if (response.success) {
        console.log("Event Created:", response);
        setMessage("Event Created!");
        setTimeout(() => {
          setTicketFormActive(false);
          navigate(
            `/admin/designpage/EventBreakDown/${response.event._id}/${response.event.layout._id}`
          );
        }, 1000);
      }
    } catch (error) {
      setMessage(error.response.message);
    }
  };
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  }, [message]);

  const handleTune = (e) => {
    e.preventDefault();
    setTuneFormActive(true);
    setTicketFormActive(false);
  };

  console.log("Event:", event);

  // useEffect(() => {
  //   if (hasVenue) {
  //     setEvent((prev) => ({
  //       ...prev,
  //       hasVenue,
  //       // venue: selectedVenue._id,
  //       // address: {
  //       //   street: selectedVenue.address.street,
  //       //   city: selectedVenue.address.city,
  //       //   zip: selectedVenue.address.zip,
  //       //   state: selectedVenue.address.state,
  //       // },
  //       sales: {
  //         date: selectedVenue.sales.date,
  //         time: selectedVenue.sales.time,
  //       },
  //     }));
  //   }
  // }, [hasVenue]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      className="tickets-form"
      // onSubmit={handleSubmit}
    >
      <div>
        <div className="tickets-title-input-container">
          <h1 className="tickets-input-title">Tickets Sales Start </h1>
          <div className="tickets-input-container">
            <input
              type="date"
              name="saleStartDate"
              className="tickets-input"
              onChange={handleInputChange}
            />
            <input
              type="time"
              name="saleStartTime"
              className="tickets-input"
              onChange={handleInputChange}
            />
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
            <label htmlFor="purchaseLimit" className="ticket-maxQuantity">
              Max Quantity Per User
            </label>
            <input
              name="purchaseLimit"
              type="number"
              className="tickets-input max-ticket-input"
              // placeholder="1"
              defaultValue={2}
              onChange={handleInputChange}
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
      {message && <h1 className="event-prompt-message">{message}</h1>}
      <button
        type="submit"
        className="event-submit-form-one"
        onClick={handleSubmit}
      >
        Create Event
      </button>
    </form>
  );
};

export default EventTicketsForm;
