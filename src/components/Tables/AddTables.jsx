import React, { useContext, useState, useEffect } from "react";
import { BlockContext } from "../../context/block.context";
import { TableContext } from "../../context/table.context";

const AddTables = ({ block }) => {
  const { currentBlock } = useContext(BlockContext);
  const { addTableCircleManual, addTableSquareManual, tSquares, tCircles } =
    useContext(TableContext);

  const container = document.querySelector(".display-tables-container");


  // console.log("container:", container)

  const [tableBody, setTableBody] = useState({});

  useEffect(() => {
    setTableBody({
      tableType: "",
      x: 0,
      y: 0,
      width: container?.offsetWidth * 0.90 / currentBlock?.maxCol,
      height: container?.offsetHeight * 0.90 / currentBlock?.maxRow,
      status: "Available",
      cprice: 0,
      tickets: 0,
      isIncluded: 0,
      number: 0,
    })
  }, [container?.offsetWidth, container?.offsetHeight, currentBlock])



  console.log("containerWidth:", container?.offsetWidth);
  console.log("containerHeigth:", container?.offsetHeight);

  console.log("currentBlock.maxCol:", currentBlock?.maxCol)
  console.log("currentBlock.maxRow:", currentBlock?.maxRow)
  console.log("tableBody", tableBody)

  // console.log("tSquares:", tSquares)

  const [exactPosition, setExactPosition] = useState(null);
  const handleTableAdd = async (row, col) => {
    if (currentBlock?.blockTableType.toLowerCase() === "circle") {
      try {
        await addTableCircleManual(block._id, tableBody);
        setExactPosition(`${row}:${col}`);
        // console.log("addTableCircleManual - response:", tCircles);
      } catch (error) {
        console.error("addTableCircleManual - Error:", error.response);
      }
    }

    if (currentBlock?.blockTableType.toLowerCase() === "square") {
      try {
        await addTableSquareManual(block._id, tableBody);
        // debugger
        setExactPosition(`${row}:${col}`);
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
            className={currentBlock?._id === block._id ? "grid-item" : "hide"}
            style={{
              backgroundColor: `${block?.backgroundColor}`,
            }}
            onClick={() => handleTableAdd(row, col)}
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
