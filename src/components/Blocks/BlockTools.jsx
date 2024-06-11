import React, { useContext, useEffect, useState } from "react";
import { BlockContext } from "../../context/block.context";
import { TableContext } from "../../context/table.context";
import { deleteBlock } from "../../services/block.service";
import { useParams, useNavigate } from "react-router-dom";

const BlockTools = ({ children }) => {
  // *! ----- Context ---------------------------------------
  const {
    bCircles,
    bSquares,
    setBCircles,
    setBSquares,
    bShapeForm,
    blockId,
    setBlockId,
    showBShapeForm,
    toggleBShapeForm,
    updateBShape,
    priceUpdated,
    setPriceUpdated,
    layoutObject,
    setLayoutObject,
    hasBlockChanged,
    setHasBlockChanged,
    blockDeleted,
    setBlockDeleted,
  } = useContext(BlockContext);

  const { showTShapeForm, tSquares, tCircles } = useContext(TableContext);

  // console.log("bshapeForm - blockTools:", bShapeForm)
  // *! ----- Param -------------------------------------------
  const param = useParams();
  // console.log("param:", param);
  const navigate = useNavigate();

  // *! ----- Local States ------------------------------------
  const [activeDropDown, setActiveDropDown] = useState(null);
  const [selectedBorder, setSelectedBorder] = useState("border");
  const [tableCount, setTableCount] = useState(0);

  // *! ----- Current Shape -----------------------------------
  const currentBShape = [...bCircles, ...bSquares].find(
    (block) => block._id === blockId
  );

  // console.log("currentBShape:", currentBShape);

  // *! ----- isCircle ----------------------------------------
  const isCircle = currentBShape?.blockType.toLowerCase() === "circle";

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

  const deleteTheShape = async (blockId) => {
    try {
      const response = await deleteBlock(param.blockIdParam);
      setBlockDeleted(true);
      setBCircles((prev) => {
        return prev.filter((bCircle) => bCircle._id !== blockId);
      });
      setBSquares((prev) => {
        return prev.filter((bSquare) => bSquare._id !== blockId);
      });
      setBlockId(null);
      navigate(`/admin/designpage/${param.layoutIdParam}`);
      // debugger;
      toggleBShapeForm();
    } catch (error) {
      console.log("error:", error);
    }
  };

  // *! ----- Handle Input Change ------------------------------

  const handleInputChange = async (e) => {
    const { name, type, checked, value } = e.target;
    const actualValue = type === "checkbox" ? checked : value;

    // console.log(`Name: ${name}, Value: ${actualValue}`);

    let updatedBlock = { ...currentBShape, [name]: actualValue };

    if (name === "borderSize" || name === "borderColor") {
      const borderProps = ["Left", "Right", "Bottom", "Top"].reduce(
        (acc, direction) => {
          acc[`border${direction}Size`] =
            name === "borderSize"
              ? actualValue
              : currentBShape[`border${direction}Size`];
          acc[`border${direction}Color`] =
            name === "borderColor"
              ? actualValue
              : currentBShape[`border${direction}Color`];
          return acc;
        },
        {}
      );
      updatedBlock = { ...updatedBlock, ...borderProps };
    }

    const setBlocks =
      currentBShape.blockType.toLowerCase() === "circle"
        ? setBCircles
        : setBSquares;
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => (block._id === blockId ? updatedBlock : block))
    );

    setLayoutObject((prevLayout) => ({
      ...prevLayout,
      blocks: prevLayout.blocks.map((block) =>
        block._id === blockId ? updatedBlock : block
      ),
    }));

    if (!["height", "width"].includes(name)) {
      updateBShape(blockId, updatedBlock);
    }

    // if (name === "isMatched") {
    //   setHasBlockChanged(true);
    // }

    // if (["circle", "square"].includes(currentBShape.blockType.toLowerCase())) {
    //   let className = `${currentBShape.blockType.toLowerCase()}-shape`;
    //   document.querySelectorAll(`.${className}`).forEach((element) => {
    //     element.style.removeProperty("transform");
    //   });
    // }
  };

  // *! ----- Text Position (Align Items & Justify Content) ------

  const textPosition = (property, value) => {
    let updatedBlock = { ...currentBShape, [property]: value };

    if (currentBShape.blockType.toLowerCase() === "circle") {
      setBCircles((prevBCircles) =>
        prevBCircles.map((bCircle) =>
          bCircle._id === blockId ? updatedBlock : bCircle
        )
      );
    } else if (currentBShape.blockType.toLowerCase() === "square") {
      setBSquares((prevBSquares) =>
        prevBSquares.map((square) =>
          square._id === blockId ? updatedBlock : square
        )
      );
    }
    updateBShape(blockId, updatedBlock);
  };

  // *! ---- Resize Adjustments (Width & Height - Remover) --------

  useEffect(() => {
    if (currentBShape?.blockType.toLowerCase() === "circle") {
      let remove = document.getElementsByClassName("circle-shape");

      for (let i = 0; i < bCircles.length; i++) {
        remove[i].style.removeProperty("height");
        remove[i].style.removeProperty("width");
      }
    } else if (currentBShape?.blockType.toLowerCase() === "square") {
      let remove = document.getElementsByClassName("square-shape");

      for (let i = 0; i < bSquares.length; i++) {
        remove[i].style.removeProperty("height");
        remove[i].style.removeProperty("width");
      }
    }
  }, [currentBShape]);

  // *! ---- Format Number --------
  function formatNumberWithCommas(value) {
    const number = value.replace(/\D/g, "");
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // console.log("layoutObject:", layoutObject?.blocks?.tables?.length);
  // console.log("tableCount:", tableCount);

  // *! -------- DOM ELEMENTS -----------------------
  // *! -------- DOM ELEMENTS -----------------------
  // *! -------- DOM ELEMENTS -----------------------

  return (
    <>
      {showBShapeForm && !showTShapeForm && (
        <div className="block-form-container" ref={bShapeForm}>
          <div>
            <h1 className="block-form-title">Block Tools</h1>
            <div className="shape-form-fields-container">
              {/* ----------------------- Field #1 ----------------------- */}
              <div className="block-dropdown-fields">
                <div
                  className="dropdown-container"
                  onClick={() => handleDropDown(1)}
                >
                  <h1 className="block-input-title">Size & Color</h1>
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
                            value={currentBShape?.height}
                          />
                        </div>
                        <input
                          type="range"
                          className="range"
                          name="height"
                          onChange={handleInputChange}
                          value={currentBShape?.height}
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
                        value={currentBShape?.width}
                      />
                    </div>
                    <input
                      type="range"
                      className="range"
                      name="width"
                      onChange={handleInputChange}
                      value={currentBShape?.width}
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
                        value={currentBShape?.x}
                      />
                    </div>
                    <input
                      type="range"
                      className="range"
                      name="x"
                      onChange={handleInputChange}
                      value={currentBShape?.x}
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
                        value={currentBShape?.y}
                      />
                    </div>
                    <input
                      type="range"
                      className="range"
                      name="y"
                      onChange={handleInputChange}
                      value={currentBShape?.y}
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
                      value={currentBShape?.backgroundColor}
                    />
                  </div>
                </div>
              </div>

              {/* ----------------------- Field #2 ----------------------- */}

              <div className="block-dropdown-fields">
                <div
                  className="dropdown-container"
                  onClick={() => handleDropDown(2)}
                >
                  <h1 className="block-input-title">Text</h1>
                  <div
                    className={activeDropDown === 2 ? "down-arrow" : "up-arrow"}
                  ></div>
                </div>
                <div className={activeDropDown === 2 ? "" : "hide-dropdown"}>
                  <div className="shape-label-name">
                    <input
                      type="text"
                      name="name"
                      onChange={handleInputChange}
                      value={currentBShape?.name}
                      className="input-name-name"
                      style={{
                        width: `${
                          Math.max(1, currentBShape?.name.length) * 10 - 10
                        }px`,
                        color: currentBShape?.color,
                      }}
                    />
                  </div>

                  <div className="shape-label-input">
                    <div className="text-color-input-container">
                      <p id="paragraphColorOpener">A</p>
                      <input
                        type="color"
                        name="color"
                        onChange={handleInputChange}
                        value={currentBShape?.color}
                        id="colorInput"
                      />
                    </div>

                    <input
                      id="fontsize-shapetools"
                      type="number"
                      name="fontSize"
                      onChange={handleInputChange}
                      value={currentBShape?.fontSize}
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

              <div className="block-dropdown-fields">
                <div
                  className="dropdown-container"
                  onClick={() => handleDropDown(3)}
                >
                  <h1 className="block-input-title">Border</h1>
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
                    <div className=" special-input-size">
                      {/* <label htmlFor={`${selectedBorder}Size`}>
                        borderSize
                      </label> */}
                      <input
                        type="number"
                        name={`${selectedBorder}Size`}
                        onChange={handleInputChange}
                        value={currentBShape?.[`${selectedBorder}Size`]}
                        className="block-size-border-input"
                      />
                      <input
                        type="range"
                        className="range"
                        name={`${selectedBorder}Size`}
                        onChange={handleInputChange}
                        value={currentBShape?.[`${selectedBorder}Size`]}
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
                      value={currentBShape?.[`${selectedBorder}Color`]}
                      className="border-color"
                    />
                  </div>
                </div>
              </div>
              <hr />
              {children}
              <hr />

              {/* ------------- Price & Tickets ------------- */}

              <div className="block-ticket-prices-container">
                <h1 className="block-tickets-title">Tickets</h1>
                {currentBShape.tables?.length > 0 && (
                  <div className="block-subtitle-container">
                    <label
                      className="block-tickets-sub-title"
                      htmlFor="isMatched"
                    >
                      Divide Price Within Tables?
                    </label>
                    <input
                      type="checkbox"
                      name="isMatched"
                      onChange={handleInputChange}
                      checked={currentBShape.isMatched}
                    />
                    <div class="tooltip-container">
                      <span class="hover-me">🤷🏻‍♂️</span>
                      <div class="tooltip">
                        <p>The price below will be divided among tables</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="block-tickets-container">
                  {!currentBShape.tables?.length && (
                    <div className="block-ticket-fields">
                      <label htmlFor="btickets">Tickets</label>
                      <input
                        type="number"
                        name="btickets"
                        onChange={handleInputChange}
                        value={currentBShape?.btickets}
                      />
                    </div>
                  )}

                  <div
                    className={
                      !currentBShape?.isMatched
                        ? "bprice-false"
                        : "block-ticket-fields"
                    }
                  >
                    <label htmlFor="bprice" className="bprice">
                      Price
                    </label>
                    <input
                      className={
                        !currentBShape?.isMatched ? "bprice-false" : "bprice"
                      }
                      type="number"
                      name="bprice"
                      onChange={handleInputChange}
                      value={currentBShape?.bprice}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="delete-shape-form">
            <button
              onClick={() => deleteTheShape(blockId)}
              className="delete-block-form-button"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BlockTools;
