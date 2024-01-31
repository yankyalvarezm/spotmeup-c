import React, { useEffect, useRef } from "react";

const GooglePlaces = () => {
  const autocompleteInputRef = useRef(null);

  useEffect(() => {
    
    window.initAutocomplete = () => {
      new google.maps.places.Autocomplete(autocompleteInputRef.current, {
        types: ["address"],
        componentRestrictions: { country: ["US"] },
        fields: ["place_id", "geometry", "name"],
      });
    };

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      import.meta.env.VITE_GOOGLE_PLACES_API
    }&libraries=places&callback=initAutocomplete`;
    document.head.appendChild(script);

    return () => {
      window.initAutocomplete = undefined;
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      <input
        ref={autocompleteInputRef}
        placeholder="address"
        type="text"
        className="contactform-input"
      />
    </div>
  );
};

export default GooglePlaces;
