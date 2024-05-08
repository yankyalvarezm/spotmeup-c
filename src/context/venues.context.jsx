import React, { createContext, useState, useEffect } from "react";
import { getOneVenue } from "../services/venue.service";
import { useParams } from "react-router-dom";

const VenuesContext = createContext();

function VenuesProvider({ children }) {
  const [venueId, setVenueId] = useState(null);
  const [venueDetail, setVenueDetail] = useState(null);

  const selectVenueId = (id) => {
    setVenueId(id);
  };

  useEffect(() => {
    const findOneVenue = async () => {
      try {
        const venueDetails = await getOneVenue(venueId);
        setVenueDetail(venueDetails.venue);
      } catch (error) {
        console.log(error.response);
      }
    };

    findOneVenue();
  }, [venueId]);

  return (
    <VenuesContext.Provider
      value={{
        venueId,
        setVenueId,
        selectVenueId,
        venueDetail,
        setVenueDetail,
      }}
    >
      {children}
    </VenuesContext.Provider>
  );
}

export { VenuesProvider, VenuesContext };
