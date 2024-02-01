// GoogleMapsContext.js
import React, { createContext, useState, useEffect } from "react";

export const GoogleMapsContext = createContext(null);

export const GoogleMapsProvider = ({ children }) => {
  const [isApiLoaded, setIsApiLoaded] = useState(false);

  useEffect(() => {
    if (window.google) {
      setIsApiLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      import.meta.env.VITE_GOOGLE_MAPS_API
    }&loading=async&libraries=places`;
    // script.async = true;
    document.head.appendChild(script);
    script.onload = () => {
      setIsApiLoaded(true);
    };

    return () => {
      if (window.google) {
        delete window.google;
      }
      document.head.removeChild(script);
    };
  }, []);

  return (
    <GoogleMapsContext.Provider value={{ isApiLoaded }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};
