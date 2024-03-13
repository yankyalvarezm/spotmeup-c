import React, { useContext, useEffect, useState } from "react";
import { handleInputChange } from "../../services/tools.service";
import { ShapeContext } from "../../context/shape.context";
import { useParams } from "react-router-dom";
import {
  createShape,
  deleteShape,
  editShapes,
} from "../../services/shape.service";
// import { FloatingLabel, Form } from "react-bootstrap";

// import FloatingLabel from "react-bootstrap";
import { Form, FloatingLabel } from "react-bootstrap";
// import  from "react-bootstrap";

const ShapesTools = () => {
  const {
    setCircles,
    setSquares,
    showShapeForm,
    setShowShapeForm,
    shapeForm,
    shapeId,
    setShapeDeleted,
    setShapeId,
    toggleShapeForm,
    shapeAdded,
    setShapeAdded,
    squares,
    circles,
  } = useContext(ShapeContext);

  const param = useParams();

  //   console.log("param", param);

  const [shapeBody, setShapeBody] = useState({
    shapeType: "circle",
    name: "",
    width: 100,
    height: 100,
    borderSize: 1,
    borderLeftSize: 0,
    borderLeftColor: "",
    borderRightSize: 0,
    borderRightColor: "",
    borderBottomSize: 0,
    borderBottomColor: "",
    borderTopSize: 0,
    borderTopColor: "",
    borderColor: "black",
    backgroundColor: "black",
    color: "white",
    justifyContent: "",
    alignItems: "",
    x: 0,
    y: 0,
    fontSize: 15,
  });

  const [showShapes, setShowShapes] = useState(false);

  const toggleShowShapes = () => {
    setShowShapes((prev) => !prev);
  };

  const addCircle = async (layoutId, body) => {
    setShowShapes((prev) => !prev);

    body.shapeType = "Circle";

    try {
      const response = await createShape(layoutId, body);

      if (response.success) {
        setCircles((prev) => [...prev, response.shape]);
      }

      console.log("Shape Response:", response);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const addSquare = async (layoutId, body) => {
    setShowShapes((prev) => !prev);

    body.shapeType = "Square";

    try {
      const response = await createShape(layoutId, body);

      if (response.success) {
        if (squares) {
          setSquares((prev) => [...prev, response.shape]);
          setShapeAdded(true);
        } else {
          setSquares([response.shape]);
        }
      }

      console.log("Shape Response:", response);
    } catch (error) {
      console.log("error:", error);
    }
  };

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

    if (currentShape.shapeType.toLowerCase() === "circle") {
      updatedShape = { ...currentShape, [name]: value };
      setCircles((prevCircles) =>
        prevCircles.map((circle) =>
          circle._id === shapeId ? updatedShape : circle
        )
      );
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
      if (name === "borderColor") {
        updatedShape = {
          ...updatedShape,
          borderLeftColor: value,
          borderRightColor: value,
          borderBottomColor: value,
          borderTopColor: value,
        };
        setSquares((prevSquares) =>
          prevSquares.map((square) =>
            square._id === shapeId ? updatedShape : square
          )
        );

        updateShape(shapeId, updatedShape);
      }
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
      <div
        className={showShapes ? "showshapes-false" : "shape-tools-container"}
      >
        <h1 className="shape-tools-title">Shape Tools</h1>

        {showShapes ? (
          <>
            <div className="shape-content">
              <div
                className="shape-cirlce"
                onClick={() => addCircle(param.layoutIdParam, shapeBody)}
              ></div>
              <div
                className="shape-square"
                onClick={() => addSquare(param.layoutIdParam, shapeBody)}
              ></div>
            </div>

            <button onClick={toggleShowShapes} className="shape-discard">
              Discard
            </button>
          </>
        ) : (
          <button onClick={toggleShowShapes}>Add New Shape</button>
        )}
      </div>
      {showShapeForm && (
        <form
          className="shape-form-container"
          ref={shapeForm}
          onSubmit={handleFormSubmit}
        >
          <div className="shape-form-fields-container">
            {/* <div> */}
            <h1 className="text-input-title">Size</h1>

            <div className="shape-label-input">
              <label htmlFor="height">Heigth</label>
              <input
                type="number"
                name="height"
                onChange={handleInputChange}
                value={currentShape?.height}
              />
            </div>

            <div className="shape-label-input">
              <label htmlFor="width">Width</label>
              <input
                type="number"
                name="width"
                onChange={handleInputChange}
                value={currentShape?.width}
              />
            </div>

            <div className="shape-label-input">
              <label htmlFor="height">X-Axis</label>
              <input
                type="number"
                name="x"
                onChange={handleInputChange}
                value={currentShape?.x}
              />
            </div>

            <div className="shape-label-input">
              <label htmlFor="width">Y-Axis</label>
              <input
                type="number"
                name="y"
                onChange={handleInputChange}
                value={currentShape?.y}
              />
            </div>
            {/* </div> */}

            <div className="shape-label-input">
              <label htmlFor="backgroundColor">backgroundColor</label>
              <input
                type="text"
                name="backgroundColor"
                onChange={handleInputChange}
                value={currentShape?.backgroundColor}
              />
            </div>

            <h1 className="text-input-title">Font</h1>

            <div className="shape-label-input">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                onChange={handleInputChange}
                value={currentShape?.name}
              />
            </div>

            <div className="shape-label-input">
              <label htmlFor="color">Color</label>
              <input
                type="text"
                name="color"
                onChange={handleInputChange}
                value={currentShape?.color}
              />
            </div>

            <div className="shape-label-input">
              <label htmlFor="fontSize">Size</label>
              <input
                type="number"
                name="fontSize"
                onChange={handleInputChange}
                value={currentShape?.fontSize}
              />
            </div>

            <div className="shape-label-input">
              <p className="justify-content-title">Justify Content</p>
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
            </div>

            <div className="shape-label-input">
              <p className="justify-content-title">Align Items</p>
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

            <h1 className="text-input-border">Border</h1>
            <h1 className="text-input-border-left">Border Left</h1>
            <h1 className="text-input-border-right">Border Right</h1>

            <div className="shape-label-input">
              <label htmlFor="borderSize">borderSize</label>
              <input
                type="number"
                name="borderSize"
                onChange={handleInputChange}
                value={currentShape?.borderSize}
              />
            </div>

            <div className="shape-label-input">
              <label htmlFor="borderColor">borderColor</label>
              <input
                type="text"
                name="borderColor"
                onChange={handleInputChange}
                value={currentShape?.borderColor}
              />
            </div>

            <div className="shape-label-input">
              <label htmlFor="borderLeftSize">borderLeftSize</label>
              <input
                type="number"
                name="borderLeftSize"
                onChange={handleInputChange}
                value={currentShape?.borderLeftSize}
              />
            </div>

            <div className="shape-label-input">
              <label htmlFor="borderLeftColor">borderLeftColor</label>
              <input
                type="text"
                name="borderLeftColor"
                onChange={handleInputChange}
                value={currentShape?.borderLeftColor}
              />
            </div>

            <div className="shape-label-input">
              <label htmlFor="borderRightSize">borderRightSize</label>
              <input
                type="number"
                name="borderRightSize"
                onChange={handleInputChange}
                value={currentShape?.borderRightSize}
              />
            </div>
            <h1 className="text-input-border-right-2">Border Right</h1>
            <h1 className="text-input-border-bottom">Border Bottom</h1>
            <h1 className="text-input-border-top">Border Top</h1>

            <div className="shape-label-input">
              <label htmlFor="borderRightColor">borderRightColor</label>
              <input
                type="text"
                name="borderRightColor"
                onChange={handleInputChange}
                value={currentShape?.borderRightColor}
              />
            </div>

            <div className="shape-label-input">
              <label htmlFor="borderBottomSize">borderBottomSize</label>
              <input
                type="number"
                name="borderBottomSize"
                onChange={handleInputChange}
                value={currentShape?.borderBottomSize}
              />
            </div>

            <div className="shape-label-input">
              <label htmlFor="borderBottomColor">borderBottomColor</label>
              <input
                type="text"
                name="borderBottomColor"
                onChange={handleInputChange}
                value={currentShape?.borderBottomColor}
              />
            </div>

            <div className="shape-label-input">
              <label htmlFor="borderTopSize">borderTopSize</label>
              <input
                type="number"
                name="borderTopSize"
                onChange={handleInputChange}
                value={currentShape?.borderTopSize}
              />
            </div>

            <div className="shape-label-input">
              <label htmlFor="borderTopColor">borderTopColor</label>
              <input
                type="text"
                name="borderTopColor"
                onChange={handleInputChange}
                value={currentShape?.borderTopColor}
              />
            </div>
          </div>

          {/* <div className="checkmark"></div> */}
          {/* <div className="xmark" onClick={() => setShowShapeForm(false)}></div> */}

          <div>
            <button onClick={() => deleteTheShape(shapeId)}>Delete</button>
          </div>
        </form>
      )}
    </>
  );
};

export default ShapesTools;
