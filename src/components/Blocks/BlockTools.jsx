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
  } = useContext(BlockContext);

  const { showTShapeForm } = useContext(TableContext);

  // console.log("bshapeForm - blockTools:", bShapeForm)
  // *! ----- Param -------------------------------------------
  const param = useParams();
  const navigate = useNavigate();

  // *! ----- Local States ------------------------------------
  const [activeDropDown, setActiveDropDown] = useState(null);
  const [selectedBorder, setSelectedBorder] = useState("border");

  // *! ----- Current Shape -----------------------------------
  const currentBShape = [...bCircles, ...bSquares].find(
    (block) => block._id === blockId
  );

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
      const response = await deleteBlock(param.layoutIdParam, blockId);
      console.log("Block Deleted:", response);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const getSetter = (blockType) =>
      blockType.toLowerCase() === "circle" ? setBCircles : setBSquares;

    let updatedBlock = { ...currentBShape, [name]: value };

    if (name === "borderSize" || name === "borderColor") {
      const borderProps = ["Left", "Right", "Bottom", "Top"].reduce(
        (acc, direction) => {
          acc[`border${direction}Size`] =
            name === "borderSize"
              ? value
              : currentBShape[`border${direction}Size`];
          acc[`border${direction}Color`] =
            name === "borderColor"
              ? value
              : currentBShape[`border${direction}Color`];
          return acc;
        },
        {}
      );

      updatedBlock = { ...updatedBlock, ...borderProps };
    }

    const setBlocks = getSetter(currentBShape.blockType);
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => (block._id === blockId ? updatedBlock : block))
    );

    if (!["height", "width"].includes(name)) {
      updateBShape(blockId, updatedBlock);
    }

    if (["circle", "square"].includes(currentBShape.blockType.toLowerCase())) {
      let className = `${currentBShape.blockType.toLowerCase()}-shape`;
      let elements = document.getElementsByClassName(className);

      for (let element of elements) {
        element.style.removeProperty("transform");
      }
    }
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
