import React, { createContext, useState, useRef, useEffect } from "react";
import { createTable } from "../services/table.service";
import { editTable, getAllTables } from "../services/table.service";

const TableContext = createContext();

function TableProvider({ children }) {
  const tShapeForm = useRef();
  const tSquareRef = useRef(null);
  const tCircleRef = useRef(null);
  const [tCircles, setTCircles] = useState([]);
  const [tSquares, setTSquares] = useState([]);
  const [tShapeAdded, setTShapeAdded] = useState(false);
  const [showTShapeForm, setShowTShapeForm] = useState(false);
  const [tableId, setTableId] = useState(null);

  const fetchTables = async (blockId) => {
    try {
      const response = await getAllTables(blockId);
      if (response.success) {
        const circleFilter = response.tables.filter(
          (table) => table.tableType.toLowerCase() === "circle"
        );
        const squareFilter = response.tables.filter(
          (table) => table.tableType.toLowerCase() === "square"
        );
        setTCircles(circleFilter);
        setTSquares(squareFilter);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addTableCircleManual = async (blockId, body) => {
    body.tableType = "Circle";
    body.number = tCircles.length + 1;
    try {
      const response = await createTable(blockId, body);
      console.log("response circle table:", response);
      if (response.success) {
        setTCircles((prev) => [...prev, response.table]);
        setTShapeAdded(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addTableSquareManual = async (blockId, body) => {
    body.tableType = "Square";
    body.number = tSquares?.length + 1 || 1;
    try {
      const response = await createTable(blockId, body);
      console.log("response square table:", response);
      if (response.success) {
        setTSquares((prev) => [...prev, response.table]);
        setTShapeAdded(true);
        console.log("Table Square Added:", tSquares);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // console.log("Table Square Added:", tSquares);

  function debounce(fn, delay) {
    let timeoutID = null;
    return function (...args) {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  // console.log("blockID Contect", blockId);

  const updateTShape = debounce((tableId, body) => {
    editTable(tableId, body);
    // console.log("Tools debounce working");
  }, 500);

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
        addTableSquareManual,
        updateTShape,
        tCircleRef,
        tSquareRef,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

export { TableProvider, TableContext };
