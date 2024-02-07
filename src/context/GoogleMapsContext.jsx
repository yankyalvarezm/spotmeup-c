// GoogleMapsContext.js
import React, { createContext, useState, useEffect } from "react";

export const GoogleMapsContext = createContext();

export const GoogleMapsProvider = ({ children }) => {
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google) {
        setIsApiLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API}&libraries=places&loading=async`;
      document.head.appendChild(script);
      script.onload = () => {
        setIsApiLoaded(true);
      };
    };

    loadGoogleMapsScript();
    
  }, []);

  const initializeAutocomplete = (inputRef) => {
    if (!isApiLoaded || !window.google) return;

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef, {
      componentRestrictions: { country: ["DO"] },
      fields: ["place_id", "geometry", "name", "formatted_address", "address_component"],
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      setSelectedAddress(place.formatted_address || "");
    });
  };

  return (
    <GoogleMapsContext.Provider value={{ isApiLoaded, selectedAddress, initializeAutocomplete }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};
