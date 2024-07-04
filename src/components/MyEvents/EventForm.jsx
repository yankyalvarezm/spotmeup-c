import React, { useEffect, useRef, useContext, useState } from "react";
import { GoogleMapsContext } from "../../context/GoogleMapsContext";
import { MyEventsContext } from "../../context/myEvents.context";

const EventForm = ({
  hasVenue,
  selectedVenue,
  event,
  setEvent,
  selectedLayout,
}) => {
  const autocompleteInputRef = useRef(null);
  const { isApiLoaded } = useContext(GoogleMapsContext);
  const {
    setEventFormActive,
    eventFormActive,
    ticketFormActive,
    setTicketFormActive,
  } = useContext(MyEventsContext);
  // const [event, setEvent] = useState({
  //   name: "",
  //   // images: "",
  //   eventType: "",
  //   // status: "",
  //   description: "",
  //   date: "",
  //   time: "",
  //   address: {
  //     street: "",
  //     city: "",
  //     state: "",
  //     zip: "",
  //   },
  //   // venue: "",
  // });
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState(null);
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length) {
      setEvent((prev) => ({ ...prev, images: [...e.target.files] }));
    } else {
      setEvent((prev) => ({ ...prev, images: [] }));
    }
  };
  useEffect(() => {
    console.log("API Loaded:", isApiLoaded);
    if (isApiLoaded && autocompleteInputRef.current && !hasVenue) {
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

          setEvent((prevEvent) => ({
            ...prevEvent,
            address: {
              ...prevEvent.address,
              street: place.formatted_address,
              city: city,
              state: state,
              zip: zip,
            },
          }));
        }
      });
    }
  }, [isApiLoaded]);

  useEffect(() => {
    setEventFormActive(true);
  }, []);

  useEffect(() => {
    if (hasVenue) {
      setEvent((prev) => ({
        ...prev,
        hasVenue,
        venue: selectedVenue._id,
        layout: selectedLayout._id,
        address: {
          street: selectedVenue.address.street,
          city: selectedVenue.address.city,
          zip: selectedVenue.address.zip,
          state: selectedVenue.address.state,
        },
      }));
    }
  }, [hasVenue]);

  console.log("eventForm:", eventFormActive);

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in event) {
      if (event[key] === "") {
        setMessage(`Please Fill in the ${key} field.`);
      }
    }

    setEventFormActive(false);
    setTicketFormActive(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const [nestedKey, key] = name.split(".");

    if (nestedKey && key) {
      setEvent((prevVenue) => ({
        ...prevVenue,
        [nestedKey]: {
          ...prevVenue[nestedKey],
          [key]: value,
        },
      }));
    } else {
      setEvent((prevVenue) => ({
        ...prevVenue,
        [name]: value,
      }));
    }
  };

  console.log("event:", event);

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div className="event-form-flex">
        <div className="event-form-input-label">
          <label htmlFor="eventType">Event Type</label>
          <select
            name="eventType"
            className="event-type-select"
            value={event.eventType}
            onChange={handleInputChange}
          >
            <option value="">-------</option>
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
          <label htmlFor="name">Event Name</label>
          <input
            className="event-name-input"
            name="name"
            type="text"
            value={event.name}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="event-form-input-label">
        <label htmlFor="address.street">Full Address</label>
        <input
          ref={autocompleteInputRef}
          type="text"
          name="address.street"
          disabled={hasVenue}
          onChange={handleInputChange}
          value={event.address.street}
        />
      </div>
      <div className="event-form-flex">
        <div className="event-form-input-label">
          <label htmlFor="address.state">State</label>
          <input
            name="address.state"
            type="text"
            value={event.address.state}
            disabled={hasVenue}
            onChange={handleInputChange}
          />
        </div>
        <div className="event-form-input-label">
          <label htmlFor="address.city">City</label>
          <input
            name="address.city"
            type="text"
            value={event.address.city}
            disabled={hasVenue}
            onChange={handleInputChange}
          />
        </div>
        <div className="event-form-input-label">
          <label htmlFor="address.zip">Zip Code</label>
          <input
            name="address.zip"
            type="text"
            value={event.address.zip}
            disabled={hasVenue}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="event-form-flex">
        <div className="event-form-input-label">
          <label htmlFor="date">Date</label>
          <input
            name="date"
            type="date"
            value={event.date}
            onChange={handleInputChange}
          />
        </div>
        <div className="event-form-input-label">
          <label htmlFor="time">Time</label>
          <input
            name="time"
            type="time"
            className="event-input-time"
            minuteStep={10}
            value={event.time}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="event-venue-images-description">
        <div className="event-form-input-label">
          <label htmlFor="description" className="event-input-time">
            About
          </label>
          <textarea
            name="description"
            type="textarea"
            className="event-textarea"
            onChange={handleInputChange}
            value={event.description}
          />
        </div>

        <div>
          <h1 className="event-input-time">Images</h1>
          <input
            type="file"
            onChange={handleImageChange}
            multiple
            accept="image/*"
            name="images"
          />
        </div>
      </div>
      {message && <h1 className="event-prompt-message">{message}</h1>}

      <button type="submit" className="event-submit-form-one">
        Next
      </button>
    </form>
  );
};

export default EventForm;
