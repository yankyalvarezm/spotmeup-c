import React from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

const GoogleMap = () => {
  const defaultCenter = { lat: 19.21555, lng: -70.51659 }; 
  const defaultZoom = 16;
  const mapOptions = {
    zoomControl: false,
    fullscreenControl: false,
  };

  return (
    <div className="googlemap-container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        options={mapOptions}
      >
        <Marker lat={defaultCenter.lat} lng={defaultCenter.lng} text="oh nou" />
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
