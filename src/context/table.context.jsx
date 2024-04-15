import React, { createContext, useState, useRef } from "react";
import { createTable } from "../services/table.service";

const TableContext = createContext();

function TableProvider({ children }) {
  const tShapeForm = useRef();
  const [tCircles, setTCircles] = useState([]);
  const [tSquares, setTSquares] = useState([]);
  const [tShapeAdded, setTShapeAdded] = useState(false);
  const [showTShapeForm, setShowTShapeForm] = useState(false);
  const [tableId, setTableId] = useState({});


  const fetchTables = async (blockId) => {
    try {
      const response = await getAllTables(blockId)
      if(response.success){
        const circleFilter = response.tables.filter((table) => table.tableType.toLowerCase() === "circle")
        const squareFilter = response.tables.filter((table) => table.shapeType.toLowerCase() === "square");
        setTCircles(circleFilter)
        setTSquares(squareFilter)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const addTableCircleManual = async (blockId, body) => {
    body.tableType = "Circle"
    try {
      const response = await createTable(blockId, body);
      if (response.success) {
        setTCircles((prev) => [...prev, response.table]);
        setTShapeAdded(true);
        console.log("Table Circle Added:", bCircle.length);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addTableSquareManual = async (blockId, body) => {
    body.tableType = "Square";
    try {
      const response = await createTable(blockId, body);
      if (response.success) {
        setTSquares((prev) => [...prev, response.block]);
        setTShapeAdded(true);
        console.log("Table Square Added:", response.block);
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
        fetchTables,
        addTableCircleManual,
        addTableSquareManual
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

export { TableProvider, TableContext };
