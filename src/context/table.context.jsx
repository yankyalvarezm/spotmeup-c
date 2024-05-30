import React, { createContext, useState, useRef, useEffect } from "react";
import { createTable } from "../services/table.service";
import {
  editTable,
  getAllTables,
  getAllTablesOnBlock,
} from "../services/table.service";
import { findTable } from "../services/table.service";

const TableContext = createContext();

function TableProvider({ children }) {
  const tShapeForm = useRef();
  const tSquareRef = useRef(null);
  const tCircleRef = useRef(null);
  const containerRef = useRef(null);
  const [tCircles, setTCircles] = useState([]);
  const [tSquares, setTSquares] = useState([]);
  const [tShapeAdded, setTShapeAdded] = useState(false);
  const [showTShapeForm, setShowTShapeForm] = useState(false);
  const [tableId, setTableId] = useState(null);
  const [lockGrid, setLockGrid] = useState(false);
  const [tShapeEdited, setTShapeEdited] = useState(false);
  const [editingTables, setEditingTables] = useState(false);
  // const [thisBlockId, setThisBlockId] = useState(null)

  const fetchTables = async (layoutId) => {
    try {
      const response = await getAllTables(layoutId);
      // console.log("fetchTables:", response);
      if (response.success) {
        const circleFilter = response.tables.filter(
          (table) => table.tableType.toLowerCase() === "circle"
        );
        const squareFilter = response.tables.filter(
          (table) => table.tableType.toLowerCase() === "square"
        );
        setTCircles(circleFilter);

        setTSquares(squareFilter);
        // debugger;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTablesOnBlock = async (blockId) => {
    try {
      const response = await getAllTablesOnBlock(blockId);

      
      if (response.success) {
        const circleFilter = response.tables.filter(
          (table) => table.tableType.toLowerCase() === "circle"
        );
        const squareFilter = response.tables.filter(
          (table) => table.tableType.toLowerCase() === "square"
        );
        setTCircles((prev) =>
          prev.map((table) =>
            circleFilter.find((t) => t._id === table._id)
              ? circleFilter.find((t) => t._id === table._id)
              : table
          )
        );
        setTSquares((prev) =>
          prev.map((table) =>
            squareFilter.find((t) => t._id === table._id)
              ? squareFilter.find((t) => t._id === table._id)
              : table
          )
        );

        // debugger;
      }
    } catch (error) {
      console.log("error:", error);
    }
  };


  const addTableCircleManual = async (blockId, body) => {
    body.tableType = "Circle";
    body.number =
      tCircles.filter((tCircle) => tCircle.block == blockId).length + 1 || 1;
    try {
      const response = await createTable(blockId, body);
      
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
    body.number =
      tSquares.filter((tSquare) => tSquare.block == blockId).length + 1 || 1;
    try {
      const response = await createTable(blockId, body);
      
      if (response.success) {
        setTSquares((prev) => [...prev, response.table]);
        setTShapeAdded(true);
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTShapeForm = () => {
    setShowTShapeForm((prev) => !prev);
  };

  // console.log("Table Circle Added:", tCircles);

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

  const updateTShape = debounce(async (tableId, body) => {
    await editTable(tableId, body);
    // console.log("updateTShape");
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
        lockGrid,
        setLockGrid,
        toggleTShapeForm,
        containerRef,
        tShapeEdited,
        setTShapeEdited,
        editingTables,
        setEditingTables,
        fetchTablesOnBlock,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

export { TableProvider, TableContext };
