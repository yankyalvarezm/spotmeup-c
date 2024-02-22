import React, { useContext, useState } from "react";
import { handleInputChange } from "../../services/tools.service";
import { ShapeContext } from "../../context/shape.context";

const ShapesTools = () => {
  const { circleCount, setCircleCount, squareCount, setSquareCount } =
    useContext(ShapeContext);

  const [showShapes, setShowShapes] = useState(false);

  const toggleShowShapes = () => {
    setShowShapes((prev) => !prev);
  };

  const addCircle = () => {
    setShowShapes((prev) => !prev);
    setCircleCount(circleCount + 1);
  };

  const addSquare = () => {
    setShowShapes((prev) => !prev);
    setSquareCount(squareCount + 1);
  };

  return (
    <div className={showShapes ? "showshapes-false" : "shape-tools-container"}>
      <h1 className="shape-tools-title">Shape Tools</h1>

      {showShapes ? (
        <>
          <div className="shape-content">
            <div className="shape-cirlce" onClick={addCircle}></div>
            <div className="shape-square" onClick={addSquare}></div>
          </div>

          <button onClick={toggleShowShapes} className="shape-discard">Discard</button>
        </>
      ) : (
        <button onClick={toggleShowShapes}>Add New Shape</button>
      )}
    </div>
  );
};

export default ShapesTools;
