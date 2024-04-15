import React, { useContext, useState, useEffect } from "react";
import { LayoutContext } from "../../context/layout.context";
import { TableContext } from "../../context/table.context";
import { editBlock, findBlock } from "../../services/block.service";
import { BlockContext } from "../../context/block.context";

const AddTables = () => {
  // *! ----- Context -----------------------------------------------------
  // ?  -- TableContext ---------------------------------------------------
  const { tShapeAdded } = useContext(TableContext);

  // ?  -- LayoutContext --------------------------------------------------
  const { layoutBody } = useContext(LayoutContext);

  // ?  -- BlockContext ---------------------------------------------------
  const { blockId, currentBlock, setCurrentBlock } = useContext(BlockContext);

  // *! ----- Local States ------------------------------------------------

  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredCol, setHoveredCol] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedCol, setSelectedCol] = useState(null);

  // *! ----- Get Current Block -------------------------------------------
  const getCurrentBlock = async (blockId) => {
    try {
      const response = await findBlock(blockId);
      // console.log("FindBlock - AddTables:", response);
      if (response.success) {
        setCurrentBlock(response);
      }
      // console.log("currentBlock:", currentBlock);
    } catch (error) {
      console.log("Find Block - Error:", error);
    }
  };

  // *! ----- Change Current Block ----------------------------------------

  const hoverTableDisplay = (tableType, row, col) => {
    const body = {
      blockTableType: tableType,
      maxRow: row,
      maxCol: col,
    };

    changeBlockTableType(blockId, body);
  };

  // *! ----- Save Current Block ------------------------------------------
  const changeBlockTableType = async (blockId, body) => {
    try {
      const response = await editBlock(blockId, body);
      // console.log("ChangeBlock:", response);
      if (response.success) {
        setCurrentBlock(response);
      }
    } catch (error) {
      console.log("error:", error.response);
    }
  };

  // *! -----  Updated Current Block --------------------------------------

  useEffect(() => {
    getCurrentBlock(blockId);
  }, [blockId, currentBlock?.layout?.blockTableType, selectedCol, selectedRow]);

  // *! ----- Highlight Logic ---------------------------------------------

  const handleMouseEnter = (row, col) => {
    setHoveredRow(row);
    setHoveredCol(col);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
    setHoveredCol(null);
  };

  const shouldHighlight = (row, col) => {
    const isHovered = row <= hoveredRow && col <= hoveredCol;
    const isSelected =
      row <= currentBlock?.layout?.maxRow &&
      col <= currentBlock?.layout?.maxCol;
    return (
      isHovered ||
      (isSelected &&
        currentBlock?.layout?.maxRow !== null &&
        currentBlock?.layout?.maxCol !== null)
    );
  };

  // *! ----- Default Cols & Rows -----------------------------------------

  const rows = 4;
  const cols = 5;

  // *! ----- Render Cols & Rows ------------------------------------------

  const renderSeats = () => {
    let seats = [];
    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= cols; col++) {
        seats.push(
          <div
            key={`${row}-${col}`}
            className={`table-${currentBlock?.layout.blockTableType}-shape ${
              shouldHighlight(row, col) ? "highlight" : ""
            }`}
            onMouseEnter={() => handleMouseEnter(row, col)}
            onMouseLeave={handleMouseLeave}
            onClick={() =>
              hoverTableDisplay(currentBlock?.layout?.blockTableType, row, col)
            }
          />
        );
      }
    }
    return seats;
  };

  // *! -------- DOM ELEMENTS -----------------------
  // *! -------- DOM ELEMENTS -----------------------
  // *! -------- DOM ELEMENTS -----------------------

  return (
    <div className="add-table-container">
      <h1 className="add-table-title">Add Tables</h1>

      {!currentBlock?.layout?.blockTableType && (
        <div className="add-table-shapes">
          <div
            className="add-table-circle"
            onClick={() => hoverTableDisplay("circle")}
          ></div>
          <div
            className="add-table-square"
            onClick={() => hoverTableDisplay("square")}
          ></div>
        </div>
      )}

      {currentBlock?.layout?.blockTableType && (
        <div className="table-hover-container-parent">
          <h1 className="rows-title">Rows ------→</h1>
          <div
            className="table-hover-container"
            style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
          >
            <h1
              className="spaced-item"
              style={{
                gridColumn: `1 / ${cols + 1}`,
              }}
            >
              Cols ------→
            </h1>

            {renderSeats()}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTables;
