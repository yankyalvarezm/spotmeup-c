import React, { useEffect, useRef, useContext, useState } from "react";
import { GoogleMapsContext } from "../../context/GoogleMapsContext";

const EventForm = () => {
  const autocompleteInputRef = useRef(null);
  const { isApiLoaded } = useContext(GoogleMapsContext);
  useEffect(() => {
    console.log("API Loaded:", isApiLoaded);
    if (isApiLoaded && autocompleteInputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteInputRef.current,
        {
          componentRestrictions: { country: ["DO", "US"] },
          fields: [
            "place_id",
            "geometry",
            "name",
            "formatted_address",
            "address_components",
          ],
        }
      );

      const getComponent = (components, type) => {
        return (
          components.find((component) => component.types.indexOf(type) !== -1)
            ?.long_name || ""
        );
      };

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log("formatted address:", place);
        if (place.formatted_address && place.address_components) {
          const city = getComponent(place.address_components, "locality");
          const state = getComponent(
            place.address_components,
            "administrative_area_level_1"
          );
          const zip = getComponent(place.address_components, "postal_code");
        }
      });
    }
  }, [isApiLoaded]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [event, setEvent] = useState({
    name: "",
    images: "",
    eventType: "",
    status: "",
    description: "",
    date: "",
    time: "",
    address: "",
    venue: "",
    host: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  return (
    <form className="event-form">
      <div className="event-form-input-label">
        <label htmlFor="EventType">Event Type</label>
        <select id="EventType" className="event-type-select">
          <option value="">--select--</option>
          <option value="concert">Concert</option>
          <option value="conference">Conference</option>
          <option value="meetup">Meetup</option>
          <option value="workshop">Workshop</option>
          <option value="webinar">Webinar</option>
          <option value="webinar">NightClub</option>
          <option value="webinar">Private Event</option>
        </select>
      </div>
      <div className="event-form-input-label">
        <label htmlFor="EventName">Event Name</label>
        <input type="text" value={event.name} />
      </div>
      <div className="event-form-input-label">
        <label htmlFor="Address">Address</label>
        <input type="text" ref={autocompleteInputRef} value={event.address} />
      </div>
      <div className="event-form-input-label">
        <label htmlFor="Date">Date</label>
        <input type="date" value={event.date} />
      </div>
      <div className="event-form-input-label">
        <label htmlFor="Time">Time</label>
        <input
          type="time"
          className="event-input-time"
          minuteStep={10}
          value={event.time}
        />
      </div>
      <div className="event-form-input-label">
        <label htmlFor="About" className="event-input-time">
          About
        </label>
        <textarea type="textarea" className="event-textarea" />
      </div>

      <button
        type="submit"
        className="event-submit-form-one"
        onClick={handleSubmit}
      >
        Next
      </button>
    </form>
  );
};

export default EventForm;
