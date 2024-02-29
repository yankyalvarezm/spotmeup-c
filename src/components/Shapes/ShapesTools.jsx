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
    shapeForm,
    shapeId,
    setShapeDeleted,
    setShapeId,
    toggleShapeForm,
  } = useContext(ShapeContext);

  const param = useParams();

  //   console.log("param", param);

  const [shapeBody, setShapeBody] = useState({
    shapeType: "circle",
    name: "",
    width: 100,
    height: 100,
    borderSize: 1,
    color: "",
    backgroundColor: "",
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
        setSquares((prev) => [...prev, response.shape]);
      }

      console.log("Shape Response:", response);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const deleteTheShape = async (shapeId) => {
    try {
      const response = await deleteShape(shapeId);
      console.log("Shape Response:", response);
      setShapeDeleted(true);
      setShapeId(null);
      toggleShapeForm();
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    window.location.reload();
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
              <input type="text" name="height" />
            </div>

            <div className="shape-label-input">
              <label htmlFor="borderSize">borderSize</label>
              <input type="text" name="borderSize" />
            </div>

            <div className="shape-label-input">
              <label htmlFor="color">Color</label>
              <input type="text" name="color" />
            </div>

            <div className="shape-label-input">
              <label htmlFor="backgroundColor">backgroundColor</label>
              <input type="text" name="backgroundColor" />
            </div>
          </div>

          <div>
            <button onClick={() => deleteTheShape(shapeId)}>Delete</button>
          </div>
        </form>
      )}
    </>
  );
};

export default ShapesTools;
