import React, { createContext, useState, useEffect } from "react";

const ShapeContext = createContext();

function ShapeProvider({ children }) {
  const [column, setColumn] = useState(3);
  const [circleCount, setCircleCount] = useState(0);
  const [squareCount, setSquareCount] = useState(0);
  const [showInput, setShowInput] = useState(false);

  return (
    <ShapeContext.Provider
      value={{
        column,
        setColumn,
        circleCount,
        setCircleCount,
        squareCount,
        setSquareCount,
        showInput,
        setShowInput,
      }}
    >
      {children}
    </ShapeContext.Provider>
  );
}

export { ShapeProvider, ShapeContext };
