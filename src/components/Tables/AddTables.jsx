import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { LayoutContext } from "../../context/layout.context";
import { TableContext } from "../../context/table.context";

const AddTables = () => {
  const { tShapeAdded } = useContext(TableContext);
  const { layoutBody } = useContext(LayoutContext);
  const param = useParams();

  const [circleSelected, setCircleSelected] = useState(false);
  const [squareSelected, setSquareSelected] = useState(false);
  const [tableSelected, setTableSelected] = useState(undefined);

  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredCol, setHoveredCol] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedCol, setSelectedCol] = useState(null);

  // console.log("cicleSelected", circleSelected);
  // console.log("squareSelected", squareSelected);
  // console.log("tableSelected", tableSelected);

  const hoverTableDisplay = (tableType) => {
    setTableSelected(tableType);
    if (tableType === "circle") {
      setCircleSelected(true);
      setSquareSelected(false);
    } else if (tableType === "square") {
      setSquareSelected(true);
      setCircleSelected(false);
    }
  };

  const handleMouseEnter = (row, col) => {
    setHoveredRow(row);
    setHoveredCol(col);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
    setHoveredCol(null);
  };

  const handleAreaSelect = (row, col) => {
    setSelectedRow(row);
    setSelectedCol(col);
  };

  const shouldHighlight = (row, col) => {
    const isHovered = row <= hoveredRow && col <= hoveredCol;
    const isSelected = row <= selectedRow && col <= selectedCol;
    return (
      isHovered || (isSelected && selectedRow !== null && selectedCol !== null)
    );
  };
  const rows = 4;
  const cols = 5;

  const renderSeats = () => {
    let seats = [];
    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= cols; col++) {
        seats.push(
          <div
            key={`${row}-${col}`}
            className={`table-${tableSelected}-shape ${
              shouldHighlight(row, col) ? "highlight" : ""
            }`}
            onMouseEnter={() => handleMouseEnter(row, col)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleAreaSelect(row, col)}
          />
        );
      }
    }
    return seats;
  };

  return (
    <div className="add-table-container">
      <h1 className="add-table-title">Add Tables</h1>

      {!tableSelected && (
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

      {tableSelected && (
        <div className="table-hover-container-parent">
          <h1 className="rows-title">Rows ---></h1>
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
              Cols ---->
            </h1>
            {/* <div className={`table-${tableSelected}-shape`}></div>
            <div className={`table-${tableSelected}-shape`}></div>
            <div className={`table-${tableSelected}-shape`}></div>
            <div className={`table-${tableSelected}-shape`}></div>
            <div className={`table-${tableSelected}-shape`}></div>
            <div className={`table-${tableSelected}-shape`}></div>
            <div className={`table-${tableSelected}-shape`}></div>
            <div className={`table-${tableSelected}-shape`}></div>
            <div className={`table-${tableSelected}-shape`}></div>
            <div className={`table-${tableSelected}-shape`}></div>
            <div className={`table-${tableSelected}-shape`}></div>
            <div className={`table-${tableSelected}-shape`}></div>
            <div className={`table-${tableSelected}-shape`}></div>
            <div className={`table-${tableSelected}-shape`}></div>
            <div className={`table-${tableSelected}-shape`}></div>
            <div className={`table-${tableSelected}-shape`}></div> */}

            {renderSeats()}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTables;
