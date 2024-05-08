import { createContext, useState } from "react";

const BreakDownContext = createContext();

const BreakDownProvider = ({ children }) => {
    const [selectedMenu, setSelectedMenu] = useState('tickets')



  return (
    <BreakDownContext.Provider value={{selectedMenu,setSelectedMenu}}>{children}</BreakDownContext.Provider>
  );
};

export { BreakDownProvider, BreakDownContext };
