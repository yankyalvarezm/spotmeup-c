import React, { createContext, useState } from "react";

const TicketsContext = createContext();

function TicketsProvider({ children }) {
  // const [selected, setSelected] = useState({ id: "", price: 0 });
  const [ticketsCart, setTicketsCart] = useState([]);

  return (
    <TicketsContext.Provider
      value={{
        // selected,
        // setSelected,
        ticketsCart,
        setTicketsCart,
      }}
    >
      {children}
    </TicketsContext.Provider>
  );
}

export { TicketsProvider, TicketsContext };
