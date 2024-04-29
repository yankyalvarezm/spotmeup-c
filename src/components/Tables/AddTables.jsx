import React, { useContext, useState, useEffect } from "react";
import { BlockContext } from "../../context/block.context";
import { TableContext } from "../../context/table.context";

const AddTables = ({ block }) => {
  const { currentBlock } = useContext(BlockContext);
  const {
    addTableCircleManual,
    addTableSquareManual,
    tSquares,
    tCircles,
    lockGrid,
    tShapeAdded,
    setTShapeAdded,
  } = useContext(TableContext);

  const container = document.querySelector(".display-tables-container");

  // console.log("container:", container)

  const [tableBody, setTableBody] = useState({});
  const [exactPosition, setExactPosition] = useState({
    row: 0,
    col: 0,
  });

  const tableWidth = (container?.offsetWidth * 0.95) / currentBlock?.maxCol;
  const tableHeigth = (container?.offsetHeight * 0.95) / currentBlock?.maxRow;
  const positionSubRow = exactPosition.row < 1 ? 0 : 1;
  const positionSubCol = exactPosition.col < 1 ? 0 : 1;
  const rowGap = exactPosition.col > 1 ? tableWidth * 0.065 : 0;
  const colGap = exactPosition.row > 1 ? tableWidth * 0.065 : 0;

  // console.log("-------- Start -----------");
  // console.log("ExacPosition - Row:", exactPosition?.row);
  // console.log("ExacPosition - Col:", exactPosition?.col);
  // console.log("tableWidth:", tableWidth);
  // console.log("tableHeight:", tableHeigth);
  // console.log("positionSubRow:", positionSubRow);
  // console.log("positionSubCol:", positionSubCol);
  // console.log("rowGap:", rowGap);
  // console.log("colGap:", colGap);
  // console.log("-------- End -----------");

  useEffect(() => {
    setTableBody({
      tableType: "",
      x: (tableWidth + rowGap) * (exactPosition.col - positionSubRow),
      y: (tableHeigth + colGap) * (exactPosition.row - positionSubCol),
      width: tableWidth,
      height: tableHeigth,
      status: "Available",
      cprice: 0,
      tickets: 0,
      isIncluded: 0,
      row: exactPosition.row,
      col: exactPosition.col,
      number: 0,
    });
  }, [
    container?.offsetWidth,
    container?.offsetHeight,
    currentBlock,
    exactPosition.row,
    exactPosition.col,
  ]);

  const handleSetPosition = (row, col) => {
    setExactPosition({ row, col });
  };

  // console.log("tSquares:", tSquares)

  const handleTableAdd = async (row, col) => {
    if (currentBlock?.blockTableType.toLowerCase() === "circle") {
      try {
        await addTableCircleManual(block._id, { ...tableBody, row, col });
        setTShapeAdded(true);
        // console.log("addTableCircleManual - response:", tCircles);
      } catch (error) {
        console.error("addTableCircleManual - Error:", error.response);
      }
    }

    if (currentBlock?.blockTableType.toLowerCase() === "square") {
      try {
        await addTableSquareManual(block._id, { ...tableBody, row, col });
        // debugger
        setTShapeAdded(true);
        // setExactPosition({ row: row, col: col });
        console.log("addTableSquareManual - Response:", tSquares);
      } catch (error) {
        console.error("addTableSquareManual - Error:", error);
      }
    }
  };

  // console.log("Exact Position:", exactPosition);

  const renderAdd = () => {
    let tables = [];
    for (let row = 1; row <= currentBlock?.maxRow; row++) {
      for (let col = 1; col <= currentBlock?.maxCol; col++) {
        {
          /* ------------------- Grid Item --------------------------- */
        }
        tables.push(
          <div
            key={`${row}-${col}`}
            className={
              currentBlock?._id === block._id && !lockGrid
                ? "grid-item"
                : "hide"
            }
            style={{
              backgroundColor: `${block?.backgroundColor}`,
            }}
            onClick={() => handleTableAdd(row, col)}
            onMouseEnter={() => handleSetPosition(row, col)}
          >
            Add
          </div>
        );
      }
    }
    return tables;
  };

  return <>{renderAdd()}</>;
};

export default AddTables;
