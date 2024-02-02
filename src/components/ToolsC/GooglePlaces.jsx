import React, { useContext, useEffect, useRef } from "react";
import { GoogleMapsContext } from "../../context/GoogleMapsContext";

const GooglePlaces = () => {
  const { isApiLoaded, autocompleteInputRef } = useContext(GoogleMapsContext);
  // const autocompleteInputRef = useRef(null);

  useEffect(() => {
    if (isApiLoaded && window.google && window.google.maps) {
      const autocomplete = new google.maps.places.Autocomplete(
        autocompleteInputRef.current,
        {
          componentRestrictions: { country: ["DO"] },
          fields: ["place_id", "geometry", "name", "formatted_address", "address_component"],
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log("Selected place:", place);
      });
    }
  }, [isApiLoaded]); 

  return (
    <div>
      {isApiLoaded && (
        <input
          ref={autocompleteInputRef}
          placeholder="Enter address"
          type="text"
          className="contactform-input"
        />
      )}
    </div>
  );
};

export default GooglePlaces;
