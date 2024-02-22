import React, { createContext, useState, useEffect } from "react";

const ShapeContext = createContext();

function ShapeProvider({ children }) {
  const [column, setColumn] = useState(3);
  const [circleCount, setCircleCount] = useState(0);
  const [squareCount, setSquareCount] = useState(0);

  return (
    <ShapeContext.Provider
      value={{
        column,
        setColumn,
        circleCount,
        setCircleCount,
        squareCount,
        setSquareCount,
      }}
    >
      {children}
    </ShapeContext.Provider>
  );
}

export { ShapeProvider, ShapeContext };
