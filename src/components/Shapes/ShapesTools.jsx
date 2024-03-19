import React, { useContext, useEffect, useState } from "react";
import { handleInputChange } from "../../services/tools.service";
import { ShapeContext } from "../../context/shape.context";
import { deleteShape, editShapes } from "../../services/shape.service";

const ShapesTools = () => {
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
  } = useContext(ShapeContext);

  const [dropDownOne, setDropDownOne] = useState(false);
  const [dropDownTwo, setDropDownTwo] = useState(false);
  const [dropDownThree, setDropDownThree] = useState(false);
  const [dropDownFour, setDropDownFour] = useState(false);

  const handleDropOne = () => {
    setDropDownOne((prev) => !prev);

    if (dropDownTwo) {
      setDropDownTwo(false);
    } else if (dropDownThree) {
      setDropDownThree(false);
    } else if (dropDownFour) {
      setDropDownFour(false);
    }
  };

  const handleDropTwo = () => {
    setDropDownTwo((prev) => !prev);

    if (dropDownOne) {
      setDropDownOne(false);
    } else if (dropDownThree) {
      setDropDownThree(false);
    } else if (dropDownFour) {
      setDropDownFour(false);
    }
  };

  const handleDropThree = () => {
    setDropDownThree((prev) => !prev);

    if (dropDownOne) {
      setDropDownOne(false);
    } else if (dropDownTwo) {
      setDropDownTwo(false);
    } else if (dropDownThree) {
      setDropDownFour(false);
    }
  };

  const handleDropFour = () => {
    setDropDownFour((prev) => !prev);
  };

  const [selectedBorder, setSelectedBorder] = useState("border");

  const changeBorder = (e) => {
    setSelectedBorder(e.target.value);
  };

  // console.log("selectedBorder:", selectedBorder);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const currentShape = [...circles, ...squares].find(
    (shape) => shape._id === shapeId
  );

  function debounce(fn, delay) {
    let timeoutID = null;
    return function (...args) {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  const updateShape = debounce((shapeId, body) => {
    editShapes(shapeId, body);
    console.log("Tools debounce working");
  }, 500);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedShape = {};
    // console.log("Checking Current Shape", currentShape.shapeType, currentShape);
    console.log(
      "Changing Circle Border Color",
      currentShape.shapeType.toLowerCase() === "circle"
    );

    if (currentShape.shapeType.toLowerCase() === "circle") {
      updatedShape = { ...currentShape, [name]: value };
      setCircles((prevCircles) =>
        prevCircles.map((circle) =>
          circle._id === shapeId ? updatedShape : circle
        )
      );
      if (name === "borderSize") {
        updatedShape = {
          ...updatedShape,
          borderLeftSize: value,
          borderRightSize: value,
          borderBottomSize: value,
          borderTopSize: value,
        };
        setCircles((prevCircles) =>
          prevCircles.map((circle) =>
            circle._id === shapeId ? updatedShape : circle
          )
        );
      }
    } else if (currentShape.shapeType.toLowerCase() === "square") {
      updatedShape = { ...currentShape, [name]: value };
      setSquares((prevSquares) =>
        prevSquares.map((square) =>
          square._id === shapeId ? updatedShape : square
        )
      );
      if (name === "borderSize") {
        updatedShape = {
          ...updatedShape,
          borderLeftSize: value,
          borderRightSize: value,
          borderBottomSize: value,
          borderTopSize: value,
        };
        setSquares((prevSquares) =>
          prevSquares.map((square) =>
            square._id === shapeId ? updatedShape : square
          )
        );

        updateShape(shapeId, updatedShape);
      }

      console.log("before - name === 'borderColor'");
    }

    if (name === "borderColor") {
      updatedShape = {
        ...updatedShape,
        borderLeftColor: value,
        borderRightColor: value,
        borderBottomColor: value,
        borderTopColor: value,
      };

      console.log("Current shape type:", currentShape.shapeType.toLowerCase());

      if (currentShape?.shapeType.toLowerCase() === "square") {
        console.log("Changing Square Border Color:", updatedShape);
        setSquares((prevSquares) =>
          prevSquares.map((square) =>
            square._id === shapeId ? updatedShape : square
          )
        );
      }

      if (currentShape?.shapeType.toLowerCase() === "circle") {
        console.log("Changing Circle Border Color:", updatedShape);
        setCircles((prevCircles) =>
          prevCircles.map((circle) =>
            circle._id === shapeId ? updatedShape : circle
          )
        );
      }

      updateShape(shapeId, updatedShape);
    }

    if (name !== "height" && name !== "width") {
      updateShape(shapeId, updatedShape);
    }

    if (currentShape?.shapeType.toLowerCase() === "circle") {
      let remove = document.getElementsByClassName("circle-shape");

      for (let i = 0; i < circles.length; i++) {
        remove[i].style.removeProperty("transform");
      }
    } else if (currentShape?.shapeType.toLowerCase() === "square") {
      let remove = document.getElementsByClassName("square-shape");

      for (let i = 0; i < squares.length; i++) {
        remove[i].style.removeProperty("transform");
      }
    }
  };

  // console.log("currentShape:", currentShape);

  const updateJustifyContent = (justifyValue) => {
    let updatedShape = {};

    if (currentShape.shapeType.toLowerCase() === "circle") {
      updatedShape = { ...currentShape, alignItems: justifyValue };
      setCircles((prevCircles) =>
        prevCircles.map((circle) =>
          circle._id === shapeId ? updatedShape : circle
        )
      );
    } else if (currentShape.shapeType.toLowerCase() === "square") {
      updatedShape = { ...currentShape, justifyContent: justifyValue };
      setSquares((prevSquares) =>
        prevSquares.map((square) =>
          square._id === shapeId ? updatedShape : square
        )
      );
    }

    updateShape(shapeId, updatedShape);
  };

  const updateAlignItems = (alignValue) => {
    let updatedShape = {};

    if (currentShape.shapeType.toLowerCase() === "circle") {
      updatedShape = { ...currentShape, justifyContent: alignValue };
      setCircles((prevCircles) =>
        prevCircles.map((circle) =>
          circle._id === shapeId ? updatedShape : circle
        )
      );
    } else if (currentShape.shapeType.toLowerCase() === "square") {
      updatedShape = { ...currentShape, alignItems: alignValue };
      setSquares((prevSquares) =>
        prevSquares.map((square) =>
          square._id === shapeId ? updatedShape : square
        )
      );
    }

    updateShape(shapeId, updatedShape);
  };

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

  return (
    <>
      {showShapeForm && (
        <form
          className="shape-form-container"
          ref={shapeForm}
          onSubmit={handleFormSubmit}
        >
          <div>
            <h1 className="form-title">Shape Tools</h1>
            <div className="shape-form-fields-container">
              {/* ----------------------- Field #1 ----------------------- */}
              <div className="field-one">
                <div className="dropdown-container" onClick={handleDropOne}>
                  <h1 className="text-input-title">Size & Color</h1>
                  <div
                    className={dropDownOne ? "down-arrow" : "up-arrow"}
                  ></div>
                </div>
                <div
                  className={dropDownOne ? "show-dropdown" : "hide-dropdown"}
                >
                  <div className="shape-label-input-container">
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
                  </div>

                  <div className="shape-label-input-container">
                    <div className="shape-label-input">
                      <label htmlFor="width">width</label>
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
                <div className="dropdown-container" onClick={handleDropTwo}>
                  <h1 className="text-input-title">Text</h1>
                  <div
                    className={dropDownTwo ? "down-arrow" : "up-arrow"}
                  ></div>
                </div>
                <div className={dropDownTwo ? "" : "hide-dropdown"}>
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
                      type="text"
                      className="justify-left"
                      name="justifyContent"
                      onClick={() => updateJustifyContent("flex-start")}
                    />
                    <button
                      type="text"
                      className="justify-center"
                      name="justifyContent"
                      onClick={() => updateJustifyContent("center")}
                    />
                    <button
                      type="text"
                      className="justify-right"
                      name="justifyContent"
                      onClick={() => updateJustifyContent("flex-end")}
                    />
                  </div>

                  <div className="justify-content-input">
                    <button
                      type="text"
                      className="align-left"
                      name="alignItems"
                      onClick={() => updateAlignItems("flex-start")}
                    />
                    <button
                      type="text"
                      className="align-center"
                      name="alignItems"
                      onClick={() => updateAlignItems("center")}
                    />
                    <button
                      type="text"
                      className="align-right"
                      name="alignItems"
                      onClick={() => updateAlignItems("flex-end")}
                    />
                  </div>
                </div>
              </div>

              {/* ----------------------- Field #3 ----------------------- */}

              <div className="field-one">
                <div className="dropdown-container" onClick={handleDropThree}>
                  <h1 className="text-input-title">Border</h1>
                  <div
                    className={dropDownThree ? "down-arrow" : "up-arrow"}
                  ></div>
                </div>

                <div className={dropDownThree ? "show-input" : "hide-dropdown"}>
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
              {/* ---------------- Field One End ------------------------ */}
            </div>
          </div>

          {/* -------------------- Delete Div --------------------------- */}

          <div className="delete-shape-form">
            <button
              onClick={() => deleteTheShape(shapeId)}
              className="delete-shape-form-button"
            >
              Delete
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default ShapesTools;
