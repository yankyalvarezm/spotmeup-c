import React, { useContext, useEffect, useState } from "react";
import { TableContext } from "../../context/table.context";
import { deleteTable } from "../../services/table.service";
import { useParams, useNavigate } from "react-router-dom";
import { BlockContext } from "../../context/block.context";

const TableTools = () => {
  // *! ----- Context ---------------------------------------
  const {
    tCircles,
    tSquares,
    setTCircles,
    setTSquares,
    tShapeForm,
    tableId,
    setTableId,
    showTShapeForm,
    toggleTShapeForm,
    updateTShape,
  } = useContext(TableContext);

  const {
    setPriceUpdated,
    setLayoutObject,
    blockId,
    layoutObject,
    getThisBlock,
  } = useContext(BlockContext);

  // *! ----- Param -------------------------------------------
  const param = useParams();
  const navigate = useNavigate();

  // *! ----- Local States ------------------------------------
  const [activeDropDown, setActiveDropDown] = useState(null);
  const [selectedBorder, setSelectedBorder] = useState("border");

  const currentTShape = [...tCircles, ...tSquares].find(
    (table) => table._id === tableId
  );

  // *! ----- isCircle ----------------------------------------
  const isCircle = currentTShape?.tableType.toLowerCase() === "circle";

  // *! ----- DropDown Logic -----------------------------------
  const handleDropDown = (number) => {
    setActiveDropDown((activeDropDown) => {
      return activeDropDown === number ? null : number;
    });
  };

  // *! ----- Change Border ------------------------------------

  const changeBorder = (e) => {
    setSelectedBorder(e.target.value);
  };

  // *! ----- Delete Blocks ---------------------------------------

  const deleteTheShape = async (tableId) => {
    try {
      const response = await deleteTable(tableId);
      console.log("Table Deleted:", response);
      setTCircles((prev) => {
        return prev.filter((tCircle) => tCircle._id !== tableId);
      });
      setTSquares((prev) => {
        return prev.filter((tSquare) => tSquare._id !== tableId);
      });
      setTableId(null);
      navigate(`/admin/designpage/${param.layoutIdParam}`);
      // debugger;
      toggleTShapeForm();
      getThisBlock(currentTShape.block);

      if (response.success) {
        setPriceUpdated(true);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  // *! ----- Handle Input Change ------------------------------

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    const actualValue = type === "checkbox" ? checked : value;

    const getSetter = (tableType) =>
      tableType.toLowerCase() === "circle" ? setTCircles : setTSquares;

    let updatedTable = { ...currentTShape, [name]: actualValue };

    if (name === "borderSize" || name === "borderColor") {
      const borderProps = ["Left", "Right", "Bottom", "Top"].reduce(
        (acc, direction) => {
          acc[`border${direction}Size`] =
            name === "borderSize"
              ? actualValue
              : currentTShape[`border${direction}Size`];
          acc[`border${direction}Color`] =
            name === "borderColor"
              ? actualValue
              : currentTShape[`border${direction}Color`];
          return acc;
        },
        {}
      );

      updatedTable = { ...updatedTable, ...borderProps };
    }

    const setTables = getSetter(currentTShape.tableType);
    setTables((prevTables) =>
      prevTables.map((table) => (table._id === tableId ? updatedTable : table))
    );

    setLayoutObject((prevLayout) => {
      return {
        ...prevLayout,
        blocks: prevLayout.blocks.map((block) => {
          const updatedTables = block.tables.map((table) => {
            if (table._id === tableId) {
              return { ...table, [name]: actualValue };
            }
            return table;
          });
          return { ...block, tables: updatedTables };
        }),
      };
    });

    if (!["height", "width"].includes(name)) {
      updateTShape(tableId, updatedTable);
    }

    // if (["circle", "square"].includes(currentTShape.tableType.toLowerCase())) {
    //   let className = `${currentTShape.tableType.toLowerCase()}-shape`;
    //   let elements = document.getElementsByClassName(className);

    //   for (let element of elements) {
    //     element.style.removeProperty("transform");
    //   }
    // }
  };

  // *! ----- Text Position (Align Items & Justify Content) ------

  const textPosition = (property, value) => {
    let updatedTable = { ...currentTShape, [property]: value };

    if (currentTShape.tableType.toLowerCase() === "circle") {
      setTCircles((prevBCircles) =>
        prevBCircles.map((bCircle) =>
          bCircle._id === tableId ? updatedTable : bCircle
        )
      );
    } else if (currentTShape.tableType.toLowerCase() === "square") {
      setTSquares((prevBSquares) =>
        prevBSquares.map((square) =>
          square._id === tableId ? updatedTable : square
        )
      );
    }
    updateTShape(tableId, updatedTable);
  };

  // *! ---- Resize Adjustments (Width & Height - Remover) --------

  useEffect(() => {
    // console.log("currentTShape:", currentTShape);
    if (currentTShape?.tableType.toLowerCase() === "circle") {
      let remove = document.getElementsByClassName("circle-shape");

      // console.log("remove:", remove);

      for (let i = 0; i < tCircles.length; i++) {
        remove[i].style.removeProperty("height");
        remove[i].style.removeProperty("width");
      }
    } else if (currentTShape?.tableType.toLowerCase() === "square") {
      let remove = document.getElementsByClassName("square-shape");

      // console.log("remove:", remove);

      for (let i = 0; i < tSquares.length; i++) {
        remove[i].style.removeProperty("height");
        remove[i].style.removeProperty("width");
      }
    }
  }, [currentTShape]);

  // console.log("currentTShape:", currentTShape);

  // *! -------- DOM ELEMENTS -----------------------
  // *! -------- DOM ELEMENTS -----------------------
  // *! -------- DOM ELEMENTS -----------------------

  return (
    <>
      {showTShapeForm && (
        <div className="table-form-container" ref={tShapeForm}>
          <div>
            <h1 className="block-form-title">Table Tools</h1>
            <div className="shape-form-fields-container">
              {/* ----------------------- Field #1 ----------------------- */}
              <div className="table-dropdown-fields">
                <div
                  className="dropdown-container"
                  onClick={() => handleDropDown(1)}
                >
                  <h1 className="table-input-title">Color</h1>
                  <div
                    className={activeDropDown === 1 ? "down-arrow" : "up-arrow"}
                  ></div>
                </div>
                <div
                  className={
                    activeDropDown === 1 ? "show-dropdown" : "hide-dropdown"
                  }
                >
                  <div className="shape-label-input-container">
                    {!isCircle && (
                      <>
                        <div className="shape-label-input">
                          <label htmlFor="height">Heigth</label>
                          <input
                            type="number"
                            name="height"
                            onChange={handleInputChange}
                            value={currentTShape?.height}
                          />
                        </div>
                        <input
                          type="range"
                          className="range"
                          name="height"
                          onChange={handleInputChange}
                          value={currentTShape?.height}
                          min={10}
                          max={500}
                        />
                      </>
                    )}
                  </div>

                  <div className="shape-label-input-container">
                    <div className="shape-label-input">
                      <label htmlFor="width">
                        {isCircle ? "Size" : "Width"}
                      </label>
                      <input
                        type="number"
                        name="width"
                        onChange={handleInputChange}
                        value={currentTShape?.width}
                      />
                    </div>
                    <input
                      type="range"
                      className="range"
                      name="width"
                      onChange={handleInputChange}
                      value={currentTShape?.width}
                      min={10}
                      max={1000}
                    />
                  </div>

                  <div className="shape-label-input-container">
                    <div className="shape-label-input">
                      <label htmlFor="x">X-Axis</label>
                      <input
                        type="number"
                        name="x"
                        onChange={handleInputChange}
                        value={currentTShape?.x}
                      />
                    </div>
                    <input
                      type="range"
                      className="range"
                      name="x"
                      onChange={handleInputChange}
                      value={currentTShape?.x}
                      min={10}
                      max={1000}
                    />
                  </div>

                  <div className="shape-label-input-container">
                    <div className="shape-label-input">
                      <label htmlFor="y">Y-Axis</label>
                      <input
                        type="number"
                        name="y"
                        onChange={handleInputChange}
                        value={currentTShape?.y}
                      />
                    </div>
                    <input
                      type="range"
                      className="range"
                      name="y"
                      onChange={handleInputChange}
                      value={currentTShape?.y}
                      min={10}
                      max={1000}
                    />
                  </div>

                  <div>
                    <input
                      type="color"
                      name="backgroundColor"
                      className="shape-background-color"
                      onChange={handleInputChange}
                      value={currentTShape?.backgroundColor}
                    />
                  </div>
                </div>
              </div>

              {/* ----------------------- Field #2 ----------------------- */}

              <div className="table-dropdown-fields">
                <div
                  className="dropdown-container"
                  onClick={() => handleDropDown(2)}
                >
                  <h1 className="table-input-title">Text</h1>
                  <div
                    className={activeDropDown === 2 ? "down-arrow" : "up-arrow"}
                  ></div>
                </div>
                <div className={activeDropDown === 2 ? "" : "hide-dropdown"}>
                  {/* <div className="shape-label-name">
                    <input
                      type="text"
                      name="name"
                      onChange={handleInputChange}
                      value={currentTShape?.name}
                      className="input-name-name"
                      style={{
                        width: `${
                          Math.max(1, currentTShape?.name.length) * 10 - 10
                        }px`,
                        color: currentTShape?.color,
                      }}
                    />
                  </div> */}

                  <div className="shape-label-input">
                    <div className="text-color-input-container">
                      <p id="paragraphColorOpener">A</p>
                      <input
                        type="color"
                        name="color"
                        onChange={handleInputChange}
                        value={currentTShape?.color}
                        id="colorInput"
                      />
                    </div>

                    <input
                      id="fontsize-shapetools"
                      type="number"
                      name="fontSize"
                      onChange={handleInputChange}
                      value={currentTShape?.fontSize}
                    />
                  </div>

                  <p className="align-text">Align Text</p>
                  <div className="justify-content-input">
                    <button
                      type="button"
                      className="justify-left"
                      name="justifyContent"
                      onClick={() => textPosition("alignItems", "flex-start")}
                    />
                    <button
                      type="button"
                      className="justify-center"
                      name="justifyContent"
                      onClick={() => textPosition("alignItems", "center")}
                    />
                    <button
                      type="button"
                      className="justify-right"
                      name="justifyContent"
                      onClick={() => textPosition("alignItems", "flex-end")}
                    />
                  </div>

                  <div className="justify-content-input">
                    <button
                      type="button"
                      className="align-left"
                      name="alignItems"
                      onClick={() =>
                        textPosition("justifyContent", "flex-start")
                      }
                    />
                    <button
                      type="button"
                      className="align-center"
                      name="alignItems"
                      onClick={() => textPosition("justifyContent", "center")}
                    />
                    <button
                      type="button"
                      className="align-right"
                      name="alignItems"
                      onClick={() => textPosition("justifyContent", "flex-end")}
                    />
                  </div>
                </div>
              </div>

              {/* ----------------------- Field #3 ----------------------- */}

              <div className="table-dropdown-fields">
                <div
                  className="dropdown-container"
                  onClick={() => handleDropDown(3)}
                >
                  <h1 className="table-input-title">Border</h1>
                  <div
                    className={activeDropDown === 3 ? "down-arrow" : "up-arrow"}
                  ></div>
                </div>

                <div
                  className={
                    activeDropDown === 3 ? "show-input" : "hide-dropdown"
                  }
                >
                  <select
                    onChange={changeBorder}
                    value={selectedBorder}
                    className="block-select-border"
                  >
                    <option value="border">All</option>
                    <option value="borderRight">Right</option>
                    <option value="borderLeft">Left</option>
                    <option value="borderTop">Top</option>
                    <option value="borderBottom">Bottom</option>
                  </select>

                  <div className="shape-label-input-container border-range">
                    <div className=" special-input-size table-special-input">
                      {/* <label htmlFor={`${selectedBorder}Size`}>
                        borderSize
                      </label> */}
                      <input
                        type="number"
                        name={`${selectedBorder}Size`}
                        onChange={handleInputChange}
                        value={currentTShape?.[`${selectedBorder}Size`]}
                        className="table-size-border-input"
                      />
                      <input
                        type="range"
                        className="table-range"
                        name={`${selectedBorder}Size`}
                        onChange={handleInputChange}
                        value={currentTShape?.[`${selectedBorder}Size`]}
                        min={0}
                        max={20}
                      />
                    </div>
                  </div>

                  <div className="">
                    <input
                      type="color"
                      name={`${selectedBorder}Color`}
                      onChange={handleInputChange}
                      value={currentTShape?.[`${selectedBorder}Color`]}
                      className="border-color"
                    />
                  </div>
                </div>
              </div>

              {/* ---------- Tickets & Price ------------- */}

              <hr className="table-hr" />
              <div className="table-ticket-prices-container">
                <h1 className="table-tickets-title">Tickets</h1>

                <div className="block-subtitle-container">
                  <label
                    className="block-tickets-sub-title"
                    htmlFor="isIncluded"
                  >
                    This Table Includes Tickets?
                  </label>
                  <input
                    type="checkbox"
                    name="isIncluded"
                    onChange={handleInputChange}
                    checked={currentTShape.isIncluded}
                  />
                  <div className="checkmark-two"></div>
                </div>
                <div className="block-subtitle-container">
                  <label
                    className="block-tickets-sub-title"
                    htmlFor="minimumConsumptionAvailable"
                  >
                    Has Minimum Consumption?
                  </label>
                  <input
                    type="checkbox"
                    name="minimumConsumptionAvailable"
                    onChange={handleInputChange}
                    checked={currentTShape.minimumConsumptionAvailable}
                  />
                  <div className="checkmark-two"></div>
                </div>

                <div className="block-tickets-container">
                  <div className="block-ticket-fields">
                    <label
                      htmlFor="tprice"
                      className={
                        currentTShape?.isBlockMatched ? "tprice-false" : ""
                      }
                    >
                      Price
                    </label>
                    <input
                      className={
                        currentTShape?.isBlockMatched ? "tprice-false" : ""
                      }
                      type="number"
                      name="tprice"
                      onChange={handleInputChange}
                      value={currentTShape?.tprice}
                    />
                  </div>
                  <div className="block-ticket-fields quantity-container">
                    <label htmlFor="maxCapacity">Max-Capacity</label>
                    <input
                      type="number"
                      name="maxCapacity"
                      className="quantity"
                      value={currentTShape?.maxCapacity}
                      onChange={handleInputChange}
                      min={currentTShape?.ticketsIncluded || 0}
                    />
                  </div>

                  {currentTShape?.isIncluded && (
                    <div className="block-ticket-fields quantity-container">
                      <label htmlFor="ticketsIncluded">Tickets Included</label>
                      <input
                        type="number"
                        name="ticketsIncluded"
                        className="quantity"
                        value={currentTShape?.ticketsIncluded}
                        onChange={handleInputChange}
                        max={currentTShape?.maxCapacity}
                      />
                    </div>
                  )}

                  {currentTShape?.minimumConsumptionAvailable && (
                    <div className="block-ticket-fields quantity-container">
                      <label htmlFor="minimumConsumption">
                        Min-Consumption
                      </label>
                      <input
                        type="number"
                        name="minimumConsumption"
                        className="quantity"
                        value={currentTShape?.minimumConsumption}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="delete-shape-form">
            <button
              onClick={() => deleteTheShape(tableId)}
              className="delete-table-form-button"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TableTools;
