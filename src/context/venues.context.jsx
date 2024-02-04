import React, { createContext, useState, useEffect } from "react";

const VenuesContext = createContext();

function VenuesProvider({ children }) {
  const [venueId, setVenueId] = useState(null);

  const selectVenueId = (id) => {
    setVenueId(id);
  };

  return (
    <VenuesContext.Provider
      value={{
        venueId,
        selectVenueId,
      }}
    >
      {children}
    </VenuesContext.Provider>
  );
}

export { VenuesProvider, VenuesContext };
