import React, { useContext, useState } from "react";
import { handleInputChange } from "../../services/tools.service";
import { ShapeContext } from "../../context/shape.context";
import { useParams } from "react-router-dom";
import { createShape, deleteShape } from "../../services/shape.service";
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
    backgroundColor: "black",
    color: "white",
    x: 0,
    y: 0,
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (currentShape.shapeType.toLowerCase() === "circle") {
      setCircles((prevCircles) =>
        prevCircles.map((circle) =>
          circle._id === shapeId ? { ...circle, [name]: value } : circle
        )
      );
    } else if (currentShape.shapeType.toLowerCase() === "square") {
      setSquares((prevSquares) =>
        prevSquares.map((square) =>
          square._id === shapeId ? { ...square, [name]: value } : square
        )
      );
    }
  };

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
              <label htmlFor="borderSize">borderSize</label>
              <input
                type="number"
                name="borderSize"
                onChange={handleInputChange}
                value={currentShape?.borderSize}
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
              <label htmlFor="backgroundColor">backgroundColor</label>
              <input
                type="text"
                name="backgroundColor"
                onChange={handleInputChange}
                value={currentShape?.backgroundColor}
              />
            </div>
          </div>

          <div className="checkmark"></div>
          <div className="xmark" onClick={() => setShowShapeForm(false)}></div>

          <div>
            <button onClick={() => deleteTheShape(shapeId)}>Delete</button>
          </div>
        </form>
      )}
    </>
  );
};

export default ShapesTools;
