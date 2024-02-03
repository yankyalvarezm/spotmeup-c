import React, { useContext, useEffect } from "react";
import { GoogleMapsContext } from "../../context/GoogleMapsContext";

const GoogleMap = () => {
  const { isApiLoaded } = useContext(GoogleMapsContext);

  const defaultCenter = { lat: 19.21555, lng: -70.51659 };
  const defaultZoom = 16;
  const mapOptions = {
    zoomControl: false,
    fullscreenControl: false,
  };

  useEffect(() => {
    if (isApiLoaded && window.google && window.google.maps) {
      const map = new window.google.maps.Map(document.getElementById("myMap"), {
        center: defaultCenter,
        zoom: defaultZoom,
        options: mapOptions,
      });

      new window.google.maps.Marker({
        position: defaultCenter,
        map: map,
        title: "Oh nou",
      });
    }
  }, [isApiLoaded]);

  return (
    <div
      className="googlemap-container"
      id="myMap"
    ></div>
  );
};

export default GoogleMap;
