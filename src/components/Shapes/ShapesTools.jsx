import React, { useContext, useEffect, useState } from "react";
import { ShapeContext } from "../../context/shape.context";
import { deleteShape } from "../../services/shape.service";
import { BlockContext } from "../../context/block.context";

const ShapesTools = () => {
  // *! ----- Context ---------------------------------------
  const {
    setCircles,
    setSquares,
    showShapeForm,
    shapeForm,
    shapeId,
    setShapeId,
    toggleShapeForm,
    squares,
    circles,
    updateShape,
  } = useContext(ShapeContext);
  const { showBShapeForm } = useContext(BlockContext);
  // *! ----- Local States ------------------------------------
  const [activeDropDown, setActiveDropDown] = useState(null);
  const [selectedBorder, setSelectedBorder] = useState("border");

  // *! ----- Current Shape -----------------------------------
  const currentShape = [...circles, ...squares].find(
    (shape) => shape._id === shapeId
  );
  // console.log("🚀 ~ ShapesTools ~ currentShape:", currentShape);

  // *! ----- isCircle ----------------------------------------
  const isCircle = currentShape?.shapeType.toLowerCase() === "circle";

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

  // *! ----- Delete Shapes ---------------------------------------

  const deleteTheShape = async (shapeId) => {
    try {
      const response = await deleteShape(shapeId);
      console.log("Shape Deleted:", response);
      setCircles((prev) => {
        return prev.filter((circle) => circle._id !== shapeId);
      });
      setSquares((prev) => {
        return prev.filter((square) => square._id !== shapeId);
      });
      setShapeId(null);
      toggleShapeForm();
    } catch (error) {
      console.log("error:", error);
    }
  };

  // *! ----- Handle Input Change ------------------------------

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const getSetter = (shapeType) =>
      shapeType.toLowerCase() === "circle" ? setCircles : setSquares;

    let updatedShape = { ...currentShape, [name]: value };

    if (name === "borderSize" || name === "borderColor") {
      const borderProps = ["Left", "Right", "Bottom", "Top"].reduce(
        (acc, direction) => {
          acc[`border${direction}Size`] =
            name === "borderSize"
              ? value
              : currentShape[`border${direction}Size`];
          acc[`border${direction}Color`] =
            name === "borderColor"
              ? value
              : currentShape[`border${direction}Color`];
          return acc;
        },
        {}
      );

      updatedShape = { ...updatedShape, ...borderProps };
    }

    const setShapes = getSetter(currentShape.shapeType);
    setShapes((prevShapes) =>
      prevShapes.map((shape) => (shape._id === shapeId ? updatedShape : shape))
    );

    if (!["height", "width"].includes(name)) {
      updateShape(shapeId, updatedShape);
    }

    // if (["circle", "square"].includes(currentShape.shapeType.toLowerCase())) {
    //   let className = `${currentShape.shapeType.toLowerCase()}-shape`;
    //   let elements = document.getElementsByClassName(className);

    //   // for (let element of elements) {
    //   //   element.style.removeProperty("transform");
    //   // }
    // }
  };

  const layoutContainer = document.querySelector(".display-shapes-container");

  if (layoutContainer) {
    const layoutWidth = layoutContainer.offsetWidth;
    // console.log("🚀 ~ ShapesTools ~ layoutWidth:", layoutWidth);
  }

  // *! ----- Text Position (Align Items & Justify Content) ------

  const shapeOrientation = (property, value) => {
    let updatedShape = { ...currentShape, [property]: value };

    if (currentShape.shapeType.toLowerCase() === "circle") {
      setCircles((prevCircles) =>
        prevCircles.map((circle) =>
          circle._id === shapeId ? updatedShape : circle
        )
      );
    } else if (currentShape.shapeType.toLowerCase() === "square") {
      setSquares((prevSquares) =>
        prevSquares.map((square) =>
          square._id === shapeId ? updatedShape : square
        )
      );
    }
    updateShape(shapeId, updatedShape);
  };

  // *! ---- Resize Adjustments (Width & Height - Remover) --------

  useEffect(() => {
    if (currentShape?.shapeType.toLowerCase() === "circle") {
      let remove = document.getElementsByClassName("circle-shape");

      for (let i = 0; i < circles.length; i++) {
        remove[i].style.removeProperty("height");
        remove[i].style.removeProperty("width");
      }
    } else if (currentShape?.shapeType.toLowerCase() === "square") {
      let remove = document.getElementsByClassName("square-shape");

      for (let i = 0; i < squares.length; i++) {
        remove[i].style.removeProperty("height");
        remove[i].style.removeProperty("width");
      }
    }
  }, [currentShape]);

  // *! -------- DOM ELEMENTS -----------------------
  // *! -------- DOM ELEMENTS -----------------------
  // *! -------- DOM ELEMENTS -----------------------

  return (
    <>
      {showShapeForm && (
        <div className="shape-form-container" ref={shapeForm}>
          <div>
            <h1 className="form-title">Shape Tools</h1>
            <div className="shape-form-fields-container">
              {/* ----------------------- Field #1 ----------------------- */}
              <div className="field-one">
                <div
                  className="dropdown-container"
                  onClick={() => handleDropDown(1)}
                >
                  <h1 className="text-input-title">Size & Color</h1>
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
                            value={currentShape?.height}
                          />
                        </div>
                        <input
                          type="range"
                          className="range"
                          name="height"
                          onChange={handleInputChange}
                          value={currentShape?.height}
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
                        value={currentShape?.width}
                      />
                    </div>
                    <input
                      type="range"
                      className="range"
                      name="width"
                      onChange={handleInputChange}
                      value={currentShape?.width}
                      min={10}
                      max={1000}
                    />
                  </div>

                  {/* -------------- Max-Width -------------- */}

                  <div className="shape-label-input-container">
                    <div className="shape-label-input">
                      <label htmlFor="maxWidth">
                        {isCircle ? "Size" : "Max-Width"}
                      </label>
                      <h1 className="maxWidth-percentage">%</h1>
                      <input
                        type="number"
                        name="maxWidth"
                        onChange={handleInputChange}
                        value={currentShape?.maxWidth}
                      />
                    </div>
                    <input
                      type="range"
                      className="range"
                      name="maxWidth"
                      onChange={handleInputChange}
                      value={currentShape?.maxWidth}
                      min={5}
                      max={100}
                    />
                  </div>

                  <div className="shape-label-input-container">
                    <div className="shape-label-input">
                      <label htmlFor="x">X-Axis</label>
                      <input
                        type="number"
                        name="x"
                        onChange={handleInputChange}
                        value={currentShape?.x}
                      />
                    </div>
                    <input
                      type="range"
                      className="range"
                      name="x"
                      onChange={handleInputChange}
                      value={currentShape?.x}
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
                        value={currentShape?.y}
                      />
                    </div>
                    <input
                      type="range"
                      className="range"
                      name="y"
                      onChange={handleInputChange}
                      value={currentShape?.y}
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
                      value={currentShape?.backgroundColor}
                    />
                  </div>
                </div>
              </div>

              {/* ----------------------- Field #2 ----------------------- */}

              <div className="field-one">
                <div
                  className="dropdown-container"
                  onClick={() => handleDropDown(2)}
                >
                  <h1 className="text-input-title">Text</h1>
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
                      value={currentShape?.name}
                      className="input-name-name"
                      style={{
                        width: `${
                          Math.max(1, currentShape?.name.length) * 10 - 10
                        }px`,
                        color: currentShape?.color,
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
                        value={currentShape?.color}
                        id="colorInput"
                      />
                    </div>

                    <input
                      id="fontsize-shapetools"
                      type="number"
                      name="fontSize"
                      onChange={handleInputChange}
                      value={currentShape?.fontSize}
                    />
                  </div>

                  <p className="align-text">Align Text</p>
                  <div className="justify-content-input">
                    <button
                      type="button"
                      className="justify-left"
                      name="justifyContent"
                      onClick={() =>
                        shapeOrientation("alignItems", "flex-start")
                      }
                    />
                    <button
                      type="button"
                      className="justify-center"
                      name="justifyContent"
                      onClick={() => shapeOrientation("alignItems", "center")}
                    />
                    <button
                      type="button"
                      className="justify-right"
                      name="justifyContent"
                      onClick={() => shapeOrientation("alignItems", "flex-end")}
                    />
                  </div>

                  <div className="justify-content-input">
                    <button
                      type="button"
                      className="align-left"
                      name="alignItems"
                      onClick={() =>
                        shapeOrientation("justifyContent", "flex-start")
                      }
                    />
                    <button
                      type="button"
                      className="align-center"
                      name="alignItems"
                      onClick={() =>
                        shapeOrientation("justifyContent", "center")
                      }
                    />
                    <button
                      type="button"
                      className="align-right"
                      name="alignItems"
                      onClick={() =>
                        shapeOrientation("justifyContent", "flex-end")
                      }
                    />
                  </div>
                </div>
              </div>

              {/* ----------------------- Field #3 ----------------------- */}

              <div className="field-one">
                <div
                  className="dropdown-container"
                  onClick={() => handleDropDown(3)}
                >
                  <h1 className="text-input-title">Border</h1>
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
                    className="select-border"
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
                        value={currentShape?.[`${selectedBorder}Size`]}
                        className="size-border-input"
                      />
                      <input
                        type="range"
                        className="range"
                        name={`${selectedBorder}Size`}
                        onChange={handleInputChange}
                        value={currentShape?.[`${selectedBorder}Size`]}
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
                      value={currentShape?.[`${selectedBorder}Color`]}
                      className="border-color"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="delete-shape-form">
            <button
              onClick={() => deleteTheShape(shapeId)}
              className="delete-shape-form-button"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShapesTools;
