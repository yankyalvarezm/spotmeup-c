import React, { createContext, useState, useRef } from "react";

const TableContext = createContext();

function TableProvider({ children }) {
  const tShapeForm = useRef();
  const [tCircles, setTCircles] = useState([]);
  const [tSquares, setTSquares] = useState([]);
  const [tShapeAdded, setTShapeAdded] = useState(false);
  const [showTShapeForm, setShowTShapeForm] = useState(false);
  const [tableId, setTableId] = useState({});

  const addTableCircle = async (layoutId, body) => {
    body.blockType = "Circle";
    try {
      const response = await createBlock(layoutId, body);
      if (response.success) {
        setTCircles((prev) => [...prev, response.block]);
        setTShapeAdded(true);
        console.log("Block Circle Added:", bCircle.length);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addTableSquare = async (layoutId, body) => {
    body.blockType = "Square";
    try {
      const response = await createBlock(layoutId, body);
      if (response.success) {
        setTSquares((prev) => [...prev, response.block]);
        setTShapeAdded(true);
        console.log("Block Square Added:", response.block);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TableContext.Provider
      value={{
        tShapeForm,
        tCircles,
        setTCircles,
        tSquares,
        setTSquares,
        tShapeAdded,
        setTShapeAdded,
        showTShapeForm,
        setShowTShapeForm,
        tableId,
        setTableId,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

export { TableProvider, TableContext };
