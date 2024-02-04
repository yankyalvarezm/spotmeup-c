import React, { useState, useContext, useEffect, useRef } from "react";
import { createVenue } from "../../services/venue.service";
import { MyEventsContext } from "../../context/MyEvents.context";
import { GoogleMapsContext } from "../../context/GoogleMapsContext";

const VenueForm = () => {
  const { toggleVenuesForm } = useContext(MyEventsContext);
  const { isApiLoaded } = useContext(GoogleMapsContext);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [messageNotSuccess, setMessageNotSuccess] = useState(null);
  const autocompleteInputRef = useRef(null);

  const [venue, setVenue] = useState({
    name: "",
    maxCapacity: 0,
    contact: {
      email: "",
      owner: "",
      telephone: "",
    },
    address: {
      street: "",
      state: "",
      city: "",
      zip: "",
    },
    description: "",
  });

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

          setVenue((prevVenue) => ({
            ...prevVenue,
            address: {
              ...prevVenue.address,
              street: place.formatted_address,
              city: city,
              state: state,
              zip: zip,
            },
            name: place.name,
          }));
        }
      });
    }
  }, [isApiLoaded]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createVenue(venue);
      if (response.success) {
        setMessageSuccess(response.message);
      }
      setTimeout(() => {
        setMessageSuccess(null);
        toggleVenuesForm();
      }, 3000);
    } catch (error) {
      console.error("Line 34 - Error:", error);
      setMessageNotSuccess(error.response.data.message);
      setTimeout(() => {
        setMessageNotSuccess(null);
      }, 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const [nestedKey, key] = name.split(".");

    if (nestedKey && key) {
      setVenue((prevVenue) => ({
        ...prevVenue,
        [nestedKey]: {
          ...prevVenue[nestedKey],
          [key]: value,
        },
      }));
    } else {
      setVenue((prevVenue) => ({
        ...prevVenue,
        [name]: value,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="venueform-container">
      <div>
        {messageSuccess && (
          <h1 className="success-message">{messageSuccess}</h1>
        )}
        {messageNotSuccess && (
          <h1 className="notsucces-messsage">{messageNotSuccess}</h1>
        )}
        <div className="venueform-spacefortwo">
          <div className="venueform-label-input">
            <label htmlFor="address.street">Full Address</label>
            <input
              ref={autocompleteInputRef}
              type="text"
              name="address.street"
              onChange={handleChange}
              value={venue.address.street}
            />
          </div>

          <div className="venueform-label-input">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={venue.name}
            />
          </div>
        </div>

        <div className="venueform-spacefortwo">
          <div className="venueform-label-input">
            <label htmlFor="address.city">City</label>
            <input
              type="text"
              name="address.city"
              onChange={handleChange}
              value={venue.address.city}
            />
          </div>

          <div className="venueform-label-input">
            <label htmlFor="address.state">State / Provice</label>
            <input
              type="state"
              name="address.state"
              onChange={handleChange}
              value={venue.address.state}
            />
          </div>
        </div>

        <div className="venueform-spacefortwo">
          <div className="venueform-label-input">
            <label htmlFor="address.zip">Zip-Code</label>
            <input
              type="number"
              name="address.zip"
              onChange={handleChange}
              value={venue.address.zip}
            />
          </div>

          <div className="venueform-label-input">
            <label htmlFor="contact.owner">Owner</label>
            <input
              type="owner"
              name="contact.owner"
              onChange={handleChange}
              value={venue.contact.owner}
            />
          </div>
        </div>

        <div className="venueform-spacefortwo-special-container">
          <div className="venueform-label-input">
            <label htmlFor="maxCapacity">Max Capacity</label>
            <input
              type="number"
              name="maxCapacity"
              onChange={handleChange}
              value={venue.maxCapacity}
            />
          </div>

          <div className="venueform-spacefortwo-special">
            <div className="venueform-label-input-special">
              <label htmlFor="contact.email">e-mail</label>
              <input
                type="email"
                name="contact.email"
                onChange={handleChange}
                value={venue.contact.email}
              />
            </div>
            <div className="venueform-label-input-special">
              <label htmlFor="contact.telephone">Telephone</label>
              <input
                type="telephone"
                name="contact.telephone"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      <button type="submit" className="editprofile-submit width-100">
        Submit
      </button>
    </form>
  );
};

export default VenueForm;
